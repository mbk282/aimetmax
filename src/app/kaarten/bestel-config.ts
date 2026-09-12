// Configuratie voor de bestel-/pre-orderpagina van de fysieke kaartenset.
//
// ECHTE BETALING AANZETTEN met zo min mogelijk werk:
// 1. Maak een Stripe-account aan (stripe.com) en zet daar iDEAL aan
//    (Settings -> Payment methods). Geen producten aanmaken nodig.
// 2. Kopieer je geheime sleutel (begint met sk_live_...) en zet die in Vercel
//    als environment variable met de naam STRIPE_SECRET_KEY
//    (Vercel project -> Settings -> Environment Variables) en redeploy.
// 3. Klaar. De bestelpagina detecteert de sleutel automatisch en de knop wordt
//    een echte, beveiligde afrekenpagina (iDEAL/kaart), met adres en aantal.
//    Zolang er geen sleutel is, blijft het een nette reservering via e-mail.

export const BESTEL = {
  naam: "Praten over AI",
  ondertitel: "Ontdek hoe jouw team écht denkt over AI",
  prijs: 34.95,
  valuta: "EUR",
  // true = pre-order (product nog niet op voorraad). Zet op false zodra je
  // voorraad in huis hebt.
  preorder: false,
  preorderAanbod: {
    actief: false,
    label: "Tijdelijk voorverkoopaanbod",
    titel: "2 voor de prijs van 1",
    uitleg:
      "Standaard bestel je er twee: eentje voor jezelf en eentje om cadeau te geven.",
  },
  standaardAantal: 1,
  maxOnlineAantal: 150,
  // Totaal online verkoopbare voorraad. src/lib/voorraad.ts telt bij Stripe
  // op hoeveel er al betaald zijn en trekt dat hiervan af. Verkoop je een
  // keer buiten Stripe om (bijv. op factuur)? Verlaag dit getal met dat
  // aantal en redeploy.
  startVoorraad: 150,
  aantalKeuzes: [1, 2, 10, 30, 100] as const,
  // Veilige staffel, ook als de set later onder de vaste boekenprijs zou
  // vallen: max. 5% vanaf 10, max. 10% vanaf 30 en vrij vanaf 100 stuks.
  // Hoogste drempel eerst, zodat Array.find direct de juiste staffel pakt.
  bulkStaffels: [
    { vanaf: 100, korting: 0.2, label: "Eventtarief" },
    { vanaf: 30, korting: 0.1, label: "Organisatietarief" },
    { vanaf: 10, korting: 0.05, label: "Teamtarief" },
  ] as const,
  levertijd: "Op voorraad en doorgaans binnen 1-2 werkdagen verzonden.",
  // Verzending: gratis, in de prijs verwerkt. verzendregio bepaalt ook naar
  // welke landen de Stripe-checkout mag verzenden.
  gratisVerzending: true,
  verzendregio: "Nederland en België",
  verzendlanden: ["NL", "BE"] as const,
  retourdagen: 14,
  inhoud: [
    "54 gesprekskaarten: stellingen, dilemma's en open vragen",
    "10 jokers om zelf een stelling, dilemma of open vraag toe te voegen",
    "Regelboekje van 8 pagina's met werkvormen en begeleidingstips",
    "Stevig doosje in de huisstijl, met QR naar de online versie en facilitator-notes",
  ],
} as const;

export function normaliseerAantal(aantal: unknown) {
  const parsed =
    typeof aantal === "number"
      ? aantal
      : Number.parseInt(String(aantal ?? ""), 10);

  if (!Number.isFinite(parsed)) return BESTEL.standaardAantal;

  return Math.min(
    Math.max(Math.trunc(parsed), 1),
    BESTEL.maxOnlineAantal,
  );
}

export function berekenBestelling(aantalInput: unknown) {
  const aantal = normaliseerAantal(aantalInput);
  const rondBedrag = (bedrag: number) =>
    Math.round((bedrag + Number.EPSILON) * 100) / 100;
  const preorderActie = BESTEL.preorder && BESTEL.preorderAanbod.actief;
  const betaaldeSets =
    preorderActie
      ? Math.ceil(aantal / 2)
      : aantal;
  const gratisSets = Math.max(0, aantal - betaaldeSets);
  const bulkStaffel = preorderActie
    ? null
    : BESTEL.bulkStaffels.find((staffel) => aantal >= staffel.vanaf) ?? null;
  const kortingPercentage = bulkStaffel?.korting ?? 0;
  const normalePrijs = rondBedrag(aantal * BESTEL.prijs);
  const totaalZonderAfronding = preorderActie
    ? betaaldeSets * BESTEL.prijs
    : normalePrijs * (1 - kortingPercentage);
  // Rond een staffelbedrag naar boven af op centen. Zo komt de effectieve
  // korting door afronding nooit boven het wettelijke maximum uit.
  const totaal = kortingPercentage > 0
    ? Math.ceil(totaalZonderAfronding * 100 - 1e-9) / 100
    : rondBedrag(totaalZonderAfronding);

  return {
    aantal,
    betaaldeSets,
    gratisSets,
    normalePrijs,
    totaal,
    korting: rondBedrag(Math.max(0, normalePrijs - totaal)),
    prijsPerSet: totaal / aantal,
    bulkStaffel,
    kortingPercentage,
  };
}
