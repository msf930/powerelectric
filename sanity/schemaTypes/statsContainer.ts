import {defineField, defineType} from 'sanity'

export const statsContainerType = defineType({
  name: 'statsContainer',
  title: 'Stats Container',
  type: 'document',
  fields: [
    defineField({
        name: 'stats',
        title: 'Stats',
        description: 'Add 4 stats',
        type: 'array',
        of: [{type: 'reference', to: [{type: 'stat'}]}],
        validation: (Rule) => Rule.required().min(4).max(4),
    })
   
  ],
})