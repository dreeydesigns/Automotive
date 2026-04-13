const filterForm = document.querySelector("[data-marketplace-form]");
if (filterForm) {
  const cards = Array.from(document.querySelectorAll("[data-vehicle-card]"));
  const countEl = document.querySelector("[data-vehicle-count]");
  const gridEl = document.querySelector("[data-vehicle-grid]");

  const normalize = (value) => (value || "").toLowerCase().trim();
  const parseNumber = (value) => {
    const cleaned = (value || "").replace(/[^0-9]/g, "");
    return cleaned ? Number(cleaned) : null;
  };

  const bindRange = ({ minInput, maxInput, minRange, maxRange }) => {
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

  const getCheckedValue = (name) => {
    const checked = filterForm.querySelector(`input[name=${name}]:checked`);
    return checked ? checked.value : "all";
  };

  const getCheckedValues = (name) => {
    return Array.from(filterForm.querySelectorAll(`input[name=${name}]:checked`)).map((input) => input.value);
  };

  const getSelected = (name) => {
    const field = filterForm.querySelector(`[name=${name}]`) || document.querySelector(`[name=${name}]`);
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
    const category = getCheckedValue("category");
    const make = normalize(getSelected("make"));
    const model = normalize(getSelected("model"));
    const body = normalize(getSelected("body"));
    const fuelFilters = getCheckedValues("fuel");
    const transmissionFilters = getCheckedValues("transmission");
    const color = getCheckedValue("color");
    const mileageBucket = getCheckedValue("mileage");
    const historyFilters = getCheckedValues("history");
    const priceMin = parseNumber(filterForm.querySelector("[name=priceMin]").value);
    const priceMax = parseNumber(filterForm.querySelector("[name=priceMax]").value);
    const yearMin = parseNumber(filterForm.querySelector("[name=yearMin]").value);
    const yearMax = parseNumber(filterForm.querySelector("[name=yearMax]").value);

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

      if (make !== "all" && make && cardMake !== make) {
        isVisible = false;
      }

      if (model !== "all" && model && cardModel !== model) {
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

      if (priceMin !== null && cardPrice < priceMin) {
        isVisible = false;
      }

      if (priceMax !== null && cardPrice > priceMax) {
        isVisible = false;
      }

      if (yearMin !== null && cardYear < yearMin) {
        isVisible = false;
      }

      if (yearMax !== null && cardYear > yearMax) {
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
    if (gridEl) {
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
    }
  };

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

  applyFilters();
}
