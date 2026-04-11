import {defineField, defineType} from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page Links',
  type: 'document',
  fields: [
    defineField({
        name: 'linkTitle',
        title: 'Link Title',
        description: 'The title of the link',
        type: 'string',
    }),
    defineField({
        name: 'link',
        title: 'Link',
        description: 'The link that will be displayed on the home page',
        type: 'string',
        
    }),
   
   
   
   
  ],
})