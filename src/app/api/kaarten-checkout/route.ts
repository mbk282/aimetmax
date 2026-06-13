import { NextResponse } from "next/server";
import Stripe from "stripe";
import { BESTEL } from "../../kaarten/bestel-config";

// Maakt een Stripe Checkout-sessie voor de fysieke kaartenset. Werkt zodra
// STRIPE_SECRET_KEY als environment variable is gezet; daarvoor geeft hij 503
// terug en valt de pagina terug op reserveren via e-mail.
export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json({ error: "stripe_not_configured" }, { status: 503 });
  }

  let aantal = 1;
  try {
    const body = await req.json();
    aantal = Math.min(Math.max(parseInt(String(body.aantal), 10) || 1, 1), 50);
  } catch {
    aantal = 1;
  }

  const origin =
    req.headers.get("origin") ||
    new URL(req.url).origin ||
    "https://aimetmax.nl";

  try {
    const stripe = new Stripe(key);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: aantal,
          adjustable_quantity: { enabled: true, minimum: 1, maximum: 50 },
          price_data: {
            currency: BESTEL.valuta.toLowerCase(),
            unit_amount: Math.round(BESTEL.prijs * 100),
            product_data: {
              name: `${BESTEL.naam} (fysieke set)`,
              description:
                "54 gesprekskaarten + 6 spelregelkaarten in een doosje",
            },
          },
        },
      ],
      shipping_address_collection: {
        allowed_countries: [
          "NL", "BE", "DE", "LU", "FR", "AT", "ES", "IT", "IE",
          "PT", "FI", "SE", "DK", "PL",
        ],
      },
      success_url: `${origin}/kaarten/bestel/bedankt?ok=1`,
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
