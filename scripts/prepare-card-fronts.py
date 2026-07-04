"""Prepare CMYK card-front PDFs with and without the printer dieline.

The artwork stays vector. The printer template is reused instead of redrawing
its lines, so the STANS and AFLOOP spot-color definitions remain unchanged.
"""

from __future__ import annotations

import argparse
from pathlib import Path
from typing import Iterable

from pypdf import PdfReader, PdfWriter
from pypdf._page import PageObject
from pypdf.generic import (
    ArrayObject,
    ContentStream,
    DecodedStreamObject,
    DictionaryObject,
    FloatObject,
    IndirectObject,
    NameObject,
    RectangleObject,
)


EXPECTED_LAYERS = ["Uw artwork", "TEMPLATE - Stans", "TEMPLATE - Snijtekens"]
EXPECTED_SPOTS = {"/STANS", "/AFLOOP"}


def dereference(value):
    try:
        return value.get_object()
    except AttributeError:
        return value


def stream_bytes(value) -> bytes:
    value = dereference(value)
    if isinstance(value, ArrayObject):
        return b"\n".join(stream_bytes(item) for item in value)
    if hasattr(value, "get_data"):
        return value.get_data()
    return b""


def rgb_to_cmyk(red: float, green: float, blue: float) -> list[FloatObject]:
    black = 1.0 - max(red, green, blue)
    if black >= 0.999999:
        values = (0.0, 0.0, 0.0, 1.0)
    else:
        denominator = 1.0 - black
        cyan = (1.0 - red - black) / denominator
        magenta = (1.0 - green - black) / denominator
        yellow = (1.0 - blue - black) / denominator
        values = (cyan, magenta, yellow, black)
    return [FloatObject(f"{max(0.0, min(1.0, value)):.6f}") for value in values]


def convert_content_stream(value, reader: PdfReader, visited: set[int]) -> int:
    value = dereference(value)
    object_id = id(value)
    if object_id in visited or not hasattr(value, "get_data"):
        return 0
    visited.add(object_id)

    content = ContentStream(value, reader)
    rebuilt = []
    converted = 0
    for operands, operator in content.operations:
        if operator in (b"rg", b"RG") and len(operands) == 3:
            operands = rgb_to_cmyk(*(float(number) for number in operands))
            operator = b"k" if operator == b"rg" else b"K"
            converted += 1
        rebuilt.append((operands, operator))
    content.operations = rebuilt
    value.set_data(content.get_data())
    return converted


def convert_resources(resources, reader: PdfReader, visited: set[int]) -> int:
    resources = dereference(resources)
    if not isinstance(resources, DictionaryObject):
        return 0

    converted = 0
    fonts = dereference(resources.get("/Font", DictionaryObject()))
    if isinstance(fonts, DictionaryObject):
        for font_reference in fonts.values():
            font = dereference(font_reference)
            if font.get("/Subtype") != "/Type3":
                continue
            char_procs = dereference(font.get("/CharProcs", DictionaryObject()))
            for char_stream in char_procs.values():
                converted += convert_content_stream(char_stream, reader, visited)
            converted += convert_resources(font.get("/Resources"), reader, visited)

    xobjects = dereference(resources.get("/XObject", DictionaryObject()))
    if isinstance(xobjects, DictionaryObject):
        for xobject_reference in xobjects.values():
            xobject = dereference(xobject_reference)
            if xobject.get("/Subtype") == "/Form":
                converted += convert_content_stream(xobject, reader, visited)
                converted += convert_resources(xobject.get("/Resources"), reader, visited)

    patterns = dereference(resources.get("/Pattern", DictionaryObject()))
    if isinstance(patterns, DictionaryObject):
        for pattern_reference in patterns.values():
            pattern = dereference(pattern_reference)
            if hasattr(pattern, "get_data"):
                converted += convert_content_stream(pattern, reader, visited)
                converted += convert_resources(pattern.get("/Resources"), reader, visited)
    return converted


def convert_artwork_to_cmyk(source: Path, destination: Path) -> int:
    reader = PdfReader(source)
    visited: set[int] = set()
    converted = 0
    for page in reader.pages:
        contents = dereference(page.get("/Contents"))
        if contents is not None:
            if isinstance(contents, ArrayObject):
                for item in contents:
                    converted += convert_content_stream(item, reader, visited)
            else:
                converted += convert_content_stream(contents, reader, visited)
        converted += convert_resources(page.get("/Resources"), reader, visited)

    writer = PdfWriter()
    writer.pdf_header = "%PDF-1.5"
    for page in reader.pages:
        writer.add_page(page)
    writer.add_metadata(
        {
            "/Title": "AI-gesprekskaarten voorkanten 74x109 mm - zonder stanslijnen",
            "/Subject": "Proces-CMYK artwork met 3 mm afloop voorbij de stans",
            "/Creator": "AI met Max",
        }
    )
    destination.parent.mkdir(parents=True, exist_ok=True)
    with destination.open("wb") as output:
        writer.write(output)
    return converted


def clone_box(page: PageObject, template_page: PageObject, key: str) -> None:
    if key in template_page:
        page[NameObject(key)] = RectangleObject(template_page[key])


def build_dieline_pdf(artwork: Path, template: Path, destination: Path) -> None:
    artwork_reader = PdfReader(artwork)
    template_reader = PdfReader(template)
    if len(template_reader.pages) != 1:
        raise ValueError("The printer template must contain exactly one page")

    template_page = template_reader.pages[0]
    template_root = dereference(template_reader.trailer["/Root"])
    writer = PdfWriter()
    writer.pdf_header = template_reader.pdf_header

    if "/OCProperties" in template_root:
        writer._root_object[NameObject("/OCProperties")] = template_root[
            "/OCProperties"
        ].clone(writer)
    if "/Metadata" in template_root:
        metadata = dereference(template_root["/Metadata"]).clone(writer)
        writer._root_object[NameObject("/Metadata")] = writer._add_object(metadata)

    template_content = stream_bytes(template_page.get("/Contents"))
    for artwork_page in artwork_reader.pages:
        media_box = RectangleObject(template_page.mediabox)
        page = PageObject.create_blank_page(
            width=float(media_box.width), height=float(media_box.height)
        )
        for box_name in ("/MediaBox", "/CropBox", "/BleedBox", "/TrimBox", "/ArtBox"):
            clone_box(page, template_page, box_name)

        resources = template_page["/Resources"].clone(writer)
        xobjects = DictionaryObject()
        existing_xobjects = dereference(resources.get("/XObject", DictionaryObject()))
        if isinstance(existing_xobjects, DictionaryObject):
            for name, reference in existing_xobjects.items():
                xobjects[name] = reference

        artwork_form = DecodedStreamObject()
        artwork_form.set_data(stream_bytes(artwork_page.get("/Contents")))
        artwork_form[NameObject("/Type")] = NameObject("/XObject")
        artwork_form[NameObject("/Subtype")] = NameObject("/Form")
        artwork_form[NameObject("/FormType")] = FloatObject(1)
        artwork_form[NameObject("/BBox")] = RectangleObject(artwork_page.mediabox)
        artwork_form[NameObject("/Resources")] = artwork_page["/Resources"].clone(writer)
        properties = dereference(resources["/Properties"])
        artwork_form[NameObject("/OC")] = properties["/MC0"]
        artwork_reference = writer._add_object(artwork_form)
        xobjects[NameObject("/Artwork")] = artwork_reference
        resources[NameObject("/XObject")] = xobjects
        page[NameObject("/Resources")] = resources

        artwork_wrapper = DecodedStreamObject()
        artwork_wrapper.set_data(b"q\n/Artwork Do\nQ\n")
        artwork_wrapper_reference = writer._add_object(artwork_wrapper)

        dieline_stream = DecodedStreamObject()
        dieline_stream.set_data(template_content)
        dieline_reference = writer._add_object(dieline_stream)
        page[NameObject("/Contents")] = ArrayObject(
            [artwork_wrapper_reference, dieline_reference]
        )
        writer.add_page(page)

    writer.add_metadata(
        {
            "/Title": "AI-gesprekskaarten voorkanten 74x109 mm - met stanslijnen",
            "/Subject": "Proces-CMYK artwork met ongewijzigde STANS en AFLOOP steunkleuren",
            "/Creator": "AI met Max",
        }
    )
    destination.parent.mkdir(parents=True, exist_ok=True)
    with destination.open("wb") as output:
        writer.write(output)


def layer_names(reader: PdfReader) -> list[str]:
    root = dereference(reader.trailer["/Root"])
    properties = dereference(root.get("/OCProperties", DictionaryObject()))
    groups = dereference(properties.get("/OCGs", ArrayObject()))
    return [str(dereference(group).get("/Name")) for group in groups]


def page_spots(page: PageObject) -> set[str]:
    resources = dereference(page.get("/Resources", DictionaryObject()))
    color_spaces = dereference(resources.get("/ColorSpace", DictionaryObject()))
    spots: set[str] = set()
    if not isinstance(color_spaces, DictionaryObject):
        return spots
    for value in color_spaces.values():
        color_space = dereference(value)
        if (
            isinstance(color_space, ArrayObject)
            and len(color_space) >= 2
            and color_space[0] == "/Separation"
        ):
            spots.add(str(color_space[1]))
    return spots


def color_operators(value, reader: PdfReader) -> Iterable[bytes]:
    value = dereference(value)
    if isinstance(value, ArrayObject):
        for item in value:
            yield from color_operators(item, reader)
        return
    if not hasattr(value, "get_data"):
        return
    content = ContentStream(value, reader)
    for _operands, operator in content.operations:
        if operator in (b"rg", b"RG", b"k", b"K", b"scn", b"SCN"):
            yield operator


def validate_outputs(without_lines: Path, with_lines: Path, template: Path) -> None:
    plain_reader = PdfReader(without_lines)
    lined_reader = PdfReader(with_lines)
    template_reader = PdfReader(template)
    template_page = template_reader.pages[0]

    if not plain_reader.pages or len(plain_reader.pages) != len(lined_reader.pages):
        raise ValueError("Output page counts do not match")
    if layer_names(lined_reader) != EXPECTED_LAYERS:
        raise ValueError(f"Unexpected optional-content layers: {layer_names(lined_reader)}")
    lined_root = dereference(lined_reader.trailer["/Root"])
    if not isinstance(lined_root.raw_get("/Metadata"), IndirectObject):
        raise ValueError("The XMP metadata stream must be an indirect PDF object")

    expected_boxes = {
        name: tuple(round(float(value), 5) for value in template_page[name])
        for name in ("/MediaBox", "/CropBox", "/BleedBox", "/TrimBox", "/ArtBox")
    }
    for index, page in enumerate(lined_reader.pages, start=1):
        for name, expected in expected_boxes.items():
            actual = tuple(round(float(value), 5) for value in page[name])
            if actual != expected:
                raise ValueError(f"Page {index} has an incorrect {name}: {actual}")
        if page_spots(page) != EXPECTED_SPOTS:
            raise ValueError(f"Page {index} has unexpected spot colors: {page_spots(page)}")

        resources = dereference(page["/Resources"])
        artwork = dereference(dereference(resources["/XObject"])["/Artwork"])
        artwork_spots = page_spots(DictionaryObject({NameObject("/Resources"): artwork["/Resources"]}))
        if artwork_spots:
            raise ValueError(f"Artwork on page {index} contains spot colors: {artwork_spots}")

    for index, page in enumerate(plain_reader.pages, start=1):
        operators = list(color_operators(page.get("/Contents"), plain_reader))
        if b"rg" in operators or b"RG" in operators:
            raise ValueError(f"Page {index} still contains DeviceRGB color operators")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--artwork", type=Path, required=True)
    parser.add_argument("--template", type=Path, required=True)
    parser.add_argument("--output-dir", type=Path, default=Path("output/pdf"))
    args = parser.parse_args()

    without_lines = args.output_dir / (
        "ai-gesprekskaarten-voorkanten-74x109-zonder-stanslijnen.pdf"
    )
    with_lines = args.output_dir / (
        "ai-gesprekskaarten-voorkanten-74x109-met-stanslijnen.pdf"
    )

    converted = convert_artwork_to_cmyk(args.artwork, without_lines)
    build_dieline_pdf(without_lines, args.template, with_lines)
    validate_outputs(without_lines, with_lines, args.template)
    print(f"Converted RGB operators: {converted}")
    print(f"OK: {without_lines}")
    print(f"OK: {with_lines}")


if __name__ == "__main__":
    main()
