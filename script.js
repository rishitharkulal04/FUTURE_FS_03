/**
 * BURKHA MAHAL — Dark Luxury Theme
 * script.js
 * Author  : Abhishek Suvarna
 *
 * Features
 * ────────
 * 1. Navbar solidifies on scroll
 * 2. Mobile burger menu (slide-in panel + overlay)
 * 3. Scroll-reveal (.reveal → .in-view)
 * 4. Active nav-link highlight on scroll
 * 5. Back-to-top button
 * 6. Smooth offset-scroll for anchor links (accounts for fixed navbar)
 */

(function () {
  'use strict';

  /* ── Refs ───────────────────────────────────────────────── */
  const navbar   = document.getElementById('navbar');
  const burger   = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  const allLinks = document.querySelectorAll('.nav-link');
  const btt      = document.getElementById('btt');
  const sections = document.querySelectorAll('section[id]');

  /* Elements eligible for scroll-reveal */
  const revealTargets = document.querySelectorAll(
    '.s-head, .about-prose, .about-stats, .svc-card, ' +
    '.contact-info, .contact-map, .reveal'
  );


  /* ── 1. Navbar — solid background on scroll ─────────────── */
  function syncNavbar() {
    navbar.classList.toggle('solid', window.scrollY > 50);
  }


  /* ── 2. Mobile menu ──────────────────────────────────────── */
  let menuOpen = false;

  function openMenu() {
    menuOpen = true;
    navLinks.classList.add('open');
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuOpen = false;
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (burger) {
    burger.addEventListener('click', function () {
      menuOpen ? closeMenu() : openMenu();
    });
  }

  /* Close on nav link click */
  allLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* Close when clicking outside the menu panel */
  document.addEventListener('click', function (e) {
    if (menuOpen &&
        !navLinks.contains(e.target) &&
        !burger.contains(e.target)) {
      closeMenu();
    }
  });

  /* Close on resize to desktop width */
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && menuOpen) closeMenu();
  }, { passive: true });


  /* ── 3. Scroll-reveal ────────────────────────────────────── */
  function revealElements() {
    const threshold = window.innerHeight * 0.88;
    revealTargets.forEach(function (el) {
      if (el.getBoundingClientRect().top < threshold) {
        el.classList.add('in-view');
      }
    });
  }


  /* ── 4. Active nav link ──────────────────────────────────── */
  function updateActiveLink() {
    const offset = (navbar ? navbar.offsetHeight : 70) + 24;
    let current  = '';

    sections.forEach(function (sec) {
      if (window.scrollY >= sec.offsetTop - offset) {
        current = sec.getAttribute('id');
      }
    });

    allLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === '#' + current);
    });
  }


  /* ── 5. Back to Top ──────────────────────────────────────── */
  function syncBtt() {
    if (btt) btt.classList.toggle('show', window.scrollY > 480);
  }

  if (btt) {
    btt.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ── 6. Smooth offset scroll for anchor links ───────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const navH   = navbar ? navbar.offsetHeight : 70;
      const top    = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });


  /* ── Combined scroll handler (passive for performance) ──── */
  function onScroll() {
    syncNavbar();
    syncBtt();
    revealElements();
    updateActiveLink();
  }

  window.addEventListener('scroll', onScroll, { passive: true });


  /* ── Init ───────────────────────────────────────────────── */
  function init() {
    syncNavbar();
    syncBtt();
    revealElements();   /* catch elements already in viewport on load */
    updateActiveLink();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());