import { defineType, defineField, defineArrayMember } from "sanity";
import { localeString } from "./helpers/localeString";

export default defineType({
  name: "gallery",
  title: "Galerija",
  type: "document",
  fields: [
    ...localeString("title", "Naziv albuma", { required: true }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title_hr", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategorija",
      type: "string",
      options: {
        list: [
          { title: "Izložbe", value: "shows" },
          { title: "Štenad", value: "puppies" },
          { title: "Svakodnevica", value: "everyday" },
          { title: "Trening", value: "training" },
          { title: "Ostalo", value: "other" },
        ],
        layout: "dropdown",
      },
      initialValue: "other",
    }),
    defineField({
      name: "coverImage",
      title: "Naslovna slika albuma",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "Slike",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "caption_hr",
              title: "Opis (HR)",
              type: "string",
            }),
            defineField({
              name: "caption_en",
              title: "Opis (EN)",
              type: "string",
            }),
          ],
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "date",
      title: "Datum",
      type: "date",
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
    }),
    defineField({
      name: "relatedLitter",
      title: "Povezano leglo",
      type: "reference",
      to: [{ type: "litter" }],
    }),
    defineField({
      name: "order",
      title: "Redoslijed prikaza",
      type: "number",
      initialValue: 0,
    }),
  ],

  preview: {
    select: {
      title: "title_hr",
      category: "category",
      date: "date",
      media: "coverImage",
      count: "images.length",
    },
    prepare({ title, category, date, media }) {
      const categoryMap: Record<string, string> = {
        shows: "🏆 Izložbe",
        puppies: "🐾 Štenad",
        everyday: "📸 Svakodnevica",
        training: "🎯 Trening",
        other: "📁 Ostalo",
      };
      const formattedDate = date
        ? new Date(date).toLocaleDateString("hr-HR")
        : "";
      return {
        title: title || "Bez naziva",
        subtitle: `${categoryMap[category] || category}${formattedDate ? ` — ${formattedDate}` : ""}`,
        media,
      };
    },
  },

  orderings: [
    {
      title: "Redoslijed",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Datum (najnovije)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});
