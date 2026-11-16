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
function table(host, head, rows) { const d = document.createElement('details'); d.innerHTML = '<summary>Bekijk de cijfers</summary><div class="tbl"><table><thead><tr>' + head.map(h => `<th>${h}</th>`).join('') + '</tr></thead><tbody>' + rows.map(r => '<tr>' + r.map(c => `<td>${c}</td>`).join('') + '</tr>').join('') + '</tbody></table></div>'; host.appendChild(d); }

const QS = {
  heavy: [['engst', 'Enger'], ['spannendst', 'Spannender'], ['negatiefst', 'Negatiever'], ['ongerustst', 'Ongeruster'], ['ongerustste_einde', 'Ongeruster einde']],
  light: [['luchtigst', 'Luchtiger'], ['grappigst', 'Grappiger'], ['gezelligst', 'Gezelliger']],
};
const BASE = [2013, 2014, 2016];
function btPanels() {
  [['heavy', 'c-bt-heavy'], ['light', 'c-bt-light']].forEach(([grp, id]) => {
    const host = document.getElementById(id);
    QS[grp].forEach(([key, title]) => {
      const box = document.createElement('div'); box.innerHTML = `<h5>${title}</h5>`; host.appendChild(box);
      const W = 220, H = 190, m = { l: 34, r: 6, t: 12, b: 24 };
      const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': `${title} dan 2013-2016: kans per jaar` }, box);
      const D = DATA.bt[key];
      const slots = []; D.forEach((d, i) => { if (i && d.y - D[i - 1].y > 1) slots.push(null); slots.push(d.y); });
      const sw = (W - m.l - m.r) / slots.length, x = y => m.l + (slots.indexOf(y) + 0.5) * sw;
      const y = v => m.t + (1 - v) * (H - m.t - m.b);
      const g = el('g', { class: 'grid' }, svg);
      [0, .25, .5, .75, 1].forEach(v => { el('line', { x1: m.l, x2: W - m.r, y1: y(v), y2: y(v) }, g); const t = el('text', { x: m.l - 5, y: y(v) + 4, 'text-anchor': 'end' }, svg); t.textContent = pct(v); });
      el('line', { x1: m.l, x2: W - m.r, y1: y(.5), y2: y(.5), stroke: css('--muted'), 'stroke-width': 1.4 }, svg);
      slots.forEach((s, i) => { if (s === null || ![2013, 2018, 2022, 2026].includes(s)) return; const t = el('text', { x: m.l + (i + .5) * sw, y: H - 8, 'text-anchor': 'middle' }, svg); t.textContent = "'" + String(s).slice(2); });
      D.forEach(d => {
        const c = d.y === 2025 ? css('--sint') : d.y === 2026 ? css('--goud') : css('--s1');
        const base = BASE.includes(d.y);
        el('line', { x1: x(d.y), x2: x(d.y), y1: y(d.lo), y2: y(d.hi), stroke: c, 'stroke-width': 2, 'stroke-linecap': 'round', opacity: .5 }, svg);
        const dot = el('circle', { cx: x(d.y), cy: y(d.p), r: 4.5, fill: base ? css('--card') : c, stroke: base ? c : css('--card'), 'stroke-width': base ? 2 : 1.5 }, svg);
        bindTip(dot, `<b>${d.y}${d.y === 2026 ? ' (loopt nog)' : ''}${base ? ' (startjaar)' : ''}</b>${title} dan een aflevering uit 2013-2016: ${pct(d.p)} (onzekerheid ${pct(d.lo)} tot ${pct(d.hi)})`);
      });
    });
  });
  const leg = document.createElement('div'); leg.className = 'legend';
  leg.innerHTML = `<span><i style="border:2px solid ${css('--s1')}"></i>2013, 2014, 2016: de startjaren</span><span><i style="background:${css('--s1')}"></i>2018-2022</span><span><i style="background:${css('--sint')}"></i>2025</span><span><i style="background:${css('--goud')}"></i>2026, loopt nog</span><span class="ln">Lijn op 50%: net zo als 2013-2016</span>`;
  document.getElementById('c-bt-light').appendChild(leg);
  const all = [...QS.heavy, ...QS.light];
  table(document.getElementById('c-bt'), ['Jaar', ...all.map(q => q[1])], DATA.bt.engst.map((d, i) => [d.y, ...all.map(q => pct(DATA.bt[q[0]][i].p))]));
}

function days() {
  const host = document.getElementById('c-days');
  const D = DATA.ledger.filter(d => d.year !== 2026);
  const W = 760, H = 260, m = { l: 34, r: 10, t: 18, b: 28 };
  const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Staafgrafiek: gemiddeld aantal dagen dat een probleem openstaat, per seizoen' }, host);
  const slots = []; D.forEach((d, i) => { if (i && d.year - D[i - 1].year > 1) slots.push(null); slots.push(d.year); });
  const bw = (W - m.l - m.r) / slots.length, x = yr => m.l + slots.indexOf(yr) * bw;
  const y = v => m.t + (10 - v) / 10 * (H - m.t - m.b);
  const g = el('g', { class: 'grid' }, svg);
  [0, 2, 4, 6, 8, 10].forEach(v => { el('line', { x1: m.l, x2: W - m.r, y1: y(v), y2: y(v) }, g); const t = el('text', { x: m.l - 6, y: y(v) + 4, 'text-anchor': 'end' }, svg); t.textContent = v; });
  slots.forEach((s, i) => { const t = el('text', { x: m.l + (i + .5) * bw, y: H - 10, 'text-anchor': 'middle' }, svg); t.textContent = s === null ? '23-24' : s; if (s === null) t.setAttribute('opacity', .6); });
  D.forEach(d => {
    const partial = d.n_eps < 15, c = d.year === 2025 ? css('--sint') : css('--nu');
    const r = el('rect', { x: x(d.year) + 6, y: y(d.days), width: bw - 12, height: y(0) - y(d.days), rx: 3, fill: c, opacity: partial ? .45 : 1 }, svg);
    const t = el('text', { x: x(d.year) + bw / 2, y: y(d.days) - 6, 'text-anchor': 'middle', class: 'lbl' }, svg); t.textContent = nl(d.days.toFixed(1));
    bindTip(r, `<b>${d.year}</b>${nl(d.days.toFixed(1))} dagen gemiddeld (de twee logboeken: ${nl(d.dmin.toFixed(1))} en ${nl(d.dmax.toFixed(1))})${partial ? `<br>maar ${d.n_eps} afleveringen gevonden` : ''}`);
  });
  table(host, ['Seizoen', 'Dagen open', 'Afleveringen'], D.map(d => [d.year, nl(d.days.toFixed(1)), d.n_eps]));
}

function render() {
  ['c-bt-heavy', 'c-bt-light'].forEach(id => document.getElementById(id).innerHTML = '');
  ['c-bt', 'c-days'].forEach(id => document.getElementById(id).querySelectorAll(':scope > svg, :scope > details').forEach(c => c.remove()));
  btPanels(); days();
}

  render();
  return () => tip.remove();
}
