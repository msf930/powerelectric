import { defineField, defineType } from 'sanity'

export const valueItemType = defineType({
    name: 'valueItem',
    title: 'Value Item',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            description: 'The title of the value item',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'icon',
            title: 'Icon',
            description: 'The icon of the value item, you can use  https://icons8.com/icons/all/--white',
            type: 'image',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'pageLink',
            title: 'Page Link',
            description: 'Set to 1 to link to the Contact page, set to 2 to link to the About page, 3 to link to the Finance page, 4 to link to the Membership page',
            type: 'number',
            initialValue: 1,
            validation: (rule) => rule.min(1).max(4),
        }),

    ],
})