import {defineField, defineType} from 'sanity'
import { FaMapMarkerAlt } from 'react-icons/fa'

export const locationsType = defineType({
  name: 'locations',
  title: 'Service Locations',
  icon: FaMapMarkerAlt,
  type: 'document',
  fields: [
    defineField({
        name: 'County',
        type: 'string',
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'cities',
        title: 'Cities',
        type: 'array',
        of: [{type: 'string'}]
    }),
   
  ],
})