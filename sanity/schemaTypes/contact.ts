import {defineField, defineType} from 'sanity'

export const contactType = defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    defineField({
        name: 'accessString',
        title: 'Access String',
        description: 'https://web3forms.com/ to get the access string',
        type: 'string',
        
    }),
    defineField({
        name: 'description',
        type: 'text',
        description: 'The description that will be displayed on the contact page',
       
    }),
    defineField({
        name: 'image',
        type: 'image',
        
    }),
    defineField({
        name: 'serviceItems',
        title: 'Service Items',
        description: 'Select the service items that will be displayed in the contact form',
        type: 'array',
        of: [{type: 'reference', to: [{type: 'service'}]}]
    }),
   
  ],
})