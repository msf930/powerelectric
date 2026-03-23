import {defineField, defineType} from 'sanity'

export const bookButtonType = defineType({
  name: 'bookButton',
  title: 'Book Button Link',
  type: 'document',
  fields: [
    defineField({
        name: 'link',
        title: 'Link',
        description: 'The link that will be connected to the book button.  Must start with http:// or https://',
        type: 'string',
        validation: (rule) => rule.required().regex(/^https?:\/\//),
    }),
  ],
});