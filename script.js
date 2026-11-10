/* ==========================================================================
   WALL·E – Explore the Movie  |  script.js   (plain JavaScript, no libraries)

   HOW IT WORKS
   - The home screen is a planet with one BUBBLE per topic (TOPICS list below).
   - Clicking a bubble opens the TOPIC VIEW. Every topic has its own LAYOUT
     (radial boxes, photo + list, dot carousel, timeline, cards) and its own real photo.
   - To change any text, edit the TOPICS list. Everything else is built from it.
   - Your real photos go in the "images" folder (slide-1 … slide-6, .jpg/.png/.webp).

   MAP OF THIS FILE
   1. TOPICS (content + speaker notes)   2. Helpers   3. World (stars, particles, mood)
   4. Home (bubbles + dotted route)      5. Topic view (core, satellites, lines)
   6. Navigation, notes, fullscreen, keyboard, swipe   7. Start-up
   ========================================================================== */
(() => {
  'use strict';

  /* ---------- 1. TOPICS ----------
     part:  1 = Speaker 1 (gold) · 2 = Speaker 2 (cyan)
     mood:  look of the planet while the topic is open: 'blue' | 'polluted' | 'hope'
     x, y:  position of the bubble on the home map (percent of the screen)
     layout: how the topic is shown (see LAYOUT MACHINERY below).   items: the data points.
     image: your real photo (images/slide-N, no extension).
     notes: the exact script paragraph (shown with the N key)               */
  const INTRO_NOTES = 'Good morning, everyone. Today, we are going to talk about the movie WALL-E.';

  const TOPICS = [
    /* ===================== PART 1 – Movie Summary (Speaker 1) ===================== */
    { id: 'intro', layout: 'split', icon: '🎬', title: 'Introduction', short: 'Introduction', part: 1, mood: 'blue', x: 12, y: 62,
      image: 'images/slide-1',
      imageHint: 'Suggestion: the official WALL·E movie poster or a wide promotional still.',
      items: [
        { icon: '🎬', text: 'Movie: WALL·E' },
        { icon: '🏢', text: 'Pixar Animation Studios' },
        { icon: '📅', text: 'Released in 2008' },
        { icon: '🚀', text: 'Animated Science Fiction Movie' }
      ],
      notes: 'Good morning, everyone. Today, we are going to talk about the movie WALL-E. It is an animated movie made by Pixar. It was released in 2008.' },

    { id: 'story', layout: 'radial', icon: '🌍', title: 'The Story and Main Character', short: 'Story & hero', part: 1, mood: 'polluted', x: 27.6, y: 46,
      image: 'images/slide-2',
      imageHint: 'Suggestion: WALL·E alone on an Earth covered in trash (it will appear inside the big circle).',
      items: [
        { icon: '⏩', text: 'The story takes place in the future.' },
        { icon: '🗑️', text: 'Earth is full of trash.' },
        { icon: '🛰️', text: 'Humans live in a spaceship called the Axiom.' },
        { icon: '🤖', text: 'WALL·E is a robot that cleans the Earth.' },
        { icon: '💛', text: 'He is curious, friendly, and collects objects.' }
      ],
      notes: 'The story takes place in the future. Earth is full of trash, so humans have left the planet and now live in a large spaceship. The main character is WALL-E, a small robot whose job is to clean the Earth. He works alone every day, collecting and organizing garbage. Even though he is a robot, he is curious, friendly, and has feelings. He also likes to collect small objects that he finds.' },

    { id: 'eve', layout: 'timeline', icon: '💙', title: 'WALL·E Meets EVE', short: 'Meets EVE', part: 1, mood: 'hope', x: 43.2, y: 62,
      image: 'images/slide-3',
      imageHint: 'Suggestion: WALL·E and EVE together, or WALL·E showing the small green plant.',
      items: [
        { icon: '💫', label: 'EVE arrives', text: 'EVE is a modern robot.' },
        { icon: '💙', label: 'Friendship', text: 'WALL·E wants to be her friend.' },
        { icon: '🌱', label: 'The plant', text: 'He shows her a small green plant.' },
        { icon: '🌍', label: 'Hope', text: 'The plant represents hope for Earth.' },
        { icon: '🚀', label: 'The Axiom', text: 'WALL·E follows EVE to the Axiom.' }
      ],
      notes: 'One day, a modern robot named EVE arrives on Earth. WALL-E becomes interested in her and wants to be her friend. He shows her a small green plant that he has found. The plant is very important because it could mean that life can return to Earth. EVE takes the plant and returns to a spaceship called the Axiom. WALL-E follows her, and this takes him on a big adventure. On the spaceship, he discovers how humans live in the future. Now my partner is going to talk about our opinion of the movie and its message.' },

    /* ===================== PART 2 – Opinion and Message (Speaker 2) ===================== */
    { id: 'opinion', layout: 'cards', flip: true, icon: '👍', title: 'Our Opinion', short: 'Our opinion', part: 2, mood: 'blue', x: 58.8, y: 46,
      image: 'images/slide-4',
      imageHint: 'Suggestion: a favorite scene of WALL·E and EVE (for example, their dance in space).',
      items: [
        { icon: '😄', text: 'Funny, beautiful, and touching movie.' },
        { icon: '🤝', text: "Our favorite part is WALL·E and EVE's relationship." },
        { icon: '🎵', text: 'Beautiful animation and music.' },
        { icon: '💫', text: 'Shows friendship and teamwork.' },
        { icon: '🐢', text: 'The beginning is a little slow.' }
      ],
      notes: 'We really liked this movie because it is funny, beautiful, and also very touching. Our favorite part is the relationship between WALL-E and EVE. They are very different robots, but they help each other and learn to work as a team. We also liked the animation and the music because they make the story more interesting. Another good thing is that the movie can make people feel many emotions, even though there is not a lot of dialogue in some parts. However, one thing we did not like is that the beginning can feel a little slow. Still, the story becomes more exciting as WALL-E\'s adventure continues.' },

    { id: 'message', layout: 'carousel', icon: '♻️', title: "The Movie's Message", short: 'The message', part: 2, mood: 'polluted', x: 74.4, y: 62,
      image: 'images/slide-5',
      imageHint: 'Suggestion: the Earth covered in trash, or the small green plant growing.',
      items: [
        { icon: '♻️', text: 'We must take care of our planet.' },
        { icon: '🗑️', text: 'Too much trash can destroy the environment.' },
        { icon: '📱', text: 'We should not depend too much on technology.' },
        { icon: '💚', text: 'Friendship, love, and helping others are important.' },
        { icon: '🌱', text: 'The plant represents hope.' }
      ],
      action: { label: '💚 Take care of our planet', done: '✨ The planet is healing!', mood: 'hope' },
      notes: 'We think the most important message is that we must take care of our planet. The movie shows what can happen when people produce too much trash and depend too much on technology. It also reminds us that friendship, love, and helping others are important.' },

    { id: 'recommend', layout: 'split', flip: true, icon: '⭐', title: 'Recommendation and Conclusion', short: 'Recommend', part: 2, mood: 'hope', x: 90, y: 46,
      image: 'images/slide-6',
      imageHint: 'Suggestion: a happy final image, such as WALL·E and EVE together or the plant on a green Earth.',
      items: [
        { icon: '🌟', text: 'We recommend WALL·E to everyone.' },
        { icon: '👪', text: 'Suitable for children, teenagers, and adults.' },
        { icon: '🍿', text: 'Entertaining and meaningful story.' },
        { icon: '🤔', text: 'Makes us think about our future.' },
        { icon: '⭐', text: 'A special movie with a beautiful message.' }
      ],
      footer: 'Thank you for listening! 💚', confetti: true,
      notes: 'We definitely recommend WALL-E to children, teenagers, and adults. It is an entertaining movie, but it also makes us think about our future and our environment. In conclusion, WALL-E is a special movie with a beautiful message, and we think it is worth watching. Thank you for listening.' }
  ];

  /* ---------- 2. HELPERS ---------- */
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const isNarrow = () => window.matchMedia('(max-width: 720px)').matches;

  const home = $('#home');
  const topicView = $('#topicView');
  const core = $('#core');
  const satsBox = $('#sats');
  const links = $('#links');
  const notesPanel = $('#notesPanel');
  const notesBtn = $('#notesBtn');

  let view = -1;                  // -1 = home map, 0..8 = open topic
  const visited = new Set();      // topics already explored

  /* ---------- 3. THE WORLD ---------- */
  function buildStars() {
    $$('.star-layer').forEach((layer) => {
      const count = Number(layer.dataset.count) || 20;
      const size = (Number(layer.dataset.size) || 2) * ((parseFloat(getComputedStyle(document.documentElement).fontSize) || 16) / 16);   // bigger stars on TVs
      layer.style.setProperty('--px', `${layer.dataset.px || 5}px`);
      const frag = document.createDocumentFragment();
      for (let i = 0; i < count; i++) {
        const s = document.createElement('span');
        s.className = 'star';
        s.style.left = `${Math.random() * 100}%`;
        s.style.top = `${Math.random() * 100}%`;
        s.style.width = s.style.height = `${size * (0.7 + Math.random() * 0.6)}px`;
        s.style.setProperty('--t', `${2 + Math.random() * 4}s`);
        s.style.setProperty('--d', `${-Math.random() * 5}s`);
        frag.append(s);
      }
      layer.append(frag);
    });
  }

  function buildParticles() {
    const sets = [
      ['.junk',   ['🥫', '📦', '🍾', '🧴', '🛒', '📰', '🥤', '👟']],
      ['.spores', ['🌱', '✨', '🌿', '💚', '✨', '🍃', '🌱', '✨']]
    ];
    sets.forEach(([sel, list]) => {
      const box = $(sel);
      list.forEach((emoji, i) => {
        const s = document.createElement('span');
        s.textContent = emoji;
        s.style.left = `${6 + i * 12.5 + (i % 2) * 3}%`;
        s.style.top = `${44 + ((i * 17) % 5) * 4}%`;
        s.style.setProperty('--d', `${6 + (i % 4) * 1.5}s`);
        s.style.setProperty('--delay', `${-i * 0.9}s`);
        box.append(s);
      });
    });
  }

  function setMood(mood) { document.body.dataset.mood = mood; }

  /* ---------- 4. HOME: bubbles + dotted route ---------- */
  function buildMap() {
    const map = $('#map');
    TOPICS.forEach((t, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'bubble';
      b.dataset.part = t.part;
      b.dataset.index = i;
      b.style.setProperty('--x', `${t.x}%`);
      b.style.setProperty('--y', `${t.y}%`);
      b.style.setProperty('--bob', `${4.2 + (i % 4) * 0.7}s`);
      b.style.setProperty('--bd', `${-i * 0.6}s`);
      b.setAttribute('aria-label', `Topic ${i + 1}: ${t.title} (Speaker ${t.part})`);
      b.innerHTML = `<span class="bubble-num">${i + 1}</span><span class="bubble-icon"></span><span class="bubble-title"></span>`;
      $('.bubble-icon', b).textContent = t.icon;
      $('.bubble-title', b).textContent = t.short || t.title;
      b.addEventListener('click', () => openTopic(i));
      map.append(b);
    });
  }

  // Dotted constellation joining the bubbles in speaking order
  function buildOrbit() {
    const svg = $('#orbit');
    const pts = (from, to) => TOPICS.slice(from, to).map((t) => `${t.x},${t.y}`).join(' ');
    const mid = TOPICS.findIndex((t) => t.part === 2);        // first bubble of Part 2
    [['o1', pts(0, mid)], ['o3', `${TOPICS[mid - 1].x},${TOPICS[mid - 1].y} ${TOPICS[mid].x},${TOPICS[mid].y}`], ['o2', pts(mid, TOPICS.length)]]
      .forEach(([cls, points]) => {
        const pl = document.createElementNS(SVG_NS, 'polyline');
        pl.setAttribute('class', cls);
        pl.setAttribute('points', points);
        svg.append(pl);
      });
  }

  /* ---------- 5. TOPIC VIEW ---------- */
  function openTopic(i, silent) {
    const t = TOPICS[i];
    // where does the core fly in from? (the bubble that was clicked)
    const bubble = $(`.bubble[data-index="${i}"]`);
    const br = bubble.getBoundingClientRect();

    view = i;
    visited.add(i);
    document.body.dataset.view = 'topic';
    home.classList.add('away');
    home.setAttribute('inert', '');

    topicView.classList.remove('open');
    void topicView.offsetWidth;                       // restart the CSS animations
    topicView.dataset.part = t.part;
    renderTopic(t);
    const cr = core.getBoundingClientRect();           // the core flies in from the clicked bubble
    core.style.setProperty('--fx', `${br.left + br.width / 2 - (cr.left + cr.width / 2)}px`);
    core.style.setProperty('--fy', `${br.top + br.height / 2 - (cr.top + cr.height / 2)}px`);
    topicView.removeAttribute('inert');
    topicView.classList.add('open');

    setMood(t.mood);
    if (!silent) markVisited();
    updateHud();
    updateNotes();
    syncConfetti(t);
  }

  function goHome() {
    runCleanup();
    view = -1;
    document.body.dataset.view = 'home';
    topicView.classList.remove('open');
    topicView.setAttribute('inert', '');
    home.classList.remove('away');
    home.removeAttribute('inert');
    setMood('blue');
    stopConfetti();
    markVisited();
    updateHud();
    updateNotes();
  }

  function markVisited() {
    $$('.bubble').forEach((b) => b.classList.toggle('visited', visited.has(Number(b.dataset.index))));
  }

  /* ----- LAYOUT MACHINERY -----
     Every topic chooses a layout with  layout: '...'  in the TOPICS list:
       radial    big circle (with your photo) + boxes around it, joined by lines
       split     photo + list of points            (flip: true puts the photo on the right)
       carousel  photo + slides with dots, arrows and swipe
       timeline  photo banner + route with a travelling rocket
       cards     photo + big cards
     To add a new layout, add a function to LAYOUTS below.

     REAL IMAGES: each topic has  image: 'images/slide-N'  (no extension).
     Put your file in the "images" folder named slide-1.jpg … slide-6.jpg (.jpg .jpeg .png .webp work).
     While the file does not exist, a dashed "Your image goes here" frame is shown.              */
  const stageBox = $('#stageBox');
  let lastLayout = '';
  let inner = null;       // { next(), prev() } -> the ↑ / ↓ keys move INSIDE carousel / timeline
  let cleanup = null;     // stops timers when a topic closes
  const LAYOUTS = {};

  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const rise = (node, i) => { node.classList.add('rise'); node.style.setProperty('--i', i); return node; };   // entrance animation
  const checkMark = () => { const c = el('span', 'sat-check', '✔'); c.setAttribute('aria-hidden', 'true'); return c; };
  const toggleLit = (node) => { const on = node.classList.toggle('lit'); node.setAttribute('aria-pressed', String(on)); return on; };
  const mount = (...nodes) => { const col = el('div', 'stage-col'); col.append(...nodes); stageBox.append(col); return col; };
  function runCleanup() { if (cleanup) { cleanup(); cleanup = null; } inner = null; }

  /* ----- REAL IMAGES ----- */
  const PHOTO_EXTS = ['jpg', 'jpeg', 'png', 'webp'];
  const photoCache = {};
  // Looks for images/slide-N.jpg / .jpeg / .png / .webp and resolves with the first one that exists (or null)
  function findPhoto(base) {
    if (!base) return Promise.resolve(null);
    if (!photoCache[base]) {
      photoCache[base] = new Promise((resolve) => {
        const list = /\.\w{3,4}$/.test(base) ? [base] : PHOTO_EXTS.map((x) => `${base}.${x}`);
        let i = 0;
        const tryNext = () => {
          if (i >= list.length) return resolve(null);
          const img = new Image();
          img.onload = () => resolve(img.src);
          img.onerror = tryNext;
          img.src = list[i++];
        };
        tryNext();
      });
    }
    return photoCache[base];
  }

  // A framed photo. Shows a placeholder until the real image is found.
  function photoFrame(t, extra) {
    const fig = el('figure', `photo${extra ? ' ' + extra : ''}`);
    const empty = el('div', 'photo-empty');
    empty.append(el('span', 'photo-empty-icon', '🖼️'), el('strong', null, 'Your image goes here'),
      el('code', null, `${t.image}.jpg`), el('span', 'photo-empty-hint', t.imageHint || ''));
    fig.append(empty);
    findPhoto(t.image).then((url) => {
      if (!url || !fig.isConnected) return;
      const img = new Image();
      img.alt = t.imageAlt || t.title;
      img.draggable = false;
      img.src = url;
      fig.prepend(img);
      fig.classList.add('loaded');
    });
    return rise(fig, 0);
  }

  // Build the core bubble + the content for one topic
  function renderTopic(t) {
    runCleanup();
    const layout = LAYOUTS[t.layout] ? t.layout : 'radial';
    if (lastLayout) topicView.classList.remove(`layout-${lastLayout}`);
    lastLayout = layout;
    topicView.classList.add(`layout-${layout}`);
    topicView.classList.remove('stack');
    topicView.classList.toggle('flip', Boolean(t.flip));
    topicView.classList.toggle('has-foot', Boolean(t.footer || t.action));   // leave room for the bottom button / thank-you line

    core.dataset.part = t.part;
    core.classList.remove('has-photo');
    core.style.removeProperty('--photo');
    core.replaceChildren(el('span', 'core-icon', t.icon), el('h2', 'core-title', t.title));
    satsBox.replaceChildren(); links.replaceChildren(); stageBox.replaceChildren();
    const radial = layout === 'radial';
    satsBox.toggleAttribute('hidden', !radial);
    links.toggleAttribute('hidden', !radial);
    stageBox.toggleAttribute('hidden', radial);

    // footer: optional action button (planet healing) and closing line
    const actionBtn = $('#actionBtn');
    actionBtn.hidden = !t.action;
    if (t.action) { actionBtn.disabled = false; actionBtn.textContent = t.action.label; }
    const foot = $('#footLine');
    foot.hidden = !t.footer;
    foot.textContent = t.footer || '';

    LAYOUTS[layout](t);
    if (radial) layoutTopic();
    fitStage();
    setTimeout(() => { if (TOPICS[view] === t) fitStage(); }, 400);    // once fonts / images have settled
  }

  // Small PC screens: shrink the content a little so it ALWAYS fits and no vertical scroll bar appears.
  // (On phones, <= 720 px wide, the content scrolls instead so the text stays readable.)
  function fitStage() {
    if (view < 0) return;
    const stack = topicView.classList.contains('stack');
    const useBox = !stageBox.hidden;
    const els = useBox ? [stageBox.firstElementChild] : (stack ? [core, satsBox] : []);
    els.forEach((e) => { if (e) e.style.zoom = ''; });
    if (!els.length || !els[0] || window.innerWidth <= 720) return;

    const measure = () => {
      if (useBox) {
        return { need: els[0].getBoundingClientRect().height, avail: stageBox.clientHeight };
      }
      const cs = getComputedStyle(topicView);
      const avail = topicView.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      return { need: satsBox.getBoundingClientRect().bottom - core.getBoundingClientRect().top, avail };
    };
    let z = 1;
    for (let i = 0; i < 12; i++) {
      const { need, avail } = measure();
      if (need <= avail + 1 || z <= 0.45) break;
      z = Math.max(0.45, z * (avail / need) * 0.985);
      els.forEach((e) => { e.style.zoom = String(z); });
    }
  }

  /* ----- LAYOUT: radial (the photo goes INSIDE the big circle; boxes around it) ----- */
  LAYOUTS.radial = (t) => {
    core.append(el('span', 'core-hint', `🖼️ ${t.image}.jpg`));
    findPhoto(t.image).then((url) => {
      if (!url || TOPICS[view] !== t) return;
      core.style.setProperty('--photo', `url("${url}")`);
      core.classList.add('has-photo');
    });
    t.items.forEach((it, k) => {
      const s = el('button', 'sat');
      s.type = 'button';
      s.style.setProperty('--i', k);
      s.setAttribute('aria-pressed', 'false');
      s.append(el('span', 'sat-icon', it.icon), el('span', 'sat-text', it.text), checkMark());
      s.addEventListener('click', () => toggleLit(s));     // click = "already said" (lights up)
      satsBox.append(s);
    });
  };

  // Places the boxes around the core. If they do not fit the screen (small window,
  // phone, big text) it falls back to a clean vertical list automatically.
  function layoutTopic() {
    const t = TOPICS[view];
    if (!t || (t.layout || 'radial') !== 'radial') return;
    const vw = window.innerWidth, vh = window.innerHeight;
    const u = (parseFloat(getComputedStyle(document.documentElement).fontSize) || 16) / 16;   // TV scale (1 = normal)
    links.replaceChildren();
    topicView.classList.remove('stack');                     // measure in radial mode first
    const sats = $$('.sat', satsBox);

    const ANGLES = {                                         // degrees, 0 = right, clockwise
      1: [-90], 2: [195, -15], 3: [-90, 30, 150], 4: [-135, -45, 45, 135], 5: [-90, -18, 54, 126, 198]
    };
    const angles = ANGLES[sats.length] || sats.map((_, k) => -90 + (360 / sats.length) * k);
    const cx = vw / 2, cy = vh * 0.47;                       // centre of the core (see .core in CSS)
    const cardW = sats[0] ? sats[0].offsetWidth : 200;
    const cardH = sats.reduce((m, s) => Math.max(m, s.offsetHeight), 70);
    const coreR = core.offsetWidth / 2;

    const rx = Math.min(vw * 0.34, vw / 2 - cardW / 2 - 14 * u);
    let ry = Math.min(vh * 0.31, 270 * u);
    ry = Math.min(ry, cy - 64 * u - cardH / 2, vh - 86 * u - cardH / 2 - cy);
    ry = Math.max(ry, coreR + cardH / 2 + 10 * u);
    const plan = angles.map((deg) => ({ x: cx + Math.cos((deg * Math.PI) / 180) * rx, y: cy + Math.sin((deg * Math.PI) / 180) * ry }));

    if (vw < 860 * u || vh < 480 * u || !fitsRadial(plan, cardW, cardH, vw, vh, cx, cy, coreR, u)) {
      topicView.classList.add('stack');
      sats.forEach((s) => { s.style.left = ''; s.style.top = ''; s.style.setProperty('--fx', '0px'); s.style.setProperty('--fy', '-60px'); });
      return;
    }

    sats.forEach((s, k) => {
      const { x: sx, y: sy } = plan[k];
      s.style.left = `${sx}px`;
      s.style.top = `${sy}px`;
      s.style.setProperty('--fx', `${cx - sx}px`);           // boxes fly out from the core
      s.style.setProperty('--fy', `${cy - sy}px`);

      const mx = (cx + sx) / 2, my = (cy + sy) / 2;          // curved line core -> box
      const len = Math.hypot(sx - cx, sy - cy) || 1;
      const bend = (k % 2 ? 1 : -1) * len * 0.1;
      const qx = mx + (-(sy - cy) / len) * bend;
      const qy = my + ((sx - cx) / len) * bend;
      const path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('class', 'link');
      path.setAttribute('pathLength', '1');
      path.setAttribute('d', `M${cx} ${cy} Q${qx} ${qy} ${sx} ${sy}`);
      path.style.setProperty('--i', k);
      links.append(path);
    });
    links.setAttribute('viewBox', `0 0 ${vw} ${vh}`);
  }

  // true when every box is on screen, clear of the bars, the core and the other boxes
  function fitsRadial(plan, w, h, vw, vh, cx, cy, coreR, u = 1) {
    const M = 8 * u;
    for (const p of plan) {
      const l = p.x - w / 2, r = p.x + w / 2, tp = p.y - h / 2, b = p.y + h / 2;
      if (l < M || r > vw - M || tp < 58 * u || b > vh - 78 * u) return false;
      const dx = Math.max(l - cx, 0, cx - r), dy = Math.max(tp - cy, 0, cy - b);
      if (Math.hypot(dx, dy) < coreR + 6 * u) return false;
    }
    for (let i = 0; i < plan.length; i++) {
      for (let j = i + 1; j < plan.length; j++) {
        if (Math.abs(plan[i].x - plan[j].x) < w + M && Math.abs(plan[i].y - plan[j].y) < h + M) return false;
      }
    }
    return true;
  }

  /* ----- LAYOUT: split (photo + list of points) ----- */
  LAYOUTS.split = (t) => {
    const wrap = el('div', `split${t.flip ? ' flip' : ''}`);
    const list = el('ul', 'biglist');
    t.items.forEach((it, k) => {
      const li = el('li');
      const b = rise(el('button', 'row'), k + 1);
      b.type = 'button';
      b.setAttribute('aria-pressed', 'false');
      b.append(el('span', 'row-icon', it.icon), el('span', 'row-text', it.text), checkMark());
      b.addEventListener('click', () => toggleLit(b));
      li.append(b);
      list.append(li);
    });
    wrap.append(photoFrame(t), list);
    mount(wrap);
  };

  /* ----- LAYOUT: cards (photo + big cards you can mark as "said") ----- */
  LAYOUTS.cards = (t) => {
    const wrap = el('div', `split${t.flip ? ' flip' : ''}`);
    const grid = el('div', 'fgrid');
    t.items.forEach((it, k) => {
      const c = rise(el('button', 'fcard'), k + 1);
      c.type = 'button';
      c.setAttribute('aria-pressed', 'false');
      c.append(el('span', 'fcard-icon', it.icon), el('span', 'fcard-title', it.text), checkMark());
      c.addEventListener('click', () => toggleLit(c));
      grid.append(c);
    });
    wrap.append(photoFrame(t), grid);
    mount(wrap, el('p', 'hint', 'Click a card to mark it as said'));
  };

  /* ----- LAYOUT: carousel (photo + slides with dots, arrows, swipe; ↑ ↓ keys too) ----- */
  LAYOUTS.carousel = (t) => {
    const n = t.items.length;
    let idx = 0;
    const car = rise(el('div', 'carousel'), 1);
    const prev = el('button', 'car-arrow', '‹'); prev.type = 'button'; prev.setAttribute('aria-label', 'Previous slide');
    const next = el('button', 'car-arrow', '›'); next.type = 'button'; next.setAttribute('aria-label', 'Next slide');
    const view = el('div', 'car-viewport');
    const track = el('div', 'car-track');
    const slides = t.items.map((it, k) => {
      const s = el('article', 'car-slide');
      s.append(el('span', 'car-count', `${k + 1} / ${n}`), el('span', 'car-emoji', it.icon), el('p', 'car-text', it.text));
      track.append(s);
      return s;
    });
    view.append(track);
    const dotsRow = el('div', 'car-dots');
    const dots = t.items.map((it, k) => {
      const d = el('button', 'car-dot'); d.type = 'button';
      d.setAttribute('aria-label', `Go to slide ${k + 1}`);
      d.addEventListener('click', () => go(k));
      dotsRow.append(d);
      return d;
    });
    car.append(prev, view, next, dotsRow);

    function go(i) {
      idx = clamp(i, 0, n - 1);
      track.style.transform = `translateX(${-idx * 100}%)`;
      slides.forEach((s, k) => s.classList.toggle('on', k === idx));
      dots.forEach((d, k) => d.setAttribute('aria-current', String(k === idx)));
      prev.disabled = idx === 0;
      next.disabled = idx === n - 1;
    }
    prev.addEventListener('click', () => go(idx - 1));
    next.addEventListener('click', () => go(idx + 1));
    inner = { next: () => go(idx + 1), prev: () => go(idx - 1) };

    // swipe inside the carousel moves the slides (and does NOT change the topic)
    let sx = 0, sy = 0;
    view.addEventListener('touchstart', (e) => { e.stopPropagation(); sx = e.changedTouches[0].clientX; sy = e.changedTouches[0].clientY; }, { passive: true });
    view.addEventListener('touchend', (e) => {
      e.stopPropagation();
      const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(idx + (dx < 0 ? 1 : -1));
    }, { passive: true });

    const wrap = el('div', `split${t.flip ? ' flip' : ''}`);
    const right = el('div', 'car-col');
    right.append(car, el('p', 'hint', 'Use the arrows, the dots, swipe, or the ↑ ↓ keys'));
    wrap.append(photoFrame(t), right);
    mount(wrap);
    go(0);
  };

  /* ----- LAYOUT: timeline (photo banner + route with a travelling rocket) ----- */
  LAYOUTS.timeline = (t) => {
    const n = t.items.length;
    let idx = 0, timer = null;
    const tl = rise(el('div', 'timeline'), 1);
    tl.style.setProperty('--n', n);
    const track = el('div', 'tl-track');
    const prog = el('div', 'tl-progress');
    const rocket = el('div', 'tl-rocket', '🚀');
    track.append(prog, rocket);
    const ol = el('ol', 'tl-stops');
    const stops = t.items.map((it, k) => {
      const li = el('li');
      const b = el('button', 'tl-stop'); b.type = 'button'; b.setAttribute('aria-pressed', 'false');
      const copy = el('span', 'tl-copy'); copy.append(el('strong', 'tl-label', it.label || ''), el('span', 'tl-text', it.text));
      b.append(el('span', 'tl-icon', it.icon), copy);
      b.addEventListener('click', () => { stopPlay(); setStop(k); });
      li.append(b); ol.append(li);
      return b;
    });
    tl.append(track, ol);
    const replay = el('button', 'mini-btn', '↺ Replay the route'); replay.type = 'button';
    mount(photoFrame(t, 'banner'), tl, replay, el('p', 'hint', 'Click a stop, or use the ↑ ↓ keys'));

    function setStop(i) {
      idx = clamp(i, 0, n - 1);
      const pct = n > 1 ? (idx / (n - 1)) * 100 : 0;
      prog.style.width = `${pct}%`;
      rocket.style.left = `${pct}%`;
      stops.forEach((s, k) => { s.setAttribute('aria-pressed', String(k === idx)); s.classList.toggle('done', k < idx); });
    }
    function stopPlay() { clearInterval(timer); timer = null; }
    function play() {
      stopPlay(); setStop(0);
      if (prefersReduced) { setStop(n - 1); return; }
      let k = 0;
      timer = setInterval(() => { k++; if (k >= n) { stopPlay(); return; } setStop(k); }, 1500);
    }
    replay.addEventListener('click', play);
    inner = { next: () => { stopPlay(); setStop(idx + 1); }, prev: () => { stopPlay(); setStop(idx - 1); } };
    cleanup = stopPlay;
    setStop(0);
    setTimeout(() => { if (tl.isConnected && TOPICS[view] === t) play(); }, 900);   // plays once when the topic opens
  };

  // "Take care of our planet" button (topic 5)
  function initAction() {
    $('#actionBtn').addEventListener('click', (e) => {
      const t = TOPICS[view];
      if (!t || !t.action) return;
      setMood(t.action.mood);
      e.currentTarget.textContent = t.action.done;
      e.currentTarget.disabled = true;
    });
  }

  // Falling emojis on the last topic
  function syncConfetti(t) { t.confetti ? startConfetti() : stopConfetti(); }
  function startConfetti() {
    if (prefersReduced) return;
    const box = $('#confetti');
    box.replaceChildren();
    const symbols = ['⭐', '🌱', '✨', '💚', '♻️', '🌍'];
    for (let i = 0; i < 30; i++) {
      const s = document.createElement('span');
      s.textContent = symbols[i % symbols.length];
      s.style.setProperty('--x', `${Math.random() * 100}%`);
      s.style.setProperty('--s', `${1 + Math.random() * 1.3}rem`);
      s.style.setProperty('--d', `${7 + Math.random() * 6}s`);
      s.style.setProperty('--delay', `${-Math.random() * 10}s`);
      box.append(s);
    }
  }
  function stopConfetti() { $('#confetti').replaceChildren(); }

  /* ---------- 6. NAVIGATION, NOTES, FULLSCREEN, KEYBOARD, SWIPE ---------- */
  const dotsBox = $('#dots');
  function buildDots() {
    TOPICS.forEach((t, i) => {
      const d = document.createElement('button');
      d.type = 'button';
      d.className = 'dot';
      d.dataset.part = t.part;
      d.setAttribute('aria-label', `Topic ${i + 1}: ${t.title}`);
      d.addEventListener('click', () => openTopic(i));
      dotsBox.append(d);
    });
  }

  function updateHud() {
    const badge = $('#badge');
    if (view < 0) {
      badge.textContent = '🌍 Interactive map';
      badge.dataset.part = '0';
    } else {
      const t = TOPICS[view];
      badge.textContent = `Speaker ${t.part} – Part ${t.part} · ${view + 1}/${TOPICS.length}`;
      badge.dataset.part = String(t.part);
    }
    $('#mapBtn').hidden = view < 0;
    $('#prevBtn').disabled = view < 0;
    $('#nextBtn').disabled = view === TOPICS.length - 1;
    $$('.dot').forEach((d, i) => {
      d.setAttribute('aria-current', String(i === view));
      d.classList.toggle('visited', visited.has(i));
    });
    document.documentElement.style.setProperty('--slide-index', view + 1);   // star parallax
  }

  function next() { view < 0 ? openTopic(0) : view < TOPICS.length - 1 && openTopic(view + 1); }
  function prev() { view === 0 ? goHome() : view > 0 && openTopic(view - 1); }

  function updateNotes() {
    const t = TOPICS[view];
    $('#notesTitle').textContent = t ? `Speaker ${t.part} · ${t.title}` : 'Speaker 1 · Introduction';
    $('#notesText').textContent = t ? t.notes : INTRO_NOTES;
  }
  function toggleNotes() {
    const show = notesPanel.hidden;
    notesPanel.hidden = !show;
    notesBtn.setAttribute('aria-pressed', String(show));
  }

  function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        const p = document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
        if (p && p.catch) p.catch(() => {});
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    } catch (_) { /* not available */ }
  }

  function initKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target;
      if (t.isContentEditable) return;                           // typing a speaker name

      const k = e.key.toLowerCase();
      if (k === 'f') { e.preventDefault(); toggleFullscreen(); return; }
      if (k === 'n') { e.preventDefault(); toggleNotes(); return; }
      if (e.key === 'Escape' || k === 'm' || e.key === 'Backspace') {
        if (view >= 0) { e.preventDefault(); goHome(); }
        return;
      }
      if (/^[1-9]$/.test(e.key) && Number(e.key) <= TOPICS.length) { openTopic(Number(e.key) - 1); return; }   // jump to a topic

      const onButton = t.matches && t.matches('button, a');
      switch (e.key) {
        case 'ArrowRight': case 'PageDown': e.preventDefault(); next(); break;
        case 'ArrowLeft':  case 'PageUp':   e.preventDefault(); prev(); break;
        case 'ArrowDown': if (inner) { e.preventDefault(); inner.next(); } break;
        case 'ArrowUp':   if (inner) { e.preventDefault(); inner.prev(); } break;
        case ' ': case 'Spacebar':
          if (onButton) return;                                  // Space presses a focused button
          e.preventDefault(); e.shiftKey ? prev() : next(); break;
        default:
      }
    });
  }

  // After a MOUSE click, drop the button focus so Space / arrows keep navigating
  function initClickBlur() {
    document.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (b && e.detail > 0) b.blur();
    });
  }

  function initSwipe() {
    let sx = 0, sy = 0, tracking = false;
    document.addEventListener('touchstart', (e) => {
      if (view < 0) { tracking = false; return; }
      const t = e.changedTouches[0];
      sx = t.clientX; sy = t.clientY; tracking = true;
    }, { passive: true });
    document.addEventListener('touchend', (e) => {
      if (!tracking) return;
      tracking = false;
      const t = e.changedTouches[0];
      const dx = t.clientX - sx, dy = t.clientY - sy;
      if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) (dx < 0 ? next : prev)();
    }, { passive: true });
  }

  /* ---------- 7. START-UP ---------- */
  function init() {
    buildStars();
    buildParticles();
    buildMap();
    buildOrbit();
    buildDots();
    initAction();

    $('#startBtn').addEventListener('click', () => openTopic(0));
    $('#prevBtn').addEventListener('click', prev);
    $('#nextBtn').addEventListener('click', next);
    $('#mapBtn').addEventListener('click', goHome);
    $('#fsBtn').addEventListener('click', toggleFullscreen);
    notesBtn.addEventListener('click', toggleNotes);
    document.addEventListener('fullscreenchange', () => $('#fsBtn').setAttribute('aria-pressed', String(Boolean(document.fullscreenElement))));

    let rz;
    window.addEventListener('resize', () => {                // keep the boxes around the core on resize
      clearTimeout(rz);
      rz = setTimeout(() => { if (view >= 0) { layoutTopic(); fitStage(); } }, 120);
    });

    initKeyboard();
    initClickBlur();
    initSwipe();

    // #3 in the address opens topic 3 directly; otherwise start on the map
    const fromHash = parseInt(location.hash.replace('#', ''), 10);
    if (Number.isFinite(fromHash) && fromHash >= 1 && fromHash <= TOPICS.length) openTopic(fromHash - 1, true);
    else goHome();
  }

  init();
})();
