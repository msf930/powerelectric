import { defineField, defineType } from 'sanity'

export const monthlyAdType = defineType({
    name: 'monthlyAd',
    title: 'Monthly Ad',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            description: 'The title of the monthly ad',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
       
        defineField({
            name: 'description',
            title: 'Description',
            description: 'The description of the monthly ad',
            type: 'text',
            
        }),
        defineField({
            name: 'image',
            title: 'Image',
            description: 'The image of the monthly ad',
            type: 'image',          
        }),
        defineField({
            name: 'monthlySpecials',
            title: 'Monthly Specials',
            description: 'The monthly specials of the monthly ad',
            type: 'array',
            of: [{type: 'reference', to: [{type: 'monthlySpecialItem'}]}],
        }),

    ],
})