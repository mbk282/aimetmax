import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://aimetmax.nl";
const BASE = "/onderzoek/sinterklaasjournaal";
const PATH = `${BASE}/methode`;
const URL_PAGE = `${SITE}${PATH}`;
const CHART = `${BASE}/img/grafiek-sinterklaasjournaal.png`;
const OG = `${BASE}/og.jpg`;

const TITLE = "Methode en data: is het Sinterklaasjournaal enger geworden?";
const DESCRIPTION =
  "Hoe het Sinterklaasjournaal is gemeten: 238 afleveringen uit twaalf seizoenen (2013-2026), 3.574 blinde oordelen van de AI-modellen DeepSeek en Claude Haiku. Kerncijfers per seizoen, de exacte prompt, controles, beperkingen, een grafiek en vrij te gebruiken data.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | AI met Max` },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: "article",
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    publishedTime: "2026-11-17",
    modifiedTime: "2026-11-17",
    authors: ["Max van den Broek"],
    images: [{ url: OG, width: 1200, height: 630, alt: "Is het Sinterklaasjournaal enger geworden?" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG] },
};

const AUTHOR = { "@type": "Person", name: "Max van den Broek", url: `${SITE}/over` };
const LICENSE_NOTE =
  "Vrij te gebruiken met bronvermelding (Max van den Broek, aimetmax.nl); online met een link naar de methodepagina.";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: TITLE,
    description: DESCRIPTION,
    inLanguage: "nl",
    datePublished: "2026-11-17",
    dateModified: "2026-11-17",
    author: AUTHOR,
    publisher: { "@type": "Organization", name: "AI met Max", url: SITE },
    image: [`${SITE}${OG}`, `${SITE}${CHART}`],
    mainEntityOfPage: URL_PAGE,
    isPartOf: { "@type": "Article", headline: "Is het Sinterklaasjournaal enger geworden?", url: `${SITE}${BASE}` },
  },
  {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Sinterklaasjournaal 2013-2026: blinde AI-vergelijking van afleveringen",
    description:
      "Per seizoen de geschatte kans dat een aflevering van het Sinterklaasjournaal enger, spannender, negatiever, luchtiger, grappiger (en drie andere vragen) wordt gevonden dan een aflevering uit 2013-2016, met 95%-intervallen. Gebaseerd op 3.574 blinde paarsgewijze oordelen van DeepSeek en Claude Haiku over de ondertitels van 238 afleveringen. Plus alle losse oordelen en een codering van de Wikipedia-samenvattingen per seizoen (2001-2026).",
    url: URL_PAGE,
    inLanguage: "nl",
    creator: AUTHOR,
    datePublished: "2026-11-17",
    dateModified: "2026-11-17",
    temporalCoverage: "2001/2026",
    isAccessibleForFree: true,
    license: { "@type": "CreativeWork", name: LICENSE_NOTE, url: `${URL_PAGE}#citeren` },
    keywords: ["Sinterklaasjournaal", "NTR", "kindertelevisie", "AI", "Bradley-Terry", "ondertitels"],
    distribution: [
      {
        "@type": "DataDownload",
        name: "jaren.csv",
        description: "Per seizoen de kans per vraag ten opzichte van 2013-2016, met 95%-interval, plus het aantal dagen dat een probleem openstaat (uit de probleemlogboeken), het aantal afleveringen, zendtijd liedjes en aandeel kinderen helpen.",
        encodingFormat: "text/csv",
        contentUrl: `${SITE}${BASE}/data/jaren.csv`,
      },
      {
        "@type": "DataDownload",
        name: "oordelen.csv",
        description: "Alle 3.574 blinde oordelen met de korte reden van het model.",
        encodingFormat: "text/csv",
        contentUrl: `${SITE}${BASE}/data/oordelen.csv`,
      },
      {
        "@type": "DataDownload",
        name: "wikipedia-seizoenen.csv",
        description: "Codering van de verhaallijn per seizoen op basis van Wikipedia, 2001-2026.",
        encodingFormat: "text/csv",
        contentUrl: `${SITE}${BASE}/data/wikipedia-seizoenen.csv`,
      },
    ],
  },
];

function H2({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-12 mb-3 scroll-mt-24 text-2xl font-bold text-ink">
      {children}
    </h2>
  );
}

function H3({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="mt-8 mb-2 scroll-mt-24 text-lg font-semibold text-ink">
      {children}
    </h3>
  );
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="my-5 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={`${h}-${i}`} className="border-b-2 border-ink px-3 py-2 text-left font-semibold text-ink">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((c, i) => (
                <td key={i} className="border-b border-line px-3 py-2 align-top leading-6 text-ink-soft">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a className="font-medium text-accent underline underline-offset-2" href={href}>
    {children}
  </a>
);

function Pre({ children }: { children: string }) {
  return (
    <pre className="my-5 overflow-x-auto whitespace-pre-wrap rounded-lg border border-line bg-card p-4 font-mono text-[13px] leading-6 text-ink">
      {children}
    </pre>
  );
}

const SYSTEEMPROMPT = "Je bent een zorgvuldige mediaonderzoeker. Je antwoordt alleen met geldige JSON.";

const PROMPT = `Je beoordeelt blind twee afleveringen van een dagelijks Sinterklaasprogramma voor kinderen van 4-8 jaar. Jaartallen en presentatorennamen zijn weggehaald; de afleveringen staan op dezelfde plek in het seizoen. Het zijn ondertitels.

AFLEVERING EERSTE:
{tekst aflevering A}

AFLEVERING TWEEDE:
{tekst aflevering B}

Beoordeel vanuit een kind van 5 dat kijkt. Kies per vraag de aflevering waarvoor het MEER geldt:
- engst: welke is enger (dreiging, gevaar)?
- spannendst: welke is spannender (onzekerheid, je wilt weten hoe het afloopt)?
- negatiefst: welke is negatiever van toon (problemen, ruzie, verdriet, boosheid)?
- ongerustst: van welke wordt een kind ongeruster, over de hele aflevering?
- ongerustste_einde: na welke gaat het kind ongeruster naar bed (hoe eindigt de aflevering)?
- luchtigst: welke is luchtiger (minder zwaar, meer ontspannen)?
- grappigst: welke is grappiger (grappen, gekke situaties, woordgrappen)?
- gezelligst: welke is gezelliger en warmer (liedjes, cadeautjes, samen zijn, blije kinderen)?
Kies "gelijk" alleen als je echt geen verschil ziet. Laat je niet leiden door de volgorde.
Antwoord met JSON met precies deze sleutels, elk "eerste", "tweede" of "gelijk": engst, spannendst, negatiefst, ongerustst, ongerustste_einde, luchtigst, grappigst, gezelligst, en "reden" (max 30 woorden).`;

const PREREGISTRATIE = `# Vooraf vastgelegd: analyseplan Sinterklaasjournaal (pass 2)

Vastgelegd op 16 november 2026, vóór het draaien van de analyses hieronder. Wat hier staat, rapporteer ik, ook als het niets oplevert.

## Vraag
Is het Sinterklaasjournaal enger geworden, per jaar bekeken, en zo ja: op welke manier?

## Eenheid van vergelijking
Per seizoen (jaar), geen groepen van jaren. Trends als lineaire regressie op seizoensgemiddelden en als regressie per aflevering met jaar als continue variabele. Jaren met minder dan 5 afleveringen tellen niet mee in de paarsgewijze vergelijking en worden in grafieken apart gemarkeerd.

## Bronnen
- Tekst per aflevering: NPO 888-ondertitels (2013-2026, waar beschikbaar). Alleen gewone afleveringen (≤ 20 min). Geen mix met spraakherkenning-transcripten bij vergelijkingen over tijd.
- Verhaallijn per seizoen voor alle jaren: Wikipedia, opnieuw gecodeerd met een strenger codeboek.
- Audio: alleen voor afleveringen met video (2004-2024). Geen 2025/2026.

## Blind coderen
Voor de per-aflevering- en paarsgewijze beoordelingen worden jaartallen, datums en namen van presentatoren (Dieuwertje Blok, Merel Westrik) uit de tekst gehaald. Volgorde A/B wordt in beide richtingen beoordeeld.

## Hypotheses en maten
H1. De ernst van de problemen in de verhaallijn neemt toe over de jaren.
  - Maat: per seizoen het aandeel problemen dat "echt én erg" is (realistisch EN ernst ≥ 4 op de schaal hieronder), en de maximale ernst.
  - Bronnen: probleemlogboek uit transcripten (2013-2026) en Wikipedia (2001-2026). Convergentie tussen beide bronnen wordt gerapporteerd.
H2. Problemen blijven langer open.
  - Maat: per seizoen de gemiddelde duur (in dagen) dat een probleem openstaat, gewogen naar ernst; en het aantal ernstige problemen (≥ 3) dat nog open is in de laatste 3 dagen voor 5 december.
H3. Afleveringen zijn voor een jong kind spannender, minder luchtig en laten het kind ongeruster achter.
  - Maat: Bradley-Terry-score per jaar uit blinde paarsgewijze vergelijkingen (vragen: engst, luchtigst, ongerustste einde), met bootstrap-betrouwbaarheidsinterval.
H4. Spannende achtergrondmuziek neemt toe.
  - Maat: aandeel van de zendtijd met muziek die het AudioSet-model als "Scary music" of "Exciting music" labelt, tegenover "Happy/Funny music", per aflevering (2004-2024).
H5. Exploratief: welke andere verschillen zien blinde codeurs tussen afleveringen van verschillende jaren? Thema's uit fase 1 worden in fase 2 op alle afleveringen getoetst; alleen thema's die in fase 2 een trend laten zien worden gerapporteerd, met de vermelding dat ze exploratief zijn.

## Ernstschaal (per probleem)
1 = klein ongemak of misverstand zonder gevolgen
2 = iets kwijt, kapot of vertraagd; het feest komt niet echt in gevaar
3 = het feest (intocht of pakjesavond) komt echt in gevaar
4 = fysiek gevaar, ongeluk, ziekte, brand, ramp, of een kwaadwillende tegenstander
5 = Sinterklaas zelf in (levens)gevaar, gewond, ziek in het ziekenhuis of vermist

Geen probleem: waar de intocht is, welke route de boot vaart, gewone voorbereidingen, reportages, een mop.

## Realistisch
Realistisch = zou zo in het echte Nederland kunnen gebeuren (lek, ziekte, file, brand, storm, een dichte brug). Sprookjesachtig = alleen in de Sinterklaaswereld mogelijk (Notenkolder, een piet die alles andersom doet, een magisch boek).

## Wat ik niet doe
- Geen nieuwe maten verzinnen na het zien van de uitkomst zonder dat als exploratief te melden.
- Geen jaren weglaten omdat ze niet in het verhaal passen.

## Aanvulling, 16 november 2026 (vóór het draaien van deze ronde)
Op dezelfde 1.013 paren (beide volgordes) worden acht vragen gesteld, door DeepSeek op alle paren en door Claude Haiku op de 167 oorspronkelijke paren:
- engst, spannendst, negatiefst, ongerustst (de hele aflevering), ongerustste_einde, luchtigst, grappigst, gezelligst.
Rapportage per seizoen als kans om te winnen van een aflevering uit 2013-2016 (de eerste gemeten seizoenen met minstens vijf afleveringen: 2013, 2014, 2016), met bootstrap-interval. Alle acht vragen worden gerapporteerd, ook als ze geen trend laten zien.`;

// Kans om te winnen van een aflevering uit 2013-2016, in hele procenten (jaren.csv, half naar boven afgerond).
const KERN: string[][] = [
  ["2013", "5", "45", "42", "43", "59", "56"],
  ["2014", "12", "58", "49", "62", "43", "49"],
  ["2016", "23", "47", "59", "45", "48", "46"],
  ["2018", "20", "49", "55", "50", "51", "58"],
  ["2019", "22", "57", "56", "48", "50", "60"],
  ["2020", "25", "51", "52", "46", "54", "64"],
  ["2021", "27", "59", "65", "58", "43", "52"],
  ["2022", "26", "73", "75", "71", "26", "34"],
  ["2023", "22", "76", "79", "73", "24", "33"],
  ["2024", "24", "76", "74", "74", "23", "29"],
  ["2025", "25", "79", "84", "78", "16", "23"],
  ["2026*", "7", "69", "73", "78", "25", "16"],
];

const TOC: [string, string][] = [
  ["kerncijfers", "Kerncijfers per seizoen en grafiek"],
  ["bronnen", "Bronnen en seizoenen"],
  ["blind", "Blind maken, en wat toch doorlekt"],
  ["vragen", "Paren, de exacte prompt en de modellen"],
  ["berekening", "Van oordelen naar percentages"],
  ["uitkomsten", "Uitkomsten per vraag en per model"],
  ["controles", "Controles en trend"],
  ["robuustheid", "Robuustheidstest zonder geluidsbeschrijvingen"],
  ["plan", "Wat vooraf vastlag"],
  ["logboeken", "Probleemlogboeken per seizoen"],
  ["wikipedia", "Wikipedia, 26 seizoenen"],
  ["verkenning", "Open verkenning, liedjes en beeld"],
  ["niet-gelukt", "Wat niet lukte"],
  ["beperkingen", "Beperkingen"],
  ["data", "Data downloaden"],
  ["citeren", "Citeren en gebruiken"],
  ["wie", "Wie deed dit"],
  ["analyseplan", "Bijlage: het analyseplan"],
];

const CITATIE =
  "Van den Broek, M. (2026). Is het Sinterklaasjournaal enger geworden? Methode en data. AI met Max. https://aimetmax.nl/onderzoek/sinterklaasjournaal/methode";

const BRONREGEL =
  "Bron: analyse van Max van den Broek (aimetmax.nl) van 3.574 blinde oordelen van de AI-modellen DeepSeek en Claude Haiku over 238 afleveringen.";

export default function MethodePage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 text-ink-soft [&_p]:mb-4 [&_p]:leading-7">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="text-sm font-semibold uppercase tracking-wider text-accent">Onderzoek · methode en data</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Hoe ik het Sinterklaasjournaal heb gemeten
      </h1>
      <p className="mt-3 text-sm">
        Max van den Broek · 17 november 2026
      </p>
      <p className="mt-5 text-lg">
        Dit is de verantwoording bij het artikel{" "}
        <Link href={BASE} className="font-medium text-accent underline underline-offset-2">
          Is het Sinterklaasjournaal enger geworden?
        </Link>
        . Hier staat wat ik heb gemeten, hoe, hoe betrouwbaar het is en wat het niet laat zien. Cijfers, grafiek en
        data zijn vrij te gebruiken met bronvermelding (zie <A href="#citeren">Citeren en gebruiken</A>).
      </p>

      <div id="samenvatting" className="my-8 scroll-mt-24 rounded-xl border border-line bg-card p-5 sm:p-6 [&_p]:mb-3">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">In het kort</p>
        <p>
          <strong className="text-ink">Wat is gemeten.</strong> Twee AI-modellen, DeepSeek en Claude Haiku, lazen
          steeds de ondertitels van twee afleveringen uit verschillende seizoenen, zonder jaartallen of namen. Per paar
          kozen ze welke aflevering enger, spannender, negatiever, luchtiger, grappiger enzovoort is. Dat zijn 3.574
          oordelen over 238 afleveringen uit twaalf seizoenen tussen 2013 en 2026. Elk seizoen is afgezet tegen
          2013-2016.
        </p>
        <p className="font-semibold text-ink">De belangrijkste uitkomsten:</p>
        <ul className="mb-3 ml-6 list-disc space-y-2">
          <li>
            Tot en met 2020 is er weinig verschil met 2013-2016. De kans dat een aflevering uit 2018-2020 enger
            wordt gevonden dan een aflevering uit 2013-2016 ligt tussen 49 en 57 procent (50 procent is geen
            verschil). 2021 ligt iets hoger: enger 59, spannender 65 procent.
          </li>
          <li>
            In 2022 maakt het programma een sprong. Afleveringen worden in 73 procent van de gevallen enger gevonden
            dan een aflevering uit 2013-2016, en nog maar in 34 procent grappiger.
          </li>
          <li>
            2025 is de piek: enger 79 procent, spannender 84 procent, luchtiger 16 procent en grappiger 23 procent.
          </li>
          <li>
            De eerste zeven afleveringen van 2026 zijn iets minder eng (69 procent) en iets luchtiger (25 procent)
            dan 2025, maar het minst grappig van alle seizoenen: 16 procent. Over enger in 2026 verschillen de
            modellen: DeepSeek 72, Haiku 56 procent. Zeven afleveringen is weinig; de marges zijn breed.
          </li>
          <li>
            Volgens probleemlogboeken die twee Haiku-codeurs per seizoen bijhielden, blijven problemen in het verhaal
            langer open: gemiddeld 4,5 dagen per seizoen tot en met 2019, 7,2 dagen sinds 2020 (zie{" "}
            <A href="#logboeken">Probleemlogboeken</A>).
          </li>
        </ul>
        <p className="mb-0">
          <strong className="text-ink">Wat het niet laat zien.</strong> Dit is geen onderzoek bij kinderen. De modellen
          lezen alleen tekst, zonder beeld, muziek of stemmen. Het blind maken is niet waterdicht (zie{" "}
          <A href="#blind">Blind maken</A> en de <A href="#robuustheid">robuustheidstest</A>). Het onderzoek beschrijft
          wat er veranderde, niet waarom.
        </p>
      </div>

      <nav aria-label="Inhoud" className="my-8 rounded-xl border border-line p-5 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">Inhoud</p>
        <ol className="ml-6 list-decimal space-y-1 text-sm leading-6">
          {TOC.map(([id, label]) => (
            <li key={id}>
              <a className="text-ink underline decoration-line underline-offset-2 hover:text-accent" href={`#${id}`}>
                {label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <H2 id="kerncijfers">Kerncijfers per seizoen</H2>
      <p>
        Geschatte kans, in procenten, dat een aflevering uit dat seizoen enger, spannender, negatiever, luchtiger of
        grappiger wordt gevonden dan een aflevering uit 2013-2016. 50 procent betekent: net zo als 2013-2016. Beide
        modellen samen. De marges staan in de grafiek en in <A href={`${BASE}/data/jaren.csv`}>jaren.csv</A>.
      </p>
      <Table
        head={["Seizoen", "Afleveringen", "Enger", "Spannender", "Negatiever", "Luchtiger", "Grappiger"]}
        rows={KERN}
      />
      <p className="text-sm">
        * 2026: alleen de eerste zeven afleveringen (9 tot en met 15 november 2026). 2015 en 2017 ontbreken, want
        daarvan zijn maar drie afleveringen met ondertitels te vinden. De drie andere vragen (ongeruster, ongeruster
        einde, gezelliger) staan bij <A href="#uitkomsten">Uitkomsten</A>.
      </p>

      <figure id="grafiek" className="my-8 scroll-mt-24">
        <a href={CHART}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CHART}
            width={2000}
            height={1320}
            loading="lazy"
            className="h-auto w-full rounded-lg border border-line bg-white"
            alt="Vijf kleine grafieken per seizoen, 2013 tot en met 2026. Bij enger, spannender en negatiever liggen de seizoenen tot en met 2020 rond de 50 procent, net als 2013-2016, en 2021 iets hoger. Vanaf 2022 liggen ze rond 70 tot 80 procent, met een piek in 2025 (enger 79, spannender 84 procent). Bij luchtiger en grappiger zakken de seizoenen vanaf 2022 naar 16 tot 34 procent. Grappiger is het laagst in 2026: 16 procent."
          />
        </a>
        <figcaption className="mt-3 text-sm leading-6">
          Per seizoen de kans om te winnen van een aflevering uit 2013-2016, met 95%-marge. Grijs: de drie
          ijkseizoenen.{" "}
          <a className="font-medium text-accent underline underline-offset-2" href={CHART} download>
            Download de grafiek (PNG, 2000 pixels breed)
          </a>
          . Vrij te gebruiken met bronvermelding; online graag met een link naar deze pagina.
        </figcaption>
      </figure>

      <H2 id="bronnen">Bronnen</H2>
      <Table
        head={["Bron", "Wat", "Omvang"]}
        rows={[
          [
            "NPO-ondertitels (888)",
            "Ondertitels van gewone afleveringen (tot 20 minuten). Opgespoord via gearchiveerde npostart.nl-pagina's in het Wayback-archief, via NPO Start en via de ondertitelserver van de NPO-speler (cdn.npoplayer.nl), waar de ondertitels van 2023 en 2024 staan.",
            "247 gewone afleveringen met ondertitels: 244 uit 2013-2026, plus 1 uit 2008 en 2 uit 2012. In de paarsgewijze vergelijking zitten 238 afleveringen uit twaalf seizoenen.",
          ],
          ["Wikipedia", "Samenvatting van de verhaallijn per seizoen", "26 seizoenen, 2001-2026"],
          [
            "Video",
            "Afleveringen op YouTube en archive.org",
            "10 afleveringen, 2004-2024. Gebruikt voor beeldanalyse, gifjes en citaten. De gesproken tekst is uitgeschreven met spraakherkenning (ElevenLabs Scribe).",
          ],
        ]}
      />
      <p>
        Alle vergelijkingen over de jaren gebruiken één soort bron: de ondertitels. Ondertitels en spraakherkenning van
        dezelfde uitzending leveren duidelijk verschillende tekst op. Spraakherkenning gebruik ik daarom alleen voor
        citaten uit afleveringen zonder ondertitels, nooit in de vergelijkingen.
      </p>

      <H3 id="seizoenen">Welke seizoenen meedoen</H3>
      <p>
        Volgens het vooraf vastgelegde plan doen alleen seizoenen met minstens vijf afleveringen mee. Dat zijn er
        twaalf. 2008 (1 aflevering), 2012 (2), 2015 (3) en 2017 (3) vallen af.
      </p>
      <Table
        head={["Seizoen", "Afleveringen in analyse", "Uitgezonden (Wikipedia)", "Eerste en laatste", "Dagen tot 5 december", "Oordelen DeepSeek / Haiku"]}
        rows={[
          ["2013", "5", "24", "16 nov - 3 dec", "19 tot 2", "262 / 60"],
          ["2014", "12", "24", "11 nov - 4 dec", "24 tot 1", "546 / 84"],
          ["2016", "23", "26", "9 nov - 3 dec", "26 tot 2", "564 / 86"],
          ["2018", "20", "23", "12 nov - 4 dec", "23 tot 1", "556 / 86"],
          ["2019", "22", "24", "11 nov - 4 dec", "24 tot 1", "558 / 86"],
          ["2020", "25", "26", "9 nov - 4 dec", "26 tot 1", "566 / 86"],
          ["2021", "27", "27", "8 nov - 4 dec", "27 tot 1", "566 / 86"],
          ["2022", "26", "28", "7 nov - 3 dec", "28 tot 2", "566 / 86"],
          ["2023", "22", "22", "13 nov - 4 dec", "22 tot 1", "550 / 84"],
          ["2024", "24", "24", "11 nov - 4 dec", "24 tot 1", "558 / 86"],
          ["2025", "25", "25", "10 nov - 4 dec", "25 tot 1", "562 / 86"],
          ["2026", "7", "26 gepland", "9 nov - 15 nov", "26 tot 20", "302 / 76"],
        ]}
      />
      <p>
        Elk oordeel telt bij twee seizoenen mee, daarom is de som van de laatste kolom groter dan 3.574. Wikipedia telt
        mogelijk ook speciale afleveringen mee, dus de vergelijking met die kolom is een benadering. In alle seizoenen
        telt het weekoverzicht op zondag (ongeveer tien minuten) als gewone aflevering. De jaaroverzichten van ongeveer
        40 minuten vallen overal af door de grens van 20 minuten.
      </p>
      <p>
        2021, 2023, 2024 en 2025 zijn compleet. 2016, 2018, 2019, 2020 en 2022 missen een paar afleveringen, maar lopen
        van ongeveer het begin van het seizoen tot een of twee dagen voor 5 december. 2014 is voor de helft aanwezig,
        verspreid over het seizoen. 2013 heeft maar vijf afleveringen, vanaf 16 november. 2026 loopt nog: alleen de
        eerste zeven afleveringen, die alleen zijn vergeleken met afleveringen van dezelfde plek in eerdere seizoenen.
      </p>
      <p>
        De ondertitels van 2023 (19 gewone afleveringen en 3 weekoverzichten) en 2024 (21 gewone afleveringen en 3
        weekoverzichten) komen van de ondertitelserver van de NPO-speler, gevonden door de programmanummers
        VPWON_1343402 tot en met VPWON_1368755 te doorzoeken. Die bestanden hebben geen uitzenddatum. De datum heb ik
        afgeleid uit de volgorde van de afleveringen (per week zes gewone afleveringen en op zondag een weekoverzicht).
        Gecontroleerd met twee kopieën in het Internet Archive (aflevering 1 van 2023 op 13 november 2023, aflevering 1
        van 2024 op 11 november 2024), met de live-aflevering van de intocht (Gorinchem, zaterdag 18 november 2023;
        Vijfheerenlanden, zaterdag 16 november 2024) en met de Tweede Kamerverkiezingen van 22 november 2023
        (“Nederland stemt”).
      </p>

      <H2 id="blind">Blind maken, en wat toch doorlekt</H2>
      <p>
        Uit elke tekst haalde ik jaartallen, datums en de namen van de presentatoren (Dieuwertje Blok, Merel Westrik).
        Elke aflevering kreeg een willekeurige code. Bovenaan elk bestand staat alleen die code en het aantal dagen
        voor pakjesavond.
      </p>
      <p>Helemaal blind is het niet. Dit kon een model nog verraden:</p>
      <ul className="mb-4 ml-6 list-disc space-y-2">
        <li>
          <strong className="text-ink">De notatie van geluid.</strong> Tot en met 2021 zet de ondertitelaar
          geluidsbeschrijvingen in hoofdletters (“SPANNENDE MUZIEK”, “GEHUIL”). Vanaf 2022 staan ze in kleine letters
          tussen haakjes (“(spannende muziek)”, “(muziek)”). Zulke beschrijvingen tussen haakjes komen 0 keer voor in
          2013-2021, 198 keer in 2022, 121 keer in 2023, 146 keer in 2024, 172 keer in 2025 en 45 keer in 2026
          (sprekerslabels zoals “(regie:)” niet meegeteld). Een model kan daaraan zien of een aflevering van voor of
          na 2022 is. Het leest die beschrijvingen ook gewoon mee.
        </li>
        <li>
          <strong className="text-ink">Een naam.</strong> In 7 van de 247 teksten bleef de naam Dieuwertje staan,
          meestal als sprekerslabel (twee afleveringen elk uit 2018, 2020 en 2021, en één uit 2023).
        </li>
        <li>
          <strong className="text-ink">Corona.</strong> In zes afleveringen uit 2020 gaat het over anderhalve meter
          afstand.
        </li>
        <li>
          <strong className="text-ink">Personages.</strong> Die wisselen per periode, bijvoorbeeld de Huispiet tot en
          met 2018 en Piet de Smeerpoets vanaf 2019.
        </li>
        <li>
          <strong className="text-ink">Voorkennis.</strong> De modellen kunnen verhaallijnen kennen uit hun
          trainingsdata, bijvoorbeeld uit Wikipedia.
        </li>
      </ul>
      <p>
        De modellen zagen dus geen jaartal, maar konden soms raden of een aflevering oud of nieuw is. Dat de grootste
        sprong precies in 2022 zit, het jaar waarin de notatie verandert, kan daar deels door komen. Daarom heb ik alle
        oordelen van DeepSeek opnieuw laten doen op teksten zonder geluidsbeschrijvingen. De omslag in 2022 bleef
        staan (zie de <A href="#robuustheid">robuustheidstest</A>).
      </p>

      <H2 id="vragen">Paren, de exacte prompt en de modellen</H2>

      <H3 id="paren">Paren</H3>
      <p>
        Een paar bestaat steeds uit twee afleveringen uit verschillende seizoenen die even ver voor 5 december liggen.
        De basisset: voor elk paar seizoenen tot vier paren, op 10, 37, 63 en 90 procent van de periode die beide
        seizoenen gemeen hebben. Dat zijn 248 paren, waarvan 241 op precies hetzelfde aantal dagen voor 5 december en
        7 met één dag verschil. De uitbreiding: 1.291 paren met maximaal twee dagen verschil, elke aflevering hooguit
        twee keer per seizoenspaar en hooguit 24 paren per seizoenspaar.
      </p>
      <p>
        Samen zijn dat 1.539 paren, waarvan 1.456 verschillend. 83 paren uit de uitbreiding zijn gelijk aan een paar
        uit de basisset; die heeft DeepSeek dus twee keer in beide volgordes beoordeeld. Van de 1.456 paren liggen er
        415 op dezelfde dag, 537 op één dag verschil en 504 op twee dagen. Paren binnen één seizoen zijn er niet. Alle
        66 combinaties van de twaalf seizoenen komen voor, met 2 tot 28 paren per combinatie; 2013 tegen 2026 heeft er
        maar 2. Elk paar is in beide volgordes beoordeeld.
      </p>

      <H3 id="prompt">De exacte vraag aan de modellen</H3>
      <p>
        Dit is de letterlijke prompt die DeepSeek per paar kreeg. Op de plek van de accolades staat de geblindeerde
        ondertiteltekst, zonder de kopregel van het bestand. Systeembericht:
      </p>
      <Pre>{SYSTEEMPROMPT}</Pre>
      <p>Gebruikersbericht:</p>
      <Pre>{PROMPT}</Pre>
      <p>
        Claude Haiku kreeg dezelfde acht vragen met dezelfde uitleg: vanuit een kind van 5, “gelijk” alleen als er echt
        geen verschil is, en niet letten op de volgorde. Haiku las de geblindeerde tekstbestanden zelf, inclusief de
        kopregel met de code en het aantal dagen voor pakjesavond. De prompt noemt de doelgroep (4-8 jaar) en zegt dat
        de afleveringen op dezelfde plek in het seizoen staan. Dat zijn keuzes die het oordeel kunnen kleuren.
      </p>

      <H3 id="modellen">Modellen en uitvoering</H3>
      <Table
        head={["", "DeepSeek", "Claude Haiku"]}
        rows={[
          ["Model", "deepseek-chat, via de DeepSeek-API", "Claude Haiku (claude-haiku-5-5), via subagents in Claude Code"],
          ["Instellingen", "temperature 0,3, JSON-modus; een antwoord telt alleen als alle acht sleutels geldig zijn, anders opnieuw (maximaal 6 pogingen)", "standaardinstellingen, geen temperature ingesteld"],
          ["Werkwijze", "één paar per verzoek", "ongeveer vier paren per opdracht (125 opdrachten); op één opdracht na zaten de twee volgordes van hetzelfde paar nooit in dezelfde opdracht"],
          ["Paren", "alle 1.539 paren, in beide volgordes", "de 248 paren uit de basisset, in beide volgordes"],
          ["Oordelen", "3.078, geen mislukte verzoeken", "496"],
          ["Datum", "16 en 17 november 2026", "16 en 17 november 2026"],
        ]}
      />
      <p>
        Samen zijn dat 3.574 oordelen. Elk oordeel bevat ook een korte reden van het model (gemiddeld 19 woorden bij
        DeepSeek en 29 bij Haiku). Alle oordelen staan in <A href={`${BASE}/data/oordelen.csv`}>oordelen.csv</A>.
      </p>

      <H2 id="berekening">Van oordelen naar percentages</H2>
      <p>
        Uit alle oordelen van beide modellen samen schat een Bradley-Terry-model per seizoen een sterkte per vraag.
        “Gelijk” telt als half gewonnen. Dat kwam weinig voor: bij DeepSeek in hooguit 0,8 procent van de oordelen, bij
        Haiku in hooguit 2,6 procent (allebei bij enger). Omdat DeepSeek alle paren beoordeelde en Haiku alleen de
        basisset, bestaat de gecombineerde schatting voor 86 procent uit oordelen van DeepSeek.
      </p>
      <p>
        Die sterkte staat hier als de geschatte kans dat een aflevering uit dat seizoen wint van een aflevering uit
        2013, 2014 of 2016. Het nulpunt is het gemiddelde van die drie seizoenen, en ze tellen even zwaar, ook al heeft
        2013 maar vijf afleveringen. Het is een modelschatting, geen geteld percentage.
      </p>
      <p>
        Waarom 2013-2016 als nulpunt: het gemiddelde van alle jaren is een slecht nulpunt, omdat de recente jaren daar
        zelf in zitten. Van het programma rond 2001 zijn bijna geen ondertitels. 2013, 2014 en 2016 zijn de eerste
        seizoenen met minstens vijf afleveringen.
      </p>
      <p>
        Zo lees je de percentages: 50 procent betekent dat een aflevering uit dat seizoen even vaak wint als verliest van
        een gemiddelde aflevering uit 2013-2016. De drie ijkseizoenen liggen zelf niet precies op 50: bij enger 45, 58 en
        47 procent, over alle acht vragen tussen 40 en 62 procent. Schommelingen van zo’n tien procentpunt zijn dus
        gewoon.
      </p>
      <p>
        De onzekerheid berekende ik door de paren opnieuw te trekken (bootstrap): 400 keer voor de gecombineerde
        schatting, 200 keer per model apart. De twee volgordes van een paar bleven steeds samen. De marges zijn
        95%-intervallen: de 2,5e tot 97,5e percentiel van die herhalingen. Ze zijn waarschijnlijk te smal (zie{" "}
        <A href="#beperkingen">Beperkingen</A>).
      </p>
      <p>
        Alle percentages zijn afgerond vanaf de schattingen met drie decimalen in jaren.csv, op dezelfde manier als in
        het artikel. Daardoor kan een cijfer een punt afwijken van de onafgeronde schatting.
      </p>

      <H2 id="uitkomsten">Uitkomsten per vraag</H2>
      <p>Beide modellen samen, in procenten (kans om te winnen van een aflevering uit 2013-2016):</p>
      <Table
        head={["Vraag", "2013", "2014", "2016", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"]}
        rows={[
          ["Enger", "45", "58", "47", "49", "57", "51", "59", "73", "76", "76", "79", "69"],
          ["Spannender", "42", "49", "59", "55", "56", "52", "65", "75", "79", "74", "84", "73"],
          ["Negatiever", "43", "62", "45", "50", "48", "46", "58", "71", "73", "74", "78", "78"],
          ["Ongeruster", "40", "58", "52", "49", "52", "46", "59", "75", "76", "80", "84", "73"],
          ["Ongeruster einde", "45", "51", "54", "52", "52", "51", "64", "69", "70", "78", "85", "74"],
          ["Luchtiger", "59", "43", "48", "51", "50", "54", "43", "26", "24", "23", "16", "25"],
          ["Grappiger", "56", "49", "46", "58", "60", "64", "52", "34", "33", "29", "23", "16"],
          ["Gezelliger", "60", "42", "48", "47", "46", "55", "49", "32", "28", "27", "21", "36"],
        ]}
      />
      <p>
        De grafiek toont vijf vragen. Ongeruster, ongeruster einde en gezelliger geven hetzelfde beeld (2025: 84, 85 en
        21 procent). De marges van alle acht vragen staan in jaren.csv.
      </p>

      <H3 id="per-model">Per model</H3>
      <p>Percentages voor 2022 / 2023 / 2024 / 2025 / 2026, per model en samen:</p>
      <Table
        head={["Vraag", "DeepSeek", "Haiku", "Samen"]}
        rows={[
          ["Enger", "74 / 76 / 77 / 81 / 72", "71 / 71 / 72 / 69 / 56", "73 / 76 / 76 / 79 / 69"],
          ["Spannender", "75 / 78 / 74 / 84 / 72", "75 / 87 / 72 / 84 / 76", "75 / 79 / 74 / 84 / 73"],
          ["Negatiever", "70 / 73 / 71 / 78 / 78", "79 / 77 / 86 / 81 / 78", "71 / 73 / 74 / 78 / 78"],
          ["Ongeruster", "75 / 76 / 78 / 84 / 73", "74 / 76 / 89 / 87 / 72", "75 / 76 / 80 / 84 / 73"],
          ["Ongeruster einde", "70 / 71 / 76 / 85 / 74", "60 / 69 / 86 / 84 / 74", "69 / 70 / 78 / 85 / 74"],
          ["Luchtiger", "26 / 24 / 23 / 17 / 26", "31 / 27 / 19 / 14 / 20", "26 / 24 / 23 / 16 / 25"],
          ["Grappiger", "32 / 33 / 30 / 24 / 17", "43 / 34 / 22 / 16 / 13", "34 / 33 / 29 / 23 / 16"],
          ["Gezelliger", "30 / 27 / 25 / 19 / 35", "44 / 32 / 35 / 35 / 45", "32 / 28 / 27 / 21 / 36"],
        ]}
      />
      <p>
        De twee modellen komen van 2022 tot en met 2026 bij alle acht vragen aan dezelfde kant van 50 uit. De grootste
        verschillen zijn enger in 2026 (DeepSeek 72, Haiku 56 procent) en gezelliger in 2025 (19 tegen 35). Daarna komen
        negatiever in 2024 (71 tegen 86) en gezelliger in 2022 (30 tegen 44). De 69 procent voor enger in 2026 komt dus
        vooral van DeepSeek. Haiku beoordeelde alleen de 248 paren uit de basisset, dus de marges van Haiku zijn veel
        breder (voor enger in 2026: 42 tot 70 procent).
      </p>

      <H2 id="controles">Controles en trend</H2>
      <Table
        head={["Controle", "Uitkomst"]}
        rows={[
          ["Voorkeur voor eerste of tweede aflevering, Haiku", "45 tot 55 procent: geen duidelijke voorkeur"],
          ["Voorkeur voor eerste of tweede aflevering, DeepSeek", "kiest bij de zware vragen vaker de tweede (59 tot 64 procent), bij luchtiger vaker de eerste (59 procent); valt weg doordat elk paar in beide volgordes is beoordeeld"],
          ["Zelfde winnaar in beide volgordes, Haiku (248 paren)", "77 procent (grappiger) tot 86 procent (ongeruster einde)"],
          ["Zelfde winnaar in beide volgordes, DeepSeek (1.373 paren)", "72 procent (ongeruster einde) tot 81 procent (gezelliger)"],
          ["Haiku en DeepSeek eens over hetzelfde paar in dezelfde volgorde", "71 procent (grappiger) tot 80 procent (ongeruster einde en gezelliger), gemeten op 479 tot 496 oordelen per vraag"],
        ]}
      />
      <p>
        Oordelen met “gelijk” tellen niet mee in deze controles. Bij DeepSeek tellen ook de 83 dubbel beoordeelde paren
        niet mee in de controle op beide volgordes.
      </p>

      <H3 id="trend">Trend per tien jaar</H3>
      <p>
        Als samenvatting heb ik per vraag een rechte lijn door de seizoenen getrokken, op de log-odds-schaal. De tabel
        toont de helling per tien jaar met het 95%-interval. Positief betekent: meer van dat. Een helling van +1 betekent
        dat de odds per tien jaar ongeveer 2,7 keer zo groot worden.
      </p>
      <Table
        head={["Vraag", "Samen", "DeepSeek", "Haiku"]}
        rows={[
          ["Enger", "+1,07 (0,90 tot 1,28)", "+1,15 (0,98 tot 1,36)", "+0,63 (0,22 tot 1,12)"],
          ["Spannender", "+1,27 (1,09 tot 1,45)", "+1,25 (1,08 tot 1,43)", "+1,36 (1,02 tot 1,87)"],
          ["Negatiever", "+1,15 (0,95 tot 1,35)", "+1,12 (0,97 tot 1,38)", "+1,38 (0,98 tot 1,96)"],
          ["Ongeruster", "+1,30 (1,10 tot 1,53)", "+1,28 (1,12 tot 1,47)", "+1,46 (1,03 tot 2,01)"],
          ["Ongeruster einde", "+1,22 (1,04 tot 1,42)", "+1,23 (1,05 tot 1,42)", "+1,23 (0,78 tot 1,88)"],
          ["Luchtiger", "-1,30 (-1,53 tot -1,08)", "-1,28 (-1,48 tot -1,11)", "-1,37 (-1,88 tot -0,97)"],
          ["Grappiger", "-1,24 (-1,45 tot -1,04)", "-1,20 (-1,42 tot -1,04)", "-1,45 (-2,00 tot -1,02)"],
          ["Gezelliger", "-0,92 (-1,16 tot -0,73)", "-1,03 (-1,27 tot -0,82)", "-0,37 (-0,91 tot 0,07)"],
        ]}
      />
      <p>
        Samen en bij DeepSeek apart ligt het interval bij alle acht vragen aan één kant van nul. Bij Haiku apart (496
        oordelen) geldt dat voor zeven van de acht vragen, niet voor gezelliger. Een rechte lijn is een ruwe
        samenvatting: de seizoenen laten vooral een sprong in 2022 zien, geen geleidelijke stijging.
      </p>

      <H2 id="robuustheid">Robuustheidstest: zonder geluidsbeschrijvingen</H2>
      <p>
        Waarom: de ondertitels noteren geluid en muziek vanaf 2022 anders, precies in het jaar van de omslag (zie{" "}
        <A href="#blind">Blind maken</A>). Een model kon daaraan soms zien of een aflevering van voor of na 2022 is, en
        het las beschrijvingen als “spannende muziek” mee. Deze test stond niet in het analyseplan. Ik heb hem gedaan
        na een controle van de methode, toen de uitkomsten al bekend waren. De cijfers op deze pagina en in het artikel
        komen uit de oorspronkelijke run.
      </p>
      <p>
        Wat: DeepSeek beoordeelde alle 3.078 oordelen opnieuw, met dezelfde paren, prompt en instellingen, maar op
        teksten waaruit alles tussen haakjes, alle woorden in hoofdletters (geluidsbeschrijvingen) en de resterende
        presentatornamen zijn gehaald. Daarna staan er in geen enkel seizoen nog haakjes of hoofdletterwoorden in de
        teksten. Alleen de bezittelijke vorm “Dieuwertjes” bleef in twee teksten staan (één uit 2018, één uit 2023).
      </p>
      <p>
        Uitkomst: per vraag gaf DeepSeek in 88 tot 90 procent van de oordelen hetzelfde antwoord als op de originele
        tekst. De scores per seizoen verschuiven hooguit 4 procentpunten, en de omslag in 2022 blijft staan.
      </p>
      <Table
        head={["Alleen DeepSeek: origineel / zonder geluidsbeschrijvingen", "2021", "2022", "2023", "2024", "2025", "2026"]}
        rows={[
          ["Enger", "61 / 58", "74 / 72", "76 / 76", "77 / 77", "81 / 81", "72 / 69"],
          ["Spannender", "65 / 64", "75 / 76", "78 / 80", "74 / 73", "84 / 84", "72 / 73"],
          ["Negatiever", "58 / 56", "70 / 70", "73 / 71", "71 / 72", "78 / 78", "78 / 79"],
          ["Luchtiger", "40 / 40", "26 / 25", "24 / 23", "23 / 23", "17 / 15", "26 / 25"],
          ["Grappiger", "50 / 49", "32 / 34", "33 / 34", "30 / 29", "24 / 23", "17 / 16"],
        ]}
      />

      <H2 id="plan">Wat vooraf vastlag</H2>
      <ul className="mb-4 ml-6 list-disc space-y-2">
        <li>
          <strong className="text-ink">15 november 2026: verkenning.</strong> Een eerste, verkennende ronde: codering
          per zin en per aflevering, een sentimentmodel, muziekanalyse en een conceptversie van het artikel.
        </li>
        <li>
          <strong className="text-ink">16 november 2026: analyseplan.</strong> Daarna legde ik het analyseplan vast,
          met hypotheses, maten en de ernstschaal (volledige tekst in de <A href="#analyseplan">bijlage</A>). Het plan
          staat niet bij een externe registratiedienst.
        </li>
        <li>
          <strong className="text-ink">Acht vragen en nulpunt 2013-2016.</strong> Een eerste paarsgewijze ronde
          gebruikte vier vragen (enger, luchtiger, ongeruster einde, echt en erg) en zette elk jaar af tegen het
          gemiddelde van alle jaren. Die liet hetzelfde beeld zien: een sprong in 2022 en een piek in 2025 (DeepSeek,
          enger tegenover het gemiddelde van alle jaren: 2021 53, 2022 70, 2025 79 procent). Na het zien daarvan, maar
          vóór de ronde met acht vragen, legde ik de acht vragen en het nulpunt 2013-2016 vast in het plan.
        </li>
        <li>
          <strong className="text-ink">Alle seizoenen.</strong> Het plan zegt dat de ondertitels van 2013-2026 meedoen
          waar ze beschikbaar zijn, en dat ik geen jaren weglaat. Alle twaalf seizoenen zijn met dezelfde opzet,
          vragen en analyse beoordeeld. De ondertitels van 2023 en 2024 vond ik pas na de ronde met acht vragen op de
          andere tien seizoenen (via de ondertitelserver van de NPO-speler, zie{" "}
          <A href="#seizoenen">Welke seizoenen meedoen</A>). Ze zijn daarna met dezelfde paarregels, prompt,
          instellingen en analyse toegevoegd.
        </li>
        <li>
          <strong className="text-ink">Robuustheidstest.</strong> Niet vooraf vastgelegd; gedaan na een controle van de
          methode (zie <A href="#robuustheid">Robuustheidstest</A>).
        </li>
      </ul>

      <H2 id="logboeken">Probleemlogboeken per seizoen</H2>
      <p>
        Per seizoen lazen twee Haiku-agents los van elkaar alle afleveringen op volgorde en noteerden elk probleem: in
        welke aflevering het begint, wanneer het is opgelost, hoe erg het is en of het realistisch is. Waar de intocht
        is, welke route de boot vaart, reportages en losse grappen tellen niet als probleem. De ernstschaal:
      </p>
      <Table
        head={["Ernst", "Betekenis"]}
        rows={[
          ["1", "klein ongemak of misverstand zonder gevolgen"],
          ["2", "iets kwijt, kapot of vertraagd; het feest komt niet echt in gevaar"],
          ["3", "het feest (intocht of pakjesavond) komt echt in gevaar"],
          ["4", "fysiek gevaar, ongeluk, ziekte, brand, ramp of een kwaadwillende tegenstander"],
          ["5", "Sinterklaas zelf in gevaar, gewond, ziek in het ziekenhuis of vermist"],
        ]}
      />
      <p>
        De maat “dagen open” is het aantal dagen tussen de aflevering waarin een probleem begint en de aflevering
        waarin het is opgelost (gerekend in dagen tot 5 december), voor problemen met ernst 2 of hoger, gewogen naar
        ernst. Een probleem dat niet wordt opgelost, telt mee tot de laatste aflevering die ik heb. In het lopende
        seizoen 2026 (afleveringen tot en met 15 november) is de duur daardoor te kort. Daarom laat ik 2026 bij deze
        maat weg; de waarde 3,8 in jaren.csv is niet bruikbaar. In 2013 en 2014 ontbreken veel afleveringen, waardoor
        begin en einde van een probleem minder precies vastliggen.
      </p>
      <p>
        De twee agents kwamen bij “dagen open” per seizoen dicht bij elkaar uit (correlatie 0,82 over alle twaalf
        seizoenen, 0,81 zonder 2026). jaren.csv geeft het
        gemiddelde van de twee en daarnaast de laagste en de hoogste. Over andere maten waren ze het minder eens, zoals
        de hoogste ernst (0,51) en of een probleem komisch gebracht werd (0,37). Die gebruik ik daarom niet als
        hoofdresultaat.
      </p>
      <p>
        Tot en met 2019 stond een probleem gemiddeld 3,6 tot 5,6 dagen open, sinds 2020 meestal 6 tot 9 dagen.
        Gemiddeld over de seizoenen is dat 4,5 dagen tot en met 2019 en 7,2 dagen sinds 2020 (2026 niet meegeteld). 2023
        is de uitzondering: 5,3 dagen. Daar lagen de twee logboeken ook het verst uit elkaar van alle seizoenen sinds
        2020 (4,5 en 6,1 dagen).
      </p>
      <p>
        Vooraf had ik ook twee andere maten vastgelegd. Het aandeel problemen dat echt én erg is (realistisch en ernst 4
        of 5) laat in de logboeken geen trend zien, en de codeurs waren het er matig over eens (correlatie 0,67). Het
        aantal ernstige problemen dat in de laatste drie dagen voor 5 december nog openstaat, ligt de meeste jaren rond
        2, met 3 in 2013 en 2023, 4 in 2022 en 3,5 in 2024 en 2025 (correlatie tussen codeurs 0,63, zonder 2026). De regressie per
        aflevering uit het plan heb ik niet gedraaid; ik gebruik de schatting per seizoen.
      </p>
      <Table
        head={["Seizoen", "Dagen open (laagste en hoogste codeur)", "Aandeel echt én erg", "Ernstig en nog open in laatste 3 dagen"]}
        rows={[
          ["2013", "5,6 (5,3 en 5,8)", "0,18", "3"],
          ["2014", "4,0 (3,1 en 4,8)", "0,23", "2"],
          ["2016", "4,3 (4,1 en 4,6)", "0", "1,5"],
          ["2018", "4,9 (3,9 en 5,9)", "0", "2"],
          ["2019", "3,6 (3,2 en 4,0)", "0,21", "2"],
          ["2020", "6,4 (6,3 en 6,5)", "0,08", "2"],
          ["2021", "7,7 (7,1 en 8,3)", "0,15", "2,5"],
          ["2022", "7,1 (7,0 en 7,1)", "0,17", "4"],
          ["2023", "5,3 (4,5 en 6,1)", "0,16", "3"],
          ["2024", "8,0 (7,2 en 8,7)", "0,19", "3,5"],
          ["2025", "8,9 (8,4 en 9,5)", "0,33", "3,5"],
          ["2026", "niet bruikbaar (seizoen loopt nog)", "0", "niet bruikbaar (seizoen loopt nog)"],
        ]}
      />
      <p>Alle kolommen zijn het gemiddelde van de twee logboeken.</p>

      <H2 id="wikipedia">Wikipedia, alle 26 seizoenen</H2>
      <p>
        Twee Haiku-codeurs lazen de anonieme seizoenssamenvattingen en codeerden de problemen met dezelfde ernstschaal.
        Over het aantal echte én erge problemen waren ze het goed eens (correlatie 0,95). Er is geen duidelijke trend
        over de 26 jaar. De Wikipedia-codering komt bovendien slecht overeen met de logboeken uit de ondertitels
        (correlatie 0,27 voor het aandeel echt én erg). Samenvattingen door fans zijn dus geen sterk meetinstrument. Ik
        gebruik ze alleen voor de vaststelling dat er geen duidelijke trend te zien is.
      </p>

      <H2 id="verkenning">Open verkenning, liedjes en beeld</H2>
      <p>
        Deze drie onderdelen zijn exploratief. Ze komen uit de verkennende fase of zijn na het bekijken van de data
        gekozen. Ze tellen niet mee in de hoofdconclusie.
      </p>

      <H3 id="themas">Thema’s</H3>
      <p>
        Vijftien Haiku-agents kregen elk een blind paar afleveringen en beschreven vrij waarin die verschillen. Vijf
        thema’s die daaruit kwamen, liet ik daarna door Haiku coderen op de 201 afleveringen uit de verkennende fase:
        of kinderen helpen, hoe aanwezig Sinterklaas is, het soort humor, het aandeel reportages en hoe de aflevering
        eindigt. 2023 en 2024 zaten niet in die set en zijn hier niet gecodeerd. Hieronder de twee die het meest
        opvielen.
      </p>
      <p>
        <strong className="text-ink">Kinderen helpen.</strong> In de strenge telling tel ik een aflevering alleen mee
        als kinderen nodig zijn om het probleem in het verhaal op te lossen. Dat was zo in 14 van de 25 afleveringen uit
        2025 (56 procent), vooral via de oproep aan kijkers om puzzelstukjes te zoeken, en in de andere gecodeerde
        seizoenen in hooguit 23 procent (2022). Deze strenge telling is een herindeling van de beschrijvingen van Haiku
        en daarmee extra subjectief. Een ruimere telling, waarbij elk kind telt dat in beeld helpt of meedoet, geeft in
        bijna alle jaren hogere cijfers en geen duidelijke piek in 2025.
      </p>
      <p>
        <strong className="text-ink">Einde.</strong> Haiku legde per aflevering vast of die open en onrustig eindigt.
        Dat is in alle jaren de regel. In 2025 gold het voor 23 van de 25 afleveringen (92 procent), maar eerdere
        seizoenen lagen ook hoog. Het verschil met eerdere jaren is klein.
      </p>
      <Table
        head={["Seizoen", "Kinderen helpen, streng", "Kinderen helpen, ruim", "Open en onrustig einde"]}
        rows={[
          ["2013", "0%", "40%", "80%"],
          ["2014", "17%", "50%", "75%"],
          ["2016", "4%", "17%", "83%"],
          ["2018", "15%", "45%", "80%"],
          ["2019", "9%", "32%", "64%"],
          ["2020", "12%", "76%", "80%"],
          ["2021", "7%", "63%", "81%"],
          ["2022", "23%", "81%", "73%"],
          ["2025", "56%", "68%", "92%"],
          ["2026", "0%", "57%", "71%"],
        ]}
      />

      <H3 id="liedjes">Zendtijd liedjes</H3>
      <p>
        In de verkennende ronde (15 november 2026) gaf Claude Haiku elke ondertitelzin een functie: dreiging,
        oplossing, grap of spel, lied, gezelligheid, informatie of vooruitblik. “Zendtijd liedjes” is het aandeel van de
        duur van alle zinnen dat als lied is gecodeerd. Dat daalde van 3,4 procent in 2016 naar 1,3 procent in 2025 en
        0,7 procent in 2026 (in die ronde zes afleveringen). 2018 lag al op 1,1 procent. 2023 en 2024 zaten niet in die
        ronde en zijn voor deze maat niet gecodeerd.
      </p>
      <Table
        head={["Seizoen", "2013", "2014", "2016", "2018", "2019", "2020", "2021", "2022", "2025", "2026"]}
        rows={[["Zendtijd liedjes", "2,2%", "3,0%", "3,4%", "1,1%", "2,0%", "2,2%", "2,0%", "1,4%", "1,3%", "0,7%"]]}
      />
      <p>
        Dit is een ruwe maat. Hoe liedteksten in de ondertitels staan (bijvoorbeeld met een sterretje of een
        beschrijving), verschilt per periode, en dat kan de telling beïnvloeden.
      </p>

      <H3 id="beeld">Beeld</H3>
      <p>
        Van vier afleveringen uit 2009-2018 en vier uit 2023-2024 analyseerde ik elke seconde, ruim 5.000 beelden:
        helderheid, verzadiging, warmte (rood min blauw), kleurrijkheid (de maat van Hasler en Süsstrunk) en het
        aandeel duidelijk rode pixels. Voor de mozaïeken in het artikel zijn per aflevering 250 beelden met een vaste
        willekeurige trekking gekozen (1.000 per periode) en in willekeurige volgorde gezet. De kleurstrook eronder
        toont de gemiddelde kleur van elk van die 1.000 beelden, gesorteerd op tint; beelden met weinig kleur
        (verzadiging onder 25 procent of erg donker) staan rechts. Toen was 66 procent van de beelden duidelijk gekleurd,
        nu 56 procent.
      </p>
      <p>
        Over alle beelden per seconde (2.680 toen, 2.473 nu) daalde het aandeel duidelijk rode pixels van gemiddeld 16
        naar 9 procent, de kleurrijkheid met 20 procent (van 56 naar 45) en de helderheid met 12 procent (van 82 naar
        72). Dit zijn gemiddelden van vier afleveringen per periode. De aflevering uit 2004 (een donkere VHS-opname) en
        die uit 2017 (met gebarentolk in beeld) tellen niet mee. Van na 2024 en van voor 2009 heb ik geen bruikbare
        video.
      </p>

      <H2 id="niet-gelukt">Wat niet lukte</H2>
      <ul className="mb-4 ml-6 list-disc space-y-2">
        <li>
          Achtergrondmuziek. Ik probeerde drie manieren: een AudioSet-model op de geluidsband, hetzelfde na het
          scheiden van stem en muziek (Demucs), en toonsoortherkenning. De uitkomsten waren onderling tegenstrijdig, de
          opnames te verschillend van kwaliteit. De afleveringen van 2025 staan wel op NPO Start, maar met
          kopieerbeveiliging, dus hun geluid kon ik niet analyseren. Hypothese H4 uit het plan kan ik daarom niet
          beantwoorden.
        </li>
        <li>
          Muziekbeschrijvingen in de ondertitels (“SPANNENDE MUZIEK” of “(spannende muziek)”) staan er in alle jaren
          in. Maar de notatie veranderde in 2022 en het aantal schommelt sterk per seizoen (spannende, dreigende,
          geheimzinnige of mysterieuze muziek: 0 keer in 2016, 7 in 2020, 13 in 2022, 5 in 2025). Als maat voor een
          trend zijn ze daarom niet bruikbaar. De AI-beoordelaars lazen ze wel mee (zie <A href="#blind">Blind maken</A>).
        </li>
        <li>Een simpel sentimentmodel per zin liet maar een klein verschil zien; dat staat niet in het artikel.</li>
      </ul>

      <H2 id="beperkingen">Beperkingen</H2>
      <ul className="mb-4 ml-6 list-disc space-y-2">
        <li>
          Van voor 2013 zijn bijna geen ondertitels te vinden, van 2015 en 2017 maar drie afleveringen, en van 2026 gaat
          het alleen om de eerste zeven afleveringen. Voor de themacodering en de liedjes zijn 2023 en 2024 niet
          gecodeerd.
        </li>
        <li>
          AI-beoordelaars zijn geen kinderen. Ze lezen wat er gezegd wordt, plus de geluidsbeschrijvingen die de
          ondertitelaar erbij zet. Beeld, muziek en de toon van stemmen zien ze niet.
        </li>
        <li>
          Het blind maken is niet waterdicht. Vooral de andere notatie van geluid vanaf 2022 kan een model laten zien dat
          een aflevering recent is (zie <A href="#blind">Blind maken</A> en de{" "}
          <A href="#robuustheid">robuustheidstest</A>).
        </li>
        <li>
          De onzekerheidsmarges houden er geen rekening mee dat dezelfde aflevering in veel paren voorkomt (gemiddeld
          zo’n twaalf). De vijf afleveringen uit 2013 zitten samen in 262 oordelen van DeepSeek, de zeven uit 2026 in
          302. De echte onzekerheid is daardoor groter, vooral voor 2013 (en daarmee het nulpunt) en 2026.
        </li>
        <li>
          Ik heb de oordelen van de modellen niet naast die van mensen gelegd. De controle bestaat uit twee modellen die
          elkaar en zichzelf (in omgekeerde volgorde) moeten bevestigen.
        </li>
        <li>
          Beide modellen kunnen eigen voorkeuren hebben, bijvoorbeeld voor de langere tekst. Recente afleveringen zijn
          wat langer: in 2013-2016 gemiddeld zo’n 1.270 woorden, in 2023 zo’n 1.380, in 2024 zo’n 1.410, in 2025 zo’n
          1.440 en in 2026 zo’n 1.500. Meer tekst kan meer gebeurtenissen bevatten. Of dat de oordelen beïnvloedt, heb
          ik niet apart getoetst.
        </li>
        <li>De gecombineerde cijfers komen voor 86 procent van DeepSeek.</li>
        <li>De analyse beschrijft wat er veranderde, niet waarom.</li>
      </ul>

      <H2 id="data">Data downloaden</H2>
      <ul className="mb-4 ml-6 list-disc space-y-2">
        <li>
          <A href={`${BASE}/data/jaren.csv`}>jaren.csv</A> - per seizoen de kans per vraag ten opzichte van 2013-2016
          met 95%-interval (kolommen kans_enger_vs_2013_2016 met _lo en _hi, en zo verder voor alle acht vragen), dagen
          open (gemiddelde van twee codeurs, met de laagste en hoogste codeur), aantal afleveringen, zendtijd liedjes en
          aandeel afleveringen waarin kinderen helpen (strenge telling; die laatste twee zijn leeg voor 2023 en 2024).
          Let op: dagen open voor 2026 (3,8) is niet bruikbaar, het seizoen loopt nog.
        </li>
        <li>
          <A href={`${BASE}/data/oordelen.csv`}>oordelen.csv</A> - alle 3.574 blinde oordelen: model (deepseek-chat of
          claude-haiku), code, seizoen en datum van de eerste en de tweede aflevering, de acht antwoorden (eerste,
          tweede of gelijk) en de korte reden van het model
        </li>
        <li>
          <A href={`${BASE}/data/wikipedia-seizoenen.csv`}>wikipedia-seizoenen.csv</A> - de codering van de verhaallijn
          per seizoen (2001-2026): aantal problemen, aantal en aandeel echt én erg, hoogste ernst
        </li>
        <li>
          <A href={CHART}>grafiek-sinterklaasjournaal.png</A> - de grafiek met vijf vragen per seizoen, 2000 pixels
          breed
        </li>
      </ul>
      <p>
        Er is geen openbare code-repository. Op verzoek stuur ik de analysecode (Bradley-Terry en bootstrap, in
        Python), het script dat DeepSeek aanstuurde, de opdrachten aan Haiku, de koppeling tussen codes en afleveringen
        en de probleemlogboeken. De ondertitels zelf deel ik niet openbaar, omdat die van de NPO zijn.
      </p>

      <H2 id="citeren">Citeren en gebruiken</H2>
      <p>
        Cijfers, tabellen en de grafiek mag je overnemen, ook in print, met bronvermelding (zie hieronder). Online graag
        met een link naar deze pagina. De CSV-bestanden mag je hergebruiken, ook voor eigen analyses, met dezelfde
        bronvermelding. Dit geldt niet voor stills, mozaïeken en gifjes uit uitzendingen in het artikel: dat beeld is
        van de NPO/NTR.
      </p>
      <p className="mb-2 font-semibold text-ink">Korte bronvermelding, bijvoorbeeld onder een grafiek:</p>
      <Pre>{BRONREGEL}</Pre>
      <p className="mb-2 font-semibold text-ink">Volledige verwijzing:</p>
      <Pre>{CITATIE}</Pre>
      <p>
        Link bij voorkeur naar deze pagina, <A href={PATH}>aimetmax.nl/onderzoek/sinterklaasjournaal/methode</A>, of naar
        een sectie, zoals <A href={`${PATH}#kerncijfers`}>#kerncijfers</A> of <A href={`${PATH}#beperkingen`}>#beperkingen</A>.
        Het artikel staat op <A href={BASE}>aimetmax.nl/onderzoek/sinterklaasjournaal</A>.
      </p>
      <p>
        Vragen, een interview, of de scripts en ruwe oordelen nodig?{" "}
        <Link href="/contact" className="font-medium text-accent underline underline-offset-2">
          Neem contact op
        </Link>
        .
      </p>

      <H2 id="wie">Wie deed dit, en met welke tools</H2>
      <p>
        Dit onderzoek deed ik, Max van den Broek, op eigen initiatief en zonder opdrachtgever. Ik ben freelance
        AI-expert, geef trainingen over AI en schreef het boek AI-Pionier. Ik heb geen band met de NTR of de NPO.
      </p>
      <Table
        head={["Tool", "Waarvoor"]}
        rows={[
          ["DeepSeek (deepseek-chat)", "blinde paarsgewijze oordelen, alle 1.539 paren, en de robuustheidstest"],
          ["Claude Haiku (claude-haiku-5-5)", "blinde paarsgewijze oordelen (248 paren), probleemlogboeken, Wikipedia-codering, open verkenning, themacodering en de codering per zin; 15 tot en met 17 november 2026, via subagents in Claude Code"],
          ["Claude Code", "hulp bij het schrijven van de analysecode en de dataverwerking"],
          ["ElevenLabs Scribe", "spraakherkenning van de video-afleveringen, alleen voor citaten, niet voor de vergelijkingen"],
        ]}
      />

      <H2 id="analyseplan">Bijlage: het vooraf vastgelegde analyseplan</H2>
      <p>
        Dit is de volledige, ongewijzigde tekst van het plan van 16 november 2026. Wat in dit plan staat maar niet is
        uitgevoerd of anders is gedaan, staat hierboven bij het betreffende onderdeel. De aantallen in het laatste deel
        (1.013 paren, waarvan 167 in de basisset) gaan over de tien seizoenen zonder 2023 en 2024. Met die twee
        seizoenen erbij, volgens dezelfde regels, zijn het 1.539 paren en 248 in de basisset.
      </p>
      <details className="my-5 rounded-lg border border-line bg-card p-4">
        <summary className="cursor-pointer font-semibold text-ink">Toon het analyseplan</summary>
        <Pre>{PREREGISTRATIE}</Pre>
      </details>

      <p className="mt-12">
        <Link href={BASE} className="font-medium text-accent underline underline-offset-2">
          Terug naar het artikel: Is het Sinterklaasjournaal enger geworden?
        </Link>
      </p>
    </section>
  );
}
