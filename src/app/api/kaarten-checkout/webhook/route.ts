import { NextResponse } from "next/server";
import Stripe from "stripe";
import { verlaagVoorraad } from "@/lib/voorraad";

// Stripe-webhook: verlaagt de voorraadteller zodra een betaling echt binnen
// is (niet al bij het aanmaken van de checkout-sessie, dat zou voorraad
// blokkeren voor afgebroken bestellingen). Zonder STRIPE_WEBHOOK_SECRET doet
// dit niets (geen voorraadteller actief).
export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!key || !webhookSecret) {
    return NextResponse.json({ received: true, skipped: "not_configured" });
  }

  const signature = req.headers.get("stripe-signature");
  const payload = await req.text();
  if (!signature) {
    return NextResponse.json({ error: "missing_signature" }, { status: 400 });
  }

  const stripe = new Stripe(key);
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "invalid_signature" },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const aantal = Number.parseInt(session.metadata?.aantal_sets ?? "", 10);
    if (Number.isFinite(aantal) && aantal > 0) {
      await verlaagVoorraad(aantal);
    }
  }

  return NextResponse.json({ received: true });
}
