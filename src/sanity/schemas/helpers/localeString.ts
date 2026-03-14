import { defineField } from "sanity";

export const localeString = (
  name: string,
  title: string,
  options?: { rows?: number; required?: boolean },
) => [
  defineField({
    name: `${name}_hr`,
    title: `${title} (HR)`,
    type: options?.rows ? "text" : "string",
    ...(options?.rows ? { rows: options.rows } : {}),
    validation: (rule) => (options?.required ? rule.required() : rule),
  }),
  defineField({
    name: `${name}_en`,
    title: `${title} (EN)`,
    type: options?.rows ? "text" : "string",
    ...(options?.rows ? { rows: options.rows } : {}),
  }),
];
