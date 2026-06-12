/* Module: Verantwoord omgaan met AI
   Deel 1: check de output (hallucinaties, grillig gedrag, automation bias)
   Deel 2: privacy en vertrouwelijkheid (+ keuzes-oefening "mag dit de chat in?")
   Deel 3: bias (twee kanten, beeldvoorbeelden, de namen-oefening)
   Deel 4: verantwoord werken (zelf blijven doen, transparantie, stroom en auteursrecht)
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

  const SVG_VANGRAIL = `<svg viewBox="0 0 560 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van een auto die stevig doorrijdt over een bergweg met een vangrail langs de rand">
    <path d="M28 224 C 170 214, 360 172, 532 124" stroke="#2A2A2A" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <g stroke="#2A2A2A" stroke-width="2.5" stroke-linecap="round" opacity="0.4">
      <path d="M120 224 l -9 21"/><path d="M236 200 l -9 21"/><path d="M352 172 l -9 21"/><path d="M462 146 l -9 21"/>
    </g>
    <g transform="rotate(-11 285 140)">
      <path d="M214 148 C 212 130, 226 122, 250 120 L 268 98 C 274 90, 322 90, 330 98 L 344 118 C 364 120, 376 128, 374 144 C 372 154, 362 158, 350 158 L 238 160 C 224 160, 215 156, 214 148 Z" fill="#FBE3D4" stroke="#2A2A2A" stroke-width="3.5" stroke-linejoin="round"/>
      <path d="M276 100 L 272 118 L 322 117 L 316 100 Z" fill="#DCEAE5" stroke="#2A2A2A" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="252" cy="158" r="13" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3.5"/>
      <circle cx="338" cy="156" r="13" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3.5"/>
    </g>
    <g stroke="#E8590C" stroke-width="3" stroke-linecap="round">
      <path d="M176 136 l -28 7"/><path d="M184 152 l -32 8"/>
    </g>
    <path d="M40 198 C 180 188, 370 148, 540 102" stroke="#4C8577" stroke-width="5" fill="none" stroke-linecap="round"/>
    <g stroke="#2A2A2A" stroke-width="3" stroke-linecap="round">
      <path d="M70 198 L 71 219"/><path d="M185 184 L 186 207"/><path d="M300 160 L 301 184"/><path d="M415 134 L 416 158"/><path d="M508 110 L 509 133"/>
    </g>
    <circle cx="488" cy="44" r="16" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="3"/>
    <g stroke="#2A2A2A" stroke-width="2.5" stroke-linecap="round">
      <path d="M488 20 l 0 -7"/><path d="M512 44 l 7 0"/><path d="M505 27 l 5 -5"/>
    </g>
    <text x="48" y="66" font-family="Caveat, cursive" font-size="25" fill="#4C8577">met vangrail durf je harder</text>
  </svg>`;

  const SVG_SPOOKBRON = `<svg viewBox="0 0 560 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van een boekenplank waar tussen echte boeken een gestippeld boek staat dat niet bestaat">
    <path d="M48 206 C 180 201, 380 207, 512 202" stroke="#2A2A2A" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M84 208 L 76 230 M476 206 L 484 228" stroke="#2A2A2A" stroke-width="3" stroke-linecap="round"/>
    <path d="M86 200 L 85 116 C 96 111, 110 111, 120 116 L 122 200 Z" fill="#DCEAE5" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M128 200 L 132 100 L 162 98 L 166 199 Z" fill="#FBE3D4" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M173 199 L 169 126 C 180 119, 198 119, 208 125 L 206 199 Z" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M150 116 l 0 72" stroke="#2A2A2A" stroke-width="2" opacity="0.4"/>
    <rect x="218" y="104" width="44" height="96" rx="4" fill="none" stroke="#E8590C" stroke-width="3" stroke-dasharray="8 8"/>
    <text x="230" y="164" font-family="Caveat, cursive" font-size="36" fill="#E8590C">?</text>
    <path d="M272 199 L 271 110 L 303 108 L 306 198 Z" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M313 198 C 309 146, 312 126, 318 120 L 346 118 C 352 152, 352 172, 348 197 Z" fill="#DCEAE5" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M356 197 L 390 112 L 418 122 L 388 198 Z" fill="#FBE3D4" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M428 198 L 427 128 C 440 122, 456 122, 468 128 L 470 197 Z" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M286 118 l 1 72" stroke="#2A2A2A" stroke-width="2" opacity="0.4"/>
    <path d="M348 58 C 346 36, 362 28, 388 26 L 494 22 C 516 22, 528 32, 526 48 C 524 64, 512 70, 492 71 L 392 75 C 372 76, 350 74, 348 58 Z" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3"/>
    <path d="M384 74 C 378 86, 368 94, 354 98 C 363 89, 367 82, 369 75" fill="none" stroke="#2A2A2A" stroke-width="3" stroke-linecap="round"/>
    <text x="366" y="56" font-family="Caveat, cursive" font-size="23" fill="#2A2A2A">"Zie: De Vries (2021)"</text>
    <path d="M348 98 C 318 112, 290 112, 266 104" stroke="#E8590C" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="2 8"/>
    <path d="M272 110 L 262 102 L 275 99" fill="none" stroke="#E8590C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  const SVG_AUTOBIAS = `<svg viewBox="0 0 560 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van een grafiek: je vertrouwen in AI stijgt met de tijd, hoe vaak je de output checkt daalt, en waar de lijnen kruisen glipt de fout erdoor">
    <path d="M60 34 C 58 110, 60 200, 62 254 L 528 258" stroke="#2A2A2A" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <text x="468" y="284" font-family="Caveat, cursive" font-size="22" fill="#5A5550">tijd met AI</text>
    <path d="M86 224 C 180 206, 300 152, 488 80" stroke="#4C8577" stroke-width="4" fill="none" stroke-linecap="round"/>
    <text x="338" y="78" font-family="Caveat, cursive" font-size="23" fill="#4C8577">jouw vertrouwen</text>
    <path d="M86 84 C 180 108, 300 168, 488 226" stroke="#E8590C" stroke-width="4" fill="none" stroke-linecap="round"/>
    <text x="352" y="254" font-family="Caveat, cursive" font-size="23" fill="#E8590C">hoe vaak je checkt</text>
    <circle cx="284" cy="150" r="8" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="3"/>
    <text x="116" y="52" font-family="Caveat, cursive" font-size="24" fill="#2A2A2A">hier glipt de fout erdoor</text>
    <path d="M236 60 C 252 90, 268 118, 280 140" stroke="#2A2A2A" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="2 7"/>
    <path d="M272 132 L 281 142 L 285 129" fill="none" stroke="#2A2A2A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  const SVG_EUWOLK = `<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van een laptop op een kaartje van de EU, met data die naar een wolk buiten de EU vliegt">
    <path d="M96 198 C 62 190, 50 160, 62 134 C 48 124, 52 100, 72 92 C 68 70, 90 54, 112 62 C 118 42, 148 36, 164 52 C 184 40, 210 50, 214 72 C 234 78, 240 100, 228 114 C 242 130, 236 156, 216 162 C 220 184, 200 200, 178 192 C 166 206, 138 208, 124 196 C 114 204, 102 202, 96 198 Z" fill="#DCEAE5" stroke="#2A2A2A" stroke-width="3.5" stroke-linejoin="round"/>
    <text x="84" y="92" font-family="Caveat, cursive" font-size="30" fill="#4C8577">EU</text>
    <path d="M124 110 L 178 108 L 180 142 L 126 144 Z" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M118 152 L 188 150 L 196 162 L 110 164 Z" fill="#FBE3D4" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M134 122 l 28 -1 M134 130 l 20 0" stroke="#2A2A2A" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/>
    <path d="M206 120 C 280 96, 330 88, 400 92" stroke="#E8590C" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-dasharray="3 10"/>
    <path d="M390 84 L 404 92 L 392 101" fill="none" stroke="#E8590C" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <g stroke="#2A2A2A" stroke-width="2.5">
      <g transform="rotate(-14 258 96)"><rect x="246" y="86" width="24" height="19" rx="2" fill="#FFFDF8"/><path d="M250 93 l 16 -1 M250 99 l 11 0" stroke-linecap="round" opacity="0.6"/></g>
      <g transform="rotate(-6 330 84)"><rect x="318" y="74" width="24" height="19" rx="2" fill="#FFFDF8"/><path d="M322 81 l 16 -1 M322 87 l 11 0" stroke-linecap="round" opacity="0.6"/></g>
    </g>
    <path d="M418 144 C 398 144, 388 126, 400 112 C 392 94, 410 78, 428 86 C 434 66, 464 64, 474 80 C 494 72, 514 88, 506 106 C 520 114, 516 138, 498 142 C 478 150, 438 150, 418 144 Z" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3.5" stroke-linejoin="round"/>
    <g stroke="#2A2A2A" stroke-width="2.5">
      <rect x="432" y="102" width="48" height="13" rx="3" fill="#DCEAE5"/>
      <rect x="432" y="119" width="48" height="13" rx="3" fill="#DCEAE5"/>
      <circle cx="441" cy="108" r="2" fill="#E8590C" stroke="none"/>
      <circle cx="441" cy="125" r="2" fill="#E8590C" stroke="none"/>
    </g>
    <text x="408" y="180" font-family="Caveat, cursive" font-size="25" fill="#5A5550">waar precies?</text>
    <text x="500" y="62" font-family="Caveat, cursive" font-size="34" fill="#E8590C">?</text>
    <path d="M48 234 C 180 228, 400 236, 520 230" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`;

  const SVG_WIJNGLAS = `<svg viewBox="0 0 560 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van een half vol wijnglas naast de prompt die om een glas tot de rand vroeg">
    <path d="M126 56 C 128 116, 148 148, 170 150 C 192 148, 212 116, 214 56" fill="none" stroke="#2A2A2A" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M126 56 C 140 62, 200 62, 214 56" fill="none" stroke="#2A2A2A" stroke-width="3" stroke-linecap="round"/>
    <path d="M133 94 C 146 100, 194 100, 207 94 C 203 120, 190 140, 170 142 C 150 140, 137 120, 133 94 Z" fill="#E8590C" opacity="0.88"/>
    <path d="M170 150 L 169 196" stroke="#2A2A2A" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M138 202 C 156 193, 184 193, 202 202" fill="none" stroke="#2A2A2A" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M112 60 L 230 56" stroke="#4C8577" stroke-width="3" stroke-dasharray="7 7" stroke-linecap="round"/>
    <text x="240" y="62" font-family="Caveat, cursive" font-size="24" fill="#4C8577">hier vroeg je om</text>
    <text x="240" y="104" font-family="Caveat, cursive" font-size="24" fill="#E8590C">dit kreeg je</text>
    <path d="M236 98 C 224 98, 216 97, 209 95" stroke="#E8590C" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M216 90 L 207 95 L 215 101" fill="none" stroke="#E8590C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="252" y="156" width="262" height="44" rx="12" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3"/>
    <text x="266" y="185" font-family="Caveat, cursive" font-size="24" fill="#2A2A2A">vul het glas TOT DE RAND</text>
    <path d="M40 224 C 180 218, 400 226, 522 220" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`;

  const SVG_HORLOGE = `<svg viewBox="0 0 560 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van een horloge waarvan de wijzers op tien over tien staan, als een glimlach">
    <path d="M252 14 L 308 14 L 304 58 L 256 58 Z" fill="#DCEAE5" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M256 184 L 304 184 L 308 228 L 252 228 Z" fill="#DCEAE5" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M262 32 l 36 -1" stroke="#2A2A2A" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/>
    <circle cx="280" cy="122" r="64" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3.5"/>
    <g stroke="#2A2A2A" stroke-width="3" stroke-linecap="round">
      <path d="M280 66 l 0 9"/><path d="M336 122 l -9 0"/><path d="M280 178 l 0 -9"/><path d="M224 122 l 9 0"/>
    </g>
    <g fill="#2A2A2A">
      <circle cx="308" cy="74" r="2.5"/><circle cx="328" cy="94" r="2.5"/><circle cx="328" cy="150" r="2.5"/><circle cx="308" cy="170" r="2.5"/>
      <circle cx="252" cy="170" r="2.5"/><circle cx="232" cy="150" r="2.5"/><circle cx="232" cy="94" r="2.5"/><circle cx="252" cy="74" r="2.5"/>
    </g>
    <path d="M280 122 L 251 104" stroke="#E8590C" stroke-width="5.5" stroke-linecap="round"/>
    <path d="M280 122 L 320 98" stroke="#E8590C" stroke-width="4.5" stroke-linecap="round"/>
    <circle cx="280" cy="122" r="4.5" fill="#2A2A2A"/>
    <path d="M260 144 C 270 154, 290 154, 300 144" stroke="#4C8577" stroke-width="3" fill="none" stroke-linecap="round"/>
    <text x="380" y="92" font-family="Caveat, cursive" font-size="25" fill="#E8590C">tien over tien,</text>
    <text x="380" y="120" font-family="Caveat, cursive" font-size="25" fill="#E8590C">altijd weer</text>
    <path d="M376 104 C 360 110, 348 114, 338 116" stroke="#E8590C" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <text x="96" y="160" font-family="Caveat, cursive" font-size="23" fill="#5A5550">net een glimlach</text>
    <path d="M188 166 C 210 172, 230 168, 250 156" stroke="#5A5550" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="2 7"/>
  </svg>`;

  const SVG_HUIS = `<svg viewBox="0 0 560 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van drie Nederlandse rijtjeshuizen naast het vrijstaande Amerikaanse huis met veranda dat AI ervan maakte">
    <path d="M28 232 C 120 226, 200 230, 254 226" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M40 226 L 40 134 L 73 106 L 106 134 L 139 106 L 172 134 L 205 106 L 238 134 L 238 226 Z" fill="#FBE3D4" stroke="#2A2A2A" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M106 134 L 106 226 M172 134 L 172 226" stroke="#2A2A2A" stroke-width="2.5"/>
    <g stroke="#2A2A2A" stroke-width="2.5">
      <rect x="56" y="188" width="19" height="38" fill="#4C8577"/>
      <rect x="122" y="188" width="19" height="38" fill="#E8590C"/>
      <rect x="188" y="188" width="19" height="38" fill="#4C8577"/>
      <rect x="54" y="150" width="24" height="20" fill="#DCEAE5"/>
      <rect x="120" y="150" width="24" height="20" fill="#DCEAE5"/>
      <rect x="186" y="150" width="24" height="20" fill="#DCEAE5"/>
    </g>
    <path d="M88 116 L 88 96 L 100 96 L 100 126" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="2.5" stroke-linejoin="round"/>
    <text x="58" y="256" font-family="Caveat, cursive" font-size="23" fill="#5A5550">gevraagd: rijtjeshuis</text>
    <text x="258" y="160" font-family="Caveat, cursive" font-size="30" fill="#E8590C">vs</text>
    <path d="M296 234 C 380 228, 470 234, 542 228" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M340 228 L 340 152 L 500 148 L 500 228 Z" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M326 156 L 420 94 L 514 150 Z" fill="#FBE3D4" stroke="#2A2A2A" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M334 190 L 436 186" stroke="#2A2A2A" stroke-width="3" stroke-linecap="round"/>
    <path d="M344 190 L 344 228 M 392 188 L 392 228 M 430 187 L 430 228" stroke="#2A2A2A" stroke-width="3" stroke-linecap="round"/>
    <rect x="356" y="194" width="22" height="34" fill="#4C8577" stroke="#2A2A2A" stroke-width="2.5"/>
    <g stroke="#2A2A2A" stroke-width="2.5">
      <rect x="448" y="168" width="36" height="28" fill="#DCEAE5"/>
      <path d="M466 168 l 0 28 M448 182 l 36 0"/>
    </g>
    <circle cx="420" cy="128" r="10" fill="#DCEAE5" stroke="#2A2A2A" stroke-width="2.5"/>
    <path d="M310 230 L 310 196" stroke="#2A2A2A" stroke-width="3" stroke-linecap="round"/>
    <rect x="294" y="182" width="32" height="16" rx="6" fill="#E8590C" stroke="#2A2A2A" stroke-width="2.5"/>
    <path d="M294 186 l -7 -10 l 7 0" fill="#E8590C" stroke="#2A2A2A" stroke-width="2" stroke-linejoin="round"/>
    <text x="382" y="258" font-family="Caveat, cursive" font-size="23" fill="#5A5550">gekregen</text>
  </svg>`;

  const SVG_NAMEN = `<svg viewBox="0 0 560 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van een printer die een lijstje met tien zogenaamd willekeurige voornamen uitprint">
    <path d="M132 162 C 130 152, 138 146, 150 146 L 408 142 C 422 142, 430 148, 430 158 L 432 216 C 432 228, 424 234, 410 234 L 152 236 C 138 236, 130 230, 130 220 Z" fill="#DCEAE5" stroke="#2A2A2A" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M166 150 L 168 162 L 392 159 L 392 148" fill="#FAF6EE" stroke="#2A2A2A" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="406" cy="178" r="5" fill="#4C8577" stroke="#2A2A2A" stroke-width="2"/>
    <path d="M148 236 L 144 252 M 416 234 L 420 250" stroke="#2A2A2A" stroke-width="3" stroke-linecap="round"/>
    <g transform="rotate(-2 278 86)">
      <rect x="182" y="22" width="194" height="134" rx="4" fill="#FFFDF8" stroke="#2A2A2A" stroke-width="3"/>
      <g font-family="Caveat, cursive" font-size="20" fill="#2A2A2A">
        <text x="196" y="50">1. Daan</text><text x="290" y="50">6. Lisa</text>
        <text x="196" y="74">2. Emma</text><text x="290" y="74">7. Sem</text>
        <text x="196" y="98">3. Lucas</text><text x="290" y="98">8. Julia</text>
        <text x="196" y="122">4. Sophie</text><text x="290" y="122">9. Finn</text>
        <text x="196" y="146">5. Tess</text><text x="290" y="146">10. Noa</text>
      </g>
    </g>
    <text x="424" y="56" font-family="Caveat, cursive" font-size="26" fill="#E8590C">"willekeurig"?</text>
    <path d="M438 66 C 424 84, 408 96, 388 104" stroke="#E8590C" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="2 8"/>
    <path d="M398 96 L 386 105 L 398 110" fill="none" stroke="#E8590C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M96 254 C 220 248, 420 256, 478 250" stroke="#2A2A2A" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`;

  const SVG_WEEGSCHAAL = `<svg viewBox="0 0 560 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schets van een weegschaal met links wat je zelf blijft doen en rechts wat je aan AI geeft">
    <path d="M216 244 C 248 238, 312 238, 344 244" stroke="#2A2A2A" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M260 240 L 280 192 L 300 240 Z" fill="#FBE3D4" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M280 192 L 279 84" stroke="#2A2A2A" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="279" cy="82" r="6" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="3"/>
    <path d="M152 106 C 240 96, 330 84, 406 72" stroke="#2A2A2A" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M160 108 L 146 162 M 184 105 L 198 160" stroke="#2A2A2A" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M134 162 L 210 159 C 206 182, 140 184, 134 162 Z" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <g transform="rotate(-18 168 140)">
      <rect x="150" y="134" width="38" height="9" rx="3" fill="#E8590C" stroke="#2A2A2A" stroke-width="2.5"/>
      <path d="M188 136 L 198 139 L 188 143 Z" fill="#FFE8A3" stroke="#2A2A2A" stroke-width="2"/>
    </g>
    <text x="92" y="212" font-family="Caveat, cursive" font-size="24" fill="#4C8577">zelf blijven doen</text>
    <path d="M384 74 L 372 122 M 408 71 L 420 120" stroke="#2A2A2A" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M360 122 L 434 119 C 430 142, 366 144, 360 122 Z" fill="#DCEAE5" stroke="#2A2A2A" stroke-width="3" stroke-linejoin="round"/>
    <g stroke="#2A2A2A" stroke-width="2.5">
      <rect x="380" y="92" width="34" height="26" rx="6" fill="#FFFDF8"/>
      <circle cx="390" cy="104" r="2.5" fill="#2A2A2A" stroke="none"/>
      <circle cx="404" cy="104" r="2.5" fill="#2A2A2A" stroke="none"/>
      <path d="M397 92 l 0 -10" stroke-linecap="round"/>
      <circle cx="397" cy="79" r="3" fill="#E8590C" stroke="none"/>
    </g>
    <text x="356" y="172" font-family="Caveat, cursive" font-size="24" fill="#5A5550">aan AI geven</text>
    <text x="296" y="56" font-family="Caveat, cursive" font-size="40" fill="#E8590C">?</text>
  </svg>`;

  /* ============================================================
     De module
     ============================================================ */

  window.MODULE = {
    kicker: "Gratis e-learning",
    titel: "Verantwoord omgaan met AI",
    sub: "Hallucinaties, privacy, bias en wat je zelf blijft doen: zo gebruik je AI zonder brokken. Door Max van den Broek, auteur van AI-Pionier.",

    keuzes: [
      { tekst: "Een openbaar persbericht van je organisatie laten samenvatten.",
        antwoord: "ok",
        uitleg: "Prima. Dit staat al op internet, dus er valt niets meer te lekken. Openbare informatie is de veiligste categorie die er is." },
      { tekst: "Klantnamen en adressen in een publieke chatbot plakken om een mailing klaar te zetten.",
        antwoord: "niet",
        uitleg: "Persoonsgegevens van klanten in een publieke tool: dat is een datalek in wording. Je klant heeft daar nooit toestemming voor gegeven en de AVG verbiedt het. Dit mag bij vrijwel geen enkele organisatie." },
      { tekst: "Je eigen functioneringsverslag laten herschrijven.",
        antwoord: "beleid",
        uitleg: "Het gaat over jou, maar het is ook personeelsinformatie van je werkgever, en de naam van je leidinggevende staat er vaak in. De ene organisatie staat dit toe in een afgeschermde omgeving, de andere niet." },
      { tekst: "Code laten debuggen waar wachtwoorden en API-sleutels in staan.",
        antwoord: "niet",
        uitleg: "Wachtwoorden en sleutels deel je met niemand, dus ook niet met een chatbot. Haal ze eruit en vaak mag het debuggen daarna wel, in een tool die je organisatie heeft goedgekeurd." },
      { tekst: "Een wetstekst of subsidieregeling in gewone taal laten uitleggen.",
        antwoord: "ok",
        uitleg: "Openbare informatie, geen bedrijfsgeheimen. Ga je gang. Check wel de uitleg, want zoals je in deel 1 zag kan het model de plank stellig misslaan." },
      { tekst: "Een geanonimiseerde klantcase laten analyseren.",
        antwoord: "beleid",
        uitleg: "Anonimiseren helpt, maar een combinatie van details kan alsnog herleidbaar zijn ('onze grootste klant in Groningen'). Of dit mag, en in welke tool, bepaalt je organisatie." },
      { tekst: "Notulen van een vertrouwelijke directievergadering laten structureren op chatgpt.com.",
        antwoord: "niet",
        uitleg: "Vrijwel precies dit ging bij een groot techbedrijf mis, waarna AI er voor iedereen op slot ging. Vertrouwelijke bedrijfsinformatie hoort niet in een publieke tool." },
      { tekst: "Een conceptofferte voor een grote klant laten aanscherpen.",
        antwoord: "beleid",
        uitleg: "Prijzen, marges en klantnamen zijn bij veel organisaties vertrouwelijk. In een afgeschermde zakelijke omgeving mag dit vaak wel, op een publieke site meestal niet. Wat zegt jouw beleid?" }
    ],

    lessen: [

      /* ========== START ========== */
      {
        sectie: "Start",
        kicker: "Welkom",
        titel: "Welkom. Dit is geen waarschuwingsfolder.",
        navTitel: "Welkom",
        html: `
  ${illu(SVG_VANGRAIL, "Een vangrail is er niet om je af te remmen.")}

  <p>Mensen die de risico's van AI niet kennen, doen meestal een van twee dingen: ze plakken alles in de eerstvolgende chatbot, of ze raken het ding nooit aan. Allebei zonde. <mark>Verantwoord gebruik is geen rem, maar de voorwaarde om AI serieus in te zetten.</mark> Wie weet waar het misgaat, durft meer.</p>
  <p>Even voorstellen, voor wie hier binnenvalt: ik ben Max van den Broek, auteur van <mark>AI-Pionier</mark> (Koninklijke Boom Uitgevers) en voormalig docent AI aan de Universiteit van Amsterdam. Tegenwoordig train ik teams in het slim gebruiken van AI.</p>
  <p>Wat je in deze e-learning leert, in vier delen:</p>
  <p><strong>Deel 1:</strong> de output checken. Hallucinaties, voorspelbare streken, en de blinde vlek die in jou sluipt.<br>
  <strong>Deel 2:</strong> privacy en vertrouwelijkheid. Waar je data heengaat en wat de chat wel en niet in mag, met een oefening.<br>
  <strong>Deel 3:</strong> bias. Van wijnglazen tot salarislijstjes: waar de scheefheid vandaan komt en hoe je hem opmerkt.<br>
  <strong>Deel 4:</strong> verantwoord werken. Wat blijf je zelf doen, hoe open ben je erover, en hoe zit het met stroom en auteursrecht.</p>
  <p>Deze module duurt ongeveer 30 minuten, je hoeft geen account aan te maken en aan het eind wachten een quiz en een certificaat.</p>
  <div class="note">Wil je eerst snappen hoe een taalmodel onder de motorkap werkt (tokens, voorspellen, training)? Doe dan eerst de gratis module <a href="/academy/module-hoe-ai-werkt.html">Hoe AI echt werkt</a>. Helemaal nieuw met AI? Begin bij <a href="/academy/module-wat-is-ai.html">Wat is AI?</a>. Deze module leunt er af en toe op, maar is ook los te volgen.</div>`
      },

      /* ========== DEEL 1: CHECK DE OUTPUT ========== */
      {
        sectie: "Deel 1 · Check de output",
        kicker: "Deel 1 · Hallucinaties",
        titel: "Overtuigend, vloeiend, en soms gewoon fout",
        navTitel: "Hallucinaties en nepbronnen",
        html: `
  <p>Een taalmodel is een voorspelmachine: het maakt af wat plausibel klinkt. Meestal is dat ook waar. Maar als het model iets niet weet, krijg je geen "weet ik niet". Je krijgt een antwoord dat <mark>precies zo zelfverzekerd klinkt als een goed antwoord</mark>. Dat heet een hallucinatie.</p>
  <p>Nergens slaat dit harder toe dan bij <mark>bronvermeldingen</mark>. Een bronverwijzing heeft een vaste vorm (auteur, jaartal, titel) en vormen kan het model perfect naspelen. Er zijn drie smaken, van grof naar gemeen:</p>
  <p><strong>1. De bron bestaat niet.</strong> Auteur klinkt echt, jaartal klopt qua stijl, titel is precies wat je hoopte te vinden. Het rapport is alleen nooit geschreven. Er zijn inmiddels meerdere advocaten door rechters op de vingers getikt omdat ze verzonnen jurisprudentie indienden.</p>
  <p><strong>2. De bron bestaat, maar is niet echt gelezen.</strong> Het model noemt een echt rapport en beweert dat jouw conclusie erin staat. Of dat zo is, heeft het niet gecontroleerd: het klónk als iets wat in zo'n rapport staat.</p>
  <p><strong>3. De bron is gelezen, maar subtiel verkeerd begrepen.</strong> Het cijfer komt uit de verkeerde tabel, de conclusie is net iets stelliger dan de onderzoekers hem opschreven. Dit is de gemeenste smaak, want alles lijkt te kloppen.</p>

  ${illu(SVG_SPOOKBRON, "De verwijzing klinkt prima. Alleen het boek bestaat niet.")}

  <p>Moderne tools met internettoegang doen het beter dan de eerste chatbots, maar smaak twee en drie lossen ze niet op. Wat je daarom doet: <mark>open de bron, zoek de passage op</mark>, en lees bij belangrijke beslissingen zelf. Jij bent verantwoordelijk voor wat er onder jouw naam de deur uitgaat, niet het model.</p>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Een bron is pas een bron als jij hem geopend hebt."</p></div>`
      },
      {
        kicker: "Deel 1 · Grillig gedrag",
        titel: "Vier streken die je wilt herkennen",
        navTitel: "Vier voorspelbare streken",
        html: `
  <p>Naast hallucinaties heeft een taalmodel een paar vaste streken. Geen zeldzame bugs, maar gedrag dat rechtstreeks uit de training komt. Wie ze kent, ziet ze overal.</p>
  <h2>1. Het praat met je mee</h2>
  <p>Vraag "weet je het zeker?" en het model schiet in de excuses, ook als het eerste antwoord gewoon goed was. Het is getraind op menselijke goedkeuring en <mark>jou tevreden houden zit dieper in het systeem dan gelijk hebben</mark>. Onderzoekers noemen dit sycophancy: meepraten.</p>
  <h2>2. Het raakt het begin kwijt</h2>
  <p>Zet je bovenaan een lang gesprek "antwoord altijd in eenvoudige taal, maximaal 200 woorden", dan is daar twintig berichten later vaak weinig van over. Instructies uit het begin <mark>verwateren naarmate het gesprek groeit</mark>.</p>
  <h2>3. Het blijft even stellig, ook na een correctie</h2>
  <p>Jij wijst op een fout, het model zegt "je hebt helemaal gelijk!" en produceert vervolgens een nieuw antwoord met exact hetzelfde zelfvertrouwen. Soms is dat nieuwe antwoord wéér fout. <mark>De toon van het model zegt niets over de kwaliteit</mark> van het antwoord.</p>
  <h2>4. Het telt en rekent overmoedig</h2>
  <p>Letters tellen, woorden tellen, kolommen optellen: een taalmodel gokt patronen in plaats van te rekenen (het ziet tokens, geen letters, zie module 1). Moderne tools pakken er soms zelf een rekenmachine bij, maar lang niet altijd. En ze waarschuwen niet wanneer ze gokken.</p>
  <table>
    <tr><th>Streek</th><th>Eerste hulp</th></tr>
    <tr><td>Meepraten</td><td>Vraag om tegenargumenten in plaats van bevestiging: "wat pleit hiertegen?"</td></tr>
    <tr><td>Begin kwijt</td><td>Herhaal belangrijke instructies, of begin per taak een nieuw gesprek.</td></tr>
    <tr><td>Stellig na correctie</td><td>Negeer de toon, check de inhoud. Twee keer fout is een teken: zelf doen.</td></tr>
    <tr><td>Overmoedig rekenen</td><td>Rekenwerk zelf doen, of expliciet vragen om een rekentool of code.</td></tr>
  </table>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Zelfvertrouwen is bij AI geen informatie. Het staat standaard aan."</p></div>`
      },
      {
        kicker: "Deel 1 · Automation bias",
        titel: "De gevaarlijkste fout zit niet in het model",
        navTitel: "Automation bias",
        html: `
  <p>Nu de ongemakkelijke les. De eerste week met AI check je alles, want je vertrouwt het ding nog niet. Drie maanden later heeft het 95 van de 100 keer gelijk gehad, en check je vrijwel niets meer. <mark>Precies dan glipt fout nummer 21 erdoor.</mark></p>

  ${illu(SVG_AUTOBIAS, "Het model werd niet slechter. Jij stopte met kijken.")}

  <p>Dit heet <mark>automation bias</mark>: hoe vaker een systeem gelijk heeft, hoe minder kritisch je het controleert. Het is hetzelfde mechanisme als bij navigatie. Iedereen kent de verhalen van auto's die een veerpont missen omdat "de TomTom het zei". Niet omdat die bestuurders dom zijn, maar omdat het systeem duizend keer eerder gelijk had.</p>
  <p>Het gemene: deze fout groeit met het succes van AI. Hoe beter de modellen worden, hoe meer er doorheen glipt op de momenten dat het misgaat. Je kunt er wel iets tegen doen:</p>
  <p><strong>Koppel je controle aan het gevolg, niet aan je gevoel.</strong> Bij een brainstorm bestaan geen foute suggesties, dus daar mag de teugel los. Maar een contract, een advies aan een klant of cijfers in een rapportage check je grondig, ook als de afgelopen vijftig outputs prima waren. En ook een interne mail wil je gewoon kloppend hebben, alleen hoeft daar geen uur factcheck overheen.</p>
  <p><strong>Plan steekproeven.</strong> Check bewust af en toe een output die je normaal zou doorlaten. Niet omdat je iets verwacht, maar om je eigen alertheid te onderhouden.</p>
  <p><strong>Lees als de ontvanger.</strong> Niet "klopt dit ongeveer?", maar "wat gebeurt er als de ontvanger op dit ene cijfer vertrouwt?"</p>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Niet AI wordt onbetrouwbaarder met de tijd. Jij wordt minder oplettend."</p></div>`
      },

      /* ========== DEEL 2: PRIVACY EN VERTROUWELIJKHEID ========== */
      {
        sectie: "Deel 2 · Privacy en vertrouwelijkheid",
        kicker: "Deel 2 · Publieke tools",
        titel: "Waar gaat je tekst eigenlijk heen?",
        navTitel: "Waar je data heengaat",
        html: `
  <p>Je plakt een stuk tekst in een chatbot en drukt op Enter. Wat gebeurt er dan? Bij <mark>publieke tools</mark> zoals het gratis chatgpt.com gaat je tekst naar de servers van het AI-bedrijf, vaak buiten Europa. Daar kan hij worden opgeslagen, door mensen worden bekeken voor kwaliteitscontrole, en <mark>standaard worden gebruikt om toekomstige modellen te trainen</mark> (uit te zetten in de instellingen, maar wie doet dat).</p>

  ${illu(SVG_EUWOLK, "Versturen is één klik. Terughalen is geen functie.")}

  <p>Waarom is dat erg? Drie concrete scenario's:</p>
  <p><strong>Je tekst wordt trainingsmateriaal.</strong> Wat in de trainingsdata zit, kan in andermans antwoorden opduiken. Zit jouw conceptstrategie daartussen, dan kan een ander daar ooit een echo van terugkrijgen. En bewijs achteraf maar eens dat die echo van jou kwam.</p>
  <p><strong>Het overkwam zelfs de profs.</strong> Kort na de lancering van ChatGPT plakten medewerkers van een groot techbedrijf vertrouwelijke notulen en broncode in de chatbot. Het bedrijf zette daarop het gebruik voor álle medewerkers op slot. Het risico is niet theoretisch, en de schade kwam daar dubbel aan: eerst het lek, toen het verbod.</p>
  <p><strong>Persoonsgegevens zijn een aparte categorie.</strong> Namen, adressen of dossiers van klanten doorsturen naar een bedrijf buiten de EU zonder dat dat geregeld is: dat is geen slordigheid maar een <mark>datalek</mark>, met meldplicht en mogelijk een boete.</p>
  <p>Het goede nieuws: er bestaan ook <mark>afgeschermde zakelijke omgevingen</mark>, zoals de Copilot- of ChatGPT-omgeving van je werk. Daar liggen contractuele afspraken onder: er wordt niet op jouw data getraind en de opslag is geregeld, vaak binnen Europa. Daarom is "welke tool gebruik ik?" net zo belangrijk als "welke data deel ik?".</p>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Behandel een publieke chatbot als een externe partij. Want dat is het."</p></div>`
      },
      {
        kicker: "Deel 2 · Beleid",
        titel: "Wat is vertrouwelijk? Dat bepaalt je organisatie",
        navTitel: "Wat is vertrouwelijk?",
        html: `
  <p>"Geen vertrouwelijke informatie in de chat." Klinkt simpel, tot je je afvraagt: wat is vertrouwelijk dan precies? Het antwoord bestaat uit twee lagen.</p>
  <h2>Laag 1: de wet</h2>
  <p>De wet legt de ondergrens: <mark>persoonsgegevens</mark>. Alles wat naar een persoon te herleiden is: namen, e-mailadressen, BSN, gezondheidsinformatie. Daarvoor geldt de AVG, altijd, AI of geen AI. Deze laag is voor elke organisatie hetzelfde.</p>
  <h2>Laag 2: jouw organisatie</h2>
  <p>Daarbovenop bepaalt <mark>elke organisatie zélf</mark> wat ze geheim houdt. Denk aan plannen die nog niet zijn aangekondigd, financiële cijfers, broncode, contracten, personeelsdossiers, beveiligingsinformatie. En die grens verschilt echt per organisatie: voor een gemeente is een conceptnota bijna openbaar-in-wording, voor een beursgenoteerd bedrijf is hetzelfde document koersgevoelig.</p>
  <p>Daarom bestaat er <mark>geen universeel lijstje</mark> van wat wel en niet in de chat mag. De enige vraag die altijd werkt: <strong>wat zegt het beleid van jouw organisatie?</strong> Is er geen beleid, vraag er dan naar. Je bent gegarandeerd niet de enige die het wil weten.</p>
  <div class="note"><strong>Tot je het beleid kent</strong>, is dit een bruikbare vuistregel: wat publiek beschikbaar is mag erin, de rest niet. En deel sowieso niet meer dan nodig: "ik werk bij een gemeente" werkt net zo goed als de naam van de gemeente, en een geanonimiseerde casus net zo goed als een echte.</div>
  <div class="callout"><div class="label">De kern van deze les</div><p>"De wet is de ondergrens. Jouw organisatie bepaalt de rest. Ken je beleid."</p></div>
  <p>Tijd om dit te oefenen. De volgende les legt je acht situaties voor.</p>`
      },
      {
        kicker: "Deel 2 · Oefening",
        titel: "Oefening: mag dit de chat in?",
        navTitel: "Oefening: mag dit de chat in?",
        html: `
  <p>Acht situaties van de werkvloer. Klik per situatie wat jij denkt: <strong>oké</strong>, <strong>niet oké</strong>, of <strong>hangt van het beleid af</strong>. De antwoorden volgen gangbaar beleid; jouw organisatie kan strenger of soepeler zijn.</p>
  <div id="demo-keuzes"></div>
  <p class="muted">Twijfel je in het echt? Dan is de volgorde: beleid opzoeken, navragen, of niet doen. In die volgorde.</p>`
      },

      /* ========== DEEL 3: BIAS ========== */
      {
        sectie: "Deel 3 · Bias",
        kicker: "Deel 3 · De bron",
        titel: "Bias komt van twee kanten",
        navTitel: "Bias komt van twee kanten",
        html: `
  <p>AI heeft vooroordelen. Dat is geen mening, dat is meetbaar. Maar waar komt die scheefheid vandaan? Uit twee richtingen tegelijk, en dat maakt het probleem zo taai.</p>
  <h2>Kant één: de data</h2>
  <p>Een model leert van internet en van boeken: meer Engels dan Nederlands, meer Amerika dan Europa, meer verleden dan heden. Vroeg je de eerste beeldgenerators om een IT-consultant, dan kreeg je <mark>uitsluitend mannen</mark> te zien. Niet omdat iemand dat zo programmeerde, maar omdat de historische data er zo uitzag. Het model vat samen hoe de wereld op internet eruitziet, inclusief alle scheefgroei.</p>
  <h2>Kant twee: de makers</h2>
  <p>AI-bedrijven weten dit en sturen bij, met extra training en instructies. Soms schiet dat door. Toen Google begin 2024 de beeldgeneratie van Gemini lanceerde, leverden verzoeken om Vikingen of Amerikaanse Founding Fathers <mark>historisch onjuiste, geforceerd diverse afbeeldingen</mark> op. Google zette de functie snel weer uit. En naast overcorrectie is er een subtieler punt: elke correctie is een keuze van een team mensen, met eigen opvattingen, meestal in Californië.</p>
  <p>Dat is de kern: <mark>de data is scheef, en wie dat corrigeert is zelf ook niet neutraal</mark>. Bias is daarom geen bug die een keer wordt opgelost, maar een eigenschap waar je mee leert werken.</p>
  <div class="note"><strong>Extra lastig:</strong> die correcties veranderen per modelversie. Wat het model vorige maand antwoordde, kan na een stille update anders zijn. Gedrag waar je op rekent, verschuift zonder aankondiging. Af en toe opnieuw testen dus.</div>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Bias zit in de data én in de correctie erbovenop. Neutraal bestaat niet."</p></div>`
      },
      {
        kicker: "Deel 3 · Zien is geloven",
        titel: "Het wijnglas, het horloge en het rijtjeshuis",
        navTitel: "Wijnglas, horloge, rijtjeshuis",
        html: `
  <p>Bias klinkt abstract, tot je het ziet. Bij beeldgeneratie kun je de statistiek letterlijk bekijken. Drie klassiekers.</p>
  <h2>Het wijnglas</h2>
  <p>Vraag om "een wijnglas, gevuld tot de rand". Jarenlang kreeg je een keurig <mark>half vol glas</mark>, hoe hard je ook TOT DE RAND typte. Waarom? Vrijwel elke wijnfoto op internet toont een half vol glas, want zo hoor je wijn te schenken. Het model tekent niet jouw opdracht, het tekent <mark>het gemiddelde van wat het zag</mark>. De allerbeste modellen kunnen dit inmiddels wel. Het mechanisme erachter is niet veranderd.</p>

  ${illu(SVG_WIJNGLAS, "Miljoenen foto's van halfvolle glazen wonnen het van jouw prompt.")}

  <h2>Het horloge</h2>
  <p>Vraag om een horloge en de wijzers staan op <mark>tien over tien</mark>. Reclamefotografen zetten wijzers al decennia zo: symmetrisch, het merk blijft vrij, en het lijkt net een glimlach. Het model zag miljoenen reclamefoto's. Vraag expliciet om kwart voor drie en de kans is groot dat je alsnog tien over tien krijgt.</p>

  ${illu(SVG_HORLOGE, "Zo lacht een horloge in elke reclamefolder. AI lacht braaf mee.")}

  <h2>Het rijtjeshuis</h2>
  <p>Vraag om "een Nederlands rijtjeshuis" en er verschijnt nogal eens een <mark>vrijstaand huis met veranda</mark> en een gazon eromheen. Het internet is grotendeels Amerikaans, dus "huis" betekent voor het model eerder suburbia dan Vinex-wijk.</p>

  ${illu(SVG_HUIS, "Het internet is Amerikaans. Je ziet het aan de veranda.")}

  <p>Om deze drie kun je lachen. Maar hetzelfde mechanisme bepaalt wie er verschijnt als je om "een directeur" of "een verpleegkundige" vraagt. En het stopt niet bij plaatjes, zoals je in de volgende les zelf gaat testen.</p>
  <div class="callout"><div class="label">De kern van deze les</div><p>"AI geeft je niet wat je vraagt, maar wat het vaakst voorkwam."</p></div>`
      },
      {
        kicker: "Deel 3 · De oefening",
        titel: "Tien willekeurige namen (probeer dit zelf)",
        navTitel: "De namen-oefening",
        html: `
  <p>Dit is de sterkste bias-oefening die ik ken, en hij kost dertig seconden. Open je AI-tool en typ: <mark>"Geef me een lijst met tien willekeurige Nederlandse voornamen."</mark></p>

  ${illu(SVG_NAMEN, "Tien keer willekeurig, en toch verrassend voorspelbaar.")}

  <p>Grote kans dat je iets kreeg als Daan, Emma, Lucas, Sophie, Sem. Een keurig lijstje. Kijk nu wat er <mark>niet</mark> op staat: geen Mohammed, geen Fatima, geen Ahmed. Terwijl Mohammed, met alle spellingsvarianten meegeteld, in de grote steden al jaren bovenaan de lijstjes met jongensnamen staat.</p>
  <h2>Is dat fout? Lastiger dan je denkt</h2>
  <p>Wat zou "correct" hier eigenlijk zijn? Een afspiegeling van Nederland? Van Amsterdam, of juist van Drenthe? Van jouw klantenbestand? <mark>"Willekeurig" bestaat niet zonder een keuze waaruit je trekt</mark>, en die keuze heeft het model stilletjes voor jou gemaakt. Gebruikt jouw organisatie AI voor testdata, persona's of voorbeeldbrieven, dan is dit een echte ontwerpkeuze die iemand bewust moet maken. En het juiste antwoord is niet triviaal.</p>
  <h2>Nu met salarissen</h2>
  <p>Vraag als vervolg: "zet achter elke naam een realistisch maandsalaris". Grote kans dat de mannen meer verdienen dan de vrouwen, en dat de westerse namen bovenaan staan. Het model reproduceert <mark>de loonkloof uit zijn trainingsdata</mark>, netjes en ongevraagd. Stel je voor dat dit ongezien in een HR-tool of een arbeidsmarktanalyse belandt. Niet voor niets vallen AI-toepassingen rond werving en beoordeling onder het strengste regime van de AI-verordening.</p>
  <h2>Het zit ook in je tekst</h2>
  <p>Genereer jij nooit plaatjes of lijstjes? Dit werkt door in álles, ook in taal. AI schrijft van nature Amerikaans Nederlands: indirecter en met meer plichtplegingen dan wij gewend zijn. <mark>"Hopelijk gaat alles goed met je."</mark> als mailopening: geen Nederlander die dat uit zichzelf schrijft. En vraag je "maak dit professioneler", dan krijg je vaak vooral Amerikáánser: formeler, omslachtiger, met een extra laagje glazuur. Professioneel in Rotterdam is iets anders dan professioneel in Silicon Valley. Zeg dus wat je echt wilt ("korter, directer, geen plichtplegingen") en houd je eigen toon vast.</p>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Vraag je AI om iets neutraals, dan krijg je iemands gemiddelde. Kijk wiens."</p></div>`
      },

      /* ========== DEEL 4: VERANTWOORD WERKEN ========== */
      {
        sectie: "Deel 4 · Verantwoord werken",
        kicker: "Deel 4 · Deskilling",
        titel: "Wat blijf je zelf doen?",
        navTitel: "Wat blijf je zelf doen?",
        html: `
  <p>Eerlijke vraag: kun jij nog kaartlezen? Sinds navigatie het overnam, hoeft het niet meer, en dus kan bijna niemand het nog. Met AI staat die vraag nu open voor zo'n beetje elke denkvaardigheid: schrijven, analyseren, samenvatten, code lezen. Wat je uitbesteedt, oefen je niet meer. Dat heet <mark>deskilling</mark>.</p>

  ${illu(SVG_WEEGSCHAAL, "Wat op rechts ligt, oefen je niet meer. Leg het er bewust op.")}

  <p>Dit dilemma is ouder dan AI. In het rekenonderwijs hebben we er ooit een afspraak over gemaakt: eerst leer je hoofdrekenen, daarna mag de rekenmachine. <mark>Voor AI bestaan zulke normen nog niet.</mark> Die moeten we per vak, per team en per persoon uitvinden. Drie vragen die daarbij helpen:</p>
  <p><strong>1. Wat is de kern van mijn vak?</strong> De vaardigheid waarmee jij het verschil maakt, blijf je zelf doen. Of je doet het eerst zelf en laat AI daarna meekijken als tweede paar ogen. Zo houd je de spier getraind.</p>
  <p><strong>2. Wat is corvee dat ik allang beheers?</strong> Notulen uitwerken, standaardmails, formats invullen: offload het gerust. Daar verleer je niets wat je wilt houden.</p>
  <p><strong>3. Wat wil ik juist leren?</strong> Gebruik AI daar als oefenmaatje in plaats van uitbesteder: laat het jouw werk bekritiseren in plaats van het over te nemen.</p>
  <div class="note"><strong>Voor teams</strong> komt er een vraag bij: als AI alle eerste versies schrijft, waar leert de junior dan schrijven? Wie ervaring heeft, kan output beoordelen. Wie het vak nog leert, heeft het zelf-doen nodig. Goede teams maken daar expliciete afspraken over.</div>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Uitbesteden is prima. Maar weet wat je weggeeft."</p></div>`
      },
      {
        kicker: "Deel 4 · Transparantie",
        titel: "Zeg het er gewoon bij",
        navTitel: "Transparantie",
        html: `
  <p>Heel veel mensen gebruiken AI op hun werk zonder het te vertellen. Begrijpelijk: niemand wil de collega zijn die "het door de computer laat doen". Maar stiekem gebruik heeft een prijs. Collega's leren jouw trucs niet, fouten zijn lastiger terug te vinden, en als het toch uitkomt is het gesprek een stuk ongemakkelijker dan wanneer je het gewoon had gezegd.</p>
  <p>Het eerlijke verhaal: <mark>de norm hiervoor is nog in vorming</mark>. Er is geen landelijke etiquette voor wanneer je AI-gebruik vermeldt. Juist daarom moet je het er in je team over hebben. Drie afspraken die elk team vandaag kan maken:</p>
  <p><strong>1. Waarvoor gebruiken we AI?</strong> Welke taken wel, welke niet.<br>
  <strong>2. Wat checken we altijd?</strong> En wie is eindverantwoordelijk (spoiler: degene wiens naam eronder staat).<br>
  <strong>3. Wanneer vermelden we het?</strong> Bijvoorbeeld: altijd bij stukken met gevolgen voor anderen, niet bij een opgepoetste mail.</p>
  <p>Tot die afspraken er zijn, twee vuistregels. Eén: <mark>jouw naam eronder betekent jouw verantwoordelijkheid</mark>, met of zonder AI. Twee: zou de ontvanger zich bekocht voelen als die wist dat AI meeschreef? Vermeld het dan. Niemand voelt zich bekocht door een spellingscontrole; bij een persoonlijk advies ligt dat anders.</p>
  <div class="callout"><div class="label">Wat je voortaan zegt</div><p>"Dit heb ik met AI gemaakt, en zo heb ik het gecheckt."</p></div>`
      },
      {
        kicker: "Deel 4 · De rest",
        titel: "Stroom en auteursrecht, in proportie",
        navTitel: "Stroom en auteursrecht",
        html: `
  <p>Twee bezwaren hoor je bij elke verjaardag: AI slurpt stroom en AI steelt van makers. Beide verdienen een eerlijk, nuchter antwoord. Hier is de korte versie.</p>
  <h2>Stroomverbruik</h2>
  <p>Eén chatvraag kost weinig: serieuze schattingen komen uit op <mark>de orde van seconden gloeilamp</mark>, niet op autokilometers. Vergelijkingen die één prompt opblazen tot een dagje stroomverbruik slaan de plank mis. Bovendien wordt de techniek snel zuiniger: er komen chips die speciaal voor AI zijn ontworpen, en nieuwere modellen doen meer per wattuur.</p>
  <p>Maar de optelsom is wél een echt vraagstuk. Miljarden vragen per dag, het trainen van nieuwe modellen en de datacenters die daarvoor verrijzen: de vraag naar stroom en koelwater <mark>groeit hard</mark>, en dat hoort op de agenda van politiek, energiesector en AI-bedrijven. Voor jou betekent het vooral: je hoeft je niet schuldig te voelen over een chatvraag, en je hoeft AI ook niet aan te zetten waar het niets toevoegt. Gebruik het waar het waarde levert. Dat is geen milieuregel, dat is gewoon verstandig werken.</p>
  <h2>Auteursrecht</h2>
  <p>Hier lopen twee vragen door elkaar. Vraag één: <mark>mochten de modellen op al die teksten en beelden trainen?</mark> Daarover lopen wereldwijd rechtszaken en zijn al forse schikkingen getroffen. Dat speelt tussen AI-bedrijven, uitgevers en makers, niet in jouw chatvenster.</p>
  <p>Vraag twee: mag jij de output gebruiken? In principe genereert AI <mark>nieuw materiaal</mark>, geen kopie. Voor gewoon kantoorwerk (mails, notities, analyses) is auteursrecht zelden een blokkade. Let op bij twee dingen: vraag niet om de herkenbare stijl van een levende maker of om beschermde figuren (de tools weigeren dat overigens steeds vaker), en weet dat puur AI-gegenereerd werk in veel landen zelf géén auteursrechtbescherming krijgt. Relevant als je organisatie iets exclusief wil bezitten, zoals een logo. Bij publicaties en campagnes: volg je beleid en vraag bij twijfel een jurist.</p>
  <div class="callout"><div class="label">De kern van deze les</div><p>"Maak je druk in proportie: niet om je chatvraag, wel om de optelsom."</p></div>`
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
        titel: "Je gebruikt AI nu bewuster dan de meeste gebruikers",
        navTitel: "Afsluiting + spiekbriefje",
        html: `
  <p>Dat was de module. Geen reden om AI te mijden, wel een rijtje gewoontes die het verschil maken tussen slordig en serieus gebruik. Je spiekbriefje:</p>

  <div class="spiek">
    <ol>
      <li><strong>"Een bron is pas een bron als ik hem geopend heb.</strong> Zeker als de verwijzing perfect klinkt."</li>
      <li><strong>"AI praat met me mee.</strong> Ik vraag om tegenargumenten, niet om bevestiging."</li>
      <li><strong>"Hoe vaker het goed gaat, hoe slechter ik check.</strong> Dus plan ik steekproeven."</li>
      <li><strong>"Persoonsgegevens, wachtwoorden en bedrijfsgeheimen horen niet in een publieke chatbot.</strong> Een zakelijke omgeving is het halve werk."</li>
      <li><strong>"Wat vertrouwelijk is, bepaalt mijn organisatie.</strong> Ik ken het beleid."</li>
      <li><strong>"Bias zit in de data én in de correcties.</strong> Ik reken nergens op neutraal, ook niet in tekst."</li>
      <li><strong>"Ik kies bewust wat ik zelf blijf doen.</strong> En ik zeg het er gewoon bij als AI meeschreef."</li>
    </ol>
  </div>

  <p>En je huiswerk is al bekend: doe vandaag de namen-oefening in je eigen AI-tool, en zoek op waar het AI-beleid van jouw organisatie staat. Geen beleid gevonden? Stel de vraag. Daarmee ben je vandaag al de meest verantwoorde AI-gebruiker van je afdeling.</p>

  <div class="callout">
    <div class="label">Hoe nu verder?</div>
    <p class="gewoon">Wil je dat jouw team of organisatie AI echt gaat gebruiken, veilig én productief? Daar help ik bij: met trainingen, e-learnings op maat en praktische tools. Kijk op <a href="https://aimetmax.nl">aimetmax.nl</a> of stuur me een bericht op <a href="https://linkedin.com/in/maxbroek">LinkedIn</a>.</p>
  </div>

  <p class="muted" style="font-size: 13px;">Deze module is gebaseerd op mijn boek AI-Pionier (Boom, 2024) en op trainingen over verantwoord AI-gebruik die ik gaf aan teams van HR tot IT.</p>`
      }
    ],

    quiz: [
      { s: "ChatGPT noemt een rapport met auteur, titel en jaartal. Dan bestaat dat rapport ook echt.",
        antwoord: false,
        uitleg: "Niet waar. Juist bronvermeldingen worden vaak verzonnen: de vorm klopt perfect, de bron bestaat niet. Open de bron zelf voordat je hem doorgeeft." },
      { s: "Ook als een bron echt bestaat, kan AI verkeerd weergeven wat erin staat.",
        antwoord: true,
        uitleg: "Waar. Dit is de subtielere smaak: de bron is echt, maar de claim erover klopt niet of net niet. Check dus niet alleen of de bron bestaat, maar ook of de passage er staat." },
      { s: "Zeg je tegen AI dat het antwoord fout is, dan krijg jij al snel gelijk, ook als het antwoord goed was.",
        antwoord: true,
        uitleg: "Waar. Dit heet sycophancy: het model is getraind om jou tevreden te houden en praat graag mee. Vraag om onderbouwing in plaats van te duwen." },
      { s: "Hoe vaker AI het goed doet, hoe kritischer mensen de output gaan controleren.",
        antwoord: false,
        uitleg: "Niet waar. Het is precies andersom: hoe vaker het goed gaat, hoe minder je checkt. Dat heet automation bias, en je bestrijdt het met vaste checkmomenten en steekproeven." },
      { s: "Wat je intypt op het gratis chatgpt.com kan buiten Europa worden verwerkt en gebruikt worden om modellen te trainen.",
        antwoord: true,
        uitleg: "Waar. Publieke tools slaan je invoer op en kunnen er standaard op trainen. Zakelijke omgevingen zoals ChatGPT Enterprise of de Copilot van je werk maken daar andere afspraken over." },
      { s: "Wat vertrouwelijk is, staat volledig in de wet. Een eigen AI-beleid voegt daar weinig aan toe.",
        antwoord: false,
        uitleg: "Niet waar. De wet regelt de ondergrens (persoonsgegevens), maar elke organisatie bepaalt zelf wat daarbovenop vertrouwelijk is: plannen, cijfers, code, contracten. Daarom moet je het beleid van jouw organisatie kennen." },
      { s: "Bias in AI komt uitsluitend door oude trainingsdata.",
        antwoord: false,
        uitleg: "Niet waar. Bias komt van twee kanten: scheve trainingsdata én de correcties van modelmakers, die kunnen doorschieten (zoals bij Gemini begin 2024) of eigen voorkeuren meebrengen." },
      { s: "Vraag AI om tien willekeurige Nederlandse namen en je krijgt meestal een representatieve afspiegeling van Nederland.",
        antwoord: false,
        uitleg: "Niet waar. Meestal krijg je een opvallend wit lijstje. En wat 'representatief' zou moeten zijn, is een keuze die het model nu stilletjes voor je maakt. Die keuze hoort bij jou of je organisatie te liggen." },
      { s: "De vraag 'maak dit professioneler' kan je tekst ongemerkt Amerikaanser maken.",
        antwoord: true,
        uitleg: "Waar. Het model leerde 'professioneel' vooral uit Amerikaanse teksten: indirecter, formeler, meer plichtplegingen. Zeg specifiek wat jij wilt en houd je eigen toon." },
      { s: "Eén chatvraag aan AI kost ongeveer evenveel stroom als een uur autorijden.",
        antwoord: false,
        uitleg: "Niet waar. Eén chatvraag zit in de orde van seconden gloeilamp. Het echte energievraagstuk is de optelsom: miljarden vragen, training en datacenters. Maak je druk in proportie." }
    ]
  };

})();
