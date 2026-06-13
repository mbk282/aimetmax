import { BestelClient } from "./BestelClient";

// Dynamisch zodat de aanwezigheid van STRIPE_SECRET_KEY per request wordt
// gelezen: zet je de env-variabele in Vercel, dan wordt afrekenen vanzelf actief.
export const dynamic = "force-dynamic";

export default function BestelPage() {
  const stripeReady = Boolean(process.env.STRIPE_SECRET_KEY);
  return <BestelClient stripeReady={stripeReady} />;
}
