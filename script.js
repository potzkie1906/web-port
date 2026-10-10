/* =============================================================================
   PORTFOLIO SCRIPT — Rodrigo B. Alderite Jr.
   -----------------------------------------------------------------------------
   Plain JavaScript, no libraries. Loaded with `defer`, so the HTML is already
   parsed when this runs. Each feature is a small self-contained function.

   Table of contents
     1. Helpers & shared media queries
     2. Theme toggle (dark / light)
     3. Navbar: shrink on scroll, active section, mobile menu
     4. Back-to-top button
     5. Hero typing effect
     6. Scroll-reveal animations
     7. Project card tilt + glow
     8. Custom cursor
     9. Contact form (mailto)
    10. Footer year
    11. Start everything
   ============================================================================= */

'use strict';


/* =============================================================================
   1. HELPERS & SHARED MEDIA QUERIES
   ============================================================================= */
const root = document.documentElement;

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

// Media queries we check (and listen to) in several places
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
const lightSchemeQuery = window.matchMedia('(prefers-color-scheme: light)');

const prefersReducedMotion = () => reducedMotionQuery.matches;

// Small wrapper so older Safari (addListener) and modern browsers both work
function onMediaChange(query, callback) {
  if (query.addEventListener) query.addEventListener('change', callback);
  else query.addListener(callback);
}


/* =============================================================================
   2. THEME TOGGLE
   -----------------------------------------------------------------------------
   - The inline script in <head> already set data-theme before first paint.
   - Clicking the button flips the theme and saves it to localStorage.
   - If the user never chose, we keep following the OS setting live.
   - .theme-transition is added for ~400ms so colors fade smoothly, then
     removed so hover effects aren't slowed down (see styles.css §19).
   ============================================================================= */
const THEME_KEY = 'theme';
const THEME_TRANSITION_MS = 400;
let themeTransitionTimer;

function readSavedTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch (error) {
    return null; // storage can be blocked (private mode, strict settings)
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    /* ignore — the theme still works, it just won't be remembered */
  }
}

function applyTheme(theme, { animate = false } = {}) {
  if (animate && !prefersReducedMotion()) {
    root.classList.add('theme-transition');
    clearTimeout(themeTransitionTimer);
    themeTransitionTimer = setTimeout(() => {
      root.classList.remove('theme-transition');
    }, THEME_TRANSITION_MS + 50);
  }

  root.setAttribute('data-theme', theme);

  // Keep the button label describing what a click will do
  const toggle = $('#theme-toggle');
  if (toggle) {
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }

  // Match the mobile browser UI color to the theme
  const metaTheme = $('meta[name="theme-color"]');
  if (metaTheme) metaTheme.setAttribute('content', theme === 'dark' ? '#0A1200' : '#F5FAE8');
}

function initTheme() {
  const toggle = $('#theme-toggle');
  const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  applyTheme(current); // sync the label + meta tag with what <head> picked

  toggle?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next, { animate: true });
    saveTheme(next);
  });

  // Follow OS changes only while the user hasn't picked a theme themselves
  onMediaChange(lightSchemeQuery, (event) => {
    const saved = readSavedTheme();
    if (saved !== 'light' && saved !== 'dark') {
      applyTheme(event.matches ? 'light' : 'dark', { animate: true });
    }
  });
}


/* =============================================================================
   3. NAVBAR
   ============================================================================= */
function initNavbar() {
  const navbar = $('#navbar');
  const menu = $('#nav-menu');
  const hamburger = $('#hamburger');
  const links = $$('.navbar__link');
  if (!navbar || !menu || !hamburger) return;

  /* ---- 3a. Shrink on scroll (rAF-throttled) ---- */
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      navbar.classList.toggle('is-scrolled', window.scrollY > 20);

      // At the very bottom, highlight the last link (Contact), since the
      // last section may be too short to reach the middle of the screen.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) setActiveLink(links[links.length - 1]?.getAttribute('href').slice(1));

      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- 3b. Active-section highlight with IntersectionObserver ---- */
  function setActiveLink(id) {
    links.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-active', isActive);
      if (isActive) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  if ('IntersectionObserver' in window) {
    // The "band" is a thin strip across the middle of the viewport:
    // whichever section crosses it is the active one.
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveLink(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    $$('main section[id]').forEach((section) => sectionObserver.observe(section));
  }

  /* ---- 3c. Mobile menu ---- */
  const mobileQuery = window.matchMedia('(max-width: 820px)');

  function setMenu(open, { returnFocus = false } = {}) {
    menu.classList.toggle('is-open', open);
    navbar.classList.toggle('menu-is-open', open);
    document.body.classList.toggle('menu-open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open) links[0]?.focus();
    else if (returnFocus) hamburger.focus();
  }

  const isMenuOpen = () => hamburger.getAttribute('aria-expanded') === 'true';

  hamburger.addEventListener('click', () => setMenu(!isMenuOpen()));

  // Close after choosing a link
  links.forEach((link) => link.addEventListener('click', () => {
    if (isMenuOpen()) setMenu(false);
  }));

  // Close with Escape, returning focus to the button
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isMenuOpen()) setMenu(false, { returnFocus: true });
  });

  // Close when clicking outside the navbar
  document.addEventListener('click', (event) => {
    if (isMenuOpen() && !navbar.contains(event.target)) setMenu(false);
  });

  // Close if the screen grows past the mobile breakpoint
  onMediaChange(mobileQuery, (event) => {
    if (!event.matches && isMenuOpen()) setMenu(false);
  });
}


/* =============================================================================
   4. BACK-TO-TOP BUTTON
   The link itself scrolls to #home (CSS smooth scrolling handles the motion and
   is turned off for reduced motion). JS only shows/hides it.
   ============================================================================= */
function initBackToTop() {
  const button = $('#back-to-top');
  if (!button) return;

  const update = () => button.classList.toggle('is-visible', window.scrollY > 600);
  window.addEventListener('scroll', update, { passive: true });
  update();
}


/* =============================================================================
   5. HERO TYPING EFFECT
   Types each role from data-roles, pauses, deletes it, and moves on.
   With reduced motion we simply leave the first role in place.
   ============================================================================= */
function initTyping() {
  const el = $('#typed');
  if (!el) return;

  const roles = (el.dataset.roles || el.textContent).split('|').map((r) => r.trim()).filter(Boolean);
  if (roles.length < 2 || prefersReducedMotion()) return;

  const TYPE_SPEED = 75;    // ms per character typed
  const DELETE_SPEED = 40;  // ms per character deleted
  const HOLD_FULL = 1700;   // pause when a word is complete
  const HOLD_EMPTY = 350;   // pause before typing the next word

  let roleIndex = 0;
  let charIndex = roles[0].length; // the first role is already in the HTML
  let deleting = true;
  let timer;

  function tick() {
    const word = roles[roleIndex];
    charIndex += deleting ? -1 : 1;
    el.textContent = word.slice(0, charIndex);

    let delay = deleting ? DELETE_SPEED : TYPE_SPEED;

    if (!deleting && charIndex === word.length) {
      deleting = true;
      delay = HOLD_FULL;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = HOLD_EMPTY;
    }

    timer = setTimeout(tick, delay);
  }

  timer = setTimeout(tick, HOLD_FULL);

  // If the user turns on reduced motion mid-visit, stop on a full word
  onMediaChange(reducedMotionQuery, (event) => {
    if (event.matches) {
      clearTimeout(timer);
      el.textContent = roles[0];
    }
  });
}


/* =============================================================================
   6. SCROLL-REVEAL
   Elements with .reveal fade/slide in the first time they enter the viewport.
   Siblings get a small staggered delay so groups cascade in.
   ============================================================================= */
function initReveal() {
  const items = $$('.reveal');
  const showAll = () => items.forEach((item) => item.classList.add('is-visible'));

  if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
    showAll();
    return;
  }

  // Stagger: each .reveal gets a delay based on its position among siblings
  items.forEach((item) => {
    const siblings = Array.from(item.parentElement.children).filter((el) => el.classList.contains('reveal'));
    const index = Math.min(siblings.indexOf(item), 5);
    item.style.setProperty('--reveal-delay', `${index * 90}ms`);
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const item = entry.target;
      item.classList.add('is-visible');
      obs.unobserve(item);

      // Drop the delay once revealed so later hover/tilt effects respond instantly
      setTimeout(() => item.style.removeProperty('--reveal-delay'), 1200);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  items.forEach((item) => observer.observe(item));
}


/* =============================================================================
   7. PROJECT CARD TILT + GLOW
   --mx / --my move the glowing border to follow the mouse.
   --rx / --ry tilt the card in 3D (skipped for touch and reduced motion).
   ============================================================================= */
function initProjectCards() {
  const MAX_TILT = 6; // degrees

  $$('.project-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;

      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;  // 0 → 1
      const y = (event.clientY - rect.top) / rect.height;  // 0 → 1

      card.style.setProperty('--mx', `${x * 100}%`);
      card.style.setProperty('--my', `${y * 100}%`);

      if (prefersReducedMotion()) return;
      card.classList.add('is-tilting');
      card.style.setProperty('--ry', `${(x - 0.5) * MAX_TILT * 2}deg`);
      card.style.setProperty('--rx', `${(0.5 - y) * MAX_TILT * 2}deg`);
    });

    card.addEventListener('pointerleave', () => {
      card.classList.remove('is-tilting');
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}


/* =============================================================================
   8. CUSTOM CURSOR
   -----------------------------------------------------------------------------
   - The dot jumps straight to the mouse position.
   - The ring "chases" it: every animation frame it moves a fraction of the
     remaining distance (linear interpolation, or "lerp"). That fraction is
     adjusted for frame time, so it feels the same at 60Hz and 144Hz.
   - The loop stops itself when the ring has caught up, to save battery.
   - Only enabled for real mouse users without reduced motion; otherwise the
     normal cursor is used. It re-checks if those settings change.
   ============================================================================= */
function initCursor() {
  const dot = $('.cursor-dot');
  const ring = $('.cursor-ring');
  if (!dot || !ring) return;

  const EASE = 0.18; // fraction of the gap closed per 60fps frame (0–1)
  const HOVER_TARGETS = 'a, button, label, .project-card, .tag, [data-cursor="hover"]';
  const TEXT_TARGETS = 'input, textarea, select, [contenteditable="true"]';

  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const ringPos = { x: mouse.x, y: mouse.y };
  let rafId = null;
  let lastTime = 0;
  let enabled = false;
  let hasMoved = false;

  const lerp = (start, end, amount) => start + (end - start) * amount;

  function render(time) {
    // Frame-rate independent easing
    const dt = lastTime ? Math.min(time - lastTime, 64) : 16.67;
    lastTime = time;
    const amount = 1 - Math.pow(1 - EASE, dt / 16.67);

    ringPos.x = lerp(ringPos.x, mouse.x, amount);
    ringPos.y = lerp(ringPos.y, mouse.y, amount);
    ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;

    // Keep animating until the ring is (almost) on top of the dot
    if (Math.abs(mouse.x - ringPos.x) > 0.1 || Math.abs(mouse.y - ringPos.y) > 0.1) {
      rafId = requestAnimationFrame(render);
    } else {
      rafId = null;
      lastTime = 0;
    }
  }

  function startLoop() {
    if (rafId === null) rafId = requestAnimationFrame(render);
  }

  /* ---- Event handlers ---- */
  function onMouseMove(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;

    if (!hasMoved) {
      // First movement: snap the ring into place instead of flying in from the center
      hasMoved = true;
      ringPos.x = mouse.x;
      ringPos.y = mouse.y;
      dot.classList.remove('is-hidden');
      ring.classList.remove('is-hidden');
    }
    startLoop();
  }

  function onMouseOver(event) {
    const target = event.target instanceof Element ? event.target : null;
    const overText = !!target?.closest(TEXT_TARGETS);
    const overHover = !overText && !!target?.closest(HOVER_TARGETS);

    ring.classList.toggle('is-hovering', overHover);
    dot.classList.toggle('is-hovering', overHover);
    // Over text fields the native I-beam is shown instead
    ring.classList.toggle('is-hidden', overText);
    dot.classList.toggle('is-hidden', overText);
  }

  function onMouseDown(event) {
    if (event.button !== 0) return;
    ring.classList.add('is-pressed');

    // Click pulse: a short-lived ring that expands from the click point
    const pulse = document.createElement('span');
    pulse.className = 'cursor-pulse';
    pulse.setAttribute('aria-hidden', 'true');
    pulse.style.setProperty('--x', `${event.clientX}px`);
    pulse.style.setProperty('--y', `${event.clientY}px`);
    pulse.addEventListener('animationend', () => pulse.remove());
    document.body.appendChild(pulse);
  }

  function onMouseUp() {
    ring.classList.remove('is-pressed');
  }

  function onLeaveWindow() {
    dot.classList.add('is-hidden');
    ring.classList.add('is-hidden');
    hasMoved = false;
  }

  /* ---- Enable / disable ---- */
  function enable() {
    if (enabled) return;
    enabled = true;
    hasMoved = false;
    dot.classList.add('is-hidden');   // stay hidden until the mouse moves
    ring.classList.add('is-hidden');
    root.classList.add('has-custom-cursor');

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseleave', onLeaveWindow);
  }

  function disable() {
    if (!enabled) return;
    enabled = false;
    root.classList.remove('has-custom-cursor');
    if (rafId !== null) cancelAnimationFrame(rafId);
    rafId = null;

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseover', onMouseOver);
    document.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mouseup', onMouseUp);
    document.documentElement.removeEventListener('mouseleave', onLeaveWindow);
  }

  const update = () => (finePointerQuery.matches && !prefersReducedMotion() ? enable() : disable());
  update();
  onMediaChange(finePointerQuery, update);
  onMediaChange(reducedMotionQuery, update);
}


/* =============================================================================
   9. CONTACT FORM
   There's no backend, so the form opens the visitor's email app with the
   message pre-filled (a mailto: link). The address comes from data-email.
   ============================================================================= */
function initContactForm() {
  const form = $('#contact-form');
  const status = $('#form-status');
  if (!form || !status) return;

  const recipient = form.dataset.email;
  if (!recipient) return; // no data-email → let the form submit normally (e.g. to Formspree)

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fields = $$('input, textarea', form);
    let firstInvalid = null;

    fields.forEach((field) => {
      const valid = field.value.trim() !== '' && field.checkValidity();
      field.setAttribute('aria-invalid', String(!valid));
      if (!valid && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      status.textContent = 'Please fill in every field with a valid email address.';
      firstInvalid.focus();
      return;
    }

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    status.textContent = 'Opening your email app… If nothing happens, email me directly using the link on the left.';
    form.reset();
    fields.forEach((field) => field.removeAttribute('aria-invalid'));
  });
}


/* =============================================================================
   10. FOOTER YEAR
   ============================================================================= */
function initYear() {
  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());
}


/* =============================================================================
   11. START EVERYTHING
   ============================================================================= */
initTheme();
initNavbar();
initBackToTop();
initTyping();
initReveal();
initProjectCards();
initCursor();
initContactForm();
initYear();
