/* ACOPER — кровля под ключ. Все цены — в <script id="calc-data"> в index.html / ro.html */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const D = JSON.parse($('#calc-data').textContent);
  const RO = document.documentElement.lang === 'ro';
  const T = RO ? {
    m2: 'm²', lei: 'lei', m: 'm', pcs: 'buc.', turnkey: 'la cheie', work: 'doar manopera', life: 'Durată', noise: 'Ploaie', weight: 'Greutate', per: '/m²',
    cover: 'Învelitoare', demol: 'Demontare', mat_own: 'materialul învelitorii — al dvs.', min: 'Comandă minimă', copied: 'Copiat',
    wa_hi: 'Bună ziua! Am calculat acoperișul pe site:', wa_shape: 'Formă', wa_house: 'Casa', wa_overhang: 'streașină', wa_slope: 'pantă', wa_area: 'Acoperiș ≈',
    wa_cover: 'Învelitoare', wa_old: 'Acum pe acoperiș', wa_extra: 'Suplimentar', wa_total: 'Total ≈', wa_end: 'Puteți veni la măsurare?', wa_own: '(materialul meu, doar manopera)',
    wa_gen: { hero: 'Bună ziua! Vreau o măsurare gratuită a acoperișului.', abroad: 'Bună ziua! Sunt peste hotare și vreau să schimb acoperișul la casa părinților.', leak: 'Bună ziua! Îmi curge acoperișul, trimit poze.', final: 'Bună ziua! Trimit poze cu casa — vreau să calculez acoperișul.', mbar: 'Bună ziua! Mă interesează un acoperiș nou.' }
  } : {
    m2: 'м²', lei: 'лей', m: 'м', pcs: 'шт', turnkey: 'под ключ', work: 'только работа', life: 'Служит', noise: 'Дождь', weight: 'Вес', per: '/м²',
    cover: 'Покрытие', demol: 'Демонтаж', mat_own: 'материал покрытия — ваш', min: 'Минимальный заказ', copied: 'Скопировано',
    wa_hi: 'Здравствуйте! Посчитал крышу на сайте:', wa_shape: 'Форма', wa_house: 'Дом', wa_overhang: 'свес', wa_slope: 'уклон', wa_area: 'Кровля ≈',
    wa_cover: 'Покрытие', wa_old: 'Сейчас на крыше', wa_extra: 'Дополнительно', wa_total: 'Итого ≈', wa_end: 'Можно приехать на замер?', wa_own: '(материал мой, только работа)',
    wa_gen: { hero: 'Здравствуйте! Хочу бесплатный замер крыши.', abroad: 'Здравствуйте! Я за границей, хочу поменять крышу у родителей.', leak: 'Здравствуйте! Течёт крыша, отправляю фото.', final: 'Здравствуйте! Отправляю фото дома — хочу посчитать крышу.', mbar: 'Здравствуйте! Интересует новая крыша.' }
  };

  const fmt = n => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const r100 = n => Math.round(n / 100) * 100;
  const num = (el, def) => { const v = parseFloat(String(el.value).replace(',', '.')); return isFinite(v) && v > 0 ? v : def; };
  const wa = text => `https://wa.me/${D.phone}?text=${encodeURIComponent(text)}`;

  /* ---------- шапка ---------- */
  const hdr = $('.hdr');
  const onScroll = () => hdr.classList.toggle('is-scrolled', scrollY > 10);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const nav = $('#nav'), burger = $('#burger');
  burger.addEventListener('click', () => { const o = nav.classList.toggle('is-open'); burger.setAttribute('aria-expanded', o); });
  $$('a', nav).forEach(a => a.addEventListener('click', () => { nav.classList.remove('is-open'); burger.setAttribute('aria-expanded', false); }));

  /* ---------- WhatsApp-кнопки с готовым текстом ---------- */
  $$('[data-wa]').forEach(a => { const t = T.wa_gen[a.dataset.wa]; if (t) a.href = wa(t); });

  /* ---------- геометрия крыши ---------- */
  const roof = ({ L, W, O, slope, shape }) => {
    const sh = D.shapes.find(s => s.id === shape);
    const a = (L + 2 * O) * (W + 2 * O) / Math.cos(slope * Math.PI / 180) * sh.k;
    const perim = 2 * (L + W + 4 * O);
    const eaves = shape === 'hip' ? perim : shape === 'mono' ? L + 2 * O : 2 * (L + 2 * O);
    return { area: a, perim, eaves };
  };

  /* ---------- 1. быстрый расчёт в hero ---------- */
  const qL = $('#qL'), qW = $('#qW'), qCov = $('#qCov');
  let qShape = 'gable';
  D.covers.forEach(c => qCov.add(new Option(c.name, c.id)));
  const quick = () => {
    const g = roof({ L: num(qL, 10), W: num(qW, 8), O: .5, slope: 30, shape: qShape });
    const c = D.covers.find(x => x.id === qCov.value);
    $('#qArea').textContent = `≈ ${fmt(g.area)} ${T.m2}`;
    $('#qSum').textContent = `≈ ${fmt(r100(g.area * c.turnkey))} ${T.lei}`;
  };
  $$('[data-qshape]').forEach(b => b.addEventListener('click', () => {
    qShape = b.dataset.qshape;
    $$('[data-qshape]').forEach(x => { x.classList.toggle('is-on', x === b); x.setAttribute('aria-pressed', x === b); });
    quick();
  }));
  [qL, qW, qCov].forEach(el => el.addEventListener('input', quick));
  quick();

  /* ---------- 4. карточки покрытий ---------- */
  const ic = id => `<svg><use href="#${id}"/></svg>`;
  $('#cmp').innerHTML = D.covers.map((c, i) => `
    <article class="cov">
      <div class="cov__img"><img src="${c.img}" alt="${c.name}" loading="lazy" width="640" height="420"><span class="cov__n">0${i + 1}</span></div>
      <div class="cov__b">
        <h3 class="cov__name">${c.name}</h3>
        <p class="cov__price">${fmt(c.turnkey)} <small>${T.lei}${T.per} ${T.turnkey}</small></p>
        <dl>
          <dt>${T.work}</dt><dd>${RO ? 'de la' : 'от'} ${fmt(c.work)} ${T.lei}</dd>
          <dt>${T.life}</dt><dd>${c.life}</dd>
          <dt>${T.noise}</dt><dd>${c.noise}</dd>
          <dt>${T.weight}</dt><dd>${c.weight}</dd>
        </dl>
        <p class="cov__pc"><span class="p">${ic('i-check')}${c.pro}</span><span class="c">${ic('i-x')}${c.con}</span></p>
      </div>
    </article>`).join('');

  /* ---------- 5. калькулятор ---------- */
  const S = {
    shape: 'gable', slope: (D.slopes.find(s => s.def) || D.slopes[1]).deg,
    cover: D.covers[0].id, own: false, old: (D.olds.find(o => o.def) || D.olds[0]).id, opt: {}
  };
  const chipGroup = (box, items, key, val, label) => {
    box.innerHTML = items.map(it => `<button type="button" class="chip${it[val] === S[key] ? ' is-on' : ''}" data-v="${it[val]}" aria-pressed="${it[val] === S[key]}">${label(it)}</button>`).join('');
    box.addEventListener('click', e => {
      const b = e.target.closest('.chip'); if (!b) return;
      S[key] = typeof S[key] === 'number' ? +b.dataset.v : b.dataset.v;
      $$('.chip', box).forEach(x => { x.classList.toggle('is-on', x === b); x.setAttribute('aria-pressed', x === b); });
      calc();
    });
  };
  chipGroup($('#slopes'), D.slopes, 'slope', 'deg', s => s.name);
  chipGroup($('#covs'), D.covers, 'cover', 'id', c => `${c.name}<small>${fmt(c.turnkey)} ${T.lei}${T.per}</small>`);
  chipGroup($('#olds'), D.olds, 'old', 'id', o => o.name);

  $$('.shape').forEach(b => b.addEventListener('click', () => {
    S.shape = b.dataset.shape;
    $$('.shape').forEach(x => { x.classList.toggle('is-on', x === b); x.setAttribute('aria-pressed', x === b); });
    calc();
  }));

  const unitTxt = { m2: T.m2, perimeter: RO ? 'm.l. perimetru' : 'м.п. по периметру', eaves: RO ? 'm.l. streașină' : 'м.п. по карнизу', m2old: T.m2, pcs: T.pcs };
  $('#opts').innerHTML = D.options.map(o => {
    const price = o.type === 'choice' ? '' : `<small>${fmt(o.mat + o.work)} ${T.lei} / ${o.unit === 'pcs' ? T.pcs : unitTxt[o.unit]}</small>`;
    let ctl;
    if (o.type === 'check') { S.opt[o.id] = !!o.def; ctl = `<label class="tgl"><input type="checkbox" data-o="${o.id}"${o.def ? ' checked' : ''}><span></span></label>`; }
    else if (o.type === 'count') { S.opt[o.id] = 0; ctl = `<div class="step-n" data-o="${o.id}"><button type="button" data-d="-1" aria-label="−">${ic('i-minus')}</button><output>0</output><button type="button" data-d="1" aria-label="+">${ic('i-plus')}</button></div>`; }
    else {
      const di = Math.max(0, o.choices.findIndex(c => c.def)); S.opt[o.id] = di;
      ctl = `<div class="seg" data-o="${o.id}">${o.choices.map((c, i) => `<button type="button" data-i="${i}" class="${i === di ? 'is-on' : ''}">${c.name}</button>`).join('')}</div>`;
    }
    return `<div class="opt"><span class="opt__name">${o.name}${price}</span>${ctl}</div>`;
  }).join('');
  $('#opts').addEventListener('change', e => { const i = e.target.closest('[data-o]'); if (i && i.type === 'checkbox') { S.opt[i.dataset.o] = i.checked; calc(); } });
  $('#opts').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const box = b.closest('[data-o]'), id = box.dataset.o;
    if (b.dataset.d) { S.opt[id] = Math.max(0, Math.min(12, S.opt[id] + +b.dataset.d)); $('output', box).textContent = S.opt[id]; }
    else { S.opt[id] = +b.dataset.i; $$('button', box).forEach(x => x.classList.toggle('is-on', x === b)); }
    calc();
  });
  const cL = $('#cL'), cW = $('#cW'), cO = $('#cO'), own = $('#ownMat');
  [cL, cW, cO].forEach(el => el.addEventListener('input', calc));
  own.addEventListener('change', () => { S.own = own.checked; calc(); });

  let lastText = '';
  function calc() {
    const L = num(cL, 10), W = num(cW, 8), O = Math.min(1.2, Math.max(0, parseFloat(String(cO.value).replace(',', '.')) || 0));
    const g = roof({ L, W, O, slope: S.slope, shape: S.shape });
    const cov = D.covers.find(c => c.id === S.cover), old = D.olds.find(o => o.id === S.old);
    const sh = D.shapes.find(s => s.id === S.shape);
    const rows = []; let mat = 0, work = 0;
    const add = (name, qty, unit, m, w) => { const M = qty * m, Wk = qty * w; mat += M; work += Wk; rows.push([`${name} · ${fmt(qty)} ${unit}`, M + Wk]); };

    add(`${T.cover}: ${cov.name}${S.own ? ' (' + T.mat_own + ')' : ''}`, g.area, T.m2, S.own ? 0 : cov.turnkey - cov.work, cov.work);
    if (old.id !== 'none') add(`${T.demol}: ${old.name.toLowerCase()}`, g.area, T.m2, old.mat, old.work);
    const extras = [];
    D.options.forEach(o => {
      const v = S.opt[o.id];
      if (o.type === 'check' && v) {
        if (o.unit === 'm2old' && old.id === 'none') return;
        const q = o.unit === 'perimeter' ? g.perim : o.unit === 'eaves' ? g.eaves : g.area;
        add(o.name, q, o.unit === 'm2' || o.unit === 'm2old' ? T.m2 : T.m, o.mat, o.work); extras.push(o.name.toLowerCase());
      } else if (o.type === 'count' && v > 0) { add(o.name, v, T.pcs, o.mat, o.work); extras.push(`${o.name.toLowerCase()} ${v} ${T.pcs}`); }
      else if (o.type === 'choice' && v > 0) { const c = o.choices[v]; add(`${o.name}: ${c.name}`, g.area, T.m2, c.mat, c.work); extras.push(`${o.name.toLowerCase()} ${c.name}`); }
    });
    let total = mat + work, minNote = '';
    if (total < D.minOrder) { minNote = ` ${T.min}: ${fmt(D.minOrder)} ${T.lei}.`; total = D.minOrder; }

    $('#rArea').textContent = `${fmt(g.area)} ${T.m2}`;
    $('#rMeta').textContent = `${sh.name} · ${S.slope}° · ${cov.name.toLowerCase()}`;
    $('#rLines').innerHTML = rows.map(([n, s]) => `<li><span>${n}</span><span>${fmt(r100(s))}</span></li>`).join('');
    $('#rMat').textContent = `${fmt(r100(mat))} ${T.lei}`;
    $('#rWork').textContent = `${fmt(r100(work))} ${T.lei}`;
    $('#rSum').textContent = `≈ ${fmt(r100(total))} ${T.lei}`;
    $('#rNote').textContent = (RO ? 'Devizul exact — după măsurare, fixat în contract.' : 'Точную смету дадим после замера и зафиксируем в договоре.') + minNote;

    lastText = [T.wa_hi,
      `${T.wa_shape}: ${sh.name}`,
      `${T.wa_house}: ${L} × ${W} ${T.m}, ${T.wa_overhang} ${O} ${T.m}, ${T.wa_slope} ${S.slope}°`,
      `${T.wa_area} ${fmt(g.area)} ${T.m2}`,
      `${T.wa_cover}: ${cov.name}${S.own ? ' ' + T.wa_own : ''}`,
      `${T.wa_old}: ${old.name}`,
      extras.length ? `${T.wa_extra}: ${extras.join(', ')}` : '',
      `${T.wa_total} ${fmt(r100(total))} ${T.lei}`,
      T.wa_end].filter(Boolean).join('\n');
    $('#sendWa').href = wa(lastText);
  }
  calc();
  $('#copyCalc').addEventListener('click', async e => {
    const b = e.currentTarget, s = $('span', b), was = s.textContent;
    try { await navigator.clipboard.writeText(lastText); } catch { const t = document.createElement('textarea'); t.value = lastText; document.body.append(t); t.select(); document.execCommand('copy'); t.remove(); }
    s.textContent = T.copied; setTimeout(() => s.textContent = was, 1600);
  });

  /* ---------- выноски с линиями (hero и пирог) ---------- */
  function callouts(stage, itemSel, fromTop = false) {
    const fig = $('figure', stage), svg = $('svg.hero__lines, svg.pie__lines', stage), items = $$(itemSel, stage);
    const NS = 'http://www.w3.org/2000/svg';
    const dots = items.map((it, i) => {
      const d = document.createElement('span');
      d.className = 'dot'; d.textContent = $('b', it).textContent;
      if (fromTop) { const l = document.createElement('span'); l.className = 'dot__l' + (+it.dataset.x > 78 ? ' dot__l--left' : ''); l.textContent = $('strong', it).textContent; d.append(l); }
      d.style.setProperty('--x', it.dataset.x + '%'); d.style.setProperty('--y', it.dataset.y + '%');
      fig.append(d); return d;
    });
    const paths = items.map(() => { const p = document.createElementNS(NS, 'path'); const c = document.createElementNS(NS, 'circle'); c.setAttribute('r', 3); svg.append(p, c); return [p, c]; });
    const draw = () => {
      if (getComputedStyle(svg).display === 'none') return;
      const sr = stage.getBoundingClientRect();
      items.forEach((it, i) => {
        const ir = it.getBoundingClientRect(), dr = dots[i].getBoundingClientRect();
        const dx = dr.left + dr.width / 2 - sr.left, dy = dr.top + dr.height / 2 - sr.top;
        let d, x0, y0;
        if (fromTop) {
          // линия выходит из верхнего края карточки над номером пункта и идёт к точке
          const br = $('b', it).getBoundingClientRect(), gr = it.closest('.glass, .legend').getBoundingClientRect();
          x0 = br.left + br.width / 2 - sr.left; y0 = gr.top - sr.top;
          d = `M${x0},${y0} V${y0 - 16} L${dx},${dy}`;
        } else {
          const left = ir.left + ir.width / 2 < dr.left;
          x0 = (left ? ir.right : ir.left) - sr.left; y0 = ir.top + ir.height / 2 - sr.top;
          d = `M${x0},${y0} H${x0 + (left ? 18 : -18)} L${dx},${dy}`;
        }
        paths[i][0].setAttribute('d', d);
        paths[i][1].setAttribute('cx', x0); paths[i][1].setAttribute('cy', y0);
      });
    };
    const hl = (i, on) => { items[i].classList.toggle('is-hl', on); dots[i].classList.toggle('is-hl', on); paths[i][0].classList.toggle('is-hl', on); };
    items.forEach((it, i) => {
      [it, dots[i]].forEach(el => { el.addEventListener('mouseenter', () => hl(i, true)); el.addEventListener('mouseleave', () => hl(i, false)); });
      dots[i].addEventListener('click', () => { items.forEach((_, j) => hl(j, j === i)); if (getComputedStyle(svg).display === 'none') it.scrollIntoView({ behavior: 'smooth', block: 'center' }); });
    });
    new ResizeObserver(draw).observe(stage);
    $('img', fig).addEventListener('load', draw);
    addEventListener('load', draw);
    draw();
  }
  callouts($('#hero'), '.callout', true);
  callouts($('#pieStage'), '.layer');

  /* ---------- до / после ---------- */
  $$('.ba').forEach(b => { const r = $('.ba__range', b); r.addEventListener('input', () => b.style.setProperty('--p', r.value + '%')); });

  /* ---------- появление при прокрутке ---------- */
  const rv = $$('.head, .svc__intro, .card, .cov, .cstep, .bill, .work, .feat li, .phone, .step, .leak, .vs__col, .term, .towns, .qa details, .final__in, .quick__card');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    rv.forEach(el => el.classList.add('rv'));
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    rv.forEach(el => io.observe(el));
  }
})();
