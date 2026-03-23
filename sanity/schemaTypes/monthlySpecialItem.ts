import { defineField, defineType } from 'sanity'

export const monthlySpecialItemType = defineType({
    name: 'monthlySpecialItem',
    title: 'Monthly Special Item',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            description: 'The title of the monthly special item',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
       
        defineField({
            name: 'description',
            title: 'Description',
            description: 'The description of the monthly special item',
            type: 'text',
            
        }),
        

    ],
})