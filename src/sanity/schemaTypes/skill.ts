import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'skill',
  title: 'Compétences',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom de la compétence (ex: Django, React)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'level',
      title: 'Niveau de maîtrise (en %)',
      type: 'number',
      description: 'Déplacez le curseur entre 0 et 100',
      validation: (Rule) => Rule.min(0).max(100),
      initialValue: 80,
    }),
    defineField({
      name: 'category',
      title: 'Catégorie (FR) (ex: Backend, Design)',
      type: 'string',
    }),
    defineField({
      name: 'category_en',
      title: 'Category (EN)',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Icône',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})