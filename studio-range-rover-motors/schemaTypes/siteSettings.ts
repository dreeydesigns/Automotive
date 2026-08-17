import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Website Settings, Headings & Content',
  type: 'document',
  groups: [
    { name: 'hero', title: '1. Hero & Video' },
    { name: 'story', title: '2. Story Narrative' },
    { name: 'featured', title: '3. Featured Vehicle' },
    { name: 'kenya', title: '4. Kenya Section' },
    { name: 'workshop', title: '5. Atelier & Workshop' },
    { name: 'centre', title: '6. Ridgeways Centre' },
    { name: 'close', title: '7. Confidence Close' },
    { name: 'footer', title: '8. Contacts & Footer' },
  ],
  fields: [
    // ------------------------------------------------------------------------
    // 1. HERO SECTION
    // ------------------------------------------------------------------------
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Top Badge / Eyebrow',
      type: 'string',
      group: 'hero',
      initialValue: 'Solihull Sourced · Nairobi Audited',
    }),
    defineField({
      name: 'heroHeadlineSequence',
      title: 'Hero Scroll Headline Sequence',
      type: 'array',
      group: 'hero',
      of: [{ type: 'string' }],
      initialValue: [
        'A DIFFERENT WAY TO ARRIVE.',
        'BUILT FOR THE CITY.',
        'READY FOR THE DISTANCE.',
        'BUILT FOR BOTH.'
      ],
      description: 'The headlines that rewrite smoothly as the visitor scrolls down.',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle / Description Paragraph',
      type: 'text',
      group: 'hero',
      rows: 3,
      initialValue:
        'Two British automotive legacies. Handcrafted for peerless refinement, verified for the Great Rift Valley and Kenyan terrain.',
    }),
    defineField({
      name: 'heroVideoUrl',
      title: 'Hero Background Video URL (MP4 / WebM)',
      type: 'url',
      group: 'hero',
      description: 'Provide a direct link to an MP4 video file or leave blank to use the background image.',
      initialValue: 'https://assets.mixkit.co/videos/preview/mixkit-car-driving-on-a-road-in-nature-4261-large.mp4',
    }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero Poster / Fallback Image (Click to Upload / Replace)',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
      description: 'Upload a high-resolution photo to replace the current hero background image.',
    }),
    defineField({
      name: 'heroPrimaryCtaText',
      title: 'Hero Primary Button Text',
      type: 'string',
      group: 'hero',
      initialValue: 'Explore Vehicles',
    }),
    defineField({
      name: 'heroPrimaryCtaLink',
      title: 'Hero Primary Button Link',
      type: 'string',
      group: 'hero',
      initialValue: 'marketplace.html',
    }),
    defineField({
      name: 'heroSecondaryCtaText',
      title: 'Hero Secondary Button Text',
      type: 'string',
      group: 'hero',
      initialValue: 'Discover the Centre',
    }),
    defineField({
      name: 'heroSecondaryCtaLink',
      title: 'Hero Secondary Button Link',
      type: 'string',
      group: 'hero',
      initialValue: 'about.html',
    }),
    defineField({
      name: 'heroLocationLabel',
      title: 'Hero Location Label (Bottom Left)',
      type: 'string',
      group: 'hero',
      initialValue: 'NAIROBI · KENYA',
    }),

    // ------------------------------------------------------------------------
    // 2. STORY SECTION (LIGHTSHIP NARRATIVE)
    // ------------------------------------------------------------------------
    defineField({
      name: 'storyEyebrow',
      title: 'Story Section Eyebrow',
      type: 'string',
      group: 'story',
      initialValue: 'The Narrative Arc',
    }),
    defineField({
      name: 'storyStatement',
      title: 'Story Main Statement / Heading',
      type: 'string',
      group: 'story',
      initialValue: 'IT STARTS WITH THE RIGHT VEHICLE.',
    }),
    defineField({
      name: 'storyDescription',
      title: 'Story Description Paragraph',
      type: 'text',
      group: 'story',
      rows: 3,
      initialValue: 'Every acquisition is curated from certified UK networks, interrogated through 120-point diagnostic telemetry, and prepared for enduring African performance.',
    }),
    defineField({
      name: 'storyCtaText',
      title: 'Story Button Text',
      type: 'string',
      group: 'story',
      initialValue: 'Discover the Centre →',
    }),
    defineField({
      name: 'storyCtaLink',
      title: 'Story Button Link',
      type: 'string',
      group: 'story',
      initialValue: 'about.html',
    }),
    defineField({
      name: 'storyImage',
      title: 'Story Canvas Image (Click to Upload / Replace)',
      type: 'image',
      group: 'story',
      options: { hotspot: true },
      description: 'Upload a photo to replace the story section graphic.',
    }),

    // ------------------------------------------------------------------------
    // 3. FEATURED PRODUCT SPOTLIGHT
    // ------------------------------------------------------------------------
    defineField({
      name: 'featuredEyebrow',
      title: 'Featured Section Eyebrow',
      type: 'string',
      group: 'featured',
      initialValue: 'Expedition Icon',
    }),
    defineField({
      name: 'featuredHeadline',
      title: 'Featured Vehicle Heading',
      type: 'string',
      group: 'featured',
      initialValue: 'DEFENDER 110 V8',
    }),
    defineField({
      name: 'featuredDescription',
      title: 'Featured Vehicle Description',
      type: 'text',
      group: 'featured',
      rows: 3,
      initialValue: 'Prepared for the roads beyond the map. Carpathian Grey, 518 HP Supercharged V8, and electronic active differential.',
    }),
    defineField({
      name: 'featuredSpecs',
      title: 'Featured Vehicle Telemetry Specs String',
      type: 'string',
      group: 'featured',
      initialValue: '7 SEATS · PERMANENT 4WD · 5.0L V8 SUPERCHARGED · KES 22.8M',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Vehicle Backdrop Image (Click to Upload / Replace)',
      type: 'image',
      group: 'featured',
      options: { hotspot: true },
      description: 'Upload a full-bleed backdrop photo of your spotlight vehicle.',
    }),
    defineField({
      name: 'featuredPrimaryCtaText',
      title: 'Featured Button Text',
      type: 'string',
      group: 'featured',
      initialValue: 'View Defender Dossier →',
    }),
    defineField({
      name: 'featuredPrimaryCtaLink',
      title: 'Featured Button Link',
      type: 'string',
      group: 'featured',
      initialValue: 'vehicle-detail.html?car=land-rover-defender-110-v8-carpathian',
    }),

    // ------------------------------------------------------------------------
    // 4. THE KENYA SECTION
    // ------------------------------------------------------------------------
    defineField({
      name: 'kenyaEyebrow',
      title: 'Kenya Section Eyebrow',
      type: 'string',
      group: 'kenya',
      initialValue: 'Geographical Truth',
    }),
    defineField({
      name: 'kenyaHeadline',
      title: 'Kenya Section Headline',
      type: 'string',
      group: 'kenya',
      initialValue: "BUILT FOR A COUNTRY THAT DOESN'T HAVE ONE ROAD.",
    }),
    defineField({
      name: 'kenyaDescription',
      title: 'Kenya Section Description Paragraph',
      type: 'text',
      group: 'kenya',
      rows: 3,
      initialValue: 'From the smooth asphalt of the Nairobi Expressway to the basalt rock trails of Turkana and the red dust of Laikipia conservancies, these motorcars were engineered for real geographical versatility.',
    }),
    defineField({
      name: 'kenyaImage',
      title: 'Kenya Section Landscape Image (Click to Upload / Replace)',
      type: 'image',
      group: 'kenya',
      options: { hotspot: true },
      description: 'Upload a photo showing vehicles in authentic Kenyan landscapes.',
    }),
    defineField({
      name: 'kenyaCtaText',
      title: 'Kenya Section Button Text',
      type: 'string',
      group: 'kenya',
      initialValue: 'Explore Proven Fleet →',
    }),
    defineField({
      name: 'kenyaCtaLink',
      title: 'Kenya Section Button Link',
      type: 'string',
      group: 'kenya',
      initialValue: 'marketplace.html',
    }),

    // ------------------------------------------------------------------------
    // 5. ATELIER & WORKSHOP SECTION
    // ------------------------------------------------------------------------
    defineField({
      name: 'workshopEyebrow',
      title: 'Workshop Eyebrow',
      type: 'string',
      group: 'workshop',
      initialValue: 'Ridgeways Atelier',
    }),
    defineField({
      name: 'workshopHeadline',
      title: 'Workshop Headline',
      type: 'string',
      group: 'workshop',
      initialValue: "OWNERSHIP DOESN'T END AT DELIVERY.",
    }),

    // ------------------------------------------------------------------------
    // 6. RIDGEWAYS CENTRE (PHYSICAL LOCATION)
    // ------------------------------------------------------------------------
    defineField({
      name: 'centreHeadline',
      title: 'Centre Section Headline',
      type: 'string',
      group: 'centre',
      initialValue: 'RIDGEWAYS · NAIROBI',
    }),
    defineField({
      name: 'centreDescription',
      title: 'Centre Description Paragraph',
      type: 'text',
      group: 'centre',
      rows: 3,
      initialValue: 'Come see the collection in person. Private viewings, diagnostic consultations, and discreet vehicle handovers in a dedicated automotive environment.',
    }),
    defineField({
      name: 'centreAddress',
      title: 'Centre Physical Address',
      type: 'string',
      group: 'centre',
      initialValue: 'Location: Ridgeways, Kiambu Road, Nairobi',
    }),
    defineField({
      name: 'centreHours',
      title: 'Centre Operating Hours',
      type: 'string',
      group: 'centre',
      initialValue: 'Hours: Mon – Sat: 08:00 — 18:00',
    }),
    defineField({
      name: 'centreImage',
      title: 'Centre Facility Photo (Click to Upload / Replace)',
      type: 'image',
      group: 'centre',
      options: { hotspot: true },
      description: 'Upload a photo of the Ridgeways showroom or workshop.',
    }),

    // ------------------------------------------------------------------------
    // 7. CONFIDENCE CLOSE SECTION
    // ------------------------------------------------------------------------
    defineField({
      name: 'closeEyebrow',
      title: 'Confidence Close Eyebrow',
      type: 'string',
      group: 'close',
      initialValue: 'Direct Acquisition',
    }),
    defineField({
      name: 'closeHeadline',
      title: 'Confidence Close Main Headline',
      type: 'string',
      group: 'close',
      initialValue: 'THE ROAD IS YOURS.',
    }),
    defineField({
      name: 'closeDescription',
      title: 'Confidence Close Description Paragraph',
      type: 'text',
      group: 'close',
      rows: 3,
      initialValue: 'Let us find the right vehicle for it. Ten years of specialized Solihull trade, verified diagnostic logs, and direct client relationships across East Africa.',
    }),
    defineField({
      name: 'closeWhatsappText',
      title: 'WhatsApp Button Text',
      type: 'string',
      group: 'close',
      initialValue: 'Speak to a Concierge on WhatsApp',
    }),

    // ------------------------------------------------------------------------
    // 8. GLOBAL CONTACTS & FOOTER
    // ------------------------------------------------------------------------
    defineField({
      name: 'phone',
      title: 'Direct Phone Number',
      type: 'string',
      group: 'footer',
      initialValue: '+254 790 374 141',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number (without + or spaces)',
      type: 'string',
      group: 'footer',
      initialValue: '254790374141',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email Address',
      type: 'string',
      group: 'footer',
      initialValue: 'info@rangerovercentre.co.ke',
    }),
    defineField({
      name: 'address',
      title: 'Full Address',
      type: 'string',
      group: 'footer',
      initialValue: 'Ridgeways, Kiambu Road, Nairobi, Kenya',
    }),
    defineField({
      name: 'copyright',
      title: 'Footer Copyright Line',
      type: 'string',
      group: 'footer',
      initialValue: '© 2026 Range Rover Centre Nairobi · All Rights Reserved',
    }),
    defineField({
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'string',
      group: 'footer',
      initialValue: 'Engineered in Solihull. Proven on Kenyan roads.',
    }),
  ],
})
