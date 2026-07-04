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
const python =
  process.env.CODEX_PYTHON ||
  "C:\\Users\\maxva\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\python\\python.exe";

if (!edge) {
  throw new Error("Microsoft Edge niet gevonden; nodig voor vector-PDF export.");
}

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(tmpDir, { recursive: true });

const COLORS = {
  ink: "#2A2A2A",
  soft: "#5A5550",
  cream: "#FAF6EE",
  card: "#FFFDF8",
  line: "#E5DCCB",
  orange: "#E8590C",
  brand: "#B5532E",
  green: "#4C8577",
  blue: "#2F6E78",
};

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

const themeGuides = {
  mens: {
    intro: "Over trots, plezier, identiteit en gezien worden. Dit thema haalt AI uit de toolhoek en brengt het naar wat werk menselijk maakt.",
    voorbeelden: [
      {
        nr: 1,
        uitleg:
          "Laat iedereen eerst een kant kiezen. Vraag daarna: verandert je oordeel als je pas achteraf hoort dat het AI was? Vraag waarom. Zo wordt zichtbaar of iemand vooral de inhoud, de menselijke moeite of de intentie waardeert.",
      },
      {
        nr: 3,
        uitleg:
          "Laat 'alles verandert toch' niet het eindpunt zijn. Vraag naar het verschil tussen 'mijn taken veranderen' en 'mij hebben ze niet meer nodig'. Laat mensen benoemen wat ze zouden missen, niet alleen wat ze vrezen te verliezen.",
      },
      {
        nr: 9,
        uitleg:
          "Doe eerst een rondje: ieder vertelt een eigen verhaal; laat de groep nog niet reageren of oplossen. Vraag daarna of saai werk ook rust, houvast of afwisseling geeft. Zou alleen 'hoogwaardig denkwerk' echt een betere werkdag zijn?",
      },
    ],
  },
  werk: {
    intro: "Over tijdwinst, schijnproductiviteit, aandacht en werkdruk. Hier wordt zichtbaar van wie de bespaarde tijd eigenlijk is.",
    voorbeelden: [
      {
        nr: 10,
        uitleg:
          "Vraag eerst wie de tredmolen herkent en wie werkelijk meer ruimte ervaart. Trek het dan naar de kern: van wie is de bespaarde tijd, van jou of van de organisatie? Laat wie ruimte overhoudt uitleggen hoe die dat bewaakt.",
      },
      {
        nr: 15,
        uitleg:
          "Laat iedereen eerst zelf kiezen wat die zou doen, pas daarna delen. Vraag welke onuitgesproken norm hier schuurt: belonen jullie resultaat, inspanning of eerlijkheid? Bespreek ook wat deze snelheid doet met beoordelingen en de werkdruk van anderen.",
      },
      {
        nr: 18,
        uitleg:
          "Doe een rondje met concrete voorbeelden van deze week; nog niet op elkaar reageren. Let op wie zich verontschuldigt voor rust of tijd voor zichzelf. Vraag daarna: koos je bewust waar de tijd heen ging, of liep die vanzelf weer vol?",
      },
    ],
  },
  leren: {
    intro: "Over vakmanschap, juniors, basiskennis en verleren. De vraag is niet of AI helpt, maar wat mensen nog zelf moeten kunnen.",
    voorbeelden: [
      {
        nr: 19,
        uitleg:
          "Vraag om een echte beslissing uit het eigen werk, geen algemeen principe. Vraag daarna: woog je zelf nog af of het klopte, en zou je het merken als AI ernaast zat? Laat de groep het verschil benoemen tussen efficient werken en oordeel verleren.",
      },
      {
        nr: 25,
        uitleg:
          "Laat beide keuzes serieus uitwerken: AI is sneller en altijd beschikbaar; een senior geeft context, tegenvragen en het 'waarom niet zo'. Vraag wat mensen vroeger van een collega leerden dat niet in alleen een antwoord zat.",
      },
      {
        nr: 27,
        uitleg:
          "De verschuiving naar beoordelen herkennen veel mensen; de spanning zit in het woord 'degradatie'. Vraag welk maakwerk iemand concreet kwijtraakt. Voor wie is beoordelen een stap omhoog, voor wie omlaag, en wie zou hierdoor uit het vak stappen?",
      },
    ],
  },
  vertrouwen: {
    intro: "Over controleren, gemak, fouten en verantwoordelijkheid. Dit thema legt bloot hoe snel vertrouwen in AI routine wordt.",
    voorbeelden: [
      {
        nr: 28,
        uitleg:
          "Laat de groep positie kiezen en benoem dan de val: niet iedereen kan beter controleren dan gemiddeld. Vraag waarop iemand het oordeel over collega's baseert. En: als een collega dit over jou zei, zou je jezelf daarin herkennen?",
      },
      {
        nr: 33,
        uitleg:
          "Laat beide kanten eerst het sterkste argument van de andere kant geven. Vraag daarna: vertrouw je een minder bevooroordeeld oordeel dat je niet kunt uitleggen, of een menselijk oordeel dat uitlegbaar maar gekleurd is? Wat vertel je de afgewezen kandidaat?",
      },
      {
        nr: 35,
        uitleg:
          "Doe eerst een rondje met echte momenten; reageer nog niet. Luister naar het verschil tussen 'dit was verantwoord goed genoeg' en 'ik gokte en had geluk'. Vraag wat de lagere controle veroorzaakte: tijdsdruk, vertrouwen of de verwachting dat niemand keek?",
      },
    ],
  },
  koers: {
    intro: "Over richting, tempo, budget en afhankelijkheid. Dit thema vraagt of AI bij jullie een keuze is of vooral een reflex.",
    voorbeelden: [
      {
        nr: 37,
        uitleg:
          "Vraag beide kampen een recente AI-stap te noemen. Werd het werk er aantoonbaar beter van, of voorkwam de stap vooral het gevoel van achterblijven? Vraag ook wie het zou merken als de organisatie een jaar niets nieuws met AI deed.",
      },
      {
        nr: 42,
        uitleg:
          "Laat iedereen eerst individueel kiezen en een nadeel van de eigen keuze opschrijven. De gevorderde training kan de kloof vergroten; de basistraining daagt koplopers minder uit. Vraag daarna: wat heeft het team nu nodig, en voor wie is het budget bedoeld?",
      },
      {
        nr: 43,
        uitleg:
          "Doe een rondje met beelden van een gewone werkdag en zoek nog geen gezamenlijk antwoord. Juist de verschillen laten zien waar verborgen onenigheid zit. Vraag daarna welke verandering mensen hopen te zien en welke ze juist willen voorkomen.",
      },
    ],
  },
  eerlijk: {
    intro: "Over openheid, schijn en vertrouwen. Hier zoeken mensen hun grens tussen normaal gereedschap en misleiding.",
    voorbeelden: [
      {
        nr: 46,
        uitleg:
          "Laat mensen een kant kiezen en wijs daarna op de tweede zin: wie instemt, moet ook zichzelf aankijken. Vraag wat het eigen gebruik anders maakt: de mate van bewerken, de gewekte indruk, of gunnen we onszelf vooral een uitzondering?",
      },
      {
        nr: 50,
        uitleg:
          "Haal drie kwesties uit elkaar: waar is AI gebruikt, waarom wordt dat ontkend en wat leert de stagiair hierdoor niet? Vraag vervolgens waar je zelf AI gebruikt. Wanneer is streng zijn goede begeleiding, en wanneer hanteer je een dubbele maat?",
      },
      {
        nr: 54,
        uitleg:
          "Laat ieder twee concrete gevallen naast elkaar leggen: een waarin zwijgen prima is en een waarin het oneerlijk voelt. Nog niet reageren. Vergelijk daarna de criteria: wat de ander verwacht, waarvoor die betaalt of hoe persoonlijk het werk is.",
      },
    ],
  },
};

function ruleItem(nr, titel, tekst) {
  return `<div class="rule-item">
    <div class="rule-no hand">${String(nr).padStart(2, "0")}</div>
    <div><h3>${escapeHtml(titel)}</h3><p>${escapeHtml(tekst)}</p></div>
  </div>`;
}

function pageShell(content, options = {}) {
  const accent = options.accent || COLORS.orange;
  const klass = options.klass || "";
  return `<section class="page ${klass}" style="--accent:${accent}">
    <div class="trim">
      ${content}
    </div>
  </section>`;
}

function footer(pageNumber, label = "AI met Max") {
  return `<footer class="page-footer">
    <span class="hand">${escapeHtml(label)}</span>
    <span>${pageNumber}/8</span>
  </footer>`;
}

function stansMarks() {
  return `<div class="guides" aria-hidden="true">
    <i class="guide-bleed"></i>
    <i class="trim-line trim-top"></i><i class="trim-line trim-right"></i>
    <i class="trim-line trim-bottom"></i><i class="trim-line trim-left"></i>
    <i class="crop crop-tl-h"></i><i class="crop crop-tl-v"></i>
    <i class="crop crop-tr-h"></i><i class="crop crop-tr-v"></i>
    <i class="crop crop-bl-h"></i><i class="crop crop-bl-v"></i>
    <i class="crop crop-br-h"></i><i class="crop crop-br-v"></i>
    <span>snijlijn 74 x 109 mm - afloop 86 x 121 mm</span>
  </div>`;
}

function coverPage() {
  const colorBars = ["#875A6B", "#4C8577", "#C98A1B", "#2F6E78", "#B5532E", "#E8590C"]
    .map((color) => `<i style="background:${color}"></i>`)
    .join("");
  return pageShell(
    `<div class="cover-mark">${colorBars}</div>
    <div class="cover-copy">
      <p class="eyebrow">Regelboekje</p>
      <h1 class="hand"><span>AI</span>-gespreks<br>kaarten</h1>
      <p class="cover-lead">Voor 45 tot 90 minuten echt gesprek over AI op het werk.</p>
      <p class="cover-text">Gebruik een handvol kaarten, niet de hele stapel. Het doel is geen consensus, maar zichtbaar maken wat mensen denken, vrezen en belangrijk vinden.</p>
    </div>
    <div class="cover-bottom">
      <span class="hand">AI met Max</span>
      <span>64 kaarten - 6 thema's - 10 jokers</span>
    </div>`,
    { accent: COLORS.brand, klass: "cover-page" },
  );
}

function rulesPage() {
  return pageShell(
    `<header class="rules-header">
      <p class="eyebrow">Zo speel je</p>
      <h2 class="hand">Kies scherp,<br>vraag door.</h2>
      <p>Begin met 8 tot 12 kaarten. Mix stellingen, dilemma's en open vragen. De kaarten hoeven niet op.</p>
    </header>
    <div class="rules-grid">
      ${ruleItem(1, "Stelling", "Laat iedereen kiezen: eens of oneens. Geen midden. Vraag eerst iemand uit de kleinste groep waarom die daar staat.")}
      ${ruleItem(2, "Dilemma", "Laat iedereen eerst twee minuten stil schrijven. Daarna pas delen, zodat de eerste spreker de groep niet stuurt.")}
      ${ruleItem(3, "Open vraag", "Zoek eigen voorbeelden. Niet meteen reageren of oplossen; eerst begrijpen wat iemand bedoelt.")}
      ${ruleItem(4, "Doorvragen", "De vaste vraag: wanneer gebeurde dit voor het laatst bij jou? Daar zit het echte gesprek.")}
      ${ruleItem(5, "Begeleiden", "Houd je eigen mening even achter. Zeker als je manager, trekker of expert bent.")}
      ${ruleItem(6, "Afronden", "Sluit af met een vangst: een zin per persoon. Geen discussie meer en geen gedwongen conclusie.")}
    </div>
    <div class="blank-note">
      <strong>Extra kaarten over?</strong> Geef mensen een lege kaart om zelf een vraag of stelling te bedenken.
    </div>
    ${footer(2)}`,
    { accent: COLORS.green, klass: "rules-page" },
  );
}

function themePage(thema, pageNumber, data, kaartByNr) {
  const voorbeelden = data.voorbeelden
    .map((voorbeeld) => {
      const kaart = kaartByNr.get(voorbeeld.nr);
      if (!kaart) throw new Error(`Kaart ${voorbeeld.nr} niet gevonden`);
      return `<article class="example">
        <div class="card-no hand">${String(voorbeeld.nr).padStart(2, "0")}</div>
        <div class="example-body">
          <p class="kaarttekst">${escapeHtml(kaart.tekst)}</p>
          <p class="uitleg">${escapeHtml(voorbeeld.uitleg)}</p>
        </div>
      </article>`;
    })
    .join("");

  return pageShell(
    `<header class="theme-header">
      <div class="theme-topline">
        ${iconSvg(thema.key, thema.kleur)}
        <span class="eyebrow">Thema ${pageNumber - 2}</span>
      </div>
      <h2 class="hand">${escapeHtml(thema.naam)}</h2>
      <p>${escapeHtml(data.intro)}</p>
    </header>
    <div class="examples">${voorbeelden}</div>
    ${footer(pageNumber, thema.naam)}`,
    { accent: thema.kleur, klass: "theme-page" },
  );
}

function html(withStans = false) {
  const { kaarten, themas } = loadData();
  const kaartByNr = new Map(kaarten.map((kaart) => [kaart.nr, kaart]));
  const pages = [
    coverPage(),
    rulesPage(),
    ...themas.map((thema, index) =>
      themePage(thema, index + 3, themeGuides[thema.key], kaartByNr),
    ),
  ];

  if (pages.length !== 8) {
    throw new Error(`Regelboekje moet 8 pagina's hebben, kreeg ${pages.length}.`);
  }

  const renderedPages = withStans
    ? pages.map((page) => page.replace("</section>", `${stansMarks()}</section>`))
    : pages;

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${fontCss()}
    @page { size: 86mm 121mm; margin: 0; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    html, body { margin: 0; padding: 0; background: ${COLORS.cream}; }
    body { font-family: "Inter", "Inter Fallback", Arial, sans-serif; color: ${COLORS.ink}; }
    .hand { font-family: "Shantell Sans", "Shantell Sans Fallback", cursive; font-weight: 800; }
    .page {
      width: 86mm; height: 121mm; position: relative; overflow: hidden;
      background: ${COLORS.cream}; page-break-after: always;
    }
    .page:last-child { page-break-after: auto; }
    .page::before { display: none; }
    .trim {
      position: absolute; left: 6mm; top: 6mm; width: 74mm; height: 109mm;
      padding: 3.8mm 5.2mm 3.4mm 5.6mm;
    }
    .eyebrow {
      margin: 0; font-size: 6.7pt; line-height: 1.1; font-weight: 800;
      color: var(--accent); text-transform: uppercase; letter-spacing: 0;
    }
    .cover-mark { display: grid; grid-template-columns: repeat(6, 1fr); gap: 1.1mm; width: 41mm; margin: 1mm 0 10mm; }
    .cover-mark i { display: block; height: 3.2mm; border-radius: 1.6mm; border: .35pt solid rgba(42,42,42,.18); }
    .cover-copy h1 { margin: 1.3mm 0 0; font-size: 24.5pt; line-height: .9; color: ${COLORS.ink}; }
    .cover-copy h1 span { color: ${COLORS.brand}; }
    .cover-lead { margin: 5mm 0 0; max-width: 55mm; font-size: 10.1pt; line-height: 1.18; font-weight: 800; color: ${COLORS.ink}; }
    .cover-text { margin: 3.5mm 0 0; max-width: 56mm; font-size: 7.4pt; line-height: 1.36; color: ${COLORS.soft}; font-weight: 560; }
    .cover-bottom {
      position: absolute; left: 5.6mm; right: 5.2mm; bottom: 4.5mm;
      border-top: .7pt solid ${COLORS.line}; padding-top: 2.2mm;
      display: flex; align-items: center; justify-content: space-between; gap: 3mm;
      font-size: 5.9pt; color: ${COLORS.soft};
    }
    .cover-bottom .hand { color: ${COLORS.brand}; font-size: 10.2pt; white-space: nowrap; }
    .rules-header h2, .theme-header h2 { margin: 1.1mm 0 1.2mm; color: var(--accent); line-height: .95; }
    .rules-header h2 { font-size: 15.2pt; }
    .rules-header p:not(.eyebrow), .theme-header p {
      margin: 0; color: ${COLORS.soft}; font-size: 6.7pt; line-height: 1.28; font-weight: 560;
    }
    .rules-grid {
      margin-top: 3.2mm; display: grid; grid-template-columns: 1fr 1fr;
      gap: 1.8mm 1.6mm;
    }
    .rule-item {
      display: grid; grid-template-columns: 5.6mm 1fr; gap: 1.15mm;
      padding: 1.55mm 1.55mm; background: ${COLORS.card};
      border: .7pt solid ${COLORS.line}; border-left: 1.35mm solid var(--accent);
      border-radius: 2.1mm;
    }
    .rule-no { color: var(--accent); font-size: 8.6pt; line-height: 1; padding-top: .25mm; }
    .rule-item h3 { margin: 0 0 .35mm; font-size: 5.75pt; line-height: 1.05; color: ${COLORS.ink}; }
    .rule-item p { margin: 0; font-size: 4.95pt; line-height: 1.2; color: ${COLORS.soft}; font-weight: 540; }
    .blank-note {
      margin-top: 2.25mm; padding: 1.65mm 2mm; border: .75pt dashed var(--accent);
      border-radius: 2.2mm; color: ${COLORS.soft}; font-size: 5.4pt; line-height: 1.22; background: rgba(255,253,248,.62);
    }
    .blank-note strong { color: ${COLORS.ink}; }
    .theme-topline { display: flex; align-items: center; justify-content: space-between; gap: 3mm; }
    .theme-icon { width: 6.7mm; height: 6.7mm; flex: 0 0 auto; }
    .theme-header h2 { font-size: 13.9pt; margin-bottom: .75mm; }
    .theme-header p { max-width: 60mm; font-size: 6.25pt; line-height: 1.22; }
    .examples { margin-top: 1.9mm; display: grid; gap: 1.25mm; }
    .example {
      display: grid; grid-template-columns: 7.1mm 1fr; gap: 1.45mm;
      background: ${COLORS.card}; border: .75pt solid ${COLORS.line};
      border-left: 1.45mm solid var(--accent); border-radius: 2.2mm;
      padding: 1.35mm 1.75mm 1.45mm 1.35mm;
    }
    .card-no { color: var(--accent); font-size: 9.25pt; line-height: 1; padding-top: .25mm; }
    .example p { margin: 0; }
    .kaarttekst { color: ${COLORS.ink}; font-size: 5.24pt; line-height: 1.14; font-weight: 800; }
    .uitleg { margin-top: .8mm !important; color: ${COLORS.soft}; font-size: 4.95pt; line-height: 1.15; font-weight: 540; }
    .page-footer {
      position: absolute; left: 5.6mm; right: 5.2mm; bottom: 2.9mm;
      display: flex; align-items: center; justify-content: space-between;
      border-top: .65pt solid ${COLORS.line}; padding-top: 1.4mm;
      font-size: 5.15pt; line-height: 1; color: ${COLORS.soft};
    }
    .page-footer .hand { color: var(--accent); font-size: 6.8pt; }
    .guides { position: absolute; inset: 0; z-index: 1000; pointer-events: none; background: transparent; }
    .guides i { display: block; position: absolute; background: transparent; }
    .guide-bleed { inset: .1mm; border: .18mm dashed #1F9D55; }
    .trim-line { background: #E8009E !important; }
    .trim-top, .trim-bottom { left: 6mm; width: 74mm; height: .22mm; }
    .trim-left, .trim-right { top: 6mm; width: .22mm; height: 109mm; }
    .trim-top { top: 6mm; } .trim-bottom { top: 114.78mm; }
    .trim-left { left: 6mm; } .trim-right { left: 79.78mm; }
    .guides span { position: absolute; top: 2.45mm; left: 0; width: 100%; text-align: center; color: #E8009E; font: 1.7mm/1 Inter, sans-serif; }
    .crop { background: #2A2A2A !important; }
    .crop-tl-h, .crop-tr-h, .crop-bl-h, .crop-br-h { width: 3.5mm; height: .18mm; }
    .crop-tl-v, .crop-tr-v, .crop-bl-v, .crop-br-v { width: .18mm; height: 3.5mm; }
    .crop-tl-h { left: 2.5mm; top: 5.91mm; } .crop-tl-v { left: 5.91mm; top: 2.5mm; }
    .crop-tr-h { left: 80mm; top: 5.91mm; } .crop-tr-v { left: 79.91mm; top: 2.5mm; }
    .crop-bl-h { left: 2.5mm; top: 114.91mm; } .crop-bl-v { left: 5.91mm; top: 115mm; }
    .crop-br-h { left: 80mm; top: 114.91mm; } .crop-br-v { left: 79.91mm; top: 115mm; }
  </style>
</head>
<body>${renderedPages.join("\n")}</body>
</html>`;
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
  const result = cp.spawnSync(python, ["-c", code, pdfPath, tmpPath], {
    stdio: "inherit",
    env: cleanEnv(),
  });
  if (result.status !== 0) {
    throw new Error(`PDF-boxes zetten mislukt: ${pdfPath}`);
  }
  fs.rmSync(pdfPath, { force: true });
  fs.renameSync(tmpPath, pdfPath);
}

function renderPdf(name, withStans = false) {
  const htmlPath = path.join(tmpDir, `${name}.html`);
  const pdfPath = path.join(outDir, `${name}.pdf`);
  const profile = path.join(tmpDir, `edge-${name}-${Date.now()}`);
  fs.writeFileSync(htmlPath, html(withStans), "utf8");
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

  const result = cp.spawnSync(edge, args, {
    stdio: "inherit",
    env: cleanEnv(),
    timeout: 60000,
  });
  try {
    fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 250 });
  } catch {
    // Edge can keep disposable profile handles alive briefly.
  }
  if (result.status !== 0 || !fs.existsSync(pdfPath)) {
    throw new Error(`PDF export mislukt: ${pdfPath}`);
  }
  fixPdfBoxes(pdfPath);
  return { htmlPath, pdfPath };
}

const baseName = "ai-gesprekskaarten-regelboekje-74x109-8p";
const withoutStans = renderPdf(`${baseName}-zonder-stanslijnen`);
const legacyPath = path.join(outDir, `${baseName}.pdf`);
fs.copyFileSync(withoutStans.pdfPath, legacyPath);
const withStans = renderPdf(`${baseName}-met-stanslijnen`, true);
for (const file of [withoutStans, withStans]) {
  console.log(`OK: ${file.pdfPath}`);
  console.log(`HTML: ${file.htmlPath}`);
}
console.log(`OK: ${legacyPath}`);
