import Stripe from "stripe";
import { BESTEL } from "@/app/kaarten/bestel-config";

// Live voorraadteller voor de fysieke AI-gesprekskaarten. Geen aparte
// database: Stripe is toch al de bron van waarheid voor bestellingen, dus we
// tellen daar simpelweg bij elke paginabezoek in op hoeveel er al verkocht
// zijn en trekken dat af van BESTEL.startVoorraad. Geen webhook nodig (geen
// risico dat een gemiste webhook de teller laat achterlopen).
//
// Verkoop je een keer buiten Stripe om (bijv. op factuur)? Verlaag dan
// gewoon startVoorraad in bestel-config.ts met dat aantal.
export async function leesVoorraad(): Promise<number | null> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;

  const stripe = new Stripe(key);
  let verkocht = 0;
  let startingAfter: string | undefined;

  for (let pagina = 0; pagina < 10; pagina++) {
    const resultaat = await stripe.checkout.sessions.list({
      limit: 100,
      status: "complete",
      starting_after: startingAfter,
    });
    for (const session of resultaat.data) {
      if (session.metadata?.product !== "ai-gesprekskaarten") continue;
      if (session.payment_status !== "paid") continue;
      const aantal = Number.parseInt(session.metadata?.aantal_sets ?? "", 10);
      if (Number.isFinite(aantal)) verkocht += aantal;
    }
    if (!resultaat.has_more) break;
    startingAfter = resultaat.data[resultaat.data.length - 1]?.id;
  }

  return Math.max(0, BESTEL.startVoorraad - verkocht);
}
