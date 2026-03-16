"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";

interface Term {
  term: string;
  aka?: string;
  category: string;
  explanation: string;
}

const terms: Term[] = [
  { term: "AI (Artificial Intelligence)", aka: "Kunstmatige intelligentie", category: "Basis", explanation: "Een verzamelnaam voor computersystemen die taken uitvoeren die normaal menselijke intelligentie vereisen, zoals taal begrijpen, patronen herkennen of beslissingen nemen." },
  { term: "Generatieve AI", aka: "GenAI", category: "Basis", explanation: "AI die nieuwe content kan maken: tekst, afbeeldingen, code, muziek of video. Denk aan ChatGPT, DALL-E of Copilot." },
  { term: "LLM (Large Language Model)", aka: "Groot taalmodel", category: "Modellen", explanation: "Een AI-model dat getraind is op enorme hoeveelheden tekst en daardoor taal kan begrijpen en genereren. Voorbeelden: GPT-4, Claude, Llama." },
  { term: "GPT (Generative Pre-trained Transformer)", category: "Modellen", explanation: "Een type LLM ontwikkeld door OpenAI. 'Pre-trained' betekent dat het model eerst op grote datasets leert voordat het voor specifieke taken wordt ingezet." },
  { term: "Token", category: "Technisch", explanation: "Een stukje tekst dat een AI-model verwerkt. Ongeveer 1 token = 0,75 woord in het Engels, iets minder in het Nederlands. Hoe meer tokens, hoe hoger de kosten." },
  { term: "Prompt", category: "Gebruik", explanation: "De instructie of vraag die je aan een AI-systeem geeft. Een goede prompt bevat context, een duidelijke opdracht en het gewenste formaat." },
  { term: "Prompt engineering", category: "Gebruik", explanation: "De vaardigheid om effectieve prompts te schrijven die de AI de beste resultaten laten geven. Inclusief technieken als few-shot learning en chain-of-thought." },
  { term: "Hallucination", aka: "Hallucinatie", category: "Risico's", explanation: "Wanneer een AI-model overtuigend klinkende maar feitelijk onjuiste informatie genereert. Een belangrijk risico bij het gebruik van LLMs." },
  { term: "Fine-tuning", category: "Technisch", explanation: "Het verder trainen van een bestaand AI-model op specifieke data zodat het beter wordt in een bepaald domein of taak." },
  { term: "RAG (Retrieval-Augmented Generation)", category: "Technisch", explanation: "Een techniek waarbij een AI-model eerst relevante documenten opzoekt en deze gebruikt bij het genereren van een antwoord. Vermindert hallucinaties en maakt antwoorden actueler." },
  { term: "Embedding", category: "Technisch", explanation: "Een numerieke representatie van tekst in een vectorruimte. Hiermee kan een computer de betekenis van woorden en zinnen vergelijken." },
  { term: "Chatbot", category: "Toepassingen", explanation: "Een AI-programma dat gesprekken kan voeren met mensen, vaak via tekst. Moderne chatbots zoals ChatGPT gebruiken LLMs." },
  { term: "Copilot", category: "Toepassingen", explanation: "Microsoft's AI-assistent die geintegreerd is in Office 365, Windows en andere producten. Gebruikt GPT-4 om te helpen bij dagelijkse taken." },
  { term: "ChatGPT", category: "Toepassingen", explanation: "OpenAI's chatbot-interface voor hun GPT-modellen. Beschikbaar als gratis en betaalde versie (Plus/Team/Enterprise)." },
  { term: "Claude", category: "Toepassingen", explanation: "AI-assistent van Anthropic, bekend om langere context-mogelijkheden en veiligheidsgerichte benadering." },
  { term: "Training data", aka: "Trainingsdata", category: "Technisch", explanation: "De data waarop een AI-model is getraind. De kwaliteit en diversiteit van deze data bepalen grotendeels hoe goed het model werkt." },
  { term: "Bias", aka: "Vooringenomenheid", category: "Risico's", explanation: "Systematische scheefheid in AI-output door onevenwichtigheden in trainingsdata. Kan leiden tot discriminatie of oneerlijke resultaten." },
  { term: "AI-geletterdheid", aka: "AI literacy", category: "Beleid", explanation: "Het vermogen om AI-systemen te begrijpen, kritisch te beoordelen en verantwoord te gebruiken. Sinds februari 2025 verplicht onder de EU AI Act." },
  { term: "EU AI Act", aka: "AI-verordening", category: "Beleid", explanation: "Europese wetgeving die AI-systemen reguleert op basis van risicoclassificatie. Verbiedt bepaalde toepassingen en stelt eisen aan hoog-risico systemen." },
  { term: "Machine Learning", aka: "ML", category: "Basis", explanation: "Een tak van AI waarbij systemen leren van data zonder expliciet geprogrammeerd te worden. Ze ontdekken patronen en verbeteren zichzelf." },
  { term: "Deep Learning", category: "Technisch", explanation: "Een vorm van machine learning die gebruik maakt van neurale netwerken met vele lagen. Basis van moderne AI-doorbraken in taal en beeld." },
  { term: "Neural Network", aka: "Neuraal netwerk", category: "Technisch", explanation: "Een computermodel geinspireerd op het menselijk brein, bestaande uit lagen verbonden knooppunten (neuronen) die patronen leren herkennen." },
  { term: "Transformer", category: "Technisch", explanation: "De architectuur achter moderne LLMs (de 'T' in GPT). Kan tekst parallel verwerken en relaties tussen woorden begrijpen, ongeacht hun positie." },
  { term: "Temperature", aka: "Temperatuur", category: "Technisch", explanation: "Een instelling die bepaalt hoe 'creatief' of 'willekeurig' een AI-model reageert. Lage temperatuur = voorspelbaarder, hoge = creatiever." },
  { term: "Context window", aka: "Contextvenster", category: "Technisch", explanation: "De maximale hoeveelheid tekst die een AI-model tegelijk kan verwerken. GPT-4 heeft bijv. 128K tokens, Claude tot 200K tokens." },
  { term: "API (Application Programming Interface)", category: "Technisch", explanation: "Een interface waarmee software met AI-modellen kan communiceren. Ontwikkelaars gebruiken APIs om AI in te bouwen in hun applicaties." },
  { term: "Inference", aka: "Inferentie", category: "Technisch", explanation: "Het moment waarop een getraind AI-model een antwoord genereert. De 'kosten' van AI zitten vaak in inference (per token/per request)." },
  { term: "Open source model", category: "Modellen", explanation: "Een AI-model waarvan de gewichten publiek beschikbaar zijn, zodat iedereen het kan gebruiken en aanpassen. Voorbeelden: Llama, Mistral." },
  { term: "Multimodaal", category: "Basis", explanation: "AI die meerdere typen input kan verwerken: tekst, afbeeldingen, audio en video tegelijk. GPT-4V en Gemini zijn multimodaal." },
  { term: "Agent", aka: "AI Agent", category: "Toepassingen", explanation: "Een AI-systeem dat zelfstandig taken kan uitvoeren, beslissingen kan nemen en tools kan gebruiken om een doel te bereiken." },
  { term: "Agentic AI", category: "Toepassingen", explanation: "AI die autonoom meerdere stappen kan zetten om complexe taken te voltooien, inclusief plannen, uitvoeren en bijsturen." },
  { term: "Few-shot learning", category: "Gebruik", explanation: "Een prompt-techniek waarbij je een paar voorbeelden geeft van het gewenste resultaat, zodat de AI het patroon oppikt." },
  { term: "Zero-shot", category: "Gebruik", explanation: "Wanneer een AI-model een taak uitvoert zonder specifieke voorbeelden, puur op basis van de instructie." },
  { term: "Chain-of-thought", aka: "CoT", category: "Gebruik", explanation: "Een prompt-techniek waarbij je de AI vraagt stap voor stap te redeneren. Verbetert de kwaliteit van complexe antwoorden." },
  { term: "Grounding", category: "Technisch", explanation: "Het koppelen van AI-output aan verifieerbare bronnen of data. Vermindert hallucinaties door het model te 'aarden' in feiten." },
  { term: "RLHF", aka: "Reinforcement Learning from Human Feedback", category: "Technisch", explanation: "Een trainingstechniek waarbij menselijke beoordelaars de AI helpen betere en veiligere antwoorden te leren geven." },
  { term: "Synthetic data", aka: "Synthetische data", category: "Technisch", explanation: "Door AI gegenereerde data die gebruikt wordt om andere AI-modellen te trainen. Nuttig wanneer echte data schaars of privacygevoelig is." },
  { term: "DPIA", aka: "Data Protection Impact Assessment", category: "Beleid", explanation: "Een verplichte beoordeling van de privacyrisico's bij het inzetten van AI die persoonsgegevens verwerkt. Vereist onder de AVG." },
];

const categories = [...new Set(terms.map((t) => t.category))];

export default function AIWoordenlijst() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filtered = terms.filter((t) => {
    const matchesSearch = !search ||
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      (t.aka && t.aka.toLowerCase().includes(search.toLowerCase())) ||
      t.explanation.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <ToolLayout
      title="AI Woordenlijst"
      description="Alle belangrijke AI-termen uitgelegd in begrijpelijk Nederlands. Doorzoekbaar en op taalniveau B1-B2."
    >
      <div className="space-y-6">
        {/* Search + filter */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Zoek een term..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${!selectedCategory ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              Alles ({terms.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${selectedCategory === cat ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-400">{filtered.length} termen gevonden</p>

        {/* Terms */}
        <div className="space-y-3">
          {filtered.map((t) => (
            <div key={t.term} className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{t.term}</h3>
                  {t.aka && <p className="text-xs text-gray-400">Ook: {t.aka}</p>}
                </div>
                <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500">
                  {t.category}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{t.explanation}</p>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-sm text-gray-400">Geen termen gevonden voor &ldquo;{search}&rdquo;</p>
        )}
      </div>
    </ToolLayout>
  );
}
