// Shared site behavior: theme toggle + newsletter modal.
(function () {
  "use strict";

  /* ---- Theme toggle ---- */
  var root = document.documentElement;
  var toggleBtn = document.getElementById("theme-toggle");
  var STORAGE_KEY = "spooky-night-theme";

  function applyTheme(theme) {
    if (theme === "dark" || theme === "light") {
      root.setAttribute("data-theme", theme);
    } else {
      root.removeAttribute("data-theme");
    }
    if (toggleBtn) {
      var isDark =
        theme === "dark" ||
        (!theme &&
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
      toggleBtn.textContent = isDark ? "☀️" : "🌙";
      toggleBtn.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
    }
  }

  var saved = null;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    /* storage unavailable, fall back to system preference */
  }
  applyTheme(saved);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      var current = root.getAttribute("data-theme");
      var systemDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      var currentlyDark = current === "dark" || (!current && systemDark);
      var next = currentlyDark ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {
        /* ignore */
      }
    });
  }

  /* ---- Newsletter modal ---- */
  var modal = document.getElementById("newsletter-modal");
  var openBtns = document.querySelectorAll("[data-open-newsletter]");
  var closeBtn = document.getElementById("newsletter-close");
  var form = document.getElementById("newsletter-form");
  var successMsg = document.getElementById("newsletter-success");
  var lastFocused = null;

  function openModal() {
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.hidden = false;
    var firstInput = modal.querySelector("input");
    if (firstInput) firstInput.focus();
    document.addEventListener("keydown", onKeydown);
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.removeEventListener("keydown", onKeydown);
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  function onKeydown(e) {
    if (e.key === "Escape") closeModal();
  }

  openBtns.forEach(function (btn) {
    btn.addEventListener("click", openModal);
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // No backend is wired up yet -- this just confirms the interaction locally.
      form.hidden = true;
      if (successMsg) successMsg.hidden = false;
    });
  }
})();
