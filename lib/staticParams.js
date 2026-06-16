import { cachedSanityFetch } from "./cachedSanity";
import { normalizeSlugPath } from "./servicePaths";

function parseServiceSlug(slug) {
  const normalized = normalizeSlugPath(slug);
  const parts = normalized.split("/").filter(Boolean);
  if (parts.length < 2) return null;
  const [category, ...rest] = parts;
  return { category, service: rest.join("/") };
}

export async function getCitySlugs() {
  const rows = await cachedSanityFetch(
    "city-slugs",
    `*[_type == "newServices"][0].newServices[]->{ "slug": slug.current }`
  );
  return (rows ?? []).map((row) => row?.slug).filter(Boolean);
}

export async function generateCityParams() {
  const slugs = await getCitySlugs();
  return slugs.map((city) => ({ city }));
}

export async function generateCapitalizedCityParams() {
  const slugs = await getCitySlugs();
  return slugs.map((City) => ({ City }));
}

export async function generateServiceParams() {
  const slugs = await cachedSanityFetch(
    "service-slugs",
    `*[_type == "service"].slug.current`
  );
  return (slugs ?? []).map(parseServiceSlug).filter(Boolean);
}

export async function generateServiceCityParams() {
  const [services, cities] = await Promise.all([
    generateServiceParams(),
    getCitySlugs(),
  ]);
  const params = [];
  for (const { category, service } of services) {
    for (const city of cities) {
      params.push({ category, service, city });
    }
  }
  return params;
}

export async function generateCategoryParams() {
  const slugs = await cachedSanityFetch(
    "category-slugs",
    `*[_type == "serviceCategory"].slug.current`
  );
  return (slugs ?? []).map((slug) => ({
    category: normalizeSlugPath(slug),
  }));
}

export async function generateCategoryCityParams() {
  const [categories, cities] = await Promise.all([
    generateCategoryParams(),
    getCitySlugs(),
  ]);
  const params = [];
  for (const { category } of categories) {
    for (const city of cities) {
      params.push({ category, city });
    }
  }
  return params;
}

export async function generateBlogParams() {
  const slugs = await cachedSanityFetch(
    "blog-slugs",
    `*[_type == "blogPost"].slug.current`
  );
  return (slugs ?? []).map((slug) => ({ slug }));
}

export async function generateBlogCityParams() {
  const [posts, cities] = await Promise.all([
    generateBlogParams(),
    getCitySlugs(),
  ]);
  const params = [];
  for (const { slug } of posts) {
    for (const city of cities) {
      params.push({ slug, city });
    }
  }
  return params;
}

export async function generateAboutMoreParams() {
  const slugs = await cachedSanityFetch(
    "about-more-slugs",
    `*[_type == "aboutMorePage"].slug.current`
  );
  return (slugs ?? []).map((topic) => ({ topic }));
}

export async function generateAboutMoreCityParams() {
  const [topics, cities] = await Promise.all([
    generateAboutMoreParams(),
    getCitySlugs(),
  ]);
  const params = [];
  for (const { topic } of topics) {
    for (const city of cities) {
      params.push({ topic, city });
    }
  }
  return params;
}

export async function generateCityServiceParams() {
  const slugs = await cachedSanityFetch(
    "new-service-page-slugs",
    `*[_type == "newServicePage"].slug.current`
  );
  return (slugs ?? []).map((slug) => ({ "City-Service": slug }));
}
