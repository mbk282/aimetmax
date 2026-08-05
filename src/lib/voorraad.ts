import { Redis } from "@upstash/redis";

// Live voorraadteller voor de fysieke AI-gesprekskaarten. Gebruikt Upstash
// Redis (via Vercel Marketplace, env UPSTASH_REDIS_REST_URL/TOKEN). Zonder
// die env-vars is er geen teller: de site valt terug op het statische
// maxOnlineAantal uit bestel-config.ts, net als de Stripe-checkout zonder
// STRIPE_SECRET_KEY.

const KEY = "kaarten:voorraad";

function client() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  return Redis.fromEnv();
}

export async function leesVoorraad(): Promise<number | null> {
  const redis = client();
  if (!redis) return null;
  const waarde = await redis.get<number>(KEY);
  return typeof waarde === "number" ? waarde : null;
}

export async function verlaagVoorraad(aantal: number): Promise<void> {
  const redis = client();
  if (!redis) return;
  const nieuw = await redis.decrby(KEY, aantal);
  if (nieuw < 0) await redis.set(KEY, 0);
}

export async function zetVoorraad(aantal: number): Promise<number | null> {
  const redis = client();
  if (!redis) return null;
  await redis.set(KEY, Math.max(0, Math.trunc(aantal)));
  return leesVoorraad();
}
