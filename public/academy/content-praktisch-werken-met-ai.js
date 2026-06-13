/* Module: Praktisch werken met AI
   Deel 1: de grondhouding (collega-frame, blijven proberen)
   Deel 2: betere antwoorden (detail, vijf bouwstenen, vorm + voorbeelden, toon)
   Deel 3: slimmer inrichten (instructies/geheugen, praten + nieuw gesprek, bots)
   Deel 4: voorbij de chat (apps bouwen, agents - forthcoming)
   Verwacht app.js als renderer. */

(function () {

  function illu(svg, caption) {
    return `<div class="illu">${svg}<div class="illu-caption">${caption}</div></div>`;
  }

  /* ============================================================
     SVG's: fineliner-schets, stroke #2A2A2A, wiebelige paden,
     vullingen #FFFDF8 / #FBE3D4 / #FFE8A3 / #DCEAE5,
     accenten #E8590C en #4C8577, labels in Caveat.
     ============================================================ */

  const SVG_COLLEGA = `<svg viewBox="0 0 560 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van iemand die een nieuwe collega-robot inwerkt door een map met context te overhandigen">
    <path d="M36 218 C 160 212, 410 221, 524 214" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="118" cy="86" r="22" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3.5"/>
    <circle cx="110" cy="84" r="2.6" fill="#2A2A2A"/><circle cx="126" cy="84" r="2.6" fill="#2A2A2A"/>
    <path d="M110 94 C 115 98, 121 98, 126 94" stroke="#2A2A2A" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M118 108 L 116 176 M 116 130 C 138 132, 158 138, 172 150 M 116 140 C 100 146, 90 156, 86 168" stroke="#2A2A2A" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M116 176 L 102 214 M 116 176 L 132 214" stroke="#2A2A2A" stroke-width="3.5" stroke-linecap="round"/>
    <g transform="rotate(-8 196 150)">
      <rect x="172" y="134" width="52" height="40" rx="4" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="3"/>
      <path d="M180 146 l 36 -1 M180 156 l 28 0 M180 165 l 32 -1" stroke="#2A2A2A" stroke-width="2.5" stroke-linecap="round" opacity="0.55"/>
    </g>
    <text x="150" y="64" font-family="Caveat, cursive" font-size="22" fill="#4C8577">hier is de context</text>
    <path d="M156 72 C 170 92, 184 112, 200 130" stroke="#4C8577" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="2 7"/>
    <rect x="372" y="70" width="92" height="80" rx="14" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3.5"/>
    <circle cx="398" cy="104" r="6" fill="#2A2A2A"/><circle cx="438" cy="104" r="6" fill="#2A2A2A"/>
    <path d="M400 128 C 412 136, 426 136, 438 128" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M418 70 l 0 -16 M418 50 c 0 -5, 8 -5, 8 0 c 0 5, -8 5, -8 0" stroke="#2A2A2A" stroke-width="3" fill="#E8590C" stroke-linecap="round"/>
    <rect x="386" y="150" width="64" height="50" rx="10" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3.5"/>
    <path d="M372 120 C 352 124, 338 134, 330 146" stroke="#2A2A2A" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M338 140 l -8 6 l 9 4" fill="none" stroke="#2A2A2A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="356" y="44" font-family="Caveat, cursive" font-size="22" fill="#5A5550">de nieuwe collega</text>
  </svg>`;

  const SVG_HERHAAL = `<svg viewBox="0 0 560 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van een kringloop van prompt naar antwoord en weer terug, die elke ronde dichter bij het doel komt">
    <path d="M36 220 C 160 214, 410 223, 524 216" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M150 120 C 150 78, 214 56, 280 56 C 346 56, 410 78, 410 120 C 410 162, 346 184, 280 184 C 230 184, 188 170, 166 148" stroke="#2A2A2A" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M170 156 L 162 140 L 150 152" fill="none" stroke="#2A2A2A" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="206" y="116" font-family="Caveat, cursive" font-size="22" fill="#2A2A2A">vraag</text>
    <text x="312" y="116" font-family="Caveat, cursive" font-size="22" fill="#2A2A2A">net niet</text>
    <text x="232" y="158" font-family="Caveat, cursive" font-size="23" fill="#E8590C">"opnieuw, maar dan zo..."</text>
    <path d="M438 150 C 458 138, 474 122, 484 104" stroke="#4C8577" stroke-width="4" fill="none" stroke-linecap="round" stroke-dasharray="2 9"/>
    <circle cx="488" cy="96" r="12" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="3"/>
    <path d="M483 96 l 4 4 l 7 -8" stroke="#4C8577" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="446" y="84" font-family="Caveat, cursive" font-size="20" fill="#4C8577">raak</text>
  </svg>`;

  const SVG_DETAIL = `<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van twee fotolijsten: links een kale opdracht met een vaag plaatje, rechts een gedetailleerde opdracht met een rijk plaatje">
    <path d="M30 234 C 160 228, 410 236, 530 230" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <rect x="44" y="60" width="180" height="140" rx="8" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3.5"/>
    <path d="M84 150 C 110 150, 110 128, 134 128 C 158 128, 162 150, 184 150" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="150" cy="104" r="10" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="2.5"/>
    <text x="58" y="224" font-family="Caveat, cursive" font-size="20" fill="#5A5550">"otter in een vliegtuig"</text>
    <text x="252" y="138" font-family="Caveat, cursive" font-size="30" fill="#E8590C">vs</text>
    <rect x="316" y="50" width="200" height="160" rx="8" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3.5"/>
    <path d="M330 170 L 502 170 L 502 198 L 330 198 Z" fill="#DCEAE5" stroke="#2A2A2A" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M352 170 C 352 142, 372 128, 396 128 C 420 128, 440 142, 440 170 Z" fill="#FBE3D4" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="388" cy="116" r="14" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="2.5"/>
    <circle cx="383" cy="115" r="2" fill="#2A2A2A"/><circle cx="393" cy="115" r="2" fill="#2A2A2A"/>
    <path d="M380 96 C 378 84, 398 84, 396 96 Z" fill="#2A2A2A" stroke="#2A2A2A" stroke-width="2" stroke-linejoin="round"/>
    <rect x="452" y="142" width="44" height="34" rx="4" fill="#DCEAE5" stroke="#2A2A2A" stroke-width="2.5"/>
    <circle cx="474" cy="78" r="13" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="2.5"/>
    <g stroke="#E8590C" stroke-width="2" stroke-linecap="round"><path d="M474 60 l 0 -6 M492 78 l 6 0 M487 65 l 4 -4"/></g>
    <text x="320" y="232" font-family="Caveat, cursive" font-size="20" fill="#5A5550">drie zinnen vol details</text>
  </svg>`;

  const SVG_BOUWSTENEN = `<svg viewBox="0 0 560 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van vijf blokken op elkaar die samen een goede prompt vormen: rol, taak, doelgroep, vorm en grenzen">
    <path d="M30 244 C 160 238, 410 246, 530 240" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <g stroke="#2A2A2A" stroke-width="3" font-family="Caveat, cursive" font-size="21" fill="#2A2A2A">
      <g transform="rotate(-1.5 290 210)"><rect x="170" y="196" width="240" height="34" rx="6" fill="#FBE3D4"/><text x="186" y="219">rol: wie ben jij?</text></g>
      <g transform="rotate(1 290 174)"><rect x="170" y="160" width="240" height="34" rx="6" fill="#DCEAE5"/><text x="186" y="183">taak: wat moet er gebeuren?</text></g>
      <g transform="rotate(-1 290 138)"><rect x="170" y="124" width="240" height="34" rx="6" fill="#FFE8A3"/><text x="186" y="147">doelgroep: voor wie?</text></g>
      <g transform="rotate(1.5 290 102)"><rect x="170" y="88" width="240" height="34" rx="6" fill="#FBE3D4"/><text x="186" y="111">vorm: hoe lang, welk format?</text></g>
      <g transform="rotate(-1 290 66)"><rect x="170" y="52" width="240" height="34" rx="6" fill="#DCEAE5"/><text x="186" y="75">grenzen: wat juist niet?</text></g>
    </g>
    <path d="M438 196 C 462 168, 470 120, 462 78" stroke="#4C8577" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="2 8"/>
    <text x="456" y="150" font-family="Caveat, cursive" font-size="20" fill="#4C8577" transform="rotate(90 456 150)">een betere prompt</text>
  </svg>`;

  const SVG_BOT = `<svg viewBox="0 0 560 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van een robot met een vastgeprikte instructiekaart, klaar voor een terugkerende taak">
    <path d="M36 218 C 160 212, 410 221, 524 214" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <rect x="150" y="86" width="120" height="100" rx="16" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3.5"/>
    <circle cx="184" cy="124" r="8" fill="#2A2A2A"/><circle cx="236" cy="124" r="8" fill="#2A2A2A"/>
    <path d="M186 154 C 200 164, 220 164, 234 154" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M210 86 l 0 -18 M210 64 c 0 -6, 9 -6, 9 0 c 0 6, -9 6, -9 0" stroke="#2A2A2A" stroke-width="3" fill="#E8590C" stroke-linecap="round"/>
    <path d="M150 130 l -16 0 M270 130 l 16 0" stroke="#2A2A2A" stroke-width="3.5" stroke-linecap="round"/>
    <rect x="170" y="186" width="80" height="26" rx="6" fill="#DCEAE5" stroke="#2A2A2A" stroke-width="3"/>
    <g transform="rotate(5 380 110)">
      <rect x="320" y="64" width="120" height="92" rx="6" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="3"/>
      <circle cx="380" cy="72" r="5" fill="#E8590C" stroke="#2A2A2A" stroke-width="2"/>
      <text x="332" y="98" font-family="Caveat, cursive" font-size="18" fill="#2A2A2A">"Jij ruimt mijn</text>
      <text x="332" y="120" font-family="Caveat, cursive" font-size="18" fill="#2A2A2A">notulen op tot een</text>
      <text x="332" y="142" font-family="Caveat, cursive" font-size="18" fill="#2A2A2A">nette samenvatting."</text>
    </g>
    <text x="74" y="80" font-family="Caveat, cursive" font-size="21" fill="#4C8577">één keer instellen,</text>
    <text x="74" y="104" font-family="Caveat, cursive" font-size="21" fill="#4C8577">elke keer gebruiken</text>
  </svg>`;

  const SVG_TRAP = `<svg viewBox="0 0 560 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van een trap met drie treden: praten in de chat, dingen laten bouwen, en agents die zelfstandig werken">
    <path d="M28 238 C 150 232, 410 240, 532 234" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <g stroke="#2A2A2A" stroke-width="3.5" fill="none" stroke-linejoin="round">
      <path d="M70 236 L 70 188 L 210 188 L 210 236"/>
      <path d="M210 188 L 210 134 L 350 134 L 350 236"/>
      <path d="M350 134 L 350 80 L 490 80 L 490 236"/>
    </g>
    <rect x="100" y="160" width="56" height="22" rx="6" fill="#FBE3D4" stroke="#2A2A2A" stroke-width="2.5"/>
    <text x="92" y="218" font-family="Caveat, cursive" font-size="19" fill="#5A5550">praten</text>
    <g stroke="#2A2A2A" stroke-width="2.5"><rect x="250" y="104" width="40" height="26" rx="4" fill="#DCEAE5"/><path d="M258 130 l 0 8 l 24 0 l 0 -8"/></g>
    <text x="240" y="166" font-family="Caveat, cursive" font-size="19" fill="#5A5550">laten bouwen</text>
    <circle cx="420" cy="56" r="14" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3"/>
    <circle cx="415" cy="55" r="2" fill="#2A2A2A"/><circle cx="425" cy="55" r="2" fill="#2A2A2A"/>
    <path d="M420 42 l 0 -8 M420 34 c 0 -4, 6 -4, 6 0 c 0 4, -6 4, -6 0" stroke="#2A2A2A" stroke-width="2.5" fill="#E8590C" stroke-linecap="round"/>
    <text x="392" y="112" font-family="Caveat, cursive" font-size="19" fill="#5A5550">agents</text>
    <path d="M88 150 C 150 96, 300 60, 470 40" stroke="#E8590C" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="2 9"/>
    <text x="92" y="60" font-family="Caveat, cursive" font-size="22" fill="#E8590C">je staat op de begane grond</text>
  </svg>`;

  /* ============================================================
     De module
     ============================================================ */

  window.MODULE = {
    kicker: "Gratis e-learning",
    titel: "Praktisch werken met AI",
    sub: "Betere antwoorden krijgen zonder prompt engineer te worden: geef context als aan een collega, en blijf proberen. Door Max van den Broek, auteur van AI-Pionier.",

    promptbouwer: true,

    lessen: [

      /* ========== START ========== */
      {
        sectie: "Start",
        kicker: "Welkom",
        titel: "Je hoeft geen prompt engineer te worden",
        navTitel: "Welkom",
        html: `
  ${illu(SVG_COLLEGA, "Je werkt een capabele nieuwe collega in. Meer is het niet.")}

  <p>Er doen veel verhalen de ronde over "prompt engineering": magische toverspreuken waarmee je AI pas echt aan het werk krijgt. Ik ga je iets geruststellends vertellen: <mark>dat valt reuze mee</mark>. Je hoeft geen geheime trucs te leren. De twee dingen die echt het verschil maken, kun je vandaag al.</p>
  <p>Even voorstellen, voor wie hier binnenvalt: ik ben Max van den Broek, auteur van <mark>AI-Pionier</mark> (Koninklijke Boom Uitgevers) en voormalig docent AI aan de Universiteit van Amsterdam. Tegenwoordig train ik teams in het slim gebruiken van AI.</p>
  <p>Wat je in deze module leert, in vier delen:</p>
  <p><strong>Deel 1:</strong> de grondhouding. Behandel AI als een nieuwe collega, en blijf proberen.<br>
  <strong>Deel 2:</strong> betere antwoorden. Detail, een handige checklist, vorm, voorbeelden en toon.<br>
  <strong>Deel 3:</strong> slimmer inrichten. Vaste instructies, praten in plaats van typen, en je eigen bot.<br>
  <strong>Deel 4:</strong> voorbij de chat. Wat er ligt achter het typen: dingen laten bouwen en agents.</p>
  <p>Deze module duurt ongeveer 30 minuten, je hoeft geen account aan te maken en aan het eind wachten een quiz en een certificaat. En je doet hem het best <mark>met je AI-tool ernaast</mark>: overal staan blokken waarbij je het meteen zelf probeert.</p>
  <div class="leerdoelen">
    <div class="ld-kop">Na deze module kun je</div>
    <ul>
      <li>uitleggen waarom je een AI-tool context geeft zoals aan een nieuwe collega, en wat er misgaat als je dat niet doet</li>
      <li>een tegenvallend antwoord in een paar rondes bijsturen, in plaats van te zoeken naar één perfecte prompt</li>
      <li>een vastgelopen prompt verbeteren met de vijf bouwstenen: rol, taak, doelgroep, vorm en grenzen</li>
      <li>sturen op vorm en toon, en een voorbeeld meegeven van hoe een goed resultaat eruitziet</li>
      <li>vaste voorkeuren één keer instellen en een eigen bot maken voor terugkerende taken, zonder te programmeren</li>
    </ul>
  </div>
  <div class="note">Snap je nog niet hoe een taalmodel werkt (waarom meer context helpt, waarom het soms verzint)? Doe dan eerst <a href="/academy/module-hoe-ai-werkt.html">Hoe AI echt werkt</a>. Deze module bouwt daar losjes op voort, maar is ook zelfstandig te volgen.</div>`
      },

      /* ========== DEEL 1: DE GRONDHOUDING ========== */
      {
        sectie: "Deel 1 · De grondhouding",
        kicker: "Deel 1 · Context",
        titel: "Behandel AI als een nieuwe collega",
        navTitel: "AI als nieuwe collega",
        html: `
  <p>Hier is het belangrijkste model dat je nodig hebt. Een AI-tool is als een <mark>capabele nieuwe collega</mark>: slim, belezen, snel, maar hij weet helemaal niets van jou, je project of je bedoeling. Wat je een mens zou vertellen om hem op weg te helpen, vertel je de AI ook.</p>
  <p>Stel, je vraagt een nieuwe collega "schrijf even een mail". Dan vraagt die terug: aan wie, waarover, hoe formeel, wat moet eruit komen? Diezelfde informatie heeft een taalmodel nodig. Geef je niets mee, dan krijg je een gemiddeld, nietszeggend antwoord. Niet omdat het ding dom is, maar omdat het <mark>moet raden</mark> wat je bedoelt.</p>
  <p>Vergelijk deze twee:</p>
  <table>
    <tr><th>Kale vraag</th><th>Met context, zoals aan een collega</th></tr>
    <tr><td>"Schrijf een uitnodiging voor een overleg."</td><td>"Schrijf een uitnodiging voor een informeel teamoverleg van 8 mensen, 30 minuten, over de planning van volgende maand. Nuchtere toon, en vraag mensen vooraf hun punten aan te leveren."</td></tr>
  </table>
  <p>De tweede kost je tien seconden meer en levert iets bruikbaars op in plaats van een vormeloze tekst die je alsnog helemaal moet herschrijven.</p>
  <div class="oefen" id="oefen-collega">
    <div class="oefen-kop">Probeer het zelf</div>
    <p>Pak een taakje van vandaag en geef de context die je een nieuwe collega ook zou geven:</p>
    <div class="oefen-prompt"><code>Ik ga kennismaken met een nieuwe samenwerkingspartner. Ik werk als [jouw functie] en wil vooral [jouw doel] bereiken. Welke onderwerpen kan ik het beste bespreken?</code><button class="kopieer" type="button">Kopieer</button></div>
    <details class="oefen-verwacht"><summary>Waar je op moet letten</summary><p>Hoe meer je over jezelf en je doel prijsgeeft, hoe bruikbaarder de suggesties. Laat de haakjes leeg en je ziet meteen hoe algemeen het antwoord wordt. Context is geen trucje, het is gewoon goed uitleggen.</p></details>
  </div>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Een nieuwe collega weet ook niets van jouw project. Vertel het hem."</p></div>`
      },
      {
        kicker: "Deel 1 · Itereren",
        titel: "De echte vaardigheid: blijven proberen",
        navTitel: "Blijven proberen",
        html: `
  <p>Veel mensen denken dat ze in één keer de perfecte prompt moeten typen. Dat is een misverstand, en een verlammend misverstand. <mark>Je hoeft het niet in één keer goed te krijgen.</mark> Sterker: bijna niemand doet dat.</p>
  <p>Zo werkt het in de praktijk: je vraagt iets, het resultaat is net niet goed, en dan stuur je gewoon bij. "Dat was een goed begin, maar maak het korter." "Haal die eerste zin weg." "Nu wat zakelijker." Het kost soms vijf of tien keer bijsturen voor je hebt wat je wilt. Dat is <mark>geen falen, dat is de methode</mark>.</p>

  ${illu(SVG_HERHAAL, "Niet de eerste prompt telt, maar de tweede, derde en vierde.")}

  <p>Dit is goed nieuws, want het haalt alle druk weg. Je hoeft niet de juiste woorden te kennen. Je hoeft alleen te kunnen zeggen wat er beter moet, in gewone taal. Praten met AI is een gesprek, geen toverspreuk.</p>
  <div class="oefen" id="oefen-itereren">
    <div class="oefen-kop">Probeer het zelf</div>
    <p>Vraag iets eenvoudigs, en stuur daarna bij met deze vervolgprompt:</p>
    <div class="oefen-prompt"><code>Dat was een goed begin. Maak het nu korter, zakelijker, en haal de inleidende zin weg.</code><button class="kopieer" type="button">Kopieer</button></div>
    <details class="oefen-verwacht"><summary>Waar je op moet letten</summary><p>Merk op dat je niet opnieuw alles hoeft uit te leggen: het model onthoudt het gesprek. Je duwt het gewoon stap voor stap de goede kant op, net als bij een collega die een eerste versie maakte.</p></details>
  </div>
  <div class="note"><strong>Eerlijke tegenkant:</strong> soms ontdek je tijdens dat bijsturen dat je precies weet wat er moet staan, en dan is zelf typen sneller. Itereren is dus ook een manier om erachter te komen wanneer je het beter zelf doet. Een slechte tekst bijschaven is meestal makkelijker dan vanaf niets beginnen, maar niet altijd.</div>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Proberen is leren. De eerste prompt hoeft niet perfect, want de tweede stuurt bij."</p></div>`
      },

      /* ========== DEEL 2: BETERE ANTWOORDEN ========== */
      {
        sectie: "Deel 2 · Betere antwoorden",
        kicker: "Deel 2 · Detail",
        titel: "Meer detail, beter resultaat",
        navTitel: "Meer detail, beter resultaat",
        html: `
  <p>Als je een specifiek resultaat in je hoofd hebt, geef dan de details die ertoe doen. Het klassieke voorbeeld komt uit mijn trainingen: vraag een beeldtool om <mark>"een otter in een vliegtuig"</mark> en je krijgt iets willekeurigs. Vraag om een Franse otter met baret en gestreept shirt, bij het raam in een businessclass-stoel, met een stokbrood over de schouder en een laptop die de goede kant op staat, en je krijgt precies het plaatje dat je bedoelde.</p>

  ${illu(SVG_DETAIL, "Hetzelfde model. Het verschil zit in wat jij vertelt.")}

  <div class="oefen" id="oefen-detail">
    <div class="oefen-kop">Probeer het zelf</div>
    <p>Heeft je tool een beeldfunctie? Vraag eerst dit:</p>
    <div class="oefen-prompt"><code>Maak een afbeelding van een otter in een vliegtuig.</code><button class="kopieer" type="button">Kopieer</button></div>
    <p>En daarna dit, en zie het verschil:</p>
    <div class="oefen-prompt"><code>Maak een cinematische, fotorealistische afbeelding van een Franse otter die bij het raam in een businessclass-vliegtuigstoel zit tijdens het gouden uur. De otter draagt een zwarte baret en een gestreept shirt, heeft een stokbrood over zijn schouder, en voor hem staat een laptop die de goede kant op staat.</code><button class="kopieer" type="button">Kopieer</button></div>
    <details class="oefen-verwacht"><summary>Waar je op moet letten</summary><p>Geen beeldfunctie? Doe hetzelfde met tekst: vraag "schrijf een productbeschrijving" en daarna dezelfde vraag met doelgroep, toon, lengte en drie kenmerken erbij.</p></details>
  </div>
  <div class="note"><strong>Nuance:</strong> bij plaatjes vult AI ontbrekende details vaak zelf in, dus je hoeft niet altijd alles te benoemen. De les is niet "altijd zo lang mogelijk", maar "heb je een specifiek beeld voor ogen, stuur dan op de details die ertoe doen".</div>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Vaag erin, vaag eruit. Specifiek erin, bruikbaar eruit."</p></div>`
      },
      {
        kicker: "Deel 2 · De checklist",
        titel: "Vastlopen? Loop deze vijf langs",
        navTitel: "De vijf bouwstenen",
        html: `
  <p>Voor de meeste taken heb je geen recept nodig: gewoon context geven en bijsturen volstaat. Maar krijg je iets belangrijks maar niet goed, dan helpt een korte checklist. Vijf bouwstenen die je prompt scherper maken:</p>
  ${illu(SVG_BOUWSTENEN, "Geen verplicht recept. Een geheugensteun voor als het niet lukt.")}
  <p><strong>1. Rol</strong> - wie moet de AI zijn? "Je bent een ervaren tekstschrijver."<br>
  <strong>2. Taak</strong> - wat moet er precies gebeuren? "Herschrijf deze tekst."<br>
  <strong>3. Doelgroep</strong> - voor wie is het? "Voor klanten zonder technische kennis."<br>
  <strong>4. Vorm</strong> - hoe lang, welk format? "Maximaal 150 woorden, in bullets."<br>
  <strong>5. Grenzen</strong> - wat juist niet? "Geen jargon, geen uitroeptekens."</p>
  <p>Bouw zelf een prompt op uit deze vijf en kijk wat eruit komt:</p>
  <div class="demo" id="demo-promptbouwer">
    <div class="demo-label">Bouw je prompt</div>
    <input class="pb-invoer" data-pb="rol" type="text" placeholder="Rol: je bent een ervaren tekstschrijver" value="Je bent een ervaren tekstschrijver">
    <input class="pb-invoer" data-pb="taak" type="text" placeholder="Taak: herschrijf onderstaande tekst" value="Herschrijf onderstaande tekst zodat hij prettiger leest">
    <input class="pb-invoer" data-pb="doelgroep" type="text" placeholder="Doelgroep: voor klanten zonder technische kennis" value="voor klanten zonder technische kennis">
    <input class="pb-invoer" data-pb="vorm" type="text" placeholder="Vorm: maximaal 150 woorden, in bullets" value="maximaal 150 woorden">
    <input class="pb-invoer" data-pb="grenzen" type="text" placeholder="Grenzen: geen jargon, geen uitroeptekens" value="geen jargon en geen uitroeptekens">
    <div class="pb-uit"></div>
    <button class="kopieer pb-kopieer" type="button">Kopieer prompt</button>
  </div>
  <p class="muted">Laat gerust velden leeg: je ziet meteen dat de prompt korter en vager wordt. Niet elke taak heeft alle vijf nodig.</p>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Rol, taak, doelgroep, vorm, grenzen. Geen recept, maar een reddingsboei."</p></div>`
      },
      {
        kicker: "Deel 2 · Vorm en voorbeelden",
        titel: "Vraag om een vorm, en geef een voorbeeld",
        navTitel: "Vorm en voorbeelden",
        html: `
  <p>Twee handgrepen die bijna altijd werken en die mensen vaak vergeten.</p>
  <h2>1. Vraag expliciet om een vorm</h2>
  <p>Een taalmodel geeft je standaard een lap proza. Wil je iets anders, zeg het dan. "In een tabel." "Als vijf bullets." "Maximaal 150 woorden." "Eerst een samenvatting, dan de details." Eén compacte opdracht kan meerdere vormeisen bevatten: <mark>"Analyseer dit bestand, maak er een grafiek van en vat de bevindingen samen in 150 woorden."</mark> Drie wensen in één zin, en je krijgt ze alle drie.</p>
  <h2>2. Geef een voorbeeld van wat je wilt</h2>
  <p>Dit is misschien wel de meest onderschatte truc. Heb je een bepaalde stijl of opzet in gedachten? <mark>Laat zien hoe "goed" eruitziet.</mark> Plak een eerdere mail in jouw toon, een voorbeeld van een geslaagd verslag, of een opzet die je mooi vond. Het model leert er razendsnel van. Vakmensen noemen dit "een voorbeeld meegeven"; je hoeft de term niet te kennen, alleen de gewoonte.</p>
  <div class="oefen" id="oefen-vorm">
    <div class="oefen-kop">Probeer het zelf</div>
    <p>Vraag een samenvatting in een afgedwongen vorm:</p>
    <div class="oefen-prompt"><code>Vat de tekst hieronder samen alsof ik twaalf jaar oud ben, in maximaal vijf zinnen.</code><button class="kopieer" type="button">Kopieer</button></div>
    <details class="oefen-verwacht"><summary>Waar je op moet letten</summary><p>"Alsof ik twaalf ben" stuurt de doelgroep, "vijf zinnen" stuurt de vorm. Twee bouwstenen in één korte zin. Vergelijk het met een kale "vat dit samen" en je voelt het verschil.</p></details>
  </div>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Zeg in welke vorm je het wilt, of laat zien hoe goed eruitziet. Liefst allebei."</p></div>`
      },
      {
        kicker: "Deel 2 · Beeld als input",
        titel: "AI kan ook kijken: geef het een foto",
        navTitel: "Geef AI een foto",
        html: `
  <p>We vergeten het vaak, maar je hoeft AI niet alleen tekst te geven. Je kunt ook <mark>een foto of schermafbeelding uploaden</mark> en daar een vraag bij stellen. Een foto van een meterstand, een handgeschreven notitie, een whiteboard na een sessie, een foutmelding op je scherm, een grafiek in een rapport: de meeste moderne AI-tools kunnen het lezen en uitleggen.</p>
  <p>Dat opent handige toepassingen: een wirwar van aantekeningen laten uittypen, een tabel uit een foto halen, een grafiek laten samenvatten, of een storingscode opzoeken door er simpelweg een foto van te maken. Zie het als een <mark>tweede paar ogen</mark> dat meekijkt en meedenkt.</p>
  <p>Met dezelfde nuance als altijd: het kan mislezen. Een 7 voor een 1, een komma die het mist, een detail dat het invult. Net als bij tekst geldt dus: <mark>jij blijft verantwoordelijk</mark>, en bij iets wat ertoe doet (een meterstand die de factuur bepaalt, een cijfer uit een rapport) controleer je het na.</p>
  <div class="oefen" id="oefen-foto">
    <div class="oefen-kop">Probeer het zelf</div>
    <p>Maak een foto van iets met tekst of cijfers erop (een bonnetje, een meterstand, een pagina met aantekeningen) en upload die in je AI-tool met:</p>
    <div class="oefen-prompt"><code>Lees voor wat er op deze foto staat en zet het netjes in tekst. Noem het als iets onleesbaar is in plaats van te gokken.</code><button class="kopieer" type="button">Kopieer</button></div>
    <details class="oefen-verwacht"><summary>Waar je op moet letten</summary><p>De toevoeging "noem het als iets onleesbaar is in plaats van te gokken" helpt tegen invullen. Controleer de cijfers zelf bij iets wat telt. Werkt het best bij gedrukte tekst; bij slordig handschrift wordt het lastiger.</p></details>
  </div>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Je mag AI ook een foto geven. Een tweede paar ogen, maar jij blijft kijken."</p></div>`
      },
      {
        kicker: "Deel 2 · Toon",
        titel: "Je stuurt de toon van het antwoord",
        navTitel: "Toon sturen",
        html: `
  <p>Je kunt niet alleen sturen wat AI zegt, maar ook hoe. Vraag om "een diplomatieke mail", "een enthousiaste aankondiging" of "een zakelijke, korte reactie" en je krijgt precies die toon. Een voorbeeld dat ik graag laat zien: geef je rauwe ergernis mee en vraag om beleefdheid.</p>
  <div class="oefen" id="oefen-toon2">
    <div class="oefen-kop">Probeer het zelf</div>
    <div class="oefen-prompt"><code>Schrijf een vriendelijke maar duidelijke mail aan een collega die een afspraak voor de derde keer heeft gemist. Houd het netjes en zonder verwijten.</code><button class="kopieer" type="button">Kopieer</button></div>
    <details class="oefen-verwacht"><summary>Waar je op moet letten</summary><p>Je stort je frustratie erin, het model levert een nette, diplomatieke versie terug. Zo gebruik je AI als buffer tussen wat je voelt en wat je verstuurt.</p></details>
  </div>
  <p>Een aparte vraag die je vast hebt gehoord: helpt het om <mark>"alsjeblieft" en "dankjewel"</mark> te zeggen, of juist streng te doen? Eerlijk antwoord: dat is veel minder zeker dan de tips hierboven. Wat de toon van jouw prompt vooral stuurt, is de toon van het antwoord. Of beleefd-zijn de kwaliteit verbetert, is twijfelachtig. Het kan geen kwaad om te experimenteren, maar verwacht er geen wonderen van. Beschouw het als smaak, niet als techniek.</p>
  <div class="callout"><div class="label">De kern van deze les</div><p>"De toon die je vraagt, is de toon die je krijgt. Beleefdheid is smaak, geen trucje."</p></div>`
      },

      /* ========== DEEL 3: SLIMMER INRICHTEN ========== */
      {
        sectie: "Deel 3 · Slimmer inrichten",
        kicker: "Deel 3 · Instellingen",
        titel: "Stel je voorkeuren één keer in",
        navTitel: "Vaste instructies en geheugen",
        html: `
  <p>Tot nu toe gaf je context per gesprek. Maar veel zaken zijn altijd hetzelfde: wie je bent, wat je doet, hoe je het liefst antwoorden krijgt. De meeste AI-tools laten je dat <mark>één keer vastleggen</mark>, in je accountinstellingen (vaak "aangepaste instructies", "persoonlijke instructies" of "geheugen" genoemd). Daarna geldt het voor al je gesprekken.</p>
  <p>Twee dingen zijn handig om in te stellen:</p>
  <p><strong>Stijl:</strong> hoe je antwoorden wilt. Bijvoorbeeld: "Houd je antwoorden kort, met bullets en vetgedrukte kernwoorden."<br>
  <strong>Context:</strong> wie je bent. Bijvoorbeeld: "Ik werk als [functie], ik wil graag concrete, praktische antwoorden en geen lange inleidingen."</p>

  ${illu(SVG_BOT, "Zet je voorkeuren vast en je herhaalt jezelf nooit meer.")}

  <div class="oefen" id="oefen-instructies">
    <div class="oefen-kop">Probeer het zelf</div>
    <p>Test het effect eerst in een los gesprek voordat je het vastzet:</p>
    <div class="oefen-prompt"><code>Vanaf nu: houd je antwoorden kort, gebruik bullet points en markeer kernwoorden vetgedrukt. Ik werk als [functie] en wil graag concrete, praktische antwoorden.</code><button class="kopieer" type="button">Kopieer</button></div>
    <details class="oefen-verwacht"><summary>Waar je op moet letten</summary><p>Bevalt het, zet het dan in de instellingen van je tool zodat je het niet elke keer hoeft te typen. Bijvangst: gepersonaliseerde antwoorden lezen ook minder als standaard "AI-tekst".</p></details>
  </div>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Wat altijd geldt, stel je één keer in. Daarna werkt het op de achtergrond mee."</p></div>`
      },
      {
        kicker: "Deel 3 · Praten en opnieuw",
        titel: "Praat in plaats van te typen (en begin op tijd opnieuw)",
        navTitel: "Praten en nieuw gesprek",
        html: `
  <p>Twee praktische gewoontes die je werk soepeler maken.</p>
  <h2>Praat in plaats van te typen</h2>
  <p>Lange context intypen is veel werk, en juist daarom geven mensen te weinig mee. De meeste AI-tools hebben een <mark>spraakknop</mark>. Spreek gewoon je hele gedachtenstroom in, rommelig en al, en laat het model er iets nets van maken. Ik typ lange teksten allang niet meer; ik praat ze in. Je geeft zo moeiteloos drie keer zoveel context, en dat is precies wat de kwaliteit omhoog brengt.</p>
  <h2>Begin op tijd een nieuw gesprek</h2>
  <p>Een taalmodel kan maar een beperkte hoeveelheid tekst tegelijk overzien. In een heel lang gesprek <mark>verwatert het begin</mark>: je instructies van bovenaan raken ondergesneeuwd (dat zag je in de module Verantwoord, bij "het raakt het begin kwijt"). De oplossing is simpel: voor een nieuwe taak, een nieuw gesprek. En voor dingen die je in elk gesprek wilt, gebruik je de vaste instructies uit de vorige les.</p>
  <div class="note">Vuistregel: één gesprek = één klus. Merk je dat het model afdwaalt, instructies vergeet of in herhaling valt, begin dan fris. Dat is sneller dan blijven duwen tegen een volgelopen gesprek.</div>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Praten geeft meer context dan typen. En een nieuwe klus verdient een nieuw gesprek."</p></div>`
      },
      {
        kicker: "Deel 3 · Je eigen bot",
        titel: "Maak een bot voor werk dat terugkomt",
        navTitel: "Maak je eigen bot",
        html: `
  <p>Doe je een bepaalde taak steeds opnieuw, met steeds dezelfde uitleg erbij? Dan kun je die uitleg <mark>vastleggen in een eigen bot</mark> (afhankelijk van je tool heet dat een custom GPT, een Gem, een assistent of een project). Een bot is niets anders dan een prompt die je opslaat, zodat je hem niet telkens opnieuw hoeft te typen.</p>
  <p>En het maken is echt simpel: je schrijft gewoon in gewone woorden op wat je wilt dat de bot doet. Geen code, geen technische kennis. In mijn trainingen maakt iedereen binnen een uur zijn eerste werkende bot. Een voorbeeldinstructie:</p>
  <div class="oefen" id="oefen-bot">
    <div class="oefen-kop">Probeer het zelf</div>
    <p>Heeft je tool een optie om een eigen bot of "project" te maken? Geef hem deze instructie:</p>
    <div class="oefen-prompt"><code>Jij bent mijn vaste hulp voor het opschonen van vergadernotities. Ik geef je ruwe aantekeningen, jij maakt er een nette samenvatting van met kopjes, de genomen besluiten, en de actiepunten in een tabel.</code><button class="kopieer" type="button">Kopieer</button></div>
    <details class="oefen-verwacht"><summary>Wanneer loont een bot?</summary><p>Vier signalen: het is een terugkerende taak, er hoort veel vaste context bij, je wilt hem met collega's delen, of je wilt elke keer hetzelfde format. Herken je er twee of meer? Dan is een bot de moeite waard.</p></details>
  </div>
  <p>Je kunt zo'n bot ook <mark>bronnen meegeven</mark>: een PDF met je huisstijl, een voorbeeld van een goed document, je strategische visie. Dan werkt hij meteen binnen jouw kaders, zonder dat je het elke keer uitlegt.</p>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Een bot is een prompt die je bewaart. Opschrijven wat je wilt, dat is alles."</p></div>`
      },

      /* ========== DEEL 4: VOORBIJ DE CHAT ========== */
      {
        sectie: "Deel 4 · Voorbij de chat",
        kicker: "Deel 4 · De volgende verdieping",
        titel: "Voorbij de chat: laten bouwen en agents",
        navTitel: "Voorbij de chat",
        html: `
  <p>Alles in deze module speelde zich af in een chatvenster: jij typt, AI antwoordt. Dat is bewust. Goed leren praten met AI is precies wat AI-geletterdheid van je vraagt, en je komt er verrassend ver mee. Maar het is wel de <mark>begane grond</mark>. Eerlijk is eerlijk: er ligt een wereld achter die je hier niet ziet.</p>

  ${illu(SVG_TRAP, "Goed kunnen praten met AI is de fundering. Daarboven ligt nog veel.")}

  <p><strong>Een verdieping hoger laat je AI niet alleen antwoorden, maar dingen <mark>maken</mark>.</strong> Vraag "maak een rekentool waarmee ik kan uitrekenen hoeveel ik bespaar bij extra aflossen" en je hebt binnen een minuut een werkend hulpmiddel, zonder dat je kunt programmeren. Mensen noemen dit "vibe coding". Ik heb er zelf dingen mee gebouwd die ik met de hand nooit had gekund.</p>
  <p><strong>En nog een verdieping hoger werken <mark>agents</mark>:</strong> AI die niet één antwoord geeft, maar zelfstandig aan een taak werkt. Die opzoekt, iets probeert, het resultaat bekijkt, zichzelf corrigeert en doorgaat, soms uren achter elkaar. Een vraag verschuift dan van "schrijf deze mail" naar "zoek dit uit en lever het op". Dat is geen sciencefiction meer, het bestaat vandaag.</p>
  <p>Voor nu hoef je dat allemaal niet te kunnen, en het hoort ook niet bij de basis die de wet van je vraagt. Maar het is goed om te weten dat het er is, want je hoort de termen steeds vaker. En het mooie: <mark>de basis die je nu hebt, blijft de fundering</mark> onder al die geavanceerdere dingen. Wie goed kan uitleggen wat hij wil, en blijft bijsturen, is ook met die nieuwe gereedschappen in het voordeel.</p>
  <div class="note"><strong>Verdieping volgt.</strong> Een aparte module over zelf dingen bouwen en met agents werken staat op de planning. Die valt strikt genomen voorbij AI-geletterdheid, dus hij komt later. Wil je niets missen? Dat hoor je vanzelf als je je certificaat haalt en je e-mail achterlaat.</p></div>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Praten met AI is de begane grond. Bouwen en agents liggen erboven, op dezelfde fundering."</p></div>`
      },

      /* ========== AFRONDING ========== */
      {
        sectie: "Afronding",
        kicker: "Toets jezelf",
        titel: "De quiz: waar of niet waar?",
        navTitel: "De quiz",
        html: `
  <p class="muted">Elf stellingen over deze module. Klik je antwoord en lees de uitleg. Haal je hem, dan staat het certificaat klaar.</p>
  <div id="quiz"></div>
  <div class="score" id="score"></div>`
      },
      {
        kicker: "Afsluiting",
        titel: "Je werkt nu handiger met AI dan de meeste gebruikers",
        navTitel: "Afsluiting + spiekbriefje",
        html: `
  <p>Dat was de module. Geen toverspreuken, wel een paar gewoontes die het verschil maken. Je spiekbriefje:</p>

  <div class="spiek">
    <ol>
      <li><strong>"AI is een capabele nieuwe collega.</strong> Ik geef de context die ik een mens ook zou geven."</li>
      <li><strong>"De eerste prompt hoeft niet perfect.</strong> Ik stuur gewoon bij tot het klopt."</li>
      <li><strong>"Heb ik een specifiek resultaat voor ogen?</strong> Dan geef ik de details die ertoe doen."</li>
      <li><strong>"Loop ik vast? Rol, taak, doelgroep, vorm, grenzen.</strong> En ik vraag om een vorm of geef een voorbeeld."</li>
      <li><strong>"Wat altijd geldt, stel ik één keer in.</strong> En ik praat liever dan ik typ."</li>
      <li><strong>"Terugkerend werk wordt een bot.</strong> Een opgeslagen prompt, meer is het niet."</li>
      <li><strong>"Dit is de begane grond.</strong> Bouwen en agents liggen erboven, op dezelfde fundering."</li>
    </ol>
  </div>

  <p>En je huiswerk is simpel: pak vandaag één klus en doe hem mét AI, volgens punt 1 en 2. Geef context, stuur twee keer bij, en kijk waar je uitkomt. Dat is letterlijk de hele vaardigheid.</p>

  <div class="callout">
    <div class="label">Hoe nu verder?</div>
    <p class="gewoon">Wil je dat jouw team zo leert werken met AI, met jullie eigen taken en voorbeelden? Daar help ik bij: met trainingen, e-learnings op maat en praktische tools. Kijk op <a href="https://aimetmax.nl">aimetmax.nl</a> of stuur me een bericht op <a href="https://linkedin.com/in/maxbroek">LinkedIn</a>. En leg de <a href="/academy/examen.html">eindtoets</a> af voor je academy-certificaat.</p>
  </div>

  <p class="muted" style="font-size: 13px;">Deze module is gebaseerd op mijn boek AI-Pionier (Boom, 2024) en op de praktische AI-trainingen die ik gaf aan teams van uiteenlopende vakgebieden.</p>`
      }
    ],

    quiz: [
      { s: "Je moet de perfecte prompt in één keer goed typen, anders werkt AI niet.",
        antwoord: false,
        uitleg: "Niet waar. Bijna niemand doet dat. Je geeft een eerste opdracht en stuurt daarna bij ('korter', 'zonder die inleiding'). Proberen is de methode, geen falen." },
      { s: "Hoe meer relevante context je geeft, hoe bruikbaarder het antwoord meestal is.",
        antwoord: true,
        uitleg: "Waar. Behandel AI als een nieuwe collega die niets van je project weet. De context die je een mens zou geven, geef je de AI ook." },
      { s: "Een gedetailleerde beeldopdracht ('Franse otter met baret, bij het raam, gouden uur') geeft vaak een resultaat dat dichter bij je bedoeling zit dan 'een otter in een vliegtuig'.",
        antwoord: true,
        uitleg: "Waar. Heb je een specifiek beeld voor ogen, geef dan de details die ertoe doen. Vaag erin is vaag eruit." },
      { s: "De vijf bouwstenen (rol, taak, doelgroep, vorm, grenzen) zijn een verplicht recept dat je bij elke prompt moet invullen.",
        antwoord: false,
        uitleg: "Niet waar. Het is een checklist voor als een belangrijke prompt niet lukt, geen verplichting. Veel taken hebben gewoon wat context nodig en niet meer." },
      { s: "Je kunt een taalmodel vragen om een specifieke vorm, zoals een tabel, vijf bullets of maximaal 150 woorden.",
        antwoord: true,
        uitleg: "Waar. Standaard krijg je proza; vraag je om een vorm, dan krijg je die. Eén zin kan meerdere vormeisen bevatten." },
      { s: "Een voorbeeld meegeven van hoe 'goed' eruitziet, helpt het model je stijl te raken.",
        antwoord: true,
        uitleg: "Waar. Plak een eerdere mail in jouw toon of een geslaagd verslag, en het model leert er snel van. Dit is een van de meest onderschatte handgrepen." },
      { s: "Beleefd zijn tegen AI ('alsjeblieft', 'dankjewel') verbetert aantoonbaar de kwaliteit van de antwoorden.",
        antwoord: false,
        uitleg: "Niet waar. Wat je toon vooral stuurt, is de toon van het antwoord. Of beleefdheid de kwaliteit verbetert is twijfelachtig; experimenteren mag, maar verwacht geen wonderen." },
      { s: "Voorkeuren die altijd gelden (kort antwoorden, je functie) kun je één keer instellen in je AI-tool.",
        antwoord: true,
        uitleg: "Waar. Via aangepaste instructies of geheugen gelden ze voor al je gesprekken, zodat je jezelf niet elke keer hoeft te herhalen." },
      { s: "Voor een nieuwe, losse taak kun je beter een nieuw gesprek beginnen dan eindeloos doorgaan in een heel lang gesprek.",
        antwoord: true,
        uitleg: "Waar. In een lang gesprek verwatert het begin en raakt het model instructies kwijt. Eén gesprek, één klus werkt beter." },
      { s: "Een eigen bot maken vereist programmeerkennis.",
        antwoord: false,
        uitleg: "Niet waar. Een bot is een opgeslagen prompt: je schrijft in gewone woorden op wat hij moet doen. In een training maakt iedereen er binnen een uur een." },
      { s: "Je kunt AI ook een foto of schermafbeelding geven (zoals een meterstand of een grafiek) en daar een vraag bij stellen.",
        antwoord: true,
        uitleg: "Waar. De meeste moderne AI-tools kunnen beeld lezen en uitleggen, handig als tweede paar ogen. Het kan wel mislezen, dus controleer zelf wat ertoe doet." }
    ]
  };

})();
