(() => {
  // 1. Lamborghini / Koenigsegg Reduced Motion Toggle
  const animToggles = document.querySelectorAll("[data-toggle-animations]");
  const storedAnim = localStorage.getItem("rrc_animations");
  if (storedAnim === "false") {
    document.documentElement.setAttribute("data-animations", "false");
    animToggles.forEach(t => t.textContent = "Motion: Off");
  }

  animToggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const isOff = document.documentElement.getAttribute("data-animations") === "false";
      if (isOff) {
        document.documentElement.removeAttribute("data-animations");
        localStorage.setItem("rrc_animations", "true");
        toggle.textContent = "Motion: On";
      } else {
        document.documentElement.setAttribute("data-animations", "false");
        localStorage.setItem("rrc_animations", "false");
        toggle.textContent = "Motion: Off";
        const heroVideo = document.querySelector(".rrc-hero-video-wrap");
        if (heroVideo) heroVideo.style.transform = "none";
      }
    });
  });

  // 2. Koenigsegg Preloader & Entrance Choreography
  const preloader = document.getElementById("rrcPreloader");
  const heroWrap = document.querySelector(".rrc-hero-video-wrap");
  const maskLines = document.querySelectorAll(".rrc-mask-line");

  const triggerEntrance = () => {
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add("loaded");
      }, 700);
    }
    setTimeout(() => {
      if (heroWrap) heroWrap.classList.add("settled");
      maskLines.forEach((line, idx) => {
        setTimeout(() => line.classList.add("revealed"), idx * 120);
      });
    }, 900);
  };

  if (document.readyState === "complete") {
    triggerEntrance();
  } else {
    window.addEventListener("load", triggerEntrance);
  }

  // 3. Custom Minimalist Cursor
  if (window.matchMedia("(pointer: fine)").matches) {
    const dot = document.createElement("div");
    dot.className = "rrc-cursor-dot";
    const ring = document.createElement("div");
    ring.className = "rrc-cursor-ring";
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    const renderCursor = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(renderCursor);
    };
    renderCursor();

    document.querySelectorAll("a, button, [data-interactive]").forEach(el => {
      el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    });
  }

  // 4. Hero Narrative Rewriting on Scroll (Lightship + Koenigsegg Pinning)
  const heroHeadline = document.getElementById("rrcHeroHeadline");
  const nav = document.querySelector(".rrc-nav");

  const getHeroSequence = () => window.RRC_HERO_SEQUENCE || [
    "A DIFFERENT WAY TO ARRIVE.",
    "BUILT FOR THE CITY.",
    "READY FOR THE DISTANCE.",
    "BUILT FOR BOTH."
  ];

  let lastIndex = 0;

  const onScrollHero = () => {
    if (document.documentElement.getAttribute("data-animations") === "false") return;

    const scrollY = window.scrollY;
    const heroH = window.innerHeight;
    const heroSequence = getHeroSequence();

    if (nav) {
      nav.classList.toggle("scrolled", scrollY > 60);
    }

    if (scrollY < heroH * 1.5) {
      // Parallax scale & drift
      if (heroWrap) {
        heroWrap.style.transform = `translate3d(0, ${scrollY * 0.28}px, 0) scale(${1 - scrollY * 0.00015})`;
      }

      // Narrative text progression
      const progress = Math.min(Math.max(scrollY / (heroH * 0.8), 0), 1);
      const step = Math.min(Math.floor(progress * heroSequence.length), heroSequence.length - 1);

      if (step !== lastIndex && heroHeadline) {
        lastIndex = step;
        heroHeadline.style.opacity = "0";
        heroHeadline.style.transform = "translateY(12px)";
        setTimeout(() => {
          heroHeadline.textContent = heroSequence[step];
          heroHeadline.style.opacity = "1";
          heroHeadline.style.transform = "translateY(0)";
        }, 180);
      }
    }
  };

  window.addEventListener("scroll", onScrollHero, { passive: true });
  onScrollHero();

  // 5. Koenigsegg Telemetry Numeric Counter Animation
  const counterElements = document.querySelectorAll("[data-counter-target]");
  if (counterElements.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute("data-counter-target"));
          const prefix = el.getAttribute("data-counter-prefix") || "";
          const suffix = el.getAttribute("data-counter-suffix") || "";
          const isDecimal = target % 1 !== 0;
          let current = 0;
          const duration = 1200;
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = `${prefix}${isDecimal ? current.toFixed(1) : Math.round(current)}${suffix}`;
          }, stepTime);

          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    counterElements.forEach(el => counterObserver.observe(el));
  }

  // 6. Clip-Path Image Reveal Observer
  const clipElements = document.querySelectorAll(".rrc-clip-reveal");
  if (clipElements.length > 0) {
    const clipObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          clipObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    clipElements.forEach(el => clipObserver.observe(el));
  }

  // 7. Polestar Mega-Menu Interactive Preview
  const megaModelBtns = document.querySelectorAll(".rrc-mega-model-btn");
  const megaImg = document.getElementById("rrcMegaPreviewImg");
  const megaTitle = document.getElementById("rrcMegaPreviewTitle");
  const megaSub = document.getElementById("rrcMegaPreviewSub");
  const megaLink = document.getElementById("rrcMegaPreviewLink");

  const megaModelsData = {
    "rangerover": {
      title: "Range Rover Autobiography / SV",
      sub: "523 HP · 4.4L Twin-Turbo V8 · All-Wheel Steering",
      img: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=900&auto=format",
      url: "marketplace.html?make=range+rover"
    },
    "sport": {
      title: "Range Rover Sport First Edition",
      sub: "523 HP · Dynamic Response Pro · Stormer Handling Pack",
      img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&auto=format",
      url: "marketplace.html?make=range+rover"
    },
    "velar": {
      title: "Range Rover Velar R-Dynamic",
      sub: "300 HP · D300 Mild-Hybrid Diesel · Touch Pro Duo",
      img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=900&auto=format",
      url: "marketplace.html?make=range+rover"
    },
    "evoque": {
      title: "Range Rover Evoque Autobiography",
      sub: "249 HP · P250 Turbo · ClearSight Ground View",
      img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900&auto=format",
      url: "marketplace.html?make=range+rover"
    },
    "defender": {
      title: "Land Rover Defender 110 V8 Carpathian",
      sub: "518 HP · 5.0L Supercharged V8 · Electronic Active Diff",
      img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=900&auto=format",
      url: "marketplace.html?make=land+rover"
    },
    "discovery": {
      title: "Land Rover Discovery 5 HSE Luxury",
      sub: "300 HP · 7 Full-Size Seats · Terrain Response 2",
      img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=900&auto=format",
      url: "marketplace.html?make=land+rover"
    }
  };

  megaModelBtns.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      megaModelBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const key = btn.getAttribute("data-mega-key");
      const data = megaModelsData[key];
      if (data) {
        if (megaTitle) megaTitle.textContent = data.title;
        if (megaSub) megaSub.textContent = data.sub;
        if (megaLink) megaLink.href = data.url;
        if (megaImg) {
          megaImg.style.opacity = "0.4";
          setTimeout(() => {
            megaImg.src = data.img;
            megaImg.style.opacity = "1";
          }, 150);
        }
      }
    });
  });

  // 8. Lucid Model Switcher Interactive Engine
  const modelTabs = document.querySelectorAll(".rrc-model-tab");
  const modelImg = document.getElementById("rrcModelShowcaseImg");
  const modelTitle = document.getElementById("rrcModelShowcaseTitle");
  const modelDesc = document.getElementById("rrcModelShowcaseDesc");
  const modelPower = document.getElementById("rrcModelPower");
  const modelZeroSixty = document.getElementById("rrcModelZeroSixty");
  const modelDrive = document.getElementById("rrcModelDrive");
  const modelLink = document.getElementById("rrcModelLink");

  const modelShowcaseData = {
    "rangerover": {
      title: "Range Rover",
      desc: "Peerless refinement and effortless capability. The definitive luxury SUV for cross-county travel across East Africa.",
      power: "523 HP",
      zeroSixty: "4.4s",
      drive: "AWD / Steering",
      img: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=1400&auto=format",
      link: "marketplace.html?make=range+rover"
    },
    "sport": {
      title: "Range Rover Sport",
      desc: "Visceral, dramatic, and uncompromisingly agile. Dynamic air suspension with switchable volume chambers.",
      power: "523 HP",
      zeroSixty: "4.3s",
      drive: "Dynamic AWD",
      img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&auto=format",
      link: "marketplace.html?make=range+rover"
    },
    "velar": {
      title: "Range Rover Velar",
      desc: "Avant-garde proportions with flush deployable door handles and pure reductionist design language.",
      power: "300 HP",
      zeroSixty: "6.1s",
      drive: "Intelligent AWD",
      img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1400&auto=format",
      link: "marketplace.html?make=range+rover"
    },
    "evoque": {
      title: "Range Rover Evoque",
      desc: "Tailored luxury engineered for high-density metropolitan Nairobi with full off-tarmac confidence.",
      power: "249 HP",
      zeroSixty: "7.0s",
      drive: "Driveline AWD",
      img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1400&auto=format",
      link: "marketplace.html?make=range+rover"
    },
    "defender": {
      title: "Land Rover Defender",
      desc: "An icon reimagined for the 21st century. Monocoque D7x architecture tested over 1.2 million kilometers of extreme terrain.",
      power: "518 HP",
      zeroSixty: "4.9s",
      drive: "Permanent 4WD",
      img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1400&auto=format",
      link: "marketplace.html?make=land+rover"
    },
    "discovery": {
      title: "Land Rover Discovery",
      desc: "Seven full-sized adult seats, 3,500kg towing capacity, and intelligent seat fold technology for seamless family expeditions.",
      power: "300 HP",
      zeroSixty: "6.5s",
      drive: "Twin-Speed 4WD",
      img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1400&auto=format",
      link: "marketplace.html?make=land+rover"
    }
  };

  modelTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      modelTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const key = tab.getAttribute("data-model-tab");
      const data = modelShowcaseData[key];
      if (data) {
        if (modelTitle) modelTitle.textContent = data.title;
        if (modelDesc) modelDesc.textContent = data.desc;
        if (modelPower) modelPower.textContent = data.power;
        if (modelZeroSixty) modelZeroSixty.textContent = data.zeroSixty;
        if (modelDrive) modelDrive.textContent = data.drive;
        if (modelLink) modelLink.href = data.link;
        if (modelImg) {
          modelImg.style.opacity = "0.3";
          modelImg.style.transform = "scale(0.98)";
          setTimeout(() => {
            modelImg.src = data.img;
            modelImg.style.opacity = "1";
            modelImg.style.transform = "scale(1)";
          }, 200);
        }
      }
    });
  });

  // 9. Workshop Bay Switcher
  const workshopTabs = document.querySelectorAll(".rrc-workshop-tab");
  const workshopImg = document.getElementById("rrcWorkshopImg");
  const workshopTitle = document.getElementById("rrcWorkshopTitle");
  const workshopDesc = document.getElementById("rrcWorkshopDesc");
  const workshopTag = document.getElementById("rrcWorkshopTag");

  const workshopData = {
    "diagnostics": {
      title: "Factory Pathfinder & SDD Diagnostic Protocols",
      desc: "Full electronic control unit interrogation, module software flashes, real-time telemetry logging, and injector balance analysis.",
      tag: "Bay 01 // Electronics",
      img: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=900&auto=format"
    },
    "maintenance": {
      title: "Scheduled Servicing & Powertrain Care",
      desc: "Transmission fluid flushes, timing gear replacements for SDV6/V8 engines, and comprehensive preventative maintenance.",
      tag: "Bay 02 // Powertrain",
      img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&auto=format"
    },
    "parts": {
      title: "Direct Solihull Supply Chain",
      desc: "100% genuine Land Rover factory parts sourced directly from the UK with zero compromise on tolerances.",
      tag: "Bay 03 // Genuine Parts",
      img: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=900&auto=format"
    },
    "detail": {
      title: "Atelier Detailing & Ceramic Protection",
      desc: "Paint depth correction, high-solids ceramic coatings, and interior semi-aniline leather hydration for Kenyan sunshine.",
      tag: "Bay 04 // Detailing",
      img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=900&auto=format"
    }
  };

  workshopTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      workshopTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const key = tab.getAttribute("data-workshop-key");
      const data = workshopData[key];
      if (data) {
        if (workshopTitle) workshopTitle.textContent = data.title;
        if (workshopDesc) workshopDesc.textContent = data.desc;
        if (workshopTag) workshopTag.textContent = data.tag;
        if (workshopImg) {
          workshopImg.style.opacity = "0.3";
          setTimeout(() => {
            workshopImg.src = data.img;
            workshopImg.style.opacity = "1";
          }, 180);
        }
      }
    });
  });

  // 10. Lightship Pinned Story Observer
  const storyCards = document.querySelectorAll(".rrc-story-step-card");
  const storyStatement = document.getElementById("rrcStoryStatement");
  const storyImg = document.getElementById("rrcStoryImg");

  const storySteps = [
    {
      statement: "IT STARTS WITH THE RIGHT VEHICLE.",
      img: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=1200&auto=format"
    },
    {
      statement: "THEN THE DETAILS MATTER.",
      img: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=1200&auto=format"
    },
    {
      statement: "SO DOES WHO STANDS BEHIND IT.",
      img: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1200&auto=format"
    },
    {
      statement: "AND WHERE IT TAKES YOU.",
      img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1200&auto=format"
    }
  ];

  if (storyCards.length > 0 && storyStatement && storyImg) {
    const storyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-story-step") || 0);
          const data = storySteps[index];
          if (data) {
            storyStatement.style.opacity = "0";
            storyStatement.style.transform = "translateY(8px)";
            storyImg.style.opacity = "0.4";
            setTimeout(() => {
              storyStatement.textContent = data.statement;
              storyImg.src = data.img;
              storyStatement.style.opacity = "1";
              storyStatement.style.transform = "translateY(0)";
              storyImg.style.opacity = "1";
            }, 180);
          }
        }
      });
    }, { threshold: 0.5 });

    storyCards.forEach(card => storyObserver.observe(card));
  }
})();
