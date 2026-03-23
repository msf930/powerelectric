import {defineField, defineType} from 'sanity'

export const allServicesType = defineType({
  name: 'allServices',
  title: 'All Services',
  type: 'document',
  fields: [
    defineField({
        name: 'allServices',
        title: 'All Services',
        type: 'array',
        of: [{type: 'reference', to: [{type: 'serviceCategory'}]}]
    }),
  ],
})