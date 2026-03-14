import { defineType, defineField, defineArrayMember } from "sanity";
import { localeString } from "./helpers/localeString";
import { localeBlock } from "./helpers/localeBlock";

export default defineType({
  name: "dog",
  title: "Psi",
  type: "document",
  groups: [
    { name: "basic", title: "Osnovni podaci", default: true },
    { name: "media", title: "Slike" },
    { name: "health", title: "Zdravlje" },
    { name: "awards", title: "Nagrade" },
    { name: "description", title: "Opis" },
    { name: "pedigree", title: "Rodovnik" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Ime psa",
      type: "string",
      validation: (rule) => rule.required(),
      group: "basic",
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
      group: "basic",
    }),
    defineField({
      name: "registeredName",
      title: "Registrirano ime",
      type: "string",
      group: "basic",
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
      validation: (rule) => rule.required(),
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
      name: "color",
      title: "Boja",
      type: "string",
      group: "basic",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Aktivan", value: "active" },
          { title: "Umirovljen", value: "retired" },
          { title: "U memoriam", value: "memorial" },
        ],
      },
      initialValue: "active",
      group: "basic",
    }),
    defineField({
      name: "isBreeder",
      title: "Rasplodni pas",
      type: "boolean",
      initialValue: false,
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
      name: "mainImage",
      title: "Glavna slika",
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
          ],
        }),
      ],
      group: "media",
    }),

    defineField({
      name: "healthTests",
      title: "Zdravstveni testovi",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "testName",
              title: "Naziv testa",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "result",
              title: "Rezultat",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "date",
              title: "Datum",
              type: "date",
            }),
            defineField({
              name: "certificate",
              title: "Certifikat (PDF/slika)",
              type: "file",
            }),
          ],
          preview: {
            select: { title: "testName", subtitle: "result" },
          },
        }),
      ],
      group: "health",
    }),

    defineField({
      name: "awards",
      title: "Nagrade i titule",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Titula / Nagrada",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "show",
              title: "Izložba / Natjecanje",
              type: "string",
            }),
            defineField({
              name: "judge",
              title: "Sudac",
              type: "string",
            }),
            defineField({
              name: "date",
              title: "Datum",
              type: "date",
            }),
            defineField({
              name: "location",
              title: "Lokacija",
              type: "string",
            }),
            defineField({
              name: "photo",
              title: "Fotografija",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "show", date: "date" },
            prepare({ title, subtitle, date }) {
              return {
                title,
                subtitle: `${subtitle || ""}${date ? ` — ${date}` : ""}`,
              };
            },
          },
        }),
      ],
      group: "awards",
    }),
    defineField({
      name: "titles",
      title: "Titule (kratice za prikaz)",
      type: "string",
      description: "Npr. CH, JCH, BOB, BIS...",
      group: "awards",
    }),

    ...localeBlock("bio", "Biografija / Opis"),
    ...localeString("shortDescription", "Kratki opis", { rows: 3 }),

    defineField({
      name: "sire",
      title: "Otac",
      type: "reference",
      to: [{ type: "dog" }],
      group: "pedigree",
    }),
    defineField({
      name: "dam",
      title: "Majka",
      type: "reference",
      to: [{ type: "dog" }],
      group: "pedigree",
    }),
    defineField({
      name: "externalPedigree",
      title: "Vanjski rodovnik (ako roditelji nisu u sustavu)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "relation",
              title: "Odnos",
              type: "string",
              options: {
                list: [
                  { title: "Otac", value: "sire" },
                  { title: "Majka", value: "dam" },
                  { title: "Djed (po ocu)", value: "sire_sire" },
                  { title: "Baka (po ocu)", value: "sire_dam" },
                  { title: "Djed (po majci)", value: "dam_sire" },
                  { title: "Baka (po majci)", value: "dam_dam" },
                ],
              },
            }),
            defineField({
              name: "name",
              title: "Ime",
              type: "string",
            }),
            defineField({
              name: "titles",
              title: "Titule",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "relation" },
          },
        }),
      ],
      group: "pedigree",
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "titles",
      media: "mainImage",
      gender: "gender",
      status: "status",
    },
    prepare({ title, subtitle, media, gender, status }) {
      const emoji = gender === "male" ? "♂" : "♀";
      const statusLabel =
        status === "retired"
          ? " (umirovljen)"
          : status === "memorial"
            ? " ✝"
            : "";
      return {
        title: `${emoji} ${title}${statusLabel}`,
        subtitle: subtitle || "",
        media,
      };
    },
  },

  orderings: [
    {
      title: "Ime",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Datum rođenja",
      name: "dobDesc",
      by: [{ field: "dateOfBirth", direction: "desc" }],
    },
  ],
});
