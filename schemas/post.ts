import { format, parseISO } from 'date-fns'
import { BsPencilSquare } from 'react-icons/bs'
import { defineField, defineType } from 'sanity'

import authorType from './author'
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
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: authorType.name }],
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
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
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
    // {
    //   name: 'mainImage',
    //   title: 'Main image',
    //   type: 'image',
    //   options: {
    //     hotspot: true,
    //   },
    // },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      date: 'date',
      // media: 'mainImage',
    },
    // prepare({ title, media, author, date }) {
    prepare({ title, author, date }) {
      const subtitles = [
        author && `by ${author}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean)

      // return { title, media, subtitle: subtitles.join(' ') }
      return { title, subtitle: subtitles.join(' ') }
    },
  },
})
