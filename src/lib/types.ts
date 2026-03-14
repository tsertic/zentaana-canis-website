import { PortableTextBlock } from "@portabletext/types";

export type SanityImage = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  caption?: string;
  caption_hr?: string;
  caption_en?: string;
  alt?: string;
  week?: number;
};

export type Dog = {
  _id: string;
  _createdAt: string;
  name: string;
  slug: { current: string };
  registeredName?: string;
  gender: "male" | "female";
  breed?: string;
  dateOfBirth?: string;
  color?: string;
  status: "active" | "retired" | "memorial";
  isBreeder: boolean;
  isFeatured: boolean;
  mainImage?: SanityImage;
  gallery?: SanityImage[];
  healthTests?: HealthTest[];
  awards?: Award[];
  titles?: string;
  bio_hr?: PortableTextBlock[];
  bio_en?: PortableTextBlock[];
  shortDescription_hr?: string;
  shortDescription_en?: string;
  sire?: DogReference;
  dam?: DogReference;
  externalPedigree?: ExternalPedigreeEntry[];
};

export type DogReference = {
  _id: string;
  name: string;
  slug: { current: string };
  mainImage?: SanityImage;
  titles?: string;
  gender: "male" | "female";
};

export type HealthTest = {
  _key: string;
  testName: string;
  result: string;
  date?: string;
  certificate?: { asset: { _ref: string } };
};

export type Award = {
  _key: string;
  title: string;
  show?: string;
  judge?: string;
  date?: string;
  location?: string;
  photo?: SanityImage;
};

export type ExternalPedigreeEntry = {
  _key: string;
  relation: string;
  name: string;
  titles?: string;
};

export type Puppy = {
  _key: string;
  name: string;
  gender: "male" | "female";
  color?: string;
  status: "available" | "reserved" | "sold" | "keeping";
  photo?: SanityImage;
  dogReference?: DogReference;
};

export type Litter = {
  _id: string;
  _createdAt: string;
  name_hr: string;
  name_en?: string;
  slug: { current: string };
  status: "planned" | "expected" | "born" | "available" | "reserved" | "closed";
  sire?: DogReference;
  dam?: DogReference;
  breed?: string;
  dateOfBirth?: string;
  expectedDate?: string;
  puppyCount?: number;
  isFeatured: boolean;
  puppies?: Puppy[];
  mainImage?: SanityImage;
  gallery?: SanityImage[];
  description_hr?: PortableTextBlock[];
  description_en?: PortableTextBlock[];
  shortDescription_hr?: string;
  shortDescription_en?: string;
};

export type News = {
  _id: string;
  _createdAt: string;
  title_hr: string;
  title_en?: string;
  slug: { current: string };
  category: "shows" | "litters" | "results" | "health" | "general";
  publishedAt: string;
  excerpt_hr?: string;
  excerpt_en?: string;
  body_hr?: PortableTextBlock[];
  body_en?: PortableTextBlock[];
  mainImage?: SanityImage;
  gallery?: SanityImage[];
  relatedDogs?: DogReference[];
  relatedLitter?: { _id: string; name_hr: string; slug: { current: string } };
  isFeatured: boolean;
};

export type GalleryAlbum = {
  _id: string;
  title_hr: string;
  title_en?: string;
  slug: { current: string };
  category: "shows" | "puppies" | "everyday" | "training" | "other";
  coverImage: SanityImage;
  images: SanityImage[];
  date?: string;
  order: number;
};

export type SiteSettings = {
  siteTitle_hr: string;
  siteTitle_en?: string;
  slogan_hr?: string;
  slogan_en?: string;
  heroSubtitle_hr?: string;
  heroSubtitle_en?: string;
  logo?: SanityImage;
  logoDark?: SanityImage;
  aboutText_hr?: PortableTextBlock[];
  aboutText_en?: PortableTextBlock[];
  aboutShort_hr?: string;
  aboutShort_en?: string;
  aboutImages?: SanityImage[];
  fciNumber?: string;
  foundedYear?: number;
  breeds?: {
    name_hr: string;
    name_en?: string;
    fciGroup?: string;
    image?: SanityImage;
  }[];
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  mapCoordinates?: { lat: number; lng: number };
  instagram?: string;
  instagramHandle?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
  seoTitle_hr?: string;
  seoTitle_en?: string;
  seoDescription_hr?: string;
  seoDescription_en?: string;
  ogImage?: SanityImage;
  instagramPosts?: {
    _key: string;
    image: SanityImage;
    url?: string;
    caption?: string;
  }[];
};

export type Locale = "hr" | "en";
