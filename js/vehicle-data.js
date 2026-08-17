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
          alt: "Range Rover Autobiography SV Front Profile"
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
          alt: "Executive Cabin Semi-Aniline Leather"
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
          alt: "Defender 110 V8 Action"
        },
        {
          src: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1600&auto=format&fit=crop&q=85",
          srcset: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=900 900w",
          thumb: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400",
          alt: "Defender 110 Expedition"
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
          src: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1600&auto=format&fit=crop&q=85",
          srcset: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=900 900w",
          thumb: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400",
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
    "land-rover-discovery-4-2011-sdv6-hse": {
      id: "land-rover-discovery-4-2011-sdv6-hse",
      name: "Land Rover Discovery 4",
      trim: "SDV6 HSE · 7 Full-Size Seats",
      year: "2011",
      price: "KES 5.45M",
      priceValue: 5450000,
      mileage: "45,000 KM",
      mileageValue: 45000,
      engine: "3.0L SDV6 Twin-Turbo Diesel / 2993cc",
      power: "241 HP / 600 Nm",
      transmission: "6-Speed ZF CommandShift Automatic",
      drivetrain: "Permanent 4WD / Terrain Response",
      exterior: "Santorini Black Metallic / HSE Bright Pack",
      interior: "Almond & Arabica Windsor Leather",
      fuel: "diesel",
      stockId: "RRC-DISC4-11",
      vinStatus: "Verified",
      logbook: "Ready for Transfer",
      warranty: "6 Months Atelier Warranty",
      location: "Ridgeways Showroom",
      availability: "kenya",
      make: "land rover",
      model: "discovery",
      body: "suv",
      color: "black",
      statement: "A refined seven-seat expedition SUV combining Solihull grand touring comfort with dual-range Terrain Response capability, prepared and certified for Kenyan roads.",
      history: ["rrc-certified", "warranty", "full-service"],
      date: "2026-08-16",
      images: [
        {
          src: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1600&auto=format&fit=crop&q=85",
          srcset: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=900 900w, https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1600 1600w",
          thumb: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=400",
          alt: "Discovery 4 SDV6 HSE Front 3/4"
        },
        {
          src: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1600&auto=format&fit=crop&q=85",
          srcset: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=900 900w",
          thumb: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400",
          alt: "Discovery 4 Profile & Terrain"
        },
        {
          src: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=1600&auto=format&fit=crop&q=85",
          srcset: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=900 900w",
          thumb: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400",
          alt: "Discovery 4 7-Seat Windsor Cabin"
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
    const name = doc.name || "Range Rover";
    const trim = doc.trim || "";
    const year = String(doc.year || "");
    const price = doc.price || (doc.priceValue ? `KES ${(doc.priceValue / 1000000).toFixed(1)}M` : "Contact Concierge");
    const priceValue = Number(doc.priceValue || 0);
    const mileage = doc.mileage || "Verified";
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
          srcset: `${cdnUrl}?w=900&auto=format 900w, ${cdnUrl}?w=1600&auto=format 1600w`,
          thumb: `${cdnUrl}?w=400&auto=format`,
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
      power: doc.power || "300 HP / 700 Nm",
      transmission: doc.transmission || "8-Speed Automatic",
      drivetrain: doc.drivetrain || "AWD / Terrain Response 2",
      exterior: doc.exterior || "Santorini Black",
      interior: doc.interior || "Windsor Leather",
      fuel: (doc.fuel || "Diesel").toLowerCase(),
      stockId: doc.stockId || `RRC-${year}`,
      vinStatus: doc.vinStatus || "Verified",
      logbook: doc.logbook || "Ready for Transfer",
      warranty: doc.warranty || "12 Months Atelier Warranty",
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

  // Pre-load curated fleet for rich preview
  window.RRC_VEHICLES = { ...curatedLuxuryFleet };
  window.RRC_SETTINGS = null;
  window.RRC_POSTS = [];
  window.RRC_HERO_SEQUENCE = [
    "A DIFFERENT WAY TO ARRIVE.",
    "BUILT FOR THE CITY.",
    "READY FOR THE DISTANCE.",
    "BUILT FOR BOTH."
  ];

  const updateSiteSettingsDom = (settings) => {
    if (!settings) return;
    window.RRC_SETTINGS = settings;

    // 1. Hero Updates
    if (settings.heroEyebrow) {
      document.querySelectorAll("[data-sanity='heroEyebrow']").forEach(el => el.textContent = settings.heroEyebrow);
    }
    if (Array.isArray(settings.heroHeadlineSequence) && settings.heroHeadlineSequence.length > 0) {
      window.RRC_HERO_SEQUENCE = settings.heroHeadlineSequence;
      const heroHeadlineEl = document.getElementById("rrcHeroHeadline");
      if (heroHeadlineEl) heroHeadlineEl.textContent = settings.heroHeadlineSequence[0];
    }
    if (settings.heroSubtitle) {
      document.querySelectorAll("[data-sanity='heroSubtitle']").forEach(el => el.textContent = settings.heroSubtitle);
    }
    if (settings.heroLocationLabel) {
      document.querySelectorAll("[data-sanity='heroLocationLabel']").forEach(el => el.textContent = settings.heroLocationLabel);
    }
    if (settings.heroPrimaryCtaText) {
      document.querySelectorAll("[data-sanity-link='heroPrimaryCta']").forEach(el => {
        el.textContent = settings.heroPrimaryCtaText;
        if (settings.heroPrimaryCtaLink) el.href = settings.heroPrimaryCtaLink;
      });
    }
    if (settings.heroSecondaryCtaText) {
      document.querySelectorAll("[data-sanity-link='heroSecondaryCta']").forEach(el => {
        el.textContent = settings.heroSecondaryCtaText;
        if (settings.heroSecondaryCtaLink) el.href = settings.heroSecondaryCtaLink;
      });
    }
    if (settings.heroVideoUrl) {
      const heroVideoSource = document.querySelector(".rrc-hero-video-wrap video source");
      if (heroVideoSource) heroVideoSource.src = settings.heroVideoUrl;
    }
    if (settings.heroBackgroundImage?.asset?._ref) {
      const bannerUrl = parseSanityAssetUrl(settings.heroBackgroundImage.asset._ref);
      const heroVideo = document.querySelector(".rrc-hero-video-wrap video");
      if (heroVideo && bannerUrl) heroVideo.poster = bannerUrl;
    }

    // 2. Story Section
    if (settings.storyEyebrow) {
      document.querySelectorAll("[data-sanity='storyEyebrow']").forEach(el => el.textContent = settings.storyEyebrow);
    }
    if (settings.storyStatement) {
      const storyStatementEl = document.getElementById("rrcStoryStatement");
      if (storyStatementEl) storyStatementEl.textContent = settings.storyStatement;
    }
    if (settings.storyDescription) {
      document.querySelectorAll("[data-sanity='storyDescription']").forEach(el => el.textContent = settings.storyDescription);
    }
    if (settings.storyCtaText) {
      document.querySelectorAll("[data-sanity-link='storyCta']").forEach(el => {
        el.textContent = settings.storyCtaText;
        if (settings.storyCtaLink) el.href = settings.storyCtaLink;
      });
    }
    if (settings.storyImage?.asset?._ref) {
      const storyImgUrl = parseSanityAssetUrl(settings.storyImage.asset._ref);
      const storyImgEl = document.getElementById("rrcStoryImg");
      if (storyImgEl && storyImgUrl) storyImgEl.src = storyImgUrl;
    }

    // 3. Featured Section
    if (settings.featuredEyebrow) {
      document.querySelectorAll("[data-sanity='featuredEyebrow']").forEach(el => el.textContent = settings.featuredEyebrow);
    }
    if (settings.featuredHeadline) {
      document.querySelectorAll("[data-sanity='featuredHeadline']").forEach(el => el.textContent = settings.featuredHeadline);
    }
    if (settings.featuredDescription) {
      document.querySelectorAll("[data-sanity='featuredDescription']").forEach(el => el.textContent = settings.featuredDescription);
    }
    if (settings.featuredSpecs) {
      document.querySelectorAll("[data-sanity='featuredSpecs']").forEach(el => el.textContent = settings.featuredSpecs);
    }
    if (settings.featuredImage?.asset?._ref) {
      const featuredUrl = parseSanityAssetUrl(settings.featuredImage.asset._ref);
      const featImgEl = document.querySelector(".rrc-featured-backdrop img");
      if (featImgEl && featuredUrl) featImgEl.src = featuredUrl;
    }

    // 4. Kenya Section
    if (settings.kenyaEyebrow) {
      document.querySelectorAll("[data-sanity='kenyaEyebrow']").forEach(el => el.textContent = settings.kenyaEyebrow);
    }
    if (settings.kenyaHeadline) {
      document.querySelectorAll("[data-sanity='kenyaHeadline']").forEach(el => el.textContent = settings.kenyaHeadline);
    }
    if (settings.kenyaDescription) {
      document.querySelectorAll("[data-sanity='kenyaDescription']").forEach(el => el.textContent = settings.kenyaDescription);
    }
    if (settings.kenyaImage?.asset?._ref) {
      const kenyaUrl = parseSanityAssetUrl(settings.kenyaImage.asset._ref);
      const kenyaImgEl = document.querySelector(".rrc-kenya-media img");
      if (kenyaImgEl && kenyaUrl) kenyaImgEl.src = kenyaUrl;
    }

    // 5. Atelier Section
    if (settings.workshopEyebrow) {
      document.querySelectorAll("[data-sanity='workshopEyebrow']").forEach(el => el.textContent = settings.workshopEyebrow);
    }
    if (settings.workshopHeadline) {
      document.querySelectorAll("[data-sanity='workshopHeadline']").forEach(el => el.textContent = settings.workshopHeadline);
    }

    // 6. Centre Section
    if (settings.centreHeadline) {
      document.querySelectorAll("[data-sanity='centreHeadline']").forEach(el => el.textContent = settings.centreHeadline);
    }
    if (settings.centreDescription) {
      document.querySelectorAll("[data-sanity='centreDescription']").forEach(el => el.textContent = settings.centreDescription);
    }
    if (settings.centreAddress) {
      document.querySelectorAll("[data-sanity='centreAddress']").forEach(el => el.textContent = settings.centreAddress);
    }
    if (settings.centreHours) {
      document.querySelectorAll("[data-sanity='centreHours']").forEach(el => el.textContent = settings.centreHours);
    }

    // 7. Close Section
    if (settings.closeHeadline) {
      document.querySelectorAll("[data-sanity='closeHeadline']").forEach(el => el.textContent = settings.closeHeadline);
    }
    if (settings.closeDescription) {
      document.querySelectorAll("[data-sanity='closeDescription']").forEach(el => el.textContent = settings.closeDescription);
    }

    // 8. Global Contact & Footer
    if (settings.phone) {
      document.querySelectorAll("[data-sanity='phone']").forEach(el => el.textContent = settings.phone);
    }
    if (settings.email) {
      document.querySelectorAll("[data-sanity='email']").forEach(el => el.textContent = settings.email);
    }
    if (settings.address) {
      document.querySelectorAll("[data-sanity='address']").forEach(el => el.textContent = settings.address);
    }
    if (settings.copyright) {
      document.querySelectorAll("[data-sanity='copyright']").forEach(el => el.textContent = settings.copyright);
    }
    if (settings.footerTagline) {
      document.querySelectorAll("[data-sanity='footerTagline']").forEach(el => el.textContent = settings.footerTagline);
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

      // 1. Process Real Vehicles from Sanity
      if (Array.isArray(result.vehicles) && result.vehicles.length > 0) {
        const liveVehicles = {};
        result.vehicles.forEach((doc) => {
          const transformed = transformSanityDoc(doc);
          liveVehicles[transformed.id] = transformed;
        });
        window.RRC_VEHICLES = liveVehicles;
      }

      // 2. Process Site Settings
      if (result.settings) {
        updateSiteSettingsDom(result.settings);
      }

      // 3. Process Blog Posts
      if (Array.isArray(result.posts) && result.posts.length > 0) {
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
