/* =========================================================
   VASU ARORA PORTFOLIO
   MAIN JAVASCRIPT
   ---------------------------------------------------------
   File: js/main.js
   No external libraries required.
   ========================================================= */

"use strict";


/* =========================================================
   01. DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileNavigation();
  initScrollProgress();
  initNavigationState();
  initProjectFilters();
  initProcessInteraction();
  initScrollReveal();
});


/* =========================================================
   02. THEME — LIGHT / DARK MODE
   ========================================================= */

const THEME_STORAGE_KEY = "vasu-portfolio-theme";

function initTheme() {
  const themeToggle = document.getElementById("theme-toggle");

  if (!themeToggle) return;

  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const initialTheme =
    savedTheme ||
    (systemPrefersDark ? "dark" : "light");

  applyTheme(initialTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "light";

    const nextTheme =
      currentTheme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);

    localStorage.setItem(
      THEME_STORAGE_KEY,
      nextTheme
    );
  });
}


function applyTheme(theme) {
  const themeToggle =
    document.getElementById("theme-toggle");

  document.documentElement.setAttribute(
    "data-theme",
    theme
  );

  if (themeToggle) {
    const isDark = theme === "dark";

    themeToggle.setAttribute(
      "aria-pressed",
      String(isDark)
    );

    themeToggle.setAttribute(
      "aria-label",
      isDark
        ? "Switch to light mode"
        : "Switch to dark mode"
    );
  }
}


/* =========================================================
   03. MOBILE NAVIGATION
   ========================================================= */

function initMobileNavigation() {
  const menuToggle =
    document.getElementById("menu-toggle");

  const mobileNav =
    document.getElementById("mobile-nav");

  if (!menuToggle || !mobileNav) return;

  const mobileLinks =
    mobileNav.querySelectorAll(
      ".mobile-nav-link"
    );

  function setMenuState(isOpen) {

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen
        ? "Close navigation menu"
        : "Open navigation menu"
    );

    mobileNav.classList.toggle(
      "is-open",
      isOpen
    );

    mobileNav.setAttribute(
      "aria-hidden",
      String(!isOpen)
    );

    document.body.classList.toggle(
      "menu-open",
      isOpen
    );
  }

  menuToggle.addEventListener(
    "click",
    () => {

      const isOpen =
        menuToggle.getAttribute(
          "aria-expanded"
        ) === "true";

      setMenuState(!isOpen);
    }
  );


  mobileLinks.forEach((link) => {

    link.addEventListener(
      "click",
      () => {
        setMenuState(false);
      }
    );

  });


  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {
        setMenuState(false);
      }

    }
  );


  document.addEventListener(
    "click",
    (event) => {

      const isOpen =
        menuToggle.getAttribute(
          "aria-expanded"
        ) === "true";

      if (!isOpen) return;

      const clickedInsideNav =
        mobileNav.contains(event.target);

      const clickedToggle =
        menuToggle.contains(event.target);

      if (
        !clickedInsideNav &&
        !clickedToggle
      ) {
        setMenuState(false);
      }

    }
  );


  window.addEventListener(
    "resize",
    () => {

      if (window.innerWidth > 860) {
        setMenuState(false);
      }

    }
  );
}


/* =========================================================
   04. NAVIGATION SCROLL STATE
   ========================================================= */

function initNavigationState() {

  const siteNav =
    document.getElementById("site-nav");

  if (!siteNav) return;

  const navLinks =
    Array.from(
      document.querySelectorAll(
        '.desktop-nav .nav-link[href^="#"]'
      )
    );

  const sections =
    navLinks
      .map((link) => {

        const id =
          link.getAttribute("href");

        return document.querySelector(id);

      })
      .filter(Boolean);


  function updateNav() {

    const scrollPosition =
      window.scrollY + 160;


    siteNav.classList.toggle(
      "is-scrolled",
      window.scrollY > 20
    );


    let currentSection = "";


    sections.forEach((section) => {

      if (
        scrollPosition >=
        section.offsetTop
      ) {
        currentSection =
          section.id;
      }

    });


    navLinks.forEach((link) => {

      const linkTarget =
        link
          .getAttribute("href")
          .replace("#", "");

      const isActive =
        linkTarget === currentSection;

      link.classList.toggle(
        "is-active",
        isActive
      );

    });

  }


  updateNav();


  window.addEventListener(
    "scroll",
    updateNav,
    {
      passive: true
    }
  );


  window.addEventListener(
    "resize",
    updateNav
  );

}


/* =========================================================
   05. SCROLL PROGRESS
   ========================================================= */

function initScrollProgress() {

  const progressBar =
    document.getElementById(
      "scroll-progress"
    );

  if (!progressBar) return;


  function updateProgress() {

    const scrollTop =
      window.scrollY;


    const documentHeight =
      document.documentElement
        .scrollHeight -
      window.innerHeight;


    if (documentHeight <= 0) {

      progressBar.style.width =
        "0%";

      return;
    }


    const progress =
      Math.min(
        100,
        Math.max(
          0,
          (scrollTop /
            documentHeight) *
            100
        )
      );


    progressBar.style.width =
      `${progress}%`;
  }


  updateProgress();


  window.addEventListener(
    "scroll",
    updateProgress,
    {
      passive: true
    }
  );


  window.addEventListener(
    "resize",
    updateProgress
  );

}


/* =========================================================
   06. PROJECT FILTERS
   ========================================================= */

function initProjectFilters() {

  const filterContainer =
    document.getElementById(
      "project-filters"
    );

  const projectGrid =
    document.getElementById(
      "project-grid"
    );


  if (
    !filterContainer ||
    !projectGrid
  ) {
    return;
  }


  const filterButtons =
    filterContainer.querySelectorAll(
      ".project-filter"
    );


  const projects =
    projectGrid.querySelectorAll(
      "[data-project]"
    );


  filterButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const selectedFilter =
          button.dataset.filter ||
          "all";


        filterButtons.forEach(
          (filterButton) => {

            const isActive =
              filterButton === button;

            filterButton.classList.toggle(
              "is-active",
              isActive
            );

            filterButton.setAttribute(
              "aria-selected",
              String(isActive)
            );

          }
        );


        projects.forEach(
          (project) => {

            const projectTags =
              (
                project.dataset.tags ||
                ""
              )
                .split(" ")
                .filter(Boolean);


            const shouldShow =
              selectedFilter === "all" ||
              projectTags.includes(
                selectedFilter
              );


            project.classList.toggle(
              "is-hidden",
              !shouldShow
            );

          }
        );

      }
    );

  });

}


/* =========================================================
   07. HOW I WORK — PROCESS INTERACTION
   ========================================================= */

function initProcessInteraction() {

  const processContainer =
    document.getElementById(
      "analysis-process"
    );


  const descriptionContainer =
    document.getElementById(
      "process-description"
    );


  if (
    !processContainer ||
    !descriptionContainer
  ) {
    return;
  }


  const steps =
    processContainer.querySelectorAll(
      ".process-step"
    );


  const descriptions =
    descriptionContainer.querySelectorAll(
      ".process-description-item"
    );


  steps.forEach((step) => {

    step.addEventListener(
      "click",
      () => {

        const selectedStep =
          step.dataset.processStep;


        steps.forEach(
          (currentStep) => {

            const isSelected =
              currentStep === step;


            currentStep.classList.toggle(
              "is-active",
              isSelected
            );


            currentStep.setAttribute(
              "aria-selected",
              String(isSelected)
            );

          }
        );


        descriptions.forEach(
          (description) => {

            const isSelected =
              description.dataset
                .processContent ===
              selectedStep;


            description.classList.toggle(
              "is-visible",
              isSelected
            );

          }
        );

      }
    );

  });

}


/* =========================================================
   08. SCROLL REVEAL
   ========================================================= */

function initScrollReveal() {

  const revealTargets =
    document.querySelectorAll(
      [
        ".section-eyebrow",
        ".section-heading",
        ".section-intro",
        ".about-copy",
        ".about-facts",
        ".experience-card",
        ".skills-panel",
        ".education-panel",
        ".project-card",
        ".process-step",
        ".process-description",
        ".earlier-work-card",
        ".contact-content",
        ".contact-links"
      ].join(", ")
    );


  if (!revealTargets.length) return;


  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (prefersReducedMotion) {

    revealTargets.forEach(
      (element) => {

        element.classList.add(
          "is-revealed"
        );

      }
    );

    return;
  }


  /*
   * Add the initial state through
   * JavaScript so the page remains
   * visible if JS is disabled.
   */

  revealTargets.forEach(
    (element) => {

      element.classList.add(
        "reveal-ready"
      );

    }
  );


  if (
    !(
      "IntersectionObserver" in
      window
    )
  ) {

    revealTargets.forEach(
      (element) => {

        element.classList.add(
          "is-revealed"
        );

      }
    );

    return;
  }


  const observer =
    new IntersectionObserver(
      (
        entries,
        revealObserver
      ) => {

        entries.forEach(
          (entry) => {

            if (
              !entry.isIntersecting
            ) {
              return;
            }


            entry.target.classList.add(
              "is-revealed"
            );


            revealObserver.unobserve(
              entry.target
            );

          }
        );

      },
      {
        threshold: 0.12,
        rootMargin:
          "0px 0px -45px 0px"
      }
    );


  revealTargets.forEach(
    (element) => {

      observer.observe(element);

    }
  );

}


/* =========================================================
   09. SMOOTH ANCHOR NAVIGATION
   ========================================================= */

function initSmoothAnchors() {

  const anchorLinks =
    document.querySelectorAll(
      'a[href^="#"]:not([href="#"])'
    );


  anchorLinks.forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const targetId =
          link.getAttribute("href");


        const target =
          document.querySelector(
            targetId
          );


        if (!target) return;


        event.preventDefault();


        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });


        history.replaceState(
          null,
          "",
          targetId
        );

      }
    );

  });

}


/* =========================================================
   10. IMAGE FALLBACKS
   ========================================================= */

function initImageFallbacks() {

  const images =
    document.querySelectorAll("img");


  images.forEach((image) => {

    image.addEventListener(
      "error",
      () => {

        image.classList.add(
          "image-load-error"
        );

      },
      {
        once: true
      }
    );

  });

}


/* =========================================================
   11. INITIALIZE OPTIONAL ENHANCEMENTS
   ========================================================= */

initSmoothAnchors();
initImageFallbacks();