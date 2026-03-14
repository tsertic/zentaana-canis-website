import { defineType, defineField, defineArrayMember } from "sanity";
import { localeString } from "./helpers/localeString";
import { localeBlock } from "./helpers/localeBlock";

export default defineType({
  name: "siteSettings",
  title: "Postavke stranice",
  type: "document",
  groups: [
    { name: "general", title: "Općenito", default: true },
    { name: "about", title: "O nama" },
    { name: "contact", title: "Kontakt" },
    { name: "social", title: "Društvene mreže" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    ...localeString("siteTitle", "Naziv stranice", { required: true }),
    ...localeString("slogan", "Slogan"),
    ...localeString("heroSubtitle", "Podnaslov na početnoj"),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "general",
    }),
    defineField({
      name: "logoDark",
      title: "Logo (tamna verzija)",
      type: "image",
      group: "general",
    }),

    ...localeBlock("aboutText", "Tekst o nama"),
    ...localeString("aboutShort", "Kratki opis (za footer i sl.)", { rows: 3 }),
    defineField({
      name: "aboutImages",
      title: "Slike (O nama stranica)",
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
      group: "about",
    }),
    defineField({
      name: "fciNumber",
      title: "FCI broj",
      type: "string",
      initialValue: "19/25",
      group: "about",
    }),
    defineField({
      name: "foundedYear",
      title: "Godina osnivanja",
      type: "number",
      group: "about",
    }),
    defineField({
      name: "breeds",
      title: "Pasmine koje uzgajamo",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            ...localeString("name", "Naziv pasmine", { required: true }),
            defineField({
              name: "fciGroup",
              title: "FCI grupa",
              type: "string",
            }),
            defineField({
              name: "image",
              title: "Slika",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: "name_hr", subtitle: "fciGroup", media: "image" },
          },
        }),
      ],
      group: "about",
    }),

    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.email(),
      group: "contact",
    }),
    defineField({
      name: "phone",
      title: "Telefon",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "address",
      title: "Adresa",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "city",
      title: "Grad",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "country",
      title: "Država",
      type: "string",
      initialValue: "Hrvatska",
      group: "contact",
    }),
    defineField({
      name: "mapCoordinates",
      title: "Koordinate za mapu",
      type: "object",
      fields: [
        defineField({ name: "lat", title: "Latitude", type: "number" }),
        defineField({ name: "lng", title: "Longitude", type: "number" }),
      ],
      group: "contact",
    }),

    defineField({
      name: "instagram",
      title: "Instagram URL",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "instagramPosts",
      title: "Instagram objave (ručno)",
      type: "array",
      description:
        "Dodajte screenshot/slike Instagram objava za prikaz na stranici",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Slika",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "Link na Instagram objavu",
              type: "url",
            }),
            defineField({
              name: "caption",
              title: "Opis",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "caption", media: "image" },
            prepare({ title, media }) {
              return {
                title: title || "Instagram objava",
                media,
              };
            },
          },
        }),
      ],
      group: "social",
    }),
    defineField({
      name: "instagramHandle",
      title: "Instagram handle",
      type: "string",
      description: "Bez @, npr. zentaanacanis",
      group: "social",
    }),
    defineField({
      name: "facebook",
      title: "Facebook URL",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "youtube",
      title: "YouTube URL",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "tiktok",
      title: "TikTok URL",
      type: "url",
      group: "social",
    }),

    ...localeString("seoTitle", "SEO naslov"),
    ...localeString("seoDescription", "SEO opis", { rows: 3 }),
    defineField({
      name: "ogImage",
      title: "OG slika (za dijeljenje)",
      type: "image",
      group: "seo",
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Postavke stranice",
        subtitle: "Zentaana Canis",
      };
    },
  },
});
