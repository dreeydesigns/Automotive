import { defineField, defineType } from 'sanity'

export const vehicleType = defineType({
  name: 'vehicle',
  title: 'Vehicles',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Vehicle Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-${doc.trim || ''}-${doc.year || ''}`,
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'trim',
      title: 'Trim / Edition',
      type: 'string',
      description: 'e.g. Autobiography, R-Dynamic, SE, Classic',
    }),
    defineField({
      name: 'year',
      title: 'Year of Manufacture',
      type: 'number',
      validation: (rule) => rule.required().min(1970).max(2035),
    }),
    defineField({
      name: 'price',
      title: 'Display Price',
      type: 'string',
      description: 'e.g. KES 18.5M',
    }),
    defineField({
      name: 'priceValue',
      title: 'Numeric Price Value (KES)',
      type: 'number',
      description: 'Numeric price used for sorting and filtering (e.g. 18500000)',
    }),
    defineField({
      name: 'mileage',
      title: 'Mileage',
      type: 'string',
      description: 'e.g. 38,000 KM',
    }),
    defineField({
      name: 'engine',
      title: 'Engine Specs',
      type: 'string',
      description: 'e.g. 3.0L SDV6 / 3000cc',
    }),
    defineField({
      name: 'power',
      title: 'Power Output',
      type: 'string',
      description: 'e.g. 340 hp / 700 Nm',
    }),
    defineField({
      name: 'transmission',
      title: 'Transmission',
      type: 'string',
      options: {
        list: [
          { title: '8-Speed Automatic', value: '8-Speed Automatic' },
          { title: '9-Speed Automatic', value: '9-Speed Automatic' },
          { title: 'Automatic', value: 'Automatic' },
          { title: 'Manual', value: 'Manual' },
        ],
      },
    }),
    defineField({
      name: 'drivetrain',
      title: 'Drivetrain',
      type: 'string',
      description: 'e.g. AWD / Terrain Response 2',
    }),
    defineField({
      name: 'exterior',
      title: 'Exterior Color & Styling',
      type: 'string',
      description: 'e.g. Fuji White / Black Pack',
    }),
    defineField({
      name: 'interior',
      title: 'Interior Color & Material',
      type: 'string',
      description: 'e.g. Ebony Windsor Leather',
    }),
    defineField({
      name: 'fuel',
      title: 'Fuel Type',
      type: 'string',
      options: {
        list: [
          { title: 'Petrol', value: 'Petrol' },
          { title: 'Diesel', value: 'Diesel' },
          { title: 'Hybrid / PHEV', value: 'Hybrid' },
          { title: 'Electric', value: 'Electric' },
        ],
      },
    }),
    defineField({
      name: 'stockId',
      title: 'Stock ID',
      type: 'string',
      description: 'e.g. RRC-2241',
    }),
    defineField({
      name: 'vinStatus',
      title: 'VIN Status',
      type: 'string',
      options: {
        list: [
          { title: 'Verified', value: 'Verified' },
          { title: 'Pending Verification', value: 'Pending' },
        ],
      },
      initialValue: 'Verified',
    }),
    defineField({
      name: 'logbook',
      title: 'Logbook Status',
      type: 'string',
      options: {
        list: [
          { title: 'Ready', value: 'Ready' },
          { title: 'In transit', value: 'In transit' },
          { title: 'Processing', value: 'Processing' },
        ],
      },
      initialValue: 'Ready',
    }),
    defineField({
      name: 'warranty',
      title: 'Warranty Period',
      type: 'string',
      description: 'e.g. 12 Months, 6 Months, 3 Months',
    }),
    defineField({
      name: 'location',
      title: 'Vehicle Location',
      type: 'string',
      description: 'e.g. Nairobi, Import stock, Mombasa',
      initialValue: 'Nairobi',
    }),
    defineField({
      name: 'images',
      title: 'Vehicle Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text (description)',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'trim',
      year: 'year',
      price: 'price',
      media: 'images.0',
    },
    prepare({ title, subtitle, year, price, media }) {
      const yearText = year ? `(${year})` : ''
      const sub = [subtitle, yearText, price ? `• ${price}` : ''].filter(Boolean).join(' ')
      return {
        title,
        subtitle: sub,
        media,
      }
    },
  },
})
