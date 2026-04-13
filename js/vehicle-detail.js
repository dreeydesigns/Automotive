const heroImg = document.getElementById("detailHeroImg");
const lightbox = document.getElementById("detailLightbox");
const lightboxImg = document.getElementById("detailLightboxImg");
const lightboxClose = document.getElementById("detailLightboxClose");
const thumbsContainer = document.querySelector(".detail-thumbs");
const similarList = document.querySelector("[data-similar-list]");

const vehicles = window.RRC_VEHICLES || {};
const params = new URLSearchParams(window.location.search);
const defaultId = "range-rover-sport";
const activeId = params.get("car") || defaultId;
const vehicle = vehicles[activeId] || vehicles[defaultId];

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
  heroImg.srcset = srcset;
  heroImg.alt = alt;
  heroImg.classList.add("loaded");
  allThumbs.forEach((t) => t.classList.remove("active"));
  thumb.classList.add("active");
};

const buildThumb = (image) => {
  const wrapper = document.createElement("div");
  wrapper.className = "detail-thumb";
  wrapper.setAttribute("data-thumb", "");
  wrapper.setAttribute("data-src", image.src);
  wrapper.setAttribute("data-srcset", image.srcset);
  wrapper.setAttribute("data-alt", image.alt);
  wrapper.innerHTML = `<img class="rrc-lazy" src="${image.thumb}" srcset="${image.thumbSrcset}" loading="lazy" alt="${image.alt} thumbnail" />`;
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

if (vehicle) {
  updateText("name", vehicle.name);
  updateText("subtitle", `${vehicle.year} - ${vehicle.trim}`);
  updateText("price", vehicle.price);
  updateText("engine", vehicle.engine);
  updateText("power", vehicle.power);
  updateText("mileage", vehicle.mileage);
  updateText("transmission", vehicle.transmission);
  updateText("drivetrain", vehicle.drivetrain);
  updateText("exterior", vehicle.exterior);
  updateText("interior", vehicle.interior);
  updateText("service", "Full RRC logbook");
  updateText("stockId", vehicle.stockId);
  updateText("vinStatus", vehicle.vinStatus);
  updateText("logbook", vehicle.logbook);
  updateText("warranty", vehicle.warranty);
  updateText("location", vehicle.location);
  const powerParts = (vehicle.power || "").split("/");
  updateText("powerSimple", powerParts[0] ? powerParts[0].trim() : "N/A");
  updateText("torque", powerParts[1] ? powerParts[1].trim() : "N/A");
  updateText("acceleration", vehicle.acceleration || "6.8s");

  updateLink("finance", `finance.html?car=${vehicle.id}`);
  updateLink("insurance", `insurance.html?car=${vehicle.id}`);

  if (heroImg && vehicle.images && vehicle.images.length) {
    heroImg.src = vehicle.images[0].src;
    heroImg.srcset = vehicle.images[0].srcset;
    heroImg.alt = vehicle.images[0].alt;
  }

  if (thumbsContainer && vehicle.images && vehicle.images.length) {
    thumbsContainer.innerHTML = "";
    vehicle.images.forEach((image) => {
      thumbsContainer.appendChild(buildThumb(image));
    });
  }

  if (similarList) {
    const similarIds =
      vehicle.similar && vehicle.similar.length
        ? vehicle.similar
        : Object.keys(vehicles).filter((id) => id !== vehicle.id).slice(0, 3);
    similarList.innerHTML = "";
    similarIds.forEach((id) => {
      const similarVehicle = vehicles[id];
      if (!similarVehicle) return;
      const link = document.createElement("a");
      link.className = "rrc-pillar";
      link.href = `vehicle-detail.html?car=${similarVehicle.id}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = `${similarVehicle.name} ${similarVehicle.trim}`;
      similarList.appendChild(link);
    });
  }

  document.title = `${vehicle.name} ${vehicle.trim} | Range Rover Centre`;
}

bindThumbs();

if (heroImg && lightbox && lightboxImg) {
  heroImg.addEventListener("click", () => {
    lightboxImg.src = heroImg.src;
    lightboxImg.srcset = heroImg.srcset;
    lightboxImg.alt = heroImg.alt;
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
