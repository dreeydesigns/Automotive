(() => {
  // 1. Lamborghini "Allow Animations" Toggle & Preference
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
        // Reset any inline parallax transforms
        const heroBackdrop = document.querySelector(".rrc-hero-backdrop");
        if (heroBackdrop) heroBackdrop.style.transform = "none";
        document.querySelectorAll(".rrc-reel-media img").forEach(img => img.style.transform = "none");
      }
    });
  });

  // 2. Custom Minimalist Cursor (Gated to pointer: fine)
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

  // 3. Section A: Real Throttled Parallax Engine (Ticket A1 & Ticket A2)
  const heroBackdrop = document.querySelector(".rrc-hero-backdrop");
  const reelImages = document.querySelectorAll(".rrc-reel-media img");
  let isTicking = false;

  const updateParallax = () => {
    // Ticket E2: Check motion preference
    if (document.documentElement.getAttribute("data-animations") === "false") {
      isTicking = false;
      return;
    }

    const scrollY = window.scrollY;

    // Ticket A1: Hero Backdrop Parallax (moves at 35% scroll speed relative to text)
    if (heroBackdrop && scrollY < window.innerHeight * 1.5) {
      const heroOffset = scrollY * 0.35;
      heroBackdrop.style.transform = `translate3d(0, ${heroOffset}px, 0)`;
    }

    // Ticket A2: Provenance Arc Reel Image Parallax inside fixed card frame
    if (reelImages.length > 0) {
      const windowHeight = window.innerHeight;
      reelImages.forEach(img => {
        const rect = img.parentElement.getBoundingClientRect();
        if (rect.bottom >= 0 && rect.top <= windowHeight) {
          // Calculate normalized relative position from center of screen (-1 to 1)
          const relY = (rect.top + rect.height / 2 - windowHeight / 2) / (windowHeight / 2);
          const imgOffset = relY * -24; // Subtle 24px vertical drift
          img.style.transform = `translate3d(0, ${imgOffset}px, 0) scale(1.12)`;
        }
      });
    }

    isTicking = false;
  };

  const onScroll = () => {
    if (!isTicking) {
      requestAnimationFrame(updateParallax);
      isTicking = true;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  updateParallax(); // Initial run

  // 4. Beat 3: Lightship Dynamic Rewriting Headline on Reel Scroll
  const dynamicHeadline = document.getElementById("rrcDynamicHeadline");
  const reelCards = document.querySelectorAll(".rrc-reel-card");

  const storyHeadlines = [
    "From the factory gates in Solihull...",
    "...to the open tarmac of Nairobi...",
    "...across the red dust of Laikipia...",
    "...home to the homestead."
  ];

  if (dynamicHeadline && reelCards.length > 0) {
    const reelObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-story-index") || 0);
          if (storyHeadlines[index]) {
            dynamicHeadline.style.opacity = "0";
            dynamicHeadline.style.transform = "translateY(8px)";
            setTimeout(() => {
              dynamicHeadline.textContent = storyHeadlines[index];
              dynamicHeadline.style.opacity = "1";
              dynamicHeadline.style.transform = "translateY(0)";
            }, 200);
          }
        }
      });
    }, { threshold: 0.5 });

    reelCards.forEach(card => reelObserver.observe(card));
  }

  // 5. Beat 2: Model Switcher (Range Rover vs Land Rover)
  const switcherBtns = document.querySelectorAll(".rrc-switcher-btn");
  const heroVideo = document.getElementById("rrcHeroArrivalVideo");
  const heroHeadline = document.getElementById("rrcHeroHeadline");

  const marqueThemes = {
    "rangerover": {
      title: "Solihull to the Great Rift.",
      poster: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=1920&auto=format&fit=crop&q=85"
    },
    "landrover": {
      title: "Built for Unforgiving Earth.",
      poster: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1920&auto=format&fit=crop&q=85"
    }
  };

  switcherBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      switcherBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const marque = btn.getAttribute("data-switcher-marque");
      const theme = marqueThemes[marque];
      if (theme) {
        if (heroHeadline) heroHeadline.textContent = theme.title;
        if (heroVideo && theme.poster) {
          heroVideo.setAttribute("poster", theme.poster);
        }
      }
    });
  });
})();
