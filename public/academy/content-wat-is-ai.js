/* Module: Wat is AI?
   Deel 1: AI-geletterdheid (wat is het, waarom verwacht de wet iets van je)
   Deel 2: wat is AI (ouder dan je denkt, geen eenduidige definitie, drie smaken)
   Deel 3: afbakening (wat de wet onder AI verstaat, waarom de focus op GenAI ligt)
   Verwacht app.js als renderer. */

(function () {

  /* ============================================================
     SVG's: fineliner-schets, stroke #2A2A2A, wiebelige paden,
     vullingen #FFFDF8 / #FBE3D4 / #FFE8A3 / #DCEAE5,
     accenten #E8590C en #4C8577, labels in Caveat.
     ============================================================ */

  function illu(svg, caption) {
    return `<div class="illu">${svg}<div class="illu-caption">${caption}</div></div>`;
  }

  const SVG_STICKERS = `<svg viewBox="0 0 560 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van een televisie, een rekenmachine en een chatvenster die alle drie een sticker met 'AI' opgeplakt hebben gekregen">
    <path d="M36 216 C 160 210, 410 219, 524 212" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <rect x="52" y="76" width="138" height="96" rx="10" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3.5"/>
    <rect x="64" y="88" width="114" height="72" rx="6" fill="#DCEAE5" stroke="#2A2A2A" stroke-width="2.5"/>
    <path d="M110 110 L 110 138 L 134 124 Z" fill="#E8590C" stroke="#2A2A2A" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M104 172 L 98 208 M 140 172 L 146 208" stroke="#2A2A2A" stroke-width="3.5" stroke-linecap="round"/>
    <g transform="rotate(-8 172 84)">
      <rect x="148" y="64" width="48" height="32" rx="6" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="2.5"/>
      <text x="158" y="88" font-family="Caveat, cursive" font-size="24" font-weight="700" fill="#2A2A2A">AI!</text>
    </g>
    <path d="M232 96 C 230 136, 231 172, 234 206 L 318 207 C 321 170, 320 134, 318 94 Z" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M244 106 L 306 105 L 307 126 L 245 128 Z" fill="#DCEAE5" stroke="#2A2A2A" stroke-width="2.5" stroke-linejoin="round"/>
    <g stroke="#2A2A2A" stroke-width="2.5">
      <rect x="244" y="140" width="16" height="13" rx="4" fill="#FBE3D4"/>
      <rect x="268" y="139" width="16" height="13" rx="4" fill="#FBE3D4"/>
      <rect x="292" y="140" width="16" height="13" rx="4" fill="#FBE3D4"/>
      <rect x="244" y="162" width="16" height="13" rx="4" fill="#FBE3D4"/>
      <rect x="268" y="161" width="16" height="13" rx="4" fill="#FFE8A3"/>
      <rect x="292" y="162" width="16" height="13" rx="4" fill="#FBE3D4"/>
      <rect x="244" y="184" width="16" height="13" rx="4" fill="#FBE3D4"/>
      <rect x="268" y="183" width="16" height="13" rx="4" fill="#FBE3D4"/>
      <rect x="292" y="184" width="16" height="13" rx="4" fill="#E8590C"/>
    </g>
    <g transform="rotate(6 322 100)">
      <rect x="298" y="80" width="48" height="32" rx="6" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="2.5"/>
      <text x="308" y="104" font-family="Caveat, cursive" font-size="24" font-weight="700" fill="#2A2A2A">AI?</text>
    </g>
    <rect x="362" y="84" width="156" height="122" rx="14" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3.5"/>
    <path d="M362 112 L 518 112" stroke="#2A2A2A" stroke-width="2.5"/>
    <circle cx="380" cy="98" r="4" fill="#FBE3D4" stroke="#2A2A2A" stroke-width="2"/>
    <circle cx="396" cy="98" r="4" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="2"/>
    <path d="M376 130 C 375 124, 380 121, 388 121 L 446 120 C 454 120, 458 125, 457 131 C 457 137, 452 140, 444 140 L 388 141 C 380 141, 377 136, 376 130 Z" fill="#FBE3D4" stroke="#2A2A2A" stroke-width="2.5"/>
    <path d="M398 158 C 397 152, 402 149, 410 149 L 492 148 C 500 148, 504 153, 503 159 C 503 165, 498 168, 490 168 L 410 169 C 402 169, 399 164, 398 158 Z" fill="#DCEAE5" stroke="#2A2A2A" stroke-width="2.5"/>
    <rect x="376" y="182" width="104" height="13" rx="6" fill="#FAF6EE" stroke="#2A2A2A" stroke-width="2.5"/>
    <g transform="rotate(-7 504 78)">
      <rect x="480" y="58" width="48" height="32" rx="6" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="2.5"/>
      <text x="490" y="82" font-family="Caveat, cursive" font-size="24" font-weight="700" fill="#2A2A2A">AI.</text>
    </g>
  </svg>`;

  const SVG_RECHTER = `<svg viewBox="0 0 560 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van een rechtershamer boven een zoekbalk met een vergrootglas">
    <path d="M40 222 C 170 216, 400 224, 522 218" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <g transform="rotate(-24 170 90)">
      <rect x="120" y="64" width="100" height="48" rx="10" fill="#FBE3D4" stroke="#2A2A2A" stroke-width="3.5"/>
      <path d="M120 76 l 100 -1 M 120 100 l 100 -1" stroke="#2A2A2A" stroke-width="2" opacity="0.4"/>
      <path d="M170 112 L 168 188" stroke="#2A2A2A" stroke-width="6" stroke-linecap="round"/>
    </g>
    <path d="M74 196 C 74 184, 90 178, 116 178 C 142 178, 158 184, 158 196 L 160 206 L 72 206 Z" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <g stroke="#E8590C" stroke-width="3" stroke-linecap="round">
      <path d="M212 64 l 12 10"/><path d="M232 50 l 6 14"/><path d="M196 84 l 14 6"/>
    </g>
    <rect x="266" y="108" width="252" height="48" rx="24" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3.5"/>
    <circle cx="296" cy="132" r="11" fill="none" stroke="#2A2A2A" stroke-width="3"/>
    <path d="M304 141 l 10 9" stroke="#2A2A2A" stroke-width="3.5" stroke-linecap="round"/>
    <text x="324" y="140" font-family="Caveat, cursive" font-size="23" fill="#5A5550">vergelijkbare zaken...</text>
    <text x="300" y="196" font-family="Caveat, cursive" font-size="25" fill="#E8590C">en wat gebeurt hier precies?</text>
    <path d="M362 168 C 352 162, 344 156, 338 148" stroke="#E8590C" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="2 7"/>
  </svg>`;

  const SVG_TIJDLIJN = `<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van een tijdlijn van 1956 tot nu met mijlpalen van AI">
    <path d="M40 170 C 170 164, 400 172, 500 166" stroke="#2A2A2A" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M492 158 L 506 166 L 493 174" fill="none" stroke="#2A2A2A" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="84" cy="169" r="6" fill="#4C8577" stroke="#2A2A2A" stroke-width="2.5"/>
    <circle cx="216" cy="167" r="6" fill="#4C8577" stroke="#2A2A2A" stroke-width="2.5"/>
    <circle cx="334" cy="169" r="6" fill="#4C8577" stroke="#2A2A2A" stroke-width="2.5"/>
    <circle cx="452" cy="167" r="6" fill="#E8590C" stroke="#2A2A2A" stroke-width="2.5"/>
    <text x="64" y="200" font-family="Caveat, cursive" font-size="20" fill="#5A5550">1956</text>
    <text x="196" y="198" font-family="Caveat, cursive" font-size="20" fill="#5A5550">1997</text>
    <text x="306" y="200" font-family="Caveat, cursive" font-size="20" fill="#5A5550">~2010</text>
    <text x="432" y="198" font-family="Caveat, cursive" font-size="20" fill="#5A5550">2022</text>
    <text x="36" y="226" font-family="Caveat, cursive" font-size="19" fill="#2A2A2A">de term 'AI'</text>
    <text x="168" y="224" font-family="Caveat, cursive" font-size="19" fill="#2A2A2A">schaakkampioen verslagen</text>
    <text x="382" y="226" font-family="Caveat, cursive" font-size="19" fill="#2A2A2A">ChatGPT</text>
    <path d="M84 142 C 84 126, 70 128, 70 116 C 70 104, 84 102, 88 110 C 92 102, 104 104, 104 114 C 104 126, 84 126, 84 142" fill="#DCEAE5" stroke="#2A2A2A" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M204 142 L 228 142 L 224 130 C 230 124, 228 112, 216 112 C 204 112, 202 124, 208 130 Z" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="2.5" stroke-linejoin="round"/>
    <g stroke="#2A2A2A" stroke-width="2.5">
      <rect x="312" y="108" width="44" height="34" rx="5" fill="#FFFDF8"/>
      <path d="M312 114 L 334 130 L 356 114" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <text x="300" y="98" font-family="Caveat, cursive" font-size="18" fill="#5A5550">spamfilter, aanbevelingen</text>
    <path d="M428 140 C 426 124, 436 116, 452 116 L 472 115 C 486 115, 494 123, 492 134 C 492 144, 484 149, 470 149 L 452 150 L 438 158 L 442 150 C 434 149, 429 146, 428 140 Z" fill="#FBE3D4" stroke="#2A2A2A" stroke-width="2.5" stroke-linejoin="round"/>
    <text x="444" y="140" font-family="Caveat, cursive" font-size="19" fill="#2A2A2A">hoi!</text>
    <text x="500" y="146" font-family="Caveat, cursive" font-size="22" fill="#5A5550">nu</text>
    <text x="58" y="52" font-family="Caveat, cursive" font-size="25" fill="#4C8577">ouder dan de meeste mensen die ermee werken</text>
  </svg>`;

  const SVG_DOELPALEN = `<svg viewBox="0 0 560 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van een robotje dat een bal in een doel schopt terwijl het doel zelf naar rechts wegschuift">
    <path d="M30 212 C 160 206, 410 215, 530 208" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <g stroke="#2A2A2A" stroke-width="3.5">
      <rect x="84" y="92" width="54" height="58" rx="9" fill="#FFFDF8"/>
      <circle cx="101" cy="116" r="4" fill="#2A2A2A" stroke="none"/>
      <circle cx="122" cy="116" r="4" fill="#2A2A2A" stroke="none"/>
      <path d="M102 134 C 108 139, 116 139, 122 134" fill="none" stroke-linecap="round"/>
      <path d="M111 92 l 0 -14 M111 74 c 0 -5, 8 -5, 8 0 c 0 5, -8 5, -8 0" fill="#E8590C" stroke-linecap="round"/>
      <path d="M96 150 L 88 196 M 126 150 L 140 184" stroke-linecap="round"/>
    </g>
    <path d="M148 190 c -2 -14, 18 -16, 20 -2 c 2 13, -18 16, -20 2 Z" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3"/>
    <path d="M154 186 l 8 5 M 152 192 l 10 -1" stroke="#2A2A2A" stroke-width="1.8" opacity="0.6"/>
    <g stroke="#E8590C" stroke-width="2.5" stroke-linecap="round">
      <path d="M176 184 l 22 -4"/><path d="M178 194 l 18 0"/>
    </g>
    <g stroke="#2A2A2A" stroke-width="4" stroke-linecap="round">
      <path d="M330 200 L 334 78 L 442 72 L 450 196"/>
    </g>
    <g stroke="#2A2A2A" stroke-width="1.6" opacity="0.45">
      <path d="M334 100 l 112 -4 M336 126 l 112 -4 M338 152 l 110 -4 M340 178 l 108 -4"/>
      <path d="M360 76 l 4 122 M 388 75 l 4 122 M 416 74 l 4 121"/>
    </g>
    <g stroke="#4C8577" stroke-width="3" stroke-linecap="round">
      <path d="M466 110 l 26 -2"/><path d="M470 134 l 30 -2"/><path d="M466 158 l 26 -2"/>
      <path d="M486 102 l 10 6 l -10 7" fill="none" stroke-linejoin="round"/>
    </g>
    <text x="318" y="48" font-family="Caveat, cursive" font-size="24" fill="#2A2A2A">"wat alleen mensen kunnen"</text>
    <text x="452" y="232" font-family="Caveat, cursive" font-size="22" fill="#4C8577">schuift steeds op</text>
  </svg>`;

  const SVG_DRIESMAKEN = `<svg viewBox="0 0 560 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van drie dozen naast elkaar: een tandwiel voor automatisering, datapunten met een vergrootglas voor machine learning en een chatvenster met een pen voor generatieve AI">
    <path d="M30 232 C 160 226, 410 235, 530 228" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <rect x="44" y="64" width="140" height="140" rx="14" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3.5"/>
    <g stroke="#2A2A2A" stroke-width="3" fill="#DCEAE5" stroke-linecap="round">
      <circle cx="114" cy="134" r="24"/>
      <circle cx="114" cy="134" r="8" fill="#2A2A2A"/>
      <path d="M114 102 l 0 -9 M114 166 l 0 9 M82 134 l -9 0 M146 134 l 9 0 M92 112 l -7 -7 M136 156 l 7 7 M136 112 l 7 -7 M92 156 l -7 7"/>
    </g>
    <text x="58" y="256" font-family="Caveat, cursive" font-size="22" fill="#5A5550">volgt regels</text>
    <rect x="210" y="64" width="140" height="140" rx="14" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3.5"/>
    <g fill="#4C8577">
      <circle cx="240" cy="170" r="4"/><circle cx="258" cy="148" r="4"/><circle cx="272" cy="156" r="4"/>
      <circle cx="284" cy="128" r="4"/><circle cx="300" cy="118" r="4"/><circle cx="316" cy="100" r="4"/>
    </g>
    <path d="M236 176 C 258 158, 290 134, 320 98" stroke="#4C8577" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="2 7"/>
    <circle cx="296" cy="124" r="17" fill="none" stroke="#2A2A2A" stroke-width="3"/>
    <path d="M308 137 l 12 12" stroke="#2A2A2A" stroke-width="4" stroke-linecap="round"/>
    <text x="222" y="256" font-family="Caveat, cursive" font-size="22" fill="#5A5550">leert patronen</text>
    <rect x="376" y="64" width="140" height="140" rx="14" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3.5"/>
    <path d="M394 110 C 393 102, 399 98, 408 98 L 470 97 C 480 97, 485 103, 484 110 C 484 118, 478 121, 468 121 L 408 122 C 399 122, 395 117, 394 110 Z" fill="#FBE3D4" stroke="#2A2A2A" stroke-width="2.5"/>
    <path d="M412 144 C 411 137, 416 133, 425 133 L 492 132 C 501 132, 506 138, 505 144 C 505 151, 499 155, 490 155 L 425 156 C 417 156, 413 151, 412 144 Z" fill="#DCEAE5" stroke="#2A2A2A" stroke-width="2.5"/>
    <path d="M398 186 L 452 184" stroke="#2A2A2A" stroke-width="3" stroke-linecap="round"/>
    <path d="M452 184 l 18 -20 l 8 7 l -18 20 Z" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="2.5" stroke-linejoin="round"/>
    <g stroke="#E8590C" stroke-width="2.5" stroke-linecap="round">
      <path d="M488 168 l 8 -8 M 494 178 l 10 -2 M 480 162 l 2 -10"/>
    </g>
    <text x="384" y="256" font-family="Caveat, cursive" font-size="22" fill="#5A5550">genereert zelf</text>
    <text x="78" y="44" font-family="Caveat, cursive" font-size="23" fill="#E8590C">een woord, drie machines</text>
  </svg>`;

  const SVG_SPOTLIGHT = `<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van een spotlight die op een chatvenster schijnt, terwijl een tandwiel en een vergrootglas in de schaduw staan">
    <path d="M36 222 C 160 216, 410 225, 524 218" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <g transform="rotate(32 470 44)">
      <rect x="446" y="26" width="48" height="36" rx="8" fill="#2A2A2A"/>
      <rect x="438" y="30" width="10" height="28" rx="4" fill="#E8590C" stroke="#2A2A2A" stroke-width="2"/>
    </g>
    <path d="M452 66 L 250 206 L 430 210 Z" fill="#FFE8A3" opacity="0.55"/>
    <g opacity="0.35">
      <circle cx="92" cy="170" r="26" fill="#DCEAE5" stroke="#2A2A2A" stroke-width="3"/>
      <circle cx="92" cy="170" r="9" fill="#2A2A2A"/>
      <path d="M92 136 l 0 -8 M92 204 l 0 8 M58 170 l -8 0 M126 170 l 8 0" stroke="#2A2A2A" stroke-width="3" stroke-linecap="round"/>
      <circle cx="176" cy="160" r="16" fill="none" stroke="#2A2A2A" stroke-width="3"/>
      <path d="M188 172 l 12 12" stroke="#2A2A2A" stroke-width="3.5" stroke-linecap="round"/>
    </g>
    <rect x="268" y="118" width="142" height="92" rx="12" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3.5"/>
    <path d="M268 140 L 410 140" stroke="#2A2A2A" stroke-width="2.5"/>
    <path d="M282 158 C 281 152, 286 149, 294 149 L 348 148 C 356 148, 360 153, 359 159 C 359 165, 354 168, 346 168 L 294 169 C 286 169, 283 164, 282 158 Z" fill="#FBE3D4" stroke="#2A2A2A" stroke-width="2.5"/>
    <path d="M298 186 C 297 180, 302 177, 310 177 L 384 176 C 392 176, 396 181, 395 187 C 395 193, 390 196, 382 196 L 310 197 C 302 197, 299 192, 298 186 Z" fill="#DCEAE5" stroke="#2A2A2A" stroke-width="2.5"/>
    <text x="60" y="84" font-family="Caveat, cursive" font-size="24" fill="#5A5550">allemaal nog steeds AI</text>
    <path d="M96 92 C 100 108, 104 122, 108 134" stroke="#5A5550" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="2 7"/>
    <text x="296" y="244" font-family="Caveat, cursive" font-size="24" fill="#E8590C">maar hier schijnt het licht</text>
  </svg>`;

  /* ============================================================
     De module
     ============================================================ */

  window.MODULE = {
    kicker: "Gratis e-learning",
    titel: "Wat is AI?",
    sub: "Je gebruikt al jaren AI zonder het zo te noemen. Wat AI eigenlijk is, en wat er tegenwoordig van jou verwacht wordt. Door Max van den Broek, auteur van AI-Pionier.",

    lessen: [

      /* ========== START ========== */
      {
        sectie: "Start",
        kicker: "Welkom",
        titel: "Iedereen heeft het over AI. Maar wat is het?",
        navTitel: "Welkom",
        html: `
  ${illu(SVG_STICKERS, "Hetzelfde etiket, drie heel verschillende apparaten.")}

  <p>Misschien stuurde je werkgever je deze link, misschien kwam je hier zelf terecht. Welkom. Dit is het <mark>startpunt van de academy</mark>: de module die je doet vóórdat we de motorkap van ChatGPT opentrekken.</p>
  <p>Even voorstellen: ik ben Max van den Broek, auteur van <mark>AI-Pionier</mark> (Koninklijke Boom Uitgevers) en voormalig docent AI aan de Universiteit van Amsterdam. Tegenwoordig train ik teams in het slim gebruiken van AI.</p>
  <p>Wat je hier leert, in drie delen:</p>
  <p><strong>Deel 1:</strong> wat AI-geletterdheid is, en waarom er sinds kort iets van jou verwacht wordt. Soms zelfs door de wet.<br>
  <strong>Deel 2:</strong> wat AI eigenlijk is. Spoiler: het is veel ouder dan je denkt, en zelfs de uitvinders zijn het niet eens over de definitie.<br>
  <strong>Deel 3:</strong> hoe we het begrip afbakenen, en waarom de rest van deze academy focust op de nieuwe generatie: generatieve AI.</p>
  <p>De module duurt ongeveer 20 minuten, je hoeft geen account aan te maken en er komt geen jargon in voor dat niet eerst wordt uitgelegd. Aan het eind wachten een korte quiz en een certificaat.</p>`
      },

      /* ========== DEEL 1: AI-GELETTERDHEID ========== */
      {
        sectie: "Deel 1 · Waarom dit moet",
        kicker: "Deel 1 · AI-geletterdheid",
        titel: "Wat is AI-geletterdheid?",
        navTitel: "Wat is AI-geletterdheid?",
        html: `
  <p>AI-geletterdheid. Het klinkt als beleidsproza, maar het idee is alledaags: <mark>genoeg van AI snappen om er verstandig mee te werken</mark>. Zoals je geen monteur hoeft te zijn om auto te rijden, maar wel moet weten wat een rem doet en wanneer het glad is.</p>
  <p>Het is geen vaag modewoord. De Europese AI-verordening (de "AI Act") definieert het begrip letterlijk. Vrij vertaald: de <mark>vaardigheden, kennis en het begrip</mark> die je nodig hebt om AI-systemen geïnformeerd in te zetten, en om je bewust te zijn van de kansen, de risico's en de schade die AI kan veroorzaken (artikel 3, punt 56). Die definitie gebruiken we in deze academy ook, want als er straks iemand naar je AI-kennis vraagt, is dit de lat.</p>
  <p>Wat AI-geletterdheid <strong>niet</strong> is: een diploma, een technische studie of een lijstje prompt-trucjes. Wat het wel is: drie vragen kunnen beantwoorden over de tools waar je mee werkt:</p>
  <p><strong>1. Wat gebruik ik eigenlijk?</strong> Is dit AI, en wat voor soort?<br>
  <strong>2. Wat kan het goed, en waar gaat het mis?</strong> Denk aan verzonnen feiten of scheve aannames.<br>
  <strong>3. Wat betekent dat voor hoe ik het inzet?</strong> Wat check ik, wat deel ik wel en niet, waar blijf ik zelf aan zet?</p>
  <p>Hoeveel je moet weten, hangt af van je rol. Een recruiter die kandidaten voorsorteert met AI heeft andere kennis nodig dan iemand die af en toe een mail laat opschonen. Daarom is deze academy opgebouwd in lagen: een basis voor iedereen, daarna verdieping per organisatie en per rol.</p>
  <div class="callout"><div class="label">De kern van deze les</div><p>"AI-geletterdheid is geen diploma. Het is genoeg snappen om verstandig te kiezen."</p></div>`
      },
      {
        kicker: "Deel 1 · De wet",
        titel: "Soms is het zelfs wettelijk verplicht",
        navTitel: "Soms wettelijk verplicht",
        html: `
  <p>Sinds <mark>2 februari 2025</mark> staat er een opmerkelijke verplichting in de Europese AI-verordening. Artikel 4: organisaties die AI-systemen aanbieden óf gebruiken, moeten naar beste vermogen zorgen voor een <mark>toereikend niveau van AI-geletterdheid</mark> bij hun personeel. Dat geldt niet alleen voor techbedrijven die AI bouwen. Het geldt ook voor de verzekeraar, de gemeente en het installatiebedrijf waar mensen gewoon ChatGPT of Copilot gebruiken.</p>
  <p>Wat er verwacht wordt: passende maatregelen, afgestemd op de kennis en de rol van medewerkers en op de context waarin AI wordt gebruikt. Er is geen verplichte cursus en geen officieel certificaat. Maar kunnen laten zien dat je er serieus werk van maakt, helpt wel.</p>

  <!-- TODO: feiten hieronder finaliseren tegen research/ind-casematch-uitspraak.md zodra geverifieerd -->
  ${illu(SVG_RECHTER, "Ziet eruit als een zoekmachine. De rechter wilde er toch meer over weten.")}

  <p>Hoe dichtbij dit komt, liet de rechtspraak onlangs zien. De IND gebruikt een systeem dat <mark>CaseMatch</mark> heet: een tool waarmee medewerkers vergelijkbare eerdere zaken kunnen opzoeken. Op het oog gewoon een zoekmachine. Toch wilde de rechter er het fijne van weten: wat doet dit systeem precies, speelt het een rol in besluiten over mensen, en snappen de medewerkers die ermee werken wat het doet?</p>
  <p>Daar zitten twee lessen in. Eén: <mark>je hoeft geen chatbot te gebruiken om met AI-regels te maken te krijgen</mark>. Ook een tool die eruitziet als een zoekmachine kan eronder vallen. Twee: "ik wist niet dat het AI was" is geen sterk verhaal, niet tegenover een rechter en niet tegenover de mensen over wie het gaat. Er iets van snappen is dus niet alleen handig. Soms is het gewoon je werk.</p>
  <div class="note"><strong>Voor de volledigheid:</strong> de EU werkt aan een aanpassingspakket (de "digital omnibus") dat artikel 4 waarschijnlijk iets zachter formuleert. De kern blijft hetzelfde: wie AI inzet, hoort te snappen wat het doet. Deze e-learning is geen juridisch advies; voor de details van jouw situatie is er de jurist of de AI-verantwoordelijke van je organisatie.</div>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Je hoeft geen expert te worden. Je moet wel weten wat je gebruikt."</p></div>`
      },

      /* ========== DEEL 2: WAT IS AI ========== */
      {
        sectie: "Deel 2 · Wat is AI?",
        kicker: "Deel 2 · Niet nieuw",
        titel: "Je gebruikt al jaren AI",
        navTitel: "Je gebruikt al jaren AI",
        html: `
  <p>Wanneer gebruikte jij voor het eerst AI? De meeste mensen zeggen iets als "2023, toen ik ChatGPT probeerde". Het echte antwoord ligt vrijwel zeker veel eerder.</p>
  <p>De aanbevelingen van <mark>Netflix</mark> ("omdat je dit keek"). De <mark>autocomplete</mark> in je zoekmachine. Het spamfilter dat je mailbox leefbaar houdt. De gezichtsherkenning die je telefoon ontgrendelt. De route die je navigatie kiest. Allemaal AI, en allemaal al jaren in je broekzak. Je dacht er alleen nooit "intelligentie" bij, omdat het gewoon wérkt.</p>

  ${illu(SVG_TIJDLIJN, "AI was er eerder dan jouw eerste e-mailadres.")}

  <p>En het gaat nog veel verder terug. In <mark>1997</mark> versloeg een schaakcomputer wereldkampioen Garry Kasparov. En de term "artificial intelligence" zelf? Die werd gemunt in <mark>1956</mark>, toen een groep onderzoekers rond John McCarthy er een zomerworkshop aan wijdde. AI is als vakgebied ouder dan de meeste mensen die er nu mee werken.</p>
  <p>Eén voorbeeld om over na te kauwen: de rekenmachine. Die voert een taak uit waar mensen ooit onmiskenbaar hun intelligentie voor nodig hadden, en hij doet het beter dan elke mens. Is dat dan ook AI? Vrijwel niemand noemt hem nog zo. Onthoud die observatie, want in de volgende les blijkt daar een patroon achter te zitten.</p>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Je gebruikt al jaren AI. Je noemde het alleen nooit zo."</p></div>`
      },
      {
        kicker: "Deel 2 · Definities",
        titel: "Vraag drie experts, krijg drie definities",
        navTitel: "Geen één definitie",
        html: `
  <p>Als AI al zo lang bestaat, dan is er vast een nette definitie. Nou, nee. Zelfs de grondleggers kwamen er niet uit, en dat is leerzamer dan het klinkt.</p>
  <p>AI-pionier <mark>Marvin Minsky</mark> omschreef het vakgebied als: machines dingen laten doen <mark>waar intelligentie voor nodig zou zijn als een mens ze deed</mark>. Mooi geprobeerd, maar daar valt je rekenmachine dus onder. En je afwasmachine misschien ook, afhankelijk van hoe je over afwassen denkt.</p>
  <p>Daarom hanteren veel mensen in de praktijk stiekem een andere definitie, die bekend werd via informaticus Larry Tesler: <mark>AI is alles wat computers nog níet kunnen</mark>. Zodra het lukt, houden we op het intelligentie te noemen. Schaken gold decennia als ultieme test van machine-intelligentie; toen de computer won, heette het ineens "gewoon rekenkracht". Navigatie was AI; nu is het "gewoon een routeplanner". Onderzoekers noemen dit het <mark>AI-effect</mark>, en het verklaart waarom je rekenmachine geen AI meer heet.</p>

  ${illu(SVG_DOELPALEN, "Zodra de bal erin ligt, schuift het doel een stukje op.")}

  <p>Het eerlijke antwoord is dus: er bestaat <mark>geen definitie waar iedereen het over eens is</mark>. Als jouw collega's "AI" zeggen, kan de één de chatbot bedoelen, de ander het voorspelmodel van de planning, de derde een robot uit een film. En niemand van hen heeft het "fout". Maar het betekent wél dat je in een gesprek over AI eerst even moet checken waar het over gaat.</p>
  <p>Gelukkig is er een vraag die altijd werkt, en die stellen we in de volgende les: niet "is dit AI?", maar "wat doet dit systeem, en hoe komt het aan zijn gedrag?"</p>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Vraag niet of iets AI is. Vraag wat het doet en hoe het dat geleerd heeft."</p></div>`
      },
      {
        kicker: "Deel 2 · Drie smaken",
        titel: "De drie smaken achter het woord AI",
        navTitel: "De drie smaken AI",
        html: `
  <p>Als mensen op het werk "AI" zeggen, bedoelen ze in de praktijk meestal een van <mark>drie smaken</mark>. Wie deze drie uit elkaar houdt, praat scherper over AI dan de gemiddelde LinkedIn-post.</p>

  ${illu(SVG_DRIESMAKEN, "Drie heel verschillende machines achter hetzelfde woord.")}

  <h2>1. Automatisering: volgt regels</h2>
  <p>Een systeem voert taken uit volgens vaste regels die iemand heeft geprogrammeerd. Het leert niets. Denk aan: elke ochtend automatisch data uit een systeem in een mail zetten. <strong>Sterk:</strong> robuust en voorspelbaar. <strong>Beperkt:</strong> het kan alleen wat er letterlijk in de regels staat. Strikt genomen is dit vaak geen AI, maar veel mensen noemen het wel zo. Prima, zolang jij maar weet wat het verschil is.</p>
  <h2>2. Machine learning: leert patronen</h2>
  <p>Hier leert de machine zelf, door patronen te herkennen in data. Laat een systeem 10.000 foto's van paarden zien en het leert paarden herkennen. Zo werken fraudedetectie, je spamfilter en de Netflix-aanbevelingen. <strong>Sterk:</strong> vindt patronen die mensen ontgaan. <strong>Let op:</strong> heeft veel data nodig, en is vaak een black box: zelfs de makers kunnen niet precies uitleggen waarom het systeem iets besluit.</p>
  <h2>3. Generatieve AI: genereert zelf</h2>
  <p>De nieuwe smaak, van ChatGPT en Copilot. Ook machine learning, maar dan <mark>voorgetraind op een enorme berg data en daardoor breed inzetbaar</mark>. Je hoeft niets te trainen: het schrijft, vat samen, analyseert en bouwt, over vrijwel elk onderwerp. <strong>Sterk:</strong> direct bruikbaar voor duizend taken. <strong>Let op:</strong> het verzint soms dingen (hallucinaties) en de output is niet voorspelbaar.</p>
  <table>
    <tr><th>Smaak</th><th>Leert het?</th><th>Herken je aan</th></tr>
    <tr><td>Automatisering</td><td>Nee, volgt regels</td><td>Doet altijd exact hetzelfde</td></tr>
    <tr><td>Machine learning</td><td>Ja, uit jouw data</td><td>Eén taak, getraind op voorbeelden</td></tr>
    <tr><td>Generatieve AI</td><td>Ja, al voorgetraind</td><td>Breed inzetbaar, praat terug</td></tr>
  </table>
  <p>De grenzen zijn niet altijd scherp; er bestaan grijze gebieden tussen automatisering en machine learning. Maar dit is precies wat oudere AI van de nieuwe onderscheidt: oudere AI-systemen werden gebouwd voor <mark>één taak</mark>. Generatieve AI is voorgetraind en kan <mark>van alles</mark>. Dat verschil verklaart de hele ophef van de afgelopen jaren.</p>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Automatisering volgt regels. Machine learning leert patronen. Generatieve AI genereert."</p></div>`
      },

      /* ========== DEEL 3: AFBAKENING ========== */
      {
        sectie: "Deel 3 · Waar we op focussen",
        kicker: "Deel 3 · De wet",
        titel: "Wat de wet onder AI verstaat",
        navTitel: "Wat de wet AI noemt",
        html: `
  <p>Terug naar die wettelijke plicht uit deel 1. Als de wet zegt "wie AI gebruikt, moet er iets van snappen", dan is de logische vervolgvraag: <mark>wat telt voor de wet als AI?</mark></p>
  <p>De AI-verordening definieert een "AI-systeem" (artikel 3, punt 1). Vrij vertaald: een <mark>machinaal systeem</mark> dat met een zekere mate van <mark>zelfstandigheid</mark> uit de invoer die het krijgt <mark>afleidt</mark> hoe het output maakt: voorspellingen, content, aanbevelingen of beslissingen die invloed kunnen hebben op de echte of digitale wereld. Het sleutelwoord is "afleidt": het systeem volgt niet alleen een vast recept, het leidt zelf gedrag af.</p>
  <p>Die definitie is bewust breed. Er valt veel meer onder dan chatbots:</p>
  <p><strong>Aanbevelingssystemen</strong> die bepalen wat jij te zien krijgt. <strong>Risicoscores</strong> die aanvragen voorsorteren. <strong>Beeldherkenning</strong> die foto's beoordeelt. En soms dus ook een tool die eruitziet als een doodgewone zoekmachine, zoals CaseMatch bij de IND uit deel 1. Niet het uiterlijk telt, maar <mark>wat er onder de motorkap gebeurt</mark> en wat de output betekent voor mensen.</p>
  <p>Voor jou betekent dit iets praktisch: de vraag "gebruik ik AI?" beantwoord je niet op gevoel of op het logo van de tool. Kijk wat je organisatie aan systemen gebruikt, en stel de vraag per systeem. Het antwoord is vaker "ja" dan je denkt. Goede organisaties hebben hier een overzicht van; vraag ernaar.</p>
  <div class="note">Dit is een e-learning, geen juridisch advies. Of een specifiek systeem onder de AI-verordening valt, is uiteindelijk werk voor de jurist of de AI-verantwoordelijke van je organisatie. Jouw werk: weten dat de vraag bestaat, en hem stellen.</div>
  <div class="callout"><div class="label">De kern van deze les</div><p>"De wet kijkt niet naar het uiterlijk van de tool, maar naar wat eronder gebeurt."</p></div>`
      },
      {
        kicker: "Deel 3 · De focus",
        titel: "Waarom de focus nu op generatieve AI ligt",
        navTitel: "Focus: generatieve AI",
        html: `
  <p>Alles wat je in deze module zag, blijft AI: de aanbevelingen, de voorspelmodellen, de risicoscores. Toch gaat de rest van deze academy vooral over <mark>generatieve AI</mark>. Dat is een bewuste keuze, om drie redenen.</p>
  <p><strong>1. Hij is nieuw.</strong> ChatGPT verscheen eind november 2022. De technologie erachter is jong, ontwikkelt zich razendsnel en de wereld is nog volop aan het uitvinden wat er kan en wat er mis kan gaan.</p>
  <p><strong>2. Hij is van jou.</strong> Oudere AI zat in systemen van specialisten: de planner had het voorspelmodel, de marketeer het aanbevelingssysteem. Generatieve AI zit in jouw browser, praat gewoon Nederlands en bemoeit zich met jouw mails, verslagen en analyses. Voor het eerst is AI iets wat <mark>iedereen zelf gebruikt</mark>, niet iets wat alleen op de achtergrond draait.</p>
  <p><strong>3. Hij heeft nieuwe streken.</strong> Generatieve AI verzint soms feiten, neemt vooroordelen mee uit zijn trainingsdata, en gaat anders met jouw gegevens om dan je denkt. Dat zijn precies de dingen die je moet snappen om er verantwoord mee te werken. En dus precies waar AI-geletterdheid over gaat.</p>

  ${illu(SVG_SPOTLIGHT, "Alles blijft AI. Het licht staat op de nieuwe.")}

  <p>En we staan pas aan het begin. ChatGPT kwam uit op 30 november 2022; dat is nog maar kort geleden. Ongeveer zo vroeg als Steve Jobs en Bill Gates begonnen met de computer, zo vroeg kun jij beginnen met generatieve AI.</p>
  <p>Hoe zo'n taalmodel onder de motorkap werkt, waarom het zo snel beter wordt en welke misverstanden je kunt schrappen: dat is de volgende module, <a href="/academy/module-hoe-ai-werkt.html">Hoe AI echt werkt</a>. Maar eerst: de quiz.</p>
  <div class="callout"><div class="label">De kern van deze les</div><p>"De nieuwe AI is van iedereen. Daarom moet iedereen hem snappen."</p></div>`
      },

      /* ========== AFRONDING ========== */
      {
        sectie: "Afronding",
        kicker: "Toets jezelf",
        titel: "De quiz: waar of niet waar?",
        navTitel: "De quiz",
        html: `
  <p class="muted">Tien stellingen over deze module. Klik je antwoord en lees de uitleg. Haal je hem, dan staat het certificaat klaar.</p>
  <div id="quiz"></div>
  <div class="score" id="score"></div>`
      },
      {
        kicker: "Afsluiting",
        titel: "Je weet nu beter wat AI is dan de meeste gebruikers",
        navTitel: "Afsluiting + spiekbriefje",
        html: `
  <p>Dat was de eerste module. Je spiekbriefje:</p>

  <div class="spiek">
    <ol>
      <li><strong>"Ik gebruik al jaren AI.</strong> Het etiket is nieuw voor mij, de techniek niet."</li>
      <li><strong>"Er is geen één definitie van AI.</strong> Ik vraag wat het systeem doet en hoe het dat geleerd heeft."</li>
      <li><strong>"Zodra iets goed werkt, noemen we het geen AI meer.</strong> Daar trap ik niet meer in."</li>
      <li><strong>"Automatisering volgt regels, machine learning leert patronen, generatieve AI genereert.</strong> Drie smaken, één woord."</li>
      <li><strong>"De wet kijkt breder dan chatbots.</strong> Ook een tool die op een zoekmachine lijkt kan een AI-systeem zijn."</li>
      <li><strong>"AI-geletterdheid is geen diploma.</strong> Het is genoeg snappen om verstandig te kiezen, en organisaties moeten daar sinds 2025 voor zorgen."</li>
      <li><strong>"De nieuwe AI is van iedereen.</strong> Daarom verdiep ik me juist in generatieve AI."</li>
    </ol>
  </div>

  <p>Je huiswerk is klein maar verhelderend: tel morgen vóór je lunch hoe vaak je al AI bent tegengekomen. Aanbevelingen, filters, autocomplete, navigatie, en ja, de chatbot telt ook mee.</p>
  <p>Klaar voor de volgende stap? In <a href="/academy/module-hoe-ai-werkt.html">Hoe AI echt werkt</a> open je de motorkap: tokens, woordvoorspelling, en waarom AI zo snel zoveel beter wordt.</p>

  <div class="callout">
    <div class="label">Hoe nu verder?</div>
    <p class="gewoon">Moet jouw organisatie aan de slag met AI-geletterdheid, van basis tot rolspecifiek? Daar help ik bij: met trainingen, e-learnings op maat en praktische tools. Kijk op <a href="https://aimetmax.nl">aimetmax.nl</a> of stuur me een bericht op <a href="https://linkedin.com/in/maxbroek">LinkedIn</a>.</p>
  </div>

  <p class="muted" style="font-size: 13px;">Deze module is gebaseerd op mijn boek AI-Pionier (Boom, 2024) en op de introductiesessies over AI die ik gaf aan teams van MT's tot monteurs.</p>`
      }
    ],

    quiz: [
      { s: "AI bestaat pas sinds de lancering van ChatGPT in 2022.",
        antwoord: false,
        uitleg: "Niet waar. De term stamt uit 1956, een schaakcomputer versloeg de wereldkampioen al in 1997, en AI zit al jaren in je spamfilter, navigatie en Netflix. Nieuw is vooral generatieve AI." },
      { s: "Netflix-aanbevelingen en de autocomplete in je zoekmachine zijn vormen van AI.",
        antwoord: true,
        uitleg: "Waar. Het zijn systemen die patronen leren uit data (machine learning). Je dacht er alleen nooit 'intelligentie' bij, omdat het gewoon werkt." },
      { s: "Er bestaat één officiële definitie van AI waar alle experts het over eens zijn.",
        antwoord: false,
        uitleg: "Niet waar. Zelfs de grondleggers kwamen er niet uit. Mensen kunnen met 'AI' heel verschillende dingen bedoelen, en niemand heeft het per se fout. Vraag daarom wat het systeem doet en hoe het dat geleerd heeft." },
      { s: "Zodra een AI-techniek goed werkt, stoppen mensen hem vaak AI te noemen.",
        antwoord: true,
        uitleg: "Waar. Dit heet het AI-effect: schaken, navigatie en spamfilters golden ooit als AI, nu heten ze 'gewoon software'. Daarom lijkt AI altijd iets van de toekomst." },
      { s: "Simpele automatisering met vaste regels is hetzelfde als machine learning.",
        antwoord: false,
        uitleg: "Niet waar. Automatisering volgt regels die iemand programmeerde en leert niets. Machine learning leert zelf patronen uit data. Generatieve AI is de derde smaak: voorgetraind en breed inzetbaar." },
      { s: "Wat ChatGPT anders maakt dan oudere AI: het is voorgetraind en daardoor breed inzetbaar, in plaats van gebouwd voor één taak.",
        antwoord: true,
        uitleg: "Waar. Oudere AI-systemen deden één ding (paarden herkennen, fraude detecteren). Generatieve AI is voorgetraind op enorme hoeveelheden data en kan daardoor van alles, zonder dat jij iets hoeft te trainen." },
      { s: "De AI-geletterdheidsplicht uit de AI-verordening geldt alleen voor bedrijven die zelf AI bouwen.",
        antwoord: false,
        uitleg: "Niet waar. Artikel 4 geldt ook voor organisaties die AI gebruiken, dus ook voor gewoon ChatGPT- of Copilot-gebruik op kantoor. Aanbieders én gebruikers moeten zorgen voor een toereikend niveau van AI-geletterdheid." },
      { s: "Een systeem dat eruitziet als een zoekmachine kan toch onder de AI-regels vallen.",
        antwoord: true,
        uitleg: "Waar. De wet kijkt niet naar het uiterlijk van de tool maar naar wat eronder gebeurt, zoals bij CaseMatch van de IND. Niet voor niets wilde de rechter precies weten wat dat systeem doet." },
      { s: "Voor AI-geletterdheid moet iedereen in de organisatie hetzelfde officiële certificaat halen.",
        antwoord: false,
        uitleg: "Niet waar. Er bestaat geen officieel certificaat. De wet vraagt om passende maatregelen, afgestemd op rol en gebruik: een recruiter heeft andere kennis nodig dan iemand die af en toe een mail laat opschonen." },
      { s: "De rest van deze academy focust op generatieve AI, omdat die nieuw is en door iedereen zelf gebruikt wordt.",
        antwoord: true,
        uitleg: "Waar. Oudere AI draaide op de achtergrond bij specialisten. Generatieve AI zit in ieders browser en heeft nieuwe streken (hallucinaties, bias, privacy). Daar gaan de volgende modules over." }
    ]
  };

})();
