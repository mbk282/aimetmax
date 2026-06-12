/* Rendercheck voor academy-modules. Gebruik: node scripts/check-academy-module.js public/academy/content-<module>.js */
const fs = require("fs");
const path = require("path");

const FILE = path.resolve(process.argv[2] || path.join(__dirname, "../public/academy/content-ai-in-jouw-rol.js"));
const CSS = path.resolve(__dirname, "../public/academy/style.css");
const ACADEMY = path.resolve(__dirname, "../public/academy");
console.log("Check: " + FILE);

let fails = 0;
function ok(msg) { console.log("  OK  " + msg); }
function fail(msg) { fails++; console.log("  FAIL " + msg); }

/* ---- laad module ---- */
globalThis.window = {};
require(FILE);
const M = window.MODULE;

/* ---- (2) top-level velden ---- */
for (const veld of ["kicker", "titel", "sub", "lessen", "quiz"]) {
  if (M && M[veld] !== undefined) ok(`MODULE.${veld} aanwezig`);
  else fail(`MODULE.${veld} ontbreekt`);
}
for (const optioneel of ["demoBoom", "keuzes"]) {
  if (M && M[optioneel] !== undefined) console.log(`  --  MODULE.${optioneel} aanwezig (interactieve demo)`);
}

/* ---- (3) lessen ---- */
let quizDivCount = 0, scoreDivCount = 0;
M.lessen.forEach((les, i) => {
  for (const veld of ["kicker", "titel", "navTitel", "html"]) {
    if (typeof les[veld] !== "string" || !les[veld].trim()) fail(`les ${i} (${les.navTitel || "?"}): veld '${veld}' ontbreekt of leeg`);
  }
  if (les.html.includes('<div id="quiz"></div>')) quizDivCount++;
  if (les.html.includes('<div class="score" id="score"></div>')) scoreDivCount++;
});
if (M.lessen.every(l => ["kicker","titel","navTitel","html"].every(v => typeof l[v] === "string" && l[v].trim()))) ok(`alle ${M.lessen.length} lessen hebben kicker/titel/navTitel/html`);
if (quizDivCount === 1) ok('precies 1 les bevat <div id="quiz"></div>'); else fail(`quiz-div komt ${quizDivCount}x voor (verwacht 1)`);
if (scoreDivCount === 1) ok('precies 1 les bevat <div class="score" id="score"></div>'); else fail(`score-div komt ${scoreDivCount}x voor (verwacht 1)`);

/* ---- (4) quiz ---- */
if (M.quiz.length >= 10 && M.quiz.length <= 12) ok(`quiz heeft ${M.quiz.length} items`); else fail(`quiz heeft ${M.quiz.length} items (verwacht 10-12)`);
M.quiz.forEach((q, i) => {
  if (typeof q.s !== "string" || !q.s.trim()) fail(`quiz ${i}: 's' ontbreekt of leeg`);
  if (typeof q.antwoord !== "boolean") fail(`quiz ${i}: 'antwoord' is geen boolean (${typeof q.antwoord})`);
  if (typeof q.uitleg !== "string" || !q.uitleg.trim()) fail(`quiz ${i}: 'uitleg' ontbreekt of leeg`);
  const extra = Object.keys(q).filter(k => !["s","antwoord","uitleg"].includes(k));
  if (extra.length) fail(`quiz ${i}: onverwachte velden ${extra.join(",")}`);
});
if (M.quiz.every(q => typeof q.s === "string" && typeof q.antwoord === "boolean" && typeof q.uitleg === "string")) ok("alle quiz-items hebben {s, antwoord:boolean, uitleg}");

/* ---- (5) CSS-classes ---- */
const css = fs.readFileSync(CSS, "utf8");
const cssClasses = new Set([...css.matchAll(/\.([A-Za-z_][\w-]*)/g)].map(m => m[1]));
const allHtml = M.lessen.map(l => l.html).join("\n");
const usedClasses = new Set();
for (const m of allHtml.matchAll(/class="([^"]+)"/g)) m[1].split(/\s+/).forEach(c => c && usedClasses.add(c));
const missing = [...usedClasses].filter(c => !cssClasses.has(c));
if (!missing.length) ok(`alle gebruikte CSS-classes bestaan in style.css (${[...usedClasses].sort().join(", ")})`);
else fail(`classes niet in style.css: ${missing.join(", ")}`);

/* ---- (6) SVG's ---- */
const ALLOWED = new Set(["#2A2A2A","#5A5550","#FFFDF8","#FBE3D4","#FFE8A3","#DCEAE5","#E8590C","#4C8577","#FAF6EE"]);
const svgs = [...allHtml.matchAll(/<svg[\s\S]*?<\/svg>/g)].map(m => m[0]);
console.log(`  --  ${svgs.length} SVG's gevonden`);
svgs.forEach((svg, idx) => {
  const label = (svg.match(/aria-label="([^"]*)"/) || [])[1];
  const naam = label ? label.slice(0, 50) : `svg #${idx}`;
  // aria-label
  if (label && label.trim()) ok(`SVG ${idx}: aria-label aanwezig`);
  else fail(`SVG ${idx}: aria-label ontbreekt of leeg`);
  // viewBox breedte 560
  const vb = (svg.match(/viewBox="([^"]*)"/) || [])[1];
  if (vb) {
    const parts = vb.trim().split(/\s+/).map(Number);
    if (parts.length === 4 && parts[2] === 560) ok(`SVG ${idx}: viewBox breedte 560 (${vb})`);
    else fail(`SVG ${idx}: viewBox breedte != 560 (${vb})`);
  } else fail(`SVG ${idx}: geen viewBox`);
  // kleuren: alle hex-codes en niet-toegestane keyword-fills/strokes
  const hexes = new Set([...svg.matchAll(/#[0-9A-Fa-f]{3,8}\b/g)].map(m => m[0].toUpperCase()));
  const badHex = [...hexes].filter(h => !ALLOWED.has(h));
  if (!badHex.length) ok(`SVG ${idx}: alleen toegestane hex-kleuren`);
  else fail(`SVG ${idx}: niet-toegestane kleuren ${badHex.join(", ")}`);
  for (const m of svg.matchAll(/(fill|stroke)="([^"]*)"/g)) {
    const v = m[2];
    if (v === "none" || v.startsWith("#")) continue;
    fail(`SVG ${idx}: ${m[1]}="${v}" is geen hex of none`);
  }
  // well-formedness: quotes per tag + tag-balans
  let wf = true;
  const tagRe = /<\/?([A-Za-z][\w:-]*)((?:[^"'>]|"[^"]*"|'[^']*')*?)(\/?)>/g;
  const stack = [];
  let pos = 0, mm;
  while ((mm = tagRe.exec(svg)) !== null) {
    // tekst tussen tags mag geen losse < bevatten
    const tussen = svg.slice(pos, mm.index);
    if (tussen.includes("<")) { fail(`SVG ${idx}: losse '<' in tekst nabij "${tussen.slice(0,40)}"`); wf = false; }
    pos = tagRe.lastIndex;
    const [, naamTag, attrs, selfClose] = mm;
    // attribuut-check: alles moet naam="waarde" zijn
    const attrRest = attrs.replace(/\s+[\w:-]+="[^"]*"/g, "").trim();
    if (attrRest) { fail(`SVG ${idx}: rare attributen in <${naamTag}>: "${attrRest}"`); wf = false; }
    if (mm[0].startsWith("</")) {
      const open = stack.pop();
      if (open !== naamTag) { fail(`SVG ${idx}: sluittag </${naamTag}> matcht niet met <${open}>`); wf = false; }
    } else if (!selfClose) {
      stack.push(naamTag);
    }
  }
  if (svg.slice(pos).trim()) { fail(`SVG ${idx}: tekst na laatste tag`); wf = false; }
  if (stack.length) { fail(`SVG ${idx}: niet-gesloten tags: ${stack.join(", ")}`); wf = false; }
  // unbalanced quotes overall
  if ((svg.match(/"/g) || []).length % 2 !== 0) { fail(`SVG ${idx}: oneven aantal dubbele quotes`); wf = false; }
  if (wf) ok(`SVG ${idx}: well-formed (${naam})`);
});

/* ---- (7) links ---- */
const hrefs = [...allHtml.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
const uniqHrefs = [...new Set(hrefs)];
const allowedExternalPrefixes = ["https://aimetmax.nl", "https://linkedin.com/in/maxbroek", "https://www.linkedin.com/in/maxbroek"];
uniqHrefs.forEach(h => {
  if (h.startsWith("/academy/")) {
    const f = path.join(ACADEMY, h.replace("/academy/", ""));
    if (fs.existsSync(f)) ok(`link ${h} -> bestand bestaat`);
    else fail(`link ${h} -> bestand ontbreekt (${f})`);
  } else if (allowedExternalPrefixes.some(p => h === p || h.startsWith(p + "/"))) {
    ok(`externe link ${h} toegestaan`);
  } else {
    fail(`onverwachte link: ${h}`);
  }
});

console.log("");
if (fails) { console.log(`RESULTAAT: ${fails} probleem/problemen`); process.exit(1); }
console.log("RESULTAAT: alles groen");
