import { cache } from "react";
import { client } from "../../sanity/lib/client";

export const SERVICE_QUERY = `*[_type == "service" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  titleHero,
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
  relatedServices[]->{ _id, title, slug, imagePrimary { asset->{ _id, url } },bookNowText,bookNowSubtext }
}`;

export const getServiceBySlug = cache(async (slug) => {
    if (!slug) return null;
    return client.fetch(SERVICE_QUERY, { slug });
});
