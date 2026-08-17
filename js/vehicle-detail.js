(() => {
  const heroImg = document.getElementById("detailHeroImg");
  const lightbox = document.getElementById("detailLightbox");
  const lightboxImg = document.getElementById("detailLightboxImg");
  const lightboxClose = document.getElementById("detailLightboxClose");
  const thumbsContainer = document.getElementById("detailThumbsTrack");
  const whatsappBtn = document.getElementById("detailWhatsappBtn");
  const stickyWhatsappBtn = document.getElementById("stickyWhatsappBtn");
  const stickyBar = document.getElementById("rrcCakeStickyBar");
  const stickyThumbImg = document.getElementById("stickyThumbImg");
  const stackImg1 = document.getElementById("detailStackImg1");
  const stackImg2 = document.getElementById("detailStackImg2");
  const similarGrid = document.getElementById("detailSimilarGrid");

  const updateText = (key, value) => {
    if (!value) return;
    const nodes = document.querySelectorAll(`[data-detail="${key}"]`);
    nodes.forEach((el) => {
      el.textContent = value;
    });
  };

  const updateLink = (key, value) => {
    const el = document.querySelector(`[data-detail-link="${key}"]`);
    if (el && value) {
      el.href = value;
    }
  };

  const setHero = (thumb, allThumbs) => {
    if (!heroImg || !thumb) return;
    const src = thumb.getAttribute("data-src");
    const srcset = thumb.getAttribute("data-srcset");
    const alt = thumb.getAttribute("data-alt") || "Vehicle image";
    heroImg.src = src;
    heroImg.srcset = srcset || src;
    heroImg.alt = alt;
    allThumbs.forEach((t) => t.classList.remove("active"));
    thumb.classList.add("active");
  };

  const buildThumb = (image) => {
    const wrapper = document.createElement("div");
    wrapper.className = "detail-thumb-item";
    wrapper.setAttribute("data-thumb", "");
    wrapper.setAttribute("data-src", image.src);
    wrapper.setAttribute("data-srcset", image.srcset || image.src);
    wrapper.setAttribute("data-alt", image.alt || "Vehicle Angle");
    wrapper.innerHTML = `<img src="${image.thumb || image.src}" loading="lazy" alt="${image.alt || 'Vehicle Thumbnail'}" />`;
    return wrapper;
  };

  const bindThumbs = () => {
    const thumbs = Array.from(document.querySelectorAll("[data-thumb]") || []);
    thumbs.forEach((thumb, index) => {
      thumb.addEventListener("click", () => setHero(thumb, thumbs));
      if (index === 0) {
        thumb.classList.add("active");
      }
    });
    if (thumbs[0]) {
      setHero(thumbs[0], thumbs);
    }
  };

  const resolveVehicle = (requestedId, vehicles) => {
    if (!vehicles || Object.keys(vehicles).length === 0) return null;
    const vList = Object.values(vehicles);
    if (!requestedId) return vList[0];

    const reqNorm = decodeURIComponent(requestedId).toLowerCase().trim();

    // 1. Direct dictionary match
    if (vehicles[requestedId]) return vehicles[requestedId];
    if (vehicles[reqNorm]) return vehicles[reqNorm];

    // 2. Exact match by slug or id property
    const exact = vList.find(v => (v.id && v.id.toLowerCase() === reqNorm) || (v._id && v._id.toLowerCase() === reqNorm));
    if (exact) return exact;

    // 3. Normalized fuzzy keyword match (e.g. 'land-rover-discovery-4-2011-diesel' -> matches Discovery 4 2011)
    const keywords = reqNorm.split(/[-_\s]+/).filter(k => k.length > 2);
    let bestMatch = null;
    let maxMatches = 0;

    vList.forEach(v => {
      const vText = `${v.id || ""} ${v.name || ""} ${v.trim || ""} ${v.year || ""} ${v.model || ""}`.toLowerCase();
      const matchCount = keywords.filter(kw => vText.includes(kw)).length;
      if (matchCount > maxMatches) {
        maxMatches = matchCount;
        bestMatch = v;
      }
    });

    if (bestMatch && maxMatches >= 1) return bestMatch;

    // 4. Default to first motorcar
    return vList[0];
  };

  const renderVehicle = () => {
    const vehicles = window.RRC_VEHICLES || {};
    const keys = Object.keys(vehicles);
    if (keys.length === 0) return;

    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get("car");
    const vehicle = resolveVehicle(requestedId, vehicles);

    if (!vehicle) return;

    updateText("name", `${vehicle.name} ${vehicle.trim || ""}`.trim());
    updateText("subtitle", `${vehicle.year} · ${vehicle.trim || "Certified"} · ${vehicle.location || "Nairobi"}`);
    updateText("price", vehicle.price || "Price Upon Request");
    updateText("engine", vehicle.engine || "3.0L SDV6 Twin-Turbo");
    updateText("power", vehicle.power || "241 HP / 600 Nm");
    updateText("mileage", vehicle.mileage || "Verified Odometer");
    updateText("transmission", vehicle.transmission || "Automatic");
    updateText("drivetrain", vehicle.drivetrain || "Permanent 4WD / Terrain Response");
    updateText("exterior", vehicle.exterior || "Santorini Black Metallic");
    updateText("interior", vehicle.interior || "Windsor Leather");
    updateText("stockId", vehicle.stockId || "RRC-LIVE");
    updateText("vinStatus", `VIN: ${vehicle.vinStatus || "Verified & Clean"}`);
    updateText("logbook", `Logbook: ${vehicle.logbook || "Ready for NTSA Transfer"}`);
    updateText("warranty", vehicle.warranty || "6 Months Atelier Warranty");
    updateText("location", vehicle.location || "Ridgeways Showroom");
    updateText("statement", vehicle.statement || vehicle.description || "A refined seven-seat expedition SUV combining Solihull grand touring comfort with dual-range Terrain Response capability, prepared and certified for Kenyan roads.");

    // Key facts tags
    updateText("yearTag", `Year: ${vehicle.year}`);
    updateText("mileageTag", `Mileage: ${vehicle.mileage || "Verified"}`);
    updateText("fuelTag", `Fuel: ${vehicle.fuel ? vehicle.fuel.charAt(0).toUpperCase() + vehicle.fuel.slice(1) : "Diesel"}`);
    updateText("transmissionTag", `Transmission: ${vehicle.transmission || "Automatic"}`);
    updateText("warrantyTag", `Warranty: ${vehicle.warranty || "6 Months"}`);

    updateLink("finance", `finance.html?car=${encodeURIComponent(vehicle.id)}`);
    updateLink("insurance", `insurance.html?car=${encodeURIComponent(vehicle.id)}`);

    const msg = encodeURIComponent(`Hello Range Rover Centre, I am interested in acquiring the ${vehicle.name} ${vehicle.trim || ""} (${vehicle.year}) priced at ${vehicle.price} (Ref: ${vehicle.stockId || vehicle.id}). Please provide the provenance file.`);
    if (whatsappBtn) whatsappBtn.href = `https://wa.me/254790374141?text=${msg}`;
    if (stickyWhatsappBtn) stickyWhatsappBtn.href = `https://wa.me/254790374141?text=${msg}`;

    if (heroImg && vehicle.images && vehicle.images.length) {
      heroImg.src = vehicle.images[0].src;
      heroImg.srcset = vehicle.images[0].srcset || vehicle.images[0].src;
      heroImg.alt = vehicle.images[0].alt || vehicle.name;
    }

    if (stickyThumbImg && vehicle.images && vehicle.images.length) {
      stickyThumbImg.src = vehicle.images[0].thumb || vehicle.images[0].src;
    }

    if (stackImg1 && vehicle.images) {
      stackImg1.src = (vehicle.images[1] ? vehicle.images[1].src : vehicle.images[0].src);
    }
    if (stackImg2 && vehicle.images) {
      stackImg2.src = (vehicle.images[2] ? vehicle.images[2].src : (vehicle.images[1] ? vehicle.images[1].src : vehicle.images[0].src));
    }

    if (thumbsContainer && vehicle.images && vehicle.images.length) {
      thumbsContainer.innerHTML = "";
      vehicle.images.forEach((image) => {
        thumbsContainer.appendChild(buildThumb(image));
      });
      bindThumbs();
    }

    // Render Similar Vehicles
    if (similarGrid) {
      similarGrid.innerHTML = "";
      const otherVehicles = Object.values(vehicles).filter(v => v.id !== vehicle.id).slice(0, 3);
      otherVehicles.forEach(sim => {
        const simImg = (sim.images && sim.images[0]) ? sim.images[0].src : "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=900&auto=format";
        const simCard = document.createElement("article");
        simCard.className = "rrc-showroom-card rrc-reveal revealed";
        simCard.innerHTML = `
          <div class="rrc-showroom-media">
            <img src="${simImg}" alt="${sim.name}" loading="lazy" />
          </div>
          <div class="rrc-showroom-body">
            <span class="rrc-mono-tag ${sim.availability === 'import' ? 'clay' : 'green'}">${sim.availability === 'import' ? 'UK In Transit' : 'Nairobi Ready'}</span>
            <div class="rrc-showroom-header">
              <h3 class="rrc-showroom-title">${sim.name} ${sim.trim || ""}</h3>
              <span class="rrc-showroom-price">${sim.price}</span>
            </div>
            <div class="rrc-showroom-specs">
              <span>${sim.power || "Output"}</span>
              <span>·</span>
              <span>${sim.engine || "Powertrain"}</span>
              <span>·</span>
              <span>${sim.mileage || "Verified"}</span>
            </div>
            <a class="rrc-btn rrc-btn-secondary rrc-btn-full" href="vehicle-detail.html?car=${encodeURIComponent(sim.id)}">View Dossier →</a>
          </div>
        `;
        similarGrid.appendChild(simCard);
      });
    }

    document.title = `${vehicle.name} ${vehicle.trim || ""} | Range Rover & Land Rover Centre`;
  };

  if (window.RRC_FETCH_PROMISE) {
    window.RRC_FETCH_PROMISE.then(() => {
      renderVehicle();
    });
  } else if (window.RRC_VEHICLES && Object.keys(window.RRC_VEHICLES).length > 0) {
    renderVehicle();
  }

  document.addEventListener("rrc:vehicles-ready", () => {
    renderVehicle();
  });

  // Sticky Bar Scroll Listener
  window.addEventListener("scroll", () => {
    if (!stickyBar) return;
    if (window.scrollY > 320) {
      stickyBar.classList.add("visible");
    } else {
      stickyBar.classList.remove("visible");
    }
  }, { passive: true });

  // Lightbox Handlers
  if (heroImg && lightbox && lightboxImg) {
    heroImg.addEventListener("click", () => {
      lightboxImg.src = heroImg.src;
      lightbox.classList.add("open");
    });
  }

  if (lightbox && lightboxClose) {
    lightboxClose.addEventListener("click", () => lightbox.classList.remove("open"));
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        lightbox.classList.remove("open");
      }
    });
  }
})();
