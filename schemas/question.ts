import { BsPatchQuestion } from 'react-icons/bs'
import { defineField, defineType } from 'sanity'

import categoryType from './category'
/**
 * This file is the schema definition for a post.
 *
 * Here you'll be able to edit the different fields that appear when you 
 * create or edit a post in the studio.
 * 
 * Here you can see the different schema types that are available:

  https://www.sanity.io/docs/schema-types

 */

export default defineType({
  name: 'question',
  title: 'Question',
  icon: BsPatchQuestion,
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
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: categoryType.name } }],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    // {
    //   name: 'tldr',
    //   title: 'TL;DR',
    //   type: 'tldrContent',
    // },
    defineField({
      name: 'socialImageURL',
      title: 'Social Image URL',
      type: 'url',
      description: 'URL will be automatically generated on save.',
    }),
  ],
})
