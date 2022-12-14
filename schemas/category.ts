import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType ({
  name: 'category',
  title: 'Category',
  icon: TagIcon,
  type: 'document',
  fields: [
    defineField(
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField(
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})
