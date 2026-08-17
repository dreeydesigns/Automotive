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
    article.className = "rrc-showroom-card rrc-reveal";
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

    const tag = vehicle.availability === "import" ? "In Transit · UK" : "Nairobi Ready";
    
    const image = (vehicle.images && vehicle.images[0]) || {
      src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&auto=format",
      srcset: "",
      alt: vehicle.name,
    };

    article.innerHTML = `
      <div class="rrc-showroom-media">
        <img src="${image.src}" srcset="${image.srcset || image.src}" loading="lazy" alt="${image.alt || vehicle.name}" />
      </div>
      <div class="rrc-showroom-body">
        <span class="rrc-mono-tag ${vehicle.availability === 'import' ? 'clay' : 'green'}">${tag}</span>
        <div class="rrc-showroom-header">
          <h3 class="rrc-showroom-title">${vehicle.name} ${vehicle.trim}</h3>
          <span class="rrc-showroom-price">${vehicle.price}</span>
        </div>
        <div class="rrc-showroom-specs">
          <span>${vehicle.power || "Output"}</span>
          <span>·</span>
          <span>${vehicle.engine || "Powertrain"}</span>
          <span>·</span>
          <span>${vehicle.mileage || "Verified"}</span>
        </div>
        <a class="rrc-btn rrc-btn-secondary rrc-btn-full" href="vehicle-detail.html?car=${encodeURIComponent(vehicle.id)}">View Dossier →</a>
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
        <div style="grid-column: 1 / -1; padding: 60px 20px; text-align: center; background: var(--rrc-surface); border-radius: 6px; border: 1px dashed var(--rrc-border);">
          <span class="rrc-mono-tag">Inventory Status</span>
          <h3 style="margin: 8px 0;">Acquisitions Undergoing Audit</h3>
          <p style="max-width: 480px; margin: 0 auto 20px; font-size: 14px;">Incoming motorcars are currently undergoing 120-point diagnostic interrogation in our Ridgeways atelier.</p>
          <a class="rrc-btn rrc-btn-primary" href="contact.html">Request Specific Commission</a>
        </div>
      `;
      if (countEl) countEl.textContent = "[0 MOTORCARS AVAILABLE]";
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

    let visibleCount = 0;

    cards.forEach((card) => {
      const cardAvailability = normalize(card.dataset.availability);
      const cardMake = normalize(card.dataset.make);
      const cardFuel = normalize(card.dataset.fuel);

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

  if (window.RRC_FETCH_PROMISE) {
    window.RRC_FETCH_PROMISE.then(() => {
      renderVehicles();
    });
  } else if (window.RRC_VEHICLES && Object.keys(window.RRC_VEHICLES).length > 0) {
    renderVehicles();
  }

  document.addEventListener("rrc:vehicles-ready", () => {
    renderVehicles();
  });
})();
