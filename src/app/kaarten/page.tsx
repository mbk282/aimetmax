"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Kaart,
  KaartType,
  ThemaKey,
  kaarten,
  spelregels,
  themas,
  typeLabel,
} from "./kaarten-data";
import { KaartView } from "./kaart-visual";

const typeKeuzes: { key: KaartType; label: string }[] = [
  { key: "stelling", label: "Stellingen" },
  { key: "dilemma", label: "Dilemma's" },
  { key: "open-vraag", label: "Open vragen" },
];

function linkedinTekst(k: Kaart): string {
  const slot =
    k.type === "stelling"
      ? "Eens of oneens? En waarom?"
      : k.type === "dilemma"
        ? "Wat zou jij doen?"
        : "Benieuwd naar jouw antwoord.";
  return `${k.tekst}\n\n${slot}\n\nEen ${typeLabel[
    k.type
  ].toLowerCase()} uit de gratis AI-gesprekskaarten van AI met Max. De hele set staat op aimetmax.nl/kaarten`;
}

export default function KaartenPage() {
  const [themaFilter, setThemaFilter] = useState<Set<ThemaKey>>(new Set());
  const [typeFilter, setTypeFilter] = useState<Set<KaartType>>(new Set());
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  const [drawn, setDrawn] = useState<Kaart | null>(null);
  const [drawnFlipped, setDrawnFlipped] = useState(false);
  const [drawTick, setDrawTick] = useState(0);
  const [copied, setCopied] = useState<string>("");

  // presenteermodus
  const [presOpen, setPresOpen] = useState(false);
  const [presIndex, setPresIndex] = useState(0);
  const [presFlipped, setPresFlipped] = useState(false);

  const gefilterd = useMemo(() => {
    return kaarten.filter(
      (k) =>
        (themaFilter.size === 0 || themaFilter.has(k.thema)) &&
        (typeFilter.size === 0 || typeFilter.has(k.type)),
    );
  }, [themaFilter, typeFilter]);

  const toggle = <T,>(set: Set<T>, val: T): Set<T> => {
    const next = new Set(set);
    if (next.has(val)) next.delete(val);
    else next.add(val);
    return next;
  };

  const trek = useCallback(() => {
    const pool = gefilterd.length ? gefilterd : kaarten;
    let kandidaat = pool[Math.floor(Math.random() * pool.length)];
    if (pool.length > 1 && drawn) {
      let pogingen = 0;
      while (kandidaat.id === drawn.id && pogingen < 8) {
        kandidaat = pool[Math.floor(Math.random() * pool.length)];
        pogingen++;
      }
    }
    setDrawn(kandidaat);
    setDrawnFlipped(false);
    setDrawTick((t) => t + 1);
  }, [gefilterd, drawn]);

  const kopieer = useCallback((k: Kaart) => {
    navigator.clipboard?.writeText(linkedinTekst(k)).then(
      () => {
        setCopied(k.id);
        setTimeout(() => setCopied(""), 2200);
      },
      () => setCopied(""),
    );
  }, []);

  const openPresenteer = useCallback(
    (k: Kaart) => {
      const idx = Math.max(
        0,
        gefilterd.findIndex((g) => g.id === k.id),
      );
      setPresIndex(idx);
      setPresFlipped(false);
      setPresOpen(true);
    },
    [gefilterd],
  );

  // toetsenbordbediening in presenteermodus
  useEffect(() => {
    if (!presOpen) return;
    const lijst = gefilterd.length ? gefilterd : kaarten;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPresOpen(false);
      else if (e.key === "ArrowRight") {
        setPresIndex((i) => (i + 1) % lijst.length);
        setPresFlipped(false);
      } else if (e.key === "ArrowLeft") {
        setPresIndex((i) => (i - 1 + lijst.length) % lijst.length);
        setPresFlipped(false);
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setPresFlipped((f) => !f);
      } else if (e.key.toLowerCase() === "r") {
        setPresIndex(Math.floor(Math.random() * lijst.length));
        setPresFlipped(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [presOpen, gefilterd]);

  const presLijst = gefilterd.length ? gefilterd : kaarten;
  const presKaart = presLijst[Math.min(presIndex, presLijst.length - 1)];

  return (
    <div>
      {/* ---------------------------------------------------------- HERO */}
      <section className="mx-auto max-w-5xl px-6 pt-14 pb-6">
        <span className="inline-block rounded-full border-2 border-accent px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-accent">
          Gratis &middot; voor teams
        </span>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          AI-gesprekskaarten
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          Het goede gesprek over AI gaat niet over de techniek, maar over wat
          we ervan vinden. Mag je een mail door AI laten schrijven? Wat doe je
          met die stagiair? Doen we te veel of te weinig? Deze 54 stellingen,
          dilemma&apos;s en open vragen leggen het echte gesprek op tafel, zonder
          dat je een AI-expert hoeft te zijn om het te begeleiden.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a href="#trekken" className="btn btn-primary">
            Trek een kaart
          </a>
          <button
            onClick={() => gefilterd[0] && openPresenteer(gefilterd[0])}
            className="btn btn-ghost"
          >
            Start presenteermodus
          </button>
          <a href="#deck" className="btn btn-ghost">
            Bekijk alle kaarten
          </a>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {themas.map((t) => (
            <span
              key={t.key}
              className="inline-flex items-center gap-2 rounded-full border-2 border-line bg-card px-3 py-1.5 text-sm text-ink-soft"
            >
              <span
                className="h-3 w-3 rounded-full border-[1.5px] border-ink"
                style={{ background: t.kleur }}
              />
              {t.naam}
            </span>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------- TREKKEN */}
      <section
        id="trekken"
        className="mx-auto max-w-5xl scroll-mt-6 px-6 py-10"
      >
        <div className="warm-card bg-paper p-6 sm:p-10">
          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_300px]">
            <div>
              <h2 className="hand text-3xl font-bold text-ink">
                Trek een willekeurige kaart
              </h2>
              <p className="mt-2 max-w-md text-ink-soft">
                Begin een sessie, een stand-up of een lunch met één kaart. Lees
                hem voor, laat iedereen kiezen of reageren, en draai de kaart om
                voor een tip waar het gesprek heen kan. Filter hieronder als je
                een specifiek thema of type wilt.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button onClick={trek} className="btn btn-primary">
                  {drawn ? "Nog een kaart" : "Trek een kaart"}
                </button>
                {drawn && (
                  <>
                    <button
                      onClick={() => setDrawnFlipped((f) => !f)}
                      className="btn btn-ghost"
                    >
                      {drawnFlipped ? "Toon de kaart" : "Voor de begeleider"}
                    </button>
                    <button
                      onClick={() => openPresenteer(drawn)}
                      className="btn btn-ghost"
                    >
                      Presenteer
                    </button>
                    <button
                      onClick={() => kopieer(drawn)}
                      className="btn btn-ghost"
                    >
                      {copied === drawn.id ? "Gekopieerd" : "Kopieer voor LinkedIn"}
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="mx-auto w-full max-w-[280px]">
              {drawn ? (
                <KaartView
                  key={drawTick}
                  kaart={drawn}
                  flipped={drawnFlipped}
                  onFlip={() => setDrawnFlipped((f) => !f)}
                  animate
                />
              ) : (
                <div
                  className="flex items-center justify-center rounded-2xl border-2 border-dashed border-line bg-card text-center text-ink-soft"
                  style={{ aspectRatio: "63 / 88" }}
                >
                  <span className="hand text-2xl">
                    Klik op
                    <br />
                    &quot;Trek een kaart&quot;
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- DECK */}
      <section id="deck" className="mx-auto max-w-6xl scroll-mt-6 px-6 py-10">
        <h2 className="text-3xl font-bold tracking-tight text-ink">
          De hele set
        </h2>
        <p className="mt-2 text-ink-soft">
          Klik op een kaart om de facilitator-note te zien. Filter op thema en
          type. {gefilterd.length} van {kaarten.length} kaarten in beeld.{" "}
          <Link
            href="/kaarten/print"
            className="font-semibold text-accent underline"
          >
            Of print de set thuis (gratis PDF)
          </Link>
          .
        </p>

        {/* filters */}
        <div className="mt-6 space-y-3">
          <div className="flex flex-wrap gap-2">
            {themas.map((t) => {
              const actief = themaFilter.has(t.key);
              return (
                <button
                  key={t.key}
                  onClick={() => setThemaFilter((s) => toggle(s, t.key))}
                  className="inline-flex items-center gap-2 rounded-full border-2 px-3 py-1.5 text-sm font-medium transition"
                  style={{
                    borderColor: actief ? t.kleur : "#e5dccb",
                    background: actief ? t.tint : "#fffdf8",
                    color: actief ? "#2a2a2a" : "#5a5550",
                  }}
                >
                  <span
                    className="h-3 w-3 rounded-full border-[1.5px] border-ink"
                    style={{ background: t.kleur }}
                  />
                  {t.naam}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {typeKeuzes.map((t) => {
              const actief = typeFilter.has(t.key);
              return (
                <button
                  key={t.key}
                  onClick={() => setTypeFilter((s) => toggle(s, t.key))}
                  className={`rounded-full border-2 px-3 py-1.5 text-sm font-medium transition ${
                    actief
                      ? "border-accent bg-accent-soft text-ink"
                      : "border-line bg-card text-ink-soft hover:border-accent"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
            {(themaFilter.size > 0 || typeFilter.size > 0) && (
              <button
                onClick={() => {
                  setThemaFilter(new Set());
                  setTypeFilter(new Set());
                }}
                className="text-sm font-medium text-ink-soft underline hover:text-accent"
              >
                Wis filters
              </button>
            )}
          </div>
        </div>

        {/* grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {gefilterd.map((k) => (
            <div key={k.id} className="group relative">
              <KaartView
                kaart={k}
                flipped={!!flipped[k.id]}
                onFlip={() =>
                  setFlipped((f) => ({ ...f, [k.id]: !f[k.id] }))
                }
              />
              <div className="mt-1.5 flex justify-center gap-3 opacity-0 transition group-hover:opacity-100">
                <button
                  onClick={() => openPresenteer(k)}
                  className="text-xs font-semibold text-ink-soft hover:text-accent"
                >
                  Presenteer
                </button>
                <button
                  onClick={() => kopieer(k)}
                  className="text-xs font-semibold text-ink-soft hover:text-accent"
                >
                  {copied === k.id ? "Gekopieerd" : "Kopieer"}
                </button>
              </div>
            </div>
          ))}
        </div>
        {gefilterd.length === 0 && (
          <p className="mt-8 text-center text-ink-soft">
            Geen kaarten met deze filters. Wis de filters om alles te zien.
          </p>
        )}
      </section>

      {/* --------------------------------------------------- HOE GEBRUIK */}
      <section className="mx-auto max-w-5xl px-6 py-10">
        <h2 className="text-3xl font-bold tracking-tight text-ink">
          Hoe je het gesprek begeleidt
        </h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Je hebt geen AI-expert nodig om dit te leiden, wel een paar simpele
          spelregels. Pak er een handvol kaarten bij, plan 45 tot 90 minuten, en
          gebruik deze werkvormen.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {spelregels.map((s) => (
            <div key={s.titel} className="warm-card p-5">
              <h3 className="hand text-xl font-bold text-accent">{s.titel}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                {s.tekst}
              </p>
            </div>
          ))}
        </div>
        <div className="warm-card mt-4 bg-sage-soft p-5 text-sm text-ink-soft">
          <strong className="text-ink">Een sessie in het kort:</strong> open
          met een open vraag (veilig), ga dan naar een paar stellingen (kies een
          kant van de kamer), en sluit af met een dilemma waar je echt over moet
          beslissen. Niet de kaart is het doel, maar wat er onder tafel
          vandaan komt.
        </div>
      </section>

      {/* -------------------------------------------------------- FYSIEK */}
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="warm-card grid items-center gap-6 p-6 sm:p-10 md:grid-cols-[1fr_auto]">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-accent">
              Binnenkort
            </span>
            <h2 className="hand mt-1 text-3xl font-bold text-ink">
              De fysieke set
            </h2>
            <p className="mt-2 max-w-xl text-ink-soft">
              Een echt kaartspel in een doosje voelt anders dan een scherm: je
              schudt, deelt uit, legt op tafel. Ik maak een verzorgde fysieke
              set in de huisstijl, met de werkvormgids erbij, voor in workshops
              en teamsessies. Wil je weten wanneer hij er is, of er een paar
              voor je team reserveren?
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/kaarten/bestel" className="btn btn-primary">
                Bekijk de set
              </Link>
              <a href="#deck" className="btn btn-ghost">
                Nu al online gebruiken
              </a>
            </div>
          </div>
          <div className="mx-auto w-44">
            <BoxMini />
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- B2B / ACT */}
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="warm-card bg-sage-soft p-6 sm:p-10">
          <h2 className="hand text-3xl font-bold text-ink">
            Van gesprek naar aantoonbare AI-geletterdheid
          </h2>
          <p className="mt-2 max-w-2xl text-ink-soft">
            Deze kaarten zijn de laagdrempelige eerste stap. Sinds de EU
            AI-verordening (artikel 4) moet je iedereen die met AI werkt er
            wegwijs in maken, en vanaf 2 augustus 2026 wordt daarop gehandhaafd.
            Wil je het echt op maat voor jouw organisatie, met jullie eigen
            voorbeelden en beleid? Ik bouw e-learnings en trainingen die blijven
            hangen.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="/academy" className="btn btn-primary">
              Naar de gratis academy
            </a>
            <Link href="/contact" className="btn btn-ghost">
              AI-geletterdheid voor je organisatie
            </Link>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- LEAD */}
      <section className="mx-auto max-w-5xl px-6 py-10 pb-16">
        <KaartenLead />
      </section>

      {/* -------------------------------------------------- PRESENTEER */}
      {presOpen && presKaart && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink/80 px-4 py-6"
          onClick={() => setPresOpen(false)}
        >
          <div
            className="flex w-full max-w-[440px] flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <KaartView
              key={presKaart.id + String(presFlipped)}
              kaart={presKaart}
              flipped={presFlipped}
              onFlip={() => setPresFlipped((f) => !f)}
              variant="groot"
            />
            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={() => {
                  setPresIndex(
                    (i) => (i - 1 + presLijst.length) % presLijst.length,
                  );
                  setPresFlipped(false);
                }}
                className="btn btn-ghost !bg-card"
                aria-label="Vorige kaart"
              >
                &larr;
              </button>
              <button
                onClick={() => setPresFlipped((f) => !f)}
                className="btn btn-primary"
              >
                {presFlipped ? "Toon de kaart" : "Voor de begeleider"}
              </button>
              <button
                onClick={() => {
                  setPresIndex(Math.floor(Math.random() * presLijst.length));
                  setPresFlipped(false);
                }}
                className="btn btn-ghost !bg-card"
              >
                Willekeurig
              </button>
              <button
                onClick={() => {
                  setPresIndex((i) => (i + 1) % presLijst.length);
                  setPresFlipped(false);
                }}
                className="btn btn-ghost !bg-card"
                aria-label="Volgende kaart"
              >
                &rarr;
              </button>
            </div>
            <p className="mt-3 text-center text-sm text-paper/70">
              Kaart {presIndex + 1} van {presLijst.length} &middot; pijltjes =
              bladeren, spatie = omdraaien, R = willekeurig, Esc = sluiten
            </p>
            <button
              onClick={() => setPresOpen(false)}
              className="mt-1 text-sm font-semibold text-paper/80 underline"
            >
              Sluiten
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Klein doosje-mockup in de huisstijl voor de "fysieke set"-sectie.
function BoxMini() {
  return (
    <div
      className="rounded-xl border-2 border-ink bg-paper p-4 text-center"
      style={{ boxShadow: "5px 5px 0 #E5DCCB" }}
    >
      <div className="hand text-lg font-bold leading-tight text-accent">
        AI-gesprekskaarten
      </div>
      <div className="mt-0.5 text-[10px] text-ink-soft">
        Voer het goede gesprek over AI
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        {themas.map((t) => (
          <span
            key={t.key}
            className="h-2.5 w-2.5 rounded-full border border-ink"
            style={{ background: t.kleur }}
          />
        ))}
      </div>
      <div className="hand mt-3 text-sm text-ink">AI met Max</div>
    </div>
  );
}

// E-mailcapture toegespitst op de kaarten.
function KaartenLead() {
  const [status, setStatus] = useState("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return;
    const email = String(data.get("email") || "").trim();
    if (!email) return;
    const fd = new FormData();
    fd.append("fields[email]", email);
    fd.append("fields[leerwens]", "Interesse: AI-gesprekskaarten");
    fd.append("ml-submit", "1");
    fd.append("anticsrf", "true");
    setStatus("Versturen...");
    try {
      const r = await fetch(
        "https://assets.mailerlite.com/jsonp/955238/forms/190102348162401531/subscribe",
        { method: "POST", body: fd },
      );
      setStatus(
        r.ok
          ? "Bijna klaar: check je inbox en bevestig je aanmelding."
          : "Dat ging mis. Probeer het later nog eens, of mail max@aimetmax.nl.",
      );
      if (r.ok) form.reset();
    } catch {
      setStatus("Dat ging mis. Probeer het later nog eens, of mail max@aimetmax.nl.");
    }
  }
  return (
    <div className="warm-card bg-accent-soft p-8">
      <h2 className="hand text-3xl font-bold text-ink">
        Krijg een seintje (en de print-versie)
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-ink-soft">
        Laat je e-mail achter en je hoort het als de fysieke set er is en als er
        nieuwe kaarten bijkomen. Ik stuur hooguit een paar mails per jaar, alleen
        als er echt iets nieuws is.
      </p>
      <form onSubmit={onSubmit} className="mt-5 flex flex-wrap gap-3">
        <input
          type="email"
          name="email"
          required
          placeholder="Je e-mailadres"
          aria-label="Je e-mailadres"
          autoComplete="email"
          className="min-w-[220px] flex-1 rounded-xl border-2 border-ink bg-card px-4 py-3 text-ink outline-none focus:ring-4 focus:ring-hl"
        />
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-px w-px opacity-0"
        />
        <button type="submit" className="btn btn-primary">
          Houd me op de hoogte
        </button>
      </form>
      {status ? (
        <p className="mt-3 text-sm font-semibold text-sage">{status}</p>
      ) : null}
    </div>
  );
}
