import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// Singleton document type for website settings
const singletonTypes = new Set(['siteSettings'])
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'default',
  title: 'Range Rover Motors Studio',

  projectId: 'ckvlowx4',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content Studio')
          .items([
            // Singleton: Direct link to Website Content & Settings
            S.listItem()
              .title('Website Content, Media & Headings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Website Content & Media Settings')
              ),
            S.divider(),
            // Vehicles Inventory
            S.listItem()
              .title('Vehicle Inventory (Showroom Fleet)')
              .schemaType('vehicle')
              .child(S.documentTypeList('vehicle').title('Showroom Vehicles')),
            // Journal Articles
            S.listItem()
              .title('Journal & Editorial Articles')
              .schemaType('post')
              .child(S.documentTypeList('post').title('Journal Articles')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Prevent creating duplicate siteSettings from the global new (+) button
    templates: (templates) =>
      templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },

  document: {
    // For singletons, hide the delete/duplicate actions
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({action}) => action && singletonActions.has(action))
        : input,
  },
})
