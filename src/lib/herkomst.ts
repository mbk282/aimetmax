// Herkomst van een bezoeker (utm-parameters en verwijzende site), zodat je in
// Stripe ziet waar een koper vandaan kwam. Privacyvriendelijk opgezet:
// - geen cookies: alleen sessionStorage van dit ene tabblad, weg zodra je het
//   tabblad sluit;
// - van een verwijzende site alleen de domeinnaam (linkedin.com), nooit het
//   volledige adres;
// - het gaat alleen mee als de bezoeker zelf op "Bestel" klikt, als metadata
//   bij de Stripe-sessie (bron_utm_source, bron_referrer, ...).
//
// Regel: "laatste niet-directe bron". Een bezoek met utm-parameters of vanaf
// een andere site overschrijft wat er stond; een direct bezoek of klikken
// binnen de site laat de eerdere bron staan.

export const HERKOMST_SLEUTEL = "aimetmax-herkomst";

export const UTM_VELDEN = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

const HERKOMST_VELDEN = [...UTM_VELDEN, "referrer", "landingspagina"] as const;

type HerkomstVeld = (typeof HERKOMST_VELDEN)[number];
export type Herkomst = Partial<Record<HerkomstVeld, string>>;

// Domeinen die geen marketingbron zijn: de eigen site en de terugkeer vanaf
// de Stripe-betaalpagina.
const GEEN_BRON = /(^|\.)(aimetmax\.nl|stripe\.com)$/i;

const MAX_LENGTE = 100;

// Houd alleen letters, cijfers en een paar leestekens over. Geen @, zodat er
// niet per ongeluk een e-mailadres in Stripe belandt.
function schoon(waarde: unknown): string | undefined {
  if (typeof waarde !== "string") return undefined;
  const opgeschoond = waarde
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N} ._\-/:+]/gu, "")
    .trim()
    .slice(0, MAX_LENGTE);
  return opgeschoond || undefined;
}

// Server en client: maak van willekeurige invoer een veilige Herkomst.
export function schoonHerkomst(invoer: unknown): Herkomst {
  if (!invoer || typeof invoer !== "object") return {};
  const bron = invoer as Record<string, unknown>;
  const uit: Herkomst = {};
  for (const veld of HERKOMST_VELDEN) {
    const waarde = schoon(bron[veld]);
    if (waarde) uit[veld] = waarde;
  }
  return uit;
}

// Voor Stripe: alleen gevulde velden, met prefix bron_ (sleutels max. 40
// tekens, waarden max. 500 tekens; wij blijven ruim daaronder).
export function herkomstAlsMetadata(herkomst: Herkomst): Record<string, string> {
  const uit: Record<string, string> = {};
  for (const veld of HERKOMST_VELDEN) {
    const waarde = herkomst[veld];
    if (waarde) uit[`bron_${veld}`] = waarde;
  }
  return uit;
}

// --- Alleen in de browser --------------------------------------------------

function verwijzendDomein(): string | undefined {
  if (!document.referrer) return undefined;
  try {
    const host = new URL(document.referrer).hostname.replace(/^www\./, "");
    if (!host || GEEN_BRON.test(host) || host === window.location.hostname) {
      return undefined;
    }
    return host;
  } catch {
    return undefined;
  }
}

// Herkomst van het huidige paginabezoek. `bron` is false bij een direct
// bezoek of een klik binnen de site.
function huidigeHerkomst(): { herkomst: Herkomst; bron: boolean } {
  const params = new URLSearchParams(window.location.search);
  const ruw: Record<string, string | undefined> = {
    landingspagina: window.location.pathname,
    referrer: verwijzendDomein(),
  };
  for (const veld of UTM_VELDEN) ruw[veld] = params.get(veld) ?? undefined;
  const herkomst = schoonHerkomst(ruw);
  const bron = Boolean(herkomst.referrer) || UTM_VELDEN.some((v) => herkomst[v]);
  return { herkomst, bron };
}

// Aanroepen bij elk volledig paginabezoek (zie HerkomstOnthouden).
export function onthoudHerkomst() {
  try {
    const { herkomst, bron } = huidigeHerkomst();
    const bestaand = window.sessionStorage.getItem(HERKOMST_SLEUTEL);
    if (bestaand && !bron) return;
    window.sessionStorage.setItem(HERKOMST_SLEUTEL, JSON.stringify(herkomst));
  } catch {
    // sessionStorage geblokkeerd (privémodus, strenge instellingen): dan
    // valt leesHerkomst terug op het huidige paginabezoek.
  }
}

// Voor de checkout: bewaarde herkomst, anders die van deze pagina.
export function leesHerkomst(): Herkomst {
  try {
    const bewaard = window.sessionStorage.getItem(HERKOMST_SLEUTEL);
    if (bewaard) return schoonHerkomst(JSON.parse(bewaard));
  } catch {
    // val terug op de huidige pagina
  }
  try {
    return huidigeHerkomst().herkomst;
  } catch {
    return {};
  }
}
