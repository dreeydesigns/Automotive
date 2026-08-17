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
    article.className = "vehicle-card rrc-reveal visible";
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
    const badgeText = vehicle.availability === "import" ? "Import Stock" : "Available in Kenya";
    const image = (vehicle.images && vehicle.images[0]) || {
      src: "assets/images/hero-velar.jpg",
      srcset: "assets/images/hero-velar.jpg 900w",
      alt: vehicle.name,
    };

    const fuelCap = (vehicle.fuel || "Petrol").charAt(0).toUpperCase() + (vehicle.fuel || "Petrol").slice(1);
    const specsText = [fuelCap, vehicle.transmission, vehicle.engine].filter(Boolean).join(" · ");

    article.innerHTML = `
      <div class="vehicle-image rrc-image">
        <img class="rrc-lazy" src="${image.src}" srcset="${image.srcset || image.src}" loading="lazy" alt="${image.alt || vehicle.name}" />
        <span class="rrc-badge ${badgeClass} vehicle-badge">${badgeText}</span>
      </div>
      <div class="vehicle-card-body">
        <h4>${vehicle.name} ${vehicle.trim}</h4>
        <div class="vehicle-meta">${vehicle.year} · ${vehicle.mileage}</div>
        <div class="vehicle-price">${vehicle.price}</div>
        <div class="vehicle-specs">${specsText}</div>
        <div class="vehicle-actions">
          <a class="rrc-button rrc-button-outline rrc-button-full" href="vehicle-detail.html?car=${encodeURIComponent(vehicle.id)}">View Details</a>
        </div>
      </div>
    `;

    return article;
  };

  const renderVehicles = () => {
    const vehicles = window.RRC_VEHICLES || {};
    gridEl.innerHTML = "";
    Object.values(vehicles).forEach((vehicle) => {
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

  const matchesMileage = (mileage, bucket) => {
    if (bucket === "all") return true;
    if (bucket === "under-50") return mileage < 50000;
    if (bucket === "50-100") return mileage >= 50000 && mileage < 100000;
    if (bucket === "100-150") return mileage >= 100000 && mileage < 150000;
    return mileage >= 150000;
  };

  const applyFilters = () => {
    const cards = Array.from(gridEl.querySelectorAll("[data-vehicle-card]"));
    if (!cards.length) {
      if (countEl) countEl.textContent = "0 vehicles found";
      return;
    }

    if (!filterForm) {
      if (countEl) countEl.textContent = `${cards.length} vehicles found`;
      return;
    }

    const category = getCheckedValue("category");
    const make = normalize(getSelected("make"));
    const model = normalize(getSelected("model"));
    const body = normalize(getSelected("body"));
    const fuelFilters = getCheckedValues("fuel");
    const transmissionFilters = getCheckedValues("transmission");
    const color = getCheckedValue("color");
    const mileageBucket = getCheckedValue("mileage");
    const historyFilters = getCheckedValues("history");

    const priceMinInput = filterForm.querySelector("[name=priceMin]");
    const priceMaxInput = filterForm.querySelector("[name=priceMax]");
    const yearMinInput = filterForm.querySelector("[name=yearMin]");
    const yearMaxInput = filterForm.querySelector("[name=yearMax]");

    const priceMin = priceMinInput ? parseNumber(priceMinInput.value) : null;
    const priceMax = priceMaxInput ? parseNumber(priceMaxInput.value) : null;
    const yearMin = yearMinInput ? parseNumber(yearMinInput.value) : null;
    const yearMax = yearMaxInput ? parseNumber(yearMaxInput.value) : null;

    let visibleCount = 0;

    cards.forEach((card) => {
      const cardAvailability = normalize(card.dataset.availability);
      const cardMake = normalize(card.dataset.make);
      const cardModel = normalize(card.dataset.model);
      const cardBody = normalize(card.dataset.body);
      const cardFuel = normalize(card.dataset.fuel);
      const cardTransmission = normalize(card.dataset.transmission);
      const cardColor = normalize(card.dataset.color);
      const cardHistory = (card.dataset.history || "")
        .split(",")
        .map((item) => normalize(item))
        .filter(Boolean);
      const cardPrice = Number(card.dataset.price || 0);
      const cardYear = Number(card.dataset.year || 0);
      const cardMileage = Number(card.dataset.mileage || 0);

      let isVisible = true;

      if (category !== "all" && cardAvailability !== category) {
        isVisible = false;
      }

      if (make !== "all" && make && !cardMake.includes(make) && !make.includes(cardMake)) {
        isVisible = false;
      }

      if (model !== "all" && model && !cardModel.includes(model) && !model.includes(cardModel)) {
        isVisible = false;
      }

      if (body !== "all" && body && cardBody !== body) {
        isVisible = false;
      }

      if (fuelFilters.length && !fuelFilters.includes(cardFuel)) {
        isVisible = false;
      }

      if (transmissionFilters.length && !transmissionFilters.includes(cardTransmission)) {
        isVisible = false;
      }

      if (color !== "all" && color && cardColor !== color) {
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

      if (yearMin !== null && cardYear > 0 && cardYear < yearMin) {
        isVisible = false;
      }

      if (yearMax !== null && cardYear > 0 && cardYear > yearMax) {
        isVisible = false;
      }

      if (!matchesMileage(cardMileage, mileageBucket)) {
        isVisible = false;
      }

      card.hidden = !isVisible;
      if (isVisible) {
        visibleCount += 1;
      }
    });

    if (countEl) {
      countEl.textContent = `${visibleCount} vehicles found`;
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
        clampRange();
      };

      const syncFromRange = () => {
        minInput.value = minRange.value;
        maxInput.value = maxRange.value;
        clampRange();
      };

      const clampRange = () => {
        if (Number(minRange.value) > Number(maxRange.value)) {
          maxRange.value = minRange.value;
          maxInput.value = maxRange.value;
        }
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

    bindRange({
      minInput: filterForm.querySelector("[name=yearMin]"),
      maxInput: filterForm.querySelector("[name=yearMax]"),
      minRange: filterForm.querySelector("[name=yearRangeMin]"),
      maxRange: filterForm.querySelector("[name=yearRangeMax]"),
    });

    filterForm.addEventListener("input", applyFilters);
    filterForm.addEventListener("submit", (event) => {
      event.preventDefault();
      applyFilters();
    });

    const clearButton = filterForm.querySelector("[data-clear-filters]");
    if (clearButton) {
      clearButton.addEventListener("click", () => {
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
        if (icon) {
          icon.textContent = isHidden ? "–" : "+";
        }
      });
    });
  }

  const sortSelect = document.querySelector("[name=sort]");
  if (sortSelect) {
    sortSelect.addEventListener("change", applyFilters);
  }

  renderVehicles();

  // Re-render immediately when live Sanity vehicles finish fetching
  document.addEventListener("rrc:vehicles-ready", () => {
    renderVehicles();
  });
})();
