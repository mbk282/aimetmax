import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Methode: is het Sinterklaasjournaal enger geworden?",
  description:
    "Hoe ik 192 afleveringen van het Sinterklaasjournaal blind liet vergelijken door AI: bronnen, de exacte vraag aan de modellen, 2.360 oordelen, betrouwbaarheid, beperkingen en downloadbare data.",
  alternates: { canonical: "/onderzoek/sinterklaasjournaal/methode" },
};

const BASE = "/onderzoek/sinterklaasjournaal";

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-12 mb-3 text-2xl font-bold text-ink">{children}</h2>;
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-8 mb-2 text-lg font-semibold text-ink">{children}</h3>;
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
        . Hier staat welke bronnen ik gebruikte, wat ik de AI-modellen precies vroeg, hoe ik van oordelen naar
        percentages kwam, hoe betrouwbaar dat is, wat niet lukte en wat het onderzoek niet kan zeggen. De data en het
        vooraf vastgelegde analyseplan staan onderaan.
      </p>

      <div className="my-8 rounded-xl border border-line bg-card p-5 sm:p-6 [&_p]:mb-3">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">Voor journalisten</p>
        <p>
          <strong className="text-ink">Wat is gemeten.</strong> Twee AI-modellen (DeepSeek en Claude Haiku) lazen blind
          de ondertitels van twee afleveringen uit verschillende seizoenen en kozen per vraag welke van de twee enger,
          spannender, negatiever, luchtiger, grappiger enzovoort is. Samen 2.360 oordelen over 956 verschillende paren
          (57 paren zijn door DeepSeek twee keer beoordeeld, zie sectie 3), uit 192 afleveringen van tien seizoenen
          tussen 2013 en 2026.
        </p>
        <p>
          <strong className="text-ink">Kerncijfers.</strong> Geschatte kans dat een aflevering uit een seizoen enger
          wordt gevonden dan een aflevering uit 2013-2016 (50 procent is geen verschil): 2021 59 procent, 2022 74, 2025
          80 en 2026 66 procent (alleen de eerste zeven afleveringen). Bij dat laatste cijfer zijn de modellen het niet
          eens: DeepSeek komt op 70, Haiku op 48 procent. Luchtiger in 2025: 15 procent, grappiger: 23 procent. Het beeld
          is een sprong in 2022, met een piek in 2025.
        </p>
        <p>
          <strong className="text-ink">Wat het niet is.</strong> Geen onderzoek bij kinderen. De modellen lezen tekst,
          zonder beeld, muziek of stemmen. Het blind maken is niet waterdicht (zie sectie 2 en de robuustheidstest
          daarna). Het onderzoek beschrijft wat er veranderde, niet waarom.
        </p>
        <p>
          <strong className="text-ink">Bronvermelding.</strong> “Analyse van Max van den Broek (AI met Max) op basis
          van 2.360 blinde vergelijkingen van afleveringen door de AI-modellen DeepSeek en Claude Haiku.”
        </p>
        <p className="mb-0">
          <strong className="text-ink">Meer nodig?</strong> De scripts, de prompts en de ruwe oordelen stuur ik op
          verzoek.{" "}
          <Link href="/contact" className="font-medium text-accent underline underline-offset-2">
            Neem contact op
          </Link>
          .
        </p>
      </div>

      <H2>In het kort</H2>
      <p>
        Ik heb het Sinterklaasjournaal per seizoen vergeleken, niet per groep jaren. De kern is een blinde
        paarsgewijze vergelijking. Een AI-model las steeds twee afleveringen uit verschillende seizoenen, zonder
        jaartallen of namen, en beantwoordde acht vragen: welke van de twee is enger, spannender, negatiever, maakt
        ongeruster, heeft een ongeruster einde, is luchtiger, grappiger en gezelliger. DeepSeek beoordeelde alle paren,
        Claude Haiku een deel ervan. Elk seizoen is afgezet tegen de eerste gemeten seizoenen: 2013, 2014 en 2016.
      </p>
      <p>
        Daarnaast maakten AI-agents per seizoen een logboek van alle problemen in het verhaal, en codeerden ze de
        Wikipedia-samenvattingen van alle seizoenen sinds 2001. Na een eerste verkennende ronde legde ik op 16 november
        2026 een analyseplan vast, met hypotheses, maten en de ernstschaal, vóór de analyses in dit stuk (zie sectie 3
        voor wat er daarvoor al bekend was).
      </p>

      <H2>1. Bronnen</H2>
      <Table
        head={["Bron", "Wat", "Omvang"]}
        rows={[
          [
            "NPO-ondertitels (888)",
            "Ondertitels van gewone afleveringen (tot 20 minuten), opgespoord via gearchiveerde npostart.nl-pagina's in het Wayback-archief en via NPO Start",
            "201 gewone afleveringen met ondertitels: 198 uit 2013-2026, plus 1 uit 2008 en 2 uit 2012. In de paarsgewijze vergelijking zitten 192 afleveringen uit tien seizoenen (zie de tabel hieronder). Van 2023 en 2024 vond ik geen ondertitels.",
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
        citaten uit afleveringen zonder ondertitels, nooit in de vergelijkingen over de jaren.
      </p>

      <H3>Welke seizoenen meedoen</H3>
      <p>
        Volgens het vooraf vastgelegde plan doen alleen seizoenen met minstens vijf afleveringen mee. Dat zijn er tien.
        2008 (1 aflevering), 2012 (2), 2015 (3) en 2017 (3) vallen af. Van 2023 en 2024 vond ik alleen de eerste twee
        afleveringen, als video en zonder ondertitels.
      </p>
      <Table
        head={["Seizoen", "Afleveringen in analyse", "Uitgezonden (Wikipedia)", "Eerste en laatste", "Dagen tot 5 december", "Oordelen DeepSeek / Haiku"]}
        rows={[
          ["2013", "5", "24", "16 nov - 3 dec", "19 tot 2", "210 / 48"],
          ["2014", "12", "24", "11 nov - 4 dec", "24 tot 1", "436 / 68"],
          ["2016", "23", "26", "9 nov - 3 dec", "26 tot 2", "452 / 70"],
          ["2018", "20", "23", "12 nov - 4 dec", "23 tot 1", "444 / 70"],
          ["2019", "22", "24", "11 nov - 4 dec", "24 tot 1", "446 / 70"],
          ["2020", "25", "26", "9 nov - 4 dec", "26 tot 1", "454 / 70"],
          ["2021", "27", "27", "8 nov - 4 dec", "27 tot 1", "454 / 70"],
          ["2022", "26", "28", "7 nov - 3 dec", "28 tot 2", "454 / 70"],
          ["2025", "25", "25", "10 nov - 4 dec", "25 tot 1", "450 / 70"],
          ["2026", "7", "26 gepland", "9 nov - 15 nov", "26 tot 20", "252 / 62"],
        ]}
      />
      <p>
        Elk oordeel telt bij twee seizoenen mee, daarom is de som van de laatste kolom groter dan 2.360. Wikipedia telt
        mogelijk ook speciale afleveringen mee, dus de vergelijking met de kolom ervoor is een benadering. 2021 en 2025
        zijn compleet. 2016, 2018, 2019, 2020 en 2022 missen een paar afleveringen, maar lopen van ongeveer het begin
        van het seizoen tot een of twee dagen voor 5 december. 2014 is voor de helft aanwezig, verspreid over het
        seizoen. 2013 heeft maar vijf afleveringen, vanaf 16 november. 2026 loopt nog: alleen de eerste zeven
        afleveringen (9 tot en met 15 november 2026), die alleen zijn vergeleken met afleveringen van dezelfde plek in
        eerdere seizoenen.
      </p>

      <H2>2. Blind maken</H2>
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
          2013-2021, 198 keer in 2022, 172 keer in 2025 en 45 keer in 2026 (sprekerslabels zoals “(regie:)” niet
          meegeteld). Een model kan daaraan zien of een
          aflevering van vóór of na 2022 is. Het leest die beschrijvingen ook gewoon mee.
        </li>
        <li>
          <strong className="text-ink">Een naam.</strong> In 6 van de 201 teksten bleef de naam Dieuwertje staan,
          meestal als sprekerslabel (twee afleveringen elk uit 2018, 2020 en 2021).
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
        De modellen kregen dus geen jaartal te zien, maar konden soms raden of een aflevering oud of nieuw is. Dat de
        grootste sprong precies in 2022 zit, het jaar waarin de notatie verandert, kan daar deels door komen. Daarom heb
        ik DeepSeek alle oordelen opnieuw laten doen op teksten zonder geluidsbeschrijvingen; zie de robuustheidstest
        hieronder.
      </p>

      <H2>Robuustheidstest: zonder geluidsbeschrijvingen</H2>
      <p>
        Waarom deze test: de ondertitels noteren geluid en muziek vanaf 2022 anders (tussen haakjes in plaats van in
        hoofdletters), precies in het jaar van de omslag. Een model kon daaraan dus soms zien of een aflevering van voor
        of na 2022 is, en het las beschrijvingen als &quot;spannende muziek&quot; mee. Deze test heb ik pas bedacht na de eerste
        uitkomsten, naar aanleiding van een controle van deze methode. De cijfers in het artikel komen uit de
        oorspronkelijke run.
      </p>
      <p>
        Wat: DeepSeek beoordeelde alle 2.026 oordelen opnieuw, met dezelfde paren, prompt en instellingen, maar op
        teksten waaruit alles tussen haakjes, alle woorden in hoofdletters (geluidsbeschrijvingen) en de resterende
        presentatornamen zijn gehaald (script clean_blind.py). Daarna staan er in geen enkel seizoen nog haakjes of
        hoofdletterwoorden in de teksten.
      </p>
      <p>
        Uitkomst: per vraag gaf DeepSeek in 88 tot 91 procent van de oordelen hetzelfde antwoord als op de originele
        tekst. De scores per seizoen verschuiven hooguit een paar procentpunten, en de omslag in 2022 blijft staan.
      </p>
      <Table
        head={["Alleen DeepSeek: origineel / zonder geluidsbeschrijvingen", "2021", "2022", "2025", "2026"]}
        rows={[
          ["Enger", "61 / 59", "75 / 73", "81 / 81", "70 / 68"],
          ["Spannender", "64 / 64", "76 / 76", "85 / 83", "70 / 71"],
          ["Negatiever", "59 / 57", "72 / 72", "79 / 79", "78 / 81"],
          ["Luchtiger", "40 / 39", "24 / 24", "15 / 15", "27 / 25"],
          ["Grappiger", "49 / 48", "31 / 32", "24 / 24", "18 / 15"],
        ]}
      />

      <H2>3. Paarsgewijze vergelijking</H2>

      <H3>Paren</H3>
      <p>
        Ik koppelde steeds twee afleveringen uit verschillende seizoenen die even ver voor 5 december lagen. Eerst koos
        ik voor elk paar seizoenen tot vier paren: samen 167 paren, waarvan 160 op precies hetzelfde aantal dagen voor 5
        december en 7 met één dag verschil. Daarna kwamen er 846 paren bij, met maximaal twee dagen verschil en elke
        aflevering hooguit twee keer per seizoenspaar.
      </p>
      <p>
        Samen zijn dat 1.013 paren, waarvan 956 verschillend: 57 nieuwe paren bleken gelijk aan een van de eerste 167 en
        zijn door DeepSeek dus twee keer beoordeeld. Van de 956 paren liggen er 270 op dezelfde dag, 357 op één dag
        verschil en 329 op twee dagen. Paren binnen één seizoen zijn er niet. Alle 45 combinaties van de tien seizoenen
        komen voor, met 2 tot 28 paren per combinatie; 2013 tegen 2026 heeft er maar 2. Elk paar is in beide volgordes
        beoordeeld.
      </p>

      <H3>De exacte vraag aan de modellen</H3>
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

      <H3>Modellen en uitvoering</H3>
      <Table
        head={["", "DeepSeek", "Claude Haiku"]}
        rows={[
          ["Model", "deepseek-chat, via de DeepSeek-API", "Claude Haiku, via subagents in Claude Code"],
          ["Instellingen", "temperature 0,3, JSON-modus; een antwoord telt alleen als alle acht sleutels geldig zijn, anders opnieuw (maximaal 6 pogingen)", "standaardinstellingen, geen temperature ingesteld"],
          ["Werkwijze", "één paar per verzoek", "ongeveer vier paren per opdracht (84 opdrachten); de twee volgordes van hetzelfde paar zaten nooit in dezelfde opdracht"],
          ["Paren", "alle 1.013 paren, in beide volgordes", "de oorspronkelijke 167 paren, in beide volgordes"],
          ["Oordelen", "2.026, geen mislukte verzoeken", "334"],
          ["Datum", "16 november 2026", "16 november 2026"],
        ]}
      />
      <p>
        Samen zijn dat 2.360 oordelen. Elk oordeel bevat ook een korte reden van het model (gemiddeld 19 woorden bij
        DeepSeek en 29 bij Haiku).
      </p>

      <H3>Van oordelen naar percentages</H3>
      <p>
        Uit alle oordelen van beide modellen samen schat een Bradley-Terry-model per seizoen een sterkte per vraag.
        “Gelijk” telt als half gewonnen. Dat kwam weinig voor: bij DeepSeek in hooguit 0,8 procent van de oordelen, bij
        Haiku in hooguit 3,6 procent (allebei bij enger). Omdat DeepSeek alle paren beoordeelde en Haiku alleen de eerste
        167, bestaat de gecombineerde schatting voor 86 procent uit oordelen van DeepSeek.
      </p>
      <p>
        In het artikel staat die sterkte als de geschatte kans dat een aflevering uit dat seizoen wint van een
        aflevering uit 2013, 2014 of 2016. Het nulpunt is het gemiddelde van die drie seizoenen, en ze tellen even zwaar,
        ook al heeft 2013 maar vijf afleveringen. Het is een modelschatting, geen geteld percentage.
      </p>
      <p>
        Zo lees je de percentages: 50 procent betekent dat een aflevering uit dat seizoen even vaak wint als verliest van
        een gemiddelde aflevering uit 2013-2016. De drie ijkseizoenen liggen zelf niet precies op 50: bij enger 45, 58 en
        47 procent, over alle acht vragen tussen 39 en 62 procent. Schommelingen van zo’n tien procentpunt zijn dus
        gewoon.
      </p>
      <p>
        De onzekerheid berekende ik door de paren opnieuw te trekken (bootstrap): 400 keer voor de gecombineerde
        schatting, 200 keer per model apart. De twee volgordes van een paar bleven steeds samen. De marges zijn
        95%-intervallen: de 2,5e tot 97,5e percentiel van die herhalingen. Zie sectie 10 voor waarom ze waarschijnlijk te
        smal zijn.
      </p>

      <H3>Uitkomsten per seizoen</H3>
      <p>Beide modellen samen, in procenten (kans om te winnen van een aflevering uit 2013-2016):</p>
      <Table
        head={["Vraag", "2013", "2014", "2016", "2018", "2019", "2020", "2021", "2022", "2025", "2026"]}
        rows={[
          ["Enger", "45", "58", "47", "50", "57", "51", "59", "74", "80", "66"],
          ["Spannender", "43", "49", "58", "55", "56", "52", "65", "76", "85", "71"],
          ["Negatiever", "42", "62", "46", "51", "49", "48", "60", "74", "80", "77"],
          ["Ongeruster", "39", "58", "53", "51", "53", "48", "60", "76", "85", "72"],
          ["Ongeruster einde", "45", "51", "54", "55", "52", "52", "65", "69", "85", "74"],
          ["Luchtiger", "59", "43", "47", "49", "49", "52", "43", "25", "15", "26"],
          ["Grappiger", "56", "49", "45", "58", "59", "63", "52", "33", "23", "17"],
          ["Gezelliger", "61", "42", "47", "46", "44", "53", "48", "31", "21", "37"],
        ]}
      />
      <p>
        De grafiek in het artikel toont vijf vragen: enger, spannender, negatiever, luchtiger en grappiger. Ongeruster,
        ongeruster einde en gezelliger geven hetzelfde beeld (2025: 85, 85 en 21 procent). Ze staan zonder marges in de
        tabel in het artikel en in de tabel hierboven, en met marges in jaren.csv.
      </p>
      <p>
        Alle percentages op deze pagina zijn afgerond vanaf de schattingen met drie decimalen, zoals die in jaren.csv
        staan, op dezelfde manier als in het artikel. Daardoor kan een cijfer een punt afwijken van de onafgeronde
        schatting.
      </p>

      <H3>Controles</H3>
      <Table
        head={["Controle", "Uitkomst"]}
        rows={[
          ["Voorkeur voor eerste of tweede aflevering, Haiku", "45 tot 55 procent: geen duidelijke voorkeur"],
          ["Voorkeur voor eerste of tweede aflevering, DeepSeek", "kiest bij de zware vragen vaker de tweede (59 tot 64 procent), bij luchtiger vaker de eerste (58 procent); valt weg doordat elk paar in beide volgordes is beoordeeld"],
          ["Zelfde winnaar in beide volgordes, Haiku (167 paren)", "75 procent (grappiger) tot 86 procent (ongeruster einde)"],
          ["Zelfde winnaar in beide volgordes, DeepSeek (899 paren)", "71 procent (ongeruster einde) tot 82 procent (gezelliger)"],
          ["Haiku en DeepSeek eens over hetzelfde paar in dezelfde volgorde", "68 procent (grappiger) tot 80 procent (spannender), gemeten op 318 tot 334 oordelen per vraag"],
        ]}
      />
      <p>
        Oordelen met “gelijk” tellen niet mee in deze controles. Bij DeepSeek tellen ook de 57 dubbel beoordeelde paren
        niet mee in de controle op beide volgordes.
      </p>

      <H3>Trend per tien jaar</H3>
      <p>
        Als samenvatting heb ik per vraag een rechte lijn door de seizoenen getrokken, op de log-odds-schaal. De tabel
        toont de helling per tien jaar met het 95%-interval. Positief betekent: meer van dat. Een helling van +1 betekent
        dat de odds per tien jaar ongeveer 2,7 keer zo groot worden.
      </p>
      <Table
        head={["Vraag", "Samen", "DeepSeek", "Haiku"]}
        rows={[
          ["Enger", "+0,90 (0,68 tot 1,14)", "+1,03 (0,81 tot 1,29)", "+0,31 (-0,11 tot 0,86)"],
          ["Spannender", "+1,18 (0,97 tot 1,41)", "+1,17 (0,97 tot 1,43)", "+1,21 (0,81 tot 1,82)"],
          ["Negatiever", "+1,12 (0,88 tot 1,39)", "+1,10 (0,88 tot 1,36)", "+1,25 (0,75 tot 1,96)"],
          ["Ongeruster", "+1,19 (0,97 tot 1,47)", "+1,18 (0,94 tot 1,39)", "+1,25 (0,64 tot 2,11)"],
          ["Ongeruster einde", "+1,17 (0,94 tot 1,44)", "+1,20 (1,00 tot 1,42)", "+0,99 (0,39 tot 1,61)"],
          ["Luchtiger", "-1,21 (-1,51 tot -0,98)", "-1,21 (-1,48 tot -0,95)", "-1,22 (-1,98 tot -0,77)"],
          ["Grappiger", "-1,17 (-1,45 tot -0,94)", "-1,15 (-1,41 tot -0,92)", "-1,25 (-1,83 tot -0,73)"],
          ["Gezelliger", "-0,81 (-1,09 tot -0,58)", "-0,92 (-1,22 tot -0,71)", "-0,24 (-0,76 tot 0,35)"],
        ]}
      />
      <p>
        Samen en bij DeepSeek apart ligt het interval bij alle acht vragen aan één kant van nul. Bij Haiku apart (334
        oordelen) geldt dat voor zes van de acht vragen, niet voor enger en gezelliger. Een rechte lijn is een ruwe
        samenvatting: de seizoenen laten vooral een sprong in 2022 zien, geen geleidelijke stijging.
      </p>

      <H3>Per model</H3>
      <p>Percentages voor 2022 / 2025 / 2026, per model en samen:</p>
      <Table
        head={["Vraag", "DeepSeek", "Haiku", "Samen"]}
        rows={[
          ["Enger", "75 / 81 / 70", "70 / 67 / 48", "74 / 80 / 66"],
          ["Spannender", "76 / 85 / 70", "72 / 84 / 73", "76 / 85 / 71"],
          ["Negatiever", "72 / 79 / 78", "82 / 83 / 78", "74 / 80 / 77"],
          ["Ongeruster", "76 / 85 / 71", "77 / 87 / 73", "76 / 85 / 72"],
          ["Ongeruster einde", "71 / 85 / 74", "59 / 84 / 73", "69 / 85 / 74"],
          ["Luchtiger", "24 / 15 / 27", "29 / 13 / 23", "25 / 15 / 26"],
          ["Grappiger", "31 / 24 / 18", "44 / 17 / 17", "33 / 23 / 17"],
          ["Gezelliger", "28 / 19 / 36", "45 / 31 / 43", "31 / 21 / 37"],
        ]}
      />
      <p>
        De twee modellen komen in 2022 en 2025 aan dezelfde kant van 50 uit. Het grootste verschil is enger in 2026
        (DeepSeek 70, Haiku 48 procent). Daarna komen gezelliger in 2022 (28 tegen 45) en enger in 2025 (81 tegen 67).
        De 66 procent voor enger in 2026 in
        het artikel komt dus vooral van DeepSeek. Haiku beoordeelde alleen de 167 oorspronkelijke paren, dus de marges
        van Haiku zijn veel breder (voor enger in 2026: 32 tot 64 procent).
      </p>

      <H3>Wat vooraf vastlag en wat later kwam</H3>
      <p>
        Op 15 november 2026 deed ik een eerste verkennende ronde: codering per zin en per aflevering, een
        sentimentmodel, muziekanalyse en een eerste versie van het artikel. Op 16 november legde ik het analyseplan vast
        (zie de bijlage onderaan). Een eerste versie van de paarsgewijze vergelijking gebruikte vier vragen (enger,
        luchtiger, ongeruster einde, echt en erg) en zette elk jaar af tegen het gemiddelde van alle jaren.
      </p>
      <p>
        Daarna heb ik, nog op 16 november, in een aanvulling op het plan vastgelegd dat ik dezelfde paren opnieuw liet
        beoordelen op de acht vragen hierboven en elk jaar zou afzetten tegen 2013-2016. Die keuze maakte ik nadat ik de
        uitkomsten van de versie met vier vragen had gezien, maar vóór het draaien van de nieuwe ronde. Die eerste versie
        liet hetzelfde beeld zien, een sprong in 2022 en een piek in 2025 (DeepSeek, enger tegenover het gemiddelde van
        alle jaren: 2021 53, 2022 70, 2025 79 procent).
      </p>
      <p>
        Waarom een ander nulpunt: het gemiddelde van alle jaren is een slecht nulpunt, omdat de recente jaren daar zelf
        in zitten. Mijn eigen referentie zou het programma uit mijn kindertijd zijn (rond 2001), maar daarvan zijn bijna
        geen ondertitels. 2013, 2014 en 2016 zijn de eerste seizoenen met minstens vijf afleveringen. Het plan staat
        niet bij een externe registratiedienst. De volledige tekst staat als bijlage op deze pagina.
      </p>

      <H2>4. Probleemlogboek per seizoen</H2>
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
        seizoen 2026 (afleveringen tot en met 15 november) is de duur daardoor te kort. Daarom laat het artikel 2026 bij
        deze maat weg; de waarde 3,8 in jaren.csv is niet bruikbaar. In 2013 en 2014 ontbreken veel afleveringen,
        waardoor begin en einde van een probleem minder precies vastliggen.
      </p>
      <p>
        De twee agents kwamen bij “dagen open” per seizoen dicht bij elkaar uit (correlatie 0,84). jaren.csv geeft het
        gemiddelde van de twee en daarnaast de laagste en de hoogste. Over andere maten waren ze het minder eens, zoals
        de hoogste ernst (0,45) en of een probleem komisch gebracht werd (0,39). Die gebruik ik daarom niet als
        hoofdresultaat.
      </p>
      <p>
        Vooraf had ik ook twee andere maten vastgelegd. Het aandeel problemen dat echt én erg is (realistisch en ernst 4
        of 5) laat in de logboeken geen trend zien, en de codeurs waren het er matig over eens (correlatie 0,68). Het
        aantal ernstige problemen dat in de laatste drie dagen voor 5 december nog openstaat, ligt de meeste jaren rond
        2, met 3 in 2013, 4 in 2022 en 3,5 in 2025 (correlatie tussen codeurs 0,82). De regressie per aflevering uit het plan heb
        ik niet gedraaid; ik gebruik de schatting per seizoen.
      </p>
      <Table
        head={["Seizoen", "Aandeel echt én erg", "Ernstig en nog open in laatste 3 dagen"]}
        rows={[
          ["2013", "0,18", "3"],
          ["2014", "0,23", "2"],
          ["2016", "0", "1,5"],
          ["2018", "0", "2"],
          ["2019", "0,21", "2"],
          ["2020", "0,08", "2"],
          ["2021", "0,15", "2,5"],
          ["2022", "0,17", "4"],
          ["2025", "0,33", "3,5"],
          ["2026", "0", "niet bruikbaar (seizoen loopt nog)"],
        ]}
      />
      <p>Beide kolommen zijn het gemiddelde van de twee logboeken.</p>

      <H2>5. Wikipedia, alle 26 seizoenen</H2>
      <p>
        Twee Haiku-codeurs lazen de anonieme seizoenssamenvattingen en codeerden de problemen met dezelfde ernstschaal.
        Over het aantal echte én erge problemen waren ze het goed eens (correlatie 0,95). Er is geen duidelijke trend
        over de 26 jaar. De Wikipedia-codering komt bovendien slecht overeen met de logboeken uit de ondertitels
        (correlatie 0,25). Samenvattingen door fans zijn dus geen sterk meetinstrument. In het artikel gebruik ik ze
        alleen voor de vaststelling dat er geen duidelijke trend te zien is.
      </p>

      <H2>6. Open verkenning en thema’s</H2>
      <p>
        Vijftien Haiku-agents kregen elk een blind paar afleveringen en beschreven vrij waarin die verschillen. Vijf
        thema’s die daaruit kwamen, liet ik daarna door Haiku op alle 201 afleveringen coderen: of kinderen helpen, hoe
        aanwezig Sinterklaas is, het soort humor, het aandeel reportages en hoe de aflevering eindigt. Omdat deze
        thema’s pas na het bekijken van de data zijn gekozen, zijn ze exploratief. Ze staan daarom niet in het artikel.
        Hieronder de twee die het meest opvielen.
      </p>
      <p>
        <strong className="text-ink">Kinderen helpen.</strong> In de strenge telling tel ik een aflevering alleen mee
        als kinderen nodig zijn om het probleem in het verhaal op te lossen. Dat was zo in 14 van de 25 afleveringen uit
        2025 (56 procent), vooral via de oproep aan kijkers om puzzelstukjes te zoeken, en in eerdere seizoenen in
        hooguit 23 procent (2022). Deze strenge telling is een herindeling van de beschrijvingen van Haiku en daarmee
        extra subjectief. Een ruimere telling, waarbij elk kind telt dat in beeld helpt of meedoet, geeft in bijna alle
        jaren hogere cijfers en geen duidelijke piek in 2025.
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

      <H2>7. Zendtijd liedjes</H2>
      <p>
        In de eerste, verkennende ronde (15 november 2026) gaf Claude Haiku elke ondertitelzin een functie: dreiging,
        oplossing, grap of spel, lied, gezelligheid, informatie of vooruitblik. “Zendtijd liedjes” is het aandeel van de
        duur van alle zinnen dat als lied is gecodeerd. Dat daalde van 3,4 procent in 2016 naar 1,3 procent in 2025 en
        0,7 procent in 2026 (in die ronde zes afleveringen). 2018 lag al op 1,1 procent.
      </p>
      <Table
        head={["Seizoen", "2013", "2014", "2016", "2018", "2019", "2020", "2021", "2022", "2025", "2026"]}
        rows={[["Zendtijd liedjes", "2,2%", "3,0%", "3,4%", "1,1%", "2,0%", "2,2%", "2,0%", "1,4%", "1,3%", "0,7%"]]}
      />
      <p>
        Dit is een ruwe maat. Hoe liedteksten in de ondertitels staan (bijvoorbeeld met een sterretje of een
        beschrijving), verschilt per periode, en dat kan de telling beïnvloeden.
      </p>

      <H2>8. Beeld</H2>
      <p>
        Van vier afleveringen uit 2009-2018 en vier uit 2023-2024 analyseerde ik elke seconde, ruim 5.000 beelden:
        helderheid, verzadiging, warmte (rood min blauw), kleurrijkheid (de maat van Hasler en Süsstrunk) en het
        aandeel duidelijk rode pixels. Voor de mozaïeken in het artikel zijn per aflevering 250 beelden met een vaste
        willekeurige trekking gekozen (1.000 per periode) en in willekeurige volgorde gezet. De kleurstrook eronder
        toont de gemiddelde kleur van elk van die 1.000 beelden, gesorteerd op tint; beelden met weinig kleur
        (verzadiging onder 25 procent of erg donker) staan rechts. Toen was 66 procent van de beelden duidelijk gekleurd,
        nu 56 procent. Over alle beelden per seconde (2.680 toen, 2.473 nu) daalde het aandeel duidelijk rode pixels van
        gemiddeld 16 naar 9 procent, de kleurrijkheid met 20 procent (van 56 naar 45) en de helderheid met 12 procent
        (van 82 naar 72). Dit zijn gemiddelden van vier afleveringen per periode. De aflevering uit 2004 (een donkere VHS-opname) en die uit 2017 (met gebarentolk in beeld)
        tellen hier niet mee. Van na 2024 en van vóór 2009 heb ik geen bruikbare video.
      </p>

      <H2>9. Wat niet lukte</H2>
      <ul className="mb-4 ml-6 list-disc space-y-2">
        <li>
          Achtergrondmuziek. Ik probeerde drie manieren: een AudioSet-model op de geluidsband, hetzelfde na het
          scheiden van stem en muziek (Demucs), en toonsoortherkenning. De uitkomsten waren onderling tegenstrijdig, de
          opnames te verschillend van kwaliteit. De afleveringen van 2025 staan wel op NPO Start, maar met
          kopieerbeveiliging, dus hun geluid kon ik niet analyseren. Hypothese H4 uit het plan kan ik
          daarom niet beantwoorden.
        </li>
        <li>
          Muziekbeschrijvingen in de ondertitels (“SPANNENDE MUZIEK” of “(spannende muziek)”) staan er in alle jaren
          in. Maar de notatie veranderde in 2022 en het aantal schommelt sterk per seizoen (spannende, dreigende,
          geheimzinnige of mysterieuze muziek: 0 keer in 2016, 7 in 2020, 13 in 2022, 4 in 2025). Als maat voor een trend zijn ze
          daarom niet bruikbaar. De AI-beoordelaars lazen ze wel mee (zie sectie 2).
        </li>
        <li>Een simpel sentimentmodel per zin liet maar een klein verschil zien; dat staat niet in het artikel.</li>
      </ul>

      <H2>10. Beperkingen</H2>
      <ul className="mb-4 ml-6 list-disc space-y-2">
        <li>
          2023 en 2024 ontbreken, van vóór 2013 zijn bijna geen ondertitels te vinden, en van 2026 gaat het alleen om de
          eerste zeven afleveringen.
        </li>
        <li>
          AI-beoordelaars zijn geen kinderen. Ze lezen wat er gezegd wordt, plus de geluidsbeschrijvingen die de
          ondertitelaar erbij zet. Beeld, muziek en de toon van stemmen zien ze niet.
        </li>
        <li>
          Het blind maken is niet waterdicht. Vooral de andere notatie van geluid vanaf 2022 kan een model laten zien dat
          een aflevering recent is (zie sectie 2 en de robuustheidstest).
        </li>
        <li>
          De onzekerheidsmarges houden er geen rekening mee dat dezelfde aflevering in veel paren voorkomt (gemiddeld
          zo’n tien). De vijf afleveringen uit 2013 zitten samen in 210 oordelen van DeepSeek, de zeven uit 2026 in
          252. De echte onzekerheid is daardoor groter, vooral voor 2013 (en daarmee het nulpunt) en 2026.
        </li>
        <li>
          Ik heb de oordelen van de modellen niet naast die van mensen gelegd. De controle bestaat uit twee modellen die
          elkaar en zichzelf (in omgekeerde volgorde) moeten bevestigen.
        </li>
        <li>
          Beide modellen kunnen eigen voorkeuren hebben, bijvoorbeeld voor de langere tekst. Recente afleveringen zijn
          wat langer: in 2013-2016 gemiddeld zo’n 1.270 woorden, in 2025 zo’n 1.440 en in 2026 zo’n 1.500. Meer tekst
          kan meer gebeurtenissen bevatten. Of dat de oordelen beïnvloedt, heb ik niet apart getoetst.
        </li>
        <li>De gecombineerde cijfers komen voor 86 procent van DeepSeek.</li>
        <li>De analyse beschrijft wat er veranderde, niet waarom.</li>
      </ul>

      <H2>11. Wie deed dit, en met welke tools</H2>
      <p>
        Dit onderzoek deed ik, Max van den Broek, op eigen initiatief en zonder opdrachtgever. Ik ben freelance
        AI-expert, geef trainingen over AI en schreef het boek AI-Pionier. Ik heb geen band met de NTR of de NPO.
      </p>
      <Table
        head={["Tool", "Waarvoor"]}
        rows={[
          ["DeepSeek (deepseek-chat)", "blinde paarsgewijze oordelen, alle 1.013 paren"],
          ["Claude Haiku", "blinde paarsgewijze oordelen (167 paren), probleemlogboeken, Wikipedia-codering, open verkenning, themacodering en de codering per zin; 15 en 16 november 2026, via subagents in Claude Code"],
          ["Claude Code", "hulp bij het schrijven van de analysecode en de dataverwerking"],
          ["ElevenLabs Scribe", "spraakherkenning van de video-afleveringen, alleen voor citaten, niet voor de vergelijkingen"],
        ]}
      />

      <H2>Data</H2>
      <ul className="mb-4 ml-6 list-disc space-y-2">
        <li>
          <A href={`${BASE}/data/jaren.csv`}>jaren.csv</A> - per seizoen de kans per vraag ten opzichte van 2013-2016
          met 95%-interval (kolommen kans_enger_vs_2013_2016 met _lo en _hi, en zo verder voor alle acht vragen), dagen
          open (gemiddelde van twee codeurs, met de laagste en hoogste codeur), aantal afleveringen, zendtijd liedjes en
          aandeel afleveringen waarin kinderen helpen (strenge telling)
        </li>
        <li>
          <A href={`${BASE}/data/oordelen.csv`}>oordelen.csv</A> - alle 2.360 blinde oordelen: model (deepseek-chat of
          claude-haiku), code, seizoen en datum van de eerste en de tweede aflevering, de acht antwoorden (eerste,
          tweede of gelijk) en de korte reden van het model
        </li>
        <li>
          <A href={`${BASE}/data/wikipedia-seizoenen.csv`}>wikipedia-seizoenen.csv</A> - de codering van de verhaallijn
          per seizoen (2001-2026): aantal problemen, aantal en aandeel echt én erg, hoogste ernst
        </li>
      </ul>

      <H3>Code, prompts en ruwe data</H3>
      <p>
        Er is geen openbare code-repository. Op verzoek stuur ik de analysecode (Bradley-Terry en bootstrap, in
        Python), het script dat DeepSeek aanstuurde, de opdrachten aan Haiku, de koppeling tussen codes en afleveringen
        en de probleemlogboeken. De ondertitels zelf deel ik niet openbaar, omdat die van de NPO zijn.
      </p>
      <p>
        Vragen over de aanpak of de data?{" "}
        <Link href="/contact" className="font-medium text-accent underline underline-offset-2">
          Neem contact op
        </Link>
        .
      </p>

      <H2>Bijlage: het vooraf vastgelegde analyseplan</H2>
      <p>
        Dit is de volledige, ongewijzigde tekst van het plan, inclusief de aanvulling van 16 november 2026. Wat in dit
        plan staat maar niet is uitgevoerd of anders is gedaan, staat hierboven bij de betreffende sectie.
      </p>
      <details className="my-5 rounded-lg border border-line bg-card p-4">
        <summary className="cursor-pointer font-semibold text-ink">Toon het analyseplan</summary>
        <Pre>{PREREGISTRATIE}</Pre>
      </details>
    </section>
  );
}
