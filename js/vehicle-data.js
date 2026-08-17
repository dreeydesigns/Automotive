(() => {
  const SANITY_PROJECT_ID = "ckvlowx4";
  const SANITY_DATASET = "production";
  const SANITY_API_VERSION = "v2023-08-01";

  const parseSanityAssetUrl = (assetRef) => {
    if (!assetRef || typeof assetRef !== "string") return null;
    const parts = assetRef.split("-");
    if (parts.length < 4) return null;
    const id = parts[1];
    const dimensions = parts[2];
    const format = parts[3];
    return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}-${dimensions}.${format}`;
  };

  const transformSanityDoc = (doc) => {
    const slug = doc.slug?.current || doc._id;
    const name = doc.name || "Untitled Vehicle";
    const trim = doc.trim || "";
    const year = String(doc.year || "");
    const price = doc.price || (doc.priceValue ? `KES ${(doc.priceValue / 1000000).toFixed(1)}M` : "Contact for Price");
    const priceValue = Number(doc.priceValue || 0);
    const mileage = doc.mileage || "";
    const cleanMileage = (mileage || "").replace(/[^0-9]/g, "");
    const mileageValue = cleanMileage ? Number(cleanMileage) : 0;
    const location = doc.location || "Nairobi";
    const availability = location.toLowerCase().includes("import") ? "import" : "kenya";

    const fullNameLower = `${name} ${trim}`.toLowerCase();
    let make = "range rover";
    if (fullNameLower.includes("defender") || fullNameLower.includes("discovery") || fullNameLower.includes("land rover")) {
      make = "land rover";
    }

    let model = slug;
    if (fullNameLower.includes("discovery")) model = "discovery";
    else if (fullNameLower.includes("sport")) model = "range rover sport";
    else if (fullNameLower.includes("velar")) model = "range rover velar";
    else if (fullNameLower.includes("autobiography")) model = "range rover autobiography";
    else if (fullNameLower.includes("vogue")) model = "range rover vogue";
    else if (fullNameLower.includes("defender")) model = "defender 110";

    const exteriorLower = (doc.exterior || "").toLowerCase();
    let color = "other";
    const knownColors = ["black", "white", "silver", "grey", "gray", "blue", "green", "red", "gold", "bronze", "brown"];
    for (const c of knownColors) {
      if (exteriorLower.includes(c)) {
        color = c === "gray" ? "grey" : c;
        break;
      }
    }

    const images = (doc.images || [])
      .map((img) => {
        const assetRef = img?.asset?._ref;
        const cdnUrl = parseSanityAssetUrl(assetRef);
        if (!cdnUrl) return null;
        const alt = img.alt || name;
        return {
          src: cdnUrl,
          srcset: `${cdnUrl}?w=900&auto=format 900w, ${cdnUrl}?w=1400&auto=format 1400w`,
          thumb: `${cdnUrl}?w=400&auto=format`,
          thumbSrcset: `${cdnUrl}?w=200&auto=format 200w, ${cdnUrl}?w=400&auto=format 400w`,
          alt,
        };
      })
      .filter(Boolean);

    if (images.length === 0) {
      images.push({
        src: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=1200&auto=format",
        srcset: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=900 900w",
        thumb: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=400",
        thumbSrcset: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=200 200w",
        alt: name,
      });
    }

    return {
      id: slug,
      name,
      trim,
      year,
      price,
      priceValue,
      mileage,
      mileageValue,
      engine: doc.engine || "",
      power: doc.power || "",
      transmission: doc.transmission || "Automatic",
      drivetrain: doc.drivetrain || "AWD",
      exterior: doc.exterior || "",
      interior: doc.interior || "",
      fuel: (doc.fuel || "Petrol").toLowerCase(),
      stockId: doc.stockId || `RRC-${year}`,
      vinStatus: doc.vinStatus || "Verified",
      logbook: doc.logbook || "Ready",
      warranty: doc.warranty || "3 Months",
      location,
      availability,
      make,
      model,
      body: "suv",
      color,
      history: ["rrc-certified", "warranty", "full-service"],
      date: doc._createdAt ? doc._createdAt.split("T")[0] : "2026-08-17",
      images,
      featured: Boolean(doc.featured),
      similar: [],
    };
  };

  // Only real vehicles from Sanity CMS (no dummy/fake fallback cards)
  window.RRC_VEHICLES = {};
  window.RRC_SETTINGS = null;
  window.RRC_POSTS = [];

  const updateSiteSettingsDom = (settings) => {
    if (!settings) return;
    window.RRC_SETTINGS = settings;

    // Hero updates
    const eyebrow = document.querySelector("[data-sanity='heroEyebrow']");
    if (eyebrow && settings.heroEyebrow) eyebrow.textContent = settings.heroEyebrow;

    const title1 = document.querySelector("[data-sanity='heroTitleLine1']");
    if (title1 && settings.heroTitleLine1) title1.textContent = settings.heroTitleLine1;

    const title2 = document.querySelector("[data-sanity='heroTitleLine2']");
    if (title2 && settings.heroTitleLine2) title2.textContent = settings.heroTitleLine2;

    const subtitle = document.querySelector("[data-sanity='heroSubtitle']");
    if (subtitle && settings.heroSubtitle) subtitle.textContent = settings.heroSubtitle;

    const btnPrimary = document.querySelector("[data-sanity-link='heroPrimaryCta']");
    if (btnPrimary) {
      if (settings.heroPrimaryCtaText) btnPrimary.textContent = settings.heroPrimaryCtaText;
      if (settings.heroPrimaryCtaLink) btnPrimary.href = settings.heroPrimaryCtaLink;
    }

    const btnSecondary = document.querySelector("[data-sanity-link='heroSecondaryCta']");
    if (btnSecondary) {
      if (settings.heroSecondaryCtaText) btnSecondary.textContent = settings.heroSecondaryCtaText;
      if (settings.heroSecondaryCtaLink) btnSecondary.href = settings.heroSecondaryCtaLink;
    }

    // Hero Background Image
    if (settings.heroBackgroundImage?.asset?._ref) {
      const bannerUrl = parseSanityAssetUrl(settings.heroBackgroundImage.asset._ref);
      const heroEl = document.querySelector(".rrc-hero");
      if (heroEl && bannerUrl) {
        heroEl.style.backgroundImage = `linear-gradient(to bottom, rgba(17,17,17,0.7), rgba(17,17,17,0.85)), url('${bannerUrl}')`;
        heroEl.style.backgroundSize = "cover";
        heroEl.style.backgroundPosition = "center";
      }
    }

    // Contact info
    if (settings.phone) {
      document.querySelectorAll("[data-sanity='phone']").forEach((el) => (el.textContent = settings.phone));
    }
    if (settings.email) {
      document.querySelectorAll("[data-sanity='email']").forEach((el) => (el.textContent = settings.email));
    }
    if (settings.address) {
      document.querySelectorAll("[data-sanity='address']").forEach((el) => (el.textContent = settings.address));
    }
  };

  window.RRC_FETCH_PROMISE = (async () => {
    try {
      const query = encodeURIComponent(`{
        "vehicles": *[_type == "vehicle"] | order(_createdAt desc),
        "settings": *[_type == "siteSettings"][0],
        "posts": *[_type == "post"] | order(publishedAt desc)
      }`);

      const res = await fetch(`https://${SANITY_PROJECT_ID}.api.sanity.io/${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${query}`);
      if (!res.ok) throw new Error(`Sanity fetch error: ${res.statusText}`);
      const data = await res.json();
      const result = data.result || {};

      // 1. Process Real Vehicles
      if (Array.isArray(result.vehicles)) {
        const liveVehicles = {};
        result.vehicles.forEach((doc) => {
          const transformed = transformSanityDoc(doc);
          liveVehicles[transformed.id] = transformed;
        });
        window.RRC_VEHICLES = liveVehicles;
      }

      // 2. Process Site Settings & Banner
      if (result.settings) {
        updateSiteSettingsDom(result.settings);
      }

      // 3. Process Blog Posts
      if (Array.isArray(result.posts)) {
        window.RRC_POSTS = result.posts.map((p) => ({
          ...p,
          coverImageUrl: parseSanityAssetUrl(p.coverImage?.asset?._ref),
        }));
      }
    } catch (err) {
      console.warn("Could not fetch Sanity data live:", err);
    }

    document.dispatchEvent(new CustomEvent("rrc:vehicles-ready", { detail: window.RRC_VEHICLES }));
    document.dispatchEvent(new CustomEvent("rrc:data-ready", { detail: { vehicles: window.RRC_VEHICLES, settings: window.RRC_SETTINGS, posts: window.RRC_POSTS } }));
    return window.RRC_VEHICLES;
  })();
})();
