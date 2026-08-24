// Eén bron voor alle bedrijfsgegevens. De footer en de juridische pagina's
// (privacy, algemene voorwaarden, retour) lezen hier allemaal uit, dus je vult
// het maar op EEN plek in.
//
export const BEDRIJF = {
  handelsnaam: "AI met Max",
  rechtsnaam: "Max Impact",
  eigenaar: "Max van den Broek",
  straat: "Poelen-Hendrikspad 8",
  postcode: "6663 TA",
  plaats: "Lent",
  land: "Nederland",
  email: "max@aimetmax.nl",
  kvk: "86640364",
  btw: "NL004250628B57",
  // Het volledige (huis)adres staat sowieso op de juridische pagina's, want een
  // webshop is wettelijk verplicht een vestigingsadres te tonen. Wil je je
  // huisadres NIET ook nog prominent in de footer? Laat dit op false; dan toont
  // de footer alleen de plaats.
  toonAdresInFooter: false,
} as const;

// Volledig adres als één regel, voor de juridische pagina's.
export const BEDRIJF_ADRES = `${BEDRIJF.straat}, ${BEDRIJF.postcode} ${BEDRIJF.plaats}`;
