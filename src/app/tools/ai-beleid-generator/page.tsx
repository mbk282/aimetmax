"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";

const DATA_OPTIES = [
  "Persoonsgegevens (namen, adressen, BSN, dossiers)",
  "Klant- of patiëntgegevens",
  "Wachtwoorden, sleutels en inloggegevens",
  "Broncode",
  "Financiële of koersgevoelige informatie",
  "Vertrouwelijke of nog niet aangekondigde plannen",
];

type Publiek = "verboden" | "alleen_zakelijk" | "met_voorwaarden";
type Melden = "altijd" | "bij_impact" | "niet";

function bouwBeleid(opts: {
  org: string;
  publiek: Publiek;
  tools: string;
  verboden: string[];
  melden: Melden;
  verantwoordelijk: string;
  ingehuurd: boolean;
  contact: string;
}): string {
  const org = opts.org.trim() || "[organisatie]";
  const tools = opts.tools.trim() || "de door de organisatie goedgekeurde AI-tools";

  const publiekRegel = {
    verboden:
      "Het gebruik van publieke, gratis AI-tools (zoals het gratis chatgpt.com) voor werk is niet toegestaan. Gebruik uitsluitend de afgeschermde, zakelijke AI-omgeving die de organisatie aanbiedt.",
    alleen_zakelijk:
      "Gebruik voor werk uitsluitend de afgeschermde, zakelijke AI-omgeving. Daar is contractueel geregeld dat er niet op jouw invoer wordt getraind en dat data veilig wordt opgeslagen. Publieke, gratis tools zijn voor werk niet bedoeld.",
    met_voorwaarden:
      "Publieke AI-tools mogen worden gebruikt voor niet-vertrouwelijke taken, mits je je houdt aan de regels hieronder over welke informatie de AI niet in mag. Voor alles wat vertrouwelijk is, gebruik je de afgeschermde zakelijke omgeving.",
  }[opts.publiek];

  const meldenRegel = {
    altijd:
      "Vermeld het wanneer AI substantieel heeft meegeschreven of meegewerkt aan iets dat je deelt of oplevert.",
    bij_impact:
      "Vermeld het gebruik van AI bij stukken met gevolgen voor anderen (adviezen, beslissingen, externe communicatie). Bij hulpmiddelen zoals een spellingcheck of een opgepoetste interne mail hoeft dat niet.",
    niet:
      "Er geldt geen algemene meldplicht voor AI-gebruik. Wees wel transparant als een collega of klant zich bekocht zou voelen als die wist dat AI meeschreef.",
  }[opts.melden];

  const verantwoordelijk =
    opts.verantwoordelijk.trim() || "de medewerker onder wiens naam het werk naar buiten gaat";

  const verbodenLijst =
    opts.verboden.length > 0
      ? opts.verboden.map((v) => `- ${v}`).join("\n")
      : "- (vul aan welke informatie bij jullie vertrouwelijk is)";

  const reikwijdte = opts.ingehuurd
    ? "Dit beleid geldt voor alle medewerkers en voor ingehuurde krachten, freelancers en dienstverleners die namens de organisatie met AI werken."
    : "Dit beleid geldt voor alle medewerkers van de organisatie.";

  const contactRegel = opts.contact.trim()
    ? `Vragen, twijfels of een idee? Neem contact op met ${opts.contact.trim()}. Twijfel je of iets mag, vraag het dan eerst.`
    : "Twijfel je of iets mag? Vraag het dan eerst aan je leidinggevende of de AI-verantwoordelijke, voordat je het doet.";

  return `# AI-gebruiksbeleid ${org}

*Startversie. Pas dit aan op jullie eigen situatie. Dit is een levend document, geen juridisch advies.*

## 1. Waarom dit beleid
AI-tools kunnen veel werk makkelijker maken, mits we ze verstandig en veilig gebruiken. Dit beleid legt vast wat wel en niet mag, zodat iedereen met een gerust hart met AI kan werken. Het ondersteunt tegelijk de invulling van de AI-geletterdheidsplicht uit de Europese AI-verordening (artikel 4): de plicht om te zorgen dat mensen die met AI werken, weten wat ze doen.

${reikwijdte}

## 2. Welke tools
Voor werk gebruik je: ${tools}.

${publiekRegel}

## 3. Wat gaat de AI niet in
Zet de volgende informatie nooit in een AI-tool, tenzij in een afgeschermde zakelijke omgeving die daar uitdrukkelijk voor is goedgekeurd:

${verbodenLijst}

Vuistregel: wat publiek beschikbaar is, mag erin. De rest niet. En deel sowieso niet meer dan nodig (een geanonimiseerde casus werkt net zo goed als een echte).

## 4. Controleren en verantwoordelijkheid
AI kan overtuigend klinken en toch fout zitten. Controleer de output voordat je er iets mee doet, en zwaarder naarmate de gevolgen groter zijn (een contract of een advies aan een klant check je grondiger dan een kladversie).

Eindverantwoordelijk voor wat er naar buiten gaat is ${verantwoordelijk}. "De AI deed het" is geen excuus.

## 5. Transparantie
${meldenRegel}

## 6. AI-geletterdheid
We zorgen dat iedereen die met AI werkt de basis kent: wat AI wel en niet kan, hoe je het verantwoord gebruikt, en welke regels hierboven gelden. Nieuwe medewerkers en ingehuurde krachten krijgen deze basis voordat ze met AI aan het werk gaan. Een laagdrempelige start is de gratis AI-academy op aimetmax.nl/academy.

## 7. Vragen en contact
${contactRegel}

---
*Opgesteld met de gratis AI-gebruiksbeleid generator op aimetmax.nl. Dit is een startpunt, geen juridisch advies. Laat een definitieve versie toetsen binnen je organisatie.*`;
}

export default function AIBeleidGenerator() {
  const [org, setOrg] = useState("");
  const [publiek, setPubliek] = useState<Publiek>("alleen_zakelijk");
  const [tools, setTools] = useState("");
  const [verboden, setVerboden] = useState<string[]>([...DATA_OPTIES]);
  const [melden, setMelden] = useState<Melden>("bij_impact");
  const [verantwoordelijk, setVerantwoordelijk] = useState("");
  const [ingehuurd, setIngehuurd] = useState(true);
  const [contact, setContact] = useState("");
  const [resultaat, setResultaat] = useState("");
  const [copied, setCopied] = useState(false);

  const toggleData = (v: string) =>
    setVerboden((cur) => (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]));

  const genereer = () =>
    setResultaat(
      bouwBeleid({ org, publiek, tools, verboden, melden, verantwoordelijk, ingehuurd, contact })
    );

  const kopieer = () => {
    navigator.clipboard.writeText(resultaat);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    const blob = new Blob([resultaat], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ai-gebruiksbeleid.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const radio = "mt-1 flex-none accent-[#E8590C]";

  return (
    <ToolLayout
      title="AI-gebruiksbeleid generator"
      description="Beantwoord een paar vragen en krijg een startversie van een AI-gebruiksbeleid voor je organisatie. Een basis om aan te passen, niet een kant-en-klaar juridisch document. Alles in je browser."
      hideCta
    >
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="warm-card p-6">
          <label className="block text-sm font-semibold text-ink">Naam van de organisatie (optioneel)</label>
          <input
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            placeholder="bijv. Gemeente Voorbeeld"
            className="mt-2 w-full rounded-xl border-2 border-line bg-card p-2.5 text-sm text-ink focus:border-accent focus:outline-none"
          />
        </div>

        <div className="warm-card p-6">
          <p className="text-sm font-semibold text-ink">Publieke AI-tools (zoals gratis ChatGPT)</p>
          <div className="mt-3 space-y-2 text-sm text-ink-soft">
            {([
              ["alleen_zakelijk", "Alleen de afgeschermde zakelijke omgeving gebruiken"],
              ["met_voorwaarden", "Publieke tools mogen, met regels over welke data niet"],
              ["verboden", "Publieke tools helemaal niet toegestaan voor werk"],
            ] as [Publiek, string][]).map(([val, lab]) => (
              <label key={val} className="flex items-start gap-2">
                <input type="radio" name="publiek" checked={publiek === val} onChange={() => setPubliek(val)} className={radio} />
                {lab}
              </label>
            ))}
          </div>
          <label className="mt-4 block text-sm font-semibold text-ink">Welke tools zijn goedgekeurd? (optioneel)</label>
          <input
            value={tools}
            onChange={(e) => setTools(e.target.value)}
            placeholder="bijv. Microsoft 365 Copilot (zakelijke omgeving), ChatGPT Enterprise"
            className="mt-2 w-full rounded-xl border-2 border-line bg-card p-2.5 text-sm text-ink focus:border-accent focus:outline-none"
          />
        </div>

        <div className="warm-card p-6">
          <p className="text-sm font-semibold text-ink">Wat mag nooit in een (publieke) AI-tool?</p>
          <div className="mt-3 space-y-2 text-sm text-ink-soft">
            {DATA_OPTIES.map((v) => (
              <label key={v} className="flex items-start gap-2">
                <input type="checkbox" checked={verboden.includes(v)} onChange={() => toggleData(v)} className="mt-1 flex-none accent-[#E8590C]" />
                {v}
              </label>
            ))}
          </div>
        </div>

        <div className="warm-card p-6">
          <p className="text-sm font-semibold text-ink">Moet AI-gebruik gemeld worden?</p>
          <div className="mt-3 space-y-2 text-sm text-ink-soft">
            {([
              ["bij_impact", "Bij stukken met gevolgen voor anderen, niet bij hulpmiddelen"],
              ["altijd", "Altijd vermelden bij substantieel AI-gebruik"],
              ["niet", "Geen algemene meldplicht"],
            ] as [Melden, string][]).map(([val, lab]) => (
              <label key={val} className="flex items-start gap-2">
                <input type="radio" name="melden" checked={melden === val} onChange={() => setMelden(val)} className={radio} />
                {lab}
              </label>
            ))}
          </div>
        </div>

        <div className="warm-card p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-ink">Wie is eindverantwoordelijk? (optioneel)</label>
            <input
              value={verantwoordelijk}
              onChange={(e) => setVerantwoordelijk(e.target.value)}
              placeholder="de medewerker onder wiens naam het werk naar buiten gaat"
              className="mt-2 w-full rounded-xl border-2 border-line bg-card p-2.5 text-sm text-ink focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-ink">Vraagbaak / AI-verantwoordelijke (optioneel)</label>
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="bijv. je leidinggevende, of naam van de AI-verantwoordelijke"
              className="mt-2 w-full rounded-xl border-2 border-line bg-card p-2.5 text-sm text-ink focus:border-accent focus:outline-none"
            />
          </div>
          <label className="flex items-start gap-2 text-sm text-ink-soft">
            <input type="checkbox" checked={ingehuurd} onChange={(e) => setIngehuurd(e.target.checked)} className="mt-1 flex-none accent-[#E8590C]" />
            Het beleid geldt ook voor ingehuurde krachten en freelancers
          </label>
        </div>

        <button onClick={genereer} className="btn btn-primary">
          Genereer mijn AI-beleid
        </button>

        {resultaat && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-bold text-ink">Je startversie</h2>
              <div className="flex gap-2">
                <button onClick={kopieer} className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark">
                  {copied ? "Gekopieerd!" : "Kopieer"}
                </button>
                <button onClick={download} className="rounded-lg border-2 border-line px-4 py-2 text-sm font-medium text-ink-soft hover:bg-paper">
                  Download .md
                </button>
              </div>
            </div>
            <pre className="max-h-[480px] overflow-auto rounded-xl border-2 border-line bg-card p-4 text-sm whitespace-pre-wrap text-ink">
              {resultaat}
            </pre>

            <div className="warm-card bg-sage-soft p-6">
              <h3 className="hand text-xl font-bold text-ink">Een beleid dat ook echt landt?</h3>
              <p className="mt-2 text-sm text-ink-soft">
                Een goed AI-beleid is meer dan een document: het werkt pas als mensen het kennen en gebruiken.
                Wil je het op maat maken voor jouw organisatie, koppelen aan training en aantoonbaar maken voor de
                AI-geletterdheidsplicht? Dan denk ik graag mee.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href="/contact" className="btn btn-primary">Bekijk wat ik voor je kan doen</a>
                <a href="/academy" className="btn btn-ghost">Naar de gratis academy</a>
              </div>
            </div>
            <p className="text-xs text-ink-soft/80">
              Let op: dit is een startpunt, geen juridisch advies. De exacte eisen kunnen per organisatie en in de tijd
              verschillen; laat een definitieve versie binnen je organisatie toetsen.
            </p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
