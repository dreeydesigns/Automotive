# Master Specification
## Range Rover & Land Rover Centre — Cinematic Automotive Experience
**Version:** 1.0  
**Status:** Final Build Instruction Set & Engineering Blueprint  
**Scope:** Full Digital Flagship Rebuild — Frontend Motion Engine, CMS Schema, Lead Management, Inventory Architecture, and Component System  

---

## 0. How to Use This Document

This specification serves as the single source of truth for engineering the **Range Rover & Land Rover Centre** digital product. It combines:
1. **Lightship's** scroll-driven narrative progression, dynamic headline rewriting, and horizontal forward-scroll film strip.
2. **Lucid Motors'** product-first luxury, large photography scale, tight confident copy, and model switching.
3. **Polestar's** minimalism, generous negative space, and full-width editorial mega-menu.

Every section defines:
- **Purpose & UX Principle**
- **Exact Layout & Typography Structure**
- **Motion & Scroll-Linked Animation Choreography**
- **Mobile Responsive Adaptation**
- **Data Schemas & Backend Lead Requirements**
- **Acceptance Criteria**

---

## 1. Core Creative Philosophy & Brand Voice

### 1.1 The Atmosphere
The website must feel like a **private automotive gallery** and an **editorial film** that happens to be an interactive digital product.

It must **NOT** look or behave like:
- A standard dealer listing portal
- A crowded classifieds marketplace
- A generic boxed card template
- A corporate sales brochure

### 1.2 The Emotional Arc
Every visitor transitions through six psychological phases:
- **Intrigue** → The hero entrance captivates attention without aggressive selling.
- **Desire** → High-resolution photography lets the visitor picture themselves in the vehicle.
- **Understanding** → The engineering purpose and Solihull provenance are clear.
- **Trust** → Technical competence, 120-point ECU audits, and Ridgeways atelier are proven.
- **Consideration** → Curated showroom collection displays authenticated pricing and specs.
- **Action** → Private viewing and WhatsApp concierge communication feel natural.

### 1.3 The Brand Voice
- **Tone:** Calm, confident, precise, understated, geographically aware (Nairobi, Rift Valley, Laikipia).
- **Prohibited Patterns:** No exclamation marks, no generic superlatives ("world-class", "unmatched", "stunning", "hot deal"), no fake scarcity, and no aggressive CTA repetition.

---

## 2. Design System & Design Tokens

### 2.1 Color Palette
- **Obsidian (`#0A0A0A`):** Primary dark canvas.
- **Carbon (`#141414`):** Secondary dark surface and cards.
- **Ivory (`#F5F3EE`):** Primary warm light canvas for editorial statements.
- **Pure White (`#FFFFFF`):** High-contrast clean showcase surfaces.
- **Graphite (`#6F6F6A`):** Secondary body text and metadata.
- **Mist (`#D8D6CF`):** Subtle borders and dividers on light backgrounds.
- **Heritage Green (`#0C3B2E`):** Solihull British Racing Green accent (used sparingly).
- **Kenyan Clay Rust (`#8A4E2D`):** Rift Valley and African earth tone accent.

### 2.2 Alternating Gallery Rhythm
The experience alternates between light and dark rooms:
$$\text{Cinematic Dark Hero} \to \text{Warm Ivory Story} \to \text{White Model Gallery} \to \text{Dark Product Spotlight} \to \text{Obsidian Forward Reel} \to \text{Terracotta Kenya Section} \to \text{Carbon Atelier Bay} \to \text{White Collection Grid} \to \text{Dark Confidence Close}$$

### 2.3 Typography Architecture
- **Display Typeface:** Refined High-Fashion Serif / Architectural Display (`Syne` / `Plus Jakarta Sans`).
- **Interface Typeface:** Geometric / Humanist Sans (`Plus Jakarta Sans`).
- **Monospace Typeface:** Minimalist Monospace (`Space Mono`) used strictly for telemetry and indices (`01 // ARRIVAL`).

---

## 3. Global Navigation & Polestar Mega-Menu

### 3.1 Header States
- **Top of Page:** Transparent background, zero border, typography adapts for legibility.
- **Scrolled (>60px):** Translucent backdrop (`rgba(10, 10, 10, 0.88)` with `24px blur`), height transitions from `72px` to `66px`, subtle `1px` border.

### 3.2 Full-Width Polestar Mega-Menu
When the user hovers over **Models**:
- **Left Column:** Vertical list of model lines (*Range Rover*, *Range Rover Sport*, *Range Rover Velar*, *Range Rover Evoque*, *Land Rover Defender*, *Land Rover Discovery*).
- **Right Column:** Dynamic preview card with live crossfading hero photography, horsepower output, 0–100 km/h acceleration, powertrain description, and direct link.

### 3.3 Mobile Drawer
- Fullscreen overlay with sequential stagger reveal (`50ms` delay per item).
- Accordion model selector and direct WhatsApp Concierge CTA.

---

## 4. Homepage Section Blueprint (The 11-Act Experience)

### 4.1 Act I — The Arrival (Hero)
- **Visual:** Autoplaying, muted, looped 100vh cinematic video of vehicle moving through Kenyan terrain / Nairobi architecture.
- **Scroll-Responsive Rewriting Headline:**
  - 0% scroll: `"A DIFFERENT WAY TO ARRIVE."`
  - 30% scroll: `"BUILT FOR THE CITY."`
  - 60% scroll: `"READY FOR THE DISTANCE."`
  - 90% scroll: `"BUILT FOR BOTH."`
- **UI:** Left bottom: `NAIROBI · KENYA`. Right bottom: `SCROLL TO EXPLORE ↓`.
- **Actions:** Primary *"Explore Vehicles"*, Secondary *"Discover the Centre"*.

### 4.2 Act II — The Story (Lightship Pinned Narrative)
- **Layout:** Pinned split viewport. Left: Dynamic statement text. Right: High-resolution canvas.
- **Beats:**
  1. *"IT STARTS WITH THE RIGHT VEHICLE."* — Factory provenance.
  2. *"THEN THE DETAILS MATTER."* — Close-up stitching, controls, and materials.
  3. *"SO DOES WHO STANDS BEHIND IT."* — Workshop technician and diagnostic interrogation.
  4. *"AND WHERE IT TAKES YOU."* — Destination and African terrain.

### 4.3 Act III — Model Family Switcher (Lucid Principle)
- **Layout:** Sticky tab bar: `Range Rover | Sport | Velar | Evoque | Defender | Discovery`.
- **Interaction:** Instant crossfade of vehicle imagery and telemetry strip (Power, 0–100 km/h, Drivetrain).

### 4.4 Act IV — Massive Featured Product Spotlight
- **Hero Vehicle:** Defender 110 V8 Carpathian Edition.
- **Headline:** *"Prepared for the roads beyond the map."*
- **Telemetry Strip:** 7 Seats · Permanent 4WD · 5.0L Supercharged V8 · KES 22.8M.

### 4.5 Act V — Horizontal Forward-Scroll Journey
- **Mechanics:** Vertical scroll drives horizontal image progression across 5 frames:
  - `01 / ARRIVAL` — Solihull Precision
  - `02 / CONTROL` — Nairobi Arteries
  - `03 / MOVEMENT` — Rift Valley Descent
  - `04 / OPEN ROAD` — Laikipia Red Dust
  - `05 / DISTANCE` — Homestead Sanctuary

### 4.6 Act VI — The "Kenya" Section
- **Headline:** *"BUILT FOR A COUNTRY THAT DOESN'T HAVE ONE ROAD."*
- **Narrative:** Emotional proof of capability spanning Nairobi tarmac, Rift Valley escarpments, and Laikipia conservancies.

### 4.7 Act VII — The Atelier & Service Story
- **Opening:** *"OWNERSHIP DOESN'T END AT DELIVERY."*
- **Interactive Bay Switcher:**
  - **Bay 01 (Diagnostics):** Factory Pathfinder & SDD Scans.
  - **Bay 02 (Maintenance):** Scheduled Servicing & Powertrain Care.
  - **Bay 03 (Genuine Parts):** Direct Solihull UK Supply Chain.
  - **Bay 04 (Detailing):** Ceramic Protection & Semi-Aniline Leather Care.

### 4.8 Act VIII — The Collection (Curated Showroom)
- **Header:** *"The Collection — Available Motorcars."*
- **Card Design:** 4:3 high-res imagery, clean model title, verified price, and full-width dossier link.

### 4.9 Act IX — The RRC Journal
- **Format:** Editorial magazine layout covering buyer's guides, SDV6/V8 maintenance, and UK import logistics.

### 4.10 Act X — The Centre (Ridgeways Physical Facility)
- **Identifier:** `RIDGEWAYS · NAIROBI`
- **Details:** Address, operating hours, telephone line, and private viewing booking.

### 4.11 Act XI — The Confidence Close
- **Closing Headline:** *"THE ROAD IS YOURS. Let us find the right vehicle for it."*
- **Primary Conversion:** Direct WhatsApp Sales Concierge deep-link.

---

## 5. Dedicated Route Specifications

| Route | Page Title | Core Purpose & Architecture |
| :--- | :--- | :--- |
| `/` | Flagship Experience | 11-Act narrative gallery journey. |
| `/marketplace.html` | The Collection | Showroom with quiet filters (Model, Location, Fuel, Sort). |
| `/vehicle-detail.html` | Vehicle Dossier | Editorial product page, specs table, verified 120-point diagnostic clearance, and WhatsApp advisor CTA. |
| `/import.html` | Bespoke Sourcing | *"Find the one that's not here."* 5-step sourcing protocol & structured brief form. |
| `/services.html` | The Atelier | Specialized diagnostic protocols, air suspension calibration, and parts. |
| `/about.html` | Heritage & Philosophy | Origin story, Ridgeways sanctuary, and authenticity code. |
| `/sell.html` | Private Consignment | *"Your next vehicle may begin with the one you already own."* Valuation form. |
| `/finance.html` | Asset Structuring | Tier-1 banking partners & real-time indicative loan repayment calculator. |
| `/insurance.html` | Underwriting | OEM replacement guarantee and atelier repair routing. |
| `/contact.html` | Concierge Desk | Private viewing booking, phone, email, and facility map. |
| `/blog.html` | The RRC Journal | Editorial guides and ownership chronicles. |

---

## 6. Acceptance Criteria Checklist

- [x] **No Generic Dealer Elements:** Zero gold foil, zero exclamation marks, zero "hot deal" stickers.
- [x] **Lightship Story Progression:** Smooth scroll-driven headline rewriting on hero.
- [x] **Polestar Mega-Menu:** Live model family image and telemetry crossfading.
- [x] **Lucid Model Switcher:** Seamless model tab switching without page reload.
- [x] **Performance & Responsive Budget:** Fast initial load on Kenyan 4G/5G mobile connections, smooth touch drawer on mobile.
- [x] **Single Source of Truth:** Unified CSS tokens, unified scripts, and live Sanity/curated vehicle data binding.
