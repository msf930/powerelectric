import {defineField, defineType} from 'sanity'

export const aboutMorePageType = defineType({
  name: 'aboutMorePage',
  title: 'About More Page',
  type: 'document',
  fields: [
    defineField({
        name: 'title',
        title: 'Page Title',
        description: 'The title that will be displayed on the about page',
        type: 'string',
        
    }),
    defineField({
        name: 'slug',
        title: 'Slug',
        description: 'The slug that will be displayed on the about more page',
        type: 'slug',
        options: {
            source: 'title',
        },
    }),
    defineField({
        name: 'pageDescription',
        title: 'Page Description',
        description: 'The description that will be displayed on the about more page',
        type: 'text',
    }),
    defineField({
        name: 'image',
        title: 'Image',
        description: 'The image that will be displayed on the about page',
        type: 'image',
        
    }),
    defineField({
        name: 'content',
        title: 'Content',
        description: 'The content that will be displayed on the about more page',
        type: 'array',
        of: [{type: 'block'}],
    }),
    defineField({
        name: 'buttonBool',
        title: 'Button On or Off',
        description: 'Switch on or off the button that will be displayed on the about more page',
        type: 'boolean',
        initialValue: false,
    }),
    defineField({
        name: 'buttonText',
        title: 'Button Text',
        description: 'The text that will be displayed on the button',
        type: 'string',
    }),
    defineField({
        name: 'buttonLink',
        title: 'Button Link',
        description: 'The link that will be displayed on the button',
        type: 'string',
    }),
  ]
})