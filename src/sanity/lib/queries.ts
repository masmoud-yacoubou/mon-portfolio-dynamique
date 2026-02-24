// src/sanity/lib/queries.ts

export const PROJECTS_QUERY = `*[_type == "project"]{
  _id,
  "title": coalesce(select($locale == "en" => title_en), title),
  "description": coalesce(select($locale == "en" => description_en), description),
  "slug": slug.current,
  image,
  technologies
}`;

export const SKILLS_QUERY = `*[_type == "skill"] | order(level desc){
  _id,
  name,
  level,
  "category": coalesce(select($locale == "en" => category_en), category),
  icon
}`;

export const EXPERIENCES_QUERY = `*[_type == "experience"] | order(startDate desc){
  _id,
  company,
  "role": coalesce(select($locale == "en" => role_en), role),
  "description": coalesce(select($locale == "en" => description_en), description),
  startDate,
  endDate
}`;