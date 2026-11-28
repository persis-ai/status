/* «Τι νέο στο persis.ai» — [design-tineo-1005] · ΠΙΣΤΗ ΑΝΤΙΓΡΑΦΗ (Δ-0367 · Δ-0489).
   Σχέδιο: coord docs/coordination/lists/design-ti-neo-1711/«Ti neo persis-ai.dc.html» (1440 = γρ. 47–187 · 390 = γρ. 189–315 ·
   λογική γρ. 339–514). Πίνακας αντιστοιχίας: docs/plans/2026-11-17-ti-neo-page-mapping.md.
   Τα στυλ είναι ΑΥΤΟΥΣΙΑ τα inline του σχεδίου· τα στοιχεία Pill · Chip · Button · Card · Icon γράφουν το ΙΔΙΟ DOM που αποδίδει
   το design system 03e96a89 (κλάσεις ps-* του components.css).
   ΑΣΦΑΛΕΙΑ: το περιεχόμενο (./content.json, χειροκίνητο — ΣΥΝ) μπαίνει ΜΟΝΟ με textContent· σύνδεσμοι/εικόνες μόνο https: ή σχετικές.
   Καμία κλήση έξω από την ίδια προέλευση, κανένα token, κανένα cookie. */
(function () {
  'use strict';

  var STAGES = {   // σχέδιο γρ. 406–410
    design: { label: 'Σε σχεδίαση', tone: 'neutral', rank: 0 },
    build: { label: 'Σε υλοποίηση', tone: 'accent', rank: 1 },
    test: { label: 'Σε δοκιμή', tone: 'info', rank: 2 }
  };
  var ICONS = {    // design system 03e96a89 · _ds_bundle.js (ίδια μονοπάτια)
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    'chevron-up': '<path d="m18 15-6-6-6 6"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'chevron-right': '<path d="m9 18 6-6-6-6"/>',
    'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    'arrow-up-right': '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>'
  };
  var ΒΟΗΘΕΙΑ = 'https://persis.ai/help.html';          // ❓Τ3 (στο σχέδιο «#»)
  var ΚΑΤΑΣΤΑΣΗ = 'https://status.persis.ai';           // σχέδιο γρ. 181 · 310
  var ΥΠΟΣΤΗΡΙΞΗ = 'support@persis.ai';                  // σχέδιο γρ. 183 · 312

  /* ΘΕΜΑ-ΑΠΟ-ΕΦΑΡΜΟΓΗ (🧭 ΣΥΝ 21/11 11:26 ②): οι σύνδεσμοι του persis.ai φέρνουν ?theme=light|dark από την επιλογή του χρήστη ⇒
     εφαρμόζεται και ΚΡΑΤΙΕΤΑΙ (localStorage του status.persis.ai, κοινό για Κατάσταση και Τι νέο) για επόμενη φορά. Προτεραιότητα:
     παράμετρος ⇒ αποθηκευμένη ⇒ ό,τι έκανε η σελίδα πριν. Μόνο οι δύο τιμές γίνονται δεκτές· οτιδήποτε άλλο αγνοείται. */
  var ΚΛΕΙΔΙ_ΘΕΜΑΤΟΣ = 'persis_status_theme';
  function θέμαΑπόΕφαρμογή() {
    var t = null;
    try { t = new URLSearchParams(location.search).get('theme'); } catch (_e) { t = null; }
    if (t === 'light' || t === 'dark') { try { localStorage.setItem(ΚΛΕΙΔΙ_ΘΕΜΑΤΟΣ, t); } catch (_e) { /* χωρίς αποθήκευση */ } return t; }
    try { t = localStorage.getItem(ΚΛΕΙΔΙ_ΘΕΜΑΤΟΣ); } catch (_e) { t = null; }
    return (t === 'light' || t === 'dark') ? t : null;
  }
  var state = { data: null, filter: 'all', theme: θέμαΑπόΕφαρμογή() || 'light', open: {}, error: false };
  var root = document.getElementById('tn-root');

  /* ── βοηθοί ── */
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === 'text') n.textContent = String(v);
      else if (k === 'on') Object.keys(v).forEach(function (ev) { n.addEventListener(ev, v[ev]); });
      else n.setAttribute(k, v === true ? '' : String(v));
    });
    (kids || []).forEach(function (c) { if (c == null || c === false) return; n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }
  function icon(name, size) {
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('class', 'ps-icon'); s.setAttribute('width', size); s.setAttribute('height', size);
    s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('fill', 'none'); s.setAttribute('stroke', 'currentColor');
    s.setAttribute('stroke-width', '1.8'); s.setAttribute('stroke-linecap', 'round'); s.setAttribute('stroke-linejoin', 'round');
    s.setAttribute('aria-hidden', 'true'); s.setAttribute('style', 'flex: 0 0 auto; vertical-align: -0.18em;');
    s.innerHTML = ICONS[name];   // σταθερά του αρχείου, ποτέ περιεχόμενο
    return s;
  }
  function brand(mark, tag, extra) {
    return el(tag, Object.assign({ class: 'ps-brand', style: '--ps-mark:' + mark + 'px' + (extra || '') }, tag === 'a' ? { href: 'https://persis.ai' } : {}), [
      el('span', { class: 'ps-brand-mark', text: 'P' }),
      el('span', null, [el('span', { class: 'ps-brand-word', text: 'persis' }), el('span', { class: 'ps-brand-ai', text: '.ai' })])
    ]);
  }
  function chip(tone, text) {
    return el('span', { class: 'ps-chip' + (tone && tone !== 'neutral' ? ' ps-chip--' + tone : '') }, [el('span', { class: 'ps-chip-dot' }), text]);
  }
  function monoPill(text) { return el('span', { class: 'ps-pill ps-pill--mono', text: text }); }
  /* Δ-Β ⛔ 09:19Z: ο έλεγχος ΚΕΙΜΕΝΟΥ άφηνε « javascript:» · «java\tscript:» · «\u0001javascript:» · «/\\example.org» — ο
     φυλλομετρητής αφαιρεί κενά/tab/newline/C0 και κανονικοποιεί «\» ⇒ εκτελούνταν/έφευγαν έξω. ΤΩΡΑ κρίνεται ό,τι ΘΑ ανοίξει ο
     φυλλομετρητής: new URL(u, location.href) ⇒ μόνο https: ή ίδια προέλευση, αλλιώς τίποτα. */
  function ασφαλέςURL(u) {
    if (typeof u !== 'string' || !u.trim()) return null;
    var x;
    try { x = new URL(u, location.href); } catch (e) { return null; }
    return (x.protocol === 'https:' || x.origin === location.origin) ? x.href : null;
  }

  /* ── θέμα (σχέδιο γρ. 437–445) ── */
  var χρονόμετρο;
  function applyTheme() {
    var b = document.body, t = state.theme;
    if (b.getAttribute('data-theme') === t) return;
    b.classList.add('theme-switching');
    b.setAttribute('data-theme', t);
    clearTimeout(χρονόμετρο);
    χρονόμετρο = setTimeout(function () { b.classList.remove('theme-switching'); }, 60);
  }
  function set(patch) { Object.keys(patch).forEach(function (k) { state[k] = patch[k]; }); render(); }

  /* ── μοντέλο (σχέδιο γρ. 456–513) ── */
  function vals() {
    var d = state.data, filter = state.filter;
    var AREAS = Array.isArray(d.areas) ? d.areas : [];
    var SHIPPED = Array.isArray(d.shipped) ? d.shipped : [];
    var UPCOMING = (Array.isArray(d.upcoming) ? d.upcoming : []).filter(function (u) { return STAGES[u && u.stage]; });
    var FIXES = Array.isArray(d.fixes) ? d.fixes : [];
    var label = function (id) { return (AREAS.filter(function (a) { return a.id === id; })[0] || {}).label || ''; };
    var inArea = function (x) { return filter === 'all' || x.area === filter; };
    var entries = SHIPPED.concat(UPCOMING);
    var areas = [{ id: 'all', label: 'Όλα' }].concat(AREAS).map(function (a) {
      return { id: a.id, label: a.label, selected: filter === a.id,
        count: entries.filter(function (x) { return a.id === 'all' || x.area === a.id; }).length };
    });
    var shipped = SHIPPED.filter(inArea).map(function (e) {
      return { date: e.date, area: label(e.area), money: !!e.money, title: e.title, body: e.body,
        link: ασφαλέςURL(e.link), shotWeb: ασφαλέςURL(e.shot && e.shot.web), shotMobile: ασφαλέςURL(e.shot && e.shot.mobile) };
    });
    var upcoming = UPCOMING.filter(inArea).map(function (u, i) {
      return { i: i, title: u.title, body: u.body, area: label(u.area), stage: STAGES[u.stage].label, tone: STAGES[u.stage].tone, rank: STAGES[u.stage].rank };
    }).sort(function (a, b) { return b.rank - a.rank || a.i - b.i; });
    var fixRows = [];
    FIXES.forEach(function (w) {
      (Array.isArray(w.groups) ? w.groups : []).filter(inArea).forEach(function (g, i) {
        var items = Array.isArray(g.items) ? g.items : [];
        fixRows.push({ id: g.id, n: items.length, text: g.text, items: items, week: i === 0 ? w.week : '', showWeek: i === 0, open: !!state.open[g.id] });
      });
    });
    var isEmpty = filter !== 'all' && !shipped.length && !upcoming.length && !fixRows.length;
    return { areas: areas, shipped: shipped, upcoming: upcoming, fixRows: fixRows, isEmpty: isEmpty, hasContent: !isEmpty, filterLabel: label(filter) };
  }

  var pick = function (id) { return function () { set({ filter: id }); }; };
  var toggleFix = function (id) { return function () { var o = Object.assign({}, state.open); o[id] = !o[id]; set({ open: o }); }; };
  var toggleTheme = function () { set({ theme: state.theme === 'dark' ? 'light' : 'dark' }); };

  function themeBtn(lg) {
    return el('button', { type: 'button', class: 'ps-btn ps-btn--ghost' + (lg ? ' ps-btn--lg' : ''), 'aria-label': 'Εναλλαγή θέματος', on: { click: toggleTheme } },
      [icon(state.theme === 'dark' ? 'sun' : 'moon', lg ? 18 : 17)]);
  }
  function areaPill(a, mobile) {
    return el('button', { type: 'button', class: 'ps-pill' + (a.selected ? ' ps-pill--selected' : ''), 'aria-pressed': a.selected ? 'true' : 'false',
      style: mobile ? 'height: 36px; padding: 0px 14px; font-size: var(--text-base);' : null, on: { click: pick(a.id) } },
      [a.label, el('span', { class: 'ps-pill-count', text: a.count })]);
  }
  function seeBtn(link, lg) {
    return el('a', { class: 'ps-btn' + (lg ? ' ps-btn--lg' : ''), href: link }, ['Δείτε το', icon('arrow-right', lg ? 16 : 14)]);
  }
  function shot(src, w) {
    return el('div', { style: 'width:' + w + ';margin-top:' + (w === '100%' ? '4px' : '6px') + ';border:1px solid var(--line);border-radius:var(--r-md);overflow:hidden;background:var(--panel-2);color:var(--ink-3)' },
      [el('img', { src: src, alt: 'Στιγμιότυπο οθόνης', loading: 'lazy', style: 'display:block;width:100%;height:auto;aspect-ratio:16 / 10;object-fit:cover' })]);
  }
  function none(text, mobile) {
    return el('p', { style: mobile ? 'padding:18px 0;border-bottom:1px solid var(--line-2);color:var(--ink-3)' : 'padding:20px 0 20px 172px;border-bottom:1px solid var(--line-2);color:var(--ink-3)', text: text });
  }
  function stageLegend() {
    return [chip('neutral', 'Σε σχεδίαση'), icon('chevron-right', 12), chip('accent', 'Σε υλοποίηση'), icon('chevron-right', 12), chip('info', 'Σε δοκιμή')];
  }
  function updated() { return typeof state.data.updated === 'string' ? state.data.updated : ''; }

  /* ── 1440 (σχέδιο γρ. 47–187) ── */
  function web(v) {
    var main = el('main', { style: 'width:var(--content-w);margin:0 auto;padding:64px 0 80px' }, [
      el('div', { style: 'display:flex;align-items:flex-end;justify-content:space-between;gap:40px' }, [
        el('div', { style: 'min-width:0' }, [
          el('h1', { style: 'font:var(--fw-medium) var(--text-display)/var(--lh-tight) var(--font-display);text-wrap:balance' }, ['Τι ', el('em', { style: 'color:var(--accent)', text: 'νέο' }), ' στο persis.ai']),
          el('p', { style: 'margin-top:14px;max-width:560px;font-size:var(--text-md);color:var(--ink-2);text-wrap:pretty', text: 'Τι μπήκε πρόσφατα και τι ετοιμάζεται. Κάθε εγγραφή λέει σύντομα τι αλλάζει για εσάς.' })
        ]),
        el('div', { style: 'flex:none;display:flex;flex-direction:column;align-items:flex-end;gap:6px;padding-bottom:3px' }, [
          el('span', { class: 'ds-sectlabel', text: 'Τελευταία ενημέρωση' }),
          el('span', { class: 'ds-mono', style: 'font-size:var(--text-sm);color:var(--ink-2)', text: updated() })
        ])
      ]),
      el('div', { role: 'group', 'aria-label': 'Φίλτρο ανά περιοχή', style: 'display:flex;flex-wrap:wrap;gap:8px;margin-top:32px' }, v.areas.map(function (a) { return areaPill(a, false); }))
    ]);
    if (v.isEmpty) main.appendChild(el('div', { 'data-tn': 'empty', style: 'display:flex;flex-direction:column;align-items:center;gap:10px;margin-top:48px;padding:88px 24px;border-top:1px solid var(--line);border-bottom:1px solid var(--line);text-align:center;color:var(--ink-3)' }, [
      el('h2', { style: 'font:var(--fw-medium) var(--text-2xl)/1.2 var(--font-display);color:var(--ink)', text: 'Δεν υπάρχουν νέα για αυτή την περιοχή' }),
      el('p', { style: 'max-width:460px;text-wrap:pretty', text: 'Όταν μπει κάτι νέο στην περιοχή «' + v.filterLabel + '», θα εμφανιστεί εδώ.' }),
      el('div', { style: 'margin-top:10px' }, [el('button', { type: 'button', class: 'ps-btn', on: { click: pick('all') }, text: 'Όλα τα νέα' })])
    ]));
    if (v.hasContent) {
      var sh = el('section', { 'data-tn': 'shipped', style: 'margin-top:48px' }, [
        el('div', { style: 'display:flex;align-items:baseline;justify-content:space-between;gap:24px;padding-bottom:14px;border-bottom:1px solid var(--line)' }, [
          el('h2', { style: 'font:var(--fw-medium) var(--text-3xl)/1.2 var(--font-display)', text: 'Μόλις μπήκε' }),
          el('div', { style: 'display:flex;align-items:center;gap:10px;font-size:var(--text-sm);color:var(--ink-3)' }, [chip('amber', 'Αλλάζουν ποσά'), el('span', { text: 'Η αλλαγή επηρεάζει υπολογισμούς, π.χ. παράβολο ή πρόστιμο.' })])
        ])
      ].concat(v.shipped.map(function (e) {
        return el('article', { style: 'display:grid;grid-template-columns:148px minmax(0,1fr);column-gap:24px;padding:28px 0;border-bottom:1px solid var(--line-2)' }, [
          el('div', { class: 'ds-mono', style: 'font-size:var(--text-sm);line-height:20px;color:var(--ink-3)', text: e.date }),
          el('div', { style: 'display:flex;flex-direction:column;align-items:flex-start;gap:10px;min-width:0' }, [
            el('div', { style: 'display:flex;align-items:center;gap:8px;flex-wrap:wrap' }, [monoPill(e.area), e.money && chip('amber', 'Αλλάζουν ποσά')]),
            el('h3', { style: 'font:var(--fw-medium) var(--text-2xl)/1.25 var(--font-serif);text-wrap:balance', text: e.title }),
            el('p', { style: 'max-width:640px;font-size:var(--text-md);color:var(--ink-2);text-wrap:pretty', text: e.body }),
            e.shotWeb && shot(e.shotWeb, '520px'),
            e.link && el('div', { style: 'margin-top:4px' }, [seeBtn(e.link, false)])
          ])
        ]);
      })).concat([!v.shipped.length && none('Καμία πρόσφατη αλλαγή σε αυτή την περιοχή.', false)]));
      var up = el('section', { 'data-tn': 'upcoming', style: 'margin-top:64px' }, [
        el('div', { style: 'display:flex;align-items:baseline;justify-content:space-between;gap:24px;padding-bottom:14px;border-bottom:1px solid var(--line)' }, [
          el('h2', { style: 'font:var(--fw-medium) var(--text-3xl)/1.2 var(--font-display)', text: 'Ετοιμάζεται' }),
          el('div', { style: 'display:flex;align-items:center;gap:8px;font-size:var(--text-sm);color:var(--ink-3)' }, [el('span', { style: 'margin-right:4px', text: 'Χωρίς ημερομηνίες, μόνο το στάδιο:' })].concat(stageLegend()))
        ])
      ].concat(v.upcoming.map(function (u) {
        return el('article', { style: 'display:grid;grid-template-columns:148px minmax(0,1fr);column-gap:24px;padding:22px 0;border-bottom:1px solid var(--line-2)' }, [
          el('div', { style: 'margin-top:-1px' }, [chip(u.tone, u.stage)]),
          el('div', { style: 'display:flex;flex-direction:column;align-items:flex-start;gap:8px;min-width:0' }, [
            monoPill(u.area),
            el('h3', { style: 'font:var(--fw-medium) var(--text-xl)/1.3 var(--font-serif);text-wrap:balance', text: u.title }),
            el('p', { style: 'max-width:640px;color:var(--ink-2);text-wrap:pretty', text: u.body })
          ])
        ]);
      })).concat([!v.upcoming.length && none('Τίποτα υπό προετοιμασία σε αυτή την περιοχή.', false)]));
      var fx = el('section', { 'data-tn': 'fixes', style: 'margin-top:64px' }, [
        el('div', { style: 'display:flex;align-items:baseline;justify-content:space-between;gap:24px;padding-bottom:14px;border-bottom:1px solid var(--line)' }, [
          el('h2', { style: 'font:var(--fw-medium) var(--text-3xl)/1.2 var(--font-display)', text: 'Διορθώσεις' }),
          el('span', { style: 'font-size:var(--text-sm);color:var(--ink-3)', text: 'Μικρές διορθώσεις, ανά εβδομάδα και περιοχή.' })
        ])
      ].concat(v.fixRows.map(function (g) {
        return el('div', { style: 'display:grid;grid-template-columns:148px minmax(0,1fr);column-gap:24px;border-bottom:1px solid var(--line-2)' }, [
          el('div', { class: 'ds-mono', style: 'display:flex;align-items:center;height:52px;font-size:var(--text-sm);color:var(--ink-3)', text: g.week }),
          el('div', { style: 'min-width:0' }, [
            el('button', { type: 'button', class: 'tn-fixbtn', 'aria-expanded': g.open ? 'true' : 'false', on: { click: toggleFix(g.id) },
              style: 'display:flex;align-items:center;gap:12px;width:calc(100% + 24px);min-height:52px;margin:0 -12px;padding:0 12px;border:0;border-radius:var(--r-sm);background:none;color:var(--ink);text-align:left;cursor:pointer;transition:background var(--dur) var(--ease)' }, [
              el('span', { class: 'ds-mono', style: 'flex:none;min-width:20px;text-align:right;font-size:var(--text-sm)', text: g.n }),
              el('span', { style: 'flex:1;min-width:0;font-weight:var(--fw-medium)', text: g.text }),
              el('span', { style: 'display:flex;color:var(--ink-3)' }, [icon(g.open ? 'chevron-up' : 'chevron-down', 16)])
            ]),
            g.open && el('ul', { style: 'display:flex;flex-direction:column;gap:6px;padding:2px 0 18px 50px;color:var(--ink-2)' }, g.items.map(function (it) { return el('li', { text: it }); }))
          ])
        ]);
      })).concat([!v.fixRows.length && none('Καμία διόρθωση σε αυτή την περιοχή τις τελευταίες εβδομάδες.', false)]));
      main.appendChild(sh); main.appendChild(up); main.appendChild(fx);
    }
    // ❓Τ2: η κάρτα «Λάβετε τα νέα με email» (σχέδιο γρ. 165–175) ΔΕΝ μπαίνει — εγγραφή email = φάση 2 (ΣΥΝ [design-tineo-1005]).
    return el('div', { class: 'tn-web' }, [
      el('header', { style: 'position:sticky;top:0;z-index:5;display:flex;align-items:center;justify-content:space-between;height:var(--topbar-h);padding:0 32px;background:color-mix(in oklch,var(--bg) 86%,transparent);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-bottom:1px solid var(--line-2)' }, [brand(26, 'a'), themeBtn(false)]),
      main,
      el('footer', { style: 'border-top:1px solid var(--line-2)' }, [
        el('div', { style: 'display:flex;align-items:center;justify-content:space-between;gap:24px;width:var(--content-w);margin:0 auto;padding:22px 0 26px;font-size:var(--text-sm)' }, [
          brand(20, 'span'),
          el('nav', { 'aria-label': 'Υποσέλιδο', style: 'display:flex;align-items:center;gap:28px' }, [
            el('a', { href: ΚΑΤΑΣΤΑΣΗ, text: 'Σελίδα κατάστασης' }),
            el('a', { href: ΒΟΗΘΕΙΑ, text: 'Βοήθεια' }),
            el('a', { href: 'mailto:' + ΥΠΟΣΤΗΡΙΞΗ, text: ΥΠΟΣΤΗΡΙΞΗ })
          ])
        ])
      ])
    ]);
  }

  /* ── 390 (σχέδιο γρ. 189–315) ── */
  function mobile(v) {
    var filterRow = el('div', { class: 'tn-mfilter', role: 'group', 'aria-label': 'Φίλτρο ανά περιοχή', style: 'position:relative;display:flex;gap:8px;margin:20px -16px 0;padding:0 16px;overflow-x:auto;scrollbar-width:none' },
      v.areas.map(function (a) { return el('div', { style: 'flex:none;padding:4px 0;cursor:pointer' }, [areaPill(a, true)]); }));
    var main = el('main', { style: 'padding:28px 16px 40px' }, [
      el('div', { style: 'display:flex;align-items:center;gap:8px;flex-wrap:wrap' }, [
        el('span', { class: 'ds-sectlabel', text: 'Τελευταία ενημέρωση' }),
        el('span', { class: 'ds-mono', style: 'font-size:var(--text-sm);line-height:1.2;color:var(--ink-2)', text: updated() })
      ]),
      el('h1', { style: 'margin-top:10px;font:var(--fw-medium) var(--text-4xl)/var(--lh-tight) var(--font-display);text-wrap:balance' }, ['Τι ', el('em', { style: 'color:var(--accent)', text: 'νέο' }), ' στο persis.ai']),
      el('p', { style: 'margin-top:12px;font-size:var(--text-md);color:var(--ink-2);text-wrap:pretty', text: 'Τι μπήκε πρόσφατα και τι ετοιμάζεται. Κάθε εγγραφή λέει σύντομα τι αλλάζει για εσάς.' }),
      filterRow
    ]);
    if (v.isEmpty) main.appendChild(el('div', { 'data-tn': 'empty', style: 'display:flex;flex-direction:column;align-items:center;gap:10px;margin-top:32px;padding:56px 8px;border-top:1px solid var(--line);border-bottom:1px solid var(--line);text-align:center;color:var(--ink-3)' }, [
      el('h2', { style: 'font:var(--fw-medium) var(--text-2xl)/1.2 var(--font-display);color:var(--ink);text-wrap:balance', text: 'Δεν υπάρχουν νέα για αυτή την περιοχή' }),
      el('p', { style: 'text-wrap:pretty', text: 'Όταν μπει κάτι νέο στην περιοχή «' + v.filterLabel + '», θα εμφανιστεί εδώ.' }),
      el('div', { style: 'margin-top:12px' }, [el('button', { type: 'button', class: 'ps-btn ps-btn--lg', on: { click: pick('all') }, text: 'Όλα τα νέα' })])
    ]));
    if (v.hasContent) {
      main.appendChild(el('section', { 'data-tn': 'shipped', style: 'margin-top:36px' }, [
        el('h2', { style: 'font:var(--fw-medium) var(--text-2xl)/1.2 var(--font-display)', text: 'Μόλις μπήκε' }),
        el('div', { style: 'display:flex;flex-direction:column;align-items:flex-start;gap:6px;margin-top:10px;padding-bottom:14px;border-bottom:1px solid var(--line);font-size:var(--text-sm);color:var(--ink-3)' }, [chip('amber', 'Αλλάζουν ποσά'), el('span', { text: 'Η αλλαγή επηρεάζει υπολογισμούς, π.χ. παράβολο ή πρόστιμο.' })])
      ].concat(v.shipped.map(function (e) {
        return el('article', { style: 'display:flex;flex-direction:column;align-items:flex-start;gap:10px;padding:24px 0;border-bottom:1px solid var(--line-2)' }, [
          el('div', { style: 'display:flex;align-items:center;gap:8px;flex-wrap:wrap' }, [
            el('span', { class: 'ds-mono', style: 'font-size:var(--text-sm);line-height:20px;color:var(--ink-3)', text: e.date }), monoPill(e.area), e.money && chip('amber', 'Αλλάζουν ποσά')]),
          el('h3', { style: 'font:var(--fw-medium) var(--text-xl)/1.3 var(--font-serif);text-wrap:balance', text: e.title }),
          el('p', { style: 'font-size:var(--text-md);color:var(--ink-2);text-wrap:pretty', text: e.body }),
          e.shotMobile && shot(e.shotMobile, '100%'),
          e.link && el('div', { style: 'margin-top:4px' }, [seeBtn(e.link, true)])
        ]);
      })).concat([!v.shipped.length && none('Καμία πρόσφατη αλλαγή σε αυτή την περιοχή.', true)])));
      main.appendChild(el('section', { 'data-tn': 'upcoming', style: 'margin-top:44px' }, [
        el('h2', { style: 'font:var(--fw-medium) var(--text-2xl)/1.2 var(--font-display)', text: 'Ετοιμάζεται' }),
        el('div', { style: 'display:flex;flex-direction:column;gap:8px;margin-top:10px;padding-bottom:14px;border-bottom:1px solid var(--line);font-size:var(--text-sm);color:var(--ink-3)' }, [
          el('span', { text: 'Χωρίς ημερομηνίες, μόνο το στάδιο:' }),
          el('div', { style: 'display:flex;align-items:center;gap:4px;flex-wrap:wrap' }, stageLegend())
        ])
      ].concat(v.upcoming.map(function (u) {
        return el('article', { style: 'display:flex;flex-direction:column;align-items:flex-start;gap:8px;padding:20px 0;border-bottom:1px solid var(--line-2)' }, [
          el('div', { style: 'display:flex;align-items:center;gap:8px;flex-wrap:wrap' }, [chip(u.tone, u.stage), monoPill(u.area)]),
          el('h3', { style: 'font:var(--fw-medium) var(--text-lg)/1.3 var(--font-serif);text-wrap:balance', text: u.title }),
          el('p', { style: 'color:var(--ink-2);text-wrap:pretty', text: u.body })
        ]);
      })).concat([!v.upcoming.length && none('Τίποτα υπό προετοιμασία σε αυτή την περιοχή.', true)])));
      var fx = el('section', { 'data-tn': 'fixes', style: 'margin-top:44px' }, [
        el('h2', { style: 'font:var(--fw-medium) var(--text-2xl)/1.2 var(--font-display)', text: 'Διορθώσεις' }),
        el('p', { style: 'margin-top:10px;padding-bottom:14px;border-bottom:1px solid var(--line);font-size:var(--text-sm);color:var(--ink-3)', text: 'Μικρές διορθώσεις, ανά εβδομάδα και περιοχή.' })
      ]);
      v.fixRows.forEach(function (g) {
        if (g.showWeek) fx.appendChild(el('div', { class: 'ds-sectlabel', style: 'padding:20px 0 4px', text: 'Εβδομάδα ' + g.week }));
        fx.appendChild(el('div', { style: 'border-bottom:1px solid var(--line-2)' }, [
          el('button', { type: 'button', class: 'tn-fixbtn', 'aria-expanded': g.open ? 'true' : 'false', on: { click: toggleFix(g.id) },
            style: 'display:flex;align-items:center;gap:12px;width:calc(100% + 32px);min-height:56px;margin:0 -16px;padding:8px 16px;border:0;background:none;color:var(--ink);line-height:1.35;text-align:left;cursor:pointer;transition:background var(--dur) var(--ease)' }, [
            el('span', { class: 'ds-mono', style: 'flex:none;min-width:20px;text-align:right;font-size:var(--text-sm)', text: g.n }),
            el('span', { style: 'flex:1;min-width:0;font-weight:var(--fw-medium)', text: g.text }),
            el('span', { style: 'display:flex;color:var(--ink-3)' }, [icon(g.open ? 'chevron-up' : 'chevron-down', 18)])
          ]),
          g.open && el('ul', { style: 'display:flex;flex-direction:column;gap:8px;padding:0 0 18px 50px;color:var(--ink-2)' }, g.items.map(function (it) { return el('li', { text: it }); }))
        ]));
      });
      if (!v.fixRows.length) fx.appendChild(none('Καμία διόρθωση σε αυτή την περιοχή τις τελευταίες εβδομάδες.', true));
      main.appendChild(fx);
    }
    // ❓Τ2: χωρίς την κάρτα εγγραφής email (σχέδιο γρ. 297–307) — φάση 2.
    var row = function (href, text, name) {
      return el('a', { href: href, style: 'display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:48px;border-bottom:1px solid var(--line-2);color:var(--ink);text-decoration:none' },
        [text, el('span', { style: 'display:flex;color:var(--ink-3)' }, [icon(name, 16)])]);
    };
    var out = el('div', { class: 'tn-m' }, [
      el('header', { style: 'position:sticky;top:0;z-index:5;display:flex;align-items:center;justify-content:space-between;height:52px;padding:0 4px 0 16px;background:color-mix(in oklch,var(--bg) 86%,transparent);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-bottom:1px solid var(--line-2)' }, [brand(24, 'a'), themeBtn(true)]),
      main,
      el('footer', { style: 'display:flex;flex-direction:column;padding:4px 16px 28px;border-top:1px solid var(--line-2)' }, [
        row(ΚΑΤΑΣΤΑΣΗ, 'Σελίδα κατάστασης', 'arrow-up-right'),
        row(ΒΟΗΘΕΙΑ, 'Βοήθεια', 'chevron-right'),
        row('mailto:' + ΥΠΟΣΤΗΡΙΞΗ, ΥΠΟΣΤΗΡΙΞΗ, 'mail'),
        brand(20, 'span', ';margin-top:22px')
      ])
    ]);
    out._filterRow = filterRow;
    return out;
  }

  /* σχέδιο γρ. 446–454: στο 390 το επιλεγμένο φίλτρο μένει ορατό (κεντράρεται στην οριζόντια σειρά) */
  var ορατό = null;
  function revealPill(row) {
    if (!row || ορατό === state.filter) return;
    var pill = row.querySelector('[aria-pressed="true"]');
    if (!pill || !row.clientWidth) return;
    ορατό = state.filter;
    var holder = pill.parentNode;
    row.scrollLeft = Math.max(0, holder.offsetLeft - (row.clientWidth - holder.offsetWidth) / 2);
  }

  function render() {
    applyTheme();
    if (state.error) {
      root.replaceChildren(el('p', { class: 'tn-fallback', text: 'Τα νέα δεν φορτώθηκαν. Δοκιμάστε ξανά σε λίγο ή γράψτε στο ' + ΥΠΟΣΤΗΡΙΞΗ + '.' }));
      return;
    }
    if (!state.data) return;
    var v = vals();
    var w = web(v), m = mobile(v);
    var sx = root.querySelector('.tn-mfilter'), keep = sx ? sx.scrollLeft : 0;
    root.replaceChildren(w, m);
    m._filterRow.scrollLeft = keep;
    revealPill(m._filterRow);
  }

  window.__tiNeo = { state: state, vals: vals, render: render };   // για τον φρουρό (Chromium) — καμία άλλη χρήση
  fetch('./content.json', { cache: 'no-cache', credentials: 'omit' })
    .then(function (r) { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
    .then(function (d) { if (!d || d.version !== 1) throw new Error('version'); state.data = d; render(); })
    .catch(function () { state.error = true; render(); });
  applyTheme();
})();
