import { cachedSanityFetch } from "../../lib/cachedSanity";

export const SERVICE_QUERY = `*[_type == "service" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  titleHero,
  heroDescription,
  imagePrimary { asset->{ _id, url }, alt },
  imageSecond { asset->{ _id, url }, alt },
  titlePrimary,
  descriptionPrimary,
  bookNowText,
  bookNowSubtext,
  titleSecond,
  descriptionSecond,
  titleThird,
  descriptionThird,
  thirdItems[]->{ _id, title, content },
  faqItems[]->{ _id, title, content },
  schema,
  relatedServices[]->{ _id, title, slug, imagePrimary { asset->{ _id, url } },bookNowText,bookNowSubtext },
  closingCTATitle,
  closingCTASubtext
}`;

export function getServiceBySlug(slug) {
  if (!slug) return null;
  return cachedSanityFetch(`service-${slug}`, SERVICE_QUERY, { slug });
}
