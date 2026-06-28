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
  naam: "AI-gesprekskaarten",
  ondertitel: "Voer het goede gesprek over AI met je team",
  prijs: 29.95,
  valuta: "EUR",
  // true = pre-order (product nog niet op voorraad). Zet op false zodra je
  // voorraad in huis hebt.
  preorder: true,
  preorderAanbod: {
    actief: true,
    label: "Tijdelijk voorverkoopaanbod",
    titel: "2 voor de prijs van 1",
    uitleg:
      "Standaard bestel je er twee: eentje voor jezelf en eentje om cadeau te geven.",
  },
  standaardAantal: 2,
  maxOnlineAantal: 250,
  aantalKeuzes: [1, 2, 10, 25, 100] as const,
  levertijd: "Verwacht na de zomer van 2026",
  // Verzending: gratis, in de prijs verwerkt. verzendregio bepaalt ook naar
  // welke landen de Stripe-checkout mag verzenden.
  gratisVerzending: true,
  verzendregio: "Nederland en Belgie",
  verzendlanden: ["NL", "BE"] as const,
  retourdagen: 14,
  inhoud: [
    "54 gesprekskaarten: stellingen, dilemma's en open vragen",
    "6 spelregelkaarten met werkvormen voor je sessie",
    "Facilitator-note op elke kaart (de crux van het gesprek)",
    "Stevig doosje in de huisstijl, met QR naar de gratis online versie",
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
  const betaaldeSets =
    BESTEL.preorder && BESTEL.preorderAanbod.actief
      ? Math.ceil(aantal / 2)
      : aantal;
  const gratisSets = Math.max(0, aantal - betaaldeSets);
  const normalePrijs = aantal * BESTEL.prijs;
  const totaal = betaaldeSets * BESTEL.prijs;

  return {
    aantal,
    betaaldeSets,
    gratisSets,
    normalePrijs,
    totaal,
    korting: Math.max(0, normalePrijs - totaal),
    prijsPerSet: totaal / aantal,
  };
}
