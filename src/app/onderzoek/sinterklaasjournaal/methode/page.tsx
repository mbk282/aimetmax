import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Methode: is het Sinterklaasjournaal enger geworden?",
  description:
    "Hoe ik 26 seizoenen verhaallijnen en 200 uitzendingen van het Sinterklaasjournaal analyseerde: bronnen, codeboek, betrouwbaarheid, statistiek en beperkingen. Met downloadbare data.",
  alternates: { canonical: "/onderzoek/sinterklaasjournaal/methode" },
};

const BASE = "/onderzoek/sinterklaasjournaal";

const toetsen = [
  ["Spanningsscore (1-10, Haiku)", "3,3", "4,1", "0,003"],
  ["Negatieve zinnen, sentimentmodel", "35%", "40%", "0,003"],
  ["Negatieve zinnen, Haiku", "23%", "28%", "0,002"],
  ["Open problemen aan het eind", "3,5", "4,1", "0,14"],
  ["Eindigt op cliffhanger", "80%", "92%", "0,06"],
  ["Zendtijd dreiging", "24%", "27%", "0,12"],
  ["Zendtijd liedjes", "2,0%", "1,3%", "0,18"],
];

const trends = [
  ["Spanningsscore", "+0,6 punt", "0,0002"],
  ["Open problemen aan het eind", "+1,0", "0,004"],
  ["Negatieve zinnen (model)", "+3 procentpunt", "0,01"],
  ["Zendtijd dreiging", "+5 procentpunt", "0,001"],
  ["Zendtijd grap en spel", "-4 procentpunt", "0,02"],
  ["Zendtijd liedjes", "-2 procentpunt", "0,01"],
];

const functies = [
  ["D", "Dreiging of probleem", "een probleem introduceren of laten escaleren, gevaar, zorgen, mysterie, cliffhanger"],
  ["O", "Oplossing of geruststelling", "probleem opgelost, 'geen paniek', 'het komt goed'"],
  ["G", "Grap of spel", "grappen, woordgrappen, onhandige pieten, spelletjes, quiz"],
  ["L", "Liedje", "zingen, muziek, rijm"],
  ["W", "Warm of feestelijk", "gezelligheid, cadeautjes, complimenten, blije kinderen"],
  ["I", "Informatie", "neutrale nieuwsmelding, reportage, overgangszinnen van de presentator"],
  ["T", "Teaser", "kopjes aan het begin, vooruitblik op morgen"],
];

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
        . Hier staat welke bronnen ik gebruikte, hoe ik mat, hoe betrouwbaar dat is en wat het onderzoek niet kan zeggen.
        De data staan onderaan, zodat je alles kunt narekenen.
      </p>

      <H2>In het kort</H2>
      <p>
        Ik keek op drie niveaus. De verhaallijnen van alle 26 seizoenen (2001-2026), via Wikipedia. De tekst van 200
        gewone uitzendingen (2008-2026), via de ondertitels van teletekst 888. En het beeld van acht afleveringen, via
        video. Voor het lezen en coderen gebruikte ik AI: Claude Haiku (Anthropic) als codeur, een standaard
        sentimentmodel, en ElevenLabs Scribe voor spraakherkenning. Waar het kon, liet ik twee AI-codeurs los van
        elkaar werken en mat ik hoe vaak ze het eens waren.
      </p>

      <H2>1. Bronnen</H2>
      <Table
        head={["Bron", "Wat", "Omvang"]}
        rows={[
          ["Wikipedia", "Samenvatting van de verhaallijn per seizoen (artikelen 'Sinterklaasjournaal (jaar)')", "26 seizoenen, 2001-2026"],
          ["NPO-ondertitels (888)", "Ondertitels van gewone afleveringen, opgespoord via gearchiveerde npostart.nl-pagina's in het Wayback-archief en via NPO Start", "200 afleveringen, 2008-2026; complete seizoenen voor 2016, 2018-2022 en 2025"],
          ["Video", "Afleveringen op YouTube en archive.org, uitgeschreven met ElevenLabs Scribe", "10 afleveringen, 2004-2024"],
        ]}
      />
      <p>
        Specials zoals de intocht en de jaaroverzichten (langer dan 20 minuten) tellen niet mee. Van 2023 en 2024 zijn
        alleen de eerste twee afleveringen te vinden, en van vóór 2013 bijna niets. Omdat afleveringnummers per jaar
        verschillen, lijn ik afleveringen uit op het aantal dagen tot 5 december.
      </p>

      <H2>2. Eén bron per vergelijking</H2>
      <p>
        Ondertitels en spraakherkenning geven niet dezelfde tekst. Ondertitelaars korten in: tussenwoorden en gebabbel
        vallen weg, de zinnen die het verhaal dragen blijven. Twee uitzendingen had ik in beide vormen (2012 en 2017).
        Daarin scoorden de ondertitels gemiddeld 7,5 procentpunt meer negatieve zinnen dan het spraaktranscript van
        dezelfde aflevering. Alle vergelijkingen over de jaren in het artikel gebruiken daarom alleen de
        NPO-ondertitels. De video-afleveringen gebruik ik alleen voor beeld en gifjes.
      </p>

      <H2>3. Sentimentmodel</H2>
      <p>
        Elke zin ging door het meertalige sentimentmodel{" "}
        <code className="rounded bg-card px-1 text-sm">cardiffnlp/twitter-xlm-roberta-base-sentiment-multilingual</code>.
        Een zin telt als negatief als het model negatief de hoogste kans geeft. Per aflevering is het aandeel
        negatieve zinnen de maat. Zo'n model is grof, dus ik gebruik het naast de codering door Haiku, niet in plaats
        daarvan.
      </p>

      <H2>4. Codering per zin</H2>
      <p>
        Claude Haiku gaf elke zin een valentie en een functie, met het hele transcript als context. Valentie loopt van
        -2 (duidelijk eng, bedreigend of verdrietig voor een kind van vier tot acht) tot +2 (duidelijk vrolijk of
        grappig). De functies:
      </p>
      <Table head={["Code", "Functie", "Voorbeelden"]} rows={functies} />
      <p>
        Een grappig bedoelde "paniek!" van een clowneske piet telt als grap, niet als dreiging. Zendtijd is gewogen
        naar de duur van elke zin. In totaal zijn bijna 36.000 zinnen gecodeerd.
      </p>

      <H2>5. Beoordeling per aflevering</H2>
      <p>
        Een aparte Haiku-agent las elke aflevering in zijn geheel en gaf een spanningsscore (1 tot 10, "hoe spannend
        voor een vijfjarige"), een lijst van problemen met hun status aan het eind (opgelost, open of erger geworden),
        of de aflevering op een cliffhanger eindigt, en of iemand de kijker expliciet geruststelt.
      </p>

      <H2>6. Verhaallijnen per seizoen</H2>
      <p>
        Twee Haiku-codeurs lazen los van elkaar elke Wikipedia-samenvatting. Ze gaven de ernst van het hoofdprobleem
        een score van 1 tot 5 (1 kleine hobbel, 2 iets kwijt of vertraagd, 3 het feest in gevaar, 4 fysiek gevaar,
        ziekte of een kwaadwillende tegenstander, 5 Sinterklaas zelf in gevaar, gewond of vermist). Daarnaast
        codeerden ze per probleem de oorzaak (bijvoorbeeld gestuntel van een piet, technisch defect, ziekte), de
        framing (komisch, gemengd of dreigend) en of het probleem realistisch is of sprookjesachtig. Bij 2023 las één
        codeur een zin uit de castlijst als verhaal; daar telt de score van de andere codeur.
      </p>

      <H2>7. Betrouwbaarheid</H2>
      <p>
        45 afleveringen zijn per zin door twee Haiku-codeurs onafhankelijk gecodeerd. De overeenstemming over de
        functie was kappa 0,65 tot 0,87 per aflevering (substantieel tot zeer goed), over de valentie een correlatie
        van 0,80 tot 0,94. De overige afleveringen zijn door één codeur gedaan. Op seizoensniveau correleerden de twee
        codeurs 0,85 op ernst en 0,6 tot 0,7 op de andere maten.
      </p>

      <H2>8. Statistiek</H2>
      <p>
        Seizoen 2025 vergeleken met de complete seizoenen 2016-2022 (146 afleveringen tegenover 25), met een
        Welch-t-toets per aflevering:
      </p>
      <Table head={["Maat", "2016-2022", "2025", "p"]} rows={toetsen} />
      <p>Lineaire trend per aflevering over 2013-2025, uitgedrukt per tien jaar:</p>
      <Table head={["Maat", "Verandering per 10 jaar", "p"]} rows={trends} />
      <p>
        Het aantal open problemen in de laatste week voor pakjesavond (3,2 in 2016-2022, 4,7 in 2025) berust voor 2025
        op zes afleveringen en is niet significant (p = 0,31). In het artikel staat het daarom als aanwijzing.
      </p>

      <H2>9. Beeld</H2>
      <p>
        Uit vier afleveringen van 2009-2018 en vier van 2023-2024 nam ik elke 1,6 seconde een beeld, ruim 1.500 per
        periode. Daarop mat ik helderheid en kleurverzadiging, en met k-means clustering de tien dominante kleuren. De
        aflevering uit 2004 (een donkere VHS-opname) en die uit 2017 (met gebarentolk in beeld) tellen hier niet mee.
        Een AI-model voor muziekstemming (CLAP) probeerde ik ook, maar dat hield gewone stemmen voor vrolijke muziek en
        bleek onbruikbaar.
      </p>

      <H2>10. Beperkingen</H2>
      <ul className="mb-4 ml-6 list-disc space-y-2">
        <li>2023 en 2024 ontbreken grotendeels, en van vóór 2013 zijn er weinig afleveringen.</li>
        <li>Wikipedia-samenvattingen zijn door fans geschreven, en recente seizoenen zijn uitgebreider beschreven.</li>
        <li>AI-codeurs zijn geen kinderen. Ze meten wat er gezegd wordt, niet hoe muziek, licht en camerawerk aankomen.</li>
        <li>De spanningsscore is een oordeel van een taalmodel. De richting komt overeen met het sentimentmodel en de codering per zin, maar de absolute waarde moet je niet te letterlijk nemen.</li>
        <li>De analyse beschrijft wat er veranderde, niet waarom.</li>
      </ul>

      <H2>Data</H2>
      <ul className="mb-4 ml-6 list-disc space-y-2">
        <li>
          <a className="font-medium text-accent underline underline-offset-2" href={`${BASE}/data/afleveringen.csv`}>
            afleveringen.csv
          </a>{" "}
          - alle maten per aflevering (210 rijen)
        </li>
        <li>
          <a className="font-medium text-accent underline underline-offset-2" href={`${BASE}/data/seizoenen.csv`}>
            seizoenen.csv
          </a>{" "}
          - de codering van de verhaallijn per seizoen (26 rijen)
        </li>
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
