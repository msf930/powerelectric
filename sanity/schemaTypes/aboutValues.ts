import {defineField, defineType} from 'sanity'

export const aboutValuesType = defineType({
  name: 'aboutValues',
  title: 'About Values',
  type: 'document',
  fields: [
    defineField({
        name: 'title',
        title: 'Title',
        description: 'The title that will be displayed on the about page',
        type: 'string',
        
    }),
    defineField({
        name: 'subtitle',
        title: 'Subtitle',
        description: 'The subtitle that will be displayed on the about page',
        type: 'string',
        
    }),
    defineField({
        name: 'description',
        title: 'Description',
        description: 'The description that will be displayed on the about page',
        type: 'text',
        
    }),
    defineField({
        name: 'icon',
        type: 'image',
        
    }),
   
   
  ],
})