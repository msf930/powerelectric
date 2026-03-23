import { defineField, defineType } from 'sanity'

export const statType = defineType({
    name: 'stat',
    title: 'Stat',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            description: 'The title of the stat',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'leadingText',
            title: 'Leading Text',
            description: 'The text that appears before the value eg. "$", "Our clients", "Our team", etc.',
            type: 'string',
            
        }),
        defineField({
            name: 'value',
            title: 'Value',
            description: 'The value of the stat',
            type: 'number',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'trailingText',
            title: 'Trailing Text',
            description: 'The text that appears after the value eg. "%", "years", "projects", etc.',
            type: 'string',
            
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            
        }),
        

    ],
})