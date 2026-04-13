const vehicles = window.RRC_VEHICLES || {};
const params = new URLSearchParams(window.location.search);
const defaultId = "range-rover-sport";
const activeId = params.get("car") || defaultId;
const vehicle = vehicles[activeId] || vehicles[defaultId];

const updateText = (selector, value) => {
  const el = document.querySelector(selector);
  if (el && value) {
    el.textContent = value;
  }
};

const updateImage = (selector, image) => {
  const img = document.querySelector(selector);
  if (!img || !image) return;
  img.src = image.src;
  img.srcset = image.srcset;
  img.alt = image.alt;
};

const buildVehicleLink = (id) => new URL(`vehicle-detail.html?car=${id}`, window.location.href).href;

if (vehicle) {
  const summaryLink = document.querySelector("[data-vehicle-link]");
  const vehicleLink = buildVehicleLink(vehicle.id);
  const channel = document.body.getAttribute("data-page") || "finance";

  updateText("[data-vehicle-name]", vehicle.name);
  updateText("[data-vehicle-subtitle]", `${vehicle.year} - ${vehicle.trim}`);
  updateText("[data-vehicle-price]", vehicle.price);
  updateText("[data-vehicle-mileage]", vehicle.mileage);
  updateText("[data-vehicle-engine]", vehicle.engine);
  updateText("[data-vehicle-stock]", `Stock ID: ${vehicle.stockId}`);
  updateImage("[data-vehicle-image]", vehicle.images?.[0]);

  if (summaryLink) {
    summaryLink.href = vehicleLink;
  }

  const message = `Hello RRC, I am interested in the ${vehicle.name} ${vehicle.trim} (${vehicle.year}). Vehicle link: ${vehicleLink}. I would like ${channel} assistance. Stock ID: ${vehicle.stockId}.`;
  const whatsapp = document.querySelector("[data-contact='whatsapp']");
  const email = document.querySelector("[data-contact='email']");
  const call = document.querySelector("[data-contact='call']");

  if (whatsapp) {
    whatsapp.href = `https://wa.me/254790374141?text=${encodeURIComponent(message)}`;
  }

  if (email) {
    const subject = `${channel === "insurance" ? "Insurance" : "Finance"} assistance for ${vehicle.name} ${vehicle.trim}`;
    email.href = `mailto:info@rangerovercentre.co.ke?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  }

  if (call) {
    call.href = "tel:+254790374141";
  }

  const copyButton = document.querySelector("[data-copy-link]");
  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(vehicleLink);
        copyButton.textContent = "Link copied";
        setTimeout(() => {
          copyButton.textContent = "Copy Vehicle Link";
        }, 2000);
      } catch (error) {
        copyButton.textContent = "Copy failed";
        setTimeout(() => {
          copyButton.textContent = "Copy Vehicle Link";
        }, 2000);
      }
    });
  }
}
