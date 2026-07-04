const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "drukwerk", "doosje");
const tmpDir = path.join(root, "tmp", "pdfs");
const edgeCandidates = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];
const edge = edgeCandidates.find((candidate) => fs.existsSync(candidate));
const python =
  process.env.CODEX_PYTHON ||
  "C:\\Users\\maxva\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\python\\python.exe";

if (!edge) throw new Error("Microsoft Edge niet gevonden.");

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(tmpDir, { recursive: true });

const SHEET = { w: 619.3, h: 347.7 };
const DEKSEL = {
  bleed: { x: 308.2, y: 1.0, w: 309.5, h: 345.7 },
  center: { x: 405.7, y: 168.9, w: 115.2, h: 80.6 },
  wallTop: { x: 405.7, y: 125.6, w: 115.2, h: 43.3, r: 180 },
  wallBot: { x: 405.7, y: 249.5, w: 115.2, h: 43.3, r: 0 },
  wallL: { x: 362.3, y: 168.9, w: 43.4, h: 80.6, r: 90 },
  wallR: { x: 520.9, y: 168.9, w: 43.5, h: 80.6, r: -90 },
  flapTop: { x: 405.7, y: 1.0, w: 115.2, h: 124.6 },
  flapBot: { x: 405.7, y: 292.8, w: 115.2, h: 53.9 },
};
const BODEM = {
  bleed: { x: 1.0, y: 1.0, w: 305.5, h: 345.7 },
  center: { x: 96.5, y: 174.4, w: 111.4, h: 77.0 },
  wallTop: { x: 96.5, y: 132.2, w: 111.4, h: 42.2, r: 180 },
  wallBot: { x: 96.5, y: 251.4, w: 111.4, h: 42.3, r: 0 },
  wallL: { x: 54.0, y: 174.4, w: 42.5, h: 77.0, r: 90 },
  wallR: { x: 207.9, y: 174.4, w: 42.6, h: 77.0, r: -90 },
  flapTop: { x: 96.5, y: 1.0, w: 111.4, h: 131.2 },
  flapBot: { x: 96.5, y: 251.4, w: 111.4, h: 90.2 },
};
const COLORS = {
  cream: "#FAF6EE",
  card: "#FFFDF8",
  ink: "#2A2A2A",
  soft: "#5A5550",
  line: "#E5DCCB",
  orange: "#E8590C",
  sage: "#4C8577",
  gold: "#C98A1B",
  teal: "#2F6E78",
  mauve: "#875A6B",
  terracotta: "#B5532E",
  pink: "#FBE3D4",
  sageSoft: "#DCEAE5",
};
const THEMES = [
  COLORS.mauve,
  COLORS.sage,
  COLORS.gold,
  COLORS.teal,
  COLORS.terracotta,
  COLORS.orange,
];

function cleanEnv() {
  const env = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (key.toLowerCase() === "path") continue;
    env[key] = value;
  }
  env.Path = process.env.Path || process.env.PATH || "";
  return env;
}

function toFileUrl(filePath) {
  return `file:///${filePath.replace(/\\/g, "/").replace(/ /g, "%20")}`;
}

function localFontCss() {
  const dirs = [
    path.join(root, ".next", "dev", "static", "chunks"),
    path.join(root, ".next", "static", "chunks"),
  ];
  let css = "";
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith(".css")) continue;
      const body = fs.readFileSync(path.join(dir, file), "utf8");
      if (body.includes("@font-face") && (body.includes("Inter") || body.includes("Shantell Sans"))) {
        css += `\n${body}`;
      }
    }
  }
  return css
    .replaceAll('url("../media/', `url("${toFileUrl(path.join(root, ".next", "dev", "static", "media"))}/`)
    .replaceAll("url('../media/", `url('${toFileUrl(path.join(root, ".next", "dev", "static", "media"))}/`)
    .replaceAll("url(../media/", `url(${toFileUrl(path.join(root, ".next", "dev", "static", "media"))}/`)
    .replaceAll('url("/_next/static/media/', `url("${toFileUrl(path.join(root, ".next", "static", "media"))}/`)
    .replaceAll("url('/_next/static/media/", `url('${toFileUrl(path.join(root, ".next", "static", "media"))}/`)
    .replaceAll("url(/_next/static/media/", `url(${toFileUrl(path.join(root, ".next", "static", "media"))}/`);
}

function getDieline() {
  const file = path.join(root, "tmp", "doosje-input", "doosje-dieline.js");
  if (!fs.existsSync(file)) return null;
  const text = fs.readFileSync(file, "utf8");
  const stans = text.match(/stans:\s*"([^"]+)"/)?.[1];
  const afloop = text.match(/afloop:\s*"([^"]+)"/)?.[1];
  return stans && afloop ? { stans, afloop } : null;
}

function rectStyle(r) {
  return `left:${r.x}mm;top:${r.y}mm;width:${r.w}mm;height:${r.h}mm;`;
}

function rays(cls = "") {
  return `<svg class="rays ${cls}" viewBox="0 0 46 32" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
    <path d="M4 16 H17"/><path d="M9 5 L20 11"/><path d="M9 27 L20 21"/>
  </svg>`;
}

function speechCluster() {
  return `<svg class="cluster" viewBox="0 0 240 175" fill="none" stroke="${COLORS.ink}" stroke-linecap="round" stroke-linejoin="round">
    <g class="sparkles" stroke-width="4">
      <path d="M30 27 l7 7 M37 27 l-7 7" stroke="${COLORS.gold}"/>
      <path d="M204 38 l6 6 M210 38 l-6 6" stroke="${COLORS.orange}"/>
      <circle cx="42" cy="94" r="4" fill="${COLORS.sage}" stroke="none"/>
      <circle cx="190" cy="115" r="4" fill="${COLORS.mauve}" stroke="none"/>
    </g>
    <g stroke-width="4.3">
      <path d="M112 62 L106 88 L132 66 Z" fill="${COLORS.orange}"/>
      <rect x="90" y="23" width="66" height="42" rx="16" fill="${COLORS.orange}"/>
      <path d="M76 92 L64 115 L93 96 Z" fill="${COLORS.mauve}"/>
      <rect x="43" y="55" width="71" height="43" rx="15" fill="${COLORS.mauve}"/>
      <path d="M158 95 L171 116 L141 98 Z" fill="${COLORS.gold}"/>
      <rect x="135" y="57" width="70" height="43" rx="15" fill="${COLORS.gold}"/>
      <path d="M118 132 L110 157 L136 136 Z" fill="${COLORS.teal}"/>
      <rect x="89" y="87" width="78" height="58" rx="19" fill="${COLORS.teal}"/>
    </g>
    <text x="128" y="127" text-anchor="middle" font-family="'Shantell Sans', cursive" font-size="43" font-weight="800" fill="${COLORS.card}" stroke="none">?</text>
  </svg>`;
}

function dots() {
  return `<div class="dots">${THEMES.map((c) => `<i style="background:${c}"></i>`).join("")}</div>`;
}

function frontFace({ quote = false } = {}) {
  return `<div class="portrait-face front-face">
    <div class="inner-border"></div>
    <div class="top-pill">${rays("left")}<span>50+ KAARTEN</span>${rays("right")}</div>
    <div class="front-art">${speechCluster()}</div>
    <h1><span>AI</span>-gespreks<br/>kaarten</h1>
    <svg class="underline" viewBox="0 0 200 18" fill="none"><path d="M8 11 C55 3 145 4 192 10" stroke="${COLORS.orange}" stroke-width="5" stroke-linecap="round"/></svg>
    <p class="tagline">Ontdek hoe jouw team <strong>echt</strong> over AI denkt.</p>
    ${
      quote
        ? `<blockquote class="mini-quote">"Wat een tof initiatief - ik heb met veel plezier de kaarten getrokken!"<cite>Ernst-Jan Pfauth</cite></blockquote>`
        : `<div class="type-row"><span>Stellingen</span><span>Dilemma's</span><span>Open vragen</span></div>`
    }
    <div class="brand">AI met Max</div>
  </div>`;
}

function backFace({ quote = false, compact = false } = {}) {
  return `<div class="portrait-face back-face">
    <div class="inner-border"></div>
    <h2><span>AI</span>-gespreks<br/>kaarten</h2>
    <p class="intro">Voor teams, trainingen en lessen die eerlijk willen praten over AI op het werk.</p>
    <div class="question">
      <div class="label">Voorproefje</div>
      <p>Welke taak zou jij nooit aan AI uitbesteden - en waarom?</p>
      <span>Open vraag · Werk & productiviteit</span>
    </div>
    ${
      quote
        ? `<blockquote class="quote">"Wat een tof initiatief - ik heb met veel plezier de kaarten getrokken!"<cite>Ernst-Jan Pfauth</cite></blockquote>`
        : `<ul class="uses ${compact ? "compact" : ""}">
            <li>Voor teamsessies, workshops en lessen</li>
            <li>3 soorten vragen · 6 thema's</li>
            <li>Geen goed of fout, wel echte gesprekken</li>
          </ul>`
    }
    ${dots()}
    <div class="back-footer"><strong>AI met Max</strong><span>aimetmax.nl/kaarten</span></div>
  </div>`;
}

function wallContent(kind, r, label, mode = "clean") {
  const dark = mode === "sage" || mode === "terracotta";
  const klass = `wall wall-${kind} mode-${mode}`;
  const content =
    label === "dots"
      ? `<div class="wall-dots">${THEMES.map((c) => `<i style="background:${c}"></i>`).join("")}</div>`
      : `<div class="wall-word"><span>AI</span>-gesprekskaarten</div><div class="wall-sub">${label}</div>`;
  return `<div class="${klass}" style="${rectStyle(r)}"><div class="wall-rot" style="transform:rotate(${r.r}deg);color:${dark ? COLORS.card : COLORS.ink}">${content}</div></div>`;
}

function hiddenPattern(r, mode = "clean") {
  const bg =
    mode === "sage"
      ? COLORS.sageSoft
      : mode === "terracotta"
        ? "#F2DBCF"
        : COLORS.cream;
  return `<div class="hidden-pattern mode-${mode}" style="${rectStyle(r)};background:${bg}">
    ${Array.from({ length: 13 }, (_, i) => `<i style="left:${8 + i * 8}%"></i>`).join("")}
  </div>`;
}

function net({ name, variant, proof = false, quoteFront = false, quoteBack = false, mode = "clean" }) {
  const dieline = proof ? getDieline() : null;
  const dekselBg = mode === "sage" ? COLORS.sageSoft : mode === "terracotta" ? "#F2DBCF" : COLORS.cream;
  return `<section class="sheet" data-name="${name}">
    <div class="bleed" style="${rectStyle(BODEM.bleed)}"></div>
    <div class="bleed deksel-bg mode-${mode}" style="${rectStyle(DEKSEL.bleed)};background:${dekselBg}"></div>

    ${hiddenPattern(BODEM.flapTop, "clean")}
    ${hiddenPattern(DEKSEL.flapTop, mode)}

    ${wallContent("bodem", BODEM.wallBot, "Voor teamsessies", "clean")}
    ${wallContent("bodem", BODEM.wallTop, "Voor trainingen", "clean")}
    ${wallContent("bodem", BODEM.wallL, "dots", "clean")}
    ${wallContent("bodem", BODEM.wallR, "dots", "clean")}

    ${wallContent("deksel", DEKSEL.wallBot, "50+ kaarten", mode)}
    ${wallContent("deksel", DEKSEL.wallTop, "aimetmax.nl/kaarten", mode)}
    ${wallContent("deksel", DEKSEL.wallL, "dots", mode)}
    ${wallContent("deksel", DEKSEL.wallR, "dots", mode)}

    <div class="center" style="${rectStyle(DEKSEL.center)}"><div class="rotate-portrait">${frontFace({ quote: quoteFront })}</div></div>
    <div class="center" style="${rectStyle(BODEM.center)}"><div class="rotate-portrait">${backFace({ quote: quoteBack, compact: quoteBack })}</div></div>

    <div class="variant-label">${variant}</div>
    ${
      dieline
        ? `<svg class="dieline" viewBox="0 0 ${SHEET.w} ${SHEET.h}" fill="none" vector-effect="non-scaling-stroke">
            <path d="${dieline.afloop}" stroke="rgb(0,171,79)" stroke-width="0.45"/>
            <path d="${dieline.stans}" stroke="rgb(232,0,140)" stroke-width="0.45"/>
          </svg>`
        : ""
    }
  </section>`;
}

function colorOptions() {
  const options = [
    ["01 Clean cream", COLORS.cream, [COLORS.orange], "Dubbele rand + thema-dots"],
    ["02 Warm edge", COLORS.cream, [COLORS.orange, COLORS.gold], "Oranje/goud accentstroken"],
    ["03 Sage premium", COLORS.sageSoft, [COLORS.sage], "Zachte groene sleeve"],
    ["04 Terracotta", "#F2DBCF", [COLORS.terracotta], "Warmer, steviger pakje"],
    ["05 Mauve", "#ECDCE2", [COLORS.mauve], "Menselijker en zachter"],
    ["06 Teal", "#D5E6E6", [COLORS.teal], "Zakelijker, stiller"],
    ["07 Theme tabs", COLORS.cream, THEMES, "Alle thema's als tabs"],
    ["08 Black line", COLORS.cream, [COLORS.ink], "Luxe door lijnwerk"],
    ["09 Split sage/orange", COLORS.cream, [COLORS.sage, COLORS.orange], "Twee hoofdkleuren"],
    ["10 Confetti", COLORS.cream, THEMES, "Meest speels, weinig vlak"],
  ];
  return `<section class="option-page">
    <h1>10 kleurrichtingen zonder gradient</h1>
    <p>Alle opties blijven bij de kaartkleuren. Mijn voorkeur is 01 of 03: genoeg luxe door rand, witruimte en kleine kleuraccenten, zonder stijlbreuk.</p>
    <div class="option-grid">
      ${options
        .map(([title, bg, cols, note]) => {
          const stripes = cols.map((c) => `<i style="background:${c}"></i>`).join("");
          return `<article>
            <div class="mini-box" style="background:${bg}">
              <div class="mini-face"><span>AI</span><b>gesprekskaarten</b>${rays()}</div>
              <div class="mini-side">${stripes}</div>
            </div>
            <h2>${title}</h2><p>${note}</p>
          </article>`;
        })
        .join("")}
    </div>
  </section>`;
}

function html(body, title) {
  return `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title>
  <style>
    ${localFontCss()}
    @page { size: ${SHEET.w}mm ${SHEET.h}mm; margin: 0; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    html, body { margin:0; padding:0; background:#fff; font-family:"Inter","Inter Fallback",Arial,sans-serif; color:${COLORS.ink}; }
    .sheet { position:relative; width:${SHEET.w}mm; height:${SHEET.h}mm; overflow:hidden; background:#fff; page-break-after:always; }
    .sheet:last-child { page-break-after:auto; }
    .bleed { position:absolute; background:${COLORS.cream}; overflow:hidden; }
    .bleed::after, .hidden-pattern::after { content:""; position:absolute; inset:3mm; border:0.35mm solid ${COLORS.line}; border-radius:5mm; }
    .deksel-bg.mode-sage::after { border-color:${COLORS.sage}; }
    .deksel-bg.mode-terracotta::after { border-color:${COLORS.terracotta}; }
    .hidden-pattern { position:absolute; overflow:hidden; opacity:.95; }
    .hidden-pattern i { position:absolute; top:8%; width:.5mm; height:84%; background:rgba(42,42,42,.08); transform:rotate(12deg); }
    .wall { position:absolute; overflow:hidden; background:${COLORS.cream}; border:0.25mm solid rgba(42,42,42,.08); }
    .wall-deksel.mode-clean { background:${COLORS.cream}; }
    .wall-deksel.mode-sage { background:${COLORS.sage}; }
    .wall-deksel.mode-terracotta { background:${COLORS.terracotta}; }
    .wall-bodem { background:${COLORS.cream}; }
    .wall-rot { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:1.8mm; transform-origin:center; }
    .wall-word { font-family:"Shantell Sans","Shantell Sans Fallback",cursive; font-weight:800; font-size:5.1mm; line-height:1; white-space:nowrap; }
    .wall-word span { color:${COLORS.orange}; }
    .wall-sub { font-weight:800; text-transform:uppercase; letter-spacing:.18em; font-size:2.3mm; color:currentColor; opacity:.78; white-space:nowrap; }
    .wall-dots { display:flex; gap:2.1mm; align-items:center; justify-content:center; }
    .wall-dots i { width:4.1mm; height:4.1mm; border-radius:999px; display:block; border:.28mm solid rgba(255,255,255,.45); }
    .center { position:absolute; overflow:visible; display:flex; align-items:center; justify-content:center; }
    .rotate-portrait { width:74mm; height:109mm; transform:rotate(90deg); transform-origin:center; }
    .portrait-face { position:relative; width:74mm; height:109mm; background:${COLORS.card}; border:.6mm solid ${COLORS.ink}; border-radius:7mm; overflow:hidden; padding:6mm; display:flex; flex-direction:column; align-items:center; text-align:center; }
    .inner-border { position:absolute; inset:2.5mm; border:.3mm solid ${COLORS.orange}; border-radius:5.8mm; pointer-events:none; }
    .top-pill { position:relative; z-index:1; display:flex; align-items:center; justify-content:center; gap:2mm; color:${COLORS.orange}; font-weight:900; letter-spacing:.18em; font-size:3.1mm; }
    .top-pill span { border:.35mm solid ${COLORS.orange}; border-radius:999px; padding:1mm 3.1mm; background:${COLORS.card}; }
    .rays { width:11mm; height:8mm; color:${COLORS.orange}; }
    .rays.left { transform:scaleX(-1); }
    .front-art { width:48mm; height:35mm; margin:3.5mm 0 1mm; position:relative; z-index:1; }
    .cluster { width:100%; height:100%; }
    h1, h2 { position:relative; z-index:1; margin:0; font-family:"Shantell Sans","Shantell Sans Fallback",cursive; font-weight:800; line-height:.98; }
    h1 { font-size:8.4mm; }
    h2 { font-size:7.6mm; margin-top:1mm; }
    h1 span, h2 span, .tagline strong, .brand, .back-footer strong, .mini-quote cite, .quote cite { color:${COLORS.orange}; }
    .underline { width:40mm; height:3mm; margin:.4mm 0 1.6mm; }
    .tagline { margin:0; color:${COLORS.soft}; font-weight:700; font-size:4.1mm; line-height:1.25; max-width:56mm; }
    .type-row { display:grid; grid-template-columns:repeat(3,1fr); gap:2mm; width:100%; margin-top:auto; padding:3mm 1mm 2mm; border-top:.35mm solid ${COLORS.line}; font-size:2.6mm; font-weight:900; text-transform:uppercase; letter-spacing:.08em; color:${COLORS.orange}; }
    .brand { margin-top:2.8mm; font-family:"Shantell Sans","Shantell Sans Fallback",cursive; font-weight:800; font-size:5.4mm; }
    .mini-quote, .quote { position:relative; z-index:1; margin:auto 0 0; color:${COLORS.ink}; border-top:.35mm solid ${COLORS.line}; padding-top:3mm; font-weight:700; font-size:3.35mm; line-height:1.28; }
    .mini-quote cite, .quote cite { display:block; margin-top:1.3mm; font-style:normal; font-family:"Shantell Sans","Shantell Sans Fallback",cursive; font-size:3.4mm; }
    .back-face { align-items:flex-start; text-align:left; padding:6.2mm 6.4mm; }
    .back-face .inner-border { border-color:${COLORS.sage}; }
    .intro { position:relative; z-index:1; font-weight:750; color:${COLORS.soft}; font-size:3.25mm; line-height:1.32; margin:2.5mm 0 3.2mm; }
    .question { position:relative; z-index:1; background:#fffaf2; border:.45mm solid ${COLORS.ink}; border-radius:4mm; padding:3.2mm; width:100%; }
    .question .label { color:${COLORS.orange}; font-size:2.1mm; font-weight:900; letter-spacing:.16em; text-transform:uppercase; margin-bottom:1mm; }
    .question p { margin:0; font-family:"Shantell Sans","Shantell Sans Fallback",cursive; font-size:4.15mm; line-height:1.15; font-weight:800; }
    .question span { display:block; margin-top:2mm; color:${COLORS.soft}; font-weight:900; font-size:2.15mm; text-transform:uppercase; letter-spacing:.08em; }
    .uses { position:relative; z-index:1; margin:3.5mm 0 0; padding:0; list-style:none; display:grid; gap:1.8mm; font-size:2.9mm; line-height:1.25; font-weight:750; color:${COLORS.ink}; }
    .uses.compact { font-size:2.55mm; gap:1mm; }
    .uses li::before { content:""; width:1.9mm; height:1.9mm; border-radius:999px; background:${COLORS.orange}; display:inline-block; margin-right:1.6mm; transform:translateY(-.2mm); }
    .dots { position:relative; z-index:1; display:flex; gap:2.4mm; justify-content:center; width:100%; margin:auto 0 3mm; }
    .dots i { width:4mm; height:4mm; border-radius:999px; display:block; }
    .back-footer { position:relative; z-index:1; width:100%; border-top:.35mm solid ${COLORS.line}; padding-top:2.4mm; display:flex; justify-content:space-between; align-items:flex-end; font-size:2.5mm; color:${COLORS.soft}; }
    .back-footer strong { font-family:"Shantell Sans","Shantell Sans Fallback",cursive; font-size:4.2mm; }
    .quote { font-size:3mm; margin-top:3mm; padding-top:2.3mm; }
    .variant-label { position:absolute; left:306mm; bottom:5mm; transform:translateX(-50%); color:#9a9286; font-size:3mm; letter-spacing:.08em; text-transform:uppercase; }
    .dieline { position:absolute; inset:0; width:100%; height:100%; pointer-events:none; }
    .option-page { width:${SHEET.w}mm; height:${SHEET.h}mm; padding:18mm 22mm; page-break-after:always; background:${COLORS.cream}; }
    .option-page h1 { font-family:"Shantell Sans","Shantell Sans Fallback",cursive; color:${COLORS.orange}; font-size:16mm; margin:0 0 3mm; }
    .option-page > p { font-weight:750; color:${COLORS.soft}; font-size:5mm; max-width:280mm; margin:0 0 12mm; line-height:1.35; }
    .option-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:9mm; }
    .option-grid article { background:${COLORS.card}; border:.45mm solid ${COLORS.ink}; border-radius:5mm; padding:6mm; min-height:102mm; }
    .mini-box { height:56mm; border:.45mm solid ${COLORS.ink}; border-radius:4mm; position:relative; overflow:hidden; }
    .mini-face { position:absolute; inset:6mm 8mm 10mm; border:.25mm solid ${COLORS.orange}; border-radius:3mm; display:flex; flex-direction:column; align-items:center; justify-content:center; font-family:"Shantell Sans","Shantell Sans Fallback",cursive; font-size:6mm; line-height:.95; }
    .mini-face span { color:${COLORS.orange}; }
    .mini-face b { font-weight:800; }
    .mini-face .rays { width:13mm; margin-top:2mm; }
    .mini-side { position:absolute; left:0; right:0; bottom:0; height:7mm; display:flex; }
    .mini-side i { flex:1; display:block; }
    .option-grid h2 { font-family:"Shantell Sans","Shantell Sans Fallback",cursive; font-size:6.2mm; margin:4mm 0 1mm; }
    .option-grid p { margin:0; color:${COLORS.soft}; font-weight:700; font-size:3.5mm; line-height:1.25; }
  </style></head><body>${body}</body></html>`;
}

function renderPdf(name, body, title) {
  const htmlPath = path.join(tmpDir, `${name}.html`);
  const pdfPath = path.join(outDir, `${name}.pdf`);
  const profile = path.join(tmpDir, `edge-${name}-${Date.now()}`);
  fs.writeFileSync(htmlPath, html(body, title), "utf8");
  fs.rmSync(pdfPath, { force: true });
  const args = [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--disable-background-networking",
    "--disable-component-update",
    "--disable-sync",
    "--metrics-recording-only",
    "--disable-default-apps",
    "--no-first-run",
    "--no-default-browser-check",
    `--user-data-dir=${profile}`,
    "--run-all-compositor-stages-before-draw",
    "--virtual-time-budget=5000",
    "--no-pdf-header-footer",
    `--print-to-pdf=${pdfPath}`,
    toFileUrl(htmlPath),
  ];
  const result = cp.spawnSync(edge, args, { stdio: "inherit", env: cleanEnv(), timeout: 60000 });
  try {
    fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 250 });
  } catch {}
  if (result.status !== 0 || !fs.existsSync(pdfPath)) throw new Error(`PDF export mislukt: ${pdfPath}`);
  fixPdfBoxes(pdfPath);
  console.log(`OK: ${pdfPath}`);
  return pdfPath;
}

function fixPdfBoxes(pdfPath) {
  const tmpPath = `${pdfPath}.boxes.tmp`;
  fs.rmSync(tmpPath, { force: true });
  const code = `
import sys
from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject
path, tmp = sys.argv[1], sys.argv[2]
media = RectangleObject([0, 0, 1755.62, 985.55])
trim = RectangleObject([17.01, 17.01, 1738.62, 968.54])
reader = PdfReader(path)
writer = PdfWriter()
for page in reader.pages:
    page.mediabox = media
    page.cropbox = media
    page.bleedbox = media
    page.trimbox = trim
    page.artbox = trim
    writer.add_page(page)
with open(tmp, "wb") as f:
    writer.write(f)
`;
  const result = cp.spawnSync(python, ["-c", code, pdfPath, tmpPath], { stdio: "inherit", env: cleanEnv() });
  if (result.status !== 0) throw new Error(`PDF-boxes zetten mislukt: ${pdfPath}`);
  fs.rmSync(pdfPath, { force: true });
  fs.renameSync(tmpPath, pdfPath);
}

function main() {
  const recommended = net({
    name: "aanrader",
    variant: "A - cream luxe, staand artwork",
    proof: false,
    mode: "clean",
  });
  renderPdf("doosje-aanrader-drukklaar", recommended, "Doosje aanrader drukklaar");
  renderPdf(
    "doosje-aanrader-met-stanslijnen",
    net({ name: "aanrader-proof", variant: "A - proof met stanslijnen", proof: true, mode: "clean" }),
    "Doosje aanrader proof",
  );
  renderPdf(
    "doosje-concepten-met-stanslijnen",
    [
      net({ name: "a", variant: "A - cream luxe", proof: true, mode: "clean" }),
      net({ name: "b", variant: "B - sage premium", proof: true, mode: "sage" }),
      net({ name: "c", variant: "C - citaat op voorkant", proof: true, mode: "clean", quoteFront: true }),
      net({ name: "d", variant: "D - citaat op achterkant", proof: true, mode: "clean", quoteBack: true }),
    ].join(""),
    "Doosje concepten met stanslijnen",
  );
  renderPdf(
    "doosje-citaat-op-voorkant-drukklaar",
    net({ name: "quote-front", variant: "C - citaat op voorkant", proof: false, mode: "clean", quoteFront: true }),
    "Doosje citaat op voorkant drukklaar",
  );
  renderPdf(
    "doosje-citaat-op-achterkant-drukklaar",
    net({ name: "quote-back", variant: "D - citaat op achterkant", proof: false, mode: "clean", quoteBack: true }),
    "Doosje citaat op achterkant drukklaar",
  );
  renderPdf("doosje-kleuropties", colorOptions(), "Doosje kleuropties");
}

main();
