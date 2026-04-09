import {defineField, defineType} from 'sanity'
import { RiPagesLine } from "react-icons/ri";

export const blogCatagoryType = defineType({
  name: 'blogCatagory',
  title: 'Blog Category',
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
  ]
})