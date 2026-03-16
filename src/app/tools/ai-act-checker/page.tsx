"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";

type RiskLevel = "verboden" | "hoog" | "beperkt" | "minimaal" | null;

interface Question {
  id: string;
  text: string;
  explanation: string;
  options: { label: string; value: string }[];
}

const questions: Question[] = [
  {
    id: "manipulation",
    text: "Wordt het AI-systeem gebruikt om mensen te manipuleren of misleiden?",
    explanation: "Denk aan subliminale technieken, misbruik van kwetsbaarheden, of social scoring door overheden.",
    options: [
      { label: "Ja, het systeem kan gedrag manipuleren", value: "verboden" },
      { label: "Nee", value: "next" },
    ],
  },
  {
    id: "biometric_realtime",
    text: "Gebruikt het systeem real-time biometrische identificatie in openbare ruimtes?",
    explanation: "Bijv. gezichtsherkenning van voorbijgangers op straat of in winkels, live.",
    options: [
      { label: "Ja", value: "verboden" },
      { label: "Nee", value: "next" },
    ],
  },
  {
    id: "social_scoring",
    text: "Beoordeelt het systeem mensen op basis van sociaal gedrag of persoonlijkheid?",
    explanation: "Social scoring door overheden of bedrijven dat leidt tot nadelige behandeling.",
    options: [
      { label: "Ja", value: "verboden" },
      { label: "Nee", value: "next" },
    ],
  },
  {
    id: "critical_infrastructure",
    text: "Wordt het systeem ingezet voor kritieke infrastructuur?",
    explanation: "Bijv. beheer van water, gas, elektriciteit, verkeer, of digitale infrastructuur.",
    options: [
      { label: "Ja, het neemt beslissingen over kritieke systemen", value: "hoog" },
      { label: "Nee", value: "next" },
    ],
  },
  {
    id: "education_employment",
    text: "Wordt het systeem gebruikt voor onderwijs- of werkgelegenheidsbeslissingen?",
    explanation: "Bijv. toelatingsbeslissingen, examenbeoordeling, CV-screening, sollicitantenselectie, ontslagbeslissingen.",
    options: [
      { label: "Ja, het beinvloedt onderwijs- of arbeidsbeslissingen", value: "hoog" },
      { label: "Nee", value: "next" },
    ],
  },
  {
    id: "essential_services",
    text: "Beinvloedt het systeem toegang tot essentiele diensten?",
    explanation: "Bijv. kredietbeoordeling, verzekeringspremies, sociale voorzieningen, medische prioritering.",
    options: [
      { label: "Ja", value: "hoog" },
      { label: "Nee", value: "next" },
    ],
  },
  {
    id: "law_enforcement",
    text: "Wordt het systeem gebruikt door rechtshandhaving of justitie?",
    explanation: "Bijv. risicobeoordeling van verdachten, bewijsanalyse, predictive policing.",
    options: [
      { label: "Ja", value: "hoog" },
      { label: "Nee", value: "next" },
    ],
  },
  {
    id: "biometric_categorization",
    text: "Categoriseert het systeem mensen op basis van biometrische gegevens?",
    explanation: "Bijv. emotieherkenning, leeftijdschatting, geslachtsbepaling via camera.",
    options: [
      { label: "Ja", value: "hoog" },
      { label: "Nee", value: "next" },
    ],
  },
  {
    id: "transparency",
    text: "Communiceert het systeem direct met mensen (chatbot, deepfake, gegenereerde content)?",
    explanation: "AI-systemen die tekst genereren, afbeeldingen maken, of als chatbot fungeren moeten transparant zijn.",
    options: [
      { label: "Ja, het genereert content of communiceert met mensen", value: "beperkt" },
      { label: "Nee", value: "next" },
    ],
  },
];

const riskInfo: Record<string, { color: string; bg: string; border: string; label: string; description: string; actions: string[]; deadline: string }> = {
  verboden: {
    color: "text-red-700", bg: "bg-red-50", border: "border-red-200",
    label: "Verboden AI-systeem",
    description: "Jouw AI-toepassing valt waarschijnlijk onder de categorie 'onaanvaardbaar risico'. Deze systemen zijn verboden onder de EU AI Act.",
    actions: [
      "Stop direct met de ontwikkeling of inzet van dit systeem",
      "Raadpleeg een juridisch adviseur gespecialiseerd in AI-wetgeving",
      "Onderzoek of er een uitzondering van toepassing is (bijv. rechtshandhaving met rechterlijke toestemming)",
    ],
    deadline: "Verbod geldt vanaf 2 februari 2025",
  },
  hoog: {
    color: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200",
    label: "Hoog risico AI-systeem",
    description: "Jouw AI-toepassing valt waarschijnlijk in de categorie 'hoog risico'. Het systeem mag worden ingezet, maar moet voldoen aan strenge eisen.",
    actions: [
      "Voer een conformiteitsbeoordeling uit",
      "Implementeer een risicobeheersysteem",
      "Zorg voor data governance en documentatie",
      "Bouw menselijk toezicht in (human-in-the-loop)",
      "Registreer het systeem in de EU-database",
      "Stel technische documentatie op",
      "Implementeer logging en monitoring",
    ],
    deadline: "Verplichtingen gelden vanaf 2 augustus 2026",
  },
  beperkt: {
    color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200",
    label: "Beperkt risico AI-systeem",
    description: "Jouw AI-toepassing valt onder 'beperkt risico'. De hoofdverplichting is transparantie richting gebruikers.",
    actions: [
      "Maak duidelijk dat gebruikers met een AI-systeem communiceren",
      "Label AI-gegenereerde content als zodanig (tekst, beeld, audio, video)",
      "Informeer gebruikers over de mogelijkheden en beperkingen van het systeem",
      "Bij deepfakes: verplichte labeling",
    ],
    deadline: "Transparantieverplichtingen gelden vanaf 2 augustus 2025",
  },
  minimaal: {
    color: "text-green-700", bg: "bg-green-50", border: "border-green-200",
    label: "Minimaal risico AI-systeem",
    description: "Jouw AI-toepassing valt onder 'minimaal risico'. Er zijn geen specifieke verplichtingen, maar vrijwillige gedragscodes worden aangemoedigd.",
    actions: [
      "Overweeg vrijwillig een gedragscode op te stellen",
      "Documenteer hoe het systeem werkt voor interne transparantie",
      "Blijf de AI Act volgen - classificaties kunnen veranderen bij updates",
      "Zorg voor AI-geletterdheid bij medewerkers die het systeem gebruiken (verplicht sinds feb 2025)",
    ],
    deadline: "Geen specifieke deadline, maar AI-geletterdheid is al verplicht",
  },
};

export default function AIActChecker() {
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<RiskLevel>(null);

  const handleAnswer = (value: string) => {
    if (value === "next") {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setResult("minimaal");
      }
    } else {
      setResult(value as RiskLevel);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setResult(null);
  };

  return (
    <ToolLayout
      title="EU AI Act Risicoclassificatie"
      description="Beantwoord een paar vragen en ontdek in welke risicocategorie jouw AI-toepassing valt volgens de EU AI Act. Met concrete actiepunten en deadlines."
    >
      {!result ? (
        <div className="mx-auto max-w-2xl">
          {/* Progress */}
          <div className="mb-6 flex items-center gap-2">
            <div className="h-2 flex-1 rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-blue-600 transition-all"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-500">
              Vraag {currentStep + 1} van {questions.length}
            </span>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-8">
            <h2 className="text-lg font-semibold text-gray-900">
              {questions[currentStep].text}
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              {questions[currentStep].explanation}
            </p>
            <div className="mt-6 space-y-3">
              {questions[currentStep].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-left text-sm text-gray-700 transition hover:border-blue-400 hover:bg-blue-50"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="mt-4 text-sm text-gray-500 hover:text-gray-700"
            >
              &larr; Vorige vraag
            </button>
          )}
        </div>
      ) : (
        <div className="mx-auto max-w-2xl space-y-6">
          <div className={`rounded-xl border p-8 ${riskInfo[result].bg} ${riskInfo[result].border}`}>
            <h2 className={`text-2xl font-bold ${riskInfo[result].color}`}>
              {riskInfo[result].label}
            </h2>
            <p className="mt-3 text-gray-700">{riskInfo[result].description}</p>
            <p className="mt-2 text-sm font-medium text-gray-600">
              Deadline: {riskInfo[result].deadline}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="font-semibold text-gray-900">Wat moet je doen?</h3>
            <ul className="mt-3 space-y-2">
              {riskInfo[result].actions.map((action, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700">
                  <span className="font-medium text-blue-600">{i + 1}.</span>
                  {action}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-xs text-gray-500">
            <p>
              <strong>Let op:</strong> Dit is een indicatieve tool, geen juridisch advies. De
              exacte classificatie hangt af van specifieke omstandigheden. Wil je zeker weten
              of jouw organisatie compliant is?{" "}
              <a href="/contact" className="text-blue-600 hover:underline">
                Neem contact op
              </a>{" "}
              voor een AI Act assessment.
            </p>
          </div>

          <button
            onClick={reset}
            className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Opnieuw beginnen
          </button>
        </div>
      )}
    </ToolLayout>
  );
}
