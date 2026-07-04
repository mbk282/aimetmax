const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "output", "pdf");
const tmpDir = path.join(root, "tmp", "pdfs");
const edgeCandidates = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];
const edge = edgeCandidates.find((candidate) => fs.existsSync(candidate));

if (!edge) {
  throw new Error("Microsoft Edge niet gevonden; nodig voor PDF-render.");
}

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(tmpDir, { recursive: true });

const COLORS = {
  cream: "#FAF6EE",
  card: "#FFFDF8",
  ink: "#2A2A2A",
  soft: "#5A5550",
  orange: "#E8590C",
  yellow: "#FFE8A3",
  mauve: "#875A6B",
  sage: "#4C8577",
  gold: "#C98A1B",
  teal: "#2F6E78",
  terracotta: "#B5532E",
};
const THEMES = [COLORS.mauve, COLORS.sage, COLORS.gold, COLORS.teal, COLORS.terracotta, COLORS.orange];

const variants = [
  {
    title: "01 - alleen stippen",
    note: "Meest speelkaart-achtig; geen tekst, geen voorkeursrichting.",
    className: "v-empty",
    content: "",
  },
  {
    title: "02 - alleen bolletjes",
    note: "Alleen de zes thema's als herkenning.",
    className: "v-dots-only",
    content: `<div class="theme-dots large">${dots()}</div>`,
  },
  {
    title: "03 - alleen logo",
    note: "Rustig, merkbaar, nog steeds heel kaal.",
    className: "v-logo-only",
    content: `<div class="wordmark hand">AI met Max</div>`,
  },
  {
    title: "04 - klein logo onder",
    note: "Bijna anoniem; logo voelt als signatuur.",
    className: "v-logo-bottom",
    content: `<div class="wordmark hand">AI met Max</div>`,
  },
  {
    title: "05 - Praten over AI",
    note: "Duidelijker spelrug, zonder extra uitleg.",
    className: "v-title-only",
    content: `<div class="title hand">Praten over <span>AI</span></div>`,
  },
  {
    title: "06 - titel + bolletjes",
    note: "Mijn nuchtere favoriet: herkenbaar maar sober.",
    className: "v-title-dots",
    content: `<div class="title hand">Praten over <span>AI</span></div><div class="theme-dots">${dots()}</div>`,
  },
  {
    title: "07 - bolletjes + logo",
    note: "Meer kaartspel, minder productnaam.",
    className: "v-dots-logo",
    content: `<div class="theme-dots large">${dots()}</div><div class="wordmark hand">AI met Max</div>`,
  },
  {
    title: "08 - hoekmarkering",
    note: "Speelkaartgevoel door kleine AI-hoeken.",
    className: "v-corners",
    content: `<div class="corner tl hand">AI</div><div class="corner br hand">AI</div><div class="theme-dots tiny">${dots()}</div>`,
  },
  {
    title: "09 - monogram",
    note: "Heel minimaal, met klein centraal AI-teken.",
    className: "v-monogram",
    content: `<div class="monogram hand">AI</div>`,
  },
  {
    title: "10 - bolletjesband",
    note: "Alle herkenning in een subtiele verticale band.",
    className: "v-dot-band",
    content: `<div class="dot-band">${dots()}</div>`,
  },
  {
    title: "11 - mini woordmerk",
    note: "Vlak oranje met klein woordmerk in het midden.",
    className: "v-mini-word",
    content: `<div class="mini-word hand">Praten over <span>AI</span></div>`,
  },
  {
    title: "12 - doosje sober",
    note: "Nog minimalistisch, maar sluit het meest aan op het doosje.",
    className: "v-label",
    content: `<div class="small-label"><div class="label-dots">${dots()}</div><div class="label-title hand">Praten over <span>AI</span></div></div>`,
  },
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

function fontCss() {
  const dirs = [
    path.join(root, ".next", "dev", "static", "chunks"),
    path.join(root, ".next", "static", "chunks"),
  ];
  const cssFiles = [];
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith(".css")) continue;
      const body = fs.readFileSync(path.join(dir, file), "utf8");
      if (body.includes("@font-face") && (body.includes("Inter") || body.includes("Shantell Sans"))) {
        cssFiles.push(body);
      }
    }
  }
  return cssFiles
    .join("\n")
    .replaceAll('url("../media/', `url("${toFileUrl(path.join(root, ".next", "dev", "static", "media"))}/`)
    .replaceAll("url('../media/", `url('${toFileUrl(path.join(root, ".next", "dev", "static", "media"))}/`)
    .replaceAll("url(../media/", `url(${toFileUrl(path.join(root, ".next", "dev", "static", "media"))}/`)
    .replaceAll('url("/_next/static/media/', `url("${toFileUrl(path.join(root, ".next", "static", "media"))}/`)
    .replaceAll("url('/_next/static/media/", `url('${toFileUrl(path.join(root, ".next", "static", "media"))}/`)
    .replaceAll("url(/_next/static/media/", `url(${toFileUrl(path.join(root, ".next", "static", "media"))}/`);
}

function dots() {
  return THEMES.map((color) => `<i style="background:${color}"></i>`).join("");
}

function html() {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Minimalistische kaartachterkant opties</title>
  <style>
    ${fontCss()}
    @page { size: 420mm 297mm; margin: 0; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    html, body { margin: 0; padding: 0; background: ${COLORS.cream}; }
    body { font-family: "Inter", "Inter Fallback", Arial, sans-serif; color: ${COLORS.ink}; }
    .hand { font-family: "Shantell Sans", "Shantell Sans Fallback", cursive; font-weight: 800; }
    .sheet { width: 420mm; height: 297mm; padding: 14mm 18mm; background: ${COLORS.cream}; }
    header { display: flex; justify-content: space-between; align-items: end; margin-bottom: 7mm; }
    h1 { margin: 0; color: ${COLORS.orange}; font-size: 12mm; line-height: 1; }
    header p { margin: 0; max-width: 138mm; color: ${COLORS.soft}; font-size: 3.4mm; line-height: 1.35; font-weight: 650; }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 7mm 10mm; }
    .option { display: grid; grid-template-columns: 55mm 1fr; gap: 4.2mm; align-items: center; min-height: 76mm; }
    .card {
      position: relative; width: 55mm; height: 77.38mm; overflow: hidden; border-radius: 5.4mm;
      background: ${COLORS.orange}; box-shadow: 1.6mm 2mm 0 rgba(42,42,42,.12);
    }
    .card::before {
      content: ""; position: absolute; inset: 0; background-image: radial-gradient(rgba(42,42,42,.18) .22mm, transparent .25mm);
      background-size: 2.05mm 2.05mm; opacity: .42;
    }
    .card::after {
      content: ""; position: absolute; inset: 2.8mm; border: .22mm solid rgba(255,253,248,.26); border-radius: 4.2mm;
      opacity: .5;
    }
    .v-empty::after, .v-dots-only::after { opacity: .28; }
    .card-content { position: absolute; inset: 0; z-index: 1; display: grid; place-items: center; color: ${COLORS.card}; }
    .wordmark { color: ${COLORS.card}; font-size: 6.6mm; line-height: 1; text-align: center; text-shadow: 0 .25mm 0 rgba(42,42,42,.1); }
    .v-logo-bottom .wordmark { position: absolute; left: 0; right: 0; bottom: 12.5mm; font-size: 4.1mm; }
    .title { color: ${COLORS.card}; font-size: 6mm; line-height: 1; text-align: center; text-shadow: 0 .25mm 0 rgba(42,42,42,.1); }
    .title span, .mini-word span { color: ${COLORS.yellow}; }
    .theme-dots { display: flex; gap: 1.8mm; justify-content: center; align-items: center; }
    .theme-dots i, .dot-band i, .label-dots i {
      width: 3.4mm; height: 3.4mm; border-radius: 999px; display: block; border: .22mm solid rgba(255,253,248,.52);
    }
    .theme-dots.large i { width: 5.2mm; height: 5.2mm; }
    .theme-dots.tiny { gap: 1.15mm; }
    .theme-dots.tiny i { width: 2.4mm; height: 2.4mm; }
    .v-title-dots .card-content, .v-dots-logo .card-content {
      align-content: center; gap: 7mm;
    }
    .v-dots-logo .wordmark { font-size: 4.5mm; }
    .corner {
      position: absolute; color: ${COLORS.card}; font-size: 5mm; line-height: 1; letter-spacing: 0;
    }
    .corner.tl { left: 7mm; top: 7mm; }
    .corner.br { right: 7mm; bottom: 7mm; transform: rotate(180deg); }
    .monogram {
      width: 18mm; height: 18mm; border-radius: 999px; display: grid; place-items: center;
      border: .35mm solid rgba(255,253,248,.7); color: ${COLORS.card}; font-size: 8mm;
    }
    .dot-band { position: absolute; top: 0; bottom: 0; left: 9mm; display: flex; flex-direction: column; justify-content: center; gap: 2.4mm; }
    .mini-word { color: ${COLORS.card}; font-size: 4.7mm; text-align: center; line-height: 1; }
    .small-label {
      width: 37mm; min-height: 22mm; border-radius: 4.2mm; background: ${COLORS.card}; color: ${COLORS.ink};
      border: .35mm solid ${COLORS.ink}; display: grid; place-items: center; gap: 2mm; padding: 4mm 3mm;
      box-shadow: 1mm 1.2mm 0 rgba(42,42,42,.12);
    }
    .label-dots { display: flex; gap: 1.2mm; }
    .label-dots i { width: 2.7mm; height: 2.7mm; border-color: rgba(42,42,42,.14); }
    .label-title { color: ${COLORS.ink}; font-size: 4.5mm; line-height: 1; }
    .label-title span { color: ${COLORS.orange}; }
    .meta h2 { margin: 0 0 1.1mm; color: ${COLORS.ink}; font-size: 4mm; line-height: 1.08; }
    .meta p { margin: 0; color: ${COLORS.soft}; font-size: 2.75mm; line-height: 1.28; font-weight: 600; }
  </style>
</head>
<body>
  <section class="sheet">
    <header>
      <h1 class="hand">Minimalistische ruggen</h1>
      <p>Alle kaarten hieronder zijn oranje full-bleed met hetzelfde subtiele stippenveld. De tekst naast de kaart is alleen toelichting voor deze preview.</p>
    </header>
    <div class="grid">
      ${variants
        .map(
          (variant) => `<article class="option">
            <div class="card ${variant.className}"><div class="card-content">${variant.content}</div></div>
            <div class="meta"><h2>${variant.title}</h2><p>${variant.note}</p></div>
          </article>`,
        )
        .join("")}
    </div>
  </section>
</body>
</html>`;
}

function render() {
  const htmlPath = path.join(tmpDir, "kaart-achterkant-minimal-opties.html");
  const pdfPath = path.join(outDir, "kaart-achterkant-minimal-opties.pdf");
  const profile = path.join(tmpDir, `edge-kaart-achterkant-opties-${Date.now()}`);
  fs.writeFileSync(htmlPath, html(), "utf8");
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
  fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 250 });
  if (result.status !== 0 || !fs.existsSync(pdfPath)) {
    throw new Error(`PDF export mislukt: ${pdfPath}`);
  }
  console.log(`OK: ${pdfPath}`);
}

render();
