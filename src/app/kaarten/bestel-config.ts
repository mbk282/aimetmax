// Configuratie voor de bestel-/pre-orderpagina van de fysieke kaartenset.
//
// Zo zet je echte betaling aan (2 minuten, geen code nodig):
// 1. Maak een betaallink aan bij Stripe (Payment Link) of Mollie.
//    - Stripe: dashboard -> Payment links -> nieuw, product "AI-gesprekskaarten",
//      prijs 34,95 EUR, zet "laat klant aantal kiezen" aan, en activeer iDEAL.
//    - Mollie kan ook (iDEAL is in NL favoriet); gebruik een betaallink/Payment.
// 2. Plak de link hieronder in `betaalLink`. Zodra die is ingevuld, wordt de
//    bestelknop een echte betaling. Is hij leeg, dan is de pagina een nette
//    pre-order via e-mail (veilig om nu al live te zetten, zonder voorraad).
// 3. Zet `preorder` op false zodra je voorraad in huis hebt.

export const BESTEL = {
  naam: "AI-gesprekskaarten",
  ondertitel: "Voer het goede gesprek over AI met je team",
  prijs: 34.95,
  valuta: "EUR",
  // Vul in om echte betaling aan te zetten (Stripe/Mollie payment link):
  betaalLink: "",
  // true = pre-order (product nog niet op voorraad), tonen we eerlijk
  preorder: true,
  levertijd: "Verwacht na de zomer van 2026",
  inhoud: [
    "54 gesprekskaarten: stellingen, dilemma's en open vragen",
    "6 spelregelkaarten met werkvormen voor je sessie",
    "Facilitator-note op elke kaart (de crux van het gesprek)",
    "Stevig doosje in de huisstijl, met QR naar de gratis online versie",
  ],
};
