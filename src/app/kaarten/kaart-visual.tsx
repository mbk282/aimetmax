"use client";

import { Kaart, ThemaKey, themaMap, typeLabel, typeHint } from "./kaarten-data";

// Handgetekende fineliner-iconen per thema (in de huisstijl).
export function ThemaIcon({
  thema,
  size = 30,
}: {
  thema: ThemaKey;
  size?: number;
}) {
  const c = themaMap[thema].kleur;
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: c,
    strokeWidth: 2.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (thema) {
    case "eerlijk": // open oog: transparantie
      return (
        <svg {...common}>
          <path d="M3 16 Q16 7 29 16 Q16 25 3 16 Z" />
          <circle cx="16" cy="16" r="3.6" />
        </svg>
      );
    case "werk": // bliksem: snelheid/productiviteit
      return (
        <svg {...common}>
          <path d="M18 3 L8 18 L15 18 L13 29 L24 12 L17 12 Z" />
        </svg>
      );
    case "leren": // ontluikend plantje: groei
      return (
        <svg {...common}>
          <path d="M16 30 L16 15" />
          <path d="M16 17 C9 16 7 11 7 6 C12 6 16 10 16 16" />
          <path d="M16 15 C23 14 25 9 25 5 C20 5 16 9 16 14" />
        </svg>
      );
    case "vertrouwen": // vergrootglas: klopt het?
      return (
        <svg {...common}>
          <circle cx="14" cy="14" r="9" />
          <path d="M20.5 20.5 L28 28" />
        </svg>
      );
    case "koers": // kompas: richting
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="12" />
          <path d="M16 16 L21 9 L16 16 L12 23 Z" />
          <circle cx="16" cy="16" r="1.4" fill={c} stroke="none" />
        </svg>
      );
    case "mens": // hoofd + hartje: mens & betekenis
      return (
        <svg {...common}>
          <circle cx="12.5" cy="12" r="6.3" />
          <path d="M3.5 28 Q3.5 19 12.5 19 Q17 19 19.5 21.5" />
          <path d="M25 23.4 C21 20.6 21.6 17 25 18.5 C28.4 17 29 20.6 25 23.4 Z" />
        </svg>
      );
  }
}

// Eén kaart, met flip naar de facilitator-note (crux).
export function KaartView({
  kaart,
  flipped = false,
  onFlip,
  variant = "grid",
  animate = false,
}: {
  kaart: Kaart;
  flipped?: boolean;
  onFlip?: () => void;
  variant?: "grid" | "groot";
  animate?: boolean;
}) {
  const thema = themaMap[kaart.thema];
  const groot = variant === "groot";

  return (
    <div
      className={`kaart-flip ${animate ? "kaart-in" : ""}`}
      style={{ width: "100%", aspectRatio: "63 / 88" }}
      data-flipped={flipped ? "true" : "false"}
    >
      <button
        type="button"
        onClick={onFlip}
        aria-label={flipped ? "Toon de stelling" : "Toon de facilitator-note"}
        className="kaart-inner block w-full cursor-pointer text-left"
      >
        {/* VOORKANT */}
        <div
          className="kaart-face rounded-2xl border-2 border-ink bg-card"
          style={{
            boxShadow: `5px 5px 0 ${thema.tint}`,
            padding: groot ? "26px 26px 20px" : "15px 16px 13px",
          }}
        >
          <div className="flex items-start justify-between">
            <ThemaIcon thema={kaart.thema} size={groot ? 40 : 28} />
            <span
              className="hand leading-none"
              style={{ color: "#b3ada1", fontSize: groot ? 26 : 18 }}
            >
              {String(kaart.nr).padStart(2, "0")}
            </span>
          </div>

          <div
            className="hand mt-1 font-bold leading-none"
            style={{ color: thema.kleur, fontSize: groot ? 28 : 19 }}
          >
            {thema.naam}
          </div>

          <span
            className="mt-2 inline-block self-start rounded-full border-[1.5px] bg-card font-semibold uppercase"
            style={{
              color: thema.kleur,
              borderColor: thema.kleur,
              fontSize: groot ? 12 : 9.5,
              letterSpacing: "0.13em",
              padding: groot ? "4px 12px" : "3px 10px",
            }}
          >
            {typeLabel[kaart.type]}
          </span>

          <div
            className="flex flex-1 items-center font-medium text-ink"
            style={{
              fontSize: groot ? 30 : kaart.tekst.length > 110 ? 14 : 16,
              lineHeight: 1.34,
              padding: groot ? "16px 0" : "8px 0",
            }}
          >
            {kaart.tekst}
          </div>

          <div
            className="flex items-center justify-between border-t-[1.5px] pt-2"
            style={{ borderColor: "#E5DCCB" }}
          >
            <span
              className="hand text-ink"
              style={{ fontSize: groot ? 20 : 15 }}
            >
              AI met Max
            </span>
            <span
              className="text-ink-soft"
              style={{ fontSize: groot ? 12 : 8.5, letterSpacing: "0.02em" }}
            >
              aimetmax.nl/kaarten
            </span>
          </div>
        </div>

        {/* ACHTERKANT: de facilitator-note */}
        <div
          className="kaart-face kaart-back rounded-2xl border-2 border-ink"
          style={{
            background: thema.tint,
            boxShadow: `5px 5px 0 ${thema.tint}`,
            padding: groot ? "26px 28px" : "15px 16px",
          }}
        >
          <div className="flex items-center gap-2">
            <ThemaIcon thema={kaart.thema} size={groot ? 26 : 20} />
            <span
              className="font-semibold uppercase"
              style={{
                color: thema.kleur,
                fontSize: groot ? 12 : 9.5,
                letterSpacing: "0.13em",
              }}
            >
              Voor de begeleider
            </span>
          </div>
          <p
            className="mt-2 font-medium text-ink"
            style={{ fontSize: groot ? 15 : 11, lineHeight: 1.3 }}
          >
            {typeHint[kaart.type]}
          </p>
          <div
            className="mt-2 flex-1 overflow-auto text-ink"
            style={{ fontSize: groot ? 17 : 11.5, lineHeight: 1.4 }}
          >
            {kaart.crux}
          </div>
          <div
            className="hand pt-1 text-ink-soft"
            style={{ fontSize: groot ? 16 : 12 }}
          >
            Tik om terug te draaien
          </div>
        </div>
      </button>
    </div>
  );
}
