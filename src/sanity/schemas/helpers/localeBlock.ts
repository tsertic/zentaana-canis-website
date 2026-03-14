import { defineField } from "sanity";

export const localeBlock = (name: string, title: string) => [
  defineField({
    name: `${name}_hr`,
    title: `${title} (HR)`,
    type: "array",
    of: [
      {
        type: "block",
        styles: [
          { title: "Normal", value: "normal" },
          { title: "H3", value: "h3" },
          { title: "H4", value: "h4" },
        ],
        marks: {
          decorators: [
            { title: "Bold", value: "strong" },
            { title: "Italic", value: "em" },
          ],
        },
      },
      {
        type: "image",
        options: { hotspot: true },
      },
    ],
  }),
  defineField({
    name: `${name}_en`,
    title: `${title} (EN)`,
    type: "array",
    of: [
      {
        type: "block",
        styles: [
          { title: "Normal", value: "normal" },
          { title: "H3", value: "h3" },
          { title: "H4", value: "h4" },
        ],
        marks: {
          decorators: [
            { title: "Bold", value: "strong" },
            { title: "Italic", value: "em" },
          ],
        },
      },
      {
        type: "image",
        options: { hotspot: true },
      },
    ],
  }),
];
