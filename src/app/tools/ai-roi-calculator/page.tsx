"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import type { Metadata } from "next";

interface Results {
  yearlyHoursSaved: number;
  yearlyCostSaved: number;
  implementationCost: number;
  roi: number;
  paybackMonths: number;
}

function calculate(
  employees: number,
  hourlyRate: number,
  hoursPerWeek: number,
  savingsPercent: number,
  implementationCost: number
): Results {
  const yearlyHoursSaved = employees * hoursPerWeek * savingsPercent / 100 * 52;
  const yearlyCostSaved = yearlyHoursSaved * hourlyRate;
  const roi = implementationCost > 0
    ? ((yearlyCostSaved - implementationCost) / implementationCost) * 100
    : 0;
  const paybackMonths = implementationCost > 0
    ? Math.ceil(implementationCost / (yearlyCostSaved / 12))
    : 0;

  return { yearlyHoursSaved, yearlyCostSaved, implementationCost, roi, paybackMonths };
}

function InputField({
  label,
  hint,
  value,
  onChange,
  prefix,
  suffix,
  min = 0,
  step = 1,
}: {
  label: string;
  hint?: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  step?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
      <div className="mt-1 flex items-center gap-2">
        {prefix && <span className="text-sm text-gray-500">{prefix}</span>}
        <input
          type="number"
          min={min}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {suffix && <span className="text-sm text-gray-500">{suffix}</span>}
      </div>
    </div>
  );
}

export default function AIROICalculator() {
  const [employees, setEmployees] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(50);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [savingsPercent, setSavingsPercent] = useState(20);
  const [implementationCost, setImplementationCost] = useState(15000);

  const results = calculate(employees, hourlyRate, hoursPerWeek, savingsPercent, implementationCost);

  return (
    <ToolLayout
      title="AI ROI Calculator"
      description="Bereken hoeveel jouw organisatie kan besparen met AI. Vul de gegevens in en zie direct het resultaat."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="font-semibold text-gray-900">Jouw situatie</h2>
          <InputField
            label="Aantal medewerkers"
            hint="Hoeveel mensen gaan AI gebruiken?"
            value={employees}
            onChange={setEmployees}
            min={1}
          />
          <InputField
            label="Gemiddeld uurtarief"
            hint="Bruto kosten per uur per medewerker"
            value={hourlyRate}
            onChange={setHourlyRate}
            prefix="€"
            min={1}
          />
          <InputField
            label="Werkuren per week per persoon"
            value={hoursPerWeek}
            onChange={setHoursPerWeek}
            suffix="uur"
            min={1}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Geschatte tijdsbesparing door AI
            </label>
            <p className="text-xs text-gray-400">
              Hoeveel procent sneller werken medewerkers met AI?
            </p>
            <div className="mt-1 flex items-center gap-3">
              <input
                type="range"
                min={5}
                max={50}
                value={savingsPercent}
                onChange={(e) => setSavingsPercent(Number(e.target.value))}
                className="w-full"
              />
              <span className="w-12 text-right font-medium text-gray-900">
                {savingsPercent}%
              </span>
            </div>
          </div>
          <InputField
            label="Implementatiekosten (eenmalig)"
            hint="Training, licenties, consulting, etc."
            value={implementationCost}
            onChange={setImplementationCost}
            prefix="€"
          />
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="rounded-xl bg-blue-50 p-6">
            <h2 className="font-semibold text-blue-900">Jaarlijkse besparing</h2>
            <p className="mt-2 text-4xl font-bold text-blue-600">
              €{results.yearlyCostSaved.toLocaleString("nl-NL", { maximumFractionDigits: 0 })}
            </p>
            <p className="mt-1 text-sm text-blue-700">
              {results.yearlyHoursSaved.toLocaleString("nl-NL", { maximumFractionDigits: 0 })} uur bespaard per jaar
            </p>
          </div>
          <div className="rounded-xl bg-green-50 p-6">
            <h2 className="font-semibold text-green-900">Return on Investment</h2>
            <p className="mt-2 text-4xl font-bold text-green-600">
              {results.roi > 0 ? `${results.roi.toFixed(0)}%` : "—"}
            </p>
            <p className="mt-1 text-sm text-green-700">
              ROI in het eerste jaar
            </p>
          </div>
          <div className="rounded-xl bg-amber-50 p-6">
            <h2 className="font-semibold text-amber-900">Terugverdientijd</h2>
            <p className="mt-2 text-4xl font-bold text-amber-600">
              {results.paybackMonths > 0 ? `${results.paybackMonths} maanden` : "—"}
            </p>
            <p className="mt-1 text-sm text-amber-700">
              Voordat de investering is terugverdiend
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-xs text-gray-500">
            <p>
              <strong>Let op:</strong> Dit is een schatting. De werkelijke besparing
              hangt af van het type werk, de AI-tools die je inzet, en hoe goed je
              team ze leert gebruiken. Benieuwd wat AI voor jouw organisatie kan
              betekenen?{" "}
              <a href="/contact" className="text-blue-600 hover:underline">
                Neem contact op
              </a>{" "}
              voor een vrijblijvend gesprek.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
