/* Gedeelde renderer voor academy-modules.
   Een module-bestand definieert window.MODULE = {
     kicker, titel, sub,
     lessen: [{ sectie?, kicker, titel, navTitel?, html, quiz?: true }],
     quiz: [{ s, antwoord, uitleg }]
   }
   en laadt daarna dit script. */

(function () {
  const M = window.MODULE;
  document.title = M.titel + " | AI met Max";

  // ---- opslag (localStorage, mag stilletjes falen in privacy-modus) ----
  const opslagKey = "academy-" + M.titel.toLowerCase().replace(/\s+/g, "-");
  function leesOpslag() {
    try { return JSON.parse(localStorage.getItem(opslagKey)) || {}; } catch (e) { return {}; }
  }
  function schrijfOpslag(data) {
    try { localStorage.setItem(opslagKey, JSON.stringify(data)); } catch (e) {}
  }
  const opslag = leesOpslag();

  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function datumNL(iso) {
    try { return new Date(iso).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" }); }
    catch (e) { return ""; }
  }

  // ---- sidebar opbouwen ----
  document.getElementById("m-kicker").textContent = M.kicker;
  document.getElementById("m-titel").textContent = M.titel;
  document.getElementById("m-sub").textContent = M.sub;

  const nav = document.getElementById("nav");
  const main = document.getElementById("main");
  const bar = document.getElementById("bar");
  const barlabel = document.getElementById("barlabel");
  const bezocht = new Set();
  const navknoppen = [];

  M.lessen.forEach((les, i) => {
    if (les.sectie) {
      const s = document.createElement("div");
      s.className = "nav-sectie";
      s.textContent = les.sectie;
      nav.appendChild(s);
    }
    const b = document.createElement("button");
    b.innerHTML = `<span class="dot">${i + 1}</span><span>${les.navTitel || les.titel}</span>`;
    b.addEventListener("click", () => toon(i));
    nav.appendChild(b);
    navknoppen.push(b);

    const sec = document.createElement("section");
    sec.className = "lesson";
    sec.innerHTML = `<div class="kicker">${les.kicker}</div><h1>${les.titel}</h1>` + les.html;

    const pager = document.createElement("div");
    pager.className = "pager";
    const vorige = document.createElement("button");
    vorige.className = "btn";
    vorige.textContent = "← Vorige";
    if (i === 0) vorige.disabled = true;
    vorige.addEventListener("click", () => toon(i - 1));
    const volgende = document.createElement("button");
    volgende.className = "btn primary";
    volgende.textContent = i === M.lessen.length - 1 ? "Klaar! 🎉" : "Volgende les →";
    volgende.addEventListener("click", () => toon(i === M.lessen.length - 1 ? 0 : i + 1));
    pager.append(vorige, volgende);
    sec.appendChild(pager);
    main.appendChild(sec);
  });

  const lesSecties = main.querySelectorAll(".lesson");

  function toon(i) {
    bezocht.add(i);
    opslag.bezocht = Array.from(bezocht);
    schrijfOpslag(opslag);
    lesSecties.forEach((l, j) => l.classList.toggle("visible", j === i));
    navknoppen.forEach((b, j) => {
      b.classList.toggle("active", j === i);
      b.classList.toggle("done", bezocht.has(j));
      if (bezocht.has(j)) b.querySelector(".dot").textContent = "✓";
    });
    bar.style.width = (bezocht.size / M.lessen.length * 100) + "%";
    barlabel.textContent = `${bezocht.size} van ${M.lessen.length} lessen`;
    window.scrollTo({ top: 0 });
  }

  // ---- quiz ----
  const quizEl = document.getElementById("quiz");
  if (quizEl && M.quiz) {
    let beantwoord = 0, goed = 0;
    const scoreEl = document.getElementById("score");

    // Eerder resultaat tonen (quiz blijft opnieuw speelbaar)
    if (opslag.quiz && typeof opslag.quiz.score === "number") {
      const eerder = document.createElement("div");
      eerder.className = "note";
      eerder.textContent = `Eerder gehaald: ${opslag.quiz.score} van ${opslag.quiz.totaal} goed op ${datumNL(opslag.quiz.datum)}.`;
      quizEl.parentNode.insertBefore(eerder, quizEl);
    }

    M.quiz.forEach((v, i) => {
      const q = document.createElement("div");
      q.className = "q";
      q.innerHTML = `<div class="stelling">${i + 1}. ${v.s}</div>
        <div class="opties"><button data-keuze="true">Waar</button><button data-keuze="false">Niet waar</button></div>
        <div class="uitleg">${v.uitleg}</div>`;
      q.querySelectorAll(".opties button").forEach(btn => {
        btn.addEventListener("click", () => {
          const correct = (btn.dataset.keuze === "true") === v.antwoord;
          q.classList.add("beantwoord", correct ? "goed" : "fout");
          btn.classList.add("gekozen");
          beantwoord++; if (correct) goed++;
          if (beantwoord === M.quiz.length) {
            scoreEl.style.display = "block";
            scoreEl.textContent = goed === M.quiz.length
              ? `${goed} van ${M.quiz.length} goed. Foutloos!`
              : `${goed} van ${M.quiz.length} goed. ${goed >= M.quiz.length - 2 ? "Prima score!" : "Loop de lessen nog eens door, dan zit het zo."}`;
            opslag.quiz = { score: goed, totaal: M.quiz.length, datum: new Date().toISOString() };
            schrijfOpslag(opslag);
            toonCertificaatBlok(goed, M.quiz.length);
          }
        });
      });
      quizEl.appendChild(q);
    });
  }

  // ---- certificaat na de quiz ----
  function toonCertificaatBlok(score, totaal) {
    if (document.querySelector(".certificaat-blok")) return;
    const blok = document.createElement("div");
    blok.className = "certificaat-blok";
    blok.innerHTML = `
      <p>Mooi werk. Zet je naam op je certificaat van afronding.</p>
      <div class="cert-formulier">
        <input type="text" class="cert-naam-invoer" placeholder="Je naam" aria-label="Je naam">
        <button type="button" class="btn primary cert-maak">Maak je certificaat</button>
      </div>
      <div class="cert-uitkomst"></div>`;
    const scoreNode = document.getElementById("score");
    scoreNode.parentNode.insertBefore(blok, scoreNode.nextSibling);

    const invoer = blok.querySelector(".cert-naam-invoer");
    const uitkomst = blok.querySelector(".cert-uitkomst");
    blok.querySelector(".cert-maak").addEventListener("click", () => {
      const naam = invoer.value.trim();
      if (!naam) { invoer.focus(); return; }
      const datum = new Date().toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
      uitkomst.innerHTML = `
        <div class="certificaat">
          <div class="cert-accentlijn"></div>
          <div class="cert-kop hand">Certificaat van afronding</div>
          <div class="cert-naam">${escapeHtml(naam)}</div>
          <p class="cert-tekst">heeft de e-learning '${M.titel}' afgerond</p>
          <p class="cert-resultaat">Resultaat afsluittoets: ${score} van ${totaal} vragen goed<br>${datum}</p>
          <p class="cert-wet">Deze e-learning ondersteunt de invulling van de AI-geletterdheidsplicht (artikel 4 AI-verordening).</p>
          <div class="cert-accentlijn"></div>
          <div class="cert-colofon">AI met Max academy &middot; aimetmax.nl/academy &middot; door Max van den Broek, auteur van AI-Pionier</div>
        </div>
        <div class="cert-acties"><button type="button" class="btn cert-print">Print of bewaar als PDF</button></div>`;
      uitkomst.querySelector(".cert-print").addEventListener("click", () => {
        document.body.classList.add("print-certificaat");
        const opruimen = () => document.body.classList.remove("print-certificaat");
        window.addEventListener("afterprint", opruimen, { once: true });
        setTimeout(opruimen, 3000);
        window.print();
      });
    });
  }

  // ---- interactieve woordvoorspel-demo ----
  const demoEl = document.getElementById("demo-voorspel");
  if (demoEl && M.demoBoom) {
    const zinEl = demoEl.querySelector(".zin");
    const voorspEl = demoEl.querySelector(".voorspellingen");
    const klaarEl = demoEl.querySelector(".demo-klaar");
    let pad = [];

    function render() {
      let node = M.demoBoom;
      pad.forEach(w => { node = node.volgende[w]; });
      zinEl.innerHTML = M.demoStart + pad.map(w => ` <span class="nieuw">${w}</span>`).join("");
      voorspEl.innerHTML = "";
      klaarEl.textContent = "";
      if (!node.volgende) {
        klaarEl.textContent = node.slot || "En zo bouwt het model woord voor woord een antwoord.";
        return;
      }
      Object.entries(node.volgende).forEach(([woord, kind]) => {
        const b = document.createElement("button");
        b.innerHTML = `<span class="woord">${woord}</span><span class="balk" style="width:${kind.p * 2.6}px"></span><span class="pct">${kind.p}%</span>`;
        b.addEventListener("click", () => { pad.push(woord); render(); });
        voorspEl.appendChild(b);
      });
    }
    demoEl.querySelector(".demo-reset").addEventListener("click", () => { pad = []; render(); });
    render();
  }

  // ---- interactieve tokenizer-demo ----
  const tokEl = document.getElementById("demo-tokens");
  if (tokEl) {
    const invoer = tokEl.querySelector(".tok-invoer");
    const chips = tokEl.querySelector(".tok-chips");
    const teller = tokEl.querySelector(".tok-teller");
    const kleuren = ["var(--accent-soft)", "var(--sage-soft)", "var(--hl)"];

    // Knip een woord van 6+ tekens deterministisch in stukken van 3-4 tekens.
    function knip(woord) {
      if (woord.length < 6) return [woord];
      const drieen = (4 - (woord.length % 4)) % 4;
      const vieren = (woord.length - drieen * 3) / 4;
      const stukken = [];
      let pos = 0;
      for (let i = 0; i < vieren; i++) { stukken.push(woord.slice(pos, pos + 4)); pos += 4; }
      for (let i = 0; i < drieen; i++) { stukken.push(woord.slice(pos, pos + 3)); pos += 3; }
      return stukken;
    }

    function renderTokens() {
      const tekst = invoer.value;
      const delen = tekst.match(/[0-9A-Za-zÀ-ɏ]+|[^\s0-9A-Za-zÀ-ɏ]/g) || [];
      const tokens = [];
      delen.forEach(d => {
        if (/[0-9A-Za-zÀ-ɏ]/.test(d)) knip(d).forEach(t => tokens.push(t));
        else tokens.push(d);
      });
      chips.innerHTML = "";
      tokens.forEach((t, i) => {
        const s = document.createElement("span");
        s.textContent = t;
        s.style.background = kleuren[i % kleuren.length];
        chips.appendChild(s);
      });
      teller.textContent = tokens.length + " tokens · " + tekst.length + " tekens";
    }
    invoer.addEventListener("input", renderTokens);
    renderTokens();
  }

  // ---- voortgang herstellen uit eerdere sessie ----
  if (Array.isArray(opslag.bezocht)) {
    opslag.bezocht.forEach(i => {
      if (Number.isInteger(i) && i >= 0 && i < M.lessen.length) bezocht.add(i);
    });
  }

  toon(0);
})();
