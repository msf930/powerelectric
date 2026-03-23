import {defineField, defineType} from 'sanity'

export const serviceSubCategoryType = defineType({
  name: 'serviceSubCategory',
  title: 'Service Sub Category',
  type: 'document',
  fields: [
    defineField({
        name: 'title',
        type: 'string',
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'icon',
        type: 'image',
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'services',
        title: 'Services',
        type: 'array',
        of: [{type: 'reference', to: [{type: 'service'}]}]
    }),
   
  ],
})