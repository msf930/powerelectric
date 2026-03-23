import {defineField, defineType} from 'sanity'

export const statsContainerType = defineType({
  name: 'statsContainer',
  title: 'Stats Container',
  type: 'document',
  fields: [
    defineField({
        name: 'stats',
        title: 'Stats',
        type: 'array',
        of: [{type: 'reference', to: [{type: 'stat'}]}]
    }),
  ],
})