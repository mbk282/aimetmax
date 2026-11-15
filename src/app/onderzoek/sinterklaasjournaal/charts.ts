// @ts-nocheck
// Chart code for the Sinterklaasjournaal story, generated from the article build.
export function renderCharts(root: HTMLElement, DATA: any): () => void {
  const tip = document.createElement('div'); tip.className = 'sj-tip'; tip.setAttribute('role', 'tooltip'); document.body.appendChild(tip);

const css = n => getComputedStyle(root).getPropertyValue(n).trim();
const NS = 'http://www.w3.org/2000/svg';
const el = (tag, attrs = {}, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };

function showTip(ev, html) { tip.innerHTML = html; tip.style.opacity = 1; const x = Math.min(ev.clientX + 14, window.innerWidth - 300); tip.style.left = x + 'px'; tip.style.top = (ev.clientY + 14) + 'px'; }
function hideTip() { tip.style.opacity = 0; }
function bindTip(node, html) { node.addEventListener('mousemove', e => showTip(e, html)); node.addEventListener('mouseleave', hideTip); node.setAttribute('tabindex', '0'); node.addEventListener('focus', () => { const r = node.getBoundingClientRect(); showTip({ clientX: r.right, clientY: r.top }, html); }); node.addEventListener('blur', hideTip); }
const pct = v => Math.round(v * 100) + '%';
const nl = v => String(v).replace('.', ',');
const fdate = d => { const [y, m, dd] = d.split('-'); return `${+dd} ${['jan','feb','mrt','apr','mei','jun','jul','aug','sep','okt','nov','dec'][+m - 1]} ${y}`; };
function axisY(svg, y, ticks, x0, x1, fmt) { const g = el('g', { class: 'grid' }, svg); ticks.forEach(v => { el('line', { x1: x0, x2: x1, y1: y(v), y2: y(v) }, g); const t = el('text', { x: x0 - 8, y: y(v) + 4, 'text-anchor': 'end' }, svg); t.textContent = fmt(v); }); }
function table(host, head, rows) { const d = document.createElement('details'); d.innerHTML = '<summary>Bekijk de cijfers</summary><div class="tbl"><table><thead><tr>' + head.map(h => `<th>${h}</th>`).join('') + '</tr></thead><tbody>' + rows.map(r => '<tr>' + r.map(c => `<td>${c}</td>`).join('') + '</tr>').join('') + '</tbody></table></div>'; host.appendChild(d); }

function real() {
  const host = document.getElementById('c-real');
  const W = 760, H = 300, m = { l: 40, r: 12, t: 34, b: 30 };
  const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Staafgrafiek: aandeel realistische problemen per seizoen, 2001-2026' }, host);
  const S = DATA.seasons, n = S.length, bw = (W - m.l - m.r) / n;
  const x = i => m.l + i * bw, y = v => m.t + (1 - v) * (H - m.t - m.b);
  axisY(svg, y, [0, .25, .5, .75, 1], m.l, W - m.r, pct);
  S.forEach((s, i) => {
    const h = Math.max(2, y(0) - y(s.real));
    const r = el('rect', { x: x(i) + 2, y: y(0) - h, width: bw - 4, height: h, rx: 3, fill: css('--nu') }, svg);
    bindTip(r, `<b>${s.y} · ${pct(s.real)} realistisch</b>${s.txt}`);
    if (s.y % 5 === 0 || s.y === 2001 || s.y === 2026) { const t = el('text', { x: x(i) + bw / 2, y: H - 10, 'text-anchor': 'middle' }, svg); t.textContent = s.y; }
  });
  [['2001-2008', 2001, 2008], ['2009-2016', 2009, 2016], ['2017-2026', 2017, 2026]].forEach(([era, a, b]) => {
    const r = DATA.cause_eras.find(e => e.era === era).realistic;
    const xa = x(a - 2001) + 2, xb = x(b - 2001) + bw - 2;
    el('line', { x1: xa, x2: xb, y1: y(r), y2: y(r), stroke: css('--sint'), 'stroke-width': 3, 'stroke-linecap': 'round' }, svg);
    const t = el('text', { x: (xa + xb) / 2, y: y(r) - 8, 'text-anchor': 'middle', class: 'lbl' }, svg); t.textContent = `${era}: ${pct(r)}`;
  });
  table(host, ['Seizoen', 'Realistisch', 'Begin van de verhaallijn'], S.map(s => [s.y, pct(s.real), s.txt]));
}

function strip() {
  const host = document.getElementById('c-strip');
  const W = 760, H = 320, m = { l: 40, r: 12, t: 12, b: 30 };
  const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Stippengrafiek: aandeel negatieve zinnen per aflevering, per seizoen 2013-2026' }, host);
  const yrs = [...new Set(DATA.strip.map(d => d.y))].sort();
  const slots = []; yrs.forEach((yr, i) => { if (i && yr - yrs[i - 1] > 1) slots.push(null); slots.push(yr); });
  const sw = (W - m.l - m.r) / slots.length;
  const xc = yr => m.l + (slots.indexOf(yr) + 0.5) * sw;
  const lo = .15, hi = .6, y = v => m.t + (hi - v) / (hi - lo) * (H - m.t - m.b);
  axisY(svg, y, [.2, .3, .4, .5, .6], m.l, W - m.r, pct);
  slots.forEach((s, i) => { const t = el('text', { x: m.l + (i + 0.5) * sw, y: H - 10, 'text-anchor': 'middle' }, svg); t.textContent = s === null ? '23-24' : (s % 100 === s ? s : "'" + String(s).slice(2)); if (s === null) t.setAttribute('opacity', .6); });
  const gap = slots.indexOf(null); if (gap >= 0) { const t = el('text', { x: m.l + (gap + 0.5) * sw, y: y(.42), 'text-anchor': 'middle' }, svg); t.textContent = 'geen'; const t2 = el('text', { x: m.l + (gap + 0.5) * sw, y: y(.42) + 16, 'text-anchor': 'middle' }, svg); t2.textContent = 'data'; }
  yrs.forEach(yr => {
    const P = DATA.strip.filter(d => d.y === yr).sort((a, b) => a.d < b.d ? -1 : 1);
    const c = yr >= 2025 ? css('--sint') : css('--s1');
    P.forEach((d, k) => {
      const jx = xc(yr) + ((k * 7) % 23 - 11) * (sw / 34);
      const dot = el('circle', { cx: jx, cy: y(d.neg), r: 4.2, fill: c, 'fill-opacity': .8, stroke: css('--card'), 'stroke-width': 1.5 }, svg);
      bindTip(dot, `<b>${fdate(d.d)}</b>${pct(d.neg)} negatieve zinnen · spanningsscore ${d.t}/10 · ${d.open} open problemen aan het eind`);
    });
    const mean = P.reduce((s, d) => s + d.neg, 0) / P.length;
    el('line', { x1: xc(yr) - sw * .36, x2: xc(yr) + sw * .36, y1: y(mean), y2: y(mean), stroke: css('--ink'), 'stroke-width': 3, 'stroke-linecap': 'round' }, svg);
  });
  table(host, ['Seizoen', 'Afleveringen', 'Negatieve zinnen', 'Spanningsscore', 'Open problemen'], DATA.years.filter(r => r.n >= 3).map(r => [r.year, r.n, pct(r.neg), nl(r.t.toFixed(1)), nl(r.open.toFixed(1))]));
}

function phase() {
  const host = document.getElementById('c-phase');
  const W = 760, H = 280, m = { l: 40, r: 120, t: 16, b: 36 };
  const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Lijngrafiek: open problemen aan het eind van een aflevering per fase van het seizoen, 2016-2022 tegenover 2025' }, host);
  const ph = ['eerder', '2-3 weken', 'laatste week'], lab = ['eerder in het seizoen', '1-2 weken voor 5 dec', 'laatste week'];
  const x = i => m.l + 90 + i * (W - m.l - m.r - 140) / 2;
  const lo = 2.5, hi = 5, y = v => m.t + (hi - v) / (hi - lo) * (H - m.t - m.b);
  axisY(svg, y, [3, 4, 5], m.l, W - m.r, v => v);
  ph.forEach((p, i) => { const t = el('text', { x: x(i), y: H - 12, 'text-anchor': 'middle' }, svg); t.textContent = lab[i]; });
  [['2016-2022', '--s1'], ['2025', '--sint']].forEach(([g, c]) => {
    const pts = ph.map(p => DATA.phases.find(d => d.g === g && d.phase === p));
    el('path', { d: pts.map((d, i) => (i ? 'L' : 'M') + x(i) + ' ' + y(d.open)).join(' '), fill: 'none', stroke: css(c), 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, svg);
    pts.forEach((d, i) => {
      el('circle', { cx: x(i), cy: y(d.open), r: 6, fill: css(c), stroke: css('--card'), 'stroke-width': 2 }, svg);
      const hit = el('circle', { cx: x(i), cy: y(d.open), r: 14, fill: 'transparent' }, svg);
      bindTip(hit, `<b>${g}, ${lab[i]}</b>gemiddeld ${nl(d.open.toFixed(1))} open problemen (${d.n} afleveringen)`);
    });
    const last = pts[2]; const t = el('text', { x: x(2) + 12, y: y(last.open) + 4, class: 'lbl' }, svg); t.textContent = `${g}: ${nl(last.open.toFixed(1))}`;
  });
  table(host, ['Periode', 'Fase', 'Open problemen', 'Afleveringen'], DATA.phases.map(d => [d.g, lab[ph.indexOf(d.phase)], nl(d.open.toFixed(2)), d.n]));
}

function stack() {
  const cats = [['D', 'Dreiging', '--s1'], ['G', 'Grap en spel', '--s2'], ['LW', 'Liedje of gezellig', '--s3'], ['R', 'Overig', '--rest']];
  document.getElementById('stack-legend').innerHTML = cats.map(c => `<span><i style="background:var(${c[2]})"></i>${c[1]}</span>`).join('');
  const host = document.getElementById('c-stack');
  DATA.stack.forEach(r => {
    const v = { D: r.D, G: r.G, LW: r.L + r.W }; v.R = Math.max(0, 1 - v.D - v.G - v.LW);
    const label = `${r.era} (${r.n})`;
    const row = document.createElement('div'); row.className = 'stack-row';
    row.innerHTML = `<span>${label}</span><div class="stack">${cats.map(c => `<div style="flex:${v[c[0]]};background:var(${c[2]})" data-t="${c[1]}: ${pct(v[c[0]])}">${v[c[0]] > 0.09 ? pct(v[c[0]]) : ''}</div>`).join('')}</div>`;
    row.querySelectorAll('[data-t]').forEach(s => bindTip(s, `<b>${label}</b>${s.dataset.t}`));
    host.appendChild(row);
  });
}

function render() {
  ['c-real', 'c-strip', 'c-phase'].forEach(id => document.getElementById(id).querySelectorAll('svg, details').forEach(c => c.remove()));
  ['c-stack', 'stack-legend'].forEach(id => document.getElementById(id).innerHTML = '');
  real(); strip(); phase(); stack();
}

  render();
  return () => tip.remove();
}
