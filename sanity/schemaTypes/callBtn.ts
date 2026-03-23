import {defineField, defineType} from 'sanity'

export const callButtonType = defineType({
  name: 'callButton',
  title: 'Call Button Link',
  type: 'document',
  fields: [
    defineField({
        name: 'number',
        title: 'Number',
        description: 'The number that will be connected to the call button.  Must start with +1 and be 10 digits long.  No parentheses, dashes, or spaces.  Example: +1234567890',
        type: 'string',
        validation: (rule) => rule.required().regex(/^\+1\d{10}$/),
    }),
  ],
});