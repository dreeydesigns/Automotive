(() => {
  const heroImg = document.getElementById("detailHeroImg");
  const lightbox = document.getElementById("detailLightbox");
  const lightboxImg = document.getElementById("detailLightboxImg");
  const lightboxClose = document.getElementById("detailLightboxClose");
  const thumbsContainer = document.getElementById("detailThumbsTrack") || document.querySelector(".detail-thumbs-track") || document.querySelector(".detail-thumbs");
  const whatsappBtn = document.getElementById("detailWhatsappBtn");

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
    wrapper.setAttribute("data-alt", image.alt);
    wrapper.innerHTML = `<img src="${image.thumb || image.src}" loading="lazy" alt="${image.alt} thumbnail" />`;
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

  const renderVehicle = () => {
    const vehicles = window.RRC_VEHICLES || {};
    const params = new URLSearchParams(window.location.search);
    const keys = Object.keys(vehicles);
    if (keys.length === 0) return;

    const defaultId = keys[0];
    const requestedId = params.get("car");
    const vehicle = (requestedId && vehicles[requestedId]) || vehicles[defaultId];

    if (!vehicle) return;

    updateText("name", `${vehicle.name} ${vehicle.trim}`);
    updateText("subtitle", `${vehicle.year} · ${vehicle.trim}`);
    updateText("price", vehicle.price);
    updateText("engine", vehicle.engine || "3.0L SDV6 Twin-Turbo");
    updateText("power", vehicle.power || "241 HP / 600 Nm");
    updateText("mileage", vehicle.mileage || "Verified");
    updateText("transmission", vehicle.transmission || "8-Speed Automatic");
    updateText("drivetrain", vehicle.drivetrain || "AWD / Terrain Response 2");
    updateText("exterior", vehicle.exterior || "Santorini Black");
    updateText("interior", vehicle.interior || "Windsor Leather");
    updateText("service", "Full RRC Logbook History");
    updateText("stockId", vehicle.stockId || "RRC-LIVE");
    updateText("vinStatus", `VIN: ${vehicle.vinStatus || "Verified"}`);
    updateText("logbook", `Logbook: ${vehicle.logbook || "Ready"}`);
    updateText("warranty", vehicle.warranty || "6 Months");
    updateText("location", vehicle.location || "Nairobi");

    updateLink("finance", `finance.html?car=${encodeURIComponent(vehicle.id)}`);
    updateLink("insurance", `insurance.html?car=${encodeURIComponent(vehicle.id)}`);

    if (whatsappBtn) {
      const msg = encodeURIComponent(`Hello Range Rover Centre, I am interested in acquiring the ${vehicle.name} ${vehicle.trim} (${vehicle.year}) priced at ${vehicle.price} (Stock: ${vehicle.stockId}). Please provide the full provenance file.`);
      whatsappBtn.href = `https://wa.me/254790374141?text=${msg}`;
    }

    if (heroImg && vehicle.images && vehicle.images.length) {
      heroImg.src = vehicle.images[0].src;
      heroImg.srcset = vehicle.images[0].srcset || vehicle.images[0].src;
      heroImg.alt = vehicle.images[0].alt || vehicle.name;
    }

    if (thumbsContainer && vehicle.images && vehicle.images.length) {
      thumbsContainer.innerHTML = "";
      vehicle.images.forEach((image) => {
        thumbsContainer.appendChild(buildThumb(image));
      });
      bindThumbs();
    }

    document.title = `${vehicle.name} ${vehicle.trim} | Range Rover Centre`;
  };

  renderVehicle();

  document.addEventListener("rrc:vehicles-ready", () => {
    renderVehicle();
  });

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
