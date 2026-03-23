import {defineField, defineType} from 'sanity'

export const infoSectionType = defineType({
  name: 'infoSection',
  title: 'Info Section',
  type: 'document',
  fields: [
    defineField({
        name: 'title',
        type: 'string',
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'description',
        type: 'text',
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'image',
        type: 'image',
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'imageSecondary',
        type: 'image',
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'bulletPoints',
        title: 'Bullet Points',
        type: 'array',
        of: [{type: 'string'}]
    }),
   
  ],
})