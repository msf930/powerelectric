import {defineField, defineType} from 'sanity'

export const serviceItemType = defineType({
  name: 'serviceItem',
  title: 'Service Item',
  type: 'document',
  fields: [
    defineField({
        name: 'title',
        type: 'string',
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'content',
        title: 'Content',
        type: 'array',
        of: [{ type: 'block' }],
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'link',
        title: 'Link',
        type: 'url',
       
    }),
   
  ],
})