"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";

// Prijzen in euro per gebruiker per maand (indicatieve EU-lijstprijs).
const COPILOT_PRICES: Record<string, { label: string; price: number }> = {
  m365: { label: "Microsoft 365 Copilot", price: 28 },
  custom: { label: "Aangepast bedrag", price: 0 },
};

export default function CopilotROICalculator() {
  const [users, setUsers] = useState(50);
  const [tier, setTier] = useState("m365");
  const [customPrice, setCustomPrice] = useState(28);
  const [avgSalary, setAvgSalary] = useState(55000);
  const [hoursSavedPerWeek, setHoursSavedPerWeek] = useState(5);

  const pricePerUser = tier === "custom" ? customPrice : COPILOT_PRICES[tier].price;
  const monthlyCost = users * pricePerUser;
  const yearlyCost = monthlyCost * 12;

  const hourlyRate = avgSalary / (52 * 40);
  const yearlyHoursSaved = users * hoursSavedPerWeek * 52;
  const yearlySavings = yearlyHoursSaved * hourlyRate;
  const netBenefit = yearlySavings - yearlyCost;
  const roi = yearlyCost > 0 ? ((yearlySavings - yearlyCost) / yearlyCost) * 100 : 0;
  const paybackMonths = monthlyCost > 0 ? Math.ceil(yearlyCost / (yearlySavings / 12)) : 0;
  const costPerSavedHour = yearlyHoursSaved > 0 ? yearlyCost / yearlyHoursSaved : 0;

  return (
    <ToolLayout
      title="Microsoft Copilot ROI Calculator"
      description="Maak een eerste schatting of Microsoft Copilot de investering waard is voor jouw organisatie. Reken conservatief en valideer met een eigen pilot; de uitkomst is een indicatie, geen belofte."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-5 rounded-xl border border-line bg-card p-6">
          <h2 className="font-semibold text-ink">Jouw situatie</h2>

          <div>
            <label className="block text-sm font-medium text-ink-soft">Copilot licentie</label>
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value)}
              className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm"
            >
              {Object.entries(COPILOT_PRICES).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          {tier === "custom" && (
            <div>
              <label className="block text-sm font-medium text-ink-soft">Prijs per gebruiker/maand</label>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm text-ink-soft">&euro;</span>
                <input type="number" min={0} value={customPrice} onChange={(e) => setCustomPrice(Number(e.target.value))}
                  className="w-full rounded-lg border border-line px-3 py-2 text-ink" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-ink-soft">Aantal gebruikers</label>
            <input type="number" min={1} value={users} onChange={(e) => setUsers(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-ink" />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-soft">Gemiddeld bruto jaarsalaris</label>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-sm text-ink-soft">&euro;</span>
              <input type="number" min={0} step={1000} value={avgSalary} onChange={(e) => setAvgSalary(Number(e.target.value))}
                className="w-full rounded-lg border border-line px-3 py-2 text-ink" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-soft">Geschatte tijdsbesparing per persoon</label>
            <p className="text-xs text-ink-soft">In opdrachtonderzoek van Forrester (TEI, in opdracht van Microsoft) rapporteren gebruikers tijdwinst. Reken conservatief, bijvoorbeeld 3-4 uur, en meet het na in een eigen pilot.</p>
            <div className="mt-1 flex items-center gap-3">
              <input type="range" min={1} max={15} value={hoursSavedPerWeek}
                onChange={(e) => setHoursSavedPerWeek(Number(e.target.value))} className="w-full" />
              <span className="w-16 text-right font-medium text-ink">{hoursSavedPerWeek} uur/wk</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-red-50 p-6">
            <h2 className="font-semibold text-red-900">Jaarlijkse kosten Copilot</h2>
            <p className="mt-2 text-3xl font-bold text-red-600">
              &euro;{yearlyCost.toLocaleString("nl-NL", { maximumFractionDigits: 0 })}
            </p>
            <p className="mt-1 text-sm text-red-700">
              &euro;{monthlyCost.toLocaleString("nl-NL")} per maand &middot; &euro;{pricePerUser}/gebruiker/maand
            </p>
          </div>

          <div className="rounded-xl bg-accent-soft p-6">
            <h2 className="font-semibold text-ink">Jaarlijkse besparing (productiviteit)</h2>
            <p className="mt-2 text-3xl font-bold text-accent">
              &euro;{yearlySavings.toLocaleString("nl-NL", { maximumFractionDigits: 0 })}
            </p>
            <p className="mt-1 text-sm text-accent">
              {yearlyHoursSaved.toLocaleString("nl-NL")} uur bespaard per jaar
            </p>
          </div>

          <div className={`rounded-xl p-6 ${netBenefit >= 0 ? "bg-green-50" : "bg-amber-50"}`}>
            <h2 className={`font-semibold ${netBenefit >= 0 ? "text-green-900" : "text-amber-900"}`}>
              Netto resultaat
            </h2>
            <p className={`mt-2 text-3xl font-bold ${netBenefit >= 0 ? "text-green-600" : "text-amber-600"}`}>
              {netBenefit >= 0 ? "+" : ""}&euro;{netBenefit.toLocaleString("nl-NL", { maximumFractionDigits: 0 })}
            </p>
            <p className={`mt-1 text-sm ${netBenefit >= 0 ? "text-green-700" : "text-amber-700"}`}>
              ROI: {roi.toFixed(0)}% &middot; Terugverdientijd: {paybackMonths > 0 && paybackMonths < 999 ? `${paybackMonths} maanden` : "n.v.t."}
            </p>
          </div>

          <div className="rounded-xl border border-line bg-card p-4 text-sm text-ink-soft">
            <p><strong>Kosten per bespaard uur:</strong> &euro;{costPerSavedHour.toFixed(2)}</p>
            <p className="mt-1"><strong>Effectief uurtarief medewerker:</strong> &euro;{hourlyRate.toFixed(2)}</p>
            <p className="mt-2 text-xs text-ink-soft">
              Indicatieve schatting. Het effectieve uurtarief rekent met 52 weken van 40 uur en laat
              werkgeverslasten en niet-werkbare uren (vakantie, feestdagen) buiten beschouwing, dus de
              werkelijke kosten per uur liggen hoger. De besparing hangt sterk af van adoptie en training.{" "}
              <a href="/contact" className="text-accent hover:underline">Neem contact op</a> voor een Copilot-training op maat.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
