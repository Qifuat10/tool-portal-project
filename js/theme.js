// Light is the default. The visitor's choice is remembered in the browser.
(function () {
  var root = document.documentElement;

  function savedTheme() {
    try {
      return localStorage.getItem("theme");
    } catch (e) {
      return null;
    }
  }

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }

  // Runs right away (script is in <head>) so the page doesn't flash the wrong theme.
  root.setAttribute("data-theme", savedTheme() === "dark" ? "dark" : "light");

  document.addEventListener("DOMContentLoaded", function () {
    var button = document.getElementById("theme-toggle");
    if (!button) return;

    function updateLabel() {
      var isDark = root.getAttribute("data-theme") === "dark";
      button.textContent = isDark ? "Switch to light theme" : "Switch to dark theme";
    }

    button.addEventListener("click", function () {
      var isDark = root.getAttribute("data-theme") === "dark";
      setTheme(isDark ? "light" : "dark");
      updateLabel();
    });

    updateLabel();
  });
})();
