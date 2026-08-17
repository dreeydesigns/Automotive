import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Website Settings, Headings & Content',
  type: 'document',
  fields: [
    // 1. HERO SECTION
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow (Top Badge)',
      type: 'string',
      initialValue: 'Solihull Sourced · Nairobi Audited',
    }),
    defineField({
      name: 'heroHeadlineSequence',
      title: 'Hero Scroll Headline Sequence',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'A DIFFERENT WAY TO ARRIVE.',
        'BUILT FOR THE CITY.',
        'READY FOR THE DISTANCE.',
        'BUILT FOR BOTH.'
      ],
      description: 'The sequence of headlines that rewrite smoothly as the visitor scrolls down.',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle / Description Paragraph',
      type: 'text',
      rows: 3,
      initialValue:
        'Two British automotive legacies. Handcrafted for peerless refinement, verified for the Great Rift Valley and Kenyan terrain.',
    }),
    defineField({
      name: 'heroVideoUrl',
      title: 'Hero Background Video URL (MP4 / WebM)',
      type: 'url',
      initialValue: 'https://assets.mixkit.co/videos/preview/mixkit-car-driving-on-a-road-in-nature-4261-large.mp4',
    }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero Fallback / Poster Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroPrimaryCtaText',
      title: 'Hero Primary Button Text',
      type: 'string',
      initialValue: 'Explore Vehicles',
    }),
    defineField({
      name: 'heroPrimaryCtaLink',
      title: 'Hero Primary Button Link',
      type: 'string',
      initialValue: 'marketplace.html',
    }),
    defineField({
      name: 'heroSecondaryCtaText',
      title: 'Hero Secondary Button Text',
      type: 'string',
      initialValue: 'Discover the Centre',
    }),
    defineField({
      name: 'heroSecondaryCtaLink',
      title: 'Hero Secondary Button Link',
      type: 'string',
      initialValue: 'about.html',
    }),
    defineField({
      name: 'heroLocationLabel',
      title: 'Hero Location Label (Bottom Left)',
      type: 'string',
      initialValue: 'NAIROBI · KENYA',
    }),

    // 2. STORY SECTION (LIGHTSHIP NARRATIVE)
    defineField({
      name: 'storyEyebrow',
      title: 'Story Section Eyebrow',
      type: 'string',
      initialValue: 'The Narrative Arc',
    }),
    defineField({
      name: 'storyStatement',
      title: 'Story Main Statement / Heading',
      type: 'string',
      initialValue: 'IT STARTS WITH THE RIGHT VEHICLE.',
    }),
    defineField({
      name: 'storyDescription',
      title: 'Story Description Paragraph',
      type: 'text',
      rows: 3,
      initialValue: 'Every acquisition is curated from certified UK networks, interrogated through 120-point diagnostic telemetry, and prepared for enduring African performance.',
    }),
    defineField({
      name: 'storyCtaText',
      title: 'Story Button Text',
      type: 'string',
      initialValue: 'Discover the Centre →',
    }),
    defineField({
      name: 'storyCtaLink',
      title: 'Story Button Link',
      type: 'string',
      initialValue: 'about.html',
    }),
    defineField({
      name: 'storyImage',
      title: 'Story Canvas Image',
      type: 'image',
      options: { hotspot: true },
    }),

    // 3. FEATURED PRODUCT SPOTLIGHT
    defineField({
      name: 'featuredEyebrow',
      title: 'Featured Spotlight Eyebrow',
      type: 'string',
      initialValue: 'Expedition Icon',
    }),
    defineField({
      name: 'featuredHeadline',
      title: 'Featured Spotlight Heading',
      type: 'string',
      initialValue: 'DEFENDER 110 V8',
    }),
    defineField({
      name: 'featuredDescription',
      title: 'Featured Spotlight Description',
      type: 'text',
      rows: 3,
      initialValue: 'Prepared for the roads beyond the map. Carpathian Grey, 518 HP Supercharged V8, and electronic active differential.',
    }),
    defineField({
      name: 'featuredSpecs',
      title: 'Featured Specs Bar Text',
      type: 'string',
      initialValue: '7 SEATS · PERMANENT 4WD · 5.0L V8 SUPERCHARGED · KES 22.8M',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Spotlight Backdrop Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'featuredPrimaryCtaText',
      title: 'Featured Primary Button Text',
      type: 'string',
      initialValue: 'View Defender Dossier →',
    }),
    defineField({
      name: 'featuredPrimaryCtaLink',
      title: 'Featured Primary Button Link',
      type: 'string',
      initialValue: 'vehicle-detail.html?car=land-rover-defender-110-v8-carpathian',
    }),

    // 4. KENYA SECTION
    defineField({
      name: 'kenyaEyebrow',
      title: 'Kenya Section Eyebrow',
      type: 'string',
      initialValue: 'Geographical Truth',
    }),
    defineField({
      name: 'kenyaHeadline',
      title: 'Kenya Section Heading',
      type: 'string',
      initialValue: "BUILT FOR A COUNTRY THAT DOESN'T HAVE ONE ROAD.",
    }),
    defineField({
      name: 'kenyaDescription',
      title: 'Kenya Section Paragraph',
      type: 'text',
      rows: 3,
      initialValue: "From the smooth asphalt of the Nairobi Expressway to the basalt rock trails of Turkana and the red dust of Laikipia conservancies, these motorcars were engineered for real geographical versatility.",
    }),
    defineField({
      name: 'kenyaImage',
      title: 'Kenya Section Landscape Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'kenyaCtaText',
      title: 'Kenya Section Button Text',
      type: 'string',
      initialValue: 'Explore Proven Fleet →',
    }),
    defineField({
      name: 'kenyaCtaLink',
      title: 'Kenya Section Button Link',
      type: 'string',
      initialValue: 'marketplace.html',
    }),

    // 5. ATELIER & CARE SECTION
    defineField({
      name: 'workshopEyebrow',
      title: 'Workshop Section Eyebrow',
      type: 'string',
      initialValue: 'Ridgeways Atelier',
    }),
    defineField({
      name: 'workshopHeadline',
      title: 'Workshop Section Heading',
      type: 'string',
      initialValue: "OWNERSHIP DOESN'T END AT DELIVERY.",
    }),

    // 6. THE CENTRE (RIDGEWAYS FACILITY)
    defineField({
      name: 'centreEyebrow',
      title: 'Centre Section Eyebrow',
      type: 'string',
      initialValue: 'Physical Sanctuary',
    }),
    defineField({
      name: 'centreHeadline',
      title: 'Centre Section Heading',
      type: 'string',
      initialValue: 'RIDGEWAYS · NAIROBI',
    }),
    defineField({
      name: 'centreDescription',
      title: 'Centre Section Description',
      type: 'text',
      rows: 3,
      initialValue: 'Come see the collection in person. Private viewings, diagnostic consultations, and discreet vehicle handovers in a dedicated automotive environment.',
    }),
    defineField({
      name: 'centreImage',
      title: 'Centre Facility Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'centreAddress',
      title: 'Showroom Address Line',
      type: 'string',
      initialValue: 'Ridgeways, Kiambu Road, Nairobi',
    }),
    defineField({
      name: 'centreHours',
      title: 'Operating Hours Line',
      type: 'string',
      initialValue: 'Mon – Sat: 08:00 — 18:00',
    }),

    // 7. THE CONFIDENCE CLOSE
    defineField({
      name: 'closeEyebrow',
      title: 'Close Section Eyebrow',
      type: 'string',
      initialValue: 'Direct Acquisition',
    }),
    defineField({
      name: 'closeHeadline',
      title: 'Close Section Heading',
      type: 'string',
      initialValue: 'THE ROAD IS YOURS.',
    }),
    defineField({
      name: 'closeDescription',
      title: 'Close Section Description',
      type: 'text',
      rows: 3,
      initialValue: 'Let us find the right vehicle for it. Ten years of specialized Solihull trade, verified diagnostic logs, and direct client relationships across East Africa.',
    }),
    defineField({
      name: 'closeWhatsappText',
      title: 'Close WhatsApp Button Text',
      type: 'string',
      initialValue: 'Speak to a Concierge on WhatsApp',
    }),

    // 8. GLOBAL CONTACT & FOOTER
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      initialValue: '+254 790 374 141',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number (digits only, e.g. 254790374141)',
      type: 'string',
      initialValue: '254790374141',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'info@rangerovercentre.co.ke',
    }),
    defineField({
      name: 'address',
      title: 'Global Physical Address',
      type: 'string',
      initialValue: 'Ridgeways, Kiambu Road, Nairobi',
    }),
    defineField({
      name: 'copyright',
      title: 'Footer Copyright Line',
      type: 'string',
      initialValue: '© 2026 Range Rover Centre Nairobi · All Rights Reserved',
    }),
    defineField({
      name: 'footerTagline',
      title: 'Footer Right Tagline',
      type: 'string',
      initialValue: 'Engineered in Solihull. Proven on Kenyan roads.',
    }),
  ],
  preview: {
    select: {
      title: 'heroHeadlineSequence.0',
      subtitle: 'heroSubtitle',
      media: 'heroBackgroundImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Website Settings',
        subtitle: subtitle || 'Global Headings, Banner, Videos & Content',
        media,
      }
    },
  },
})
