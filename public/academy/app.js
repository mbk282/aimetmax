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
          }
        });
      });
      quizEl.appendChild(q);
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

  toon(0);
})();
