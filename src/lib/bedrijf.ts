// Eén bron voor alle bedrijfsgegevens. De footer en de juridische pagina's
// (privacy, algemene voorwaarden, retour) lezen hier allemaal uit, dus je vult
// het maar op EEN plek in.
//
// NOG INVULLEN (Max):
//   - kvk:  je KvK-nummer (zoek je bedrijf op kvk.nl of pak je KvK-uittreksel).
//   - btw:  je btw-IDENTIFICATIENUMMER (vorm NL........B..), te vinden in je
//           Belastingdienst-account. LET OP: dit is het btw-id voor op je website
//           en facturen, NIET je omzetbelastingnummer (dat bevat je BSN, dus dat
//           zet je nergens publiek).
//   - postcode: de postcode bij Poelen-Hendrikspad 8 (plaats = Lent).
//
// Zolang een veld tussen [vierkante haken] staat, is het nog niet ingevuld.
export const BEDRIJF = {
  handelsnaam: "AI met Max",
  rechtsnaam: "Max Impact",
  eigenaar: "Max van den Broek",
  straat: "Poelen-Hendrikspad 8",
  postcode: "[postcode]",
  plaats: "Lent",
  land: "Nederland",
  email: "max@aimetmax.nl",
  kvk: "[KvK-nummer]",
  btw: "[btw-id]",
  // Het volledige (huis)adres staat sowieso op de juridische pagina's, want een
  // webshop is wettelijk verplicht een vestigingsadres te tonen. Wil je je
  // huisadres NIET ook nog prominent in de footer? Laat dit op false; dan toont
  // de footer alleen de plaats.
  toonAdresInFooter: false,
} as const;

// Volledig adres als één regel, voor de juridische pagina's.
export const BEDRIJF_ADRES = `${BEDRIJF.straat}, ${BEDRIJF.postcode} ${BEDRIJF.plaats}`;
