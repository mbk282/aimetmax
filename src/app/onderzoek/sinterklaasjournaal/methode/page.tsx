import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Methode: is het Sinterklaasjournaal enger geworden?",
  description:
    "Hoe ik 200 afleveringen van het Sinterklaasjournaal blind liet vergelijken door AI: vooraf vastgelegd plan, paarsgewijze oordelen, probleemlogboeken, betrouwbaarheid, beperkingen en downloadbare data.",
  alternates: { canonical: "/onderzoek/sinterklaasjournaal/methode" },
};

const BASE = "/onderzoek/sinterklaasjournaal";

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-12 mb-3 text-2xl font-bold text-ink">{children}</h2>;
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="my-5 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} className="border-b-2 border-ink px-3 py-2 text-left font-semibold text-ink">
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

export default function MethodePage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 text-ink-soft [&_p]:mb-4 [&_p]:leading-7">
      <p className="text-sm font-semibold uppercase tracking-wider text-accent">Onderzoek · methode</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Hoe ik het Sinterklaasjournaal heb gemeten
      </h1>
      <p className="mt-5 text-lg">
        Dit is de verantwoording bij{" "}
        <Link href={BASE} className="font-medium text-accent underline underline-offset-2">
          Is het Sinterklaasjournaal enger geworden?
        </Link>
        . Hier staat welke bronnen ik gebruikte, hoe ik mat, hoe betrouwbaar dat is, wat niet lukte en wat het onderzoek
        niet kan zeggen. De data staan onderaan.
      </p>

      <H2>In het kort</H2>
      <p>
        Ik heb het Sinterklaasjournaal per seizoen vergeleken, niet per groep jaren. De kern is een blinde
        paarsgewijze vergelijking: twee verschillende AI-modellen (Claude Haiku en DeepSeek) lazen steeds twee
        afleveringen uit verschillende jaren, zonder jaartallen of namen, en beantwoordden acht vragen: welke van de
        twee is enger, spannender, negatiever, maakt ongeruster, heeft een ongeruster einde, is luchtiger, grappiger
        en gezelliger. Elk seizoen is vergeleken met de eerste gemeten seizoenen, 2013-2016. Daarnaast
        maakten AI-agents per seizoen een logboek van alle problemen in het verhaal. Het analyseplan, met hypotheses,
        maten en de ernstschaal, legde ik vast vóór ik de analyses draaide.
      </p>

      <H2>1. Bronnen</H2>
      <Table
        head={["Bron", "Wat", "Omvang"]}
        rows={[
          ["NPO-ondertitels (888)", "Ondertitels van gewone afleveringen (tot 20 minuten), opgespoord via gearchiveerde npostart.nl-pagina's in het Wayback-archief en via NPO Start", "200 afleveringen uit 2013-2026; complete seizoenen voor 2016, 2018-2022 en 2025; 2026 loopt nog (7 afleveringen); 2023 en 2024 ontbreken"],
          ["Wikipedia", "Samenvatting van de verhaallijn per seizoen", "26 seizoenen, 2001-2026"],
          ["Video", "Afleveringen op YouTube en archive.org", "10 afleveringen, 2004-2024; alleen voor gifjes en beeld"],
        ]}
      />
      <p>
        Alle vergelijkingen over de jaren gebruiken één soort bron (de ondertitels), omdat ondertitels en
        spraakherkenning van dezelfde uitzending duidelijk verschillende tekst opleveren.
      </p>

      <H2>2. Blind maken</H2>
      <p>
        Uit elke tekst haalde ik jaartallen, datums en de namen van de presentatoren. Elke aflevering kreeg een
        willekeurige code. Wat overblijft kan soms nog een hint geven (bijvoorbeeld de plaats van de intocht), maar de
        beoordelaar weet niet welk jaar hij leest.
      </p>

      <H2>3. Paarsgewijze vergelijking</H2>
      <p>
        Voor elk paar seizoenen met minstens vijf afleveringen koos ik tot vier paren afleveringen die op dezelfde plek
        in het seizoen stonden (maximaal drie dagen verschil tot 5 december). Dat gaf 167 paren. Daarna kwamen er 846
        paren bij (maximaal twee dagen verschil, elke aflevering hooguit twee keer per seizoenspaar): samen 1.013
        paren. Elk paar is in beide volgordes beoordeeld.
      </p>
      <p>
        Per oordeel acht vragen, steeds vanuit een kind van vijf: welke is enger (dreiging, gevaar), spannender
        (onzekerheid), negatiever van toon, van welke wordt een kind ongeruster over de hele aflevering, na welke gaat
        het ongeruster naar bed, welke is luchtiger, grappiger en gezelliger. DeepSeek (deepseek-chat) beoordeelde alle
        1.013 paren (2.026 oordelen), Claude Haiku de oorspronkelijke 167 (334 oordelen). Samen 2.360 oordelen.
      </p>
      <p>
        Een eerdere versie van dit stuk gebruikte vier vragen (enger, luchtiger, ongeruster einde, echt en erg) en zette
        elk jaar af tegen het gemiddelde van alle jaren. Op 16 november 2026 heb ik, vóór het draaien, vastgelegd dat ik
        dezelfde paren opnieuw liet beoordelen op de acht vragen hierboven en elk jaar zou afzetten tegen 2013-2016. Het
        gemiddelde van alle jaren is een slecht nulpunt, omdat de recente jaren daar zelf in zitten. Mijn eigen
        referentie zou het programma uit mijn kindertijd zijn (rond 2001), maar daarvan zijn bijna geen ondertitels.
        2013, 2014 en 2016 zijn de eerste seizoenen met minstens vijf afleveringen.
      </p>
      <p>
        Uit alle oordelen schat een Bradley-Terry-model per seizoen een sterkte. In het artikel staat die als de kans
        dat een aflevering uit dat seizoen wint van een aflevering uit 2013-2016. De onzekerheid is berekend door de
        paren 400 keer opnieuw te trekken (bootstrap, beide volgordes van een paar steeds samen).
      </p>
      <Table
        head={["Controle", "Uitkomst"]}
        rows={[
          ["Voorkeur voor eerste of tweede aflevering, Haiku", "45 tot 52 procent: geen duidelijke voorkeur"],
          ["Voorkeur voor eerste of tweede aflevering, DeepSeek", "kiest bij de zware vragen vaker de tweede (59 tot 64 procent), bij luchtiger vaker de eerste (58 procent); valt weg doordat elk paar in beide volgordes is beoordeeld"],
          ["Zelfde antwoord in beide volgordes, Haiku", "75 procent (grappiger) tot 86 procent (ongeruster einde)"],
          ["Zelfde antwoord in beide volgordes, DeepSeek", "71 procent (ongeruster einde) tot 82 procent (gezelliger)"],
          ["Haiku en DeepSeek eens op dezelfde paren", "68 procent (grappiger) tot 80 procent (spannender)"],
          ["Trend per tien jaar", "bij alle acht vragen duidelijk: positief bij de vijf zware vragen, negatief bij luchtiger, grappiger en gezelliger (95%-interval steeds aan één kant van nul)"],
          ["2026 per model", "de modellen verschillen alleen bij enger duidelijk: DeepSeek 70 procent, Haiku 48 procent (Haiku beoordeelde 62 oordelen met een aflevering uit 2026, DeepSeek 252). Bij de andere zeven vragen liggen ze hooguit 8 procentpunt uit elkaar"],
        ]}
      />

      <H2>4. Probleemlogboek per seizoen</H2>
      <p>
        Per seizoen lazen twee Haiku-agents los van elkaar alle afleveringen op volgorde en noteerden elk probleem:
        in welke aflevering het begint, wanneer het is opgelost, hoe erg het is en of het realistisch is. Waar de
        intocht is, welke route de boot vaart, reportages en losse grappen tellen niet als probleem. De ernstschaal:
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
        De maat "dagen open" is het aantal dagen tussen begin en oplossing van een probleem (ernst 2 of hoger), gewogen
        naar ernst. De twee agents kwamen per seizoen dicht bij elkaar uit (correlatie 0,84). Over andere maten waren
        ze het minder eens, zoals de hoogste ernst (0,45) en of een probleem komisch gebracht werd (0,39). Die gebruik
        ik daarom niet als hoofdresultaat.
      </p>

      <H2>5. Wikipedia, alle 26 seizoenen</H2>
      <p>
        Twee Haiku-codeurs lazen de anonieme seizoenssamenvattingen en codeerden de problemen met dezelfde ernstschaal.
        Over het aantal echte én erge problemen waren ze het goed eens (correlatie 0,95). Er is geen duidelijke trend
        over de 26 jaar. De Wikipedia-codering komt bovendien slecht overeen met de logboeken uit de ondertitels
        (correlatie 0,25). Samenvattingen door fans zijn dus geen sterk meetinstrument; in het artikel gebruik ik ze
        alleen voor de vaststelling dat er geen duidelijke trend te zien is.
      </p>

      <H2>6. Open verkenning</H2>
      <p>
        Vijftien agents kregen elk een blind paar afleveringen en beschreven vrij waarin die verschillen. Het enige
        thema dat daar steeds terugkwam, kinderen die worden ingeschakeld om het probleem op te lossen, heb ik
        daarna op alle afleveringen gecodeerd. In 2025 gebeurde dat in 56 procent van de afleveringen, in eerdere
        seizoenen in hooguit 23 procent. Omdat dit thema pas na het bekijken van de data is gekozen, is het
        exploratief.
      </p>

      <H2>7. Beeld</H2>
      <p>
        Van vier afleveringen uit 2009-2018 en vier uit 2023-2024 analyseerde ik elke seconde, ruim 5.000 beelden:
        helderheid, verzadiging, warmte (rood min blauw), kleurrijkheid (de maat van Hasler en Süsstrunk) en het
        aandeel duidelijk rode pixels. Voor de mozaïeken in het artikel zijn per aflevering 250 beelden met een vaste
        willekeurige trekking gekozen (1.000 per periode) en in willekeurige volgorde gezet. De kleurstrook eronder
        toont de gemiddelde kleur van elk van die 1.000 beelden, gesorteerd op tint; beelden met weinig kleur
        (verzadiging onder 25 procent of erg donker) staan rechts. Toen was 66 procent van de beelden duidelijk gekleurd,
        nu 56 procent. De aflevering uit 2004 (een donkere VHS-opname) en die uit 2017 (met gebarentolk in beeld)
        tellen hier niet mee. Van na 2024 en van vóór 2009 heb ik geen bruikbare video.
      </p>

      <H2>8. Wat niet lukte</H2>
      <ul className="mb-4 ml-6 list-disc space-y-2">
        <li>
          Achtergrondmuziek. Ik probeerde drie manieren: een AudioSet-model op de geluidsband, hetzelfde na het
          scheiden van stem en muziek (Demucs), en toonsoortherkenning. De uitkomsten waren onderling tegenstrijdig, de
          opnames te verschillend van kwaliteit, en van 2025 is geen audio beschikbaar.
        </li>
        <li>
          Muziekbeschrijvingen in de ondertitels ("spannende muziek") komen pas vanaf 2022 voor en zijn dus niet
          bruikbaar voor een trend.
        </li>
        <li>Een simpel sentimentmodel per zin liet maar een klein verschil zien; dat staat niet in het artikel.</li>
      </ul>

      <H2>9. Beperkingen</H2>
      <ul className="mb-4 ml-6 list-disc space-y-2">
        <li>2023 en 2024 ontbreken, en van vóór 2013 zijn bijna geen ondertitels te vinden.</li>
        <li>AI-beoordelaars zijn geen kinderen. Ze lezen tekst, zonder beeld, muziek of toon van stemmen.</li>
        <li>Haiku kan een eigen voorkeur hebben, bijvoorbeeld voor langere teksten. Afleveringen van verschillende jaren zijn ongeveer even lang.</li>
        <li>De analyse beschrijft wat er veranderde, niet waarom.</li>
      </ul>

      <H2>Data</H2>
      <ul className="mb-4 ml-6 list-disc space-y-2">
        <li><A href={`${BASE}/data/jaren.csv`}>jaren.csv</A> - alle uitkomsten per seizoen, met onzekerheidsmarges</li>
        <li><A href={`${BASE}/data/wikipedia-seizoenen.csv`}>wikipedia-seizoenen.csv</A> - de codering van de verhaallijn per seizoen (2001-2026)</li>
      </ul>
      <p>
        Vragen over de aanpak of de data?{" "}
        <Link href="/contact" className="font-medium text-accent underline underline-offset-2">
          Neem contact op
        </Link>
        .
      </p>
    </section>
  );
}
