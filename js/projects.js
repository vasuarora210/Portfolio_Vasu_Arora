"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const tabs = Array.from(document.querySelectorAll(".dashboard-tab"));
  const image = document.getElementById("dashboard-image");
  const label = document.getElementById("dashboard-label");
  const title = document.getElementById("dashboard-title");
  const count = document.getElementById("dashboard-count");
  const caption = document.getElementById("dashboard-caption");

  const dashboards = [
    {
      label: "EXECUTIVE OVERVIEW",
      title: "Product health at a glance",
      count: "01 / 04",
      image: "../assets/projects/saas-analytics/executive-overview.png",
      alt: "PULSE Analytics Executive Overview Power BI dashboard",
      caption: "MAU, MRR, ARPU, churn, conversion funnel and revenue by plan."
    },
    {
      label: "GROWTH & ACQUISITION",
      title: "Where users come from and how they convert",
      count: "02 / 04",
      image: "../assets/projects/saas-analytics/growth-acquisition.png",
      alt: "PULSE Analytics Growth and Acquisition Power BI dashboard",
      caption: "Signup volume, acquisition channels, acquisition-to-paid conversion and channel conversion rates."
    },
    {
      label: "REVENUE & MONETIZATION",
      title: "Revenue performance by plan and time",
      count: "03 / 04",
      image: "../assets/projects/saas-analytics/revenue-monetization.png",
      alt: "PULSE Analytics Revenue and Monetization Power BI dashboard",
      caption: "MRR, ARPU, paid users, active subscribers, plan revenue and paid-user mix."
    },
    {
      label: "RETENTION & ENGAGEMENT",
      title: "Cohort activity, churn and engagement",
      count: "04 / 04",
      image: "../assets/projects/saas-analytics/retention-engagement.png",
      alt: "PULSE Analytics Retention and Engagement Power BI dashboard",
      caption: "Monthly active-user retention, churn rate and average session duration."
    }
  ];

  function selectDashboard(index) {
    const item = dashboards[index];
    if (!item) return;

    tabs.forEach((tab, tabIndex) => {
      const active = tabIndex === index;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    });

    if (image) {
      image.src = item.image;
      image.alt = item.alt;
    }
    if (label) label.textContent = item.label;
    if (title) title.textContent = item.title;
    if (count) count.textContent = item.count;
    if (caption) caption.textContent = item.caption;
  }

  tabs.forEach((tab, index) => {
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", String(index === 0));
    tab.addEventListener("click", () => selectDashboard(index));
  });

  const lightbox = document.getElementById("image-lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const closeButton = document.querySelector(".lightbox-close");

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
  }

  if (image && lightbox && lightboxImage) {
    image.addEventListener("click", () => {
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
    });

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
  }

  if (closeButton) closeButton.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
});
