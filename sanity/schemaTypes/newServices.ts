import {defineField, defineType} from 'sanity'

export const newServicesType = defineType({
  name: 'newServices',
  title: 'New Services',
  type: 'document',
  fields: [
    defineField({
        name: 'newServices',
        title: 'New Services',
        type: 'array',
        of: [{type: 'reference', to: [{type: 'newServicePage'}]}]
    }),
  ],
})