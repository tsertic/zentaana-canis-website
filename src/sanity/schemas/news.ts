import { defineType, defineField, defineArrayMember } from "sanity";
import { localeString } from "./helpers/localeString";
import { localeBlock } from "./helpers/localeBlock";

export default defineType({
  name: "news",
  title: "Novosti",
  type: "document",
  groups: [
    { name: "content", title: "Sadržaj", default: true },
    { name: "media", title: "Slike" },
    { name: "meta", title: "Meta" },
  ],
  fields: [
    ...localeString("title", "Naslov", { required: true }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title_hr", maxLength: 96 },
      validation: (rule) => rule.required(),
      group: "content",
    }),
    defineField({
      name: "category",
      title: "Kategorija",
      type: "string",
      options: {
        list: [
          { title: "Izložbe", value: "shows" },
          { title: "Legla", value: "litters" },
          { title: "Rezultati", value: "results" },
          { title: "Zdravlje", value: "health" },
          { title: "Općenito", value: "general" },
        ],
        layout: "dropdown",
      },
      initialValue: "general",
      validation: (rule) => rule.required(),
      group: "content",
    }),
    defineField({
      name: "publishedAt",
      title: "Datum objave",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
      group: "content",
    }),
    ...localeString("excerpt", "Kratki opis", { rows: 3 }),
    ...localeBlock("body", "Tekst"),

    defineField({
      name: "mainImage",
      title: "Glavna slika",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt tekst",
          type: "string",
        }),
      ],
      group: "media",
    }),
    defineField({
      name: "gallery",
      title: "Dodatne slike",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "caption",
              title: "Opis",
              type: "string",
            }),
          ],
        }),
      ],
      group: "media",
    }),

    defineField({
      name: "relatedDogs",
      title: "Povezani psi",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "dog" }],
        }),
      ],
      group: "meta",
    }),
    defineField({
      name: "relatedLitter",
      title: "Povezano leglo",
      type: "reference",
      to: [{ type: "litter" }],
      group: "meta",
    }),
    defineField({
      name: "isFeatured",
      title: "Istaknut na početnoj",
      type: "boolean",
      initialValue: false,
      group: "meta",
    }),
  ],

  preview: {
    select: {
      title: "title_hr",
      category: "category",
      date: "publishedAt",
      media: "mainImage",
      featured: "isFeatured",
    },
    prepare({ title, category, date, media, featured }) {
      const categoryMap: Record<string, string> = {
        shows: "🏆 Izložbe",
        litters: "🐾 Legla",
        results: "📊 Rezultati",
        health: "🏥 Zdravlje",
        general: "📰 Općenito",
      };
      const formattedDate = date
        ? new Date(date).toLocaleDateString("hr-HR")
        : "";
      return {
        title: `${featured ? "⭐ " : ""}${title || "Bez naslova"}`,
        subtitle: `${categoryMap[category] || category} — ${formattedDate}`,
        media,
      };
    },
  },

  orderings: [
    {
      title: "Datum objave (najnovije)",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Kategorija",
      name: "categoryAsc",
      by: [{ field: "category", direction: "asc" }],
    },
  ],
});
