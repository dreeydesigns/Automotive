(() => {
  const filterForm = document.querySelector("[data-marketplace-form]");
  const countEl = document.querySelector("[data-vehicle-count]");
  const gridEl = document.querySelector("[data-vehicle-grid]");

  if (!gridEl) return;

  const normalize = (value) => (value || "").toLowerCase().trim();
  const parseNumber = (value) => {
    const cleaned = String(value || "").replace(/[^0-9]/g, "");
    return cleaned ? Number(cleaned) : null;
  };

  const createCardElement = (vehicle) => {
    const article = document.createElement("article");
    article.className = "rrc-car-card rrc-reveal revealed";
    article.setAttribute("data-vehicle-card", "");
    article.setAttribute("data-availability", vehicle.availability || "kenya");
    article.setAttribute("data-make", vehicle.make || "range rover");
    article.setAttribute("data-model", vehicle.model || "");
    article.setAttribute("data-body", vehicle.body || "suv");
    article.setAttribute("data-year", vehicle.year || "2020");
    article.setAttribute("data-price", String(vehicle.priceValue || 0));
    article.setAttribute("data-mileage", String(vehicle.mileageValue || 0));
    article.setAttribute("data-transmission", (vehicle.transmission || "automatic").toLowerCase().includes("manual") ? "manual" : "automatic");
    article.setAttribute("data-fuel", (vehicle.fuel || "petrol").toLowerCase());
    article.setAttribute("data-color", vehicle.color || "black");
    article.setAttribute("data-history", (vehicle.history || []).join(","));
    article.setAttribute("data-date", vehicle.date || "2026-08-17");

    const badgeClass = vehicle.availability === "import" ? "rrc-badge-import" : "rrc-badge-local";
    const badgeText = vehicle.availability === "import" ? "In Transit (UK)" : "Nairobi Showroom";
    
    const image = (vehicle.images && vehicle.images[0]) || {
      src: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=900&auto=format",
      srcset: "",
      alt: vehicle.name,
    };

    article.innerHTML = `
      <div class="rrc-car-media">
        <img src="${image.src}" srcset="${image.srcset || image.src}" loading="lazy" alt="${image.alt || vehicle.name}" />
        <div class="rrc-car-badge-wrap">
          <span class="rrc-badge ${badgeClass}">${badgeText}</span>
          <span class="rrc-badge rrc-badge-local">RRC Verified</span>
        </div>
      </div>
      <div class="rrc-car-body">
        <div class="rrc-car-header">
          <h4 class="rrc-car-title">${vehicle.name} ${vehicle.trim}</h4>
          <span class="rrc-car-price">${vehicle.price}</span>
        </div>
        <div class="rrc-car-specs-grid">
          <div class="rrc-car-spec-item">⚡ ${vehicle.power || "Factory Output"}</div>
          <div class="rrc-car-spec-item">⛽ ${vehicle.engine || "Verified Powertrain"}</div>
          <div class="rrc-car-spec-item">🕹️ ${vehicle.transmission || "Automatic"}</div>
          <div class="rrc-car-spec-item">📍 ${vehicle.year || "Year"} · ${vehicle.mileage || "Verified KM"}</div>
        </div>
        <div class="rrc-car-actions">
          <a class="rrc-btn rrc-btn-gold rrc-btn-full" href="vehicle-detail.html?car=${encodeURIComponent(vehicle.id)}">Inspect Dossier →</a>
        </div>
      </div>
    `;

    return article;
  };

  const renderVehicles = () => {
    const vehicles = window.RRC_VEHICLES || {};
    gridEl.innerHTML = "";
    
    const vList = Object.values(vehicles);
    if (vList.length === 0) {
      gridEl.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 60px 20px; text-align: center; background: var(--rrc-charcoal); border-radius: var(--r-md); border: 1px dashed var(--rrc-glass-border);">
          <p class="rrc-eyebrow">Inventory Status</p>
          <h3>Acquisitions Being Audited</h3>
          <p style="max-width: 500px; margin: 0 auto 20px;">New Range Rover and Defender arrivals are currently undergoing 120-point diagnostic inspection in our Ridgeways atelier.</p>
          <a class="rrc-btn rrc-btn-gold" href="contact.html">Request Specific Commission</a>
        </div>
      `;
      if (countEl) countEl.textContent = "[0 ACQUISITIONS MATCHED]";
      return;
    }

    vList.forEach((vehicle) => {
      gridEl.appendChild(createCardElement(vehicle));
    });
    applyFilters();
  };

  const getCheckedValue = (name) => {
    if (!filterForm) return "all";
    const checked = filterForm.querySelector(`input[name=${name}]:checked`);
    return checked ? checked.value : "all";
  };

  const getCheckedValues = (name) => {
    if (!filterForm) return [];
    return Array.from(filterForm.querySelectorAll(`input[name=${name}]:checked`)).map((input) => input.value);
  };

  const getSelected = (name) => {
    const field = (filterForm && filterForm.querySelector(`[name=${name}]`)) || document.querySelector(`[name=${name}]`);
    return field ? field.value : "all";
  };

  const applyFilters = () => {
    const cards = Array.from(gridEl.querySelectorAll("[data-vehicle-card]"));
    if (!cards.length) return;

    if (!filterForm) {
      if (countEl) countEl.textContent = `[${cards.length} MOTORCARS AVAILABLE]`;
      return;
    }

    const category = getCheckedValue("category");
    const make = normalize(getSelected("make"));
    const fuelFilters = getCheckedValues("fuel");
    const historyFilters = getCheckedValues("history");

    const priceMinInput = filterForm.querySelector("[name=priceMin]");
    const priceMaxInput = filterForm.querySelector("[name=priceMax]");
    const priceMin = priceMinInput ? parseNumber(priceMinInput.value) : null;
    const priceMax = priceMaxInput ? parseNumber(priceMaxInput.value) : null;

    let visibleCount = 0;

    cards.forEach((card) => {
      const cardAvailability = normalize(card.dataset.availability);
      const cardMake = normalize(card.dataset.make);
      const cardFuel = normalize(card.dataset.fuel);
      const cardHistory = (card.dataset.history || "").split(",").map(normalize).filter(Boolean);
      const cardPrice = Number(card.dataset.price || 0);

      let isVisible = true;

      if (category !== "all" && cardAvailability !== category) {
        isVisible = false;
      }

      if (make !== "all" && make && !cardMake.includes(make) && !make.includes(cardMake)) {
        isVisible = false;
      }

      if (fuelFilters.length && !fuelFilters.includes(cardFuel)) {
        isVisible = false;
      }

      if (historyFilters.length && !historyFilters.every((tag) => cardHistory.includes(tag))) {
        isVisible = false;
      }

      if (priceMin !== null && cardPrice > 0 && cardPrice < priceMin) {
        isVisible = false;
      }

      if (priceMax !== null && cardPrice > 0 && cardPrice > priceMax) {
        isVisible = false;
      }

      card.style.display = isVisible ? "flex" : "none";
      if (isVisible) visibleCount += 1;
    });

    if (countEl) {
      countEl.textContent = `[${visibleCount} MOTORCARS AVAILABLE]`;
    }

    const sortValue = getSelected("sort");
    const sorted = cards.slice().sort((a, b) => {
      const aPrice = Number(a.dataset.price || 0);
      const bPrice = Number(b.dataset.price || 0);
      const aDate = Date.parse(a.dataset.date || "") || 0;
      const bDate = Date.parse(b.dataset.date || "") || 0;
      if (sortValue === "price-asc") return aPrice - bPrice;
      if (sortValue === "price-desc") return bPrice - aPrice;
      return bDate - aDate;
    });
    sorted.forEach((card) => gridEl.appendChild(card));
  };

  if (filterForm) {
    const bindRange = ({ minInput, maxInput, minRange, maxRange }) => {
      if (!minInput || !maxInput || !minRange || !maxRange) return;

      const syncFromText = () => {
        const min = parseNumber(minInput.value);
        const max = parseNumber(maxInput.value);
        if (min !== null) minRange.value = min;
        if (max !== null) maxRange.value = max;
      };

      const syncFromRange = () => {
        minInput.value = Number(minRange.value).toLocaleString();
        maxInput.value = Number(maxRange.value).toLocaleString();
      };

      minInput.addEventListener("input", syncFromText);
      maxInput.addEventListener("input", syncFromText);
      minRange.addEventListener("input", syncFromRange);
      maxRange.addEventListener("input", syncFromRange);
    };

    bindRange({
      minInput: filterForm.querySelector("[name=priceMin]"),
      maxInput: filterForm.querySelector("[name=priceMax]"),
      minRange: filterForm.querySelector("[name=priceRangeMin]"),
      maxRange: filterForm.querySelector("[name=priceRangeMax]"),
    });

    filterForm.addEventListener("input", applyFilters);
    filterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      applyFilters();
    });

    const clearBtn = filterForm.querySelector("[data-clear-filters]");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        filterForm.reset();
        applyFilters();
      });
    }

    const toggles = filterForm.querySelectorAll("[data-toggle]");
    toggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const contentId = toggle.getAttribute("data-toggle");
        const content = document.getElementById(contentId);
        if (!content) return;
        const isHidden = content.hasAttribute("hidden");
        if (isHidden) {
          content.removeAttribute("hidden");
        } else {
          content.setAttribute("hidden", "");
        }
        toggle.setAttribute("aria-expanded", isHidden ? "true" : "false");
        const icon = toggle.querySelector("span");
        if (icon) icon.textContent = isHidden ? "–" : "+";
      });
    });
  }

  const sortSelect = document.querySelector("[name=sort]");
  if (sortSelect) {
    sortSelect.addEventListener("change", applyFilters);
  }

  renderVehicles();

  document.addEventListener("rrc:vehicles-ready", () => {
    renderVehicles();
  });
})();
