"use client";

import { PortableText, PortableTextComponents } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-neutral-600 leading-[1.85] mb-6 text-base">
        {children}
      </p>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-2xl font-bold text-primary-800 mt-10 mb-4 tracking-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-display text-xl font-semibold text-primary-700 mt-8 mb-3 tracking-tight">
        {children}
      </h4>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-neutral-800">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-neutral-700">{children}</em>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={
          value?.href?.startsWith("http") ? "noopener noreferrer" : undefined
        }
        className="text-primary-600 underline underline-offset-4 decoration-primary-300 hover:decoration-primary-600 transition-colors duration-300"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 ml-1 space-y-3">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 ml-1 space-y-3 list-none counter-reset-item">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-neutral-600 leading-[1.85]">
        <span className="mt-[0.65rem] w-1.5 h-1.5 rounded-full bg-accent-500 flex-shrink-0" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="flex items-start gap-3 text-neutral-600 leading-[1.85] counter-increment-item">
        <span className="mt-[0.15rem] font-display text-sm font-bold text-primary-400 flex-shrink-0 w-6 h-6 flex items-center justify-center border border-primary-200 rounded-full">
          <span className="counter-item" />
        </span>
        <span>{children}</span>
      </li>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-10">
          <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200">
            <Image
              src={urlFor(value).width(1000).url()}
              alt={value.alt || ""}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-neutral-400 font-accent italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

type Props = {
  value: PortableTextBlock[] | null | undefined;
  className?: string;
};

export default function RichText({ value, className = "" }: Props) {
  if (!value) return null;

  return (
    <div className={`rich-text ${className}`}>
      <PortableText value={value} components={components} />
    </div>
  );
}
