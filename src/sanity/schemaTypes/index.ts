import { type SchemaTypeDefinition } from 'sanity'
import project from './project'
import skill from './skill'
import experience from './experience'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, skill, experience],
}