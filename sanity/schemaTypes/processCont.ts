import {defineField, defineType} from 'sanity'

export const processContType = defineType({
  name: 'processCont',
  title: 'Process Steps',
  type: 'document',
  fields: [
    defineField({
        name: 'processes',
        title: 'Process Steps',
        type: 'array',
        of: [{type: 'reference', to: [{type: 'processItem'}]}]
    }),
  ],
})