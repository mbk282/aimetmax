"use client";

import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/tool-layout";

type Style = "minimaal" | "professioneel" | "modern";

interface FormData {
  naam: string;
  functie: string;
  bedrijf: string;
  telefoon: string;
  email: string;
  website: string;
  linkedin: string;
  foto: string;
}

const STYLES: { id: Style; label: string; desc: string }[] = [
  { id: "minimaal", label: "Minimaal", desc: "Clean, alleen tekst met scheidingslijn" },
  { id: "professioneel", label: "Professioneel", desc: "Gestructureerde layout met borders" },
  { id: "modern", label: "Modern", desc: "Accentkleur en bold styling" },
];

function generateHTML(data: FormData, style: Style, color: string): string {
  const { naam, functie, bedrijf, telefoon, email, website, linkedin, foto } = data;
  if (!naam.trim()) return "";

  const websiteClean = website.replace(/^https?:\/\//, "");
  const linkedinClean = linkedin.replace(/^https?:\/\//, "");

  const contactLines: string[] = [];
  if (telefoon) contactLines.push(telefoon);
  if (email) contactLines.push(`<a href="mailto:${email}" style="color:${color};text-decoration:none;">${email}</a>`);
  if (website) contactLines.push(`<a href="${website.startsWith("http") ? website : `https://${website}`}" style="color:${color};text-decoration:none;">${websiteClean}</a>`);
  if (linkedin) contactLines.push(`<a href="${linkedin.startsWith("http") ? linkedin : `https://${linkedin}`}" style="color:${color};text-decoration:none;">LinkedIn</a>`);

  const fotoHTML = foto
    ? `<img src="${foto}" alt="${naam}" width="80" height="80" style="border-radius:50%;width:80px;height:80px;object-fit:cover;" />`
    : "";

  if (style === "minimaal") {
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333333;">
  <tr>
    <td style="padding-bottom:8px;border-bottom:2px solid ${color};">
      <strong style="font-size:16px;color:#111111;">${naam}</strong>
      ${functie || bedrijf ? `<br/><span style="font-size:13px;color:#666666;">${[functie, bedrijf].filter(Boolean).join(" | ")}</span>` : ""}
    </td>
  </tr>
  <tr>
    <td style="padding-top:8px;font-size:13px;color:#666666;">
      ${contactLines.join(" &nbsp;·&nbsp; ")}
    </td>
  </tr>
</table>`;
  }

  if (style === "professioneel") {
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333333;">
  <tr>
    ${fotoHTML ? `<td style="padding-right:16px;vertical-align:top;">${fotoHTML}</td>` : ""}
    <td style="vertical-align:top;${fotoHTML ? `border-left:3px solid ${color};padding-left:16px;` : ""}">
      <strong style="font-size:16px;color:#111111;">${naam}</strong>
      ${functie ? `<br/><span style="font-size:13px;color:#666666;">${functie}</span>` : ""}
      ${bedrijf ? `<br/><span style="font-size:13px;color:${color};font-weight:600;">${bedrijf}</span>` : ""}
      ${contactLines.length > 0 ? `<br/><br/><span style="font-size:12px;color:#666666;">${contactLines.join(" &nbsp;|&nbsp; ")}</span>` : ""}
    </td>
  </tr>
</table>`;
  }

  // modern
  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333333;">
  <tr>
    ${fotoHTML ? `<td style="padding-right:16px;vertical-align:top;">${fotoHTML}</td>` : ""}
    <td style="vertical-align:top;">
      <strong style="font-size:18px;color:${color};">${naam}</strong>
      ${functie || bedrijf ? `<br/><span style="font-size:13px;color:#444444;">${[functie, bedrijf].filter(Boolean).join(" - ")}</span>` : ""}
      ${contactLines.length > 0 ? `<br/><table cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;"><tr><td style="background:${color};width:40px;height:3px;border-radius:2px;"></td></tr></table><span style="font-size:12px;color:#666666;">${contactLines.join(" &nbsp;&nbsp; ")}</span>` : ""}
    </td>
  </tr>
</table>`;
}

export default function EmailHandtekeningGenerator() {
  const [form, setForm] = useState<FormData>({
    naam: "",
    functie: "",
    bedrijf: "",
    telefoon: "",
    email: "",
    website: "",
    linkedin: "",
    foto: "",
  });
  const [style, setStyle] = useState<Style>("professioneel");
  const [color, setColor] = useState("#2563eb");
  const [copied, setCopied] = useState<string | null>(null);

  const html = useMemo(() => generateHTML(form, style, color), [form, style, color]);

  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const showCopied = (type: string) => {
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyHTML = async () => {
    await navigator.clipboard.writeText(html);
    showCopied("html");
  };

  const copyRendered = async () => {
    try {
      const blob = new Blob([html], { type: "text/html" });
      const textBlob = new Blob([html], { type: "text/plain" });
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": blob,
          "text/plain": textBlob,
        }),
      ]);
      showCopied("rendered");
    } catch {
      await navigator.clipboard.writeText(html);
      showCopied("html");
    }
  };

  const fields: { key: keyof FormData; label: string; type: string; placeholder: string; required?: boolean }[] = [
    { key: "naam", label: "Volledige naam", type: "text", placeholder: "Jan de Vries", required: true },
    { key: "functie", label: "Functietitel", type: "text", placeholder: "Marketing Manager" },
    { key: "bedrijf", label: "Bedrijfsnaam", type: "text", placeholder: "Bedrijf B.V." },
    { key: "telefoon", label: "Telefoon", type: "tel", placeholder: "+31 6 12345678" },
    { key: "email", label: "Email", type: "email", placeholder: "jan@bedrijf.nl" },
    { key: "website", label: "Website", type: "url", placeholder: "https://bedrijf.nl" },
    { key: "linkedin", label: "LinkedIn URL", type: "url", placeholder: "https://linkedin.com/in/jandevries" },
    { key: "foto", label: "Profielfoto URL", type: "url", placeholder: "https://example.com/foto.jpg" },
  ];

  return (
    <ToolLayout
      title="Email Handtekening Generator"
      description="Maak een professionele email handtekening in 30 seconden. Kopieer en plak in Outlook, Gmail of Apple Mail."
    >
      <div className="space-y-8">
        {/* Form fields */}
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {f.label}
                {f.required && <span className="text-red-500"> *</span>}
              </label>
              <input
                type={f.type}
                value={form[f.key]}
                onChange={(e) => update(f.key, e.target.value)}
                placeholder={f.placeholder}
                required={f.required}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        {/* Style picker */}
        <div>
          <h2 className="mb-3 text-sm font-medium text-gray-700">Kies een stijl</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {STYLES.map((s) => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id)}
                className={`rounded-xl border-2 p-4 text-left transition ${
                  style === s.id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <span className={`block font-semibold ${style === s.id ? "text-blue-700" : "text-gray-900"}`}>
                  {s.label}
                </span>
                <span className="mt-1 block text-xs text-gray-500">{s.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Color picker */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Accentkleur</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-9 w-12 cursor-pointer rounded border border-gray-300"
          />
          <span className="text-xs text-gray-400">{color}</span>
        </div>

        {/* Preview */}
        <div>
          <h2 className="mb-3 text-sm font-medium text-gray-700">Voorbeeld</h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            {html ? (
              <div dangerouslySetInnerHTML={{ __html: html }} />
            ) : (
              <p className="text-sm text-gray-400">Vul minimaal je naam in om een voorbeeld te zien.</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        {html && (
          <div className="flex flex-wrap gap-3">
            <button
              onClick={copyRendered}
              className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white hover:bg-blue-700"
            >
              {copied === "rendered" ? "Gekopieerd!" : "Kopieer naar klembord"}
            </button>
            <button
              onClick={copyHTML}
              className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
            >
              {copied === "html" ? "Gekopieerd!" : "Kopieer HTML"}
            </button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
