import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Website Settings & Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow (Top text)',
      type: 'string',
      initialValue: 'Range Rover Centre',
    }),
    defineField({
      name: 'heroTitleLine1',
      title: 'Hero Title (Line 1)',
      type: 'string',
      initialValue: 'Verified luxury',
    }),
    defineField({
      name: 'heroTitleLine2',
      title: 'Hero Title (Line 2)',
      type: 'string',
      initialValue: 'Concierge care',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle / Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Curated acquisitions, full diagnostics, and a legacy of service for Nairobi’s most discerning drivers.',
    }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero Background / Banner Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroPrimaryCtaText',
      title: 'Primary Button Text',
      type: 'string',
      initialValue: 'Find My Car',
    }),
    defineField({
      name: 'heroPrimaryCtaLink',
      title: 'Primary Button Link',
      type: 'string',
      initialValue: 'marketplace.html',
    }),
    defineField({
      name: 'heroSecondaryCtaText',
      title: 'Secondary Button Text',
      type: 'string',
      initialValue: 'Sell My Car',
    }),
    defineField({
      name: 'heroSecondaryCtaLink',
      title: 'Secondary Button Link',
      type: 'string',
      initialValue: 'sell.html',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      initialValue: '+254 790 374 141',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number (without +)',
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
      title: 'Physical Address',
      type: 'string',
      initialValue: 'Ridgeways, Kiambu Road, Nairobi',
    }),
  ],
  preview: {
    select: {
      title: 'heroTitleLine1',
      subtitle: 'heroTitleLine2',
      media: 'heroBackgroundImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: `${title || 'Website Settings'} ${subtitle || ''}`,
        subtitle: 'Homepage Banner & Global Contact',
        media,
      }
    },
  },
})
