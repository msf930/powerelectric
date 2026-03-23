import {defineField, defineType} from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
        name: 'title',
        title: 'Title',
        description: 'The title that will be displayed on the about page',
        type: 'string',
        
    }),
    defineField({
        name: 'description',
        title: 'Description',
        description: 'The description that will be displayed on the about page',
        type: 'array',
        of: [{ type: 'block' }],
        
    }),
    defineField({
        name: 'contactText',
        title: 'Contact Text',
        description: 'The text that will be displayed on the contact area',
        type: 'array',
        of: [{ type: 'block' }],
        
    }),
    defineField({
        name: 'image',
        type: 'image',
        
    }),
    defineField({
        name: 'values',
        title: 'Values',
        description: 'Select the values that will be displayed on the about page',
        type: 'array',
        of: [{type: 'reference', to: [{type: 'aboutValues'}]}]
    }),
   
  ],
})