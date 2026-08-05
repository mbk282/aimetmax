// STRIPE_API_KEY is een net zo voor de hand liggende naam als
// STRIPE_SECRET_KEY, dus lees allebei: zo breekt een tikfout in de
// env-var-naam de site niet.
export function stripeSecretKey(): string | undefined {
  return process.env.STRIPE_SECRET_KEY ?? process.env.STRIPE_API_KEY;
}
