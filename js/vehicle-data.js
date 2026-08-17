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

  // Start with empty real fleet (NO DUMMY CARS)
  window.RRC_VEHICLES = {};
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

    // 1. Hero Section
    if (settings.heroEyebrow) {
      document.querySelectorAll("[data-sanity='heroEyebrow']").forEach(el => el.textContent = settings.heroEyebrow);
    }
    if (Array.isArray(settings.heroHeadlineSequence) && settings.heroHeadlineSequence.length > 0) {
      window.RRC_HERO_SEQUENCE = settings.heroHeadlineSequence;
      const heroH1 = document.getElementById("rrcHeroHeadline");
      if (heroH1) {
        const inner = heroH1.querySelector(".rrc-mask-inner") || heroH1;
        inner.textContent = settings.heroHeadlineSequence[0];
      }
    }
    if (settings.heroSubtitle) {
      document.querySelectorAll("[data-sanity='heroSubtitle']").forEach(el => el.textContent = settings.heroSubtitle);
    }
    if (settings.heroVideoUrl) {
      const heroVideo = document.querySelector(".rrc-hero-video-wrap video source");
      if (heroVideo) {
        heroVideo.src = settings.heroVideoUrl;
        heroVideo.parentElement.load();
      }
    }
    if (settings.heroBackgroundImage?.asset?._ref) {
      const posterUrl = parseSanityAssetUrl(settings.heroBackgroundImage.asset._ref);
      const heroVideoEl = document.querySelector(".rrc-hero-video-wrap video");
      if (heroVideoEl && posterUrl) heroVideoEl.poster = posterUrl;
    }
    if (settings.heroPrimaryCtaText) {
      document.querySelectorAll("[data-sanity-link='heroPrimaryCta']").forEach(el => el.textContent = settings.heroPrimaryCtaText);
    }
    if (settings.heroPrimaryCtaLink) {
      document.querySelectorAll("[data-sanity-link='heroPrimaryCta']").forEach(el => el.href = settings.heroPrimaryCtaLink);
    }
    if (settings.heroSecondaryCtaText) {
      document.querySelectorAll("[data-sanity-link='heroSecondaryCta']").forEach(el => el.textContent = settings.heroSecondaryCtaText);
    }
    if (settings.heroSecondaryCtaLink) {
      document.querySelectorAll("[data-sanity-link='heroSecondaryCta']").forEach(el => el.href = settings.heroSecondaryCtaLink);
    }
    if (settings.heroLocationLabel) {
      document.querySelectorAll("[data-sanity='heroLocationLabel']").forEach(el => el.textContent = settings.heroLocationLabel);
    }

    // 2. Story Section
    if (settings.storyEyebrow) {
      document.querySelectorAll("[data-sanity='storyEyebrow']").forEach(el => el.textContent = settings.storyEyebrow);
    }
    if (settings.storyStatement) {
      document.querySelectorAll("[data-sanity='storyStatement']").forEach(el => el.textContent = settings.storyStatement);
      const storyH2 = document.getElementById("rrcStoryStatement");
      if (storyH2) {
        const inner = storyH2.querySelector(".rrc-mask-inner") || storyH2;
        inner.textContent = settings.storyStatement;
      }
    }
    if (settings.storyDescription) {
      document.querySelectorAll("[data-sanity='storyDescription']").forEach(el => el.textContent = settings.storyDescription);
    }
    if (settings.storyCtaText) {
      document.querySelectorAll("[data-sanity-link='storyCta']").forEach(el => el.textContent = settings.storyCtaText);
    }
    if (settings.storyCtaLink) {
      document.querySelectorAll("[data-sanity-link='storyCta']").forEach(el => el.href = settings.storyCtaLink);
    }
    if (settings.storyImage?.asset?._ref) {
      const storyImgUrl = parseSanityAssetUrl(settings.storyImage.asset._ref);
      const storyImgEl = document.getElementById("rrcStoryImg");
      if (storyImgEl && storyImgUrl) storyImgEl.src = storyImgUrl;
    }

    // 3. Model Switcher Data Overrides
    if (window.RRC_MODELS_DATA) {
      if (settings.modelRangeRoverTitle) window.RRC_MODELS_DATA.rangerover.title = settings.modelRangeRoverTitle;
      if (settings.modelRangeRoverDesc) window.RRC_MODELS_DATA.rangerover.desc = settings.modelRangeRoverDesc;
      if (settings.modelRangeRoverPower) window.RRC_MODELS_DATA.rangerover.power = settings.modelRangeRoverPower;
      if (settings.modelRangeRoverZeroSixty) window.RRC_MODELS_DATA.rangerover.zeroSixty = settings.modelRangeRoverZeroSixty;
      if (settings.modelRangeRoverDrive) window.RRC_MODELS_DATA.rangerover.drive = settings.modelRangeRoverDrive;
      if (settings.modelRangeRoverImg?.asset?._ref) {
        window.RRC_MODELS_DATA.rangerover.img = parseSanityAssetUrl(settings.modelRangeRoverImg.asset._ref);
      }

      if (settings.modelSportTitle) window.RRC_MODELS_DATA.sport.title = settings.modelSportTitle;
      if (settings.modelSportDesc) window.RRC_MODELS_DATA.sport.desc = settings.modelSportDesc;
      if (settings.modelSportPower) window.RRC_MODELS_DATA.sport.power = settings.modelSportPower;
      if (settings.modelSportZeroSixty) window.RRC_MODELS_DATA.sport.zeroSixty = settings.modelSportZeroSixty;
      if (settings.modelSportDrive) window.RRC_MODELS_DATA.sport.drive = settings.modelSportDrive;
      if (settings.modelSportImg?.asset?._ref) {
        window.RRC_MODELS_DATA.sport.img = parseSanityAssetUrl(settings.modelSportImg.asset._ref);
      }

      if (settings.modelVelarTitle) window.RRC_MODELS_DATA.velar.title = settings.modelVelarTitle;
      if (settings.modelVelarDesc) window.RRC_MODELS_DATA.velar.desc = settings.modelVelarDesc;
      if (settings.modelVelarPower) window.RRC_MODELS_DATA.velar.power = settings.modelVelarPower;
      if (settings.modelVelarZeroSixty) window.RRC_MODELS_DATA.velar.zeroSixty = settings.modelVelarZeroSixty;
      if (settings.modelVelarDrive) window.RRC_MODELS_DATA.velar.drive = settings.modelVelarDrive;
      if (settings.modelVelarImg?.asset?._ref) {
        window.RRC_MODELS_DATA.velar.img = parseSanityAssetUrl(settings.modelVelarImg.asset._ref);
      }

      if (settings.modelDefenderTitle) window.RRC_MODELS_DATA.defender.title = settings.modelDefenderTitle;
      if (settings.modelDefenderDesc) window.RRC_MODELS_DATA.defender.desc = settings.modelDefenderDesc;
      if (settings.modelDefenderPower) window.RRC_MODELS_DATA.defender.power = settings.modelDefenderPower;
      if (settings.modelDefenderZeroSixty) window.RRC_MODELS_DATA.defender.zeroSixty = settings.modelDefenderZeroSixty;
      if (settings.modelDefenderDrive) window.RRC_MODELS_DATA.defender.drive = settings.modelDefenderDrive;
      if (settings.modelDefenderImg?.asset?._ref) {
        window.RRC_MODELS_DATA.defender.img = parseSanityAssetUrl(settings.modelDefenderImg.asset._ref);
      }

      if (settings.modelDiscoveryTitle) window.RRC_MODELS_DATA.discovery.title = settings.modelDiscoveryTitle;
      if (settings.modelDiscoveryDesc) window.RRC_MODELS_DATA.discovery.desc = settings.modelDiscoveryDesc;
      if (settings.modelDiscoveryPower) window.RRC_MODELS_DATA.discovery.power = settings.modelDiscoveryPower;
      if (settings.modelDiscoveryZeroSixty) window.RRC_MODELS_DATA.discovery.zeroSixty = settings.modelDiscoveryZeroSixty;
      if (settings.modelDiscoveryDrive) window.RRC_MODELS_DATA.discovery.drive = settings.modelDiscoveryDrive;
      if (settings.modelDiscoveryImg?.asset?._ref) {
        window.RRC_MODELS_DATA.discovery.img = parseSanityAssetUrl(settings.modelDiscoveryImg.asset._ref);
      }
    }

    // 4. Featured Spotlight
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
      const featUrl = parseSanityAssetUrl(settings.featuredImage.asset._ref);
      const featImg = document.querySelector(".rrc-featured-backdrop img");
      if (featImg && featUrl) featImg.src = featUrl;
    }
    if (settings.featuredPrimaryCtaText) {
      document.querySelectorAll("[data-sanity-link='featuredPrimaryCta']").forEach(el => el.textContent = settings.featuredPrimaryCtaText);
    }
    if (settings.featuredPrimaryCtaLink) {
      document.querySelectorAll("[data-sanity-link='featuredPrimaryCta']").forEach(el => el.href = settings.featuredPrimaryCtaLink);
    }

    // 5. 5-Frame Journey Strip Overrides
    if (settings.journeyFrame1Img?.asset?._ref) {
      const f1Img = document.querySelector(".rrc-journey-reel .rrc-journey-card:nth-child(1) img");
      if (f1Img) f1Img.src = parseSanityAssetUrl(settings.journeyFrame1Img.asset._ref);
    }
    if (settings.journeyFrame1Title) {
      const f1Title = document.querySelector(".rrc-journey-reel .rrc-journey-card:nth-child(1) h4");
      if (f1Title) f1Title.textContent = settings.journeyFrame1Title;
    }
    if (settings.journeyFrame1Desc) {
      const f1Desc = document.querySelector(".rrc-journey-reel .rrc-journey-card:nth-child(1) p");
      if (f1Desc) f1Desc.textContent = settings.journeyFrame1Desc;
    }

    if (settings.journeyFrame2Img?.asset?._ref) {
      const f2Img = document.querySelector(".rrc-journey-reel .rrc-journey-card:nth-child(2) img");
      if (f2Img) f2Img.src = parseSanityAssetUrl(settings.journeyFrame2Img.asset._ref);
    }
    if (settings.journeyFrame2Title) {
      const f2Title = document.querySelector(".rrc-journey-reel .rrc-journey-card:nth-child(2) h4");
      if (f2Title) f2Title.textContent = settings.journeyFrame2Title;
    }
    if (settings.journeyFrame2Desc) {
      const f2Desc = document.querySelector(".rrc-journey-reel .rrc-journey-card:nth-child(2) p");
      if (f2Desc) f2Desc.textContent = settings.journeyFrame2Desc;
    }

    if (settings.journeyFrame3Img?.asset?._ref) {
      const f3Img = document.querySelector(".rrc-journey-reel .rrc-journey-card:nth-child(3) img");
      if (f3Img) f3Img.src = parseSanityAssetUrl(settings.journeyFrame3Img.asset._ref);
    }
    if (settings.journeyFrame3Title) {
      const f3Title = document.querySelector(".rrc-journey-reel .rrc-journey-card:nth-child(3) h4");
      if (f3Title) f3Title.textContent = settings.journeyFrame3Title;
    }
    if (settings.journeyFrame3Desc) {
      const f3Desc = document.querySelector(".rrc-journey-reel .rrc-journey-card:nth-child(3) p");
      if (f3Desc) f3Desc.textContent = settings.journeyFrame3Desc;
    }

    if (settings.journeyFrame4Img?.asset?._ref) {
      const f4Img = document.querySelector(".rrc-journey-reel .rrc-journey-card:nth-child(4) img");
      if (f4Img) f4Img.src = parseSanityAssetUrl(settings.journeyFrame4Img.asset._ref);
    }
    if (settings.journeyFrame4Title) {
      const f4Title = document.querySelector(".rrc-journey-reel .rrc-journey-card:nth-child(4) h4");
      if (f4Title) f4Title.textContent = settings.journeyFrame4Title;
    }
    if (settings.journeyFrame4Desc) {
      const f4Desc = document.querySelector(".rrc-journey-reel .rrc-journey-card:nth-child(4) p");
      if (f4Desc) f4Desc.textContent = settings.journeyFrame4Desc;
    }

    if (settings.journeyFrame5Img?.asset?._ref) {
      const f5Img = document.querySelector(".rrc-journey-reel .rrc-journey-card:nth-child(5) img");
      if (f5Img) f5Img.src = parseSanityAssetUrl(settings.journeyFrame5Img.asset._ref);
    }
    if (settings.journeyFrame5Title) {
      const f5Title = document.querySelector(".rrc-journey-reel .rrc-journey-card:nth-child(5) h4");
      if (f5Title) f5Title.textContent = settings.journeyFrame5Title;
    }
    if (settings.journeyFrame5Desc) {
      const f5Desc = document.querySelector(".rrc-journey-reel .rrc-journey-card:nth-child(5) p");
      if (f5Desc) f5Desc.textContent = settings.journeyFrame5Desc;
    }

    // 6. Kenya Section
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
      const kenyaImg = document.querySelector(".rrc-kenya-media img");
      if (kenyaImg && kenyaUrl) kenyaImg.src = kenyaUrl;
    }

    // 7. Atelier Bays
    if (window.RRC_WORKSHOP_DATA) {
      if (settings.bay1Title) window.RRC_WORKSHOP_DATA.diagnostics.title = settings.bay1Title;
      if (settings.bay1Desc) window.RRC_WORKSHOP_DATA.diagnostics.desc = settings.bay1Desc;
      if (settings.bay1Img?.asset?._ref) {
        window.RRC_WORKSHOP_DATA.diagnostics.img = parseSanityAssetUrl(settings.bay1Img.asset._ref);
      }

      if (settings.bay2Title) window.RRC_WORKSHOP_DATA.maintenance.title = settings.bay2Title;
      if (settings.bay2Desc) window.RRC_WORKSHOP_DATA.maintenance.desc = settings.bay2Desc;
      if (settings.bay2Img?.asset?._ref) {
        window.RRC_WORKSHOP_DATA.maintenance.img = parseSanityAssetUrl(settings.bay2Img.asset._ref);
      }

      if (settings.bay3Title) window.RRC_WORKSHOP_DATA.parts.title = settings.bay3Title;
      if (settings.bay3Desc) window.RRC_WORKSHOP_DATA.parts.desc = settings.bay3Desc;
      if (settings.bay3Img?.asset?._ref) {
        window.RRC_WORKSHOP_DATA.parts.img = parseSanityAssetUrl(settings.bay3Img.asset._ref);
      }

      if (settings.bay4Title) window.RRC_WORKSHOP_DATA.detail.title = settings.bay4Title;
      if (settings.bay4Desc) window.RRC_WORKSHOP_DATA.detail.desc = settings.bay4Desc;
      if (settings.bay4Img?.asset?._ref) {
        window.RRC_WORKSHOP_DATA.detail.img = parseSanityAssetUrl(settings.bay4Img.asset._ref);
      }
    }

    // 8. Ridgeways Centre
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
    if (settings.centreImage?.asset?._ref) {
      const centreUrl = parseSanityAssetUrl(settings.centreImage.asset._ref);
      const centreImg = document.querySelector(".rrc-centre-media img");
      if (centreImg && centreUrl) centreImg.src = centreUrl;
    }

    // 9. Close Section
    if (settings.closeHeadline) {
      document.querySelectorAll("[data-sanity='closeHeadline']").forEach(el => el.textContent = settings.closeHeadline);
    }
    if (settings.closeDescription) {
      document.querySelectorAll("[data-sanity='closeDescription']").forEach(el => el.textContent = settings.closeDescription);
    }

    // 10. Global Contact & Footer
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

  const updateHomepageBlogs = (posts) => {
    const blogGrid = document.getElementById("homepageBlogGrid");
    if (!blogGrid || !Array.isArray(posts) || posts.length === 0) return;
    blogGrid.innerHTML = "";

    posts.slice(0, 3).forEach((post) => {
      const coverUrl = post.coverImageUrl || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format";
      const slug = post.slug?.current || post._id;
      const category = post.category || "Journal";
      const readTime = post.readTime || "5 Min Read";
      const excerpt = post.excerpt || "Read our latest editorial insights and guides from the Range Rover Centre.";

      const card = document.createElement("article");
      card.className = "rrc-journey-card rrc-reveal revealed";
      card.innerHTML = `
        <div class="rrc-journey-media">
          <img src="${coverUrl}" alt="${post.title}" loading="lazy" />
        </div>
        <div class="rrc-journey-body">
          <span class="rrc-mono-tag">${category} · ${readTime}</span>
          <h4 style="margin: 6px 0 8px;">${post.title}</h4>
          <p style="font-size: 13px; margin: 0; color: var(--rrc-text-secondary);">${excerpt}</p>
          <div style="margin-top: 14px;">
            <a class="rrc-btn rrc-btn-secondary rrc-btn-full" href="blog-post.html?post=${encodeURIComponent(slug)}">Read Chronicle →</a>
          </div>
        </div>
      `;
      blogGrid.appendChild(card);
    });
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

      // 1. Process Real Vehicles from Sanity ONLY
      if (Array.isArray(result.vehicles)) {
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
        updateHomepageBlogs(window.RRC_POSTS);
      }
    } catch (err) {
      console.warn("Sanity fetch error:", err);
    }

    document.dispatchEvent(new CustomEvent("rrc:vehicles-ready", { detail: window.RRC_VEHICLES }));
    document.dispatchEvent(new CustomEvent("rrc:data-ready", { detail: { vehicles: window.RRC_VEHICLES, settings: window.RRC_SETTINGS, posts: window.RRC_POSTS } }));
    return window.RRC_VEHICLES;
  })();
})();
