(() => {
  "use strict";

  const header = document.querySelector(".site-header");
  const nav = document.getElementById("primary-nav");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));

  /* ------------------------------------------------------------------
     Header shadow on scroll
     ------------------------------------------------------------------ */
  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* ------------------------------------------------------------------
     Mobile menu
     ------------------------------------------------------------------ */
  const closeMenu = () => {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  };

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || navToggle.contains(event.target)) return;
      closeMenu();
    });
  }

  /* ------------------------------------------------------------------
     Active section in navigation
     ------------------------------------------------------------------ */
  if ("IntersectionObserver" in window && navLinks.length) {
    const setActive = (hash) => {
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === hash;
        link.classList.toggle("is-active", active);
        if (active) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    const watched = navLinks
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);

    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-42% 0px -52% 0px", threshold: 0 }
    );

    watched.forEach((section) => spy.observe(section));
  }

  /* ------------------------------------------------------------------
     Gallery filtering
     ------------------------------------------------------------------ */
  const filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
  const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
  const countLabel = document.querySelector("[data-gallery-count]");
  const categoryNames = {
    all: "all learning areas",
    "exploring-nature": "Exploring nature",
    "life-skills": "Life skills",
    "loose-parts": "Loose parts",
    "process-art": "Process art",
    science: "Science",
  };

  const applyFilter = (filter) => {
    galleryItems.forEach((item) => {
      item.hidden = filter !== "all" && item.dataset.category !== filter;
    });

    filterButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.filter === filter));
    });

    if (countLabel) {
      const visible = galleryItems.filter((item) => !item.hidden).length;
      const name = categoryNames[filter] || "this learning area";
      countLabel.textContent =
        filter === "all"
          ? `Showing all ${visible} moments`
          : `Showing ${visible} in ${name}`;
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => applyFilter(button.dataset.filter || "all"));
  });

  document.querySelectorAll("[data-filter-link]").forEach((link) => {
    link.addEventListener("click", () => {
      const filter = link.dataset.filterLink || "all";
      applyFilter(filter);
      const target = filterButtons.find((button) => button.dataset.filter === filter);
      if (target) target.focus({ preventScroll: true });
    });
  });

  /* ------------------------------------------------------------------
     Lightbox
     ------------------------------------------------------------------ */
  const dialog = document.getElementById("lightbox");
  const lightboxImage = dialog?.querySelector("[data-lightbox-image]");
  const lightboxCaption = dialog?.querySelector("[data-lightbox-caption]");
  const lightboxCounter = dialog?.querySelector("[data-lightbox-counter]");
  const prevButton = dialog?.querySelector("[data-lightbox-prev]");
  const nextButton = dialog?.querySelector("[data-lightbox-next]");
  const closeButton = dialog?.querySelector("[data-lightbox-close]");

  let activeButtons = [];
  let activeIndex = 0;

  const visibleGalleryButtons = () =>
    Array.from(document.querySelectorAll(".gallery-button")).filter((button) => {
      const item = button.closest(".gallery-item");
      return item && !item.hidden;
    });

  const renderLightbox = () => {
    const button = activeButtons[activeIndex];
    if (!button || !lightboxImage) return;

    const thumbnail = button.querySelector("img");
    lightboxImage.src = button.dataset.full || thumbnail?.src || "";
    lightboxImage.alt = thumbnail?.alt || "Gallery photo";

    if (lightboxCaption) {
      lightboxCaption.textContent = button.dataset.caption || "";
    }

    if (lightboxCounter) {
      lightboxCounter.textContent = `${activeIndex + 1} / ${activeButtons.length}`;
    }

    const single = activeButtons.length < 2;
    if (prevButton) prevButton.disabled = single;
    if (nextButton) nextButton.disabled = single;
  };

  const openLightbox = (button) => {
    if (!dialog || !lightboxImage) return;
    activeButtons = visibleGalleryButtons();
    activeIndex = Math.max(0, activeButtons.indexOf(button));
    renderLightbox();

    if (typeof dialog.showModal === "function") {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    document.documentElement.classList.add("lightbox-open");
  };

  const closeLightbox = () => {
    if (!dialog) return;
    if (typeof dialog.close === "function" && dialog.open) {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
      document.documentElement.classList.remove("lightbox-open");
    }
  };

  const stepLightbox = (direction) => {
    if (activeButtons.length < 2) return;
    activeIndex =
      (activeIndex + direction + activeButtons.length) % activeButtons.length;
    renderLightbox();
  };

  document.querySelectorAll(".gallery-button").forEach((button) => {
    button.addEventListener("click", () => openLightbox(button));
  });

  prevButton?.addEventListener("click", () => stepLightbox(-1));
  nextButton?.addEventListener("click", () => stepLightbox(1));
  closeButton?.addEventListener("click", closeLightbox);

  dialog?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      stepLightbox(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      stepLightbox(1);
    }
  });

  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog || event.target.classList.contains("lightbox-stage")) {
      closeLightbox();
    }
  });

  dialog?.addEventListener("close", () => {
    document.documentElement.classList.remove("lightbox-open");
    if (lightboxImage) lightboxImage.removeAttribute("src");
  });

  /* ------------------------------------------------------------------
     Footer year
     ------------------------------------------------------------------ */
  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
})();
