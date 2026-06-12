/* Module: AI in jouw organisatie
   Deel 1: de adoptiekloof (productiviteitsparadox, vier remmen)
   Deel 2: secret cyborgs (verborgen gebruik en hoe je het omdraait)
   Deel 3: pilots die werken (begin bij het werk, hands-on, klein en eerlijk)
   Deel 4: veranderend werk (welk werk blijft over, waar leert de junior)
   Deel 5: beleid en afspraken (wat het regelt, van PDF naar praktijk)
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

  const SVG_KLOOF = `<svg viewBox="0 0 560 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van een grafiek: de lijn van wat de techniek kan stijgt steil, de lijn van wat organisaties eruit halen blijft bijna vlak, daartussen gaapt de adoptiekloof">
    <path d="M60 30 C 58 110, 60 200, 62 252 L 528 256" stroke="#2A2A2A" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <text x="478" y="284" font-family="Caveat, cursive" font-size="22" fill="#5A5550">tijd</text>
    <path d="M86 230 C 170 214, 280 158, 440 60" stroke="#4C8577" stroke-width="4" fill="none" stroke-linecap="round"/>
    <text x="252" y="46" font-family="Caveat, cursive" font-size="23" fill="#4C8577">wat de techniek kan</text>
    <path d="M86 238 C 210 234, 340 222, 470 200" stroke="#E8590C" stroke-width="4" fill="none" stroke-linecap="round"/>
    <text x="218" y="232" font-family="Caveat, cursive" font-size="22" fill="#E8590C">wat organisaties eruit halen</text>
    <path d="M492 78 C 491 114, 490 152, 490 188" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="3 8"/>
    <path d="M484 90 L 492 76 L 499 89" fill="none" stroke="#2A2A2A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M483 176 L 490 190 L 497 175" fill="none" stroke="#2A2A2A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="336" y="140" font-family="Caveat, cursive" font-size="24" fill="#2A2A2A">de adoptiekloof</text>
  </svg>`;

  const SVG_SLAGBOOM = `<svg viewBox="0 0 560 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van een snel autootje dat voor drie gesloten slagbomen staat, met de labels security twee maanden, planning per kwartaal en stakeholders drie weken">
    <path d="M28 206 C 180 199, 380 207, 532 200" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M52 186 C 50 172, 60 165, 78 163 L 90 147 C 95 140, 130 140, 136 147 L 146 161 C 160 163, 168 170, 167 181 C 166 189, 158 192, 148 192 L 70 194 C 60 194, 53 192, 52 186 Z" fill="#FBE3D4" stroke="#2A2A2A" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M96 149 L 93 162 L 128 161 L 122 149 Z" fill="#DCEAE5" stroke="#2A2A2A" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="78" cy="194" r="10" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3"/>
    <circle cx="142" cy="192" r="10" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3"/>
    <g stroke="#E8590C" stroke-width="3" stroke-linecap="round">
      <path d="M40 158 l -20 5"/><path d="M44 174 l -22 5"/>
    </g>
    <path d="M256 204 C 257 186, 256 168, 256 152" stroke="#2A2A2A" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <rect x="182" y="142" width="72" height="12" rx="6" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="2.5"/>
    <g stroke="#E8590C" stroke-width="3" stroke-linecap="round">
      <path d="M200 144 l -7 9"/><path d="M222 144 l -7 9"/><path d="M244 144 l -7 9"/>
    </g>
    <circle cx="256" cy="148" r="5" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="2.5"/>
    <path d="M368 205 C 369 186, 368 166, 368 148" stroke="#2A2A2A" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <rect x="294" y="138" width="72" height="12" rx="6" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="2.5"/>
    <g stroke="#E8590C" stroke-width="3" stroke-linecap="round">
      <path d="M312 140 l -7 9"/><path d="M334 140 l -7 9"/><path d="M356 140 l -7 9"/>
    </g>
    <circle cx="368" cy="144" r="5" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="2.5"/>
    <path d="M480 202 C 481 184, 480 168, 480 152" stroke="#2A2A2A" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <rect x="406" y="142" width="72" height="12" rx="6" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="2.5"/>
    <g stroke="#E8590C" stroke-width="3" stroke-linecap="round">
      <path d="M424 144 l -7 9"/><path d="M446 144 l -7 9"/><path d="M468 144 l -7 9"/>
    </g>
    <circle cx="480" cy="148" r="5" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="2.5"/>
    <text x="148" y="110" font-family="Caveat, cursive" font-size="20" fill="#5A5550">security: 2 maanden</text>
    <text x="288" y="76" font-family="Caveat, cursive" font-size="20" fill="#5A5550">planning: per kwartaal</text>
    <text x="370" y="110" font-family="Caveat, cursive" font-size="19" fill="#5A5550">stakeholders: 3 weken</text>
  </svg>`;

  const SVG_IJSBERG = `<svg viewBox="0 0 560 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van een ijsberg: boven water een klein topje zichtbaar AI-gebruik, onder water een veel grotere massa verborgen gebruik, met rechts een bootje met het label het MT">
    <path d="M30 128 C 80 122, 130 132, 180 127 C 230 122, 280 132, 330 127 C 380 122, 430 131, 480 126 C 500 124, 518 127, 532 125" stroke="#4C8577" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M60 148 C 120 143, 180 151, 240 147 C 300 143, 380 151, 470 146" stroke="#4C8577" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.4"/>
    <path d="M198 128 C 162 144, 132 170, 126 202 C 122 228, 152 248, 204 252 C 264 256, 318 248, 340 224 C 356 206, 348 170, 326 152 C 308 136, 292 130, 278 128 Z" fill="#DCEAE5" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M198 128 C 206 96, 218 68, 234 50 C 248 64, 258 88, 266 102 C 272 112, 276 120, 278 128 Z" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M234 50 C 233 42, 233 34, 233 26" stroke="#2A2A2A" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    <path d="M233 26 l 26 5 l -26 7 Z" fill="#E8590C" stroke="#2A2A2A" stroke-width="2" stroke-linejoin="round"/>
    <text x="306" y="60" font-family="Caveat, cursive" font-size="22" fill="#5A5550">wat jij ziet</text>
    <path d="M310 70 C 292 80, 276 88, 266 96" stroke="#5A5550" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="2 7"/>
    <path d="M276 90 L 264 98 L 277 103" fill="none" stroke="#5A5550" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="156" y="206" font-family="Caveat, cursive" font-size="24" fill="#4C8577">wat er echt gebeurt</text>
    <path d="M426 114 L 486 111 C 480 124, 438 126, 426 114 Z" fill="#FBE3D4" stroke="#2A2A2A" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M458 111 L 457 84" stroke="#2A2A2A" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M457 84 L 480 104 L 457 105 Z" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="2.5" stroke-linejoin="round"/>
    <text x="490" y="100" font-family="Caveat, cursive" font-size="20" fill="#5A5550">het MT</text>
  </svg>`;

  const SVG_HAMER = `<svg viewBox="0 0 560 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van een glanzende hamer op een podium met het label de nieuwe tool, naast een tafel met een stapel papierwerk met het label het werk dat pijn doet">
    <path d="M36 252 C 190 246, 390 254, 526 248" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M76 224 L 224 220 L 226 248 L 74 252 Z" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M98 196 L 202 193 L 204 221 L 96 224 Z" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <g transform="rotate(-24 150 132)">
      <rect x="112" y="112" width="68" height="26" rx="7" fill="#FBE3D4" stroke="#2A2A2A" stroke-width="3"/>
      <rect x="138" y="138" width="13" height="52" rx="6" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3"/>
    </g>
    <g stroke="#E8590C" stroke-width="2.5" stroke-linecap="round">
      <path d="M86 96 l 0 -14"/><path d="M79 89 l 14 0"/>
      <path d="M216 86 l 0 -12"/><path d="M210 80 l 12 0"/>
    </g>
    <g stroke="#4C8577" stroke-width="2.5" stroke-linecap="round" opacity="0.8">
      <path d="M228 140 l 10 -8"/><path d="M64 152 l -10 8"/>
    </g>
    <text x="104" y="243" font-family="Caveat, cursive" font-size="21" fill="#E8590C">de nieuwe tool</text>
    <path d="M330 206 C 390 203, 460 206, 514 202" stroke="#2A2A2A" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M348 206 C 348 220, 347 236, 347 248" stroke="#2A2A2A" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M496 203 C 497 218, 498 234, 499 246" stroke="#2A2A2A" stroke-width="3" stroke-linecap="round" fill="none"/>
    <g stroke="#2A2A2A" stroke-width="2.5" stroke-linejoin="round">
      <path d="M352 188 L 488 184 L 490 202 L 354 206 Z" fill="#FFFDF8"/>
      <path d="M360 170 L 480 167 L 482 185 L 362 188 Z" fill="#DCEAE5"/>
      <path d="M354 152 L 486 148 L 488 167 L 356 170 Z" fill="#FFFDF8"/>
      <path d="M366 134 L 474 131 L 476 149 L 368 152 Z" fill="#FBE3D4"/>
    </g>
    <path d="M380 141 l 70 -2 M380 146 l 48 -1" stroke="#2A2A2A" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
    <text x="346" y="120" font-family="Caveat, cursive" font-size="21" fill="#4C8577">het werk dat pijn doet</text>
  </svg>`;

  const SVG_LADDER = `<svg viewBox="0 0 560 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van een ladder naar een platform met vakvolwassen werk, waarvan de onderste sporten gestippeld zijn omdat AI ze heeft overgenomen">
    <path d="M36 242 C 180 236, 380 244, 524 238" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M170 240 C 178 175, 196 105, 218 46" stroke="#2A2A2A" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <path d="M250 240 C 258 175, 276 105, 298 46" stroke="#2A2A2A" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <g stroke="#2A2A2A" stroke-width="3" stroke-linecap="round">
      <path d="M212 72 L 292 69"/>
      <path d="M204 106 L 284 103"/>
      <path d="M195 140 L 275 137"/>
    </g>
    <g stroke="#E8590C" stroke-width="3" stroke-linecap="round" stroke-dasharray="7 8">
      <path d="M187 174 L 267 171"/>
      <path d="M178 208 L 258 205"/>
    </g>
    <path d="M298 50 C 360 46, 430 48, 492 44" stroke="#2A2A2A" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <path d="M478 46 C 479 110, 480 180, 481 238" stroke="#2A2A2A" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M462 45 C 461 36, 461 27, 461 18" stroke="#2A2A2A" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    <path d="M461 18 l 24 5 l -24 6 Z" fill="#4C8577" stroke="#2A2A2A" stroke-width="2" stroke-linejoin="round"/>
    <text x="296" y="84" font-family="Caveat, cursive" font-size="21" fill="#4C8577">vakvolwassen werk</text>
    <text x="42" y="150" font-family="Caveat, cursive" font-size="23" fill="#5A5550">de junior</text>
    <text x="42" y="176" font-family="Caveat, cursive" font-size="23" fill="#5A5550">begint hier</text>
    <path d="M132 186 C 144 198, 156 210, 166 222" stroke="#5A5550" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="2 7"/>
    <path d="M155 218 L 168 224 L 165 211" fill="none" stroke="#5A5550" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="312" y="200" font-family="Caveat, cursive" font-size="22" fill="#E8590C">deze sporten doet AI nu</text>
    <path d="M308 188 C 296 184, 286 180, 276 176" stroke="#E8590C" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="2 7"/>
    <path d="M286 170 L 274 175 L 285 183" fill="none" stroke="#E8590C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  const SVG_BELEIDSLA = `<svg viewBox="0 0 560 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van een AI-beleidsmap met spinnenwebben, naast twee koffiekopjes met tekstwolkjes: mag Copilot hier eigenlijk, en geen idee">
    <path d="M48 230 C 200 224, 400 232, 516 226" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M72 94 L 176 90 L 181 208 L 76 212 Z" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M98 93 C 99 132, 100 170, 101 209" stroke="#2A2A2A" stroke-width="2.5" fill="none" opacity="0.45"/>
    <rect x="106" y="118" width="64" height="46" rx="4" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="2.5"/>
    <text x="111" y="138" font-family="Caveat, cursive" font-size="17" fill="#2A2A2A">AI-beleid</text>
    <text x="124" y="157" font-family="Caveat, cursive" font-size="17" fill="#2A2A2A">v1.0</text>
    <g stroke="#2A2A2A" stroke-width="1.8" stroke-linecap="round" opacity="0.5" fill="none">
      <path d="M72 94 L 72 122"/><path d="M72 94 L 100 93"/><path d="M72 94 L 94 112"/>
      <path d="M72 112 C 78 110, 83 106, 88 104"/><path d="M72 103 C 77 102, 80 99, 83 97"/>
    </g>
    <path d="M286 56 C 284 46, 292 40, 304 40 L 506 36 C 518 36, 526 42, 525 52 L 524 78 C 524 88, 516 92, 504 92 L 318 96 C 304 96, 288 94, 286 82 Z" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M316 96 C 312 108, 304 116, 292 120 C 300 112, 303 104, 304 96" fill="none" stroke="#2A2A2A" stroke-width="3" stroke-linecap="round"/>
    <text x="302" y="73" font-family="Caveat, cursive" font-size="19" fill="#2A2A2A">"Mag Copilot hier eigenlijk?"</text>
    <path d="M356 142 C 354 134, 360 128, 372 128 L 488 124 C 500 124, 508 130, 507 140 L 506 158 C 506 168, 498 172, 486 172 L 374 176 C 362 176, 357 172, 356 164 Z" fill="#FBE3D4" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M476 176 C 480 188, 488 194, 500 198 C 490 190, 487 183, 486 176" fill="none" stroke="#2A2A2A" stroke-width="3" stroke-linecap="round"/>
    <text x="390" y="157" font-family="Caveat, cursive" font-size="21" fill="#2A2A2A">"Geen idee."</text>
    <path d="M322 196 L 352 195 L 348 218 L 325 219 Z" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M352 200 C 360 200, 360 212, 350 212" fill="none" stroke="#2A2A2A" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M334 188 C 332 182, 336 178, 334 172" stroke="#2A2A2A" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.5"/>
    <path d="M390 194 L 420 193 L 416 216 L 393 217 Z" fill="#DCEAE5" stroke="#2A2A2A" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M420 198 C 428 198, 428 210, 418 210" fill="none" stroke="#2A2A2A" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M402 186 C 400 180, 404 176, 402 170" stroke="#2A2A2A" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.5"/>
  </svg>`;

  /* ============================================================
     De module
     ============================================================ */

  const SVG_SCHERM = `<svg viewBox="0 0 560 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van een persoon die enthousiast met AI werkt achter een verlicht scherm, terwijl de rest van de bureaus op de afdeling er stil bij staat">
    <path d="M36 216 C 160 210, 410 219, 524 212" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M64 152 L 188 148 L 190 210 L 66 213 Z" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3.5" stroke-linejoin="round"/>
    <rect x="92" y="96" width="64" height="46" rx="6" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="3"/>
    <path d="M100 110 l 36 -1 M100 122 l 26 0 M100 133 l 31 -1" stroke="#2A2A2A" stroke-width="2.5" stroke-linecap="round" opacity="0.55"/>
    <path d="M122 142 L 121 150" stroke="#2A2A2A" stroke-width="3" stroke-linecap="round"/>
    <circle cx="206" cy="112" r="15" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3.5"/>
    <circle cx="201" cy="110" r="2" fill="#2A2A2A"/><circle cx="211" cy="110" r="2" fill="#2A2A2A"/>
    <path d="M201 118 C 204 121, 209 121, 212 118" stroke="#2A2A2A" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M206 127 L 204 168 M 204 140 C 192 144, 182 142, 174 136 M 204 144 C 214 150, 222 150, 230 146" stroke="#2A2A2A" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M204 168 L 192 210 M 204 168 L 218 208" stroke="#2A2A2A" stroke-width="3" stroke-linecap="round"/>
    <g stroke="#E8590C" stroke-width="2.5" stroke-linecap="round">
      <path d="M84 80 l 8 8"/><path d="M126 70 l 0 10"/><path d="M166 78 l -7 9"/>
    </g>
    <g opacity="0.38">
      <path d="M300 168 L 388 165 L 389 212 L 301 215 Z" fill="#DCEAE5" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
      <rect x="322" y="132" width="44" height="32" rx="5" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="2.5"/>
      <path d="M416 164 L 504 161 L 505 209 L 417 212 Z" fill="#DCEAE5" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
      <rect x="438" y="128" width="44" height="32" rx="5" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="2.5"/>
      <path d="M360 92 L 448 89 L 449 124 L 361 127 Z" fill="#DCEAE5" stroke="#2A2A2A" stroke-width="2.5" stroke-linejoin="round" transform="translate(0 -34)"/>
    </g>
    <text x="300" y="52" font-family="Caveat, cursive" font-size="24" fill="#5A5550">en de rest van de organisatie?</text>
    <path d="M312 60 C 330 78, 350 96, 372 112" stroke="#5A5550" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="2 7"/>
  </svg>`;

  window.MODULE = {
    kicker: "Gratis e-learning",
    titel: "AI in jouw organisatie",
    sub: "Van eerste experimenten naar echte adoptie: de adoptiekloof, secret cyborgs, pilots die werken en beleid dat leeft. Door Max van den Broek, auteur van AI-Pionier.",

    lessen: [

      /* ========== START ========== */
      {
        sectie: "Start",
        kicker: "Welkom",
        titel: "AI verder brengen dan je eigen scherm",
        navTitel: "Welkom",
        html: `
  ${illu(SVG_SCHERM, "Bij jou werkt het al. Nu de rest nog.")}

  <p>Misschien herken je dit: jij hebt ontdekt wat AI voor je werk kan betekenen, maar om je heen gebeurt er weinig. Een paar collega's experimenteren, het management praat erover, en toch verandert er aan het eind van het kwartaal niets. <mark>Tussen "AI kan veel" en "wij doen er iets mee" zit een kloof</mark>, en die kloof is precies waar deze module over gaat.</p>
  <p>Deze e-learning is voor managers, teamleads, projectleiders en iedereen die AI verder wil brengen dan het eigen scherm. Je hoeft geen techneut te zijn. Je hoeft zelfs geen formele rol te hebben: veel AI-adoptie begint bij iemand die het gewoon oppakt.</p>
  <p>Even voorstellen: ik ben Max van den Broek, auteur van <mark>AI-Pionier</mark> (Koninklijke Boom Uitgevers) en voormalig docent AI aan de Universiteit van Amsterdam. Tegenwoordig train ik teams in het slim gebruiken van AI.</p>
  <p>Wat je leert, in vijf delen:</p>
  <p><strong>Deel 1:</strong> de adoptiekloof. Waarom AI veel kan en organisaties er toch nog weinig uithalen.<br>
  <strong>Deel 2:</strong> secret cyborgs. De collega's die AI al gebruiken zonder het te vertellen, en hoe je dat omdraait.<br>
  <strong>Deel 3:</strong> pilots die werken. Beginnen bij het werk, hands-on oefenen, en waarom de meeste pilots sterven.<br>
  <strong>Deel 4:</strong> veranderend werk. Welk werk blijft over, en waar leert de junior nog?<br>
  <strong>Deel 5:</strong> beleid en afspraken. Van PDF op intranet naar afspraken die mensen echt kennen.</p>
  <p>De module duurt ongeveer 30 minuten, je hoeft geen account aan te maken en aan het eind wachten een quiz en een certificaat.</p>
  <div class="note">De basis staat in de eerdere modules: <a href="/academy/module-wat-is-ai.html">Wat is AI?</a>, <a href="/academy/module-hoe-ai-werkt.html">Hoe AI echt werkt</a> en <a href="/academy/module-verantwoord-ai.html">Verantwoord omgaan met AI</a>. Deze module is los te volgen, maar verwijst er af en toe naar.</div>`
      },

      /* ========== DEEL 1: DE ADOPTIEKLOOF ========== */
      {
        sectie: "Deel 1 · De adoptiekloof",
        kicker: "Deel 1 · De paradox",
        titel: "AI kan veel. Organisaties merken er nog weinig van.",
        navTitel: "De productiviteitsparadox",
        html: `
  <p>Een collega bouwt op een vrijdagmiddag een werkende rekentool, iets waar vroeger een projectvoorstel voor nodig was. Een analyse waar ooit een extern bureau en duizenden euro's aan te pas kwamen, rolt nu in een middag uit een chatbot. De techniek kan aantoonbaar veel. En toch: kijk naar de resultaten van de gemiddelde organisatie en je ziet er <mark>verrassend weinig van terug</mark>.</p>
  <p>Dit is <mark>de productiviteitsparadox</mark> van AI. De verklaring is niet dat de techniek tegenvalt, maar dat het gebruik achterblijft. Verreweg de meeste mensen die ik spreek hebben de nieuwste AI-tools nog niet serieus geprobeerd, laat staan dat ze er moeite voor hebben gedaan om er het maximale uit te halen. Pilots worden hier en daar opgestart, maar het overgrote deel van de organisaties is nog niet echt begonnen.</p>

  ${illu(SVG_KLOOF, "De groene lijn is jouw probleem niet. Het gat eronder wel.")}

  <p>Twee conclusies die je hier níét uit moet trekken. Eén: "AI is dus gebakken lucht." Nee, de winst is er wel, hij wordt alleen nog door weinig organisaties opgehaald. Twee: "dit lost zichzelf op." Ook niet: de organisaties die het wel organiseren, lopen ondertussen uit.</p>
  <div class="note">Dit patroon is ouder dan AI. Toen fabrieken elektriciteit kregen, duurde het decennia voordat de productiviteit echt steeg. Niet omdat de techniek tekortschoot, maar omdat fabrieken eerst opnieuw ingericht moesten worden rond die nieuwe mogelijkheid. Met AI gebeurt nu hetzelfde, alleen sneller.</div>
  <p>Het goede nieuws: we zijn nog vroeg. Wie nu serieus begint, is er niet laat bij maar juist vroeg, en de kloof is geen verwijt maar een kans. De rest van deze module gaat over hoe je hem dicht.</p>
  <div class="callout"><div class="label">De kern van deze les</div><p>"De vraag is niet meer wat AI kan. De vraag is wat jouw organisatie ermee doet."</p></div>`
      },
      {
        kicker: "Deel 1 · De remmen",
        titel: "Waarom de winst uitblijft: vier remmen",
        navTitel: "Vier remmen op adoptie",
        html: `
  <p>Als de techniek het probleem niet is, wat dan wel? In de organisaties waar ik kom, zie ik telkens dezelfde vier remmen.</p>
  <h2>Rem 1: weinig mensen gebruiken het echt</h2>
  <p>Licenties uitdelen is geen adoptie. Veel medewerkers hebben AI één keer geprobeerd, kregen een matig antwoord en gingen terug naar de oude werkwijze. Zonder training en goede voorbeelden blijft het gebruik hangen bij een kleine groep enthousiastelingen.</p>
  <h2>Rem 2: wie het wél gebruikt, zwijgt erover</h2>
  <p>Een flink deel van de mensen die AI gebruiken, vertelt dat aan niemand. Daarover gaat deel 2 van deze module, want dit is misschien wel de vreemdste rem van allemaal.</p>
  <h2>Rem 3: de organisatie draait op het oude tempo</h2>
  <p>In mijn MT-sessies vat ik het zo samen: jij maakt nu twee apps per week, maar de security-goedkeuring duurt nog steeds twee maanden, de planning gaat per kwartaal en stakeholders reageren na drie weken. <mark>De bottleneck verschuift van het bouwen naar alles eromheen.</mark></p>

  ${illu(SVG_SLAGBOOM, "Het bouwen kost tien seconden. De weg erheen niet.")}

  <p>Wil je de winst verzilveren, dan moet je dus niet alleen gebruikers trainen maar ook de processen eromheen versnellen: meer capaciteit voor security-reviews, kortere plannings- en feedbackcycli, sneller kleine besluiten durven nemen.</p>
  <h2>Rem 4: software-integraties</h2>
  <p>AI kan niet automatisch bij al je systemen. In de praktijk zijn integraties <mark>een van de vaakst voorkomende bottlenecks voor AI-projecten</mark>: de chatbot die "even" bij het klantsysteem, het roosterpakket en het archief moet, betekent maanden koppelwerk. De praktische les: kies je eerste toepassingen waar weinig koppelingen voor nodig zijn, zodat je kunt starten terwijl het integratiewerk op de roadmap staat.</p>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Het individu werkt op dagbasis, de organisatie op kwartaalbasis. In dat gat verdampt de winst."</p></div>`
      },

      /* ========== DEEL 2: SECRET CYBORGS ========== */
      {
        sectie: "Deel 2 · Secret cyborgs",
        kicker: "Deel 2 · Verborgen gebruik",
        titel: "De secret cyborgs in je team",
        navTitel: "Secret cyborgs",
        html: `
  <p>Grote kans dat er in jouw team al volop AI wordt gebruikt. Je ziet het alleen niet. Ethan Mollick van businessschool Wharton noemt deze collega's <mark>secret cyborgs</mark>: mensen die hun werk deels met AI doen en dat aan niemand vertellen. Al in 2023 gaf in een enquête <mark>43% van de werknemers</mark> aan AI te gebruiken zonder dat het management het wist. En dat was vóórdat AI standaard in Word, Excel en je browser zat.</p>
  <p>In AI-Pionier staat een anoniem verhaal dat ik sindsdien overal terughoor: iemand gebruikte ChatGPT al een hele tijd zonder er op het werk over te praten. Tot het in een vergadering over innovatie ging en diegene zei nog wel een idee te hebben. Inmiddels is diegene op het werk "de AI-expert" en leidt de AI-pilot. Zo dun is het lijntje tussen verborgen gebruiker en voortrekker.</p>
  <h2>Waarom mensen het verbergen</h2>
  <p><strong>"Straks mag het niet."</strong> Het beleid is onduidelijk of onbekend, en wie het vraagt riskeert een nee. Niet vragen voelt veiliger.</p>
  <p><strong>"Dan kan ik zeker meer werk aan."</strong> Wie laat zien dat een klus van een dag nu een uur kost, is bang het dubbele werk terug te krijgen en de tijdwinst meteen weer kwijt te zijn.</p>
  <p><strong>"Het voelt als vals spelen."</strong> Niemand wil de collega zijn die "het door de computer laat doen", zeker zolang niemand anders er open over is.</p>

  ${illu(SVG_IJSBERG, "Boven water: die ene enthousiaste collega. Onder water: bijna de helft van je team.")}

  <h2>Wat jou dat kost</h2>
  <p>Drie dingen. De lessen blijven privé: dertig mensen vinden dertig keer hetzelfde wiel uit en niemand leert van elkaars trucs of missers. De risico's blijven onzichtbaar: wie stiekem werkt, pakt eerder een gratis publieke tool dan de afgeschermde zakelijke omgeving, en meldt het al helemaal niet als er iets misgaat. En je beleid rust op drijfzand: je maakt plannen voor een organisatie die "nog moet beginnen met AI", terwijl de helft allang begonnen is.</p>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Je hebt geen tekort aan AI-gebruikers. Je hebt een zichtbaarheidsprobleem."</p></div>`
      },
      {
        kicker: "Deel 2 · Omdraaien",
        titel: "Zo komen ze uit de schaduw",
        navTitel: "Uit de schaduw",
        html: `
  <p>Eerst maar wat niet werkt: verbieden. Kort na de lancering van ChatGPT zette een medewerker van een groot techbedrijf vertrouwelijke directienotulen in de chatbot, waarna het bedrijf de chatbot voor alle medewerkers verbood. Begrijpelijke reflex, maar met een averechts effect: zo'n verbod stopt het gebruik niet, het jaagt het naar privételefoons en thuisaccounts. <mark>Een verbod maakt van elke gebruiker een secret cyborg.</mark> Wat werkt er wel? Drie dingen.</p>
  <h2>1. Maak delen veilig</h2>
  <p>De eerste reactie op "dit heb ik met AI gedaan" bepaalt wat de rest van het team doet. Reageer je nieuwsgierig ("laat zien, hoe deed je dat?"), dan komt de volgende vinding ook boven tafel. Reageer je met gezeur over regels of met "mooi, dan kun je er wel een klus bij hebben", dan was dit de laatste die je zag. Psychologische veiligheid is hier geen soft begrip maar een harde voorwaarde: mensen delen pas wat ze doen, inclusief wat misging, als dat geen straf oplevert.</p>
  <h2>2. Maak delen lonend</h2>
  <p>Beloon de vinding én de vinder. Maak er een vast agendapunt van: wie heeft deze week iets handigs ontdekt met AI? Of organiseer een AI-challenge: spreek af dat het team veertien dagen zo veel mogelijk met AI werkt en presenteer daarna de beste voorbeelden aan elkaar. Wie iets deelt krijgt het podium en de credits. Zo wordt delen status in plaats van risico.</p>
  <h2>3. Geef zelf het voorbeeld</h2>
  <p>Een van de belangrijkste versnellers is geen tool en geen campagne, maar <mark>een leidinggevende die AI promoot en er zichtbaar zelf mee werkt</mark>. Bij een grote organisatie deelde de hoogste baas zijn drie favoriete prompts, met de oproep: probeer ze zelf. Zo'n signaal van de top doet meer voor de adoptie dan menig programma. En deel ook wat mislukte: een manager die laat zien dat experimenteren normaal is, geeft het team toestemming om te leren.</p>
  <div class="note"><strong>Bonus:</strong> de secret cyborgs die je zo naar boven haalt, zijn meteen je beste kandidaten voor de pilot uit deel 3. Ze hebben ervaring, motivatie en bewezen vindingrijkheid.</div>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Mensen verbergen hun AI-gebruik zolang dat de verstandige keuze is. Maak eerlijkheid de slimme zet."</p></div>`
      },

      /* ========== DEEL 3: PILOTS DIE WERKEN ========== */
      {
        sectie: "Deel 3 · Pilots die werken",
        kicker: "Deel 3 · De start",
        titel: "Begin bij het werk, niet bij de tool",
        navTitel: "Begin bij het werk",
        html: `
  <p>De meest voorkomende doodgeboren start gaat zo: de organisatie koopt licenties, stuurt een mail rond en wacht af. Een half jaar later concludeert iemand dat "de licenties nauwelijks gebruikt worden". Logisch, want dit is <mark>een tool die een probleem zoekt</mark>, en zo werkt adoptie niet.</p>

  ${illu(SVG_HAMER, "Links krijgt het applaus. Rechts zit de businesscase.")}

  <p>Draai het om. Begin niet bij wat de tool kan, maar bij het werk. Drie vragen aan je team: welke taken kosten veel tijd? Welke zijn tekstzwaar of repetitief, zoals rapporten, notulen, aanvragen en standaardmails? En waar blijft werk liggen waar mensen eigenlijk niet aan toekomen? De antwoorden zijn je kandidaat-toepassingen, en omdat ze van het team zelf komen, is het draagvlak ingebakken.</p>
  <p>Kies vervolgens waar je begint: bij de afdeling waar het <mark>enthousiasme</mark> het grootst is, niet waar de businesscase op papier het mooist oogt. Een woningcorporatie waarover ik in AI-Pionier schrijf, koos voor haar eerste pilot twee tekstzware afdelingen, vooral omdat dáár de mensen zaten die zin hadden in AI. Verstandig: het succes van een pilot hangt voor een groot deel af van de bereidheid van teamleden om er echt mee te werken.</p>
  <div class="note">Neem bij de keuze ook rem 4 uit deel 1 mee: begin met toepassingen die weinig software-koppelingen nodig hebben. Een taak waarvoor je alleen tekst hoeft over te zetten kan morgen starten; een taak die drie systemen moet verbinden is een project van maanden.</div>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Niet: wat kan deze tool? Maar: welk werk doet hier pijn?"</p></div>`
      },
      {
        kicker: "Deel 3 · Hands-on",
        titel: "Mensen leren AI door het zelf te doen",
        navTitel: "Hands-on en champions",
        html: `
  <p>Hoe krijg je een team echt aan het werk met AI? In elk geval niet met een presentatie. Na een demo knikt iedereen, en verandert niemand iets. Wat in mijn trainingen wel werkt: <mark>mensen het direct zelf laten doen, met hun eigen werk</mark>. Controllers oefenen op een begroting, juristen op een contract, communicatiemensen op hun eigen teksten. Het moment waarop iemand de eigen klus van twee uur in twintig minuten gedaan ziet, overtuigt meer dan welke slide ook.</p>
  <p>Een oefening die ik graag als eerste laat doen, omdat ze het belangrijkste principe meteen laat voelen: <mark>hoe meer context je geeft, hoe beter het antwoord</mark>.</p>
  <div class="oefen" id="oefen-context">
    <div class="oefen-kop">Probeer het zelf (en laat je team het doen)</div>
    <p>Stuur eerst de kale vraag:</p>
    <div class="oefen-prompt"><code>Schrijf een uitnodiging voor een teamoverleg.</code><button class="kopieer" type="button">Kopieer</button></div>
    <p>Stel dan dezelfde vraag, maar met context, zoals je die aan een nieuwe collega zou geven:</p>
    <div class="oefen-prompt"><code>Schrijf een uitnodiging voor een teamoverleg. Het is een informeel team van acht mensen, het overleg duurt 30 minuten, onderwerp is de planning voor volgende maand, toon is nuchter en kort, en ik wil dat mensen vooraf hun punten aanleveren.</code><button class="kopieer" type="button">Kopieer</button></div>
    <details class="oefen-verwacht"><summary>Waar je op moet letten</summary><p>De tweede uitnodiging is bruikbaar, de eerste vaag en algemeen. Dat verschil, en niet een geheime prompt-truc, is waar "goed met AI werken" grotendeels op neerkomt: behandel het als een capabele nieuwe collega die jouw context nog niet kent. Een perfecte openingsoefening voor elke training.</p></details>
  </div>
  <h2>Champions: hulp op gehoorsafstand</h2>
  <p>Zorg daarna dat de hulp dichtbij blijft. Een kernteam van zo'n vijf gemotiveerde collega's werkt goed: zij experimenteren zelf veel, helpen anderen op weg en zijn de vraagbaak. De drempel om iets aan de collega naast je te vragen is vele malen lager dan een ticket bij IT. Geef die champions er wel expliciet tijd voor, want op goodwill alleen brandt dit op.</p>
  <h2>Maak het materiaal samen met het team</h2>
  <p>Mijn eigen vuistregel: ik maak een training het liefst samen met iemand uit het team zelf. Die persoon kent de echte voorbeelden, de systemen en de gevoeligheden, waardoor de oefeningen kloppen. En er is een tweede effect dat minstens zo zwaar weegt: <mark>peer learning</mark>. "Als Karin van ons team dit kan, kan ik het ook" overtuigt meer dan de gladste demo van een buitenstaander.</p>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Niemand verandert zijn werkwijze door een demo. Wel door twintig minuten zelf doen, met eigen werk."</p></div>`
      },
      {
        kicker: "Deel 3 · Klein en eerlijk",
        titel: "Klein beginnen, eerlijk evalueren",
        navTitel: "Waarom pilots sterven",
        html: `
  <p>Dan de pilot zelf. Een pilot is een kortdurend project waarin je AI uitprobeert met als primaire doel <mark>ervan te leren</mark>. Niet om te bewijzen dat de tool werkt, niet om een persbericht te scoren: om te leren. Dat klinkt als een detail, maar het bepaalt alles. Wie alleen succes mag rapporteren, leert niets.</p>
  <p>De vorm: een kernteam van ongeveer vijf gemotiveerde mensen, een afgebakende periode (zes weken is een prima maat voor een eerste ronde) en vooraf afgesproken wat je wilt leren, hoe je dat meet (gebruik per week, bespaarde uren, kwaliteit van de output) en wie daarna over het vervolg beslist.</p>
  <p>En wees <mark>eerlijk over de uitkomst</mark>. Bij de woningcorporatie uit de vorige les bleek na zes weken dat een deel van de medewerkers de tools nauwelijks had gebruikt. Geen mislukking, maar een les: voor de volgende ronde wilden ze meer betrokkenheid organiseren, bijvoorbeeld met een AI-challenge waarin successen worden gedeeld. Precies zo hoort een pilot te werken.</p>
  <h2>Waarom pilots sterven</h2>
  <table>
    <tr><th>Doodsoorzaak</th><th>Het medicijn</th></tr>
    <tr><td>Tool zoekt probleem</td><td>Begin bij taken en tijdvreters (vorige les) en kies de tool als laatste.</td></tr>
    <tr><td>Geen tijd</td><td>Geef deelnemers expliciet uren. Experimenteren naast een vol rooster verliest het altijd van de waan van de dag.</td></tr>
    <tr><td>Geen eigenaar</td><td>Eén iemand is van de pilot: die plant, jaagt aan en rapporteert. "Van iedereen" betekent van niemand.</td></tr>
    <tr><td>Geen vervolg</td><td>Plan de evaluatie en het besluit over opschalen vooraf in, met datum en beslisser. Anders eindigt de pilot in stilte.</td></tr>
  </table>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Pilots mislukken zelden op techniek. Ze sterven aan geen tijd, geen eigenaar en geen vervolg."</p></div>`
      },

      /* ========== DEEL 4: VERANDEREND WERK ========== */
      {
        sectie: "Deel 4 · Veranderend werk",
        kicker: "Deel 4 · Het takenpakket",
        titel: "Welk werk blijft er over?",
        navTitel: "Welk werk blijft over?",
        html: `
  <p>AI automatiseert geen functies, het automatiseert taken. Uit veel functies verdwijnt de komende jaren een deel van het takenpakket, en wat overblijft is niet vanzelf een prettige baan. Het kan namelijk <mark>twee kanten op kantelen</mark>.</p>
  <h2>Kant één: alleen het moeilijke blijft over</h2>
  <p>AI doet het routinewerk, de mens doet alleen nog de uitzonderingen, de zware beslissingen en de controle van AI-output. Klinkt als een promotie, voelt als uitputting: constante waakzaamheid, de hele dag pieken, zonder de rustige klusjes ertussen waarin je even bijkwam.</p>
  <h2>Kant twee: alleen het makkelijke blijft over</h2>
  <p>AI doet juist het interessante deel (de analyse, het schrijven, het denkwerk) en de mens voert in, controleert vinkjes en handelt af. Dat verveelt niet alleen: wie het denkwerk nooit meer doet, <mark>ontleert het vak</mark> waar zijn oordeel op gebouwd was.</p>
  <p>Hoe je hierover als leidinggevende per persoon het gesprek voert, met onder meer een callcenter-voorbeeld, behandelt de module <a href="/academy/module-ai-in-jouw-rol.html">AI in jouw rol</a>; hier kijken we naar wat de organisatie te doen heeft.</p>
  <p>Dat begint met de cognitieve werklast per rol opnieuw bekijken zodra AI er taken uit haalt. Vier vragen:</p>
  <table>
    <tr><th>Vraag</th><th>Waar je op let</th></tr>
    <tr><td>Vraagt de rol nu constante waakzaamheid?</td><td>Overbelasting: de hele dag AI-output beoordelen is zwaarder dan het klinkt.</td></tr>
    <tr><td>Stapelen de zware beslissingen zich op?</td><td>Overbelasting: bouw rust- en routinemomenten bewust terug in.</td></tr>
    <tr><td>Is het werk te repetitief geworden?</td><td>Onderbelasting: verveling en vervreemding, mensen doven uit of vertrekken.</td></tr>
    <tr><td>Wat houdt deze collega betrokken?</td><td>De motivatievraag, te stellen per persoon en niet per functiegroep.</td></tr>
  </table>
  <p>Het kan ook gewoon goed uitpakken, mits ontworpen. In AI-Pionier beschrijf ik engineers die er vooral blij van werden dat het saaie, repetitieve werk verdween en er tijd kwam voor complexere projecten. Werk wordt beter van AI als iemand daarop stuurt. Het wordt zelden vanzelf beter.</p>
  <div class="callout"><div class="label">De kern van deze les</div><p>"AI bepaalt welk werk verdwijnt. Jij bepaalt welk werk overblijft."</p></div>`
      },
      {
        kicker: "Deel 4 · De leerladder",
        titel: "Waar leert de junior nog?",
        navTitel: "Waar leert de junior nog?",
        html: `
  <p>Hoe wordt iemand eigenlijk senior? Door jaren van precies het werk te doen dat AI nu overneemt: de standaardcontracten, de eerste conceptversies, de routineanalyses. Saai werk, maar het was wel <mark>de leerschool van het vak</mark>. Dat zet organisaties voor een vraag die bijna niemand al beantwoord heeft: waar leert de junior nog?</p>

  ${illu(SVG_LADDER, "De ladder staat er nog. Alleen de onderste sporten ontbreken.")}

  <p>Het mechanisme heet wel de <mark>kennisparadox</mark>: wie ervaring heeft, kan AI-output beoordelen en wordt er dus productiever van. Wie het vak nog moet leren, kan dat niet, en de taken waarmee je dat oordeel opbouwt doet AI nu sneller. Laat je dat op zijn beloop, dan heb je over vijf jaar een gat in je seniorenbestand dat je niet meer dichtkoopt.</p>
  <p>Wat organisaties concreet kunnen doen:</p>
  <p><strong>Herontwerp functies expliciet.</strong> Werk per rol uit welke taken AI doet en hoe mens en AI samenwerken, bijvoorbeeld: AI genereert het concept, de mens verfijnt, contextualiseert en blijft eindverantwoordelijk. Zet dat in de functiebeschrijving in plaats van het te laten ontstaan.</p>
  <p><strong>Houd bewust leertaken in de functie.</strong> Spreek af welke taken juniors eerst zelf doen, ook al kan AI ze sneller, met AI daarna als tweede paar ogen. Het rekenonderwijs deed het al zo: eerst hoofdrekenen, dan pas de rekenmachine.</p>
  <p><strong>Zet AI in als oefenmaatje.</strong> Er is ook winst: een junior kan AI onbeperkt om feedback vragen, zonder schaamte en zonder de senior te storen. En de senior hoeft niet telkens dezelfde feedback te geven. Zo versnelt AI het leren juist, als aanvulling op het meekijken met ervaren collega's, niet als vervanging ervan.</p>
  <p><strong>Maak er met HR een thema van.</strong> Stuur op taken, vaardigheden en ontwikkelbaarheid in plaats van op functiebescherming, en neem besluiten over herontwerp en omscholing samen met HR, niet ad hoc per team.</p>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Als AI al het beginnerswerk doet, moet iemand opnieuw ontwerpen hoe een beginner senior wordt."</p></div>`
      },

      /* ========== DEEL 5: BELEID EN AFSPRAKEN ========== */
      {
        sectie: "Deel 5 · Beleid en afspraken",
        kicker: "Deel 5 · De afspraken",
        titel: "Wat een werkbaar AI-beleid regelt",
        navTitel: "Wat het beleid regelt",
        html: `
  <p>Uit deel 2 weet je waarom een verbod niet werkt: het gebruik is er al, een verbod jaagt het alleen uit het zicht. Wat dan wel? Beleid dat <mark>het goede pad het makkelijkste pad maakt</mark>. Een werkbaar AI-beleid beantwoordt vier vragen, en past samengevat op één A4.</p>
  <table>
    <tr><th>De vraag</th><th>Wat je regelt</th></tr>
    <tr><td>Welke tools zijn goedgekeurd?</td><td>Een korte lijst, plus een afgeschermde zakelijke omgeving als volwaardig alternatief. Zonder goed alternatief wint de gratis publieke tool het altijd.</td></tr>
    <tr><td>Wat mag erin, wat niet?</td><td>Persoonsgegevens zijn de wettelijke ondergrens (AVG). Daarbovenop bepaal je zelf wat bij jullie vertrouwelijk is: cijfers, contracten, broncode, plannen.</td></tr>
    <tr><td>Wie is verantwoordelijk voor de output?</td><td>Degene wiens naam eronder staat, met of zonder AI. Spreek af welke output altijd een menselijke check krijgt.</td></tr>
    <tr><td>Hoe open zijn we erover?</td><td>Teamafspraken: waarvoor gebruiken we AI, wat checken we, en wanneer vermelden we het aan ontvangers?</td></tr>
  </table>
  <p>Twee verzwaringen om in de gaten te houden. Eén: hoe zelfstandiger je AI laat werken, van chatbot die meedenkt tot agent die zelf taken uitvoert, hoe strakker de afspraken moeten zijn over wat het systeem mag en wie ingrijpt. Twee: personeelsbeslissingen. AI-toepassingen bij werving, selectie, promotie en beëindiging van arbeidsrelaties vallen als toepassingsgebied onder de <mark>hoog-risicocategorie</mark> (bijlage III) van de AI-verordening, met aanzienlijk zwaardere eisen. Wil je AI daar inzetten, betrek er dan vroeg juridische expertise bij.</p>
  <div class="note">De gebruikerskant van deze afspraken (wat mag de chat in, hoe je output checkt, hoe je bias herkent) behandelt de module <a href="/academy/module-verantwoord-ai.html">Verantwoord omgaan met AI</a>, inclusief een oefening die je zo in je teamoverleg kunt doen.</div>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Goed beleid verbiedt zo min mogelijk en maakt het goede pad het makkelijkste pad."</p></div>`
      },
      {
        kicker: "Deel 5 · Naar de praktijk",
        titel: "Beleid werkt pas als mensen het kennen",
        navTitel: "Van PDF naar praktijk",
        html: `
  <p>Stel dat je dat beleid hebt. Doe vandaag eens de test: vraag vijf collega's welke AI-tools hier zijn goedgekeurd en wat erin mag. Krijg je vijf verschillende antwoorden, dan heb je geen beleid maar <mark>een bestand</mark>.</p>

  ${illu(SVG_BELEIDSLA, "Het beleid bestaat echt. Alleen het gesprek erover niet.")}

  <p>Dit is geen cynisme maar de normale toestand: beleid wordt geschreven, vastgesteld, op intranet gezet en vervolgens door vrijwel niemand gelezen. Terwijl de waarde van AI-beleid volledig afhangt van het moment waarop iemand met de handen op het toetsenbord twijfelt: mag dit erin, in deze tool? Wie het beleid op dat moment niet kent, gokt.</p>
  <p>Er is ook een wettelijke reden om hier werk van te maken. Sinds 2 februari 2025 geldt artikel 4 van de AI-verordening: aanbieders en gebruiksverantwoordelijken van AI-systemen (dus ook organisaties die AI alleen inzetten) nemen maatregelen om, zoveel als mogelijk, te zorgen voor een toereikend niveau van <mark>AI-geletterdheid</mark> bij hun personeel, passend bij kennis, rol en context. Een document op intranet is daarvoor niet genoeg; mensen moeten ook begrijpen waaróm de regels zijn wat ze zijn. De Autoriteit Persoonsgegevens adviseert een planmatige aanpak: inventariseer wie met AI werkt, stel doelen, voer uit en evalueer.</p>
  <p>Wat in de praktijk werkt om beleid te laten landen:</p>
  <p><strong>Behandel het beleid ín de training.</strong> "Welke tools mag jij gebruiken en wat mag erin" is een gewoon lesonderdeel, geen aparte juridische bijlage. Training per doelgroep werkt het best: een controller heeft andere voorbeelden nodig dan een monteur.</p>
  <p><strong>Herhaal bij elke verandering.</strong> Nieuwe tool, nieuw model, nieuwe afspraak: dat is een bericht en een korte sessie waard, niet alleen een gewijzigde PDF.</p>
  <p><strong>Laat de leidinggevende het noemen.</strong> Eén zin in het teamoverleg ("dit valt onder onze AI-afspraken, weet je ze nog?") doet meer dan een mailing.</p>
  <div class="note">E-learnings zoals deze ondersteunen de invulling van de AI-geletterdheidsplicht (artikel 4 AI-verordening). Maar wat toereikend is verschilt per rol en per organisatie, dus de invulling blijft maatwerk. Een certificaat is een bouwsteen, geen eindstation.</div>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Beleid dat niemand kent is geen beleid. Het is een bestand."</p></div>`
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
        titel: "Jij bent nu degene die AI verder brengt",
        navTitel: "Afsluiting + spiekbriefje",
        html: `
  <p>Dat was de module: van de adoptiekloof via secret cyborgs en pilots naar veranderend werk en beleid dat leeft. Je spiekbriefje:</p>

  <div class="spiek">
    <ol>
      <li><strong>"De kloof zit in het gebruik, niet in de techniek.</strong> Jij bouwt in een week wat de organisatie per kwartaal plant. Organiseer daarop."</li>
      <li><strong>"Mijn team zit waarschijnlijk vol secret cyborgs.</strong> Ik vraag wie iets handigs heeft ontdekt, niet wie stiekem AI gebruikt, en ik geef zelf zichtbaar het voorbeeld."</li>
      <li><strong>"Begin bij het werk dat pijn doet, waar het enthousiasme zit.</strong> Niet bij de tool, en eerst zonder zware integraties."</li>
      <li><strong>"Mensen leren AI door het zelf te doen.</strong> Hands-on met eigen werk, champions dichtbij, materiaal samen met het team gemaakt."</li>
      <li><strong>"Een pilot heeft een leerdoel, een eigenaar, een einddatum en een vervolgafspraak.</strong> Anders sterft hij in stilte."</li>
      <li><strong>"Welk werk overblijft is een ontwerpkeuze.</strong> Niet alleen het moeilijke, niet alleen het makkelijke, en de junior leert nog ergens."</li>
      <li><strong>"Beleid werkt pas als mensen het kennen.</strong> Goedgekeurde tools, heldere grenzen en training horen bij elkaar."</li>
    </ol>
  </div>

  <p>En je huiswerk kan vandaag al. Vraag in je eerstvolgende teamoverleg wie er iets handigs met AI heeft ontdekt, en reageer alleen maar nieuwsgierig. Schrijf daarnaast de drie grootste tijdvreters van je team op. Daarmee heb je de eerste secret cyborg boven water en de eerste pilotkandidaat op papier.</p>

  <div class="callout">
    <div class="label">Hoe nu verder?</div>
    <p class="gewoon">Wil je dit in jouw organisatie van de grond krijgen? Daar help ik bij: met trainingen, e-learnings op maat per doelgroep en begeleiding bij eerste pilots. Kijk op <a href="https://aimetmax.nl">aimetmax.nl</a> of op de <a href="/academy/pro.html">organisatiepagina</a> van deze academy, of stuur me een bericht op <a href="https://linkedin.com/in/maxbroek">LinkedIn</a>.</p>
  </div>

  <p class="muted" style="font-size: 13px;">Deze module is gebaseerd op mijn boek AI-Pionier (Boom, 2024) en op trainingen en MT-sessies over AI-adoptie die ik gaf, van teams op de werkvloer tot directies. De term "secret cyborgs" is van Ethan Mollick.</p>`
      }
    ],

    quiz: [
      { s: "De belangrijkste reden dat organisaties nog weinig productiviteitswinst uit AI halen, is dat de techniek nog niet goed genoeg is.",
        antwoord: false,
        uitleg: "Niet waar. De techniek kan al veel meer dan de meeste organisaties gebruiken. De winst blijft uit door lage adoptie, verborgen gebruik, trage processen en ontbrekende integraties. De kloof zit in de organisatie, niet in het model." },
      { s: "Al in 2023 gaf in een enquête 43% van de werknemers aan AI te gebruiken zonder dat het management het wist.",
        antwoord: true,
        uitleg: "Waar. En dat was nog voordat AI standaard in kantoorsoftware zat. Reken er dus op dat er ook in jouw team secret cyborgs zitten, en richt je op zichtbaar maken in plaats van opsporen." },
      { s: "Een verbod op AI-tools is een effectieve manier om risicovol gebruik te stoppen.",
        antwoord: false,
        uitleg: "Niet waar. Na een verbod verdwijnt het gebruik niet, het verdwijnt uit het zicht, richting privételefoons en gratis publieke tools. Duidelijke kaders plus een goedgekeurd alternatief werken beter." },
      { s: "Een manager die zelf zichtbaar AI gebruikt en het promoot, is een van de belangrijkste stimulerende factoren voor adoptie in een team.",
        antwoord: true,
        uitleg: "Waar. Voorbeeldgedrag verslaat elke campagne. Een leidinggevende die laat zien wat die zelf met AI doet, inclusief wat mislukt, geeft het team toestemming om te experimenteren." },
      { s: "De beste afdeling voor je eerste pilot is de afdeling waar de businesscase op papier het grootst is.",
        antwoord: false,
        uitleg: "Niet waar. Begin waar het enthousiasme het grootst is: het succes van een pilot hangt af van de bereidheid van teamleden om AI echt in hun werk te proberen. Een prachtige businesscase met tegenzin sterft alsnog." },
      { s: "Het primaire doel van een pilot is leren, niet bewijzen dat de tool werkt.",
        antwoord: true,
        uitleg: "Waar. Een pilot is een kort experiment met een kernteam, een einddatum en een eerlijke evaluatie. Ook 'dit werkte bij ons niet, en dit is waarom' is een geslaagde uitkomst." },
      { s: "Software-integraties zijn in de praktijk een van de vaakst voorkomende bottlenecks voor AI-projecten.",
        antwoord: true,
        uitleg: "Waar. AI kan niet automatisch bij al je systemen. Kies daarom eerste toepassingen die weinig koppelingen nodig hebben, dan kun je snel starten terwijl het integratiewerk op de roadmap staat." },
      { s: "Als AI het routinewerk overneemt, wordt het overgebleven werk vanzelf beter behapbaar.",
        antwoord: false,
        uitleg: "Niet waar. Het takenpakket kan twee kanten op kantelen: alleen nog het moeilijke werk (uitputtend) of alleen nog het makkelijke werk (vervelend, en je ontleert het vak). Welk werk overblijft is een ontwerpkeuze die iemand bewust moet maken." },
      { s: "Doordat AI veel routinetaken overneemt, moeten organisaties opnieuw ontwerpen hoe juniors het vak leren.",
        antwoord: true,
        uitleg: "Waar. Juniors leerden het vak juist via het routinewerk dat AI nu doet. Houd bewust leertaken in de functie of bouw nieuwe leerroutes, anders heb je over vijf jaar een gat in je seniorenbestand." },
      { s: "Met een AI-beleidsdocument op intranet is de AI-geletterdheidsplicht uit artikel 4 van de AI-verordening geregeld.",
        antwoord: false,
        uitleg: "Niet waar. Artikel 4 vraagt om maatregelen voor AI-geletterdheid bij de mensen die met AI werken, passend bij hun rol en context. Een document dat niemand kent doet dat niet; uitleg en training horen erbij. Beleid werkt pas als mensen het kennen." }
    ]
  };

})();
