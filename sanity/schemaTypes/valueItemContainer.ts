import {defineField, defineType} from 'sanity'

export const valueItemContainerType = defineType({
  name: 'valueItemContainer',
  title: 'Value Item Container',
  type: 'document',
  fields: [
    defineField({
        name: 'valueItems',
        title: 'Value Items',
        type: 'array',
        of: [{type: 'reference', to: [{type: 'valueItem'}]}]
    }),
  ],
})