import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'experience',
  title: 'Expériences',
  type: 'document',
  fields: [
    defineField({
      name: 'role',
      title: 'Poste (FR)',
      type: 'string',
    }),
    defineField({
      name: 'role_en',
      title: 'Role (EN)',
      type: 'string',
    }),
    defineField({
      name: 'company',
      title: 'Entreprise',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description (FR)',
      type: 'text',
    }),
    defineField({
      name: 'description_en',
      title: 'Description (EN)',
      type: 'text',
    }),
    defineField({
      name: 'startDate',
      title: 'Date de début',
      type: 'date',
    }),
    defineField({
      name: 'endDate',
      title: 'Date de fin (laisser vide si actuel)',
      type: 'date',
    }),
  ],
})