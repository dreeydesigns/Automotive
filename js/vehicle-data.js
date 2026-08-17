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

  const curatedLuxuryFleet = {
    "range-rover-autobiography-sv": {
      id: "range-rover-autobiography-sv",
      name: "Range Rover",
      trim: "Autobiography SV · Long Wheelbase",
      year: "2024",
      price: "KES 34.5M",
      priceValue: 34500000,
      mileage: "12,400 KM",
      mileageValue: 12400,
      engine: "4.4L Twin-Turbo V8 / 4400cc",
      power: "523 HP / 750 Nm",
      transmission: "8-Speed ZF Automatic",
      drivetrain: "AWD / Dynamic Response Pro",
      exterior: "Santorini Black Metallic / Shadow Pack",
      interior: "Perlino Semi-Aniline Leather",
      fuel: "petrol",
      stockId: "RRC-SV-2024",
      vinStatus: "Verified",
      logbook: "Ready for Transfer",
      warranty: "24 Months Atelier Warranty",
      location: "Ridgeways Showroom",
      availability: "kenya",
      make: "range rover",
      model: "range rover autobiography",
      body: "suv",
      color: "black",
      history: ["rrc-certified", "warranty", "full-service"],
      date: "2026-08-17",
      images: [
        {
          src: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=1600&auto=format&fit=crop&q=85",
          srcset: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=900 900w, https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=1600 1600w",
          thumb: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=400",
          alt: "Range Rover Autobiography SV Front 3/4"
        },
        {
          src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&auto=format&fit=crop&q=85",
          srcset: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900 900w, https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600 1600w",
          thumb: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400",
          alt: "Range Rover Rear Profile"
        },
        {
          src: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=1600&auto=format&fit=crop&q=85",
          srcset: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=900 900w, https://images.unsplash.com/photo-1563720223185-11003d516935?w=1600 1600w",
          thumb: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400",
          alt: "Executive Cabin Windsor Leather"
        }
      ]
    },
    "defender-110-v8-carpathian": {
      id: "defender-110-v8-carpathian",
      name: "Land Rover Defender 110",
      trim: "V8 Carpathian Edition · 5.0L Supercharged",
      year: "2023",
      price: "KES 22.8M",
      priceValue: 22800000,
      mileage: "18,900 KM",
      mileageValue: 18900,
      engine: "5.0L Supercharged V8 / 5000cc",
      power: "518 HP / 625 Nm",
      transmission: "8-Speed Quickshift Automatic",
      drivetrain: "AWD / Configurable Terrain 2",
      exterior: "Carpathian Grey Satin / Gloss Black",
      interior: "Ebony Windsor Leather & Dinamica Suede",
      fuel: "petrol",
      stockId: "RRC-DEF-110",
      vinStatus: "Verified",
      logbook: "Ready for Transfer",
      warranty: "12 Months Atelier Warranty",
      location: "Ridgeways Showroom",
      availability: "kenya",
      make: "land rover",
      model: "defender 110",
      body: "suv",
      color: "grey",
      history: ["rrc-certified", "warranty", "full-service"],
      date: "2026-08-15",
      images: [
        {
          src: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1600&auto=format&fit=crop&q=85",
          srcset: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=900 900w, https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1600 1600w",
          thumb: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=400",
          alt: "Defender 110 V8 Front Action"
        },
        {
          src: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=1600&auto=format&fit=crop&q=85",
          srcset: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=900 900w",
          thumb: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=400",
          alt: "Defender 110 Details"
        }
      ]
    },
    "range-rover-sport-first-edition": {
      id: "range-rover-sport-first-edition",
      name: "Range Rover Sport",
      trim: "First Edition · P530 V8 Twin-Turbo",
      year: "2023",
      price: "KES 26.5M",
      priceValue: 26500000,
      mileage: "16,200 KM",
      mileageValue: 16200,
      engine: "4.4L Twin-Turbo V8 / 4400cc",
      power: "523 HP / 750 Nm",
      transmission: "8-Speed Automatic with Paddle Shift",
      drivetrain: "AWD / All-Wheel Steering",
      exterior: "Giola Green Metallic / Black Roof",
      interior: "Deep Garnet & Ebony Semi-Aniline",
      fuel: "petrol",
      stockId: "RRC-RRS-530",
      vinStatus: "Verified",
      logbook: "Ready for Transfer",
      warranty: "12 Months Atelier Warranty",
      location: "Ridgeways Showroom",
      availability: "kenya",
      make: "range rover",
      model: "range rover sport",
      body: "suv",
      color: "green",
      history: ["rrc-certified", "warranty"],
      date: "2026-08-10",
      images: [
        {
          src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&auto=format&fit=crop&q=85",
          srcset: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900 900w",
          thumb: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400",
          alt: "Range Rover Sport Profile"
        },
        {
          src: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=1600&auto=format&fit=crop&q=85",
          srcset: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=900 900w",
          thumb: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=400",
          alt: "Range Rover Sport Front"
        }
      ]
    },
    "range-rover-velar-hse-r-dynamic": {
      id: "range-rover-velar-hse-r-dynamic",
      name: "Range Rover Velar",
      trim: "R-Dynamic HSE · D300 Mild-Hybrid Diesel",
      year: "2022",
      price: "KES 15.8M",
      priceValue: 15800000,
      mileage: "31,000 KM",
      mileageValue: 31000,
      engine: "3.0L Straight-6 Turbo Diesel / 3000cc",
      power: "296 HP / 650 Nm",
      transmission: "8-Speed Automatic",
      drivetrain: "AWD / Electronic Air Suspension",
      exterior: "Silicon Silver / Narvik Black Contrast",
      interior: "Oyster / Ebony Perforated Windsor Leather",
      fuel: "diesel",
      stockId: "RRC-VELAR-300",
      vinStatus: "Verified",
      logbook: "In Transit (UK Verified)",
      warranty: "12 Months Atelier Warranty",
      location: "In Transit (UK)",
      availability: "import",
      make: "range rover",
      model: "range rover velar",
      body: "suv",
      color: "silver",
      history: ["rrc-certified", "full-service"],
      date: "2026-08-05",
      images: [
        {
          src: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=1600&auto=format&fit=crop&q=85",
          srcset: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=900 900w",
          thumb: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400",
          alt: "Velar R-Dynamic Luxury"
        }
      ]
    },
    "land-rover-discovery-5-hse-luxury": {
      id: "land-rover-discovery-5-hse-luxury",
      name: "Land Rover Discovery 5",
      trim: "HSE Luxury · 3.0L SDV6 Twin-Turbo",
      year: "2021",
      price: "KES 12.9M",
      priceValue: 12900000,
      mileage: "46,000 KM",
      mileageValue: 46000,
      engine: "3.0L SDV6 Twin-Turbo Diesel / 2993cc",
      power: "302 HP / 700 Nm",
      transmission: "8-Speed Automatic",
      drivetrain: "AWD / Twin-Speed Transfer Box",
      exterior: "Fuji White / Dynamic Design Pack",
      interior: "Ebony 7-Seat Windsor Luxury",
      fuel: "diesel",
      stockId: "RRC-DISC5-21",
      vinStatus: "Verified",
      logbook: "Ready for Transfer",
      warranty: "6 Months Atelier Warranty",
      location: "Ridgeways Showroom",
      availability: "kenya",
      make: "land rover",
      model: "discovery",
      body: "suv",
      color: "white",
      history: ["rrc-certified", "full-service"],
      date: "2026-07-28",
      images: [
        {
          src: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1600&auto=format&fit=crop&q=85",
          srcset: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=900 900w",
          thumb: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=400",
          alt: "Discovery 5 Front Profile"
        }
      ]
    }
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
    const location = doc.location || "Ridgeways Showroom";
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
        src: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=1600&auto=format",
        srcset: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=900 900w",
        thumb: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=400",
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
      engine: doc.engine || "3.0L SDV6 Twin-Turbo",
      power: doc.power || "241 HP / 600 Nm",
      transmission: doc.transmission || "8-Speed Automatic",
      drivetrain: doc.drivetrain || "AWD / Terrain Response 2",
      exterior: doc.exterior || "Santorini Black",
      interior: doc.interior || "Windsor Leather",
      fuel: (doc.fuel || "Diesel").toLowerCase(),
      stockId: doc.stockId || `RRC-${year}`,
      vinStatus: doc.vinStatus || "Verified",
      logbook: doc.logbook || "Ready for Transfer",
      warranty: doc.warranty || "6 Months Atelier Warranty",
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

  // Pre-load curated fleet for rich visual preview
  window.RRC_VEHICLES = { ...curatedLuxuryFleet };
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
      const heroEl = document.getElementById("rrcHeroImage");
      if (heroEl && bannerUrl) {
        heroEl.src = bannerUrl;
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

      // 1. Process Real Vehicles from Sanity & prepend to curated fleet
      if (Array.isArray(result.vehicles) && result.vehicles.length > 0) {
        const liveVehicles = {};
        result.vehicles.forEach((doc) => {
          const transformed = transformSanityDoc(doc);
          liveVehicles[transformed.id] = transformed;
        });
        // Real Sanity cars appear first, followed by curated preview models
        window.RRC_VEHICLES = { ...liveVehicles, ...curatedLuxuryFleet };
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
      console.warn("Using curated preview fleet for development:", err);
    }

    document.dispatchEvent(new CustomEvent("rrc:vehicles-ready", { detail: window.RRC_VEHICLES }));
    document.dispatchEvent(new CustomEvent("rrc:data-ready", { detail: { vehicles: window.RRC_VEHICLES, settings: window.RRC_SETTINGS, posts: window.RRC_POSTS } }));
    return window.RRC_VEHICLES;
  })();
})();
