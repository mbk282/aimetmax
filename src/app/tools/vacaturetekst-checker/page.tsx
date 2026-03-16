"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";

interface Finding {
  category: string;
  severity: "hoog" | "midden" | "laag";
  text: string;
  suggestion: string;
  found: string;
}

const GENDERED_WORDS: Record<string, string> = {
  "hij": "hij/zij/hen",
  "zijn": "hun (als bezittelijk)",
  "zakenman": "zakelijk professional",
  "saleswoman": "salesmedewerker",
  "salesman": "salesmedewerker",
  "stewardess": "cabinemedewerker",
  "politieman": "politieagent",
  "brandweerman": "brandweerlid",
  "voorzitter": "voorzitter (neutraal)",
  "manageres": "manager",
  "directrice": "directeur",
  "medewerkster": "medewerker",
  "ambitieuze": "gemotiveerde",
  "agressief": "resultaatgericht",
  "dominant": "leidend",
  "ninja": "specialist",
  "rockstar": "ervaren professional",
  "guru": "expert",
  "young professional": "professional",
  "jong talent": "talent",
  "stressbestendig": "goed om kunt gaan met wisselende werkdruk",
};

const AGE_BIAS_PATTERNS = [
  { pattern: /\bjong(e)?\b/i, found: "jong(e)", suggestion: "Vermijd leeftijdsaanduidingen. Focus op vaardigheden." },
  { pattern: /\bstarter\b/i, found: "starter", suggestion: "Gebruik 'beginnend professional' of laat het weg." },
  { pattern: /\bsenior\b/i, found: "senior", suggestion: "'Senior' is oké als functieniveau, maar niet als leeftijdsaanduiding." },
  { pattern: /\bjonge?n?s?\s*(en|of)\s*meisjes?\b/i, found: "jongens/meisjes", suggestion: "Gebruik 'collega's' of 'teamleden'." },
  { pattern: /\bdigital native\b/i, found: "digital native", suggestion: "Dit impliceert een leeftijdsgroep. Gebruik 'digitaal vaardig'." },
  { pattern: /\bfris\b/i, found: "fris", suggestion: "'Fris' kan leeftijdsbias impliceren. Gebruik 'enthousiast' of 'nieuwsgierig'." },
  { pattern: /\bdynamisch team van\b/i, found: "dynamisch team van", suggestion: "Kan leeftijdsbias impliceren. Beschrijf de teamcultuur concreet." },
  { pattern: /\bpas afgestudeerd\b/i, found: "pas afgestudeerd", suggestion: "Beperk je doelgroep niet. Focus op vereiste kennis/vaardigheden." },
  { pattern: /\bminimaal \d+ jaar ervaring\b/i, found: "minimaal X jaar ervaring", suggestion: "Dit schrikt diverse kandidaten af. Gebruik 'ervaring met...' zonder jareneis." },
  { pattern: /\b\d+\+?\s*jaar ervaring\b/i, found: "X jaar ervaring", suggestion: "Jareneis correleert met leeftijd. Beschrijf het gewenste ervaringsniveau in termen van vaardigheden." },
];

const UNNECESSARY_REQS = [
  { pattern: /\buniversitair\b/i, found: "universitair", suggestion: "Is een WO-diploma echt nodig? Overweeg 'HBO/WO' of focus op competenties." },
  { pattern: /\brijbewijs\b/i, found: "rijbewijs", suggestion: "Is een rijbewijs echt nodig voor deze functie? Dit sluit mensen met een beperking uit." },
  { pattern: /\bnederlandse nationaliteit\b/i, found: "Nederlandse nationaliteit", suggestion: "Dit is discriminatie tenzij wettelijk vereist. Gebruik 'werkvergunning voor Nederland'." },
  { pattern: /\bmoedertaal\b/i, found: "moedertaal", suggestion: "Gebruik 'uitstekende beheersing van het Nederlands' in plaats van 'moedertaal'." },
  { pattern: /\bfulltime\b/i, found: "fulltime", suggestion: "Vermeld of parttime ook mogelijk is. Dit maakt de vacature toegankelijker." },
];

function analyzeVacancy(text: string): { findings: Finding[]; score: number } {
  const lower = text.toLowerCase();
  const findings: Finding[] = [];

  // Gender bias
  for (const [word, replacement] of Object.entries(GENDERED_WORDS)) {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    if (regex.test(text)) {
      findings.push({
        category: "Genderbias",
        severity: "midden",
        text: `Overweeg "${word}" te vervangen`,
        suggestion: `Gebruik: "${replacement}"`,
        found: word,
      });
    }
  }

  // Age bias
  for (const { pattern, found, suggestion } of AGE_BIAS_PATTERNS) {
    if (pattern.test(text)) {
      findings.push({
        category: "Leeftijdsbias",
        severity: "hoog",
        text: `"${found}" gevonden in je tekst`,
        suggestion,
        found,
      });
    }
  }

  // Unnecessary requirements
  for (const { pattern, found, suggestion } of UNNECESSARY_REQS) {
    if (pattern.test(text)) {
      findings.push({
        category: "Onnodige eis",
        severity: "laag",
        text: `"${found}" - is dit echt nodig?`,
        suggestion,
        found,
      });
    }
  }

  // Positive checks
  if (!/\b(wij bieden|wat bieden wij|dit bieden we|jouw voordelen|arbeidsvoorwaarden)\b/i.test(text)) {
    findings.push({
      category: "Aantrekkelijkheid",
      severity: "midden",
      text: "Geen 'Wat bieden wij' sectie gevonden",
      suggestion: "Voeg een sectie toe over wat je biedt: salaris, doorgroei, flexibiliteit, cultuur.",
      found: "",
    });
  }

  if (!/\b(diversiteit|inclusie?f?|gelijke kansen|iedereen welkom)\b/i.test(lower)) {
    findings.push({
      category: "Inclusiviteit",
      severity: "laag",
      text: "Geen diversiteitsverklaring gevonden",
      suggestion: "Voeg een korte diversiteitsverklaring toe, bijv. 'We moedigen iedereen aan om te solliciteren, ongeacht achtergrond.'",
      found: "",
    });
  }

  // Score: start at 100, subtract per finding
  const deductions = findings.reduce((sum, f) => {
    if (f.severity === "hoog") return sum + 15;
    if (f.severity === "midden") return sum + 8;
    return sum + 4;
  }, 0);
  const score = Math.max(0, Math.min(100, 100 - deductions));

  return { findings, score };
}

export default function VacaturetekstChecker() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<ReturnType<typeof analyzeVacancy> | null>(null);

  const severityColor = (s: string) =>
    s === "hoog" ? "border-red-200 bg-red-50" : s === "midden" ? "border-amber-200 bg-amber-50" : "border-blue-200 bg-blue-50";
  const severityText = (s: string) =>
    s === "hoog" ? "text-red-700" : s === "midden" ? "text-amber-700" : "text-blue-700";

  return (
    <ToolLayout
      title="Vacaturetekst Inclusiviteit Checker"
      description="Check je vacaturetekst op genderbias, leeftijdsbias en onnodige eisen. Maak je vacature toegankelijk voor een divers publiek."
    >
      <div className="space-y-6">
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Plak hier je vacaturetekst..."
            rows={10}
            className="w-full rounded-xl border border-gray-300 p-4 text-gray-800 focus:border-blue-500 focus:ring-blue-500"
          />
          <div className="mt-2 flex justify-end">
            <button
              onClick={() => setResult(analyzeVacancy(text))}
              disabled={!text.trim()}
              className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Check inclusiviteit
            </button>
          </div>
        </div>

        {result && (
          <div className="space-y-4">
            <div className={`rounded-xl border p-6 text-center ${result.score >= 80 ? "border-green-200 bg-green-50" : result.score >= 50 ? "border-amber-200 bg-amber-50" : "border-red-200 bg-red-50"}`}>
              <p className={`text-4xl font-bold ${result.score >= 80 ? "text-green-600" : result.score >= 50 ? "text-amber-600" : "text-red-600"}`}>
                {result.score}/100
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Inclusiviteitsscore &middot; {result.findings.length} {result.findings.length === 1 ? "aandachtspunt" : "aandachtspunten"} gevonden
              </p>
            </div>

            {result.findings.length === 0 ? (
              <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
                <p className="font-medium text-green-700">Geen problemen gevonden. Je vacaturetekst ziet er inclusief uit!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {result.findings.map((f, i) => (
                  <div key={i} className={`rounded-lg border p-4 ${severityColor(f.severity)}`}>
                    <div className="flex items-center gap-2 text-sm">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${severityText(f.severity)} bg-white`}>
                        {f.category}
                      </span>
                      <span className="font-medium text-gray-900">{f.text}</span>
                    </div>
                    <p className={`mt-1 text-sm ${severityText(f.severity)}`}>{f.suggestion}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-xs text-gray-500">
              <p>
                Deze checker gebruikt woordlijsten en patronen. Het is geen juridisch advies.
                Wil je meer weten over inclusief werven met AI?{" "}
                <a href="/contact" className="text-blue-600 hover:underline">Neem contact op</a>.
              </p>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
