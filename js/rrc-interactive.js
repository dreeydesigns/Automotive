(() => {
  // 1. Dual-Marque Switcher (Lamborghini & Lucid inspired)
  const marqueButtons = document.querySelectorAll("[data-marque-toggle]");
  const heroImage = document.getElementById("rrcHeroImage");
  const heroTitleSpan = document.getElementById("rrcHeroMarqueName");
  const telemetryPower = document.getElementById("telemetryPower");
  const telemetryTorque = document.getElementById("telemetryTorque");
  const telemetryTerrain = document.getElementById("telemetryTerrain");
  const telemetryWading = document.getElementById("telemetryWading");

  const marqueData = {
    "rangerover": {
      name: "Range Rover",
      image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=1920&auto=format&fit=crop&q=85",
      power: "523 HP",
      torque: "750 NM",
      terrain: "Terrain Response 2",
      wading: "900 MM"
    },
    "defender": {
      name: "Defender & Discovery",
      image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1920&auto=format&fit=crop&q=85",
      power: "518 HP",
      torque: "625 NM",
      terrain: "Configurable Terrain",
      wading: "900 MM"
    }
  };

  if (marqueButtons.length > 0) {
    marqueButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const marque = btn.getAttribute("data-marque-toggle");
        marqueButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const data = marqueData[marque];
        if (data) {
          if (heroImage) {
            heroImage.style.opacity = "0";
            setTimeout(() => {
              heroImage.src = data.image;
              heroImage.style.opacity = "1";
            }, 300);
          }
          if (heroTitleSpan) heroTitleSpan.textContent = data.name;
          if (telemetryPower) telemetryPower.textContent = data.power;
          if (telemetryTorque) telemetryTorque.textContent = data.torque;
          if (telemetryTerrain) telemetryTerrain.textContent = data.terrain;
          if (telemetryWading) telemetryWading.textContent = data.wading;
        }
      });
    });
  }

  // 2. Interactive Feature Hotspots (Rivian inspired)
  const hotspots = document.querySelectorAll("[data-hotspot]");
  const hotspotDialog = document.getElementById("rrcHotspotDialog");
  const hotspotTitle = document.getElementById("rrcHotspotTitle");
  const hotspotDesc = document.getElementById("rrcHotspotDesc");
  const hotspotClose = document.getElementById("rrcHotspotClose");

  const hotspotInfo = {
    "engine": {
      title: "5.0L Supercharged V8 & SDV6 Twin-Turbo",
      desc: "Imposing power delivery paired with factory diagnostic provenance. Calibrated for effortless cruising and altitude compensation."
    },
    "suspension": {
      title: "Electronic Air Suspension with Dynamic Response Pro",
      desc: "Adaptive damping adjusts up to 500 times a second, delivering magic-carpet serenity on highway and 900mm wading capability off-road."
    },
    "cabin": {
      title: "Executive Class Windsor Leather & Meridian Sound",
      desc: "Bespoke handcrafted sanctuary with active noise cancellation, seat massage telemetry, and four-zone climate control."
    },
    "terrain": {
      title: "Terrain Response 2 with All-Terrain Progress Control",
      desc: "Intelligent automatic powertrain and differential locking tailored for Kenyan terrain from the Rift Valley to the coast."
    }
  };

  if (hotspots.length > 0 && hotspotDialog) {
    hotspots.forEach(spot => {
      spot.addEventListener("click", (e) => {
        e.stopPropagation();
        const key = spot.getAttribute("data-hotspot");
        const info = hotspotInfo[key];
        if (info) {
          hotspots.forEach(s => s.classList.remove("active"));
          spot.classList.add("active");
          if (hotspotTitle) hotspotTitle.textContent = info.title;
          if (hotspotDesc) hotspotDesc.textContent = info.desc;
          hotspotDialog.classList.add("active");
        }
      });
    });

    if (hotspotClose) {
      hotspotClose.addEventListener("click", () => {
        hotspotDialog.classList.remove("active");
        hotspots.forEach(s => s.classList.remove("active"));
      });
    }

    document.addEventListener("click", (e) => {
      if (!hotspotDialog.contains(e.target)) {
        hotspotDialog.classList.remove("active");
        hotspots.forEach(s => s.classList.remove("active"));
      }
    });
  }

  // 3. Scroll-Driven Reveal Observer
  const revealElements = document.querySelectorAll(".rrc-reveal");
  if (revealElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    revealElements.forEach(el => observer.observe(el));
  }
})();
