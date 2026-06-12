/* Module: Hoe AI echt werkt
   Deel 1: hoe werkt een taalmodel (regels vs. patronen, tokens, next-token prediction)
   Deel 2: waarom AI zo snel beter wordt (de stier-verhaallijn)
   Deel 3: vijf misverstanden (goedgekeurde teksten uit lessen-voor-circle.md)
   Verwacht app.js als renderer. */

(function () {

  /* ============================================================
     SVG-helpers: de stier en de capability-grafiek
     Stijl: fineliner-schets, stroke #2A2A2A, wiebelige paden,
     vullingen #FFFDF8 / #FBE3D4 / #FFE8A3 / #DCEAE5,
     accenten #E8590C en #4C8577, labels in Caveat.
     ============================================================ */

  // Basis-stier (lokale coordinaten, hoeven rond y 206-210, breedte ca. x 48-332)
  const STIER_BASIS = `
    <path d="M86 56 C 70 48, 60 30, 70 12 C 74 28, 84 40, 98 48 Z" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M140 54 C 156 46, 166 28, 156 10 C 152 26, 142 38, 128 46 Z" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M78 64 C 66 58, 56 60, 50 68 C 58 74, 68 74, 78 70 Z" fill="#FBE3D4" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M148 62 C 160 56, 170 58, 176 66 C 168 72, 158 72, 148 68 Z" fill="#FBE3D4" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M142 98 C 150 80, 196 72, 240 76 C 280 80, 304 100, 306 130 C 308 156, 290 172, 258 176 C 220 180, 178 178, 158 166 C 142 156, 136 124, 142 98 Z" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M236 96 C 258 92, 274 104, 270 122 C 266 138, 244 142, 232 130 C 222 118, 224 100, 236 96 Z" fill="#FBE3D4"/>
    <path d="M304 116 C 322 110, 332 122, 328 140" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M328 138 c 9 1, 10 14, 0 15 c -9 1, -10 -13, 0 -15 Z" fill="#E8590C" stroke="#2A2A2A" stroke-width="2.5"/>
    <path d="M172 176 L 170 206" stroke="#2A2A2A" stroke-width="5" stroke-linecap="round"/>
    <path d="M198 178 L 197 208" stroke="#2A2A2A" stroke-width="5" stroke-linecap="round"/>
    <path d="M252 178 L 252 208" stroke="#2A2A2A" stroke-width="5" stroke-linecap="round"/>
    <path d="M282 174 L 284 206" stroke="#2A2A2A" stroke-width="5" stroke-linecap="round"/>
    <path d="M163 208 l 14 0" stroke="#2A2A2A" stroke-width="8" stroke-linecap="round"/>
    <path d="M190 210 l 14 0" stroke="#2A2A2A" stroke-width="8" stroke-linecap="round"/>
    <path d="M245 210 l 14 0" stroke="#2A2A2A" stroke-width="8" stroke-linecap="round"/>
    <path d="M277 208 l 14 0" stroke="#2A2A2A" stroke-width="8" stroke-linecap="round"/>
    <path d="M114 50 C 138 50, 152 66, 150 88 C 148 110, 134 122, 113 122 C 92 122, 76 108, 76 86 C 76 64, 90 50, 114 50 Z" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3.5"/>
    <circle cx="100" cy="82" r="4" fill="#2A2A2A"/>
    <circle cx="128" cy="82" r="4" fill="#2A2A2A"/>
    <path d="M113 94 C 132 94, 142 102, 140 112 C 138 122, 126 127, 113 127 C 100 127, 88 121, 87 111 C 86 101, 95 94, 113 94 Z" fill="#FBE3D4" stroke="#2A2A2A" stroke-width="3"/>
    <circle cx="104" cy="110" r="2.5" fill="#2A2A2A"/>
    <circle cx="122" cy="110" r="2.5" fill="#2A2A2A"/>
    <path d="M109 126 c 0 8, 9 8, 9 0" stroke="#E8590C" stroke-width="3" fill="none" stroke-linecap="round"/>`;

  function stierGroep(tx, ty, s, props) {
    return `<g transform="translate(${tx} ${ty}) scale(${s})">${STIER_BASIS}${props || ""}</g>`;
  }

  function stropdas(kleur) {
    return `<path d="M106 128 L 113 137 L 120 128 L 113 123 Z" fill="${kleur}" stroke="#2A2A2A" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M113 137 L 103 166 L 113 179 L 123 166 Z" fill="${kleur}" stroke="#2A2A2A" stroke-width="2.5" stroke-linejoin="round"/>`;
  }

  const GROND = `<path d="M36 214 C 150 209, 420 217, 526 211" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>`;

  function faseLabel(tekst) {
    return `<text x="36" y="38" font-family="Caveat, cursive" font-size="26" fill="#5A5550">${tekst}</text>`;
  }

  function stier(fase) {
    const open = (label) => `<svg viewBox="0 0 560 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">${GROND}`;
    const dicht = `</svg>`;

    if (fase === 1) {
      const spieren = `
        <path d="M156 92 C 164 76, 184 74, 194 86 M200 84 C 210 68, 232 68, 242 82 M248 84 C 258 72, 276 76, 284 90" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M152 112 C 140 116, 138 132, 148 140 M300 110 C 312 116, 314 132, 304 140" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>`;
      return open("Schets van een overdreven gespierde cartoon-stier") +
        faseLabel("GPT-3 (2020)") +
        stierGroep(90, 0, 1, spieren) +
        `<g stroke="#E8590C" stroke-width="3" stroke-linecap="round">
          <path d="M62 76 l 12 8"/><path d="M54 104 l 14 2"/>
          <path d="M496 84 l -12 8"/><path d="M504 112 l -14 2"/>
        </g>
        <g stroke="#2A2A2A" stroke-width="3">
          <path d="M448 198 l 60 0" stroke-width="4" stroke-linecap="round"/>
          <rect x="438" y="184" width="11" height="28" rx="3" fill="#4C8577"/>
          <rect x="507" y="184" width="11" height="28" rx="3" fill="#4C8577"/>
        </g>` + dicht;
    }

    if (fase === 2) {
      return open("Schets van de stier met een trainer die een belletje en een beloning vasthoudt") +
        faseLabel("RLHF (eind 2022)") +
        stierGroep(14, 18, 0.92) +
        `<circle cx="430" cy="86" r="20" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3.5"/>
        <circle cx="424" cy="83" r="2.5" fill="#2A2A2A"/><circle cx="437" cy="83" r="2.5" fill="#2A2A2A"/>
        <path d="M424 94 C 428 98, 434 98, 438 94" stroke="#2A2A2A" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M430 106 L 428 168" stroke="#2A2A2A" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M428 168 L 414 210 M428 168 L 444 210" stroke="#2A2A2A" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M429 120 C 408 118, 392 110, 382 98" stroke="#2A2A2A" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <path d="M362 92 C 362 74, 386 74, 386 92 L 391 99 L 357 99 Z" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
        <circle cx="374" cy="104" r="3.5" fill="#2A2A2A"/>
        <g stroke="#E8590C" stroke-width="2.5" stroke-linecap="round">
          <path d="M348 72 l -10 -8"/><path d="M398 70 l 10 -8"/><path d="M344 88 l -12 0"/>
        </g>
        <path d="M431 120 C 452 124, 466 134, 472 146" stroke="#2A2A2A" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <circle cx="478" cy="155" r="10" fill="#E8590C" stroke="#2A2A2A" stroke-width="2.5"/>
        <path d="M478 145 c 2 -5, 6 -7, 10 -7" stroke="#4C8577" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <text x="402" y="46" font-family="Caveat, cursive" font-size="23" fill="#4C8577">goed zo!</text>` + dicht;
    }

    if (fase === 3) {
      return open("Schets van de stier in een schoolbankje met pen en papier, nadenkend over een rekensom") +
        faseLabel("Reasoning (eind 2024)") +
        stierGroep(186, 18, 0.92) +
        `<path d="M64 158 L 306 152 L 308 166 L 66 172 Z" fill="#FBE3D4" stroke="#2A2A2A" stroke-width="3.5" stroke-linejoin="round"/>
        <path d="M86 172 L 82 212 M288 166 L 292 210" stroke="#2A2A2A" stroke-width="3.5" stroke-linecap="round"/>
        <g transform="rotate(-3 170 145)">
          <rect x="116" y="120" width="112" height="34" rx="4" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="2.5"/>
          <text x="126" y="144" font-family="Caveat, cursive" font-size="21" fill="#2A2A2A">3x2=6   2x4=8</text>
        </g>
        <path d="M240 140 l 34 -10" stroke="#E8590C" stroke-width="5" stroke-linecap="round"/>
        <path d="M274 130 l 11 -5 l -6 11 Z" fill="#2A2A2A"/>
        <path d="M330 62 C 326 38, 350 28, 380 28 L 472 26 C 498 26, 510 40, 508 56 C 506 74, 492 82, 470 82 L 392 84 C 368 84, 332 80, 330 62 Z" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3"/>
        <circle cx="324" cy="96" r="6" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="2.5"/>
        <circle cx="314" cy="108" r="3.5" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="2.5"/>
        <text x="350" y="64" font-family="Caveat, cursive" font-size="25" fill="#2A2A2A">eerst 6, dan 8, samen 14</text>` + dicht;
    }

    if (fase === 4) {
      const riem = `
        <path d="M146 138 C 192 154, 252 156, 300 140" stroke="#4C8577" stroke-width="11" fill="none" stroke-linecap="round"/>
        <rect x="212" y="142" width="18" height="15" rx="3" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="2.5"/>
        <rect x="166" y="148" width="26" height="11" rx="3" fill="#2A2A2A"/>
        <path d="M179 159 L 176 186" stroke="#2A2A2A" stroke-width="4" stroke-linecap="round"/>
        <rect x="258" y="150" width="10" height="16" rx="3" fill="#E8590C" stroke="#2A2A2A" stroke-width="2"/>
        <path d="M263 166 L 263 188" stroke="#2A2A2A" stroke-width="3.5" stroke-linecap="round"/>`;
      return open("Schets van de stier met een gereedschapsriem en een open laptop") +
        faseLabel("Tools (2025)") +
        stierGroep(76, 0, 1, riem) +
        `<path d="M66 198 L 150 198 L 158 214 L 58 214 Z" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
        <rect x="74" y="154" width="70" height="44" rx="5" fill="#DCEAE5" stroke="#2A2A2A" stroke-width="3"/>
        <text x="83" y="182" font-family="Caveat, cursive" font-size="18" fill="#2A2A2A">zoek, reken...</text>
        <circle cx="478" cy="84" r="17" fill="#DCEAE5" stroke="#2A2A2A" stroke-width="3"/>
        <path d="M490 97 l 17 17" stroke="#2A2A2A" stroke-width="4.5" stroke-linecap="round"/>
        <g stroke="#E8590C" stroke-width="2.5" stroke-linecap="round">
          <path d="M448 52 l 8 6"/><path d="M508 56 l -8 6"/>
        </g>` + dicht;
    }

    if (fase === 5) {
      const speelgoedHamer = `
        <path d="M356 198 l 0 14" stroke="#2A2A2A" stroke-width="3.5" stroke-linecap="round"/>
        <rect x="346" y="189" width="20" height="10" rx="4" fill="#E8590C" stroke="#2A2A2A" stroke-width="2"/>`;
      const blokken = `
        <rect x="490" y="198" width="14" height="14" rx="2" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="2"/>
        <rect x="507" y="198" width="14" height="14" rx="2" fill="#DCEAE5" stroke="#2A2A2A" stroke-width="2"/>
        <rect x="498" y="184" width="14" height="14" rx="2" fill="#FBE3D4" stroke="#2A2A2A" stroke-width="2"/>`;
      return open("Schets van een grote stier met twee kalfjes die met speelgoedgereedschap spelen") +
        faseLabel("Tool-native (eind 2025)") +
        stierGroep(4, 32, 0.85) +
        stierGroep(296, 116, 0.45) +
        stierGroep(404, 122, 0.42) +
        speelgoedHamer + blokken + dicht;
    }

    if (fase === 6) {
      const helm = `
        <path d="M80 52 C 80 28, 146 28, 146 52 Z" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
        <path d="M72 54 L 154 51" stroke="#2A2A2A" stroke-width="3.5" stroke-linecap="round"/>`;
      const bril = `
        <g stroke="#2A2A2A" stroke-width="2.5" fill="none">
          <circle cx="100" cy="82" r="9"/><circle cx="128" cy="82" r="9"/><path d="M109 82 L 119 82"/>
        </g>`;
      return open("Schets van drie stieren met stropdassen, helm, bril en koffertje, als een kleine organisatie") +
        `<text x="44" y="32" font-family="Caveat, cursive" font-size="22" fill="#5A5550">de planner</text>
        <text x="258" y="32" font-family="Caveat, cursive" font-size="22" fill="#5A5550">de bouwer</text>
        <text x="438" y="32" font-family="Caveat, cursive" font-size="22" fill="#5A5550">de checker</text>` +
        stierGroep(-16, 101, 0.52, stropdas("#E8590C")) +
        stierGroep(178, 80, 0.62, stropdas("#4C8577") + helm) +
        stierGroep(378, 101, 0.52, stropdas("#FFE8A3") + bril) +
        `<rect x="142" y="180" width="34" height="26" rx="5" fill="#FBE3D4" stroke="#2A2A2A" stroke-width="3"/>
        <path d="M152 180 c 0 -8, 14 -8, 14 0" stroke="#2A2A2A" stroke-width="3" fill="none"/>` + dicht;
    }

    return "";
  }

  // Capability-grafiek. n = aantal gelabelde stappen (0 = alleen de vraag, 6 = terugblik met alles).
  function grafiek(n) {
    const punten = [[80, 238], [152, 214], [224, 184], [296, 150], [368, 114], [440, 76]];
    const namen = ["GPT-3", "ChatGPT", "reasoning", "tools", "tool-native", "multi-agent"];
    const naamPos = [[52, 218], [128, 246], [180, 162], [282, 182], [318, 92], [414, 108]];
    const jaren = ["2020", "2022", "2024", "2025", "2025", "2026"];

    const assen = `<path d="M56 36 C 54 110, 56 200, 58 262 L 528 266" stroke="#2A2A2A" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <text x="44" y="26" font-family="Caveat, cursive" font-size="22" fill="#5A5550">wat AI kan</text>
      <text x="492" y="292" font-family="Caveat, cursive" font-size="22" fill="#5A5550">tijd</text>`;
    const curve = `<path d="M80 238 C 104 232, 128 224, 152 214 C 176 204, 200 195, 224 184 C 248 173, 272 162, 296 150 C 320 138, 344 126, 368 114 C 392 102, 416 88, 440 76 C 454 68, 464 62, 474 56" stroke="#2A2A2A" stroke-width="4" fill="none" stroke-linecap="round"/>`;

    let extra = "";
    if (n === 0) {
      extra = `
        <path d="M110 230 C 220 210, 320 168, 408 102" stroke="#E8590C" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M414 97 L 398 102 M414 97 L 408 113" stroke="#E8590C" stroke-width="5" stroke-linecap="round"/>
        <text x="428" y="88" font-family="Caveat, cursive" font-size="58" fill="#E8590C">?</text>
        <text x="170" y="158" font-family="Caveat, cursive" font-size="27" fill="#E8590C" transform="rotate(-19 170 158)">hoe dan?</text>
        <text x="66" y="288" font-family="Caveat, cursive" font-size="19" fill="#5A5550">2020</text>
        <text x="424" y="288" font-family="Caveat, cursive" font-size="19" fill="#5A5550">2026</text>`;
    } else {
      const aantal = Math.min(n, 6);
      for (let i = 0; i < aantal; i++) {
        extra += `<circle cx="${punten[i][0]}" cy="${punten[i][1]}" r="5.5" fill="#4C8577" stroke="#2A2A2A" stroke-width="2.5"/>
          <text x="${naamPos[i][0]}" y="${naamPos[i][1]}" font-family="Caveat, cursive" font-size="21" fill="#2A2A2A">${namen[i]}</text>
          <text x="${punten[i][0] - 16}" y="288" font-family="Caveat, cursive" font-size="17" fill="#5A5550">${jaren[i]}</text>`;
      }
      extra += `
        <path d="M446 72 C 466 60, 482 48, 496 36" stroke="#E8590C" stroke-width="4" fill="none" stroke-linecap="round" stroke-dasharray="2 9"/>
        <text x="504" y="44" font-family="Caveat, cursive" font-size="44" fill="#E8590C">?</text>`;
    }

    return `<svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van een grafiek waarin de capaciteiten van AI-modellen steeds verder stijgen">${assen}${curve}${extra}</svg>`;
  }

  function illu(svg, caption) {
    return `<div class="illu">${svg}<div class="illu-caption">${caption}</div></div>`;
  }

  /* ============================================================
     De module
     ============================================================ */

  window.MODULE = {
    kicker: "Gratis e-learning",
    titel: "Hoe AI echt werkt",
    sub: "Hoe een taalmodel werkt, waarom AI zo snel beter wordt, plus vijf misverstanden die je nooit meer mag zeggen. Door Max van den Broek, auteur van AI-Pionier.",

    demoStart: "De vergadering van maandag is",
    demoBoom: {
      volgende: {
        "verplaatst": { p: 55, volgende: {
          "naar": { p: 62, volgende: {
            "dinsdag": { p: 48, slot: "De meest waarschijnlijke zin is meestal ook de saaiste. Daarom voelt AI-tekst soms zo voorspelbaar." },
            "woensdag": { p: 29, slot: "Ook prima. Het model kiest niet altijd de topkandidaat, er zit bewust wat variatie in." },
            "2031": { p: 2, slot: "Onwaarschijnlijk, maar niet onmogelijk. Lage kansen worden zelden gekozen, niet nooit." }
          } },
          "vanwege": { p: 23, volgende: {
            "ziekte": { p: 44, slot: "Klinkt als duizend mails die het model in zijn training zag. Precies daarom is de kans hoog." },
            "drukte": { p: 31, slot: "Herkenbaar excuus, hoge kans. Het model kent kantoorleven beter dan menig manager." },
            "taart": { p: 3, slot: "Een vergadering verzetten vanwege taart. Lage kans, hoge wenselijkheid." }
          } },
          "zonder": { p: 8, volgende: {
            "agenda": { p: 52, slot: "Verplaatst zonder agenda. Het model heeft duidelijk echte organisaties gezien." },
            "reden": { p: 33, slot: "Zonder reden verplaatst. Ook deze frustratie zat ruimschoots in de trainingsdata." },
            "stoelen": { p: 6, slot: "Zonder stoelen. Vreemd, maar grammaticaal klopt het. Meer eist een taalmodel niet." }
          } }
        } },
        "uitgelopen": { p: 30, volgende: {
          "tot": { p: 46, volgende: {
            "vijf": { p: 41, slot: "Uitgelopen tot vijf. Statistisch waarschijnlijk en herkenbaar. Zo bouwt het model hele teksten." },
            "halfzes": { p: 33, slot: "Halfzes. Het model voorspelt gewoon door, woord voor woord, tot de zin af is." },
            "woensdag": { p: 4, slot: "Een vergadering die tot woensdag duurt. Kleine kans. Helaas niet nul." }
          } },
          "zoals": { p: 28, volgende: {
            "gebruikelijk": { p: 64, slot: "Zoals gebruikelijk. Hoe vaker een patroon voorkomt in de trainingsdata, hoe hoger de kans." },
            "verwacht": { p: 27, slot: "Zoals verwacht. Net als deze voorspelling zelf." },
            "gepland": { p: 5, slot: "Uitgelopen zoals gepland. Iemand heeft dit blijkbaar ingecalculeerd." }
          } },
          "in": { p: 9, volgende: {
            "chaos": { p: 38, slot: "Uitgelopen in chaos. Dramatisch, maar het komt in geschreven teksten vaker voor dan je hoopt." },
            "tranen": { p: 12, slot: "In tranen. Onwaarschijnlijker, maar het model heeft ook romans gelezen." },
            "recordtijd": { p: 9, slot: "Een vergadering die in recordtijd uitloopt. Taalkundig prima, logisch twijfelachtig." }
          } }
        } },
        "geheim": { p: 4, volgende: {
          "verklaard": { p: 40, slot: "Geheim verklaard. Een onwaarschijnlijk eerste woord geeft meteen een heel ander soort zin." },
          "gebleven": { p: 35, slot: "Geheim gebleven. Kies je een zeldzaam woord, dan stuur je de hele rest van de tekst bij." },
          "gehouden": { p: 18, slot: "Geheim gehouden. Spannender dan de werkelijkheid van de meeste maandagvergaderingen." }
        } }
      }
    },

    lessen: [

      /* ========== START ========== */
      {
        sectie: "Start",
        kicker: "Welkom",
        titel: "Welkom. Je hoeft geen techneut te zijn.",
        navTitel: "Welkom",
        html: `
  <div class="illu"><svg viewBox="0 0 560 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van een auto met open motorkap, met tandwielen in het motorruim en een vraagteken erboven">
    <path d="M40 208 C 140 203, 420 212, 520 206" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M108 204 C 102 180, 104 158, 112 150 L 238 142 L 272 110 C 290 104, 372 102, 392 110 C 410 118, 426 132, 436 142 C 470 148, 482 166, 482 184 C 482 196, 474 203, 462 204 Z" stroke="#2A2A2A" stroke-width="3.5" fill="#FFFDF8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M278 114 L 252 144" stroke="#2A2A2A" stroke-width="3" stroke-linecap="round"/>
    <path d="M238 142 C 214 110, 184 86, 148 72 C 138 68, 130 72, 134 82 C 144 106, 170 130, 200 144 Z" stroke="#2A2A2A" stroke-width="3.5" fill="#FBE3D4" stroke-linejoin="round"/>
    <path d="M212 142 L 196 102" stroke="#2A2A2A" stroke-width="3" stroke-linecap="round"/>
    <g stroke="#2A2A2A" stroke-width="3" fill="#FFE8A3" stroke-linecap="round">
      <circle cx="160" cy="156" r="17"/>
      <circle cx="160" cy="156" r="5" fill="#2A2A2A"/>
      <path d="M160 134 l0 -7 M160 178 l0 7 M138 156 l-7 0 M182 156 l7 0 M145 141 l-5 -5 M175 171 l5 5 M175 141 l5 -5 M145 171 l-5 5"/>
      <circle cx="204" cy="166" r="12"/>
      <circle cx="204" cy="166" r="4" fill="#2A2A2A"/>
      <path d="M204 149 l0 -6 M204 183 l0 6 M187 166 l-6 0 M221 166 l6 0"/>
    </g>
    <path d="M150 206 c -2 -24, 34 -26, 34 -2 c 1 22, -33 25, -34 2 Z" stroke="#2A2A2A" stroke-width="3.5" fill="#FFFDF8"/>
    <path d="M388 206 c -2 -24, 34 -26, 34 -2 c 1 22, -33 25, -34 2 Z" stroke="#2A2A2A" stroke-width="3.5" fill="#FFFDF8"/>
    <g stroke="#E8590C" stroke-width="5" fill="none" stroke-linecap="round">
      <path d="M236 56 C 236 32, 276 30, 276 54 C 276 70, 256 70, 256 86"/>
      <path d="M256 100 l0 2"/>
    </g>
    <g stroke="#4C8577" stroke-width="3" stroke-linecap="round">
      <path d="M92 64 l0 16 M84 72 l16 0"/>
      <path d="M448 64 l0 12 M442 70 l12 0"/>
      <path d="M330 52 l0 10 M325 57 l10 0"/>
    </g>
  </svg>
  <div class="illu-caption">Vandaag kijken we onder de motorkap. Heel even maar.</div></div>

  <p>Iemand heeft je deze link gestuurd, of je kwam hier via aimetmax.nl. Welkom. Dit is een <mark>gratis e-learning</mark> over hoe AI echt werkt. Hij duurt ongeveer 35 minuten, je hoeft geen account aan te maken en er komt geen wiskunde in voor.</p>
  <p>Even voorstellen: ik ben Max van den Broek, auteur van <mark>AI-Pionier</mark> (Koninklijke Boom Uitgevers) en voormalig docent AI aan de Universiteit van Amsterdam. Tegenwoordig train ik teams in het slim gebruiken van AI.</p>
  <p>Wat je hier leert, in drie delen:</p>
  <p><strong>Deel 1:</strong> hoe een taalmodel werkt. Geen regels maar patronen, tokens, hoe AI naar je foto's kijkt, en het ene spel waar alles op draait.<br>
  <strong>Deel 2:</strong> waarom AI-modellen zo snel zoveel beter worden. Spoiler: het is niet wat de meeste mensen denken.<br>
  <strong>Deel 3:</strong> vijf hardnekkige misverstanden over AI, plus per misverstand de zin die je voortaan kunt zeggen.</p>
  <p>Aan het eind is er een quiz. Wie die haalt, praat scherper over AI dan de meeste mensen die er dagelijks mee werken. Echt waar.</p>
  <div class="leerdoelen">
    <div class="ld-kop">Na deze module kun je</div>
    <ul>
      <li>uitleggen waarom een taalmodel geen geprogrammeerde regels volgt maar patronen, en waarom dezelfde vraag daardoor vaak twee verschillende antwoorden oplevert</li>
      <li>uitleggen wat tokens zijn en wat dat betekent voor de contextlimiet, de kosten per vraag en het soms verkeerd tellen van letters</li>
      <li>herkennen welke beeldtaken je AI kunt toevertrouwen (beschrijven, uitlezen, structureren) en welke niet (maten, posities, precies tellen)</li>
      <li>de vijf trainingsdoorbraken benoemen die AI sinds 2020 zoveel beter maakten, en uitleggen waarom "meer trainingsdata" niet de verklaring is</li>
      <li>vijf veelgehoorde misverstanden over AI weerleggen, elk met één concrete zin</li>
    </ul>
  </div>
  <div class="note">Nieuw met AI, of wil je eerst weten wat er allemaal onder "AI" valt en wat AI-geletterdheid van je vraagt? Begin dan bij de startmodule <a href="/academy/module-wat-is-ai.html">Wat is AI?</a>. Deze module is ook prima los te volgen.</div>`
      },

      /* ========== DEEL 1: HOE WERKT EEN TAALMODEL ========== */
      {
        sectie: "Deel 1 · Hoe werkt een taalmodel?",
        kicker: "Deel 1 · De basis",
        titel: "Geen regels, maar patronen",
        navTitel: "Geen regels, maar patronen",
        html: `
  <p>Alle software die je kende tot een paar jaar geleden werkt hetzelfde: een programmeur schrijft regels, de computer voert ze uit. Je rekenmachine, je urenregistratie, je navigatie. Daarom geeft dezelfde invoer er ook <mark>altijd dezelfde uitvoer</mark>. Tik twee keer 7 x 6 in en je krijgt twee keer 42. Saai, maar betrouwbaar.</p>
  <p>Generatieve AI, de familie waar ChatGPT, Copilot en Gemini toe horen, zit anders in elkaar. <mark>Niemand heeft de regels geschreven.</mark> Het model heeft miljarden voorbeelden van tekst bekeken en daar zelf statistische patronen uit gehaald: welke woorden bij elkaar horen, hoe een zin loopt, hoe een excuusmail klinkt.</p>

  <div class="illu"><svg viewBox="0 0 560 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van een rekenmachine naast een stapel boeken met een opengeslagen boek erbovenop">
    <path d="M40 214 C 150 209, 420 217, 520 211" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M96 64 C 94 120, 95 170, 98 208 L 206 210 C 210 160, 209 110, 206 62 Z" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M110 76 L 194 75 L 195 102 L 111 104 Z" fill="#DCEAE5" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <text x="116" y="96" font-family="Caveat, cursive" font-size="20" fill="#2A2A2A">7 x 6 = 42</text>
    <g stroke="#2A2A2A" stroke-width="2.5">
      <rect x="110" y="118" width="22" height="18" rx="5" fill="#FBE3D4"/>
      <rect x="140" y="117" width="22" height="18" rx="5" fill="#FBE3D4"/>
      <rect x="170" y="118" width="22" height="18" rx="5" fill="#FBE3D4"/>
      <rect x="110" y="146" width="22" height="18" rx="5" fill="#FBE3D4"/>
      <rect x="140" y="145" width="22" height="18" rx="5" fill="#FFE8A3"/>
      <rect x="170" y="146" width="22" height="18" rx="5" fill="#FBE3D4"/>
      <rect x="110" y="174" width="22" height="18" rx="5" fill="#FBE3D4"/>
      <rect x="140" y="173" width="22" height="18" rx="5" fill="#FBE3D4"/>
      <rect x="170" y="174" width="22" height="18" rx="5" fill="#E8590C"/>
    </g>
    <text x="98" y="242" font-family="Caveat, cursive" font-size="24" fill="#5A5550">geprogrammeerd</text>
    <text x="260" y="142" font-family="Caveat, cursive" font-size="30" fill="#E8590C">vs</text>
    <path d="M340 208 L 500 206 L 498 178 L 342 181 Z" fill="#FBE3D4" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M352 180 L 492 177 L 490 150 L 354 153 Z" fill="#DCEAE5" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M346 152 L 486 149 L 484 122 L 348 125 Z" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M366 122 L 416 116 L 466 122 L 464 92 C 448 84, 430 86, 416 94 C 402 86, 384 84, 368 92 Z" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M416 94 L 416 116" stroke="#2A2A2A" stroke-width="2.5" stroke-linecap="round"/>
    <g stroke="#2A2A2A" stroke-width="2" stroke-linecap="round" opacity="0.5">
      <path d="M378 99 l 26 -3 M378 107 l 26 -3 M428 96 l 26 3 M428 104 l 26 3"/>
    </g>
    <g stroke="#4C8577" stroke-width="3" stroke-linecap="round">
      <path d="M496 92 l 0 12 M490 98 l 12 0"/>
      <path d="M330 96 l 0 10 M325 101 l 10 0"/>
    </g>
    <text x="382" y="242" font-family="Caveat, cursive" font-size="24" fill="#5A5550">heeft gelezen</text>
  </svg>
  <div class="illu-caption">Twee soorten slim: regels volgen, of heel veel gelezen hebben.</div></div>

  <p>Dat verschil verklaart meteen iets wat je misschien al opviel: stel dezelfde vraag twee keer en je krijgt vaak <mark>twee verschillende antwoorden</mark>. Geen bug, maar een direct gevolg van hoe het ding gemaakt is. Het volgt geen vast recept, het werkt met patronen en kansen.</p>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Een rekenmachine is geprogrammeerd. ChatGPT heeft gelezen."</p></div>
  <div class="oefen" id="oefen-herhaal">
    <div class="oefen-kop">Probeer het zelf</div>
    <p>Open je eigen AI-tool en stuur deze vraag twee keer achter elkaar, in twee losse gesprekken:</p>
    <div class="oefen-prompt"><code>Schrijf in twee zinnen een wervende slogan voor een nieuw type koffiebeker.</code><button class="kopieer" type="button">Kopieer</button></div>
    <details class="oefen-verwacht"><summary>Wat je waarschijnlijk ziet</summary><p>Twee verschillende slogans, terwijl je exact hetzelfde vroeg. Geen bug: het model werkt met kansen, niet met een vast recept. Bij een rekenmachine zou 7 x 6 altijd 42 geven; hier krijg je variatie. Goed om te weten als je reproduceerbaarheid nodig hebt.</p></details>
  </div>
  <p>Wat dat lezen precies inhoudt, en waarom het model jouw tekst heel anders ziet dan jij, dat is de volgende les.</p>`
      },
      {
        kicker: "Deel 1 · Tokens",
        titel: "AI leest geen woorden, maar tokens",
        navTitel: "Tokens, geen woorden",
        html: `
  <p>Voordat een taalmodel iets met je tekst doet, knipt het hem in stukjes. Die stukjes heten <mark>tokens</mark>. Een kort, veelvoorkomend woord is één token. Een lang of zeldzaam woord wordt in stukken geknipt: "netbeheerder" wordt voor het model iets als "net", "behee" en "rder".</p>
  <p>Probeer het zelf. Typ een eigen zin en kijk hoe hij opgeknipt wordt:</p>
  <div class="demo demo-tokens" id="demo-tokens">
    <div class="demo-label">Probeer zelf: wat ziet het model?</div>
    <input class="tok-invoer" type="text" value="Een netbeheerder analyseert laadpaaldata.">
    <div class="tok-chips"></div>
    <div class="tok-teller"></div>
  </div>
  <p class="muted">Deze demo knipt versimpeld, op woordlengte. Echte tokenizers knippen op basis van wat vaak voorkomt in de trainingsdata. Het idee is hetzelfde.</p>
  <p>Waarom moet je dit weten? Twee praktische redenen:</p>
  <p><strong>1. De context is begrensd.</strong> Een model kan maar een beperkt aantal tokens tegelijk overzien. Plak je een veel te lang document in de chat, dan valt er iets buiten de boot.</p>
  <p><strong>2. Je betaalt per token.</strong> Wie AI zakelijk inzet, rekent af per token, niet per vraag. Een lange lap tekst kost dus letterlijk meer dan een korte.</p>
  <div class="note"><strong>Leuke bijvangst:</strong> dit verklaart waarom AI soms de letters in een woord verkeerd telt. Het model ziet geen letters. Het ziet tokens.</div>

  <p>Het beroemdste voorbeeld: vraag aan een taalmodel hoeveel keer de letter <strong>r</strong> in "strawberry" zit. Lang gaven de meeste modellen vol overtuiging "twee" als antwoord. Tel zelf maar: st<strong>r</strong>aw<strong>b</strong>e<strong>rr</strong>y, dat zijn er <mark>drie</mark>. Het model zag geen losse letters, maar een paar tokens ("st", "raw", "berry"), en daarin zijn de r-en niet te tellen.</p>
  <div class="oefen" id="oefen-strawberry">
    <div class="oefen-kop">Probeer het zelf</div>
    <p>Open je eigen AI-tool (ChatGPT, Copilot, Claude, Gemini) en plak deze vraag:</p>
    <div class="oefen-prompt"><code>Hoeveel keer komt de letter r voor in het woord strawberry? Tel ze stuk voor stuk.</code><button class="kopieer" type="button">Kopieer</button></div>
    <details class="oefen-verwacht"><summary>Wat je waarschijnlijk ziet</summary><p>Moderne modellen hebben dit vaak afgeleerd of pakken er een telhulpje bij, dus grote kans dat het nu klopt. Vraag dan eens naar een lastiger woord, of vraag "hoeveel letters telt deze zin?". Zodra het mis gaat, weet je waarom: het model ziet tokens, geen letters. Door "tel ze stuk voor stuk" te vragen dwing je het bovendien tot kleine stapjes, en dat helpt (daarover meer in deel 2).</p></details>
  </div>`
      },
      {
        kicker: "Deel 1 · Beeld",
        titel: "En plaatjes? Ook stukjes",
        navTitel: "Hoe AI je foto ziet",
        html: `
  <p>Moderne AI-tools kunnen ook naar plaatjes kijken: upload een foto en stel er vragen over. Dat werkt vaak verrassend goed: een bonnetje uitlezen, een grafiek uitleggen, een foutmelding op een schermfoto ontcijferen, een whiteboard vol gekrabbel omzetten in nette notulen.</p>
  <p>Hoe kan een tekstvoorspeller dat? Met hetzelfde trucje als bij tekst: de foto wordt <mark>opgeknipt in stukjes</mark>, een soort beeld-tokens. Die stukjes gaan samen met jouw vraag het model in, en het model voorspelt gewoon weer woord voor woord een antwoord.</p>

  <div class="illu"><svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van een foto van een sleuf die in stukjes wordt geknipt, waarna het model vaag gokt hoe diep de sleuf is">
    <rect x="40" y="34" width="220" height="176" rx="8" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3.5"/>
    <path d="M52 122 L 116 120 M 184 118 L 248 118" stroke="#2A2A2A" stroke-width="3" stroke-linecap="round"/>
    <path d="M116 120 C 118 152, 120 174, 124 192 L 176 191 C 180 170, 182 148, 184 118" fill="#FBE3D4" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M124 192 L 176 191" stroke="#2A2A2A" stroke-width="3" stroke-linecap="round"/>
    <g stroke="#4C8577" stroke-width="2.5" stroke-linecap="round">
      <path d="M100 126 l 0 60"/>
      <path d="M96 130 l 4 -6 l 4 6 M96 180 l 4 6 l 4 -6"/>
    </g>
    <text x="62" y="166" font-family="Caveat, cursive" font-size="22" fill="#4C8577">? m</text>
    <g stroke="#E8590C" stroke-width="2.5" stroke-dasharray="3 7" opacity="0.85">
      <path d="M113 36 l 0 172 M 187 36 l 0 172"/>
      <path d="M42 92 l 216 0 M 42 150 l 216 0"/>
    </g>
    <path d="M276 110 C 296 106, 312 104, 330 104" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M322 98 L 334 104 L 322 111" fill="none" stroke="#2A2A2A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <g stroke="#2A2A2A" stroke-width="2.5">
      <rect x="348" y="50" width="34" height="34" rx="4" fill="#DCEAE5" transform="rotate(-7 365 67)"/>
      <rect x="394" y="42" width="34" height="34" rx="4" fill="#FBE3D4" transform="rotate(5 411 59)"/>
      <rect x="442" y="54" width="34" height="34" rx="4" fill="#FFE8A3" transform="rotate(-4 459 71)"/>
      <rect x="368" y="96" width="34" height="34" rx="4" fill="#FFE8A3" transform="rotate(6 385 113)"/>
      <rect x="416" y="92" width="34" height="34" rx="4" fill="#FFFDF8" transform="rotate(-6 433 109)"/>
      <rect x="464" y="100" width="34" height="34" rx="4" fill="#DCEAE5" transform="rotate(4 481 117)"/>
    </g>
    <path d="M352 170 C 350 156, 362 150, 378 150 L 496 146 C 514 146, 524 156, 522 170 C 522 184, 510 190, 494 190 L 380 193 C 364 194, 354 186, 352 170 Z" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3"/>
    <path d="M388 192 C 382 204, 372 211, 360 214 C 368 206, 372 200, 374 193" fill="none" stroke="#2A2A2A" stroke-width="3" stroke-linecap="round"/>
    <text x="368" y="177" font-family="Caveat, cursive" font-size="24" fill="#2A2A2A">"Ongeveer een meter?"</text>
    <text x="478" y="232" font-family="Caveat, cursive" font-size="30" fill="#E8590C">?</text>
    <path d="M40 238 C 170 232, 400 240, 522 234" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>
  <div class="illu-caption">Opgeknipt in stukjes. De meetlat overleeft het knippen niet.</div></div>

  <p>Maar bij dat opknippen gaat iets verloren: <mark>precieze ruimtelijke informatie</mark>. Het model wordt heel goed in <em>wat</em> er op de foto staat, en blijft opvallend zwak in <em>waar</em> iets precies staat, hoe groot het is en hoe ver het weg is. Er is geen meetlat, alleen stukjes en patronen.</p>
  <p>Ik probeer bijvoorbeeld regelmatig of AI op een foto kan opmeten hoe diep een gegraven sleuf is. Het antwoord klinkt telkens redelijk ("ongeveer een meter"), maar het is een <mark>schatting op uiterlijk</mark>, geen meting. Vraag je door, dan blijkt het model niet te kunnen zeggen waar de bodem precies zit. Met deze techniek kan dat ook nog niet.</p>
  <p>Voor jou betekent dat een simpele tweedeling. Beschrijven, uitlezen, structureren en herkennen: ga je gang. Posities, maten, afstanden en het precies tellen van objecten: <mark>niet op vertrouwen</mark>, ook al klinkt het antwoord stellig.</p>
  <div class="note"><strong>Plaatjes máken</strong> (in plaats van bekijken) is weer een andere techniek, met eigen eigenaardigheden. Een paar daarvan komen voorbij in de module Verantwoord omgaan met AI, bij bias: het wijnglas dat nooit vol wil, het horloge op tien over tien.</div>
  <div class="callout"><div class="label">De kern van deze les</div><p>"AI ziet wát er op je foto staat. Niet wáár, en niet hoe groot."</p></div>`
      },
      {
        kicker: "Deel 1 · Het spel",
        titel: "Het spel: voorspel het volgende woord",
        navTitel: "Het spel: voorspel het woord",
        html: `
  <p>Nu het kerntrucje. Alles wat een taalmodel doet, komt neer op één spel: <mark>gegeven de tekst tot nu toe, wat komt waarschijnlijk hierna?</mark> Dat is alles. Geen database met antwoorden, geen geheime redeneermachine. Eén voorspelling per keer, en dan opnieuw.</p>
  <p>Speel het spel zelf. Klik steeds een voorspelling aan en bouw de zin woord voor woord op, precies zoals het model dat doet.</p>
  <div class="demo" id="demo-voorspel">
    <div class="demo-label">Speel zelf het taalmodel</div>
    <div class="zin"></div>
    <div class="voorspellingen"></div>
    <div class="demo-klaar"></div>
    <button class="demo-reset">Opnieuw beginnen</button>
  </div>
  <p>De percentages komen ergens vandaan: uit alle tekst die het model tijdens de training zag. Hoe vaker een vervolg daar voorkwam, hoe hoger de kans.</p>
  <p>Misschien denk je nu: aardig spelletje, maar zo simpel kan ChatGPT toch niet zijn? Toch wel. Het verschil zit niet in het spel, maar in de <mark>schaal</mark>:</p>
  <table>
    <tr><th>Model</th><th>Getraind op</th><th>Kijkt terug naar</th></tr>
    <tr><td>Mini-model (zoals deze demo)</td><td>~50 woorden</td><td>1 woord</td></tr>
    <tr><td>Klassiek n-gram-model</td><td>~1 miljoen woorden</td><td>3 tot 5 woorden</td></tr>
    <tr><td>Moderne LLM</td><td>~13.000 miljard tokens</td><td>duizenden tokens</td></tr>
  </table>
  <p>Zelfde spel, andere schaal. Niet het mechanisme veranderde, maar de hoeveelheid tekst, de grootte van het netwerk en hoeveel context het kan overzien.</p>
  <div class="note"><strong>Eén belangrijke nuance.</strong> Om dit spel op die schaal goed te spelen, bouwt het netwerk tijdens het trainen interne representaties op van wat woorden betekenen en hoe ze samenhangen. Het resultaat lijkt op begrip, en is voor veel taken ook bruikbaar als begrip. Wat je er wel en niet van mag verwachten, daar gaat deel 3 over.</div>
  <p>Daarmee heb je de motor gezien. Op naar deel 2: waarom wordt diezelfde motor elke paar maanden zoveel beter?</p>`
      },

      /* ========== DEEL 2: DE STIER ========== */
      {
        sectie: "Deel 2 · Waarom AI zo snel beter wordt",
        kicker: "Deel 2 · De vraag",
        titel: "Hoe kan dit zo snel gaan?",
        navTitel: "De vraag: hoe kan dit zo snel?",
        html: `
  <p>In deel 1 zag je de motor: een model dat steeds het volgende woord voorspelt. Nu de vraag waarom die motor elke paar maanden zoveel beter wordt.</p>
  <p>Eind 2022 verscheen ChatGPT. Sindsdien gaat het hard. Elke paar maanden komt er een nieuwe generatie modellen die dingen kan waar de vorige nog op stukliep: ingewikkelde analyses, werkende software, taken die uren duren.</p>
  ${illu(grafiek(0), "De lijn gaat omhoog. Maar waarom eigenlijk?")}
  <p>Vraag je mensen hoe dat kan, dan krijg je bijna altijd hetzelfde antwoord: <mark>meer trainingsdata</mark>. Steeds meer tekst erin, dus steeds slimmer eruit.</p>
  <p>Dat klopt niet. Nou ja, niet helemaal. Meer data hielp in het begin, maar de echte sprongen kwamen ergens anders vandaan: uit <mark>vijf opeenvolgende doorbraken</mark> in hoe modellen getraind worden. Telkens een nieuw idee, geen grotere stapel tekst.</p>
  <p>Die vijf doorbraken lopen we in dit deel stap voor stap langs. Ik vertel dit verhaal al een tijd op dezelfde manier: met een cartoon-stier die per stap een beetje meegroeit. Je gaat hem vaak zien. Sorry alvast.</p>`
      },
      {
        kicker: "Deel 2 · Stap 1",
        titel: "Stap 1: de sterke maar ongeleide stier",
        navTitel: "Stap 1: de ongeleide stier",
        html: `
  <p>We beginnen in 2020, bij <mark>GPT-3</mark>. Dat model deed maar één ding: het volgende woord voorspellen. Daarvoor werd het gevoed met bijna het hele internet aan tekst.</p>
  ${illu(stier(1), "Heel veel gegeten, nul opvoeding.")}
  <p>Het resultaat: een model dat enorm sterk was, maar <mark>ongeleid</mark>. Vroeg je GPT-3 om een mail te schrijven, dan kreeg je geen mail. Je kreeg een vervolg op je zin, bijvoorbeeld nog drie verzoeken die op het jouwe leken. Het maakte je tekst af in plaats van je vraag te beantwoorden. Sterk als een stier, maar niemand had hem geleerd wat de bedoeling was.</p>
  <p>Hoe dat woordvoorspellen voelt, weet je nog: in deel 1 speelde je het spel zelf. Dit is de basis onder alles wat nog komt. Onthoud vooral: het model kiest op basis van <mark>kansen</mark>, en die kansen heeft het geleerd uit al die tekst.</p>`
      },
      {
        kicker: "Deel 2 · Stap 2",
        titel: "Stap 2: de stier leert luisteren",
        navTitel: "Stap 2: de stier leert luisteren",
        html: `
  <p>Toen kwam de doorbraak die alles veranderde: <mark>RLHF</mark>, voluit Reinforcement Learning from Human Feedback. Het klinkt ingewikkeld, maar het idee is simpel: mensen beoordelen duizenden antwoorden van het model. Goed antwoord? Beloning. Slecht antwoord? Geen beloning.</p>
  ${illu(stier(2), "Goed antwoord? Belletje en een beloning. Pavlov zou trots zijn.")}
  <p>Dit is gewoon <mark>conditionering</mark>, zoals Pavlov het met honden deed en zoals je een stier traint met een belletje en wat lekkers. Het model leert: dit soort antwoorden levert beloning op, dus daar ga ik meer van geven.</p>
  <p>Zo werd eind 2022 van het ongeleide GPT-3 ineens ChatGPT gemaakt: een model dat je vraag beantwoordt in plaats van je zin afmaakt. De rest is geschiedenis.</p>
  <div class="callout"><div class="label">De kern van deze stap</div><p>"Het verschil tussen GPT-3 en ChatGPT is geen kennis. Het is opvoeding."</p></div>`
      },
      {
        kicker: "Deel 2 · Stap 3",
        titel: "Stap 3: de stier mag eerst nadenken",
        navTitel: "Stap 3: eerst nadenken",
        html: `
  <p>Jarenlang moesten modellen meteen antwoorden. Vraag erin, antwoord eruit, geen bedenktijd. Eind 2024 veranderde dat met de eerste <mark>reasoning-modellen</mark>, zoals o1: modellen die eerst tussenstappen mogen maken voordat ze antwoorden.</p>
  ${illu(stier(3), "Nu wordt het spannend.")}
  <p>Waarom dat helpt, voel je zelf ook. Hoeveel poten hebben 3 duiven en 2 katten samen? Met tussenstappen is dat makkelijk: 3 keer 2 is 6, 2 keer 4 is 8, samen 14. Maar als iemand naast je staat te schreeuwen "NU ZEGGEN!", gok je maar wat.</p>
  <p>Precies dat schreeuwen deden we al die tijd tegen taalmodellen. Vanaf de reasoning-modellen mag het model eerst een <mark>kladblaadje</mark> volschrijven: het plan, de tussenstappen, de twijfel. Pas daarna komt het antwoord. Op complexe taken werden modellen daardoor in één klap veel beter.</p>`
      },
      {
        kicker: "Deel 2 · Stap 4",
        titel: "Stap 4: de stier krijgt gereedschap",
        navTitel: "Stap 4: gereedschap",
        html: `
  <p>De volgende stap, in 2025 met de o3-generatie: geef het model <mark>gereedschap</mark>. Zoeken op internet, een rekenmachine, code uitvoeren, bestanden lezen.</p>
  ${illu(stier(4), "Niet alles weten, wel alles kunnen opzoeken.")}
  <p>Het bijzondere zat niet in de gereedschappen zelf, die bestonden al langer als losse functies. Het bijzondere was dat het model ze ging gebruiken <mark>binnen zijn denkproces</mark>. Halverwege het nadenken even iets opzoeken, het resultaat bekijken, en daarmee verder denken. Zoals jij tijdens het werk ook even iets googelt of een som in Excel zet.</p>
  <p>Dat lost een fundamenteel probleem op: het model hoeft niet alles te weten en niet alles zelf te kunnen. Het hoeft alleen te weten <mark>wanneer</mark> het iets moet opzoeken of uitrekenen. Minder verzinnen, meer controleren.</p>`
      },
      {
        kicker: "Deel 2 · Stap 5",
        titel: "Stap 5: opgegroeid met gereedschap",
        navTitel: "Stap 5: opgegroeid met tools",
        html: `
  <p>Bij stap 4 kreeg een volwassen stier gereedschap aangereikt. Handig, maar het bleef aangeleerd. De nieuwste generatie modellen, vanaf eind 2025 met onder andere Claude Opus 4.5, gaat een stap verder: <mark>tool-native training</mark>. Het gereedschap zit in de opvoeding zelf.</p>
  ${illu(stier(5), "Deze kalfjes kennen geen wereld zonder gereedschap.")}
  <p>Het verschil is hetzelfde als tussen iemand die op zijn veertigste een cursus smartphone volgt en iemand die ermee is opgegroeid. De eerste kan het ook, maar moet er steeds bij nadenken. De tweede pakt het ding zonder na te denken op het juiste moment.</p>
  <p>Modellen die vanaf de basis trainen mét tools gebruiken ze soepeler, vaker op het juiste moment, en in combinaties waar niemand ze expliciet op getraind heeft. Niet aangeplakt achteraf, maar <mark>onderdeel van de training</mark> zelf.</p>`
      },
      {
        kicker: "Deel 2 · Stap 6",
        titel: "Stap 6: de kudde aan het werk",
        navTitel: "Stap 6: de kudde",
        html: `
  <p>En dan de nieuwste stap, die in 2026 echt doorbreekt met onder andere Claude Code en de nieuwste modellen: <mark>multi-agent systemen</mark>. Niet één model dat alles doet, maar meerdere AI's met verschillende rollen die samenwerken aan één grote taak.</p>
  ${illu(stier(6), "Vergadert urenlang door. En levert dan gewoon op.")}
  <p>De ene AI maakt het plan, een andere voert het uit, een derde controleert het werk. Ze overleggen, verdelen taken en werken <mark>urenlang</mark> zelfstandig door. Geen vraag-en-antwoord meer, maar een klein team dat een opdracht aanneemt en terugkomt met het resultaat.</p>
  <p>Daarmee verschuift wat je aan AI kunt vragen: van "schrijf deze mail" naar "zoek dit uit en bouw het". Een ander soort vraag, een ander soort antwoord.</p>`
      },
      {
        kicker: "Deel 2 · Slot",
        titel: "En de volgende stap?",
        navTitel: "En de volgende stap?",
        html: `
  <p>Kijk nog één keer naar de grafiek, nu met alle stappen erin.</p>
  ${illu(grafiek(6), "Zes stappen, vijf sprongen. En rechtsboven is nog ruimte.")}
  <p>Zie je het patroon? Elke sprong kwam uit een <mark>nieuw idee</mark>: belonen, eerst nadenken, gereedschap, opgroeien met gereedschap, samenwerken. Geen van die sprongen kwam uit meer van hetzelfde.</p>
  <p>Daarom mist het argument "de trainingsdata raakt op, dus dit stopt vanzelf" het punt. De data was de brandstof voor stap 1. De sprongen daarna kwamen uit betere training, niet uit meer tekst. Er is geen reden om aan te nemen dat de voorraad nieuwe ideeën op is. Verwacht dus <mark>meer sprongen</mark>, niet minder.</p>
  <p>Dat was deel 2. Je weet nu hoe AI werkt en waarom het zo snel beter wordt. Tijd voor deel 3: vijf hardnekkige fabels die je vanaf nu kunt herkennen én ontkrachten.</p>`
      },

      /* ========== DEEL 3: VIJF MISVERSTANDEN ========== */
      {
        sectie: "Deel 3 · Vijf misverstanden",
        kicker: "Deel 3 · Misverstand 1",
        titel: "\"AI plakt teksten van internet aan elkaar\"",
        navTitel: "Misverstand 1: AI kopieert",
        html: `
  <p>Dit is veruit het meest gehoorde misverstand: ChatGPT zou jouw vraag opzoeken en het antwoord ergens vandaan kopiëren. Mensen vragen dan ook vaak: "Waar heeft ie dat gelezen?"</p>
  <p>Zo werkt het niet. Een taalmodel kopieert niet. <mark>Het voorspelt.</mark></p>

  <div class="illu"><svg viewBox="0 0 560 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets: de zin 'De bal is...' met daaronder voorspelde woorden en kansbalkjes">
    <path d="M60 38 C 56 22, 72 14, 90 14 L 300 12 C 322 12, 332 24, 330 40 C 330 56, 318 66, 298 66 L 130 68 L 100 90 L 108 68 L 88 68 C 70 68, 62 54, 60 38 Z" stroke="#2A2A2A" stroke-width="3.5" fill="#FFFDF8" stroke-linejoin="round"/>
    <text x="92" y="52" font-family="Caveat, cursive" font-size="34" fill="#2A2A2A">De bal is _____</text>
    <g font-family="Inter, sans-serif" font-size="16" fill="#2A2A2A">
      <text x="120" y="130" font-weight="700">rond</text>
      <text x="120" y="170">rood</text>
      <text x="120" y="210">kwijt</text>
    </g>
    <g stroke="#2A2A2A" stroke-width="3" stroke-linecap="round">
      <path d="M200 122 l 230 2" stroke="#E8590C" stroke-width="14"/>
      <path d="M200 164 l 90 1" stroke="#E8590C" stroke-width="14" opacity="0.55"/>
      <path d="M200 204 l 40 1" stroke="#E8590C" stroke-width="14" opacity="0.3"/>
    </g>
    <g font-family="Caveat, cursive" font-size="22" fill="#5A5550">
      <text x="442" y="131">70%</text>
      <text x="300" y="172">15%</text>
      <text x="250" y="212">5%</text>
    </g>
    <path d="M70 110 C 60 140, 62 170, 78 196" stroke="#4C8577" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M70 188 l 8 10 l 4 -13" stroke="#4C8577" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <div class="illu-caption">Het model gokt steeds het volgende woord. Heel goed onderbouwd gokken.</div></div>

  <p>Tijdens de training heeft het model miljoenen teksten gezien. Daar bewaart het geen kopieën van. Wat het wel bewaart: <mark>patronen</mark>. Welk woord komt waarschijnlijk na welke woorden?</p>
  <p>Vraag je iets, dan bouwt het model zijn antwoord woord voor woord op. "De bal is..." wordt waarschijnlijk gevolgd door "rond". Daarna kijkt het opnieuw, en opnieuw, tot er een compleet antwoord staat. Een antwoord dat in deze vorm nog nooit ergens geschreven is.</p>
  <p>Daarom kan een taalmodel ook geen bronvermelding geven bij zijn eigen kennis. Er is geen plek waar het antwoord "staat". Het is net gemaakt, speciaal voor jou.</p>
  <div class="note"><strong>Maar ChatGPT kan toch op internet zoeken?</strong> Klopt. Zoeken is gereedschap dat het model tijdens het denken kan inzetten (dat zag je in deel 2). Maar gevonden tekst wordt niet geplakt: ook mét bronnen erbij bouwt het model zijn antwoord gewoon weer woord voor woord op. Het gereedschap zoekt, het model voorspelt.</div>
  <div class="callout"><div class="label">Wat je voortaan zegt</div><p>"AI kopieert niet, het voorspelt. Daarom is elk antwoord nieuw."</p></div>`
      },
      {
        kicker: "Deel 3 · Misverstand 2",
        titel: "\"Het voorspelt alleen maar het volgende woord\"",
        navTitel: "Misverstand 2: Alleen woorden",
        html: `
  <p>Dit misverstand komt vaak van mensen die al iets van AI weten. "AI kan niet denken. Het kan niet rekenen. Het is fancy autocomplete. Een papegaai met een grote woordenschat."</p>
  <p>Je hebt het spel in deel 1 zelf gespeeld: woorden voorspellen is inderdaad de basis van elk taalmodel.</p>
  <p>Het venijn zit in twee woorden: <mark>"alleen maar"</mark>.</p>

  <div class="illu"><svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van een papegaai met afstudeerhoedje die een rekensom oplost">
    <path d="M120 225 C 220 218, 360 222, 450 218" stroke="#2A2A2A" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M280 222 l -3 26 M284 222 l 5 26" stroke="#2A2A2A" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M250 210 C 222 196, 214 150, 232 118 C 246 92, 282 82, 308 96 C 330 108, 338 134, 330 162 C 324 188, 300 210, 274 214 C 266 215, 257 214, 250 210 Z" stroke="#2A2A2A" stroke-width="3.5" fill="#FBE3D4" stroke-linejoin="round"/>
    <path d="M262 130 C 244 146, 242 174, 256 192 C 250 170, 256 148, 272 134 Z" stroke="#2A2A2A" stroke-width="3" fill="#E8590C" opacity="0.85" stroke-linejoin="round"/>
    <path d="M258 206 C 230 230, 206 240, 184 240 C 204 226, 222 214, 240 200" stroke="#2A2A2A" stroke-width="3" fill="#4C8577" stroke-linejoin="round"/>
    <circle cx="296" cy="112" r="4" fill="#2A2A2A"/>
    <path d="M318 104 C 334 102, 342 112, 336 122 C 330 130, 318 128, 312 120" stroke="#2A2A2A" stroke-width="3" fill="#FFE8A3" stroke-linejoin="round"/>
    <path d="M252 92 L 300 72 L 348 92 L 300 110 Z" stroke="#2A2A2A" stroke-width="3.5" fill="#2A2A2A"/>
    <path d="M348 92 l 0 26" stroke="#2A2A2A" stroke-width="3" stroke-linecap="round"/>
    <circle cx="348" cy="122" r="4" fill="#E8590C"/>
    <path d="M360 60 C 356 36, 380 24, 410 24 L 480 22 C 504 22, 516 36, 514 52 C 512 70, 498 78, 476 78 L 402 80 C 380 80, 362 76, 360 60 Z" stroke="#2A2A2A" stroke-width="3" fill="#FFFDF8"/>
    <circle cx="352" cy="92" r="6" stroke="#2A2A2A" stroke-width="2.5" fill="#FFFDF8"/>
    <circle cx="342" cy="104" r="3.5" stroke="#2A2A2A" stroke-width="2.5" fill="#FFFDF8"/>
    <text x="384" y="62" font-family="Caveat, cursive" font-size="34" fill="#2A2A2A">3 + 8 = 11</text>
    <text x="60" y="80" font-family="Caveat, cursive" font-size="24" fill="#5A5550" transform="rotate(-4 60 80)">"alleen maar"</text>
    <path d="M84 88 C 110 104, 150 118, 196 126" stroke="#5A5550" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="1 8"/>
  </svg>
  <div class="illu-caption">Een papegaai die kan rekenen is geen papegaai meer.</div></div>

  <p>Probeer zelf maar eens het volgende woord te voorspellen:</p>
  <table>
    <tr><th>Zin</th><th>Wat je nodig hebt</th></tr>
    <tr><td>"De hoofdstad van Frankrijk is ..."</td><td>Een feit kennen</td></tr>
    <tr><td>"3 + 8 = ..."</td><td>Kunnen rekenen</td></tr>
    <tr><td>"Mijn feedback op jouw projectplan is ..."</td><td>Kennis toepassen</td></tr>
    <tr><td>"Aangezien jij een beginner bent, stel ik voor ..."</td><td>Inschatten wie de lezer is</td></tr>
  </table>
  <p>Zie je wat hier gebeurt? Wie het volgende woord goed wil voorspellen, moet feiten kennen, kunnen rekenen en een beeld vormen van de ander. Onderzoekers noemen dit <mark>emergentie</mark>: uit één simpele opdracht (voorspel het volgende woord) ontstaan vaardigheden die niemand er bewust in heeft gestopt.</p>
  <p>Dus ja, technisch gezien voorspelt het model woorden. Maar "alleen maar" is hetzelfde als zeggen dat een schaakgrootmeester "alleen maar" stukjes hout verplaatst.</p>
  <div class="callout"><div class="label">Wat je voortaan zegt</div><p>"Woorden voorspellen klinkt simpel. Maar wie dat echt goed kan, kan veel meer."</p></div>`
      },
      {
        kicker: "Deel 3 · Misverstand 3",
        titel: "\"De output is het gemiddelde van internet\"",
        navTitel: "Misverstand 3: Gemiddelde van internet",
        html: `
  <p>De redenering klinkt logisch: internet staat vol onzin, AI is getraind op internet, dus AI geeft je gemiddelde onzin terug.</p>
  <p>Er kloppen twee dingen niet. En juist die twee dingen moet je kennen om AI goed in te zetten.</p>
  <h2>1. Het model is bijgestuurd door mensen</h2>
  <p>Na de eerste training begint een tweede fase. Mensen beoordelen duizenden antwoorden van het model: dit is een goed antwoord, dit een slecht. Het model leert zo niet het gemiddelde antwoord te geven, maar <mark>het antwoord dat mensen het beste vinden</mark>. Daardoor presteert het boven het niveau van zijn eigen trainingsdata.</p>
  <h2>2. De kwaliteit is grillig</h2>
  <p>Hier wordt het interessant. AI is niet overal even goed in. Het is briljant in de ene taak en verrassend dom in de andere. En die grens loopt <mark>niet</mark> waar je hem verwacht.</p>

  <div class="illu"><svg viewBox="0 0 560 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van een grillige grenslijn met taken die AI wel en niet goed kan">
    <path d="M60 30 C 58 100, 60 180, 62 232 L 510 236" stroke="#2A2A2A" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M62 150 L 120 92 L 168 160 L 224 70 L 286 178 L 344 96 L 402 188 L 458 110 L 508 150" stroke="#E8590C" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <g stroke="#4C8577" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M110 56 l 8 9 l 14 -16"/>
      <path d="M220 38 l 8 9 l 14 -16"/>
      <path d="M340 60 l 8 9 l 14 -16"/>
      <path d="M452 74 l 8 9 l 14 -16"/>
    </g>
    <g stroke="#2A2A2A" stroke-width="4" stroke-linecap="round">
      <path d="M150 200 l 18 18 M168 200 l -18 18"/>
      <path d="M280 208 l 18 18 M298 208 l -18 18"/>
      <path d="M400 212 l 18 18 M418 212 l -18 18"/>
    </g>
    <text x="78" y="32" font-family="Caveat, cursive" font-size="24" fill="#4C8577">hier is AI briljant</text>
    <text x="330" y="262" font-family="Caveat, cursive" font-size="24" fill="#5A5550">hier verrassend dom</text>
    <text x="195" y="135" font-family="Caveat, cursive" font-size="23" fill="#E8590C" transform="rotate(-3 200 140)">de grillige grens</text>
  </svg>
  <div class="illu-caption">Niemand kan deze grens voor jou uittekenen. Je vindt hem door te proberen.</div></div>

  <p>Onderzoekers noemen dit de <mark>jagged frontier</mark>, de grillige grens. AI schrijft in seconden een sterk beleidsstuk, maar telt soms de letters in een woord verkeerd. Het redeneert over jouw vakgebied op seniorniveau, en struikelt dan over iets wat een kind kan.</p>
  <p>De enige juiste conclusie: je moet zelf ontdekken waar de grens ligt voor jouw taken. Dat kan niemand voor je uitrekenen, ook ik niet.</p>
  <div class="oefen" id="oefen-grens">
    <div class="oefen-kop">Probeer het zelf</div>
    <p>Bedenk één ding waarvan je zeker weet dat AI het niet kan, en vraag het toch. Iets uit jouw vak, of gewoon dit:</p>
    <div class="oefen-prompt"><code>Verzin een nieuw Nederlands spreekwoord over thuiswerken, en leg uit waarom het klopt.</code><button class="kopieer" type="button">Kopieer</button></div>
    <details class="oefen-verwacht"><summary>Waarom dit leerzaam is</summary><p>Misschien verbaast het je hoe goed het gaat, misschien valt het tegen. Allebei is de bedoeling: zo voel je waar de grillige grens loopt voor jouw werk. De enige manier om hem te vinden is proberen, en dat is precies waarom deze academy vol "probeer het zelf"-blokken staat.</p></details>
  </div>
  <div class="callout"><div class="label">Wat je voortaan zegt</div><p>"AI is beter dan zijn data, maar grillig. Test het op jouw eigen taken."</p></div>`
      },
      {
        kicker: "Deel 3 · Misverstand 4",
        titel: "\"Het is gewoon hype, dit waait over\"",
        navTitel: "Misverstand 4: Gewoon hype",
        html: `
  <p>Crypto, blockchain, de metaverse, NFT's. We hebben allemaal technologieën voorbij zien komen die de wereld zouden veranderen en dat vervolgens niet deden. Dus is de reflex begrijpelijk: even wachten, dit waait ook wel over.</p>
  <p>Hier zijn twee dingen tegelijk waar. En je hebt ze allebei nodig.</p>

  <div class="illu"><svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets: een achtbaanlus als hype naast een gestaag stijgende trap als echte vooruitgang">
    <path d="M30 232 C 160 226, 420 234, 530 228" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M40 220 C 90 140, 120 80, 160 80 C 196 80, 206 116, 184 134 C 162 152, 136 130, 152 104 C 170 76, 220 120, 250 190 C 258 208, 266 220, 274 226" stroke="#E8590C" stroke-width="4" fill="none" stroke-linecap="round"/>
    <text x="84" y="50" font-family="Caveat, cursive" font-size="26" fill="#E8590C" transform="rotate(-3 84 50)">de hype</text>
    <g stroke="#4C8577" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M300 226 L 348 224 L 350 192 L 396 190 L 398 158 L 444 156 L 446 124 L 492 122 L 494 90 L 530 88"/>
    </g>
    <path d="M528 88 l 0 -34" stroke="#2A2A2A" stroke-width="3" stroke-linecap="round"/>
    <path d="M528 54 C 540 58, 548 52, 556 56 L 556 70 C 548 66, 540 72, 528 68 Z" stroke="#2A2A2A" stroke-width="2.5" fill="#FFE8A3"/>
    <text x="330" y="120" font-family="Caveat, cursive" font-size="26" fill="#4C8577" transform="rotate(-4 330 120)">de echte vooruitgang</text>
  </svg>
  <div class="illu-caption">Allebei echt. Het ene is lawaai, het andere is richting.</div></div>

  <h2>Waar: er is veel ruis</h2>
  <p>Er liften charlatans mee op deze doorbraak. Elk product heet ineens "AI". Elke studie wordt opgeblazen tot een krantenkop, in hype-richting én in doem-richting. Wie het nieuws volgt, wordt vooral moe.</p>
  <h2>Ook waar: de doorbraak is echt</h2>
  <p>Anders dan bij de metaverse hoef je bij deze technologie niet te wachten op de beloofde toekomst. <mark>De toepassingen werken vandaag al</mark>: teksten schrijven, documenten analyseren, code genereren, vergaderingen samenvatten. Miljoenen mensen gebruiken het dagelijks in hun werk, vaak zonder het tegen hun werkgever te zeggen. En de modellen worden nog steeds beter; het eindpunt is niet in zicht.</p>
  <p>De aanwezigheid van overdrijving bewijst niet dat de technologie niets is. Bij het internet was er ook een zeepbel. Het internet bleef.</p>
  <div class="callout"><div class="label">Wat je voortaan zegt</div><p>"De hype en de doorbraak bestaan allebei. De kunst is ze uit elkaar te houden."</p></div>`
      },
      {
        kicker: "Deel 3 · Misverstand 5",
        titel: "\"AI begrijpen is te moeilijk voor mij\"",
        navTitel: "Misverstand 5: Te moeilijk voor mij",
        html: `
  <p>Veel mensen denken dat ze eerst een opleiding moeten volgen, of dat AI iets is voor techneuten. Het tegendeel is waar, en dat is misschien wel het mooiste aan deze hele doorbraak.</p>

  <div class="illu"><svg viewBox="0 0 560 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets: iemand typt 'hoi' in een chatvenster en een vriendelijke robot zwaait terug">
    <rect x="70" y="40" width="280" height="170" rx="16" stroke="#2A2A2A" stroke-width="3.5" fill="#FFFDF8"/>
    <path d="M70 76 L 350 76" stroke="#2A2A2A" stroke-width="3"/>
    <circle cx="92" cy="58" r="5" stroke="#2A2A2A" stroke-width="2.5" fill="#FBE3D4"/>
    <circle cx="112" cy="58" r="5" stroke="#2A2A2A" stroke-width="2.5" fill="#FFE8A3"/>
    <path d="M210 100 C 208 90, 216 86, 228 86 L 316 84 C 330 84, 336 92, 334 102 C 334 112, 326 116, 314 116 L 228 118 C 216 118, 211 110, 210 100 Z" stroke="#2A2A2A" stroke-width="3" fill="#FBE3D4"/>
    <text x="228" y="108" font-family="Caveat, cursive" font-size="26" fill="#2A2A2A">Hoi, kun je helpen?</text>
    <path d="M88 152 C 86 142, 94 138, 106 138 L 230 136 C 244 136, 250 144, 248 154 C 248 164, 240 168, 228 168 L 106 170 C 94 170, 89 162, 88 152 Z" stroke="#2A2A2A" stroke-width="3" fill="#DCEAE5"/>
    <text x="104" y="160" font-family="Caveat, cursive" font-size="26" fill="#2A2A2A">Tuurlijk! Vertel.</text>
    <rect x="88" y="184" width="200" height="16" rx="8" stroke="#2A2A2A" stroke-width="2.5" fill="#FAF6EE"/>
    <rect x="408" y="92" width="92" height="76" rx="14" stroke="#2A2A2A" stroke-width="3.5" fill="#FFFDF8"/>
    <circle cx="436" cy="124" r="6" fill="#2A2A2A"/>
    <circle cx="474" cy="124" r="6" fill="#2A2A2A"/>
    <path d="M438 146 C 448 154, 462 154, 472 146" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M452 92 l 0 -18 M452 70 c 0 -5, 8 -5, 8 0 c 0 5, -8 5, -8 0" stroke="#2A2A2A" stroke-width="3" fill="#E8590C" stroke-linecap="round"/>
    <rect x="424" y="168" width="60" height="46" rx="10" stroke="#2A2A2A" stroke-width="3.5" fill="#FFFDF8"/>
    <path d="M408 116 C 392 110, 382 96, 380 80" stroke="#2A2A2A" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M372 84 l 8 -6 l 2 11" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M500 130 C 512 128, 520 120, 524 110" stroke="#2A2A2A" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <g stroke="#E8590C" stroke-width="2.5" stroke-linecap="round">
      <path d="M366 60 l 10 6"/><path d="M360 74 l 10 2"/>
    </g>
  </svg>
  <div class="illu-caption">De interface is gewoon Nederlands. Dat was nog nooit zo.</div></div>

  <p>Denk even terug aan alle software die je ooit hebt moeten leren. Excel: formules uit je hoofd leren. Photoshop: cursus volgen. Je urenregistratiesysteem: handleiding van veertig pagina's.</p>
  <p>En nu? Je typt een vraag <mark>in je eigen woorden</mark>. Dat is de hele interface. Daarmee is dit de meest toegankelijke technologie die er ooit is geweest. Mijn schoonmoeder, juf van een kleuterklas, ontwierp er bij haar eerste poging een complete telles mee.</p>
  <p>En de theorie die je nodig hebt? Die heb je net gehad. Vier misverstanden geleden begon je aan dit deel, en inmiddels weet je hoe een taalmodel voorspelt, wat emergentie is en waar de grillige grens loopt. De rest leer je door te doen.</p>
  <div class="callout"><div class="label">Wat je voortaan zegt</div><p>"Ik hoef geen techneut te zijn. Ik moet alleen beginnen."</p></div>`
      },

      /* ========== AFRONDING ========== */
      {
        sectie: "Afronding",
        kicker: "Toets jezelf",
        titel: "De quiz: waar of niet waar?",
        navTitel: "De quiz",
        html: `
  <p class="muted">Elf stellingen. Klik je antwoord en lees de uitleg. Niet spieken bij de vorige lessen (mag eigenlijk wel, zo werkt leren).</p>
  <div id="quiz"></div>
  <div class="score" id="score"></div>`
      },
      {
        kicker: "Afsluiting",
        titel: "Je praat nu scherper over AI dan de meeste gebruikers",
        navTitel: "Afsluiting + spiekbriefje",
        html: `
  <div class="illu"><svg viewBox="0 0 560 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van een rozet met een vinkje en confetti">
    <path d="M280 30 l 14 16 l 20 -8 l 6 21 l 22 2 l -4 21 l 19 11 l -14 17 l 10 19 l -21 7 l 0 22 l -21 -4 l -10 19 l -17 -13 l -17 13 l -10 -19 l -21 4 l 0 -22 l -21 -7 l 10 -19 l -14 -17 l 19 -11 l -4 -21 l 22 -2 l 6 -21 l 20 8 Z" stroke="#2A2A2A" stroke-width="3.5" fill="#FFE8A3" stroke-linejoin="round"/>
    <circle cx="280" cy="118" r="46" stroke="#2A2A2A" stroke-width="3" fill="#FFFDF8"/>
    <path d="M258 118 l 16 18 l 30 -34" stroke="#4C8577" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M262 196 L 248 218 L 262 212 L 270 224 L 272 198 Z" stroke="#2A2A2A" stroke-width="3" fill="#E8590C" stroke-linejoin="round"/>
    <path d="M298 196 L 312 218 L 298 212 L 290 224 L 288 198 Z" stroke="#2A2A2A" stroke-width="3" fill="#E8590C" stroke-linejoin="round"/>
    <g stroke-width="3" stroke-linecap="round">
      <path d="M120 60 l 12 -10" stroke="#E8590C"/>
      <path d="M160 130 l 0 14" stroke="#4C8577"/>
      <path d="M430 70 l 14 4" stroke="#4C8577"/>
      <path d="M448 150 l 10 -12" stroke="#E8590C"/>
      <circle cx="105" cy="150" r="4" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="2"/>
      <circle cx="465" cy="40" r="4" fill="#FBE3D4" stroke="#2A2A2A" stroke-width="2"/>
    </g>
  </svg>
  <div class="illu-caption">Vijf fabels minder, zeven zinnen rijker.</div></div>

  <p>Dat was de theorie. Meer heb je echt niet nodig om verstandig met AI te werken en mee te praten op niveau. Hier is je spiekbriefje:</p>

  <div class="spiek">
    <ol>
      <li><strong>"AI kopieert niet, het voorspelt.</strong> Daarom is elk antwoord nieuw."</li>
      <li><strong>"Woorden voorspellen klinkt simpel.</strong> Maar wie dat echt goed kan, kan veel meer."</li>
      <li><strong>"AI is beter dan zijn data, maar grillig.</strong> Test het op jouw eigen taken."</li>
      <li><strong>"De hype en de doorbraak bestaan allebei.</strong> De kunst is ze uit elkaar te houden."</li>
      <li><strong>"Ik hoef geen techneut te zijn.</strong> Ik moet alleen beginnen."</li>
      <li><strong>"Een taalmodel speelt één spel: voorspel het volgende token.</strong> Alles wat het kan, komt daaruit voort."</li>
      <li><strong>"AI werd niet beter door meer van hetzelfde.</strong> De sprongen kwamen uit nieuwe stappen: belonen, nadenken, gereedschap, samenwerken."</li>
    </ol>
  </div>

  <p>En zin vijf is meteen je huiswerk. Kies vandaag één taak uit je werk en probeer of AI je erbij kan helpen. Niet morgen. Vandaag.</p>
  <div class="note">Wil je daar meteen beter in worden? De volgende module, <a href="/academy/module-praktisch-werken-met-ai.html">Praktisch werken met AI</a>, laat je zien hoe je betere antwoorden krijgt zonder prompt engineer te worden.</div>

  <div class="callout">
    <div class="label">Hoe nu verder?</div>
    <p class="gewoon">Wil je dat jouw team of organisatie AI echt gaat gebruiken, voorbij de eerste experimenten? Daar help ik bij: met trainingen, e-learnings op maat en praktische tools. Kijk op <a href="https://aimetmax.nl">aimetmax.nl</a> of stuur me een bericht op <a href="https://linkedin.com/in/maxbroek">LinkedIn</a>.</p>
  </div>

  <p class="muted" style="font-size: 13px;">Deze module is gebaseerd op trainingen die ik de afgelopen jaren gaf aan teams van controllers tot monteurs, en op mijn boek AI-Pionier (Boom, 2024).</p>`
      }
    ],

    quiz: [
      { s: "ChatGPT zegt: \"Shakira is een zangeres uit Argentinië.\" Die zin zit dus ergens in de trainingsdata.",
        antwoord: false,
        uitleg: "Niet waar. Het model citeert geen opgeslagen zinnen, het voorspelt woorden. En inderdaad: Shakira komt uit Colombia. Voorspellingen kunnen dus ook gewoon fout zijn. Dat heet een hallucinatie." },
      { s: "Als je dezelfde vraag twee keer stelt, krijg je altijd precies hetzelfde antwoord.",
        antwoord: false,
        uitleg: "Niet waar. Het model kiest woorden op basis van kansen, en daar zit bewust wat variatie in. Twee keer dezelfde vraag geeft vaak twee verschillende antwoorden." },
      { s: "Onder de motorkap van ChatGPT staan taalregels die programmeurs een voor een hebben ingevoerd.",
        antwoord: false,
        uitleg: "Niet waar. Niemand schreef die regels. Het model haalde zelf patronen uit miljarden voorbeelden tekst. Een rekenmachine is geprogrammeerd, ChatGPT heeft gelezen." },
      { s: "Een taalmodel knipt jouw tekst eerst in tokens: hele woorden of stukjes van woorden.",
        antwoord: true,
        uitleg: "Waar. Het model ziet geen letters of woorden, maar tokens. Daarom is de context begrensd, betaal je per token en telt AI soms de letters in een woord verkeerd." },
      { s: "Stuur je AI een foto van een sleuf, dan kan het er nauwkeurig op meten hoe diep die is.",
        antwoord: false,
        uitleg: "Niet waar. De foto wordt opgeknipt in stukjes en daarbij gaat precieze ruimtelijke informatie verloren. Het model ziet wát er op de foto staat, niet wáár en hoe groot. Het antwoord is een schatting op uiterlijk, geen meting." },
      { s: "Een taalmodel kan betere antwoorden geven dan de gemiddelde tekst waarop het is getraind.",
        antwoord: true,
        uitleg: "Waar. Na de training wordt het model bijgestuurd met menselijke feedback, waardoor het leert de beste antwoorden te geven in plaats van de gemiddelde." },
      { s: "Als AI taak A foutloos doet, kun je erop rekenen dat het de vergelijkbare taak B ook goed doet.",
        antwoord: false,
        uitleg: "Niet waar. Dit is de grillige grens: AI is briljant in de ene taak en dom in de andere, en die grens loopt niet waar je hem verwacht. Altijd zelf testen." },
      { s: "Moderne AI-tools kunnen informatie op internet opzoeken.",
        antwoord: true,
        uitleg: "Waar. Zoeken is een van de gereedschappen die het model tijdens het denken kan inzetten. De nieuwste modellen zijn er zelfs mee opgegroeid, zoals je in deel 2 zag." },
      { s: "Je hebt technische kennis nodig om AI nuttig in te zetten in je werk.",
        antwoord: false,
        uitleg: "Niet waar. Je typt je vraag in gewoon Nederlands. Dit is de meest toegankelijke technologie ooit. De enige manier om het te leren is beginnen." },
      { s: "AI-modellen werden de afgelopen jaren vooral beter doordat er steeds meer trainingsdata bij kwam.",
        antwoord: false,
        uitleg: "Niet waar. De grote sprongen kwamen uit nieuwe trainingsstappen: belonen (RLHF), eerst nadenken (reasoning), gereedschap (tools) en samenwerken (multi-agent)." },
      { s: "Een reasoning-model mag eerst tussenstappen maken voordat het antwoordt.",
        antwoord: true,
        uitleg: "Waar. Net als jij rekent het makkelijker in stappen. Dat maakte modellen vanaf eind 2024 veel beter in complexe taken." }
    ]
  };

})();
