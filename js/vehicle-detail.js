const heroImg = document.getElementById("detailHeroImg");
const lightbox = document.getElementById("detailLightbox");
const lightboxImg = document.getElementById("detailLightboxImg");
const lightboxClose = document.getElementById("detailLightboxClose");

const thumbs = Array.from(document.querySelectorAll("[data-thumb]") || []);

const setHero = (thumb) => {
  if (!heroImg || !thumb) return;
  const src = thumb.getAttribute("data-src");
  const srcset = thumb.getAttribute("data-srcset");
  const alt = thumb.getAttribute("data-alt") || "Vehicle image";
  heroImg.src = src;
  heroImg.srcset = srcset;
  heroImg.alt = alt;
  heroImg.classList.add("loaded");
  thumbs.forEach((t) => t.classList.remove("active"));
  thumb.classList.add("active");
};

thumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => setHero(thumb));
  if (index === 0) {
    thumb.classList.add("active");
  }
});

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
