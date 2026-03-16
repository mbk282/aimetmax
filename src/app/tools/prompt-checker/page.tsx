"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";

interface Check {
  label: string;
  passed: boolean;
  tip: string;
  weight: number;
}

function analyzePrompt(prompt: string): { checks: Check[]; score: number } {
  const trimmed = prompt.trim();
  const words = trimmed.split(/\s+/).filter(Boolean);
  const lower = trimmed.toLowerCase();

  const checks: Check[] = [
    {
      label: "Lengte",
      passed: words.length >= 15,
      tip: words.length < 15
        ? `Je prompt is ${words.length} woorden. Prompts onder 15 woorden geven vaak vage resultaten. Voeg context toe.`
        : `Goed: ${words.length} woorden. Voldoende detail.`,
      weight: 10,
    },
    {
      label: "Rol/perspectief",
      passed: /\b(je bent|jij bent|als een?|act as|you are|gedraag je als|vanuit het perspectief)\b/i.test(trimmed),
      tip: "Geef de AI een rol, bijv. 'Je bent een ervaren HR-manager'. Dit verbetert de toon en relevantie van het antwoord.",
      weight: 15,
    },
    {
      label: "Context",
      passed: words.length >= 30 || /\b(context|achtergrond|situatie|het gaat om|we werken aan|ons bedrijf|mijn organisatie)\b/i.test(trimmed),
      tip: "Voeg achtergrondinfo toe. Bijv. 'We zijn een MKB-bedrijf met 50 medewerkers in de zorg.'",
      weight: 15,
    },
    {
      label: "Specifieke instructie",
      passed: /\b(schrijf|maak|genereer|geef|leg uit|analyseer|vergelijk|beoordeel|vat samen|vertaal|lijst|noem|beschrijf)\b/i.test(trimmed),
      tip: "Begin met een duidelijk werkwoord: 'Schrijf...', 'Maak een lijst van...', 'Analyseer...'",
      weight: 15,
    },
    {
      label: "Gewenst formaat",
      passed: /\b(tabel|lijst|bullet|stappen|paragraaf|json|markdown|punten|genummerd|kort|lang|maximaal \d|in \d woorden|samenvatting)\b/i.test(trimmed),
      tip: "Geef aan hoe je het antwoord wilt: 'in een tabel', 'in 5 bullet points', 'maximaal 200 woorden'.",
      weight: 15,
    },
    {
      label: "Doelgroep",
      passed: /\b(doelgroep|publiek|lezer|voor (een |mijn )?|gericht op|geschikt voor|begrijpelijk voor|managers|developers|studenten|collega)\b/i.test(trimmed),
      tip: "Vermeld voor wie het resultaat is: 'voor een niet-technisch publiek', 'voor mijn manager', 'voor klanten'.",
      weight: 10,
    },
    {
      label: "Beperkingen/randvoorwaarden",
      passed: /\b(niet|geen|vermijd|zonder|alleen|uitsluitend|beperk|maximaal|minimaal|moet|mag niet|voorwaarde)\b/i.test(trimmed),
      tip: "Stel grenzen: 'Gebruik geen jargon', 'Maximaal 3 alinea's', 'Alleen Nederlandse bronnen'.",
      weight: 10,
    },
    {
      label: "Voorbeeld gegeven",
      passed: /\b(voorbeeld|bijv|bijvoorbeeld|zoals|als voorbeeld|hier is een|template|format)\b/i.test(trimmed),
      tip: "Geef een voorbeeld van het gewenste resultaat. Dit is een van de krachtigste technieken voor betere output.",
      weight: 10,
    },
  ];

  const maxScore = checks.reduce((sum, c) => sum + c.weight, 0);
  const earnedScore = checks.filter((c) => c.passed).reduce((sum, c) => sum + c.weight, 0);
  const score = Math.round((earnedScore / maxScore) * 100);

  return { checks, score };
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 75 ? "text-green-600 bg-green-50 border-green-200"
    : score >= 50 ? "text-amber-600 bg-amber-50 border-amber-200"
    : "text-red-600 bg-red-50 border-red-200";
  const label = score >= 75 ? "Sterk" : score >= 50 ? "Gemiddeld" : "Zwak";

  return (
    <div className={`inline-flex items-center gap-3 rounded-xl border px-6 py-4 ${color}`}>
      <span className="text-4xl font-bold">{score}</span>
      <div>
        <span className="text-sm font-medium">/100</span>
        <p className="text-xs">{label}</p>
      </div>
    </div>
  );
}

export default function PromptChecker() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<{ checks: Check[]; score: number } | null>(null);

  const handleCheck = () => {
    if (!prompt.trim()) return;
    setResult(analyzePrompt(prompt));
  };

  return (
    <ToolLayout
      title="Prompt Kwaliteit Checker"
      description="Plak je ChatGPT, Copilot of Claude prompt en krijg een score met verbeter-tips. Geen AI nodig - alles draait in je browser."
    >
      <div className="space-y-6">
        <div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Plak hier je prompt..."
            rows={6}
            className="w-full rounded-xl border border-gray-300 p-4 text-gray-800 focus:border-blue-500 focus:ring-blue-500"
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-gray-400">{prompt.trim().split(/\s+/).filter(Boolean).length} woorden</span>
            <button
              onClick={handleCheck}
              disabled={!prompt.trim()}
              className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Check mijn prompt
            </button>
          </div>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <ScoreBadge score={result.score} />
              <p className="text-sm text-gray-600">
                {result.score >= 75
                  ? "Je prompt is goed opgebouwd. Kleine verbeteringen zijn altijd mogelijk."
                  : result.score >= 50
                  ? "Je prompt mist een paar belangrijke elementen. Zie de tips hieronder."
                  : "Je prompt kan veel beter. Voeg de ontbrekende elementen toe voor betere AI-resultaten."}
              </p>
            </div>

            <div className="space-y-2">
              {result.checks.map((check) => (
                <div
                  key={check.label}
                  className={`rounded-lg border p-4 ${check.passed ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
                >
                  <div className="flex items-center gap-2">
                    <span className={check.passed ? "text-green-600" : "text-red-600"}>
                      {check.passed ? "✓" : "✗"}
                    </span>
                    <span className="font-medium text-gray-900">{check.label}</span>
                  </div>
                  <p className={`mt-1 text-sm ${check.passed ? "text-green-700" : "text-red-700"}`}>
                    {check.tip}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-xs text-gray-500">
              <p>
                Deze checker gebruikt heuristieken, geen AI. Wil je leren hoe je structureel betere
                prompts schrijft?{" "}
                <a href="/contact" className="text-blue-600 hover:underline">
                  Vraag een prompt-training aan
                </a>.
              </p>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
