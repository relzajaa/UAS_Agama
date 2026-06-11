/* ============================================
   THAHARAH — Wudhu & Tayamum
   Interactivity: Navbar, Mobile Menu, FAQ,
   Scroll reveal, Active link, Back to top
   ============================================ */

(function () {
  'use strict';

  // -------- DOM Helpers --------
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initYear();
    initNavbarScroll();
    initMobileMenu();
    initActiveLink();
    initFAQ();
    initRevealOnScroll();
    initBackToTop();
    initReadingProgress();
    initTheme();
    initLoader();
  }

  // -------- Footer Year --------
  function initYear() {
    const el = $('#year');
    if (el) el.textContent = new Date().getFullYear();
  }

  // -------- Navbar shrink on scroll --------
  function initNavbarScroll() {
    const navbar = $('#navbar');
    if (!navbar) return;
    const onScroll = () => {
      if (window.scrollY > 20) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // -------- Mobile hamburger menu --------
  function initMobileMenu() {
    const burger = $('#hamburger');
    const links  = $('#navLinks');
    if (!burger || !links) return;

    burger.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
    });

    // Close on link click (mobile)
    $$('#navLinks a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // -------- Highlight active nav link based on section in view --------
  function initActiveLink() {
    const sections = $$('section[id]');
    const linkMap = {};
    $$('#navLinks a').forEach(a => {
      const id = a.getAttribute('href').replace('#', '');
      linkMap[id] = a;
    });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          const id = e.target.id;
          if (!linkMap[id]) return;
          if (e.isIntersecting) {
            Object.values(linkMap).forEach(l => l.classList.remove('active'));
            linkMap[id].classList.add('active');
          }
        });
      }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
      sections.forEach(s => observer.observe(s));
    }
  }

  // -------- Accordion FAQ --------
    function initFAQ() {
    const items =
      $$(".faq-item");
    items.forEach(item => {
      const btn =
        $(".faq-q", item);
      if (!btn) return;
      btn.addEventListener(
        "click",
        () => {
          const isOpen =
            item.classList.contains(
              "open"
            );

          if (isOpen) {
            item.classList.remove(
              "open"
            );
            btn.setAttribute(
              "aria-expanded",
              "false"
            );
            return;
          }

          items.forEach(i => {
            i.classList.remove(
              "open"
            );
            const b =
              $(".faq-q", i);
            if (b) {
              b.setAttribute(
                "aria-expanded",
                "false"
              );
            }
          });

          item.classList.add(
            "open"
          );
          btn.setAttribute(
            "aria-expanded",
            "true"
          );
        }
      );
    });
  }

  // -------- Reveal-on-scroll animation --------
  function initRevealOnScroll() {
    const els = $$('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => observer.observe(el));
  }

  // -------- Back to top --------
  function initBackToTop() {
    const btn = $('#backToTop');
    if (!btn) return;

    const onScroll = () => {
      if (window.scrollY > 500) btn.classList.add('show');
      else btn.classList.remove('show');
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================
     READING PROGRESS
  ============================================ */

  function initReadingProgress() {
    const bar = document.getElementById("progressBar");
    if (!bar) return;
    window.addEventListener("scroll", () => {
      const scrollTop =
        document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress =
        (scrollTop / docHeight) * 100;
      bar.style.width = progress + "%";
    });
  }

  /* ============================================
    DARK MODE
  ============================================ */

  function initTheme() {
    const toggle =
      document.getElementById("themeToggle");

    if (!toggle) return;

    const icon =
      toggle.querySelector("i");

    const updateIcon = () => {
      if (
        document.body.classList.contains(
          "dark"
        )
      ) {
        icon.className =
          "fa-solid fa-sun";
      } else {
        icon.className =
          "fa-solid fa-moon";
      }
    };

    if (
      localStorage.getItem("theme")
      === "dark"
    ) {
      document.body.classList.add(
        "dark"
      );
    }

    updateIcon();

    toggle.addEventListener(
      "click",
      () => {
        document.body.classList.toggle(
          "dark"
        );

        localStorage.setItem(
          "theme",
          document.body.classList.contains(
            "dark"
          )
            ? "dark"
            : "light"
        );

        updateIcon();
      }
    );
  }

  /* ============================================
    LOADER
  ============================================ */

  function initLoader() {
    const loader =
      document.getElementById("loader");
    if (!loader) return;
    window.addEventListener(
      "load",
      () => {
        setTimeout(() => {
          loader.classList.add(
            "hidden"
          );
        }, 500);
      }
    );
  }
})();