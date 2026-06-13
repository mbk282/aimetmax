"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/tool-layout";

type Status = "good" | "warn" | "bad" | "info";

interface Check {
  id: string;
  titel: string;
  status: Status;
  detail: string;
  tip?: string;
  weight: number; // 0 = telt niet mee in score (alleen info)
}

interface Analysis {
  score: number;
  label: string;
  labelClass: string;
  woorden: number;
  checks: Check[];
}

const VAGE_PATRONEN = [
  "hieronder",
  "hierboven",
  "onderstaande",
  "bovenstaande",
  "voorgaande",
  "navolgende",
  "zoals eerder",
  "zoals hierboven",
  "zoals hieronder",
  "zie bijlage",
  "zie tabel",
  "zie figuur",
  "zie afbeelding",
  "klik hier",
  "lees meer",
  "linksboven",
  "rechtsboven",
  "in de linkerkolom",
  "in de rechterkolom",
];

function stripHtml(html: string): string {
  if (typeof document === "undefined") return html.replace(/<[^>]+>/g, " ");
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

function analyze(opts: {
  text: string;
  html?: string;
  source: "pdf" | "docx" | "tekst";
  pdfMeta?: { pages: number };
}): Analysis {
  const { text, html, source, pdfMeta } = opts;
  const checks: Check[] = [];
  const clean = text.trim();
  const woorden = clean ? clean.split(/\s+/).length : 0;

  // 0. Gescande PDF / geen tekstlaag
  let scanned = false;
  if (source === "pdf" && pdfMeta) {
    const perPage = clean.length / Math.max(1, pdfMeta.pages);
    if (clean.length < 200 || perPage < 80) {
      scanned = true;
      checks.push({
        id: "tekstlaag",
        titel: "Geen leesbare tekstlaag",
        status: "bad",
        weight: 3,
        detail:
          "Dit lijkt een gescande PDF of een PDF zonder tekstlaag: er komt nauwelijks tekst uit. AI kan de inhoud dan niet lezen.",
        tip: "Maak het document opnieuw vanuit de bron (Word, etc.) of pas OCR toe, zodat de tekst echt selecteerbaar wordt.",
      });
    }
  }

  // 1. Lengte
  if (woorden < 30) {
    checks.push({
      id: "lengte",
      titel: "Erg weinig tekst",
      status: "info",
      weight: 0,
      detail: `Er is maar ${woorden} woord(en) gevonden. Te weinig om goed te beoordelen.`,
    });
  } else if (woorden > 4000) {
    checks.push({
      id: "lengte",
      titel: "Lang document",
      status: "info",
      weight: 0,
      detail: `Ongeveer ${woorden.toLocaleString("nl-NL")} woorden. Lange documenten zijn prima, mits ze goed onderverdeeld zijn in secties met koppen.`,
    });
  }

  // 2. Koppenstructuur
  let headingCount = 0;
  let structureKnown = false;
  if (html) {
    structureKnown = true;
    headingCount = (html.match(/<h[1-6][\s>]/gi) || []).length;
  } else if (source === "tekst" || source === "docx") {
    // markdown-koppen in geplakte tekst
    const mdHeadings = (clean.match(/^#{1,6}\s.+$/gm) || []).length;
    if (mdHeadings > 0 || /(^|\n)#{1,6}\s/.test(clean)) {
      structureKnown = true;
      headingCount = mdHeadings;
    }
  }

  if (structureKnown) {
    if (headingCount === 0) {
      checks.push({
        id: "koppen",
        titel: "Geen koppen gevonden",
        status: "bad",
        weight: 3,
        detail:
          "Het document heeft geen herkenbare koppen. AI (en retrieval/RAG) gebruikt koppen om te snappen waar een onderwerp begint en eindigt.",
        tip: "Voeg duidelijke tussenkoppen toe met echte kopstijlen (Kop 1, Kop 2) of Markdown-koppen (#, ##).",
      });
    } else if (woorden > 600 && headingCount < Math.floor(woorden / 600)) {
      checks.push({
        id: "koppen",
        titel: "Weinig koppen voor de lengte",
        status: "warn",
        weight: 2,
        detail: `Er zijn ${headingCount} kop(pen) voor ${woorden.toLocaleString("nl-NL")} woorden. Dat zijn waarschijnlijk lange stukken zonder houvast.`,
        tip: "Voeg meer tussenkoppen toe, zodat elk stuk over één onderwerp gaat.",
      });
    } else {
      checks.push({
        id: "koppen",
        titel: "Duidelijke koppenstructuur",
        status: "good",
        weight: 3,
        detail: `${headingCount} kop(pen) gevonden. Goede structuur helpt AI om de juiste passage te vinden.`,
      });
    }
  } else {
    checks.push({
      id: "koppen",
      titel: "Platte tekst zonder herkenbare structuur",
      status: "warn",
      weight: 2,
      detail:
        "Uit dit formaat komt platte tekst zonder kopstijlen. AI ziet dan geen structuur, ook al ziet het er voor jou opgemaakt uit.",
      tip: "Lever bij voorkeur een Word-bestand met echte kopstijlen of Markdown aan in plaats van een PDF of platgeslagen tekst.",
    });
  }

  // 3. Sectielengte (langste blok zonder kop)
  const blocks = clean.split(/\n(?=#{1,6}\s)|\n{2,}/);
  const longest = blocks.reduce((m, b) => Math.max(m, b.length), 0);
  if (longest > 2200) {
    checks.push({
      id: "blokken",
      titel: "Zeer lange tekstblokken",
      status: "bad",
      weight: 2,
      detail:
        "Er staan grote lappen tekst zonder onderbreking. Bij retrieval worden documenten in stukken geknipt; één gedachte mag niet middenin worden afgekapt.",
      tip: "Hak lange alinea's op en zet er tussenkoppen boven.",
    });
  } else if (longest > 1200) {
    checks.push({
      id: "blokken",
      titel: "Vrij lange tekstblokken",
      status: "warn",
      weight: 1,
      detail: "Sommige stukken zijn aan de lange kant voor opknippen.",
      tip: "Overweeg extra tussenkoppen of kortere alinea's.",
    });
  } else if (woorden >= 30) {
    checks.push({
      id: "blokken",
      titel: "Behapbare tekstblokken",
      status: "good",
      weight: 2,
      detail: "De stukken hebben een prettige lengte om op te knippen.",
    });
  }

  // 4. Vage verwijzingen
  const lower = clean.toLowerCase();
  const gevonden: string[] = [];
  for (const p of VAGE_PATRONEN) {
    if (lower.includes(p)) gevonden.push(p);
  }
  if (gevonden.length === 0 && woorden >= 30) {
    checks.push({
      id: "verwijzingen",
      titel: "Geen losse verwijzingen",
      status: "good",
      weight: 3,
      detail:
        "Geen verwijzingen zoals 'zie hieronder' of 'klik hier' gevonden. Dat is goed: zulke verwijzingen breken zodra de tekst in stukken wordt geknipt.",
    });
  } else if (gevonden.length > 0 && gevonden.length <= 3) {
    checks.push({
      id: "verwijzingen",
      titel: "Enkele losse verwijzingen",
      status: "warn",
      weight: 2,
      detail: `Gevonden: ${gevonden.map((g) => `"${g}"`).join(", ")}. Deze verwijzingen kloppen niet meer als AI alleen dat stukje tekst ziet.`,
      tip: "Maak ze zelfstandig leesbaar, bijvoorbeeld: 'in de tabel met de tarieven voor 2026' in plaats van 'in de tabel hieronder'.",
    });
  } else if (gevonden.length > 3) {
    checks.push({
      id: "verwijzingen",
      titel: "Veel losse verwijzingen",
      status: "bad",
      weight: 3,
      detail: `Gevonden: ${gevonden.slice(0, 6).map((g) => `"${g}"`).join(", ")}${gevonden.length > 6 ? "…" : ""}. Veel verwijzingen naar plaats ('hieronder', 'links') breken bij opknippen.`,
      tip: "Vervang ze door beschrijvende verwijzingen die ook los van de pagina kloppen.",
    });
  }

  // 5. Afbeeldingen & alt-tekst (alleen betrouwbaar bij docx/html)
  if (html) {
    const imgs = (html.match(/<img\b[^>]*>/gi) || []);
    const missingAlt = imgs.filter((t) => !/\salt\s*=\s*["'][^"']+["']/i.test(t)).length;
    if (imgs.length === 0) {
      // niets melden
    } else if (missingAlt > 0) {
      checks.push({
        id: "alt",
        titel: "Afbeeldingen zonder alt-tekst",
        status: "bad",
        weight: 2,
        detail: `${missingAlt} van de ${imgs.length} afbeelding(en) heeft geen alt-tekst. Zonder alt-tekst weet AI niet wat er op de afbeelding staat.`,
        tip: "Geef elke afbeelding een korte beschrijving (alt-tekst). Staat er belangrijke info alleen in een plaatje? Zet die ook als tekst neer.",
      });
    } else {
      checks.push({
        id: "alt",
        titel: "Afbeeldingen hebben alt-tekst",
        status: "good",
        weight: 2,
        detail: `Alle ${imgs.length} afbeelding(en) hebben een alt-tekst.`,
      });
    }
  } else if (source === "pdf") {
    checks.push({
      id: "alt",
      titel: "Let op afbeeldingen in PDF",
      status: "info",
      weight: 0,
      detail:
        "Tekst die alleen in afbeeldingen of grafieken staat, komt niet uit een PDF en is voor AI onzichtbaar (tenzij vision/OCR wordt gebruikt).",
      tip: "Zet belangrijke informatie ook als gewone tekst in het document.",
    });
  }

  // 6. Tabellen
  const htmlTables = html ? (html.match(/<table[\s>]/gi) || []).length : 0;
  const mdTables = !html ? (clean.match(/^\s*\|.+\|\s*$/gm) || []).length : 0;
  if (htmlTables > 0 || mdTables >= 2) {
    checks.push({
      id: "tabellen",
      titel: "Tabellen aanwezig",
      status: "info",
      weight: 0,
      detail:
        "Er staan tabellen in het document. Echte tabellen (rijen en kolommen als tekst) zijn prima leesbaar; een tabel als plaatje is dat niet.",
      tip: "Controleer dat tabellen geen screenshots zijn, en dat ze duidelijke kolomkoppen hebben.",
    });
  }

  // 7. Metadata-kop (titel/datum/eigenaar/samenvatting/tags)
  if (woorden >= 50) {
    const top = clean.slice(0, 600).toLowerCase();
    const velden = ["titel", "datum", "eigenaar", "owner", "auteur", "samenvatting", "tags"];
    const hits = velden.filter((v) => new RegExp("(^|\\n)\\s*" + v + "\\s*:", "m").test(top)).length;
    if (hits >= 3) {
      checks.push({
        id: "metadata",
        titel: "Metadata-kop aanwezig",
        status: "good",
        weight: 1,
        detail:
          "Het document begint met metadata (zoals titel, datum, eigenaar, samenvatting of tags). Dat helpt zowel de zoekstap als de lezer.",
      });
    } else {
      checks.push({
        id: "metadata",
        titel: "Geen metadata-kop",
        status: "warn",
        weight: 1,
        detail:
          "Bovenaan ontbreekt een kort metadata-blok. Een goed vindbaar document begint met een paar regels context.",
        tip: "Zet vijf regels bovenaan: Titel, Datum, Eigenaar, Samenvatting en Tags. Spreek vaste tags af; consistentie geeft betere zoekresultaten.",
      });
    }
  }

  // Score
  const scored = checks.filter((c) => c.weight > 0);
  const totalW = scored.reduce((s, c) => s + c.weight, 0);
  const val = (s: Status) => (s === "good" ? 1 : s === "warn" ? 0.5 : 0);
  let score = totalW > 0 ? Math.round((scored.reduce((s, c) => s + c.weight * val(c.status), 0) / totalW) * 100) : 0;
  if (scanned) score = Math.min(score, 20);
  if (woorden < 30) score = 0;

  let label = "Goed";
  let labelClass = "text-sage";
  if (woorden < 30) {
    label = "Te weinig tekst";
    labelClass = "text-ink-soft";
  } else if (score < 40) {
    label = "Werk aan de winkel";
    labelClass = "text-red-700";
  } else if (score < 60) {
    label = "Matig";
    labelClass = "text-orange-700";
  } else if (score < 80) {
    label = "Redelijk";
    labelClass = "text-amber-700";
  }

  return { score, label, labelClass, woorden, checks };
}

const statusMeta: Record<Status, { dot: string; ring: string }> = {
  good: { dot: "bg-sage", ring: "border-sage" },
  warn: { dot: "bg-amber-500", ring: "border-amber-300" },
  bad: { dot: "bg-red-500", ring: "border-red-300" },
  info: { dot: "bg-ink-soft", ring: "border-line" },
};

export default function AIReadinessScorer() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState<Analysis | null>(null);
  const [error, setError] = useState("");

  const runText = useCallback(() => {
    setError("");
    if (text.trim().split(/\s+/).length < 5) {
      setError("Plak wat meer tekst om iets zinnigs te kunnen zeggen.");
      return;
    }
    setResult(analyze({ text, source: "tekst" }));
  }, [text]);

  const handleFile = useCallback(async (file: File) => {
    setError("");
    setLoading(true);
    setFileName(file.name);
    setResult(null);
    try {
      const lower = file.name.toLowerCase();
      if (lower.endsWith(".docx")) {
        const arrayBuffer = await file.arrayBuffer();
        const mammoth = await import("mammoth");
        const { value: html } = await mammoth.convertToHtml({ arrayBuffer });
        setResult(analyze({ text: stripHtml(html), html, source: "docx" }));
      } else if (lower.endsWith(".pdf")) {
        const arrayBuffer = await file.arrayBuffer();
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const parts: string[] = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          parts.push(content.items.map((it) => ("str" in it ? it.str : "")).join(" "));
        }
        setResult(analyze({ text: parts.join("\n\n"), source: "pdf", pdfMeta: { pages: pdf.numPages } }));
      } else if (lower.endsWith(".txt") || lower.endsWith(".md")) {
        const t = await file.text();
        setResult(analyze({ text: t, source: "tekst" }));
      } else {
        setError("Kies een .docx, .pdf, .md of .txt bestand.");
      }
    } catch (err) {
      setError(`Kon het bestand niet verwerken: ${err instanceof Error ? err.message : "onbekende fout"}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = () => {
    setResult(null);
    setText("");
    setFileName("");
    setError("");
  };

  const mailtoMax = (a: Analysis) => {
    const lijst = a.checks
      .filter((c) => c.status === "bad" || c.status === "warn")
      .map((c) => `- ${c.titel}`)
      .join("\n");
    const body = [
      "Hoi Max,",
      "",
      `Ik heb mijn document door de AI-readiness check gehaald${fileName ? ` (${fileName})` : ""}.`,
      `Score: ${a.score}/100 (${a.label}).`,
      "",
      lijst ? "Aandachtspunten:" : "Geen grote aandachtspunten gevonden.",
      lijst,
      "",
      "Ik wil hier graag over sparren / hulp bij. Kun je meekijken?",
      "",
      "Groet,",
    ].join("\n");
    return (
      "mailto:max@aimetmax.nl?subject=" +
      encodeURIComponent(`AI-readiness check: ${a.score}/100`) +
      "&body=" +
      encodeURIComponent(body)
    );
  };

  return (
    <ToolLayout
      title="Document AI-readiness Checker"
      description="Hoe goed kan AI jouw document gebruiken? Plak tekst of upload een .docx, .pdf, .md of .txt en krijg een score met concrete verbeterpunten. Alles gebeurt in je browser; je bestand wordt niet geupload."
      hideCta
    >
      {!result ? (
        <div className="mx-auto max-w-2xl">
          {/* Upload */}
          <div
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files[0];
              if (f) handleFile(f);
            }}
            onDragOver={(e) => e.preventDefault()}
            className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-line bg-card p-10 text-center transition hover:border-accent hover:bg-accent-soft"
          >
            <p className="text-sm text-ink-soft">
              Sleep een bestand hierheen of{" "}
              <label className="cursor-pointer font-semibold text-accent hover:text-accent-dark">
                kies een bestand
                <input
                  type="file"
                  accept=".docx,.pdf,.md,.txt"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(f);
                  }}
                />
              </label>
            </p>
            <p className="mt-1 text-xs text-ink-soft/80">.docx, .pdf, .md of .txt &middot; blijft in je browser</p>
          </div>

          {/* Of plakken */}
          <div className="mt-6">
            <label className="text-sm font-semibold text-ink">Of plak tekst</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={7}
              placeholder="Plak hier de inhoud van een document, beleidsstuk of kennisbankartikel…"
              className="mt-2 w-full rounded-xl border-2 border-line bg-card p-3 text-sm text-ink focus:border-accent focus:outline-none"
            />
            <button onClick={runText} className="btn btn-primary mt-3">
              Check de tekst
            </button>
          </div>

          {loading && (
            <p className="mt-6 text-center text-sm text-ink-soft">Bezig met analyseren van {fileName}…</p>
          )}
          {error && <p className="mt-4 text-sm text-red-700">{error}</p>}

          <Uitleg />
        </div>
      ) : (
        <div className="mx-auto max-w-2xl space-y-6">
          {/* Score */}
          <div className="warm-card flex items-center gap-6 p-8">
            <div className="flex h-24 w-24 flex-none flex-col items-center justify-center rounded-full border-4 border-line">
              <span className={`text-3xl font-bold ${result.labelClass}`}>{result.score}</span>
              <span className="text-[10px] uppercase tracking-wider text-ink-soft">van 100</span>
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${result.labelClass}`}>{result.label}</h2>
              <p className="mt-1 text-sm text-ink-soft">
                AI-readiness van {fileName || "je tekst"}. Een indicatie op basis van structuur en leesbaarheid voor AI.
              </p>
            </div>
          </div>

          {/* Bevindingen */}
          <div className="space-y-3">
            {result.checks.map((c) => (
              <div key={c.id} className={`rounded-xl border-2 ${statusMeta[c.status].ring} bg-card p-4`}>
                <div className="flex items-start gap-3">
                  <span className={`mt-1.5 h-2.5 w-2.5 flex-none rounded-full ${statusMeta[c.status].dot}`} />
                  <div>
                    <h3 className="font-semibold text-ink">{c.titel}</h3>
                    <p className="mt-1 text-sm text-ink-soft">{c.detail}</p>
                    {c.tip && (
                      <p className="mt-2 text-sm text-ink">
                        <strong className="text-accent">Tip:</strong> {c.tip}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Consultant-brug */}
          <div className="warm-card bg-sage-soft p-6">
            <h3 className="hand text-xl font-bold text-ink">Wil je dit goed regelen voor je eigen (vertrouwelijke) data?</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Deze check kijkt naar de basis. Of een document écht goed werkt, hangt vaak af van de specifieke
              implementatie: een Microsoft 365 Copilot-agent, een SharePoint-agent of een eigen RAG-oplossing stellen
              elk andere eisen. Voor vertrouwelijke documenten wil je sowieso geen publieke tool gebruiken. Ik kijk graag
              mee of bouw een interne tool waar jullie data veilig in mag.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={mailtoMax(result)} className="btn btn-primary">
                Mail mijn uitslag naar Max
              </a>
              <a href="/contact" className="btn btn-ghost">
                Bekijk wat ik voor je kan doen
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={reset} className="btn btn-ghost">
              Nog een document checken
            </button>
          </div>

          <Uitleg />
        </div>
      )}
    </ToolLayout>
  );
}

function Uitleg() {
  return (
    <div className="mt-10 space-y-4 border-t-2 border-line pt-8 text-sm text-ink-soft">
      <h2 className="hand text-2xl font-bold text-ink">Waarom is dit belangrijk?</h2>
      <p>
        Of je nu een chatbot op je documenten zet, Microsoft Copilot je kennisbank laat doorzoeken, of een eigen
        AI-oplossing bouwt: AI kan alleen goed antwoorden als de bron goed leesbaar is. Een rommelig document geeft
        rommelige antwoorden. <em>Garbage in, garbage out</em> geldt nog steeds.
      </p>
      <h3 className="font-bold text-ink">Maakt dit nog uit nu context windows zo groot zijn?</h3>
      <p>
        Goede vraag, en het eerlijke antwoord is: het hangt ervan af. Als je één document in een chat plakt met een
        groot context window, valt het opknippen (chunking) weg en is een losse verwijzing als &ldquo;zie hieronder&rdquo;
        minder erg. Maar in de meeste zakelijke opstellingen speelt structuur nog volop mee:
      </p>
      <ul className="list-disc space-y-1.5 pl-5">
        <li>
          <strong className="text-ink">Retrieval (RAG, Copilot, SharePoint-agents)</strong> zoekt stukjes tekst op uit
          grote hoeveelheden documenten. Daar wordt nog steeds geknipt, en breekt &ldquo;zie de tabel hierboven&rdquo;.
        </li>
        <li>
          <strong className="text-ink">Kosten en snelheid:</strong> bij veel documenten is alles elke keer in de context
          stoppen duur en traag. Gericht ophalen blijft nodig.
        </li>
        <li>
          <strong className="text-ink">Onderbouwing:</strong> als je wilt dat AI naar de juiste passage verwijst, helpt
          een nette structuur enorm.
        </li>
      </ul>
      <p>
        Kortom: het belangrijkste inzicht is dat je document beter of slechter kan zijn voor AI, en dat dit soms afhangt
        van de specifieke implementatie. Deze tool geeft je de basis; voor de details kijk ik graag mee.
      </p>
      <p className="text-xs text-ink-soft/80">
        Dit is een indicatieve check, geen garantie. De tool draait volledig in je browser; je document wordt nergens
        naartoe gestuurd.
      </p>
    </div>
  );
}
