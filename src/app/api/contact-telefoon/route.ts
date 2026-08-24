import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const ownOrigin = new URL(request.url).origin;
  if (origin && origin !== ownOrigin) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const configured = process.env.CONTACT_PHONE?.replace(/\D/g, "") ?? "";
  const local = configured.startsWith("31")
    ? `0${configured.slice(2)}`
    : configured;
  if (!/^06\d{8}$/.test(local)) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const display = local.match(/.{1,2}/g)?.join(" ") ?? local;
  return NextResponse.json(
    { display, href: `tel:+31${local.slice(1)}` },
    { headers: { "Cache-Control": "no-store" } },
  );
}
