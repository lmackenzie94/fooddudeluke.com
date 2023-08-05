import { BsPencilSquare } from 'react-icons/bs'
import { defineField, defineType } from 'sanity'

import categoryType from './category'

export default defineType({
  name: 'post',
  title: 'Post',
  icon: BsPencilSquare,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: categoryType.name } }],
    }),
    // defineField({
    //   name: 'content',
    //   title: 'Content',
    //   type: 'array',
    //   of: [{ type: 'block' }],
    // }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    // defineField({
    //   name: 'tldr',
    //   title: 'TL;DR',
    //   type: 'tldrContent',
    // }),
    defineField({
      name: 'socialImageURL',
      title: 'Social Image URL',
      type: 'url',
      description: 'URL will be automatically generated on save.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category1: 'categories.0.title',
      category2: 'categories.1.title',
      category3: 'categories.2.title',
    },
    prepare({ title, category1, category2, category3 }) {
      const categories = [category1, category2, category3].filter(Boolean)
      console.log('categories', categories)
      const subtitles = [categories && `${categories.join(', ')}`].filter(
        Boolean
      )

      return { title, subtitle: subtitles.join(' ') }
    },
  },
})
