"use client";

import { useState, useEffect, useRef } from "react";
import { ToolLayout } from "@/components/tool-layout";

export default function VergaderkostenCalculator() {
  const [participants, setParticipants] = useState(6);
  const [avgSalary, setAvgSalary] = useState(55000);
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [meetingsPerWeek, setMeetingsPerWeek] = useState(3);

  // Live timer
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const costPerMinute = (participants * avgSalary) / (52 * 40 * 60);
  const meetingCost = costPerMinute * durationMinutes;
  const weeklyCost = meetingCost * meetingsPerWeek;
  const yearlyCost = weeklyCost * 52;
  const liveCost = costPerMinute * (elapsed / 1000 / 60);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => prev + 100);
      }, 100);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <ToolLayout
      title="Vergaderkosten Calculator"
      description="Bereken wat een vergadering echt kost. Start de live teller tijdens je volgende meeting."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-5 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="font-semibold text-gray-900">Instellingen</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700">Aantal deelnemers</label>
            <input type="number" min={2} value={participants} onChange={(e) => setParticipants(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Gemiddeld bruto jaarsalaris</label>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-sm text-gray-500">&euro;</span>
              <input type="number" min={0} step={1000} value={avgSalary} onChange={(e) => setAvgSalary(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Duur vergadering</label>
            <div className="mt-1 flex items-center gap-3">
              <input type="range" min={15} max={180} step={15} value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))} className="w-full" />
              <span className="w-20 text-right font-medium text-gray-900">{durationMinutes} min</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Vergaderingen per week</label>
            <input type="number" min={1} max={40} value={meetingsPerWeek} onChange={(e) => setMeetingsPerWeek(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900" />
          </div>
        </div>

        <div className="space-y-4">
          {/* Live timer */}
          <div className="rounded-xl bg-gray-900 p-6 text-center">
            <p className="text-sm text-gray-400">Live vergaderteller</p>
            <p className="mt-2 font-mono text-5xl font-bold text-white">{formatTime(elapsed)}</p>
            <p className="mt-2 font-mono text-3xl font-bold text-red-400">
              &euro;{liveCost.toFixed(2)}
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={() => setRunning(!running)}
                className={`rounded-lg px-6 py-2 text-sm font-medium text-white ${running ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
              >
                {running ? "Stop" : "Start"}
              </button>
              <button
                onClick={() => { setRunning(false); setElapsed(0); }}
                className="rounded-lg border border-gray-600 px-6 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Calculated costs */}
          <div className="rounded-xl bg-amber-50 p-6">
            <h2 className="font-semibold text-amber-900">Kosten per vergadering</h2>
            <p className="mt-2 text-3xl font-bold text-amber-600">
              &euro;{meetingCost.toLocaleString("nl-NL", { maximumFractionDigits: 0 })}
            </p>
            <p className="mt-1 text-sm text-amber-700">
              {durationMinutes} minuten &middot; {participants} deelnemers &middot; &euro;{costPerMinute.toFixed(2)}/min
            </p>
          </div>

          <div className="rounded-xl bg-red-50 p-6">
            <h2 className="font-semibold text-red-900">Jaarlijkse vergaderkosten</h2>
            <p className="mt-2 text-3xl font-bold text-red-600">
              &euro;{yearlyCost.toLocaleString("nl-NL", { maximumFractionDigits: 0 })}
            </p>
            <p className="mt-1 text-sm text-red-700">
              {meetingsPerWeek}x per week &middot; &euro;{weeklyCost.toLocaleString("nl-NL", { maximumFractionDigits: 0 })}/week
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-xs text-gray-500">
            <p>
              Berekend op basis van bruto jaarsalaris / 2080 werkuren. Werkelijke kosten liggen
              hoger door werkgeverslasten, voorbereidingstijd en opportunity costs. Wil je weten
              hoe AI je vergadertijd kan halveren?{" "}
              <a href="/contact" className="text-blue-600 hover:underline">Neem contact op</a>.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
