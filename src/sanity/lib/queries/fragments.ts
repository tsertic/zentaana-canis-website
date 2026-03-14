export const dogReferenceFields = `
  _id,
  name,
  slug,
  mainImage,
  titles,
  gender
`;

export const dogCardFields = `
  _id,
  name,
  slug,
  registeredName,
  gender,
  breed,
  dateOfBirth,
  status,
  isBreeder,
  isFeatured,
  mainImage,
  titles,
  shortDescription_hr,
  shortDescription_en
`;

export const dogFullFields = `
  ...,
  sire->{ ${dogReferenceFields} },
  dam->{ ${dogReferenceFields} }
`;

export const litterCardFields = `
  _id,
  name_hr,
  name_en,
  slug,
  status,
  breed,
  dateOfBirth,
  expectedDate,
  puppyCount,
  isFeatured,
  mainImage,
  shortDescription_hr,
  shortDescription_en,
  sire->{ ${dogReferenceFields} },
  dam->{ ${dogReferenceFields} },
  "availableCount": count(puppies[status == "available"])
`;

export const litterFullFields = `
  ...,
  sire->{ ${dogReferenceFields} },
  dam->{ ${dogReferenceFields} },
  puppies[]{
    ...,
    dogReference->{ ${dogReferenceFields} }
  }
`;

export const newsCardFields = `
  _id,
  title_hr,
  title_en,
  slug,
  category,
  publishedAt,
  excerpt_hr,
  excerpt_en,
  mainImage,
  isFeatured
`;

export const newsFullFields = `
  ...,
  relatedDogs[]->{ ${dogReferenceFields} },
  relatedLitter->{ _id, name_hr, slug }
`;

export const galleryCardFields = `
  _id,
  title_hr,
  title_en,
  slug,
  category,
  coverImage,
  date,
  "imageCount": count(images)
`;
