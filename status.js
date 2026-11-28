/* status.persis.ai — [status-site-2158] · ΠΙΣΤΗ ΑΝΤΙΓΡΑΦΗ (Δ-0367 · Δ-0489).
   Σχέδιο: coord docs/coordination/lists/design-status-1711/status-page-v3.dc.html (1440 = γρ. 64–293 · 390 = γρ. 296–510 ·
   Παραδοχές 01–19 = γρ. 514–544 · λογική = script γρ. 546–). Πίνακας αντιστοιχίας: docs/plans/2026-11-17-status-page-mapping.md.
   Τα στυλ είναι ΑΥΤΟΥΣΙΑ τα inline του σχεδίου· Card · Chip · Button γράφουν το ΙΔΙΟ DOM με το design system 03e96a89 (ps-*).
   ΔΕΔΟΜΕΝΑ: ./data/current.json · history.json · events.json (οι έλεγχοι ανά 15′ — ΔΣ-20261117-83c014 · dd9a78) και ./content.json
   (ΧΕΙΡΟΚΙΝΗΤΟ, ΣΥΝ: τρέχον συμβάν · γνωστά θέματα · προγραμματισμένες εργασίες — η σελίδα ΔΕΝ τα επινοεί ποτέ από τους ελέγχους).
   ΑΣΦΑΛΕΙΑ: κάθε κείμενο από δεδομένα μπαίνει ΜΟΝΟ με textContent· καμία κλήση έξω από την ίδια προέλευση, κανένα cookie. */
(function () {
  'use strict';

  var ICONS = {   // design system 03e96a89 · _ds_bundle.js
    bell: '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>'
  };
  /* Οι υπηρεσίες, με τη σειρά και τα ονόματα του σχεδίου (γρ. sv του script)· τα id είναι του lib/status_checks.js. Το «άρθρο»
     γράφει τις προτάσεις του σχεδίου («Ο Βοηθός απαντά αργά…», «Το ΤΕΕ Αυθαίρετα δεν απαντά…»). */
  var ΥΠΗΡΕΣΙΕΣ = [
    { id: 'app', name: 'Εφαρμογή', ext: false, the: 'Η Εφαρμογή', of: 'της Εφαρμογής', in: 'στην Εφαρμογή', pl: false },
    { id: 'assistant', name: 'Βοηθός', ext: false, the: 'Ο Βοηθός', of: 'του Βοηθού', in: 'στον Βοηθό', pl: false },
    { id: 'pdf', name: 'Έγγραφα/PDF', ext: false, the: 'Τα Έγγραφα/PDF', of: 'των Εγγράφων/PDF', in: 'στα Έγγραφα/PDF', pl: true },
    { id: 'addon', name: 'Πρόσθετο ΤΕΕ (σύνδεση)', ext: false, the: 'Το Πρόσθετο ΤΕΕ (σύνδεση)', of: 'του Πρόσθετου ΤΕΕ (σύνδεση)', in: 'στο Πρόσθετο ΤΕΕ (σύνδεση)', pl: false },
    { id: 'tee-authaireta', name: 'ΤΕΕ Αυθαίρετα', ext: true, the: 'Το ΤΕΕ Αυθαίρετα', pl: false },
    { id: 'tee-htk', name: 'ΤΕΕ Ηλεκτρονική Ταυτότητα Κτιρίου', ext: true, the: 'Η ΤΕΕ Ηλεκτρονική Ταυτότητα Κτιρίου', pl: false },
    { id: 'tee-eadeies', name: 'ΤΕΕ e-Άδειες', ext: true, the: 'Οι ΤΕΕ e-Άδειες', pl: true },
    { id: 'ktimatologio', name: 'Κτηματολόγιο', ext: true, the: 'Το Κτηματολόγιο', pl: false },
    { id: 'et-gr', name: 'Εθνικό Τυπογραφείο (ΦΕΚ)', ext: true, the: 'Το Εθνικό Τυπογραφείο (ΦΕΚ)', pl: false }
  ];
  var ΑΡΙΘΜΟΙ = ['καμία', 'μία', 'δύο', 'τρεις', 'τέσσερις', 'πέντε', 'έξι', 'επτά', 'οκτώ', 'εννέα'];   // θηλυκό (υπηρεσίες · πλατφόρμες)
  var ΑΡΙΘΜΟΙ_ΟΥΔ = ['κανένα', 'ένα', 'δύο', 'τρία', 'τέσσερα', 'πέντε', 'έξι', 'επτά', 'οκτώ', 'εννέα'];   // ουδέτερο (θέματα)
  var ΗΜΕΡΕΣ = ['ΚΥΡΙΑΚΗ', 'ΔΕΥΤΕΡΑ', 'ΤΡΙΤΗ', 'ΤΕΤΑΡΤΗ', 'ΠΕΜΠΤΗ', 'ΠΑΡΑΣΚΕΥΗ', 'ΣΑΒΒΑΤΟ'];
  var BG = ['color-mix(in oklch, var(--green) 52%, transparent)', 'var(--amber)', 'var(--coral)', 'var(--info)'];   // σχέδιο BG
  var ΧΩΡΙΣ_ΜΕΤΡΗΣΗ = 'var(--line-2)';   // ❓Σ3: ημέρα πριν τον πρώτο έλεγχο — ΟΧΙ πράσινη
  var CH = [['green', 'Λειτουργεί'], ['amber', 'Αργή'], ['coral', 'Δεν απαντά'], ['info', 'Συντήρηση']];   // σχέδιο CH
  var ΕΠΙΠΕΔΟ = { ok: 0, slow: 1, down: 2 };
  var ΒΗΜΑ_ΛΕΠΤΑ = 15;   // ΔΣ-20261117-dd9a78: έλεγχος ανά 15′ ⇒ ακρίβεια διαρκειών (❓Σ3)
  var ΒΗΜΑΤΑ = { 'Διερεύνηση': ['amber', 'ΔΙΕΡΕΥΝΗΣΗ', 0], 'Εντοπίστηκε': ['amber', 'ΕΝΤΟΠΙΣΤΗΚΕ', 1], 'Παρακολούθηση': ['info', 'ΠΑΡΑΚΟΛΟΥΘΗΣΗ', 2], 'Αποκαταστάθηκε': ['green', 'ΑΠΟΚΑΤΑΣΤΑΘΗΚΕ', 3] };   // σχέδιο ST
  var ΤΟΝΟΙ_ΘΕΜΑΤΩΝ = { 'Διορθώνεται': 'amber', 'Διορθώθηκε — σε επανέλεγχο': 'info' };   // σχέδιο issues
  var ΕΝΔΕΙΞΕΙΣ = [   // σχέδιο v (4 τιμές) — αυτούσιο
    { wash: 'var(--green-wash)', line: 'var(--green-line)', dot: 'var(--green)', ink: 'var(--accent)', lead: 'Όλα λειτουργούν ', accent: 'κανονικά', dotCls: 'ps-live' },
    { wash: 'var(--amber-wash)', line: 'var(--amber-line)', dot: 'var(--amber)', ink: 'color-mix(in oklch, var(--amber) 62%, var(--ink))', lead: 'Μερική ', accent: 'δυσλειτουργία', dotCls: '' },
    { wash: 'var(--coral-wash)', line: 'var(--coral-line)', dot: 'var(--coral)', ink: 'color-mix(in oklch, var(--coral) 72%, var(--ink))', lead: '', accent: 'Διακοπή', dotCls: '' },
    { wash: 'var(--info-wash)', line: 'var(--info-line)', dot: 'var(--info)', ink: 'color-mix(in oklch, var(--info) 72%, var(--ink))', lead: 'Προγραμματισμένη ', accent: 'συντήρηση', dotCls: '' }
  ];
  var ΒΟΗΘΕΙΑ = 'https://persis.ai/help';   // σχέδιο γρ. 290 · 506
  var ΥΠΟΣΤΗΡΙΞΗ = 'support@persis.ai';
  var ΤΙ_ΝΕΟ = './ti-neo/';                  // Παραδοχή 19: «χωρίς προορισμό ακόμη» — τώρα υπάρχει (status-page/ti-neo/)

  var state = { cur: null, his: null, ev: null, content: null, error: false, tip: null, theme: 'light' };
  var root = document.getElementById('st-root');

  /* ── βοηθοί (ίδιοι με το «Τι νέο») ── */
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === 'text') n.textContent = String(v);
      else if (k === 'on') Object.keys(v).forEach(function (ev) { n.addEventListener(ev, v[ev]); });
      else n.setAttribute(k, v === true ? '' : String(v));
    });
    (kids || []).forEach(function (c) { if (c == null || c === false || c === 0) return; n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });   // 0 = «λίστα.length && …» κενής λίστας
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
  function brand() {   // σχέδιο γρ. 67 · 299
    return el('span', { class: 'ps-brand' }, [
      el('span', { class: 'ps-brand-mark', text: 'P' }),
      el('span', null, [el('span', { class: 'ps-brand-word', text: 'persis' }), el('span', { class: 'ps-brand-ai', text: '.ai' })]),
      el('span', { class: 'ps-pill ps-pill--mono', text: 'ΚΑΤΑΣΤΑΣΗ' })
    ]);
  }
  function chip(tone, text) {
    return el('span', { class: 'ps-chip' + (tone && tone !== 'neutral' ? ' ps-chip--' + tone : '') }, [el('span', { class: 'ps-chip-dot' }), text]);
  }
  /* design system Card.jsx: section.ps-card > header.ps-card-head > div.ps-card-heading > [span.ds-sectlabel] [h3.ps-card-title]
     · div.ps-card-body(--flush) · footer.ps-card-foot */
  function card(o, kids) {
    var head = (o.title || o.eyebrow) ? el('header', { class: 'ps-card-head' }, [el('div', { class: 'ps-card-heading' }, [
      o.eyebrow && el('span', { class: 'ds-sectlabel', text: o.eyebrow }),
      o.title && el('h3', { class: 'ps-card-title', text: o.title })
    ])]) : null;
    return el('section', { class: 'ps-card', style: o.style || null }, [
      head,
      el('div', { class: 'ps-card-body' + (o.flush ? ' ps-card-body--flush' : '') }, kids),
      o.footer && el('footer', { class: 'ps-card-foot', text: o.footer })
    ]);
  }
  var ΕΞΩΤ_ΚΑΡΤΑ = 'background: transparent; box-shadow: none;';   // σχέδιο extCard (Παραδοχή 06)

  /* ── ώρα Ελλάδος (Παραδοχή 10: ΗΗ.ΜΜ.ΕΕΕΕ) ── */
  var ΜΟΡΦΗ = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Athens', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', weekday: 'short', hour12: false });
  var ΗΜ_ΕΒΔ = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  function αθήνα(iso) {
    var p = {};
    ΜΟΡΦΗ.formatToParts(new Date(iso)).forEach(function (x) { p[x.type] = x.value; });
    var hh = p.hour === '24' ? '00' : p.hour;
    return { date: p.day + '.' + p.month + '.' + p.year, key: p.year + '-' + p.month + '-' + p.day, hm: hh + ':' + p.minute, wd: ΗΜ_ΕΒΔ[p.weekday] };
  }
  function κλειδίΠριν(key, ago) {   // ΕΕΕΕ-ΜΜ-ΗΗ μείον ago ημέρες (ημερολογιακές, χωρίς ώρα)
    var d = new Date(key + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() - ago);
    return d.toISOString().slice(0, 10);
  }
  function ημερομηνία(key) { return key.slice(8, 10) + '.' + key.slice(5, 7) + '.' + key.slice(0, 4); }
  function διάρκεια(m) {   // σχέδιο dur
    m = Math.max(0, Math.round(m));
    var h = Math.floor(m / 60), r = m % 60;
    return h ? (r ? h + ' ώ. ' + r + ' λ.' : h + ' ώ.') : m + ' λ.';
  }
  function ποσοστό(καλά, όλα) {   // σχέδιο pct: «100%» · αλλιώς δύο δεκαδικά, κόμμα, ΚΑΤΩ στρογγύλευση
    if (!όλα) return '—';
    if (καλά >= όλα) return '100%';
    return (Math.floor(καλά / όλα * 100 * 100) / 100).toFixed(2).replace('.', ',') + '%';
  }
  function πίνακας(x) { return Array.isArray(x) ? x : []; }

  /* ── μοντέλο ── */
  function διαστήματα(ev, id, nowIso) {   // events.json: from→to ⇒ [{lv, start, end|null}] (μόνο ΜΗ-ok)
    var out = [], ανοιχτό = null;
    πίνακας(ev && ev.events).filter(function (e) { return e && e.id === id; }).forEach(function (e) {
      if (ανοιχτό) { ανοιχτό.end = e.at; out.push(ανοιχτό); ανοιχτό = null; }
      if (e.to !== 'ok' && ΕΠΙΠΕΔΟ[e.to] != null) ανοιχτό = { lv: ΕΠΙΠΕΔΟ[e.to], start: e.at, end: null };
    });
    if (ανοιχτό) out.push(ανοιχτό);
    return out;
  }
  function εργασίες(content, nowIso) {   // content.works[] που δεν έληξαν
    return πίνακας(content && content.works).filter(function (w) { return w && w.start && w.end && w.end > nowIso; });
  }
  function σεΣυντήρηση(works, id, nowIso) {
    return works.some(function (w) { return w.svc === id && w.start <= nowIso && nowIso < w.end; });
  }

  function vals() {
    var cur = state.cur, his = state.his || {}, ev = state.ev || {}, content = state.content || {};
    var nowIso = cur.checked_at, now = αθήνα(nowIso);
    var works = εργασίες(content, nowIso);
    var byId = {};
    πίνακας(cur.services).forEach(function (s) { byId[s.id] = s; });
    var days = his.days || {};

    var services = ΥΠΗΡΕΣΙΕΣ.map(function (u) {
      var s = byId[u.id] || {};
      var st = ΕΠΙΠΕΔΟ[s.state] != null ? ΕΠΙΠΕΔΟ[s.state] : 0;
      if (!u.ext && σεΣυντήρηση(works, u.id, nowIso)) st = 3;   // Παραδοχή 18
      var rec = {};
      πίνακας(days[u.id]).forEach(function (d) { rec[d.date] = d; });
      var δ = διαστήματα(ev, u.id, nowIso);
      var σύνολοΚαλά = 0, σύνολο = 0, list = [];
      for (var i = 0; i < 90; i++) {
        var ago = 89 - i, key = κλειδίΠριν(now.key, ago), r = rec[key];
        var bg = ΧΩΡΙΣ_ΜΕΤΡΗΣΗ, pct = '—', note = 'Χωρίς μέτρηση';
        if (r && r.checks) {
          var lv = ΕΠΙΠΕΔΟ[r.worst] != null ? ΕΠΙΠΕΔΟ[r.worst] : 0;
          var μέρα = works.filter(function (w) { return w.svc === u.id && αθήνα(w.start).key <= key && key <= αθήνα(w.end).key; }).length;
          if (μέρα && !u.ext) lv = 3;
          bg = BG[lv];
          σύνολοΚαλά += (r.ok || 0) + (r.slow || 0); σύνολο += r.checks;
          pct = ποσοστό((r.ok || 0) + (r.slow || 0), r.checks);
          var τρέχον = ago === 0 && st > 0 && st < 3 ? δ.filter(function (x) { return !x.end; })[0] : null;
          if (lv === 3) note = 'Προγραμματισμένη συντήρηση';
          else if (τρέχον) note = (τρέχον.lv === 2 ? 'Δεν απαντά από τις ' : 'Αργή απόκριση από τις ') + αθήνα(τρέχον.start).hm;
          else if (r.down) note = 'Δεν απαντούσε · ' + διάρκεια(r.down * ΒΗΜΑ_ΛΕΠΤΑ);
          else if (r.slow) note = 'Αργή απόκριση · ' + διάρκεια(r.slow * ΒΗΜΑ_ΛΕΠΤΑ);
          else note = 'Κανένα συμβάν';
        }
        list.push({ i: i, bg: bg, date: ημερομηνία(key), pct: pct, note: note });
      }
      var ανοιχτό = δ.filter(function (x) { return !x.end; })[0];
      return { id: u.id, u: u, name: u.name, ext: u.ext, days: list, pct: ποσοστό(σύνολοΚαλά, σύνολο), st: st,
        tone: CH[st][0], label: CH[st][1], since: ανοιχτό ? αθήνα(ανοιχτό.start).hm : '', intervals: δ };
    });

    var P = services.filter(function (s) { return !s.ext; }), X = services.filter(function (s) { return s.ext; });
    var lvl = P[0].st === 2 ? 2 : P.some(function (s) { return s.st === 1 || s.st === 2; }) ? 1 : P.some(function (s) { return s.st === 3; }) ? 3 : 0;   // σχέδιο lvl

    var issues = πίνακας(content.issues).filter(function (k) { return k && k.title && !k.resolved; }).map(function (k) {
      var u = ΥΠΗΡΕΣΙΕΣ.filter(function (x) { return x.id === k.svc; })[0];
      return { title: k.title, svc: u ? u.name : String(k.svc || ''), todo: k.todo || '', status: k.status || 'Διορθώνεται', tone: ΤΟΝΟΙ_ΘΕΜΑΤΩΝ[k.status] || 'amber', first: k.first ? ημερομηνία(String(k.first)) : '' };
    });
    var worksV = works.map(function (w) {
      var a = αθήνα(w.start), b = αθήνα(w.end), u = ΥΠΗΡΕΣΙΕΣ.filter(function (x) { return x.id === w.svc; })[0];
      var on = w.start <= nowIso && nowIso < w.end;
      return { time: a.hm + '–' + b.hm, day: ΗΜΕΡΕΣ[a.wd] + ' ' + a.date, title: w.title || '', svc: u ? u.name : String(w.svc || ''), text: w.text || '', chip: on ? 'Σε εξέλιξη' : 'Προγραμματισμένη', on: on, u: u, a: a, b: b };
    });

    var inc = null, I = content.incident;
    if (I && I.title && ΒΗΜΑΤΑ[I.status]) {
      var c = ΒΗΜΑΤΑ[I.status], u = ΥΠΗΡΕΣΙΕΣ.filter(function (x) { return x.id === I.svc; })[0];
      var startA = I.start ? αθήνα(I.start) : null;
      var mins = I.start ? ((I.end ? new Date(I.end) : new Date(nowIso)) - new Date(I.start)) / 60000 : 0;
      inc = { eyebrow: I.status === 'Αποκαταστάθηκε' ? 'ΤΕΛΕΥΤΑΙΟ ΣΥΜΒΑΝ' : 'ΤΡΕΧΟΝ ΣΥΜΒΑΝ', title: I.title, status: I.status, tone: c[0],
        svc: u ? u.name : String(I.svc || ''), start: startA ? startA.date + ' · ' + startA.hm : '',
        dur: I.start ? διάρκεια(mins) + (I.end ? '' : ' έως τώρα') : '',
        stepLine: (c[2] + 1) + ' ΑΠΟ 4 · ' + c[1],
        steps: Object.keys(ΒΗΜΑΤΑ).map(function (k) { var n = ΒΗΜΑΤΑ[k][2]; return { label: ΒΗΜΑΤΑ[k][1], bar: n <= c[2] ? 'var(--accent)' : 'var(--line-strong)', ink: n === c[2] ? 'var(--ink)' : 'var(--ink-3)' }; }),
        updates: πίνακας(I.updates).filter(function (x) { return x && x.at && ΒΗΜΑΤΑ[x.status]; }).slice().sort(function (a, b) { return a.at < b.at ? 1 : -1; }).map(function (x) {
          var t = αθήνα(x.at); return { t: t.hm, date: t.date, st: ΒΗΜΑΤΑ[x.status][1], dot: 'var(--' + ΒΗΜΑΤΑ[x.status][0] + ')', text: x.text || '' };
        }) };
    }

    /* η πρόταση κάτω από την ένδειξη — τα μοτίβα του σχεδίου (sc.*.detail) */
    var detail;
    var ΠΡΟΒΛ = P.filter(function (s) { return s.st === 1 || s.st === 2; }), ΣΥΝΤ = P.filter(function (s) { return s.st === 3; });
    var άλλες = function (n) { return 'Οι άλλες ' + ΑΡΙΘΜΟΙ[n] + ' υπηρεσίες λειτουργούν.'; };
    if (typeof content.detail === 'string' && content.detail.trim()) detail = content.detail.trim();   // ΣΥΝ (π.χ. «Το συμβάν … αποκαταστάθηκε στις …»)
    else if (ΠΡΟΒΛ.length === 1) {
      var s1 = ΠΡΟΒΛ[0], ρ = s1.u.pl ? (s1.st === 2 ? ' δεν απαντούν' : ' απαντούν αργά') : (s1.st === 2 ? ' δεν απαντά' : ' απαντά αργά');
      detail = s1.u.the + ρ + (s1.since ? ' από τις ' + s1.since : '') + '.' + (s1.id === 'app' && s1.st === 2 ? '' : ' ' + άλλες(P.length - 1));
    } else if (ΠΡΟΒΛ.length > 1) {
      detail = ΑΡΙΘΜΟΙ[ΠΡΟΒΛ.length].charAt(0).toUpperCase() + ΑΡΙΘΜΟΙ[ΠΡΟΒΛ.length].slice(1) + ' υπηρεσίες του persis.ai έχουν πρόβλημα: ' + ΠΡΟΒΛ.map(function (s) { return s.name; }).join(', ') + '.';
    } else if (ΣΥΝΤ.length) {
      var w0 = worksV.filter(function (w) { return w.on; })[0];
      detail = ΣΥΝΤ[0].u.the + (ΣΥΝΤ[0].u.pl ? ' βρίσκονται' : ' βρίσκεται') + ' σε προγραμματισμένη συντήρηση' + (w0 ? ' από τις ' + w0.a.hm + ' έως τις ' + w0.b.hm : '') + '. ' + άλλες(P.length - ΣΥΝΤ.length);
    } else {
      detail = 'Οι ' + ΑΡΙΘΜΟΙ[P.length] + ' υπηρεσίες του persis.ai λειτουργούν.';
      if (X.some(function (s) { return s.st > 0; })) detail += ' Το πρόβλημα βρίσκεται σε εξωτερική πλατφόρμα.';
      else if (issues.length) detail += issues.length === 1 ? ' Υπάρχει ένα γνωστό θέμα.' : ' Υπάρχουν ' + ΑΡΙΘΜΟΙ_ΟΥΔ[issues.length] + ' γνωστά θέματα.';
      else if (worksV.length) { var w1 = worksV[0]; detail += ' Προγραμματισμένη εργασία ' + (w1.u ? w1.u.in : w1.svc) + (w1.a.key === now.key ? ' σήμερα' : ' ' + w1.a.date) + ', ' + w1.time + '.'; }
    }

    /* γραμμή εξωτερικών (σχέδιο x) */
    var XP = X.filter(function (s) { return s.st > 0; }), x;
    if (!XP.length) x = { dot: 'var(--green)', text: 'Οι ' + ΑΡΙΘΜΟΙ[X.length] + ' εξωτερικές πλατφόρμες απαντούν.' };
    else if (XP.length === 1) {
      var e1 = XP[0];
      x = { dot: e1.st === 2 ? 'var(--coral)' : 'var(--amber)', text: e1.u.the + (e1.u.pl ? (e1.st === 2 ? ' δεν απαντούν' : ' απαντούν αργά') : (e1.st === 2 ? ' δεν απαντά' : ' απαντά αργά')) + (e1.since ? ' από τις ' + e1.since : '') + '. Οι άλλες ' + ΑΡΙΘΜΟΙ[X.length - 1] + ' πλατφόρμες απαντούν.' };
    } else x = { dot: XP.some(function (s) { return s.st === 2; }) ? 'var(--coral)' : 'var(--amber)', text: ΑΡΙΘΜΟΙ[XP.length].charAt(0).toUpperCase() + ΑΡΙΘΜΟΙ[XP.length].slice(1) + ' εξωτερικές πλατφόρμες έχουν πρόβλημα: ' + XP.map(function (s) { return s.name; }).join(', ') + '.' };

    /* ιστορικό 14 ημερών (σχέδιο history): διαστήματα από events.json · κλεισμένα γνωστά θέματα του content.json */
    var history = [];
    for (var ago = 0; ago < 14; ago++) {
      var key = κλειδίΠριν(now.key, ago), wd = new Date(key + 'T12:00:00Z').getUTCDay(), entries = [];
      services.forEach(function (s) {
        s.intervals.forEach(function (d) {
          var a = αθήνα(d.start);
          if (a.key !== key) return;
          var ext = s.ext, ongoing = !d.end;
          var τίτλος = d.lv === 1 ? s.name + ': αργή απόκριση'
            : ongoing ? (ext ? s.name + ': η πλατφόρμα δεν απαντά' : s.u.the + (s.u.pl ? ' δεν απαντούν' : ' δεν απαντά'))
              : s.name + ': ' + (ext ? 'η πλατφόρμα δεν απαντούσε' : 'δεν απαντούσε');
          var meta = ongoing ? 'Από τις ' + a.hm + ' · σε εξέλιξη' : a.hm + '–' + αθήνα(d.end).hm + ' · ' + διάρκεια((new Date(d.end) - new Date(d.start)) / 60000);
          var χρώμα = ongoing && inc && inc.svc === s.name ? { chip: inc.status, tone: inc.tone } : ongoing ? { chip: 'Σε εξέλιξη', tone: 'amber' } : { chip: 'Αποκαταστάθηκε', tone: 'green' };
          entries.push({ at: d.start, title: τίτλος, meta: meta, ext: ext, own: !ext, chip: χρώμα.chip, tone: χρώμα.tone });
        });
      });
      πίνακας(content.issues).filter(function (k) { return k && k.resolved && String(k.resolved) === key; }).forEach(function (k) {
        var u = ΥΠΗΡΕΣΙΕΣ.filter(function (q) { return q.id === k.svc; })[0];
        entries.push({ at: key, title: (u ? u.name + ': ' : '') + k.title, meta: 'Γνωστό θέμα · ' + (k.first ? ημερομηνία(String(k.first)) : '') + '–' + ημερομηνία(key), ext: false, own: true, chip: 'Αποκαταστάθηκε', tone: 'green' });
      });
      entries.sort(function (a, b) { return a.at < b.at ? 1 : -1; });
      history.push({ date: ημερομηνία(key), day: ago === 0 ? 'ΣΗΜΕΡΑ' : ΗΜΕΡΕΣ[wd], quiet: !entries.length, entries: entries });
    }

    return { services: services, v: Object.assign({ detail: detail }, ΕΝΔΕΙΞΕΙΣ[lvl]), lvl: lvl, x: x, now: now.date + ' · ' + now.hm,
      inc: inc, issues: issues, works: worksV, history: history };
  }

  /* ── tooltip (σχέδιο hover/over/leave) ── */
  function setTip(t) {
    var c = state.tip;
    if (t && c && c.b === t.b && c.sid === t.sid && c.i === t.i) return;
    if (!t && !c) return;
    state.tip = t; render();
  }
  function bar(s, b, mobile) {
    var on = !!state.tip && state.tip.b === b && state.tip.sid === s.id, d = on ? s.days[state.tip.i] : null;
    var pos = on ? ((state.tip.i + 0.5) / 90 * 100).toFixed(2) + '%' : '50%';
    var over = function (e) { var a = e.target && e.target.getAttribute ? e.target.getAttribute('data-i') : null; if (a === null) return; setTip({ b: b, sid: s.id, i: +a }); };
    var box = el('div', { 'data-st-bar': s.id, style: mobile ? 'position:relative;display:flex;gap:1px;height:26px' : 'position:relative;display:flex;gap:2px;height:28px;cursor:default',
      on: { mouseover: over, mouseleave: function () { setTip(null); }, click: over } },
      s.days.map(function (x) { return el('span', { class: 'st-day', 'data-i': x.i, style: 'flex:1 1 0;min-width:0;border-radius:' + (mobile ? '1px' : '1.5px') + ';background:' + x.bg }); }));
    if (on) box.appendChild(el('div', { 'data-st-tip': '', style: 'position:absolute;z-index:5;bottom:calc(100% + 8px);left:' + pos + ';transform:translateX(-' + pos + ');display:flex;flex-direction:column;gap:2px;min-width:' + (mobile ? '190px' : '200px') + ';padding:10px 12px;border:1px solid var(--line-strong);border-radius:var(--r-md);background:var(--panel);box-shadow:var(--shadow-md);white-space:nowrap;pointer-events:none' }, [
      el('span', { class: 'ds-mono', style: 'font-size:var(--text-xs);letter-spacing:.06em;color:var(--ink-3)', text: d.date }),
      el('span', { style: 'font:var(--fw-medium) var(--text-lg)/1.3 var(--font-serif);color:var(--ink)', text: d.pct + ' διαθεσιμότητα' }),
      el('span', { style: 'font-size:var(--text-sm);color:var(--ink-2)', text: d.note }),
      s.ext && el('span', { class: 'ds-sectlabel', style: 'margin-top:4px', text: 'ΕΞΩΤΕΡΙΚΗ ΥΠΗΡΕΣΙΑ' })
    ]));
    return box;
  }
  function legend(mobile) {   // σχέδιο γρ. 124–130 · 354–360
    var sw = function (bg, t) { return el('span', { style: 'display:flex;align-items:center;gap:7px' }, [el('span', { style: 'width:4px;height:12px;border-radius:1.5px;background:' + bg }), t]); };
    return el('div', { style: mobile ? 'display:flex;flex-wrap:wrap;align-items:center;gap:8px 16px;padding:12px 16px;font-size:var(--text-sm);color:var(--ink-3)' : 'display:flex;align-items:center;gap:20px;padding:10px 16px;font-size:var(--text-sm);color:var(--ink-3)' }, [
      sw(BG[0], 'Λειτουργεί'), sw(BG[1], 'Αργή'), sw(BG[2], 'Δεν απαντά'), sw(BG[3], 'Συντήρηση'),
      el('span', { style: mobile ? 'flex-basis:100%' : 'margin-left:auto', text: mobile ? 'Ένα κουτάκι ανά ημέρα. Αγγίξτε μια ημέρα για λεπτομέρειες.' : 'Ένα κουτάκι ανά ημέρα. Περάστε τον δείκτη πάνω από μια ημέρα για λεπτομέρειες.' })
    ]);
  }
  var EXT_FOOT = 'Η διαθεσιμότητα των εξωτερικών πλατφορμών είναι όπως καταγράφηκε από τους ελέγχους του persis.ai. Δεν αποτελεί επίσημο στοιχείο των φορέων.';
  var HIST_NOTE = 'Τα συμβάντα εξωτερικών πλατφορμών είναι όπως καταγράφηκαν από τους ελέγχους του persis.ai.';

  function links(v, p) {   // «Δείτε το συμβάν / τα θέματα / την εργασία» (σχέδιο γρ. 80 · 311)
    return [v.inc && el('a', { href: '#' + p + '-incident', text: 'Δείτε το συμβάν' }), v.issues.length && el('a', { href: '#' + p + '-issues', text: 'Δείτε τα θέματα' }), v.works.length && el('a', { href: '#' + p + '-work', text: 'Δείτε την εργασία' })];
  }
  function footer(mobile) {   // σχέδιο γρ. 289–291 · 505–507
    return el('footer', { style: mobile ? 'padding:20px 16px 28px;border-top:1px solid var(--line)' : 'padding:20px 32px;border-top:1px solid var(--line)' }, [
      el('p', { style: mobile ? 'margin:0;font-size:var(--text-sm);color:var(--ink-3)' : 'width:var(--content-w);margin:0 auto;font-size:var(--text-sm);color:var(--ink-3)' }, [
        'persis.ai · Βοήθεια: ', el('a', { href: ΒΟΗΘΕΙΑ, text: 'persis.ai/help' }), ' · ', el('a', { href: 'mailto:' + ΥΠΟΣΤΗΡΙΞΗ, text: ΥΠΟΣΤΗΡΙΞΗ }), ' · ', el('a', { href: ΤΙ_ΝΕΟ, text: 'Τι νέο στο persis.ai' })
      ])
    ]);
  }

  /* ── 1440 (σχέδιο γρ. 64–293) ── */
  function web(v) {
    var grid = 'display:grid;grid-template-columns:256px minmax(0,1fr) 60px 112px;column-gap:20px;align-items:center;';
    var headRow = function (first) { return el('div', { style: grid + 'padding:8px 16px;border-bottom:1px solid var(--line-2)' }, [
      el('span', { class: 'ds-sectlabel', text: first }),
      el('span', { class: 'ds-sectlabel', style: 'display:flex;justify-content:space-between' }, [el('span', { text: '90 ΗΜΕΡΕΣ ΠΡΙΝ' }), el('span', { text: 'ΣΗΜΕΡΑ' })]),
      el('span', { class: 'ds-sectlabel', style: 'text-align:right', text: '90 ΗΜ.' }),
      el('span', { class: 'ds-sectlabel', style: 'text-align:right', text: 'ΚΑΤΑΣΤΑΣΗ' })
    ]); };
    var row = function (s, ext) { return el('div', { 'data-st-row': s.id, style: grid + 'padding:11px 16px;' + (ext ? 'border-top:1px solid var(--line-2);margin-top:-1px' : 'border-bottom:1px solid var(--line-2)') }, [
      el('span', { style: 'font-weight:var(--fw-semibold);color:var(--ink)', text: s.name }),
      bar(s, 'd', false),
      el('span', { class: 'ds-mono', style: 'font-size:var(--text-sm);color:var(--ink-2);text-align:right', text: s.pct }),
      el('span', { style: 'display:flex;justify-content:flex-end' }, [chip(s.tone, s.label)])
    ]); };
    var P = v.services.filter(function (s) { return !s.ext; }), X = v.services.filter(function (s) { return s.ext; });
    var main = el('main', { style: 'display:flex;flex-direction:column;gap:32px;width:var(--content-w);margin:0 auto;padding:40px 0 56px' }, [
      el('section', { style: 'display:flex;flex-direction:column;gap:12px' }, [
        el('div', { 'data-st': 'overall', style: 'display:flex;align-items:flex-end;justify-content:space-between;gap:40px;padding:28px 32px;border:1px solid ' + v.v.line + ';border-radius:var(--r-lg);background:' + v.v.wash }, [
          el('div', { style: 'display:flex;flex-direction:column;gap:12px;min-width:0' }, [
            el('span', { class: 'ds-sectlabel', text: 'PERSIS.AI · ΣΥΝΟΛΙΚΗ ΚΑΤΑΣΤΑΣΗ' }),
            el('h1', { style: 'display:flex;align-items:flex-start;gap:16px;margin:0;font:var(--fw-medium) var(--text-display)/var(--lh-tight) var(--font-serif);color:var(--ink)' }, [
              el('span', { class: v.v.dotCls || null, style: 'display:inline-block;flex:none;width:14px;height:14px;margin-top:19px;border-radius:var(--r-pill);background:' + v.v.dot }),
              el('span', null, [v.v.lead, el('em', { style: 'font-style:italic;color:' + v.v.ink, text: v.v.accent })])
            ]),
            el('p', { 'data-st': 'detail', style: 'margin:0 0 0 30px;font-size:var(--text-md);color:var(--ink-2);text-wrap:pretty' }, [v.v.detail + ' '].concat(links(v, 'd')))
          ]),
          el('div', { style: 'display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex:none' }, [
            el('span', { class: 'ds-sectlabel', text: 'ΤΕΛΕΥΤΑΙΟΣ ΕΛΕΓΧΟΣ' }),
            el('span', { class: 'ds-mono', 'data-st': 'now', style: 'font-size:var(--text-md);color:var(--ink)', text: v.now }),
            el('span', { class: 'ds-sectlabel', text: 'ΩΡΑ ΕΛΛΑΔΑΣ' })
          ])
        ]),
        el('div', { style: 'display:flex;flex-direction:column;gap:6px;padding:16px 32px;border:1px solid var(--line);border-radius:var(--r-lg)' }, [
          el('span', { class: 'ds-sectlabel', text: 'ΕΞΩΤΕΡΙΚΗ ΥΠΗΡΕΣΙΑ — ΕΚΤΟΣ ΕΛΕΓΧΟΥ PERSIS.AI' }),
          el('div', { style: 'display:flex;align-items:center;gap:12px' }, [
            el('span', { style: 'flex:none;width:10px;height:10px;border-radius:var(--r-pill);background:' + v.x.dot }),
            el('span', { 'data-st': 'external', style: 'font:var(--fw-medium) var(--text-xl)/1.3 var(--font-serif);color:var(--ink)', text: v.x.text })
          ])
        ])
      ]),
      el('section', { style: 'display:flex;flex-direction:column;gap:16px' }, [
        card({ title: 'Υπηρεσίες persis.ai', flush: true }, [headRow('ΥΠΗΡΕΣΙΑ')].concat(P.map(function (s) { return row(s, false); })).concat([legend(false)])),
        card({ eyebrow: 'ΕΞΩΤΕΡΙΚΗ ΥΠΗΡΕΣΙΑ — ΕΚΤΟΣ ΕΛΕΓΧΟΥ PERSIS.AI', title: 'Εξωτερικές πλατφόρμες', flush: true, footer: EXT_FOOT, style: ΕΞΩΤ_ΚΑΡΤΑ }, [headRow('ΠΛΑΤΦΟΡΜΑ')].concat(X.map(function (s) { return row(s, true); })))
      ]),
      v.inc && el('section', { id: 'd-incident' }, [incidentWeb(v.inc)]),
      el('section', { id: 'd-issues' }, [card({ title: 'Γνωστά θέματα', flush: true }, issuesWeb(v.issues))]),
      v.works.length && el('section', { id: 'd-work' }, [card({ title: 'Προγραμματισμένες εργασίες', flush: true }, v.works.map(workWeb))]),
      historyWeb(v.history)
      /* ❓Σ2: «Εγγραφή για ειδοποιήσεις» (σχέδιο γρ. 276–287) ΔΕΝ μπαίνει — κανένας μηχανισμός αποστολής ακόμη */
    ]);
    return el('div', { class: 'st-web' }, [
      el('header', { style: 'display:flex;align-items:center;justify-content:space-between;height:var(--topbar-h);padding:0 32px;border-bottom:1px solid var(--line)' }, [brand()]),
      main, footer(false)
    ]);
  }
  function incidentWeb(I) {   // σχέδιο γρ. 163–200
    return card({ flush: true }, [
      el('div', { class: 'ps-card-head', style: 'padding:14px 16px' }, [
        el('div', { class: 'ps-card-heading' }, [el('span', { class: 'ds-sectlabel', text: I.eyebrow }), el('h2', { class: 'ps-card-title', style: 'font-size:var(--text-2xl)', text: I.title })]),
        el('div', { class: 'ps-card-action' }, [chip(I.tone, I.status)])
      ]),
      el('div', { style: 'display:flex;gap:48px;padding:12px 16px;border-bottom:1px solid var(--line-2)' }, [
        el('div', { style: 'display:flex;flex-direction:column;gap:2px' }, [el('span', { class: 'ds-sectlabel', text: 'ΥΠΗΡΕΣΙΑ' }), el('span', { style: 'font-weight:var(--fw-semibold);color:var(--ink)', text: I.svc })]),
        el('div', { style: 'display:flex;flex-direction:column;gap:2px' }, [el('span', { class: 'ds-sectlabel', text: 'ΕΝΑΡΞΗ' }), el('span', { class: 'ds-mono', style: 'font-size:var(--text-sm);color:var(--ink)', text: I.start })]),
        el('div', { style: 'display:flex;flex-direction:column;gap:2px' }, [el('span', { class: 'ds-sectlabel', text: 'ΔΙΑΡΚΕΙΑ' }), el('span', { class: 'ds-mono', style: 'font-size:var(--text-sm);color:var(--ink)', text: I.dur })])
      ]),
      el('div', { style: 'display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;padding:16px' }, I.steps.map(function (st) {
        return el('div', { style: 'display:flex;flex-direction:column;gap:8px' }, [el('span', { style: 'height:3px;border-radius:2px;background:' + st.bar }), el('span', { class: 'ds-sectlabel', style: 'color:' + st.ink, text: st.label })]);
      }))
    ].concat(I.updates.map(function (u) {
      return el('div', { style: 'display:grid;grid-template-columns:132px minmax(0,1fr);column-gap:24px;padding:14px 16px;border-top:1px solid var(--line-2)' }, [
        el('div', { style: 'display:flex;flex-direction:column;gap:2px' }, [el('span', { class: 'ds-mono', style: 'font-size:var(--text-md);color:var(--ink)', text: u.t }), el('span', { class: 'ds-mono', style: 'font-size:var(--text-xs);color:var(--ink-3)', text: u.date })]),
        el('div', { style: 'display:flex;flex-direction:column;gap:6px' }, [
          el('span', { style: 'display:flex;align-items:center;gap:8px' }, [el('span', { style: 'width:6px;height:6px;border-radius:var(--r-pill);background:' + u.dot }), el('span', { class: 'ds-sectlabel', text: u.st })]),
          el('p', { style: 'margin:0;color:var(--ink);text-wrap:pretty', text: u.text })
        ])
      ]);
    })));
  }
  function issuesWeb(list) {   // σχέδιο γρ. 202–222
    if (!list.length) return [el('div', { style: 'padding:16px;color:var(--ink-3)', text: 'Κανένα γνωστό θέμα' })];
    return list.map(function (k) {
      return el('div', { style: 'display:flex;flex-direction:column;gap:14px;padding:16px;border-top:1px solid var(--line-2);margin-top:-1px' }, [
        el('div', { style: 'display:flex;align-items:flex-start;justify-content:space-between;gap:24px' }, [
          el('h3', { style: 'margin:0;font:var(--fw-medium) var(--text-xl)/1.3 var(--font-serif);color:var(--ink);text-wrap:pretty', text: k.title }),
          el('span', { style: 'flex:none' }, [chip(k.tone, k.status)])
        ]),
        el('div', { style: 'display:grid;grid-template-columns:220px 150px minmax(0,1fr);column-gap:32px;align-items:start' }, [
          el('div', { style: 'display:flex;flex-direction:column;gap:2px' }, [el('span', { class: 'ds-sectlabel', text: 'ΑΦΟΡΑ' }), el('span', { style: 'font-weight:var(--fw-semibold);color:var(--ink)', text: k.svc })]),
          el('div', { style: 'display:flex;flex-direction:column;gap:2px' }, [el('span', { class: 'ds-sectlabel', text: 'ΠΡΩΤΗ ΕΜΦΑΝΙΣΗ' }), el('span', { class: 'ds-mono', style: 'font-size:var(--text-sm);color:var(--ink)', text: k.first })]),
          el('div', { style: 'display:flex;flex-direction:column;gap:2px;padding:10px 12px;border:1px solid var(--line-2);border-radius:var(--r-md);background:var(--panel-2)' }, [el('span', { class: 'ds-sectlabel', text: 'ΤΙ ΝΑ ΚΑΝΕΤΕ ΣΤΟ ΜΕΤΑΞΥ' }), el('span', { style: 'font-size:var(--text-md);color:var(--ink);text-wrap:pretty', text: k.todo })])
        ])
      ]);
    });
  }
  function workWeb(w) {   // σχέδιο γρ. 224–246
    return el('div', { style: 'display:grid;grid-template-columns:200px minmax(0,1fr);column-gap:24px;padding:16px;border-top:1px solid var(--line-2);margin-top:-1px' }, [
      el('div', { style: 'display:flex;flex-direction:column;gap:2px' }, [
        el('span', { class: 'ds-mono', style: 'font-size:var(--text-md);color:var(--ink)', text: w.time }),
        el('span', { class: 'ds-mono', style: 'font-size:var(--text-xs);letter-spacing:.04em;color:var(--ink-3)', text: w.day }),
        el('span', { class: 'ds-sectlabel', text: 'ΩΡΑ ΕΛΛΑΔΑΣ' })
      ]),
      el('div', { style: 'display:flex;flex-direction:column;gap:12px' }, [
        el('div', { style: 'display:flex;align-items:flex-start;justify-content:space-between;gap:24px' }, [
          el('h3', { style: 'margin:0;font:var(--fw-medium) var(--text-xl)/1.3 var(--font-serif);color:var(--ink);text-wrap:pretty', text: w.title }),
          el('span', { style: 'flex:none' }, [chip('info', w.chip)])
        ]),
        el('div', { style: 'display:grid;grid-template-columns:auto minmax(0,1fr);column-gap:40px;align-items:start' }, [
          el('div', { style: 'display:flex;flex-direction:column;gap:2px' }, [el('span', { class: 'ds-sectlabel', text: 'ΕΠΗΡΕΑΖΕΙ' }), el('span', { style: 'font-weight:var(--fw-semibold);color:var(--ink)', text: w.svc })]),
          el('div', { style: 'display:flex;flex-direction:column;gap:2px' }, [el('span', { class: 'ds-sectlabel', text: 'ΠΕΡΙΓΡΑΦΗ' }), el('span', { style: 'color:var(--ink-2);text-wrap:pretty', text: w.text })])
        ])
      ])
    ]);
  }
  function historyWeb(H) {   // σχέδιο γρ. 248–275
    return el('section', { 'data-st': 'history', style: 'display:flex;flex-direction:column' }, [
      el('span', { class: 'ds-sectlabel', text: 'ΤΕΛΕΥΤΑΙΕΣ 14 ΗΜΕΡΕΣ' }),
      el('h2', { style: 'margin:6px 0 0;font:var(--fw-medium) var(--text-2xl)/1.25 var(--font-serif);color:var(--ink)', text: 'Ιστορικό συμβάντων' }),
      el('p', { style: 'margin:6px 0 16px;font-size:var(--text-sm);color:var(--ink-3)', text: HIST_NOTE })
    ].concat(H.map(function (h) {
      return el('div', { style: 'display:grid;grid-template-columns:132px minmax(0,1fr);column-gap:24px;padding:14px 0;border-top:1px solid var(--line)' }, [
        el('div', { style: 'display:flex;flex-direction:column;gap:2px' }, [el('span', { class: 'ds-mono', style: 'font-size:var(--text-sm);color:var(--ink-2)', text: h.date }), el('span', { class: 'ds-sectlabel', text: h.day })]),
        el('div', { style: 'display:flex;flex-direction:column;gap:12px' }, (h.quiet ? [el('span', { style: 'color:var(--ink-3)', text: 'Κανένα συμβάν' })] : []).concat(h.entries.map(function (e) {
          return el('div', { style: 'display:flex;align-items:flex-start;justify-content:space-between;gap:16px' }, [
            el('div', { style: 'display:flex;flex-direction:column;gap:3px;min-width:0' }, [el('span', { style: 'font-weight:var(--fw-semibold);color:var(--ink)', text: e.title }), el('span', { class: 'ds-mono', style: 'font-size:var(--text-xs);letter-spacing:.04em;color:var(--ink-3)', text: e.meta })]),
            e.own ? chip(e.tone, e.chip) : el('span', { class: 'ps-pill ps-pill--mono', style: 'flex:none', text: 'ΕΞΩΤΕΡΙΚΗ ΥΠΗΡΕΣΙΑ — ΕΚΤΟΣ ΕΛΕΓΧΟΥ PERSIS.AI' })
          ]);
        })))
      ]);
    })));
  }

  /* ── 390 (σχέδιο γρ. 296–510) ── */
  function mobile(v) {
    var mrow = function (s, ext) { return el('div', { 'data-st-mrow': s.id, style: 'display:flex;flex-direction:column;gap:10px;padding:14px 16px;' + (ext ? 'border-top:1px solid var(--line-2);margin-top:-1px' : 'border-bottom:1px solid var(--line-2)') }, [
      el('div', { style: 'display:flex;align-items:center;justify-content:space-between;gap:12px' }, [el('span', { style: 'min-width:0;font-weight:var(--fw-semibold);color:var(--ink)', text: s.name }), el('span', { style: 'flex:none' }, [chip(s.tone, s.label)])]),
      bar(s, 'm', true),
      el('div', { style: 'display:flex;align-items:baseline;justify-content:space-between;gap:8px' }, [el('span', { class: 'ds-sectlabel', text: '90 ΗΜΕΡΕΣ ΠΡΙΝ' }), el('span', { class: 'ds-mono', style: 'font-size:var(--text-sm);color:var(--ink-2)', text: s.pct }), el('span', { class: 'ds-sectlabel', text: 'ΣΗΜΕΡΑ' })])
    ]); };
    var P = v.services.filter(function (s) { return !s.ext; }), X = v.services.filter(function (s) { return s.ext; });
    var kv = function (k, val, mono) { return [el('span', { class: 'ds-sectlabel', text: k }), el('span', { class: mono ? 'ds-mono' : null, style: (mono ? 'font-size:var(--text-sm);' : 'font-weight:var(--fw-semibold);') + 'color:var(--ink);text-align:right', text: val })]; };
    var main = el('main', { style: 'display:flex;flex-direction:column;gap:24px;padding:20px 16px 32px' }, [
      el('section', { style: 'display:flex;flex-direction:column;gap:12px' }, [
        el('div', { style: 'display:flex;flex-direction:column;gap:10px;padding:20px 16px 16px;border:1px solid ' + v.v.line + ';border-radius:var(--r-lg);background:' + v.v.wash }, [
          el('span', { class: 'ds-sectlabel', text: 'PERSIS.AI · ΣΥΝΟΛΙΚΗ ΚΑΤΑΣΤΑΣΗ' }),
          el('h1', { style: 'display:flex;align-items:flex-start;gap:12px;margin:0;font:var(--fw-medium) var(--text-4xl)/var(--lh-tight) var(--font-serif);color:var(--ink)' }, [
            el('span', { class: v.v.dotCls || null, style: 'display:inline-block;flex:none;width:12px;height:12px;margin-top:13px;border-radius:var(--r-pill);background:' + v.v.dot }),
            el('span', null, [v.v.lead, el('em', { style: 'font-style:italic;color:' + v.v.ink, text: v.v.accent })])
          ]),
          el('p', { style: 'margin:0;color:var(--ink-2);text-wrap:pretty' }, [v.v.detail + ' '].concat(links(v, 'm'))),
          el('div', { style: 'display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 10px;margin-top:4px;padding-top:12px;border-top:1px solid ' + v.v.line }, [
            el('span', { class: 'ds-sectlabel', text: 'ΤΕΛΕΥΤΑΙΟΣ ΕΛΕΓΧΟΣ' }), el('span', { class: 'ds-mono', style: 'font-size:var(--text-sm);color:var(--ink)', text: v.now }), el('span', { class: 'ds-sectlabel', text: 'ΩΡΑ ΕΛΛΑΔΑΣ' })
          ])
        ]),
        el('div', { style: 'display:flex;flex-direction:column;gap:6px;padding:14px 16px;border:1px solid var(--line);border-radius:var(--r-lg)' }, [
          el('span', { class: 'ds-sectlabel', text: 'ΕΞΩΤΕΡΙΚΗ ΥΠΗΡΕΣΙΑ — ΕΚΤΟΣ ΕΛΕΓΧΟΥ PERSIS.AI' }),
          el('div', { style: 'display:flex;align-items:flex-start;gap:10px' }, [
            el('span', { style: 'flex:none;width:10px;height:10px;margin-top:7px;border-radius:var(--r-pill);background:' + v.x.dot }),
            el('span', { style: 'font:var(--fw-medium) var(--text-lg)/1.35 var(--font-serif);color:var(--ink);text-wrap:pretty', text: v.x.text })
          ])
        ])
      ]),
      el('section', { style: 'display:flex;flex-direction:column;gap:16px' }, [
        card({ title: 'Υπηρεσίες persis.ai', flush: true }, P.map(function (s) { return mrow(s, false); }).concat([legend(true)])),
        card({ eyebrow: 'ΕΞΩΤΕΡΙΚΗ ΥΠΗΡΕΣΙΑ — ΕΚΤΟΣ ΕΛΕΓΧΟΥ PERSIS.AI', title: 'Εξωτερικές πλατφόρμες', flush: true, footer: EXT_FOOT, style: ΕΞΩΤ_ΚΑΡΤΑ }, X.map(function (s) { return mrow(s, true); }))
      ]),
      v.inc && el('section', { id: 'm-incident' }, [card({ flush: true }, [
        el('div', { style: 'display:flex;flex-direction:column;gap:8px;padding:14px 16px;border-bottom:1px solid var(--line-2)' }, [
          el('div', { style: 'display:flex;align-items:center;justify-content:space-between;gap:12px' }, [el('span', { class: 'ds-sectlabel', text: v.inc.eyebrow }), chip(v.inc.tone, v.inc.status)]),
          el('h2', { class: 'ps-card-title', style: 'font-size:var(--text-xl)', text: v.inc.title })
        ]),
        el('div', { style: 'display:grid;grid-template-columns:auto minmax(0,1fr);gap:6px 16px;align-items:baseline;padding:12px 16px;border-bottom:1px solid var(--line-2)' }, kv('ΥΠΗΡΕΣΙΑ', v.inc.svc).concat(kv('ΕΝΑΡΞΗ', v.inc.start, true)).concat(kv('ΔΙΑΡΚΕΙΑ', v.inc.dur, true))),
        el('div', { style: 'display:flex;flex-direction:column;gap:8px;padding:14px 16px' }, [
          el('div', { style: 'display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px' }, v.inc.steps.map(function (st) { return el('span', { style: 'height:3px;border-radius:2px;background:' + st.bar }); })),
          el('span', { class: 'ds-sectlabel', style: 'color:var(--ink)', text: v.inc.stepLine })
        ])
      ].concat(v.inc.updates.map(function (u) {
        return el('div', { style: 'display:flex;flex-direction:column;gap:6px;padding:14px 16px;border-top:1px solid var(--line-2)' }, [
          el('div', { style: 'display:flex;align-items:center;justify-content:space-between;gap:12px' }, [
            el('span', { style: 'display:flex;align-items:center;gap:8px' }, [el('span', { style: 'width:6px;height:6px;border-radius:var(--r-pill);background:' + u.dot }), el('span', { class: 'ds-sectlabel', text: u.st })]),
            el('span', { class: 'ds-mono', style: 'font-size:var(--text-sm);color:var(--ink)', text: u.t })
          ]),
          el('p', { style: 'margin:0;color:var(--ink);text-wrap:pretty', text: u.text })
        ]);
      })))]),
      el('section', { id: 'm-issues' }, [card({ title: 'Γνωστά θέματα', flush: true }, !v.issues.length ? [el('div', { style: 'padding:16px;color:var(--ink-3)', text: 'Κανένα γνωστό θέμα' })] : v.issues.map(function (k) {
        return el('div', { style: 'display:flex;flex-direction:column;align-items:flex-start;gap:10px;padding:16px;border-top:1px solid var(--line-2);margin-top:-1px' }, [
          chip(k.tone, k.status),
          el('h3', { style: 'margin:0;font:var(--fw-medium) var(--text-lg)/1.35 var(--font-serif);color:var(--ink);text-wrap:pretty', text: k.title }),
          el('div', { style: 'align-self:stretch;display:flex;flex-direction:column;gap:2px;padding:10px 12px;border:1px solid var(--line-2);border-radius:var(--r-md);background:var(--panel-2)' }, [el('span', { class: 'ds-sectlabel', text: 'ΤΙ ΝΑ ΚΑΝΕΤΕ ΣΤΟ ΜΕΤΑΞΥ' }), el('span', { style: 'color:var(--ink);text-wrap:pretty', text: k.todo })]),
          el('div', { style: 'align-self:stretch;display:grid;grid-template-columns:auto minmax(0,1fr);gap:6px 16px;align-items:baseline' }, kv('ΑΦΟΡΑ', k.svc).concat(kv('ΠΡΩΤΗ ΕΜΦΑΝΙΣΗ', k.first, true)))
        ]);
      }))]),
      v.works.length && el('section', { id: 'm-work' }, [card({ title: 'Προγραμματισμένες εργασίες', flush: true }, v.works.map(function (w) {
        return el('div', { style: 'display:flex;flex-direction:column;gap:10px;padding:16px;border-top:1px solid var(--line-2);margin-top:-1px' }, [
          el('div', { style: 'display:flex;align-items:center;justify-content:space-between;gap:12px' }, [el('span', { class: 'ds-mono', style: 'font-size:var(--text-md);color:var(--ink)', text: w.time }), chip('info', w.chip)]),
          el('div', { style: 'display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 10px' }, [el('span', { class: 'ds-mono', style: 'font-size:var(--text-xs);letter-spacing:.04em;color:var(--ink-3)', text: w.day }), el('span', { class: 'ds-sectlabel', text: 'ΩΡΑ ΕΛΛΑΔΑΣ' })]),
          el('h3', { style: 'margin:0;font:var(--fw-medium) var(--text-lg)/1.35 var(--font-serif);color:var(--ink);text-wrap:pretty', text: w.title }),
          el('p', { style: 'margin:0;color:var(--ink-2);text-wrap:pretty', text: w.text }),
          el('div', { style: 'display:grid;grid-template-columns:auto minmax(0,1fr);gap:6px 16px;align-items:baseline' }, kv('ΕΠΗΡΕΑΖΕΙ', w.svc))
        ]);
      }))]),
      el('section', { style: 'display:flex;flex-direction:column' }, [
        el('span', { class: 'ds-sectlabel', text: 'ΤΕΛΕΥΤΑΙΕΣ 14 ΗΜΕΡΕΣ' }),
        el('h2', { style: 'margin:6px 0 0;font:var(--fw-medium) var(--text-2xl)/1.25 var(--font-serif);color:var(--ink)', text: 'Ιστορικό συμβάντων' }),
        el('p', { style: 'margin:6px 0 16px;font-size:var(--text-sm);color:var(--ink-3);text-wrap:pretty', text: HIST_NOTE })
      ].concat(v.history.map(function (h) {
        return el('div', { style: 'display:flex;flex-direction:column;gap:10px;padding:13px 0;border-top:1px solid var(--line)' }, [
          el('div', { style: 'display:flex;align-items:baseline;justify-content:space-between;gap:12px' }, [
            el('span', { style: 'display:flex;align-items:baseline;gap:10px' }, [el('span', { class: 'ds-mono', style: 'font-size:var(--text-sm);color:var(--ink-2)', text: h.date }), el('span', { class: 'ds-sectlabel', text: h.day })]),
            h.quiet && el('span', { style: 'color:var(--ink-3)', text: 'Κανένα συμβάν' })
          ])
        ].concat(h.entries.map(function (e) {
          return el('div', { style: 'display:flex;flex-direction:column;align-items:flex-start;gap:5px' }, [
            el('span', { style: 'font-weight:var(--fw-semibold);color:var(--ink);text-wrap:pretty', text: e.title }),
            el('span', { class: 'ds-mono', style: 'font-size:var(--text-xs);letter-spacing:.04em;color:var(--ink-3)', text: e.meta }),
            e.own ? chip(e.tone, e.chip) : el('span', { class: 'ds-sectlabel', text: 'ΕΞΩΤΕΡΙΚΗ ΥΠΗΡΕΣΙΑ — ΕΚΤΟΣ ΕΛΕΓΧΟΥ PERSIS.AI' })
          ]);
        })));
      })))
    ]);
    return el('div', { class: 'st-m' }, [
      el('header', { style: 'display:flex;align-items:center;justify-content:space-between;height:var(--topbar-h);padding:0 6px 0 16px;border-bottom:1px solid var(--line)' }, [brand()]),
      main, footer(true)
    ]);
  }

  /* ── θέμα: ❓Σ4 κατά prefers-color-scheme (Παραδοχή 11: κανένα κουμπί στη σελίδα) — εκτός αν ήρθε από την εφαρμογή ── */
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
  var θέμαΧρήστη = θέμαΑπόΕφαρμογή();
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  function applyTheme() {
    var t = θέμαΧρήστη || (mq && mq.matches ? 'dark' : 'light'), b = document.body;
    if (b.getAttribute('data-theme') === t) return;
    b.classList.add('theme-switching'); b.setAttribute('data-theme', t);
    setTimeout(function () { b.classList.remove('theme-switching'); }, 60);
  }
  if (mq && mq.addEventListener) mq.addEventListener('change', applyTheme);

  function render() {
    applyTheme();
    if (state.error) { root.replaceChildren(el('p', { class: 'st-fallback', text: 'Η κατάσταση δεν φορτώθηκε. Δοκιμάστε ξανά σε λίγο ή γράψτε στο ' + ΥΠΟΣΤΗΡΙΞΗ + '.' })); return; }
    if (!state.cur) return;
    var v = vals();
    root.replaceChildren(web(v), mobile(v));
  }

  function φόρτωσε(u, απαραίτητο) {
    return fetch(u, { cache: 'no-cache', credentials: 'omit' }).then(function (r) {
      if (!r.ok) { if (απαραίτητο) throw new Error(String(r.status)); return null; }
      return r.json();
    }).catch(function (e) { if (απαραίτητο) throw e; return null; });
  }
  window.__status = { state: state, vals: vals, render: render };   // για τον φρουρό (Chromium) — καμία άλλη χρήση
  Promise.all([φόρτωσε('./data/current.json', true), φόρτωσε('./data/history.json'), φόρτωσε('./data/events.json'), φόρτωσε('./content.json')])
    .then(function (r) {
      if (!r[0] || r[0].schema !== 1 || !Array.isArray(r[0].services) || !r[0].checked_at) throw new Error('schema');
      state.cur = r[0]; state.his = r[1]; state.ev = r[2]; state.content = r[3]; render();
    })
    .catch(function () { state.error = true; render(); });
  applyTheme();
})();
