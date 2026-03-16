"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";

interface Analysis {
  score: number;
  checks: { label: string; passed: boolean; tip: string }[];
  stats: { label: string; value: string; ideal: string }[];
}

function analyzePost(text: string): Analysis {
  const lines = text.split("\n").filter((l) => l.trim());
  const chars = text.length;
  const words = text.split(/\s+/).filter(Boolean).length;
  const firstLine = lines[0] || "";
  const hashtags = (text.match(/#\w+/g) || []);
  const emojis = (text.match(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu) || []);
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim());
  const hasQuestion = /\?/.test(text);
  const hasCTA = /\b(link|comment|reageer|deel|volg|laat.*(weten|horen)|wat (denk|vind) (jij|je)|ben je het eens|eens of oneens)\b/i.test(text);
  const hasLineBreaks = paragraphs.length >= 3;

  const checks = [
    {
      label: "Sterke opening (hook)",
      passed: firstLine.length > 10 && firstLine.length < 150 && !firstLine.startsWith("Ik"),
      tip: firstLine.length <= 10
        ? "Je eerste regel is te kort. Start met een prikkelende stelling, vraag of getal."
        : firstLine.startsWith("Ik")
        ? "Vermijd 'Ik' als eerste woord. Begin met iets dat de lezer direct aanspreekt."
        : firstLine.length >= 150
        ? "Je hook is te lang. Houd de eerste regel onder 150 tekens zodat hij niet wordt afgekapt."
        : "Goede hook! De eerste regel trekt de aandacht.",
    },
    {
      label: "Optimale lengte",
      passed: chars >= 500 && chars <= 2000,
      tip: chars < 500
        ? `Je post is ${chars} tekens. Posts van 500-2000 tekens presteren het best op LinkedIn.`
        : chars > 2000
        ? `Je post is ${chars} tekens. Posts boven 2000 tekens worden minder gelezen. Schrap overbodige zinnen.`
        : `Goede lengte: ${chars} tekens. Dit is de sweet spot voor LinkedIn.`,
    },
    {
      label: "Witregels en structuur",
      passed: hasLineBreaks,
      tip: hasLineBreaks
        ? "Goed: je post heeft voldoende witregels. Dit maakt scannen makkelijker."
        : "Voeg witregels toe tussen alinea's. LinkedIn posts worden gescand, niet gelezen. Korte alinea's werken beter.",
    },
    {
      label: "Vraag of interactie",
      passed: hasQuestion,
      tip: hasQuestion
        ? "Je post bevat een vraag. Dit stimuleert reacties en vergroot bereik."
        : "Stel een vraag aan je lezers. Posts met vragen krijgen tot 50% meer reacties.",
    },
    {
      label: "Call-to-action",
      passed: hasCTA,
      tip: hasCTA
        ? "Goede CTA gevonden. Dit moedigt je netwerk aan om te reageren."
        : "Voeg een call-to-action toe aan het einde: 'Wat denk jij?', 'Reageer hieronder', 'Deel je ervaring'.",
    },
    {
      label: "Hashtags (3-5)",
      passed: hashtags.length >= 3 && hashtags.length <= 5,
      tip: hashtags.length === 0
        ? "Voeg 3-5 relevante hashtags toe. Dit vergroot je bereik buiten je netwerk."
        : hashtags.length < 3
        ? `Je hebt ${hashtags.length} hashtag(s). Voeg er nog ${3 - hashtags.length} toe voor optimaal bereik.`
        : hashtags.length > 5
        ? `Je hebt ${hashtags.length} hashtags. Meer dan 5 kan als spam overkomen. Houd het bij 3-5.`
        : `${hashtags.length} hashtags - perfect aantal.`,
    },
    {
      label: "Emoji gebruik",
      passed: emojis.length >= 1 && emojis.length <= 8,
      tip: emojis.length === 0
        ? "Overweeg 1-3 emoji's toe te voegen. Ze maken je post visueel aantrekkelijker in de feed."
        : emojis.length > 8
        ? "Je gebruikt veel emoji's. Houd het bij maximaal 5-8 voor een professionele uitstraling."
        : "Goed emoji-gebruik. Professioneel maar visueel aantrekkelijk.",
    },
  ];

  const passed = checks.filter((c) => c.passed).length;
  const score = Math.round((passed / checks.length) * 100);

  const stats = [
    { label: "Tekens", value: chars.toString(), ideal: "500-2000" },
    { label: "Woorden", value: words.toString(), ideal: "80-300" },
    { label: "Regels", value: lines.length.toString(), ideal: "8-25" },
    { label: "Alinea's", value: paragraphs.length.toString(), ideal: "3-8" },
    { label: "Hashtags", value: hashtags.length.toString(), ideal: "3-5" },
    { label: "Emoji's", value: emojis.length.toString(), ideal: "1-8" },
  ];

  return { score, checks, stats };
}

export default function LinkedInPostOptimizer() {
  const [post, setPost] = useState("");
  const [result, setResult] = useState<Analysis | null>(null);

  return (
    <ToolLayout
      title="LinkedIn Post Optimizer"
      description="Plak je LinkedIn post en krijg direct tips om je bereik te vergroten. Geen AI nodig - gebaseerd op best practices."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <textarea
            value={post}
            onChange={(e) => setPost(e.target.value)}
            placeholder={"Plak hier je LinkedIn post...\n\nTip: een goede post begint met een sterke eerste regel die nieuwsgierig maakt."}
            rows={14}
            className="w-full rounded-xl border border-gray-300 p-4 text-gray-800 focus:border-blue-500 focus:ring-blue-500"
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-gray-400">{post.length} tekens</span>
            <button
              onClick={() => setResult(analyzePost(post))}
              disabled={!post.trim()}
              className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Analyseer
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {result ? (
            <>
              <div className={`rounded-xl border p-4 ${result.score >= 70 ? "border-green-200 bg-green-50" : result.score >= 40 ? "border-amber-200 bg-amber-50" : "border-red-200 bg-red-50"}`}>
                <div className="flex items-center gap-3">
                  <span className={`text-3xl font-bold ${result.score >= 70 ? "text-green-600" : result.score >= 40 ? "text-amber-600" : "text-red-600"}`}>
                    {result.score}/100
                  </span>
                  <p className="text-sm text-gray-600">
                    {result.score >= 70 ? "Sterke post!" : result.score >= 40 ? "Kan beter - zie tips." : "Veel ruimte voor verbetering."}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {result.stats.map((s) => (
                  <div key={s.label} className="rounded-lg bg-gray-50 p-2 text-center">
                    <p className="text-lg font-bold text-gray-900">{s.value}</p>
                    <p className="text-xs text-gray-500">{s.label}</p>
                    <p className="text-xs text-gray-400">Ideaal: {s.ideal}</p>
                  </div>
                ))}
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
            </>
          ) : (
            <div className="flex h-full items-center justify-center rounded-xl border-2 border-dashed border-gray-200 p-8 text-center text-sm text-gray-400">
              Plak je LinkedIn post links en klik op &ldquo;Analyseer&rdquo;
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
