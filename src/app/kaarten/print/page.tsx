"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  Kaart,
  kaarten,
  spelregels,
  themas,
  themaMap,
  typeLabel,
} from "../kaarten-data";
import { ThemaIcon } from "../kaart-visual";

function PrintKaart({ k }: { k: Kaart }) {
  const t = themaMap[k.thema];
  return (
    <div
      className="print-kaart flex flex-col rounded-[10px] border-2 border-ink bg-card"
      style={{ width: "60mm", aspectRatio: "63 / 88", padding: "5mm 5mm 4mm" }}
    >
      <div className="flex items-start justify-between">
        <ThemaIcon thema={k.thema} size={26} />
        <span className="hand leading-none" style={{ color: "#b3ada1", fontSize: 17 }}>
          {String(k.nr).padStart(2, "0")}
        </span>
      </div>
      <div
        className="hand mt-0.5 font-bold leading-none"
        style={{ color: t.kleur, fontSize: 17 }}
      >
        {t.naam}
      </div>
      <span
        className="mt-1.5 inline-block self-start rounded-full border-[1.5px] font-semibold uppercase"
        style={{
          color: t.kleur,
          borderColor: t.kleur,
          fontSize: 8,
          letterSpacing: "0.12em",
          padding: "2px 8px",
        }}
      >
        {typeLabel[k.type]}
      </span>
      <div
        className="flex flex-1 items-center font-medium text-ink"
        style={{
          fontSize: k.tekst.length > 110 ? 11 : 13,
          lineHeight: 1.3,
          padding: "3mm 0",
        }}
      >
        {k.tekst}
      </div>
      <div
        className="flex items-center justify-between border-t-[1.5px] pt-1"
        style={{ borderColor: "#E5DCCB" }}
      >
        <span className="hand text-ink" style={{ fontSize: 13 }}>
          AI met Max
        </span>
        <span className="text-ink-soft" style={{ fontSize: 7 }}>
          aimetmax.nl/kaarten
        </span>
      </div>
    </div>
  );
}

export default function PrintPage() {
  useEffect(() => {
    document.body.classList.add("print-kaarten-view");
    return () => document.body.classList.remove("print-kaarten-view");
  }, []);

  return (
    <div className="mx-auto max-w-[200mm] px-6 py-8">
      <div className="geen-print mb-8">
        <Link
          href="/kaarten"
          className="text-sm font-medium text-ink-soft hover:text-accent"
        >
          &larr; Terug naar de kaarten
        </Link>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink">
          Print-versie
        </h1>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Print deze pagina (of bewaar als PDF), knip de kaarten uit en je hebt
          je eigen set voor een teamsessie. De facilitator-notes staan
          achteraan. Tip: print op iets steviger papier (160 g of meer).
        </p>
        <button onClick={() => window.print()} className="btn btn-primary mt-4">
          Print of bewaar als PDF
        </button>
      </div>

      {/* kaartvellen */}
      <div className="print-vel flex flex-wrap justify-center gap-3">
        {kaarten.map((k) => (
          <PrintKaart key={k.id} k={k} />
        ))}
      </div>

      {/* facilitator-notes */}
      <div className="mt-10 break-before-page">
        <h2 className="text-2xl font-bold text-ink">Facilitator-notes</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Waar het gesprek heen kan per kaart. Niet voorlezen, maar gebruiken om
          door te vragen.
        </p>
        <div className="mt-4 columns-1 gap-8 md:columns-2">
          {themas.map((t) => (
            <div key={t.key} className="mb-4 break-inside-avoid">
              <h3
                className="hand text-lg font-bold"
                style={{ color: t.kleur }}
              >
                {t.naam}
              </h3>
              {kaarten
                .filter((k) => k.thema === t.key)
                .map((k) => (
                  <p key={k.id} className="mt-1.5 text-xs leading-snug text-ink">
                    <span className="font-bold">
                      {String(k.nr).padStart(2, "0")}.
                    </span>{" "}
                    <span className="text-ink-soft">{k.crux}</span>
                  </p>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* spelregels */}
      <div className="mt-10 break-before-page">
        <h2 className="text-2xl font-bold text-ink">Spelregels</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {spelregels.map((s) => (
            <div
              key={s.titel}
              className="break-inside-avoid rounded-xl border-2 border-line p-4"
            >
              <h3 className="hand text-lg font-bold text-accent">{s.titel}</h3>
              <p className="mt-1 text-sm text-ink-soft">{s.tekst}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-ink-soft">
          AI-gesprekskaarten &middot; AI met Max &middot; aimetmax.nl/kaarten
        </p>
      </div>
    </div>
  );
}
