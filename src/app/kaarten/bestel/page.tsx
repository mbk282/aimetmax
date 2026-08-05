import { BestelClient } from "./BestelClient";
import { leesVoorraad } from "@/lib/voorraad";
import { stripeSecretKey } from "@/lib/stripe-key";

// Dynamisch zodat de aanwezigheid van STRIPE_SECRET_KEY en de actuele
// voorraad per request worden gelezen.
export const dynamic = "force-dynamic";

export default async function BestelPage() {
  const stripeReady = Boolean(stripeSecretKey());
  const voorraad = await leesVoorraad();
  return <BestelClient stripeReady={stripeReady} voorraad={voorraad} />;
}
