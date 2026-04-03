import { defineField, defineType } from 'sanity'
import { RiPagesLine } from "react-icons/ri";

export const newServicePageType = defineType({
    name: 'newServicePage',
    title: 'New Service Page',
    type: 'document',
    icon: RiPagesLine,
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
        defineField({
            name: 'city',
            title: 'City',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'titleHero',
            title: 'Hero Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'imagePrimary',
            title: 'Primary Image',
            type: 'image',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'imageSecond',
            title: 'Second Image',
            type: 'image',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'titlePrimary',
            title: 'Primary Section Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'descriptionPrimary',
            title: 'Primary Section Description',
            type: 'array',
            of: [{ type: 'block' }],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'bookNowText',
            title: 'Book Now Text',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'bookNowSubtext',
            title: 'Book Now Subtext',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'titleSecond',
            title: 'Second Section Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'descriptionSecond',
            title: 'Second Section Description',
            type: 'array',
            of: [{ type: 'block' }],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'titleThird',
            title: 'Third Section Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'descriptionThird',
            title: 'Third Section Description',
            type: 'array',
            of: [{ type: 'block' }],
            
        }),
        defineField({
            name: 'thirdItems',
            title: 'Third Section Items',
            type: 'array',
            of: [{type: 'reference', to: [{type: 'serviceItem'}]}]
        }),
        defineField({
            name: 'faqItems',
            title: 'FAQ Section Items',
            type: 'array',
            of: [{type: 'reference', to: [{type: 'serviceItem'}]}]
        }),

    ],
});