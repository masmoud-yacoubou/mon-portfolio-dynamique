import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projets',
  type: 'document',
  fields: [
    // --- TITRES ---
    defineField({
      name: 'title',
      title: 'Titre (FR)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title_en',
      title: 'Title (EN)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // --- SLUG (Identifiant URL) ---
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // --- DESCRIPTIONS ---
    defineField({
      name: 'description',
      title: 'Description (FR)',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description_en',
      title: 'Description (EN)',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),

    // --- MEDIA & LIENS ---
    defineField({
      name: 'image',
      title: 'Image du projet',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Lien du site (Live Demo)',
      type: 'url',
    }),

    // --- TECHNOLOGIES ---
    defineField({
      name: 'technologies',
      title: 'Technologies utilisées',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
  ],

  // Permet d'avoir un aperçu propre dans le Studio Sanity
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})