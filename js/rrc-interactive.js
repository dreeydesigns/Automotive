(() => {
  // 1. Lamborghini "Allow Animations" Toggle
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
      }
    });
  });

  // 2. Custom Minimalist Cursor
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

  // 3. Lightship Dynamic Rewriting Headline on Scroll
  const dynamicHeadline = document.getElementById("rrcDynamicHeadline");
  const reelCards = document.querySelectorAll(".rrc-reel-card");

  const storyHeadlines = [
    "From the factory gates in Solihull...",
    "...to the open tarmac of Nairobi...",
    "...across the red dust of Laikipia...",
    "...home to the homestead."
  ];

  if (dynamicHeadline && reelCards.length > 0) {
    const observer = new IntersectionObserver((entries) => {
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

    reelCards.forEach(card => observer.observe(card));
  }

  // 4. Beat 2 Model Switcher & Polestar Marque Tabs
  const switcherBtns = document.querySelectorAll(".rrc-switcher-btn");
  const heroImage = document.getElementById("rrcHeroArrivalImage");
  const heroHeadline = document.getElementById("rrcHeroHeadline");

  const marqueThemes = {
    "rangerover": {
      title: "Solihull to the Great Rift.",
      image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=1920&auto=format&fit=crop&q=85",
      accent: "green"
    },
    "landrover": {
      title: "Built for Unforgiving Earth.",
      image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1920&auto=format&fit=crop&q=85",
      accent: "clay"
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
        if (heroImage) {
          heroImage.style.opacity = "0";
          setTimeout(() => {
            heroImage.src = theme.image;
            heroImage.style.opacity = "1";
          }, 250);
        }
      }
    });
  });

  // 5. Scroll Reveals
  const revealElements = document.querySelectorAll(".rrc-reveal");
  if (revealElements.length > 0) {
    const revObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    revealElements.forEach(el => revObserver.observe(el));
  }
})();
