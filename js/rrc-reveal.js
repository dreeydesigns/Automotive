(() => {
  const applyStaggerAndObserve = () => {
    const revealItems = Array.from(document.querySelectorAll(".rrc-reveal:not(.revealed)"));
    if (!revealItems.length) return;

    const groups = new Map();
    revealItems.forEach((item) => {
      const parent = item.parentElement || document.body;
      if (!groups.has(parent)) {
        groups.set(parent, []);
      }
      groups.get(parent).push(item);
    });

    groups.forEach((items) => {
      items.forEach((item, index) => {
        item.style.transitionDelay = `${index * 80}ms`;
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealItems.forEach((item) => observer.observe(item));
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyStaggerAndObserve);
  } else {
    applyStaggerAndObserve();
  }

  document.addEventListener("rrc:vehicles-ready", () => {
    setTimeout(applyStaggerAndObserve, 50);
  });
  document.addEventListener("rrc:data-ready", () => {
    setTimeout(applyStaggerAndObserve, 50);
  });
})();
