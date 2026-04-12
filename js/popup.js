const isHome = document.body.dataset.page === "home";
if (isHome) {
  sessionStorage.setItem("rrc_landing_visited", "true");
}

const popup = document.getElementById("rrcPopup");
if (popup) {
  const alreadyShown = sessionStorage.getItem("rrc_popup_shown") === "true";
  if (!isHome && !alreadyShown) {
    const visitedLanding = sessionStorage.getItem("rrc_landing_visited") === "true";
    const delay = visitedLanding ? 1200 : 8000;

    const openPopup = () => {
      popup.classList.add("open");
      popup.setAttribute("aria-hidden", "false");
      sessionStorage.setItem("rrc_popup_shown", "true");
    };

    setTimeout(openPopup, delay);
  }

  const closePopup = () => {
    popup.classList.remove("open");
    popup.setAttribute("aria-hidden", "true");
  };

  popup.querySelectorAll("[data-popup-close]").forEach((el) => {
    el.addEventListener("click", closePopup);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePopup();
    }
  });
}
