const fs = require("fs");
const path = require("path");
const vm = require("vm");
const cp = require("child_process");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "drukwerk");
const tmpDir = path.join(root, "tmp", "pdfs");
const dataFile = path.join(root, "src", "app", "kaarten", "kaarten-data.ts");
const edgeCandidates = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];
const edge = edgeCandidates.find((candidate) => fs.existsSync(candidate));
const python = process.env.CODEX_PYTHON ||
  "C:\\Users\\maxva\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\python\\python.exe";
const JOKER_COUNT = 10;
const JOKER_COLOR = "#C43F78";
const JOKER_TINT = "#F6DDE7";

if (!edge) {
  throw new Error("Microsoft Edge niet gevonden; nodig voor vector-PDF export.");
}

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(tmpDir, { recursive: true });

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

function loadData() {
  const source = fs.readFileSync(dataFile, "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const sandbox = { exports: {}, module: { exports: {} } };
  sandbox.module.exports = sandbox.exports;
  vm.runInNewContext(compiled, sandbox, { filename: dataFile });
  return sandbox.module.exports;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function fontCss() {
  const chunks = [
    path.join(root, ".next", "dev", "static", "chunks"),
    path.join(root, ".next", "static", "chunks"),
  ];
  const cssFiles = [];
  for (const dir of chunks) {
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (
        file.endsWith(".css") &&
        (file.includes("inter") ||
          file.includes("shantell") ||
          file.includes("[root-of-the-server]") ||
          file.match(/^[a-f0-9]+\.css$/))
      ) {
        cssFiles.push(path.join(dir, file));
      }
    }
  }

  const fontRules = cssFiles
    .map((file) => fs.readFileSync(file, "utf8"))
    .filter((css) => css.includes("@font-face") && (css.includes("Inter") || css.includes("Shantell Sans")))
    .join("\n")
    .replaceAll('url("../media/', `url("${toFileUrl(path.join(root, ".next", "dev", "static", "media"))}/`)
    .replaceAll("url('../media/", `url('${toFileUrl(path.join(root, ".next", "dev", "static", "media"))}/`)
    .replaceAll("url(../media/", `url(${toFileUrl(path.join(root, ".next", "dev", "static", "media"))}/`)
    .replaceAll('url("/_next/static/media/', `url("${toFileUrl(path.join(root, ".next", "static", "media"))}/`)
    .replaceAll("url('/_next/static/media/", `url('${toFileUrl(path.join(root, ".next", "static", "media"))}/`)
    .replaceAll("url(/_next/static/media/", `url(${toFileUrl(path.join(root, ".next", "static", "media"))}/`);

  if (fontRules.includes("Shantell Sans") && fontRules.includes("Inter")) {
    return fontRules;
  }

  return `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Shantell+Sans:wght@500;700;800&display=swap');
  `;
}

function iconSvg(thema, kleur) {
  const common = `viewBox="0 0 32 32" fill="none" stroke="${kleur}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"`;
  const paths = {
    eerlijk: `<path d="M3 16 Q16 7 29 16 Q16 25 3 16 Z"/><circle cx="16" cy="16" r="3.6"/>`,
    werk: `<path d="M18 3 L8 18 L15 18 L13 29 L24 12 L17 12 Z"/>`,
    leren: `<path d="M16 30 L16 15"/><path d="M16 17 C9 16 7 11 7 6 C12 6 16 10 16 16"/><path d="M16 15 C23 14 25 9 25 5 C20 5 16 9 16 14"/>`,
    vertrouwen: `<circle cx="14" cy="14" r="9"/><path d="M20.5 20.5 L28 28"/>`,
    koers: `<circle cx="16" cy="16" r="12"/><path d="M16 16 L21 9 L16 16 L12 23 Z"/><circle cx="16" cy="16" r="1.4" fill="${kleur}" stroke="none"/>`,
    mens: `<circle cx="12.5" cy="12" r="6.3"/><path d="M3.5 28 Q3.5 19 12.5 19 Q17 19 19.5 21.5"/><path d="M25 23.4 C21 20.6 21.6 17 25 18.5 C28.4 17 29 20.6 25 23.4 Z"/>`,
  };
  return `<svg class="theme-icon" ${common}>${paths[thema]}</svg>`;
}

function textClass(text) {
  const length = text.length;
  if (length > 320) return "text-xxxs";
  if (length > 260) return "text-xxs";
  if (length > 210) return "text-xs";
  if (length > 185) return "text-sm";
  if (length > 155) return "text-md";
  if (length > 125) return "text-lg";
  return "text-xl";
}

function frontCard(k, themaMap, typeLabel) {
  const thema = themaMap[k.thema];
  return `
    <section class="page" style="--theme:${thema.kleur};--tint:${thema.tint}">
      <article class="card">
        <div class="accent-frame"></div>
        <div class="card-content">
          <header class="top">
            ${iconSvg(k.thema, thema.kleur)}
            <span class="number hand">${String(k.nr).padStart(2, "0")}</span>
          </header>
          <h1 class="theme hand">${escapeHtml(thema.naam)}</h1>
          <div class="badge">${escapeHtml(typeLabel[k.type])}</div>
          <p class="statement ${textClass(k.tekst)}">${escapeHtml(k.tekst)}</p>
          <footer class="footer">
            <span class="brand hand">AI met Max</span>
            <span class="url">aimetmax.nl/kaarten</span>
          </footer>
        </div>
      </article>
    </section>`;
}

function jokerCard(index) {
  const number = 55 + index;
  return `
    <section class="page" style="--theme:${JOKER_COLOR};--tint:${JOKER_TINT}">
      <article class="card">
        <div class="accent-frame"></div>
        <div class="card-content joker-content">
          <header class="top">
            <svg class="theme-icon" viewBox="0 0 32 32" fill="none" stroke="${JOKER_COLOR}" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 25.5 l2.2 -7.2 L22.4 4.1 a2.8 2.8 0 0 1 4 4 L12.2 22.3 Z"/>
              <path d="M19.6 6.9 l5.3 5.3 M8.2 18.3 l4 4"/>
            </svg>
            <span class="number hand">${String(number).padStart(2, "0")}</span>
          </header>
          <h1 class="theme hand">Joker</h1>
          <div class="badge joker-types">Stelling / Dilemma / Open vraag</div>
          <p class="joker-prompt hand">Schrijf hier je eigen stelling of vraag.</p>
          <div class="joker-space" aria-hidden="true"></div>
          <footer class="footer">
            <span class="brand hand">AI met Max</span>
            <span class="url">aimetmax.nl/kaarten</span>
          </footer>
        </div>
      </article>
    </section>`;
}

function ruleCard(rule, index) {
  const colors = ["#875A6B", "#4C8577", "#C98A1B", "#2F6E78", "#B5532E", "#E8590C"];
  const color = colors[index % colors.length];
  return `
    <section class="page" style="--theme:${color};--tint:#FBE3D4">
      <article class="card">
        <div class="accent-frame"></div>
        <div class="card-content rule-content">
          <header class="top">
            <svg class="theme-icon" viewBox="0 0 32 32" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 8 l3 3 l5 -6"/><path d="M18 9 H27"/><path d="M7 16 l3 3 l5 -6"/><path d="M18 17 H27"/><path d="M7 24 l3 3 l5 -6"/><path d="M18 25 H27"/>
            </svg>
            <span class="number hand">${String(55 + index).padStart(2, "0")}</span>
          </header>
          <h1 class="theme hand">Spelregel</h1>
          <div class="badge">Werkvorm</div>
          <h2 class="rule-title hand">${escapeHtml(rule.titel)}</h2>
          <p class="rule-text">${escapeHtml(rule.tekst)}</p>
          <footer class="footer">
            <span class="brand hand">AI met Max</span>
            <span class="url">aimetmax.nl/kaarten</span>
          </footer>
        </div>
      </article>
    </section>`;
}

function legacyBackCard() {
  return `
    <section class="page" style="--theme:#E8590C;--tint:#FBE3D4">
      <article class="card back-card">
        <div class="accent-frame"></div>
        <div class="card-content back-content">
          <div class="bubble-cloud" aria-hidden="true">
            <span class="bubble b1">?</span>
            <span class="bubble b2"></span>
            <span class="bubble b3"></span>
            <span class="bubble b4"></span>
            <span class="spark s1"></span>
            <span class="spark s2"></span>
            <span class="spark s3"></span>
          </div>
          <h1 class="back-title hand"><span>AI</span>-gespreks<br>kaarten</h1>
          <p class="back-subtitle">Ontdek hoe jouw team <strong>echt</strong> over AI denkt.</p>
          <div class="back-rule"></div>
          <p class="back-meta">54 gesprekskaarten</p>
          <p class="back-types">stellingen · dilemma's · open vragen · 6 thema's</p>
          <div class="theme-dots">
            <i style="background:#875A6B"></i><i style="background:#4C8577"></i><i style="background:#C98A1B"></i>
            <i style="background:#2F6E78"></i><i style="background:#B5532E"></i><i style="background:#E8590C"></i>
          </div>
          <footer class="back-footer">
            <div class="back-brand hand">AI met Max</div>
            <div class="url">aimetmax.nl/kaarten</div>
          </footer>
        </div>
      </article>
    </section>`;
}

function backIcon(thema, kleur, x, y) {
  return iconSvg(thema, kleur)
    .replace("theme-icon", "back-mini-icon")
    .replace('viewBox="0 0 32 32"', `x="${x}" y="${y}" width="20" height="20" viewBox="0 0 32 32"`);
}

function backCard() {
  return `
    <section class="page back-page cream-back" style="--theme:#E8590C;--tint:#FBE3D4">
      <div class="cream-pattern" aria-hidden="true"></div>
      <div class="cream-frame cream-frame-outer" aria-hidden="true"></div>
      <div class="cream-frame cream-frame-inner" aria-hidden="true"></div>
      <div class="cream-corners" aria-hidden="true">
        <i></i><i></i><i></i><i></i>
      </div>
      <div class="cream-mark" aria-hidden="true">
        <div class="cream-dot-grid">
          <i style="background:#875A6B"></i><i style="background:#4C8577"></i><i style="background:#C98A1B"></i>
          <i style="background:#2F6E78"></i><i style="background:#B5532E"></i><i style="background:#E8590C"></i>
        </div>
      </div>
    </section>`;
}

function cropMarks() {
  const lines = [
    "M6 6 h-3.5 M6 6 v-3.5",
    "M80 6 h3.5 M80 6 v-3.5",
    "M6 115 h-3.5 M6 115 v3.5",
    "M80 115 h3.5 M80 115 v3.5",
  ];
  return `<svg class="guides" width="86mm" height="121mm" viewBox="0 0 86 121">
    <rect x="0" y="0" width="86" height="121" fill="none" stroke="#1f9d55" stroke-width="0.18" stroke-dasharray="0.8 0.8"/>
    <rect x="6" y="6" width="74" height="109" fill="none" stroke="#E8009E" stroke-width="0.22"/>
    <rect x="10" y="10" width="66" height="101" fill="none" stroke="#0094D6" stroke-width="0.18" stroke-dasharray="1 1"/>
    <path d="${lines.join(" ")}" stroke="#2A2A2A" stroke-width="0.18" fill="none"/>
    <text x="43" y="4.2" text-anchor="middle" font-family="Inter, sans-serif" font-size="1.7" fill="#E8009E">afloop 86 x 121 mm - trim 74 x 109 mm</text>
  </svg>`;
}

function stansMarks() {
  const lines = [
    "M6 6 h-3.5 M6 6 v-3.5",
    "M80 6 h3.5 M80 6 v-3.5",
    "M6 115 h-3.5 M6 115 v3.5",
    "M80 115 h3.5 M80 115 v3.5",
  ];
  return `<svg class="guides" width="86mm" height="121mm" viewBox="0 0 86 121">
    <rect x="0.1" y="0.1" width="85.8" height="120.8" fill="none" stroke="#1F9D55" stroke-width="0.18" stroke-dasharray="0.8 0.8"/>
    <rect x="6" y="6" width="74" height="109" rx="5" ry="5" fill="none" stroke="#E8009E" stroke-width="0.22"/>
    <path d="${lines.join(" ")}" stroke="#2A2A2A" stroke-width="0.18" fill="none"/>
    <text x="43" y="4.2" text-anchor="middle" font-family="Inter, sans-serif" font-size="1.7" fill="#E8009E">stans 74 x 109 mm - afloop 86 x 121 mm</text>
  </svg>`;
}

function html(pages, guideMode = false, variant = "framed") {
  const guide = guideMode === "stans" ? stansMarks() : guideMode ? cropMarks() : "";
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${fontCss()}
    @page { size: 86mm 121mm; margin: 0; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    html, body { margin: 0; padding: 0; background: #FAF6EE; }
    body { font-family: "Inter", "Inter Fallback", Arial, sans-serif; color: #2A2A2A; }
    .hand { font-family: "Shantell Sans", "Shantell Sans Fallback", cursive; font-weight: 800; }
    .page { position: relative; width: 86mm; height: 121mm; overflow: hidden; page-break-after: always; background: #FAF6EE; }
    .page:last-child { page-break-after: auto; }
    .card {
      position: absolute; left: 10mm; top: 10mm; width: 66mm; height: 101mm;
      border: 1.4pt solid #2A2A2A; border-radius: 7mm; background: #FFFDF8;
      overflow: hidden;
    }
    .accent-frame {
      position: absolute; inset: 1.7mm; border: 0.7pt solid var(--theme);
      border-radius: 5.6mm; pointer-events: none;
    }
    body.borderless .page { background: #FFFDF8; }
    body.borderless .card {
      left: 6mm; top: 6mm; width: 74mm; height: 109mm;
      border: 0; border-radius: 0; background: transparent;
    }
    body.borderless .accent-frame { display: none; }
    body.borderless .card-content { padding: 5.5mm 5.5mm 4.8mm; }
    body.borderless .statement { padding-top: 3mm; padding-bottom: 3mm; }
    body.borderless .text-xl { font-size: 14pt; }
    body.borderless .text-lg { font-size: 13pt; }
    body.borderless .text-md { font-size: 12pt; }
    body.borderless .text-sm { font-size: 11pt; }
    body.borderless .text-xs { font-size: 10.2pt; }
    body.borderless .text-xxs { font-size: 9.3pt; }
    body.borderless .text-xxxs { font-size: 8.6pt; }
    .card-content { position: absolute; inset: 0; padding: 6mm 6.4mm 5mm; display: flex; flex-direction: column; }
    .top { display: flex; align-items: flex-start; justify-content: space-between; }
    .theme-icon { width: 9mm; height: 9mm; }
    .number { color: #B3ADA1; font-size: 13pt; line-height: 1; }
    .theme { margin: 1mm 0 0; color: var(--theme); font-size: 14pt; line-height: 1.05; }
    .badge {
      align-self: flex-start; margin-top: 2.4mm; border: 0.8pt solid var(--theme);
      color: var(--theme); border-radius: 999px; padding: 1mm 3mm;
      font-size: 7pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.13em;
    }
    .statement {
      flex: 1; display: flex; align-items: center; margin: 0; padding: 4mm 0;
      font-family: "Shantell Sans", "Shantell Sans Fallback", cursive;
      min-height: 0; font-weight: 500; line-height: 1.3; letter-spacing: -0.012em; overflow-wrap: break-word;
    }
    .joker-types {
      font-size: 5.7pt; letter-spacing: 0.08em; padding-left: 2.2mm; padding-right: 2.2mm;
      white-space: nowrap;
    }
    .joker-prompt {
      margin: 6mm 0 0; color: #8F887E; font-size: 9pt; font-weight: 500;
      line-height: 1.35; max-width: 44mm;
    }
    .joker-space { flex: 1; min-height: 0; }
    .text-xl { font-size: 12.2pt; }
    .text-lg { font-size: 11.3pt; }
    .text-md { font-size: 10.5pt; line-height: 1.27; }
    .text-sm { font-size: 9.7pt; line-height: 1.24; }
    .text-xs { font-size: 8.9pt; line-height: 1.22; }
    .text-xxs { font-size: 8.1pt; line-height: 1.19; padding-top: 2mm; padding-bottom: 2mm; }
    .text-xxxs { font-size: 7.4pt; line-height: 1.16; padding-top: 1.5mm; padding-bottom: 1.5mm; }
    .footer {
      display: flex; align-items: center; justify-content: space-between;
      border-top: 0.7pt solid #E5DCCB; padding-top: 2mm; gap: 2mm;
    }
    .brand { font-size: 10.5pt; white-space: nowrap; }
    .url { color: #5A5550; font-size: 6.5pt; letter-spacing: 0.02em; white-space: nowrap; }
    .rule-title { color: #2A2A2A; font-size: 14.2pt; line-height: 1.05; margin: 5mm 0 3mm; }
    .rule-text { flex: 1; margin: 0; font-size: 8.8pt; line-height: 1.25; font-weight: 500; }
    .back-page { background: #FFFDF8; color: #2A2A2A; }
    .cream-back { overflow: hidden; }
    .cream-pattern {
      position: absolute; inset: -1mm;
      background-image:
        radial-gradient(rgba(232,89,12,.18) .2mm, transparent .22mm),
        radial-gradient(rgba(42,42,42,.045) .16mm, transparent .18mm);
      background-position: 0 0, 2.3mm 2.3mm;
      background-size: 4.6mm 4.6mm, 9.2mm 9.2mm;
    }
    .cream-frame {
      position: absolute; border-style: solid; border-color: rgba(232,89,12,.72);
      border-radius: 4mm; pointer-events: none;
    }
    .cream-frame-outer { inset: 10mm; border-width: .34mm; opacity: .72; }
    .cream-frame-inner { inset: 13mm; border-width: .2mm; opacity: .34; }
    .cream-corners i {
      position: absolute; width: 9mm; height: 9mm; border-color: #E8590C; opacity: .5;
    }
    .cream-corners i:nth-child(1) { left: 11.6mm; top: 11.6mm; border-top: .38mm solid #E8590C; border-left: .38mm solid #E8590C; }
    .cream-corners i:nth-child(2) { right: 11.6mm; top: 11.6mm; border-top: .38mm solid #E8590C; border-right: .38mm solid #E8590C; }
    .cream-corners i:nth-child(3) { left: 11.6mm; bottom: 11.6mm; border-bottom: .38mm solid #E8590C; border-left: .38mm solid #E8590C; }
    .cream-corners i:nth-child(4) { right: 11.6mm; bottom: 11.6mm; border-bottom: .38mm solid #E8590C; border-right: .38mm solid #E8590C; }
    .cream-mark {
      position: absolute; left: 50%; top: 50%; width: 30mm; height: 30mm;
      transform: translate(-50%, -50%); display: grid; place-items: center;
      border: .5mm solid #E8590C; border-radius: 999px;
      background: #FBE3D4; box-shadow: 0 .85mm 0 #E5DCCB;
    }
    .cream-mark::after {
      content: ""; position: absolute; inset: 2.2mm; border: .18mm solid rgba(42,42,42,.24);
      border-radius: 999px;
    }
    .cream-dot-grid {
      width: 16.2mm; display: grid; grid-template-columns: repeat(3, 4mm);
      gap: 2.1mm; transform: rotate(45deg);
    }
    .cream-dot-grid i {
      width: 4mm; height: 4mm; border-radius: 999px; display: block;
      border: .28mm solid #FFFDF8;
      box-shadow: 0 .35mm 0 rgba(42,42,42,.12);
    }
    .back-pattern {
      position: absolute; inset: 0; background-image: radial-gradient(rgba(42,42,42,.18) .32mm, transparent .34mm);
      background-size: 2.4mm 2.4mm; opacity: .42;
    }
    .back-side-label {
      position: absolute; left: 0; right: 0; text-align: center; z-index: 1;
      color: #FFFDF8; font-size: 10.4pt; line-height: 1; text-shadow: 0 .2mm 0 rgba(42,42,42,.08);
    }
    .back-side-label span { color: #FFE8A3; }
    .back-side-label-top { top: 13.5mm; }
    .back-side-label-bottom { bottom: 14mm; }
    .back-label {
      position: absolute; left: 12.5mm; right: 12.5mm; top: 31mm; z-index: 1;
      min-height: 56.5mm; background: #FFFDF8; color: #2A2A2A; border: .45mm solid #2A2A2A;
      border-radius: 5mm; display: flex; flex-direction: column; align-items: center; text-align: center;
      padding: 4.2mm 4.4mm 4.6mm; box-shadow: 1.6mm 1.8mm 0 rgba(42,42,42,.13);
    }
    .back-label::after {
      content: ""; position: absolute; inset: 1.5mm; border: .22mm solid #E8590C; border-radius: 3.8mm; pointer-events: none;
    }
    .back-kicker {
      position: relative; z-index: 1; color: #E8590C; font-size: 5.7pt; font-weight: 900;
      letter-spacing: .17em; border: .28mm solid #E8590C; border-radius: 999px; padding: .85mm 2.7mm;
      background: #FFFDF8;
    }
    .back-illustration { position: relative; z-index: 1; width: 43mm; height: 26.6mm; margin: 2.5mm 0 .4mm; }
    .back-mini-icon { stroke-width: 2.6; }
    .back-label .back-title { position: relative; z-index: 1; margin: 0; font-size: 18.4pt; line-height: .95; color: #2A2A2A; }
    .back-label .back-title span { color: #E8590C; }
    .back-label .back-subtitle {
      position: relative; z-index: 1; margin: 2mm 0 0; color: #5A5550; font-size: 8pt; line-height: 1.25;
      font-weight: 750;
    }
    .back-label .back-subtitle strong { color: #E8590C; }
    .back-theme-dots {
      position: absolute; left: 0; right: 0; bottom: 25.2mm; z-index: 1; display: flex;
      justify-content: center; gap: 2mm;
    }
    .back-theme-dots i {
      width: 3.6mm; height: 3.6mm; border-radius: 999px; display: block;
      border: .22mm solid rgba(255,253,248,.5);
    }
    .back-card { background: #FFFDF8; }
    .back-content { align-items: center; text-align: center; padding-left: 5.5mm; padding-right: 5.5mm; }
    .bubble-cloud { position: relative; width: 48mm; height: 30mm; margin-top: 4mm; }
    .bubble { position: absolute; display: grid; place-items: center; border: 1.2pt solid #2A2A2A; border-radius: 4mm; font-family: "Shantell Sans", cursive; font-weight: 800; }
    .b1 { left: 17mm; top: 7mm; width: 13mm; height: 11mm; background: #2F6E78; color: #FFFDF8; font-size: 18pt; }
    .b2 { left: 6mm; top: 12mm; width: 11mm; height: 8mm; background: #875A6B; }
    .b3 { right: 5mm; top: 11mm; width: 12mm; height: 9mm; background: #C98A1B; }
    .b4 { left: 20mm; bottom: 5mm; width: 12mm; height: 8mm; background: #E8590C; }
    .spark { position: absolute; width: 1.6mm; height: 1.6mm; border-radius: 999px; background: #4C8577; }
    .s1 { left: 9mm; top: 4mm; } .s2 { right: 7mm; top: 5mm; background: #E8590C; } .s3 { left: 39mm; top: 28mm; background: #C98A1B; }
    .back-title { margin: 7mm 0 0; font-size: 16pt; line-height: 0.95; color: #2A2A2A; }
    .back-title span, .back-subtitle strong { color: #E8590C; }
    .back-subtitle { margin: 3mm 0 0; font-size: 8.6pt; color: #5A5550; line-height: 1.25; }
    .back-rule { width: 12mm; border-top: 1.3pt solid #E8590C; margin: 5mm 0 3mm; }
    .back-meta { margin: 0; font-size: 7.7pt; font-weight: 700; color: #5A5550; }
    .back-types { margin: 1.6mm 0 0; font-size: 7pt; color: #5A5550; }
    .theme-dots { display: flex; gap: 2mm; margin-top: 6mm; }
    .theme-dots i { width: 3.5mm; height: 3.5mm; border-radius: 999px; display: block; }
    .back-footer { margin-top: auto; padding-bottom: 2mm; }
    .back-brand { color: #E8590C; font-size: 18pt; line-height: 1; margin-bottom: 2mm; }
    .guides { position: absolute; inset: 0; pointer-events: none; }
  </style>
</head>
<body class="${variant}">${pages.map((page) => page.replace("</section>", `${guide}</section>`)).join("\n")}</body>
</html>`;
}

function renderSinglePdf(name, htmlText) {
  const htmlPath = path.join(tmpDir, `${name}.html`);
  const pdfPath = path.join(tmpDir, `${name}.pdf`);
  const profile = path.join(tmpDir, `edge-${name}-${Date.now()}`);
  fs.writeFileSync(htmlPath, htmlText, "utf8");
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
  } catch {
    // Edge can keep GPU cache handles alive briefly; the profile is disposable.
  }
  if (result.status !== 0 || !fs.existsSync(pdfPath)) {
    throw new Error(`PDF export mislukt: ${pdfPath}`);
  }
  fixPdfBoxes(pdfPath);
  return pdfPath;
}

function renderPdf(name, pages, withGuides = false, variant = "framed", destinationDir = outDir) {
  fs.mkdirSync(destinationDir, { recursive: true });
  const chunkSize = 10;
  const chunks = [];
  for (let index = 0; index < pages.length; index += chunkSize) {
    chunks.push(pages.slice(index, index + chunkSize));
  }
  const partFiles = chunks.map((chunk, index) =>
    renderSinglePdf(`${name}-${String(index + 1).padStart(3, "0")}`, html(chunk, withGuides, variant)),
  );
  const pdfPath = path.join(destinationDir, `${name}.pdf`);
  fs.rmSync(pdfPath, { force: true });
  const mergeCode = `
import sys
from pypdf import PdfReader, PdfWriter
out = sys.argv[1]
parts = sys.argv[2:]
writer = PdfWriter()
for part in parts:
    reader = PdfReader(part)
    for page in reader.pages:
        writer.add_page(page)
with open(out, "wb") as f:
    writer.write(f)
`;
  const result = cp.spawnSync(python, ["-c", mergeCode, pdfPath, ...partFiles], { stdio: "inherit", env: cleanEnv() });
  if (result.status !== 0 || !fs.existsSync(pdfPath)) {
    throw new Error(`PDF samenvoegen mislukt: ${pdfPath}`);
  }
  fixPdfBoxes(pdfPath);
  return pdfPath;
}

function fixPdfBoxes(pdfPath) {
  const tmpPath = `${pdfPath}.boxes.tmp`;
  fs.rmSync(tmpPath, { force: true });
  const code = `
import sys
from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject
path = sys.argv[1]
tmp_path = sys.argv[2]
media = RectangleObject([0, 0, 243.7795275591, 342.9921259843])
trim = RectangleObject([17.0078740157, 17.0078740157, 226.7716535433, 325.9842519685])
reader = PdfReader(path)
writer = PdfWriter()
for page in reader.pages:
    page.mediabox = media
    page.cropbox = media
    page.bleedbox = media
    page.trimbox = trim
    page.artbox = trim
    writer.add_page(page)
with open(tmp_path, "wb") as f:
    writer.write(f)
`;
  const result = cp.spawnSync(python, ["-c", code, pdfPath, tmpPath], { stdio: "inherit", env: cleanEnv() });
  if (result.status !== 0) {
    throw new Error(`PDF-boxes zetten mislukt: ${pdfPath}`);
  }
  fs.rmSync(pdfPath, { force: true });
  fs.renameSync(tmpPath, pdfPath);
}

function main() {
  const { kaarten, themaMap, typeLabel } = loadData();
  const fronts = [
    ...kaarten.map((kaart) => frontCard(kaart, themaMap, typeLabel)),
    ...Array.from({ length: JOKER_COUNT }, (_, index) => jokerCard(index)),
  ];
  if (process.argv.includes("--borderless-preview")) {
    const previewDir = path.join(root, "output", "pdf");
    const file = renderPdf(
      "voorbeeld-kaart-zonder-ontwerplijnen-74x109",
      [fronts[0]],
      false,
      "borderless",
      previewDir,
    );
    console.log(`OK: ${file}`);
    return;
  }
  const backs = Array.from({ length: fronts.length }, () => backCard());
  const guidePages = [fronts[0], backs[0]];

  const frontsOnly = process.argv.includes("--fronts-only");
  const frontVariant = process.argv.includes("--borderless") ? "borderless" : "framed";
  const frontBaseName = "ai-gesprekskaarten-voorkanten-74x109";
  const frontWithout = renderPdf(`${frontBaseName}-zonder-stanslijnen`, fronts, false, frontVariant);
  const frontLegacy = path.join(outDir, `${frontBaseName}.pdf`);
  fs.copyFileSync(frontWithout, frontLegacy);
  const frontWith = renderPdf(`${frontBaseName}-met-stanslijnen`, fronts, "stans", frontVariant);
  const files = [frontWithout, frontWith, frontLegacy];
  if (!frontsOnly) {
    files.push(
      renderPdf("ai-gesprekskaarten-achterkanten-74x109", backs),
      renderPdf("ai-gesprekskaarten-controle-hulplijnen-74x109", guidePages, true),
    );
  }
  for (const file of files) {
    console.log(`OK: ${file}`);
  }
}

main();
