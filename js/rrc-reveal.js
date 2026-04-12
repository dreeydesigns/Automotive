const revealItems = Array.from(document.querySelectorAll(".rrc-reveal"));

const applyStagger = () => {
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
};

applyStagger();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => observer.observe(item));

const lazyImages = document.querySelectorAll("img.rrc-lazy");
lazyImages.forEach((img) => {
  if (img.complete) {
    img.classList.add("loaded");
    return;
  }
  img.addEventListener("load", () => img.classList.add("loaded"));
});
