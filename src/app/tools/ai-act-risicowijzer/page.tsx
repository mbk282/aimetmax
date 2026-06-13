"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";

type Cat = "verboden" | "hoog" | "beperkt" | "minimaal";

const CAT_INFO: Record<Cat, { label: string; badge: string; uitleg: string }> = {
  verboden: {
    label: "Verboden",
    badge: "bg-red-100 text-red-700",
    uitleg:
      "Deze toepassingen zijn onder de AI-verordening niet toegestaan (onaanvaardbaar risico).",
  },
  hoog: {
    label: "Hoog risico",
    badge: "bg-orange-100 text-orange-700",
    uitleg:
      "Mag wel, maar met strenge eisen: risicobeheer, menselijk toezicht, data-governance, documentatie en registratie. De deadline hiervoor schuift via de Digital Omnibus naar verwachting door naar eind 2027.",
  },
  beperkt: {
    label: "Beperkt risico",
    badge: "bg-amber-100 text-amber-700",
    uitleg:
      "Vooral transparantie: maak duidelijk dat mensen met AI te maken hebben en label AI-content. Deze verplichtingen (artikel 50) gelden vanaf 2 augustus 2026.",
  },
  minimaal: {
    label: "Minimaal risico",
    badge: "bg-sage-soft text-sage",
    uitleg:
      "Geen specifieke verplichtingen onder de AI-verordening. Let op: de AI-geletterdheidsplicht (artikel 4) geldt hier wel gewoon.",
  },
};

const USECASES: { naam: string; cat: Cat; wat: string }[] = [
  // Verboden
  { naam: "Emotieherkenning van medewerkers of studenten", cat: "verboden", wat: "Emoties afleiden op werk of in het onderwijs is verboden, op smalle uitzonderingen na (medisch of veiligheid)." },
  { naam: "Mensen een score geven op basis van sociaal gedrag (social scoring)", cat: "verboden", wat: "Mensen beoordelen of benadelen op basis van gedrag of persoonlijkheid over meerdere contexten heen is verboden." },
  { naam: "Een gezichtsherkenningsdatabank vullen door internet te scrapen", cat: "verboden", wat: "Ongericht beelden van internet of camerabeelden schrapen om gezichten te herkennen is verboden." },
  { naam: "Realtime gezichtsherkenning in de openbare ruimte", cat: "verboden", wat: "In principe verboden; alleen voor rechtshandhaving gelden zeer smalle, vooraf goedgekeurde uitzonderingen." },
  // Hoog
  { naam: "CV's screenen of sollicitanten selecteren", cat: "hoog", wat: "Werving en selectie staat expliciet in de hoog-risicolijst (bijlage III). Menselijk toezicht en zorgvuldigheid zijn vereist." },
  { naam: "Medewerkers beoordelen, promoveren of ontslaan", cat: "hoog", wat: "Beslissingen over de loopbaan van mensen vallen onder hoog risico. Houd een mens eindverantwoordelijk." },
  { naam: "Kredietwaardigheid van mensen beoordelen", cat: "hoog", wat: "Kredietscoring (m.u.v. fraudedetectie) is hoog risico vanwege de impact op toegang tot diensten." },
  { naam: "Toegang tot uitkeringen of essentiële diensten bepalen", cat: "hoog", wat: "AI die bepaalt of iemand een voorziening krijgt, raakt grondrechten en is hoog risico." },
  { naam: "Toelating of examenbeoordeling in het onderwijs", cat: "hoog", wat: "AI die toelating of cijfers bepaalt valt onder hoog risico." },
  { naam: "Verzekeringen: premie of acceptatie (leven en zorg)", cat: "hoog", wat: "Risicobeoordeling en prijsstelling voor levens- en zorgverzekeringen is hoog risico." },
  { naam: "Risicobeoordeling door politie of justitie", cat: "hoog", wat: "AI die het risico van personen inschat in de rechtshandhaving is hoog risico." },
  // Beperkt
  { naam: "Een chatbot of virtuele assistent voor klanten", cat: "beperkt", wat: "Maak duidelijk dat de gebruiker met een AI praat, niet met een mens." },
  { naam: "AI-gegenereerde content, beeld of deepfakes publiceren", cat: "beperkt", wat: "AI-gegenereerde of bewerkte content moet als zodanig herkenbaar zijn (labelen)." },
  { naam: "Klantcontact analyseren op sentiment (waar toegestaan)", cat: "beperkt", wat: "Waar emotie-/sentimentanalyse is toegestaan, moet je mensen erover informeren." },
  // Minimaal
  { naam: "Documenten, mails of verslagen laten samenvatten of schrijven (Copilot, ChatGPT)", cat: "minimaal", wat: "Geen specifieke AI Act-verplichtingen. Wel: geen vertrouwelijke data in publieke tools, en controleer de output." },
  { naam: "Notulen van een vergadering laten uitwerken", cat: "minimaal", wat: "Minimaal risico. Let op vertrouwelijkheid bij gevoelige vergaderingen." },
  { naam: "Teksten vertalen", cat: "minimaal", wat: "Minimaal risico onder de AI-verordening." },
  { naam: "Brainstormen of teksten herschrijven", cat: "minimaal", wat: "Minimaal risico. Een prima en veilige eerste toepassing om mee te oefenen." },
  { naam: "Spamfilter of spellingcontrole", cat: "minimaal", wat: "Minimaal risico; dit gebruik je vaak al jaren." },
];

const VOLGORDE: Cat[] = ["verboden", "hoog", "beperkt", "minimaal"];

export default function AIActRisicowijzer() {
  const [q, setQ] = useState("");
  const [actief, setActief] = useState<Cat | "alle">("alle");

  const zoek = q.trim().toLowerCase();
  const gefilterd = USECASES.filter(
    (u) =>
      (actief === "alle" || u.cat === actief) &&
      (zoek === "" || u.naam.toLowerCase().includes(zoek) || u.wat.toLowerCase().includes(zoek))
  );

  return (
    <ToolLayout
      title="AI Act risicowijzer per use-case"
      description="Zoek je concrete AI-toepassing op en zie meteen in welke risicocategorie van de EU-verordening die valt en wat dat betekent. Een snelle wegwijzer; voor de officiële afweging is er ook de stap-voor-stap AI Act-checker."
      hideCta
    >
      <div className="mx-auto max-w-3xl">
        <div className="warm-card bg-sage-soft p-5">
          <p className="text-sm text-ink-soft">
            <strong className="text-ink">Geldt voor elke categorie:</strong> de
            AI-geletterdheidsplicht (artikel 4 van de AI-verordening) geldt sinds
            februari 2025 voor iedereen die met AI werkt, ongeacht het risiconiveau.
          </p>
        </div>

        {/* Zoek + filter */}
        <div className="mt-6">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Zoek een toepassing, bijv. werving, chatbot, Copilot..."
            className="w-full rounded-xl border-2 border-line bg-card p-3 text-sm text-ink focus:border-accent focus:outline-none"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {(["alle", ...VOLGORDE] as const).map((c) => (
              <button
                key={c}
                onClick={() => setActief(c)}
                className={`rounded-full border-2 px-3 py-1 text-sm font-medium transition ${
                  actief === c
                    ? "border-accent bg-accent-soft text-accent-dark"
                    : "border-line bg-card text-ink-soft hover:border-accent"
                }`}
              >
                {c === "alle" ? "Alles" : CAT_INFO[c].label}
              </button>
            ))}
          </div>
        </div>

        {/* Resultaten */}
        <div className="mt-6 space-y-3">
          {gefilterd.length === 0 && (
            <p className="text-sm text-ink-soft">
              Geen resultaat. Staat jouw toepassing er niet bij? Doe dan de{" "}
              <a href="/tools/ai-act-checker" className="font-semibold text-accent hover:text-accent-dark">
                stap-voor-stap AI Act-checker
              </a>
              .
            </p>
          )}
          {gefilterd.map((u) => (
            <div key={u.naam} className="rounded-xl border-2 border-line bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-ink">{u.naam}</h3>
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${CAT_INFO[u.cat].badge}`}>
                  {CAT_INFO[u.cat].label}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-ink-soft">{u.wat}</p>
            </div>
          ))}
        </div>

        {/* Legenda */}
        <div className="mt-10 border-t-2 border-line pt-6">
          <h2 className="hand text-2xl font-bold text-ink">De vier categorieën</h2>
          <div className="mt-4 space-y-3">
            {VOLGORDE.map((c) => (
              <div key={c} className="flex items-start gap-3">
                <span className={`mt-0.5 shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${CAT_INFO[c].badge}`}>
                  {CAT_INFO[c].label}
                </span>
                <p className="text-sm text-ink-soft">{CAT_INFO[c].uitleg}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="warm-card mt-10 bg-sage-soft p-6">
          <h3 className="hand text-xl font-bold text-ink">Twijfel je over je eigen toepassing?</h3>
          <p className="mt-2 text-sm text-ink-soft">
            Deze wijzer is een snelle indicatie. Voor de officiële afweging is er de
            stap-voor-stap AI Act-checker. En of je nu hoog of minimaal risico hebt:
            de AI-geletterdheidsplicht regel je via de gratis academy, of op maat voor
            je organisatie.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="/tools/ai-act-checker" className="btn btn-primary">Naar de AI Act-checker</a>
            <a href="/academy" className="btn btn-ghost">Gratis academy</a>
            <a href="/contact" className="btn btn-ghost">Maatwerk</a>
          </div>
        </div>

        <p className="mt-6 text-xs text-ink-soft/80">
          Indicatief, geen juridisch advies. De exacte classificatie hangt af van de
          specifieke toepassing en kent uitzonderingen (bijvoorbeeld artikel 6 lid 3 voor
          puur voorbereidende taken). Datums kunnen schuiven via de Digital Omnibus.
        </p>
      </div>
    </ToolLayout>
  );
}
