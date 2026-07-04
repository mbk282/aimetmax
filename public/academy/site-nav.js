// Voegt het hoofdmenu van aimetmax.nl toe bovenaan elke academy-pagina,
// zodat bezoekers vanuit de academy direct naar kaarten, boek en over kunnen.
(function () {
  var nav = document.createElement("header");
  nav.className = "site-nav-bar";
  nav.innerHTML = [
    "<style>",
    ".site-nav-bar{background:var(--card,#FFFDF8);border-bottom:2px solid var(--ink,#2A2A2A);font-family:Inter,system-ui,sans-serif;}",
    ".site-nav-bar .snb-inner{max-width:1000px;margin:0 auto;padding:12px 20px;display:flex;align-items:center;gap:18px;overflow-x:auto;white-space:nowrap;}",
    ".site-nav-bar .snb-logo{font-family:Caveat,cursive;font-size:26px;font-weight:700;color:var(--ink,#2A2A2A);text-decoration:none;margin-right:auto;line-height:1;}",
    ".site-nav-bar a.snb-link{color:var(--ink-soft,#5A5550);text-decoration:none;font-size:14px;font-weight:600;}",
    ".site-nav-bar a.snb-link:hover{color:var(--accent,#E8590C);}",
    '.site-nav-bar a.snb-link[aria-current="page"]{color:var(--accent,#E8590C);}',
    ".site-nav-bar .snb-btn{background:var(--accent,#E8590C);color:#fff;border-radius:999px;padding:8px 15px;font-size:13px;font-weight:700;text-decoration:none;flex-shrink:0;}",
    ".site-nav-bar .snb-btn:hover{background:#c94a08;}",
    "</style>",
    '<nav class="snb-inner" aria-label="Hoofdmenu">',
    '<a class="snb-logo" href="/">AI met Max</a>',
    '<a class="snb-link" href="/kaarten">AI-kaarten</a>',
    '<a class="snb-link" href="/academy" aria-current="page">E-learning</a>',
    '<a class="snb-link" href="/boek">Boek</a>',
    '<a class="snb-link" href="/over">Over</a>',
    '<a class="snb-btn" href="/kaarten/bestel">Bestel de kaarten</a>',
    "</nav>",
  ].join("");
  document.body.insertBefore(nav, document.body.firstChild);

  // De losse "terug naar aimetmax.nl"-link is dubbelop zodra het menu er staat.
  document.querySelectorAll('a.back-link[href="/"]').forEach(function (el) {
    el.style.display = "none";
  });
})();
