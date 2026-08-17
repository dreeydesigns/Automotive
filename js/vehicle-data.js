(() => {
  const SANITY_PROJECT_ID = "ckvlowx4";
  const SANITY_DATASET = "production";
  const SANITY_API_VERSION = "v2023-08-01";

  const makeStaticImage = (file, alt) => ({
    src: `assets/images/${file}`,
    srcset: `assets/images/${file} 900w, assets/images/${file} 1400w`,
    thumb: `assets/images/${file}`,
    thumbSrcset: `assets/images/${file} 200w, assets/images/${file} 400w`,
    alt,
  });

  const staticVehicles = {
    "range-rover-sport": {
      id: "range-rover-sport",
      name: "Range Rover Sport",
      trim: "Autobiography",
      year: "2022",
      price: "KES 18.5M",
      priceValue: 18500000,
      mileage: "38,000 KM",
      mileageValue: 38000,
      engine: "3.0L SDV6 / 3000cc",
      power: "340 hp / 700 Nm",
      transmission: "8-Speed Automatic",
      drivetrain: "AWD / Terrain Response 2",
      exterior: "Fuji White / Black Pack",
      interior: "Ebony Windsor Leather",
      fuel: "Diesel",
      stockId: "RRC-2241",
      vinStatus: "Verified",
      logbook: "Ready",
      warranty: "12 Months",
      location: "Nairobi",
      availability: "kenya",
      make: "range rover",
      model: "range rover sport",
      body: "suv",
      color: "white",
      history: ["rrc-certified", "accident-free", "full-service", "warranty"],
      date: "2025-03-12",
      images: [
        makeStaticImage("rr-sport-front.jpg", "Range Rover Sport Autobiography front"),
        makeStaticImage("rr-sport-rear.jpg", "Range Rover Sport rear"),
        makeStaticImage("rr-sport-interior.jpg", "Range Rover Sport interior"),
        makeStaticImage("hero-velar.jpg", "Range Rover detail"),
      ],
      similar: ["range-rover-velar", "range-rover-autobiography", "defender-110"],
    },
    "range-rover-velar": {
      id: "range-rover-velar",
      name: "Range Rover Velar",
      trim: "R-Dynamic",
      year: "2021",
      price: "KES 14.2M",
      priceValue: 14200000,
      mileage: "52,000 KM",
      mileageValue: 52000,
      engine: "2.0L Si4 / 2000cc",
      power: "247 hp / 365 Nm",
      transmission: "8-Speed Automatic",
      drivetrain: "AWD / Terrain Response",
      exterior: "Silicon Silver / Black Contrast",
      interior: "Ebony Leather",
      fuel: "Petrol",
      stockId: "RRC-2197",
      vinStatus: "Verified",
      logbook: "In transit",
      warranty: "6 Months",
      location: "Import stock",
      availability: "import",
      make: "range rover",
      model: "range rover velar",
      body: "suv",
      color: "silver",
      history: ["rrc-certified", "full-service"],
      date: "2025-02-28",
      images: [
        makeStaticImage("hero-velar.jpg", "Range Rover Velar front"),
        makeStaticImage("rr-sport-front.jpg", "Range Rover detail"),
        makeStaticImage("rr-sport-interior.jpg", "Range Rover interior"),
        makeStaticImage("rr-sport-rear.jpg", "Range Rover detail rear"),
      ],
      similar: ["range-rover-sport", "range-rover-vogue", "defender-110"],
    },
    "range-rover-autobiography": {
      id: "range-rover-autobiography",
      name: "Range Rover",
      trim: "Autobiography",
      year: "2014",
      price: "KES 21.5M",
      priceValue: 21500000,
      mileage: "62,000 KM",
      mileageValue: 62000,
      engine: "5.0L V8 / 5000cc",
      power: "510 hp / 625 Nm",
      transmission: "8-Speed Automatic",
      drivetrain: "AWD / Terrain Response 2",
      exterior: "Santorini Black / Shadow Pack",
      interior: "Ivory leather",
      fuel: "Petrol",
      stockId: "RRC-2033",
      vinStatus: "Verified",
      logbook: "Ready",
      warranty: "12 Months",
      location: "Nairobi",
      availability: "kenya",
      make: "range rover",
      model: "range rover autobiography",
      body: "suv",
      color: "black",
      history: ["rrc-certified", "accident-free", "warranty"],
      date: "2025-01-16",
      images: [
        makeStaticImage("rr-sport-front.jpg", "Range Rover Autobiography front"),
        makeStaticImage("rr-sport-rear.jpg", "Range Rover detail"),
        makeStaticImage("rr-sport-interior.jpg", "Range Rover interior"),
        makeStaticImage("hero-velar.jpg", "Range Rover detail"),
      ],
      similar: ["range-rover-vogue", "range-rover-sport", "defender-110"],
    },
    "range-rover-vogue": {
      id: "range-rover-vogue",
      name: "Range Rover Vogue",
      trim: "SE",
      year: "2017",
      price: "KES 17.5M",
      priceValue: 17500000,
      mileage: "64,000 KM",
      mileageValue: 64000,
      engine: "4.4L SDV8 / 4400cc",
      power: "339 hp / 740 Nm",
      transmission: "8-Speed Automatic",
      drivetrain: "AWD / Terrain Response 2",
      exterior: "Santorini Black / Privacy glass",
      interior: "Ebony leather",
      fuel: "Diesel",
      stockId: "RRC-2112",
      vinStatus: "Verified",
      logbook: "Ready",
      warranty: "6 Months",
      location: "Nairobi",
      availability: "kenya",
      make: "range rover",
      model: "range rover vogue",
      body: "suv",
      color: "black",
      history: ["rrc-certified", "full-service"],
      date: "2025-02-10",
      images: [
        makeStaticImage("rr-sport-rear.jpg", "Range Rover Vogue front"),
        makeStaticImage("rr-sport-front.jpg", "Range Rover detail"),
        makeStaticImage("rr-sport-interior.jpg", "Range Rover interior"),
        makeStaticImage("hero-velar.jpg", "Range Rover detail"),
      ],
      similar: ["range-rover-sport", "range-rover-autobiography", "range-rover-classic"],
    },
    "defender-110": {
      id: "defender-110",
      name: "Defender 110",
      trim: "SE",
      year: "2020",
      price: "KES 19.8M",
      priceValue: 19800000,
      mileage: "44,000 KM",
      mileageValue: 44000,
      engine: "3.0L D300 / 3000cc",
      power: "296 hp / 650 Nm",
      transmission: "8-Speed Automatic",
      drivetrain: "AWD / Terrain Response",
      exterior: "Pangea Green",
      interior: "Ebony grained leather",
      fuel: "Diesel",
      stockId: "RRC-2278",
      vinStatus: "Verified",
      logbook: "In transit",
      warranty: "6 Months",
      location: "Import stock",
      availability: "import",
      make: "land rover",
      model: "defender 110",
      body: "suv",
      color: "green",
      history: ["rrc-certified", "warranty"],
      date: "2025-01-22",
      images: [
        makeStaticImage("rr-sport-front.jpg", "Land Rover Defender 110 front"),
        makeStaticImage("hero-velar.jpg", "Range Rover detail"),
        makeStaticImage("rr-sport-interior.jpg", "Range Rover interior"),
        makeStaticImage("rr-sport-rear.jpg", "Range Rover detail rear"),
      ],
      similar: ["range-rover-sport", "range-rover-velar", "range-rover-vogue"],
    },
  };

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

  window.RRC_VEHICLES = { ...staticVehicles };
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
      // Query vehicles, siteSettings, and blog posts simultaneously
      const query = encodeURIComponent(`{
        "vehicles": *[_type == "vehicle"] | order(_createdAt desc),
        "settings": *[_type == "siteSettings"][0],
        "posts": *[_type == "post"] | order(publishedAt desc)
      }`);

      const res = await fetch(`https://${SANITY_PROJECT_ID}.api.sanity.io/${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${query}`);
      if (!res.ok) throw new Error(`Sanity fetch error: ${res.statusText}`);
      const data = await res.json();
      const result = data.result || {};

      // 1. Process Vehicles
      if (Array.isArray(result.vehicles) && result.vehicles.length > 0) {
        const liveVehicles = {};
        result.vehicles.forEach((doc) => {
          const transformed = transformSanityDoc(doc);
          liveVehicles[transformed.id] = transformed;
        });

        // Live Sanity cars take full precedence, followed by fallback catalogue
        window.RRC_VEHICLES = {
          ...liveVehicles,
          ...staticVehicles,
        };
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
      console.warn("Could not fetch Sanity data live, using static dataset fallback.", err);
    }

    document.dispatchEvent(new CustomEvent("rrc:vehicles-ready", { detail: window.RRC_VEHICLES }));
    document.dispatchEvent(new CustomEvent("rrc:data-ready", { detail: { vehicles: window.RRC_VEHICLES, settings: window.RRC_SETTINGS, posts: window.RRC_POSTS } }));
    return window.RRC_VEHICLES;
  })();
})();
