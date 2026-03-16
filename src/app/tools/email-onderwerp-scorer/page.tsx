"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";

const SPAM_WORDS = [
  "gratis", "klik hier", "nu kopen", "dringend", "laatste kans", "actie",
  "aanbieding", "korting", "verdien", "gefeliciteerd", "gewonnen", "prijs",
  "100%", "!!!",  "€€€", "$$$", "geld terug", "risico vrij", "geen kosten",
  "exclusief", "beperkte tijd", "direct", "spoed",
];

const POWER_WORDS = [
  "nieuw", "ontdek", "bewezen", "geheim", "resultaat", "stappen", "tips",
  "waarom", "hoe", "gids", "checklist", "update", "belangrijk", "uitnodiging",
  "herinnering", "vraag", "voorstel", "samenvatting", "feedback",
];

function analyzeSubject(subject: string) {
  const lower = subject.toLowerCase();
  const words = subject.split(/\s+/).filter(Boolean);
  const chars = subject.length;

  const checks = [
    {
      label: "Lengte (30-60 tekens)",
      passed: chars >= 30 && chars <= 60,
      weight: 20,
      tip: chars < 30
        ? `${chars} tekens - te kort. Voeg meer context toe.`
        : chars > 60
        ? `${chars} tekens - wordt afgekapt op mobiel. Houd het onder 60.`
        : `${chars} tekens - perfecte lengte.`,
    },
    {
      label: "Geen spam-woorden",
      passed: !SPAM_WORDS.some((w) => lower.includes(w)),
      weight: 20,
      tip: SPAM_WORDS.some((w) => lower.includes(w))
        ? `Bevat spam-trigger: "${SPAM_WORDS.find((w) => lower.includes(w))}". Dit verlaagt deliverability.`
        : "Geen spam-triggers gevonden.",
    },
    {
      label: "Bevat krachtig woord",
      passed: POWER_WORDS.some((w) => lower.includes(w)),
      weight: 15,
      tip: POWER_WORDS.some((w) => lower.includes(w))
        ? `Goed: bevat "${POWER_WORDS.find((w) => lower.includes(w))}". Dit trekt de aandacht.`
        : "Voeg een krachtig woord toe: 'nieuw', 'ontdek', 'tips', 'stappen', 'belangrijk'.",
    },
    {
      label: "Personalisatie mogelijk",
      passed: /\b(je|jouw|u|uw)\b/i.test(subject) || subject.includes("["),
      weight: 10,
      tip: /\b(je|jouw)\b/i.test(subject)
        ? "Goed: spreekt de lezer direct aan."
        : "Gebruik 'je' of 'jouw' om de lezer persoonlijk aan te spreken.",
    },
    {
      label: "Geen HOOFDLETTERS",
      passed: subject === subject || !/[A-Z]{3,}/.test(subject),
      weight: 15,
      tip: /[A-Z]{3,}/.test(subject)
        ? "Vermijd woorden in HOOFDLETTERS. Dit komt schreeuwerig over en triggert spamfilters."
        : "Geen overmatig hoofdlettergebruik.",
    },
    {
      label: "Begint met actiewoord of vraag",
      passed: /^(hoe|wat|waarom|wanneer|ontdek|leer|bekijk|download|lees|vergelijk|plan|start|probeer|krijg|bespaar)/i.test(subject) || subject.startsWith("Re:") || subject.endsWith("?"),
      weight: 10,
      tip: "Begin met een werkwoord ('Ontdek...', 'Bespaar...') of een vraag ('Hoe...', 'Wat...').",
    },
    {
      label: "Geen overmatige leestekens",
      passed: !(subject.includes("!!") || subject.includes("??") || subject.includes("...")),
      weight: 10,
      tip: subject.includes("!!") || subject.includes("??")
        ? "Vermijd dubbele leestekens. Eén uitroepteken of vraagteken is genoeg."
        : "Goed: nette interpunctie.",
    },
  ];

  const maxScore = checks.reduce((s, c) => s + c.weight, 0);
  const earned = checks.filter((c) => c.passed).reduce((s, c) => s + c.weight, 0);
  const score = Math.round((earned / maxScore) * 100);

  return { score, checks, chars, words: words.length };
}

export default function EmailOnderwerpScorer() {
  const [subject, setSubject] = useState("");
  const [result, setResult] = useState<ReturnType<typeof analyzeSubject> | null>(null);

  const handleScore = () => {
    if (!subject.trim()) return;
    setResult(analyzeSubject(subject));
  };

  return (
    <ToolLayout
      title="E-mail Onderwerpregel Scorer"
      description="Test hoe effectief je e-mail onderwerpregel is. Krijg een score en tips voor hogere open rates."
    >
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleScore()}
            placeholder="Typ je e-mail onderwerpregel..."
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-lg text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-gray-400">{subject.length} tekens</span>
            <button
              onClick={handleScore}
              disabled={!subject.trim()}
              className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Score mijn onderwerp
            </button>
          </div>
        </div>

        {result && (
          <div className="space-y-4">
            <div className={`rounded-xl border p-6 text-center ${result.score >= 70 ? "border-green-200 bg-green-50" : result.score >= 40 ? "border-amber-200 bg-amber-50" : "border-red-200 bg-red-50"}`}>
              <p className={`text-5xl font-bold ${result.score >= 70 ? "text-green-600" : result.score >= 40 ? "text-amber-600" : "text-red-600"}`}>
                {result.score}/100
              </p>
              <p className="mt-1 text-sm text-gray-600">
                {result.score >= 70 ? "Sterke onderwerpregel!" : result.score >= 40 ? "Kan beter - pas de tips toe." : "Veel ruimte voor verbetering."}
              </p>
            </div>

            <div className="space-y-2">
              {result.checks.map((c) => (
                <div key={c.label} className={`rounded-lg border p-3 ${c.passed ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
                  <div className="flex items-center gap-2 text-sm">
                    <span>{c.passed ? "✓" : "✗"}</span>
                    <span className="font-medium">{c.label}</span>
                  </div>
                  <p className={`mt-1 text-xs ${c.passed ? "text-green-700" : "text-red-700"}`}>{c.tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
