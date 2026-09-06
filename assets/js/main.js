/* EME'S DÖNER HAUS — main.js
   - Renders the menu from /data/menu.json (single source for DE + TR)
   - Simple tab switching, no dependencies
   - Cookie consent banner + Consent Mode v2 stub (kept OFF until analytics is added)
*/
(function () {
  "use strict";

  var LANG = document.documentElement.lang === "tr" ? "tr" : "de";
  var DATA_URL = (LANG === "tr" ? "../data/menu.json" : "data/menu.json");

  var money = new Intl.NumberFormat(LANG === "tr" ? "tr-TR" : "de-DE", {
    style: "currency",
    currency: "EUR"
  });

  function renderMenu(menu) {
    var tabsEl = document.getElementById("menu-tabs");
    var panelsEl = document.getElementById("menu-panels");
    if (!tabsEl || !panelsEl) return;

    menu.categories.forEach(function (cat, i) {
      var tab = document.createElement("button");
      tab.className = "menu-tab";
      tab.type = "button";
      tab.id = "tab-" + cat.id;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-controls", "panel-" + cat.id);
      tab.setAttribute("aria-selected", i === 0 ? "true" : "false");
      tab.textContent = LANG === "tr" ? cat.name_tr : cat.name_de;
      tab.addEventListener("click", function () { selectTab(cat.id); });
      tabsEl.appendChild(tab);

      var panel = document.createElement("div");
      panel.className = "menu-panel" + (i === 0 ? " is-active" : "");
      panel.id = "panel-" + cat.id;
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", "tab-" + cat.id);

      var list = document.createElement("div");
      list.className = "menu-list";

      cat.items.forEach(function (item) {
        var row = document.createElement("div");
        row.className = "menu-item";

        var name = document.createElement("span");
        name.className = "menu-item-name";
        name.textContent = LANG === "tr" ? item.name_tr : item.name_de;

        var desc = (LANG === "tr" ? item.desc_tr : item.desc_de);
        if (desc) {
          var small = document.createElement("small");
          small.className = "menu-item-desc";
          small.textContent = desc;
          name.appendChild(small);
        }

        var fill = document.createElement("span");
        fill.className = "menu-item-fill";
        fill.setAttribute("aria-hidden", "true");

        var price = document.createElement("span");
        price.className = "menu-item-price";
        price.textContent = money.format(item.price);

        row.appendChild(name);
        row.appendChild(fill);
        row.appendChild(price);
        list.appendChild(row);
      });

      panel.appendChild(list);
      panelsEl.appendChild(panel);
    });
  }

  function selectTab(id) {
    document.querySelectorAll(".menu-tab").forEach(function (t) {
      t.setAttribute("aria-selected", t.id === "tab-" + id ? "true" : "false");
    });
    document.querySelectorAll(".menu-panel").forEach(function (p) {
      p.classList.toggle("is-active", p.id === "panel-" + id);
    });
  }

  fetch(DATA_URL)
    .then(function (r) { return r.json(); })
    .then(renderMenu)
    .catch(function (err) {
      var panelsEl = document.getElementById("menu-panels");
      if (panelsEl) {
        panelsEl.innerHTML = "<p>" +
          (LANG === "tr" ? "Menü şu anda yüklenemedi. Lütfen daha sonra tekrar deneyin." :
            "Die Speisekarte konnte gerade nicht geladen werden. Bitte später erneut versuchen.") +
          "</p>";
      }
      console.error("menu.json load failed:", err);
    });

  /* ---------------- Cookie consent (Consent Mode v2 ready) ----------------
     No analytics is wired in yet. When GA4 / GTM / Clarity are added later,
     initialise them so they respect these consent flags — do NOT fire any
     analytics tag before the visitor has made a choice here. */
  var CONSENT_KEY = "edh_consent_v1";
  var banner = document.getElementById("cookie-banner");

  function getConsent() {
    try { return JSON.parse(localStorage.getItem(CONSENT_KEY)); }
    catch (e) { return null; }
  }
  function setConsent(analytics) {
    var value = { analytics: analytics, ts: Date.now() };
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(value)); } catch (e) {}
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: analytics ? "granted" : "denied",
        ad_storage: "denied"
      });
    }
    if (banner) banner.classList.remove("is-visible");
  }

  if (banner && !getConsent()) {
    banner.classList.add("is-visible");
    var acceptBtn = document.getElementById("cookie-accept");
    var declineBtn = document.getElementById("cookie-decline");
    if (acceptBtn) acceptBtn.addEventListener("click", function () { setConsent(true); });
    if (declineBtn) declineBtn.addEventListener("click", function () { setConsent(false); });
  }
})();
