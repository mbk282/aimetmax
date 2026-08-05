import { NextResponse } from "next/server";
import { leesVoorraad, zetVoorraad } from "@/lib/voorraad";

// GET: huidige voorraad (of null als de teller niet is ingesteld). Gebruikt
// door de bestelpagina om de resterende voorraad te tonen en het maximale
// aantal te beperken.
export async function GET() {
  const voorraad = await leesVoorraad();
  return NextResponse.json({ voorraad });
}

// POST: voorraad handmatig aanpassen (initialiseren, of corrigeren na een
// bestelling op factuur die niet via Stripe-checkout loopt). Beveiligd met
// VOORRAAD_ADMIN_TOKEN in Vercel; zonder die env-var werkt dit niet.
// Body: { token: string, aantal: number }
export async function POST(req: Request) {
  const adminToken = process.env.VOORRAAD_ADMIN_TOKEN;
  if (!adminToken) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let body: { token?: string; aantal?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  if (body.token !== adminToken) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (typeof body.aantal !== "number" || !Number.isFinite(body.aantal)) {
    return NextResponse.json({ error: "invalid_aantal" }, { status: 400 });
  }

  const voorraad = await zetVoorraad(body.aantal);
  return NextResponse.json({ voorraad });
}
