import { defineType, defineField, defineArrayMember } from "sanity";
import { localeString } from "./helpers/localeString";
import { localeBlock } from "./helpers/localeBlock";

export default defineType({
  name: "litter",
  title: "Legla",
  type: "document",
  groups: [
    { name: "basic", title: "Osnovni podaci", default: true },
    { name: "puppies", title: "Štenad" },
    { name: "media", title: "Slike" },
    { name: "description", title: "Opis" },
  ],
  fields: [
    ...localeString("name", "Naziv legla", { required: true }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "name_hr", maxLength: 96 },
      validation: (rule) => rule.required(),
      group: "basic",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Planirano", value: "planned" },
          { title: "Očekujemo", value: "expected" },
          { title: "Rođeni", value: "born" },
          { title: "Dostupni", value: "available" },
          { title: "Rezervirani", value: "reserved" },
          { title: "Zatvoreno", value: "closed" },
        ],
        layout: "dropdown",
      },
      initialValue: "planned",
      validation: (rule) => rule.required(),
      group: "basic",
    }),
    defineField({
      name: "sire",
      title: "Otac",
      type: "reference",
      to: [{ type: "dog" }],
      group: "basic",
    }),
    defineField({
      name: "dam",
      title: "Majka",
      type: "reference",
      to: [{ type: "dog" }],
      group: "basic",
    }),
    defineField({
      name: "breed",
      title: "Pasmina",
      type: "string",
      group: "basic",
    }),
    defineField({
      name: "dateOfBirth",
      title: "Datum rođenja",
      type: "date",
      group: "basic",
    }),
    defineField({
      name: "expectedDate",
      title: "Očekivani datum",
      type: "date",
      group: "basic",
    }),
    defineField({
      name: "puppyCount",
      title: "Broj štenaca",
      type: "number",
      group: "basic",
    }),
    defineField({
      name: "isFeatured",
      title: "Istaknut na početnoj",
      type: "boolean",
      initialValue: false,
      group: "basic",
    }),

    defineField({
      name: "puppies",
      title: "Štenad",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Ime",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "gender",
              title: "Spol",
              type: "string",
              options: {
                list: [
                  { title: "Mužjak", value: "male" },
                  { title: "Ženka", value: "female" },
                ],
                layout: "radio",
              },
            }),
            defineField({
              name: "color",
              title: "Boja",
              type: "string",
            }),
            defineField({
              name: "status",
              title: "Status",
              type: "string",
              options: {
                list: [
                  { title: "Dostupan", value: "available" },
                  { title: "Rezerviran", value: "reserved" },
                  { title: "Prodan", value: "sold" },
                  { title: "Ostaje u uzgoju", value: "keeping" },
                ],
              },
              initialValue: "available",
            }),
            defineField({
              name: "photo",
              title: "Fotografija",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "dogReference",
              title: "Profil psa (ako ostaje u uzgoju)",
              type: "reference",
              to: [{ type: "dog" }],
            }),
          ],
          preview: {
            select: {
              title: "name",
              gender: "gender",
              status: "status",
              media: "photo",
            },
            prepare({ title, gender, status, media }) {
              const emoji = gender === "male" ? "♂" : "♀";
              const statusMap: Record<string, string> = {
                available: "🟢 Dostupan",
                reserved: "🟡 Rezerviran",
                sold: "🔴 Prodan",
                keeping: "🏠 Ostaje",
              };
              return {
                title: `${emoji} ${title}`,
                subtitle: statusMap[status] || status,
                media,
              };
            },
          },
        }),
      ],
      group: "puppies",
    }),

    defineField({
      name: "mainImage",
      title: "Glavna slika legla",
      type: "image",
      options: { hotspot: true },
      group: "media",
    }),
    defineField({
      name: "gallery",
      title: "Galerija slika",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "caption",
              title: "Opis slike",
              type: "string",
            }),
            defineField({
              name: "week",
              title: "Tjedan starosti",
              type: "number",
            }),
          ],
        }),
      ],
      group: "media",
    }),

    ...localeBlock("description", "Opis legla"),
    ...localeString("shortDescription", "Kratki opis", { rows: 3 }),
  ],

  preview: {
    select: {
      title: "name_hr",
      sire: "sire.name",
      dam: "dam.name",
      status: "status",
      media: "mainImage",
      date: "dateOfBirth",
    },
    prepare({ title, sire, dam, status, media, date }) {
      const statusMap: Record<string, string> = {
        planned: "📋 Planirano",
        expected: "🤰 Očekujemo",
        born: "🐾 Rođeni",
        available: "🟢 Dostupni",
        reserved: "🟡 Rezervirani",
        closed: "🔒 Zatvoreno",
      };
      const parents = sire && dam ? `${sire} × ${dam}` : "";
      return {
        title: title || parents || "Novo leglo",
        subtitle: `${statusMap[status] || status}${parents ? ` — ${parents}` : ""}${date ? ` — ${date}` : ""}`,
        media,
      };
    },
  },

  orderings: [
    {
      title: "Datum rođenja (najnovije)",
      name: "dobDesc",
      by: [{ field: "dateOfBirth", direction: "desc" }],
    },
    {
      title: "Status",
      name: "statusAsc",
      by: [{ field: "status", direction: "asc" }],
    },
  ],
});
