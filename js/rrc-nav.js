const nav = document.querySelector(".rrc-nav");
const navToggle = document.getElementById("rrcNavToggle");
const navOverlay = document.getElementById("rrcNavOverlay");
const navClose = document.getElementById("rrcNavClose");

if (nav) {
  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 80);
  };
  onScroll();
  window.addEventListener("scroll", onScroll);
}

const toggleOverlay = (isOpen) => {
  if (!navOverlay) return;
  navOverlay.classList.toggle("open", isOpen);
  navOverlay.setAttribute("aria-hidden", isOpen ? "false" : "true");
  if (navToggle) {
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }
  document.body.style.overflow = isOpen ? "hidden" : "";
};

if (navToggle && navOverlay) {
  navToggle.addEventListener("click", () => toggleOverlay(true));
}

if (navClose && navOverlay) {
  navClose.addEventListener("click", () => toggleOverlay(false));
}

if (navOverlay) {
  navOverlay.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => toggleOverlay(false));
  });
}
