import {defineField, defineType} from 'sanity'

export const aboutMoreType = defineType({
  name: 'aboutMore',
  title: 'About More',
  type: 'document',
  fields: [
    defineField({
        name: 'pages',
        title: 'Pages',
        description: 'The pages that will be displayed on the about more section',
        type: 'array',
        of: [{type: 'reference', to: [{type: 'aboutMorePage'}]}]
    })
  ]
})