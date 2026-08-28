// Wise Web — front-end interactivity
// Kept plain JS on purpose: no build step, no framework yet. Every block
// below is independent, so it's a good file to read section by section
// while learning — nothing here depends on anything later in the file.

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollSpy();
  initScrollReveal();
  initContactForm();
  initFooterYear();
});

/* -----------------------------------------------------------------------
   Mobile nav: toggles the menu open/closed and turns the hamburger into
   an X. Closes itself when a link is clicked so the menu never lingers
   after navigation.
------------------------------------------------------------------------ */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  const setOpen = (open) => {
    links.classList.toggle('is-open', open);
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  toggle.addEventListener('click', () => {
    setOpen(!links.classList.contains('is-open'));
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });
}

/* -----------------------------------------------------------------------
   Scroll spy: highlights the nav link for whichever section is currently
   in view, using IntersectionObserver rather than a scroll listener.
------------------------------------------------------------------------ */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[data-nav]');
  if (!sections.length || !navLinks.length) return;

  const linkFor = (id) =>
    document.querySelector(`.nav-links a[href="#${id}"]`);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.remove('is-active'));
        const active = linkFor(entry.target.id);
        if (active) active.classList.add('is-active');
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

/* -----------------------------------------------------------------------
   Scroll reveal: fades sections in as they enter the viewport. The
   'reveal' class is added here, in JS, rather than in the HTML — so if
   JavaScript fails to load, everything just stays visible by default.
------------------------------------------------------------------------ */
function initScrollReveal() {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  if (prefersReducedMotion) return;

  const targets = document.querySelectorAll(
    '.block-head, .svc-card, .pkg-card, .p-step, .contact-grid'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    observer.observe(el);
  });
}

/* -----------------------------------------------------------------------
   Contact form: no backend yet, so this validates and shows a confirmation
   message in place. Swap the body of this function for a real fetch()
   call once the backend API exists.
------------------------------------------------------------------------ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if (!form || !note) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      note.textContent = 'Please fill in your name, email and message.';
      note.className = 'form-note is-error';
      return;
    }

    const name = form.querySelector('#name').value.trim();

    // Placeholder for the real submission (POST to the backend once it exists).
    note.textContent = `Thanks, ${name.split(' ')[0]} — we'll reply within one business day.`;
    note.className = 'form-note is-success';
    form.reset();
  });
}

/* -----------------------------------------------------------------------
   Footer year: keeps the copyright line correct without manual edits.
------------------------------------------------------------------------ */
function initFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
