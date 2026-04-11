import {defineField, defineType} from 'sanity'

export const serviceCategoryType = defineType({
  name: 'serviceCategory',
  title: 'Service Category',
  type: 'document',
  fields: [
    defineField({
        name: 'title',
        type: 'string',
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'slug',
        type: 'slug',
        options: {
            source: 'title',
            maxLength: 96,
            slugify: (input: string) =>
                input
                .toLowerCase()
                .replace(/\s+/g, '-')
                .slice(0, 96),
        },
        validation: (rule) => rule.required(),
    }),
    // defineField({
    //     name: 'image',
    //     type: 'image',
    //     validation: (rule) => rule.required(),
    // }),
    // defineField({
    //     name: 'icon',
    //     type: 'image',
    //     validation: (rule) => rule.required(),
    // }),
    // defineField({
    //     name: 'subTitle',
    //     title: 'Sub Title',
    //     type: 'string',
    //     validation: (rule) => rule.required(),
    // }),
    defineField({
        name: 'subCategories',
        title: 'Sub Categories',
        type: 'array',
        of: [{type: 'reference', to: [{type: 'serviceSubCategory'}]}]
    }),
   
  ],
})