import { defineField, defineType } from 'sanity'

export const processItemType = defineType({
    name: 'processItem',
    title: 'Process Item',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            description: 'The title of the step in the process',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
       
        defineField({
            name: 'description',
            title: 'Description',
            description: 'The description of the step in the process',
            type: 'text',
            
        }),
        

    ],
})