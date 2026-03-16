"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";

function countSyllablesDutch(word: string): number {
  const w = word.toLowerCase().replace(/[^a-zàáâãäèéêëìíîïòóôõöùúûüñç]/g, "");
  if (w.length <= 2) return 1;

  const vowels = "aeiouyàáâãäèéêëìíîïòóôõöùúûü";
  let count = 0;
  let prevVowel = false;

  for (let i = 0; i < w.length; i++) {
    const isVowel = vowels.includes(w[i]);
    if (isVowel && !prevVowel) count++;
    prevVowel = isVowel;
  }

  // Dutch diphthongs correction: oe, ie, ei, ui, au, ou, eu, ij, aai, ooi, oei
  const diphthongs = (w.match(/(oe|ie|ei|ui|au|ou|eu|ij|aa|oo|ee|uu)/g) || []).length;
  count = Math.max(1, count - diphthongs + diphthongs); // diphthongs count as 1

  return Math.max(1, count);
}

function analyzeText(text: string) {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const words = text.split(/\s+/).filter((w) => w.replace(/[^a-zA-Zàáâãäèéêëìíîïòóôõöùúûüñç]/g, "").length > 0);

  if (words.length === 0) return null;

  const totalSyllables = words.reduce((sum, w) => sum + countSyllablesDutch(w), 0);
  const avgWordsPerSentence = sentences.length > 0 ? words.length / sentences.length : words.length;
  const avgSyllablesPerWord = totalSyllables / words.length;

  // Flesch-Douma (Dutch adaptation of Flesch Reading Ease)
  const fleschDouma = 206.835 - 0.93 * avgWordsPerSentence - 77 * avgSyllablesPerWord;
  const score = Math.max(0, Math.min(100, Math.round(fleschDouma)));

  // Determine CEFR level
  let level: string;
  let levelLabel: string;
  if (score >= 80) { level = "A2-B1"; levelLabel = "Zeer makkelijk leesbaar"; }
  else if (score >= 60) { level = "B1"; levelLabel = "Makkelijk leesbaar"; }
  else if (score >= 40) { level = "B2"; levelLabel = "Gemiddeld leesbaar"; }
  else if (score >= 20) { level = "C1"; levelLabel = "Moeilijk leesbaar"; }
  else { level = "C2"; levelLabel = "Zeer moeilijk leesbaar"; }

  // Long words (3+ syllables)
  const longWords = words.filter((w) => countSyllablesDutch(w) >= 3);
  const longWordsPct = Math.round((longWords.length / words.length) * 100);

  // Long sentences (25+ words)
  const longSentences = sentences.filter((s) => s.trim().split(/\s+/).length >= 25);

  // Tips
  const tips: string[] = [];
  if (avgWordsPerSentence > 20)
    tips.push(`Je gemiddelde zinslengte is ${avgWordsPerSentence.toFixed(1)} woorden. Probeer onder de 15 te blijven voor B1-niveau.`);
  if (longWordsPct > 20)
    tips.push(`${longWordsPct}% van je woorden heeft 3+ lettergrepen. Vervang moeilijke woorden door eenvoudiger alternatieven.`);
  if (longSentences.length > 0)
    tips.push(`Je hebt ${longSentences.length} zin(nen) van 25+ woorden. Splits deze op in kortere zinnen.`);
  if (score < 60)
    tips.push("Gebruik actieve zinnen in plaats van passieve constructies ('We besloten...' ipv 'Er werd besloten...').");
  if (tips.length === 0)
    tips.push("Je tekst is goed leesbaar. Blijf korte zinnen en eenvoudige woorden gebruiken.");

  return {
    score,
    level,
    levelLabel,
    wordCount: words.length,
    sentenceCount: sentences.length,
    avgWordsPerSentence: avgWordsPerSentence.toFixed(1),
    avgSyllablesPerWord: avgSyllablesPerWord.toFixed(2),
    longWordsPct,
    longWords: longWords.slice(0, 10).map((w) => w.replace(/[^a-zA-Zàáâãäèéêëìíîïòóôõöùúûüñç-]/g, "")),
    tips,
  };
}

export default function LeesbaarheidChecker() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<ReturnType<typeof analyzeText>>(null);

  const handleCheck = () => {
    if (!text.trim()) return;
    setResult(analyzeText(text));
  };

  const scoreColor = (score: number) =>
    score >= 60 ? "text-green-600 bg-green-50 border-green-200"
    : score >= 40 ? "text-amber-600 bg-amber-50 border-amber-200"
    : "text-red-600 bg-red-50 border-red-200";

  return (
    <ToolLayout
      title="Nederlandse Leesbaarheid Checker"
      description="Check het taalniveau van je Nederlandse tekst met de Flesch-Douma score. Ideaal voor overheids&shy;communicatie, beleidsdocumenten en webteksten."
    >
      <div className="space-y-6">
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Plak hier je Nederlandse tekst..."
            rows={8}
            className="w-full rounded-xl border border-gray-300 p-4 text-gray-800 focus:border-blue-500 focus:ring-blue-500"
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              {text.trim().split(/\s+/).filter(Boolean).length} woorden
            </span>
            <button
              onClick={handleCheck}
              disabled={!text.trim()}
              className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Check leesbaarheid
            </button>
          </div>
        </div>

        {result && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Score */}
            <div className="space-y-4">
              <div className={`rounded-xl border p-6 ${scoreColor(result.score)}`}>
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-bold">{result.score}</span>
                  <div>
                    <p className="text-lg font-semibold">{result.levelLabel}</p>
                    <p className="text-sm">Taalniveau: {result.level}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-gray-50 p-3 text-center">
                  <p className="text-2xl font-bold text-gray-900">{result.wordCount}</p>
                  <p className="text-xs text-gray-500">Woorden</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-3 text-center">
                  <p className="text-2xl font-bold text-gray-900">{result.sentenceCount}</p>
                  <p className="text-xs text-gray-500">Zinnen</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-3 text-center">
                  <p className="text-2xl font-bold text-gray-900">{result.avgWordsPerSentence}</p>
                  <p className="text-xs text-gray-500">Woorden/zin</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-3 text-center">
                  <p className="text-2xl font-bold text-gray-900">{result.longWordsPct}%</p>
                  <p className="text-xs text-gray-500">Moeilijke woorden</p>
                </div>
              </div>

              {result.longWords.length > 0 && (
                <div className="rounded-lg border border-gray-200 p-4">
                  <h3 className="text-sm font-medium text-gray-700">Moeilijke woorden (3+ lettergrepen)</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {result.longWords.map((w, i) => (
                      <span key={i} className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-700">
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="space-y-4">
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="font-semibold text-gray-900">Verbeter-tips</h3>
                <ul className="mt-3 space-y-3">
                  {result.tips.map((tip, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700">
                      <span className="mt-0.5 text-blue-500">&#x2022;</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-blue-50 p-4 text-sm text-blue-800">
                <p className="font-medium">Referenties voor taalniveaus:</p>
                <ul className="mt-2 space-y-1 text-xs">
                  <li><strong>80-100:</strong> A2-B1 - Geschikt voor breed publiek</li>
                  <li><strong>60-80:</strong> B1 - Overheids&shy;communicatie streefniveau</li>
                  <li><strong>40-60:</strong> B2 - Gemiddelde zakelijke tekst</li>
                  <li><strong>20-40:</strong> C1 - Complexe vakliteratuur</li>
                  <li><strong>0-20:</strong> C2 - Academisch/juridisch niveau</li>
                </ul>
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-xs text-gray-500">
                <p>
                  Score berekend met de Flesch-Douma formule, de Nederlandse variant van de
                  Flesch Reading Ease. Wil je hulp bij het versimpelen van je beleidsdocumenten?{" "}
                  <a href="/contact" className="text-blue-600 hover:underline">Neem contact op</a>.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
