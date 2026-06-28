import { NextResponse } from "next/server";
import Stripe from "stripe";
import {
  BESTEL,
  berekenBestelling,
  normaliseerAantal,
} from "../../kaarten/bestel-config";

// Maakt een Stripe Checkout-sessie voor de fysieke kaartenset. Werkt zodra
// STRIPE_SECRET_KEY als environment variable is gezet; daarvoor geeft hij 503
// terug en valt de pagina terug op reserveren via e-mail.
export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json({ error: "stripe_not_configured" }, { status: 503 });
  }

  let aantal: number = BESTEL.standaardAantal;
  try {
    const body = await req.json();
    aantal = normaliseerAantal(body.aantal);
  } catch {
    aantal = BESTEL.standaardAantal;
  }
  const bestelling = berekenBestelling(aantal);

  const origin =
    req.headers.get("origin") ||
    new URL(req.url).origin ||
    "https://aimetmax.nl";

  try {
    const stripe = new Stripe(key);
    const beschrijving =
      bestelling.gratisSets > 0
        ? `${bestelling.aantal} sets geleverd; ${bestelling.gratisSets} gratis via het voorverkoopaanbod.`
        : `${bestelling.aantal} set geleverd als pre-order.`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "nl",
      billing_address_collection: "auto",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: BESTEL.valuta.toLowerCase(),
            unit_amount: Math.round(bestelling.totaal * 100),
            tax_behavior: "inclusive",
            product_data: {
              name: `${BESTEL.naam} - ${bestelling.aantal} set${bestelling.aantal === 1 ? "" : "s"} (pre-order)`,
              description: beschrijving,
            },
          },
        },
      ],
      metadata: {
        product: "ai-gesprekskaarten",
        preorder: String(BESTEL.preorder),
        aanbod: BESTEL.preorderAanbod.actief
          ? BESTEL.preorderAanbod.titel
          : "geen",
        aantal_sets: String(bestelling.aantal),
        betaalde_sets: String(bestelling.betaaldeSets),
        gratis_sets: String(bestelling.gratisSets),
      },
      payment_intent_data: {
        metadata: {
          product: "ai-gesprekskaarten",
          aantal_sets: String(bestelling.aantal),
          betaalde_sets: String(bestelling.betaaldeSets),
          gratis_sets: String(bestelling.gratisSets),
        },
      },
      shipping_address_collection: {
        allowed_countries: [...BESTEL.verzendlanden],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: BESTEL.valuta.toLowerCase() },
            display_name: "Gratis verzending",
          },
        },
      ],
      success_url: `${origin}/kaarten/bestel/bedankt?ok=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/kaarten/bestel`,
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "checkout_failed" },
      { status: 500 },
    );
  }
}
