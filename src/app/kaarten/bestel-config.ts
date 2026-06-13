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
//
// Liever een kant-en-klare betaallink (Stripe/Mollie) i.p.v. de sleutel? Plak
// die dan in `betaalLink`; die heeft voorrang.

export const BESTEL = {
  naam: "AI-gesprekskaarten",
  ondertitel: "Voer het goede gesprek over AI met je team",
  prijs: 29.95,
  valuta: "EUR",
  // Optioneel: een Stripe/Mollie payment link. Leeg laten als je STRIPE_SECRET_KEY
  // gebruikt (aanbevolen).
  betaalLink: "",
  // true = pre-order (product nog niet op voorraad). Zet op false zodra je
  // voorraad in huis hebt.
  preorder: true,
  levertijd: "Verwacht na de zomer van 2026",
  inhoud: [
    "54 gesprekskaarten: stellingen, dilemma's en open vragen",
    "6 spelregelkaarten met werkvormen voor je sessie",
    "Facilitator-note op elke kaart (de crux van het gesprek)",
    "Stevig doosje in de huisstijl, met QR naar de gratis online versie",
  ],
};
