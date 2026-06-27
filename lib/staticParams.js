import { cachedSanityFetch } from "./cachedSanity";
import { normalizeSlugPath } from "./servicePaths";

function parseServiceSlug(slug) {
  const normalized = normalizeSlugPath(slug);
  const parts = normalized.split("/").filter(Boolean);
  if (parts.length < 2) return null;
  const [category, ...rest] = parts;
  return { category, service: rest.join("/") };
}

export async function generateServiceParams() {
  const slugs = await cachedSanityFetch(
    "service-slugs",
    `*[_type == "service"].slug.current`
  );
  return (slugs ?? []).map(parseServiceSlug).filter(Boolean);
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

export async function generateBlogParams() {
  const slugs = await cachedSanityFetch(
    "blog-slugs",
    `*[_type == "blogPost"].slug.current`
  );
  return (slugs ?? []).map((slug) => ({ slug }));
}

export async function generateAboutMoreParams() {
  const slugs = await cachedSanityFetch(
    "about-more-slugs",
    `*[_type == "aboutMorePage"].slug.current`
  );
  return (slugs ?? []).map((topic) => ({ topic }));
}

export async function generateCityServiceParams() {
  const slugs = await cachedSanityFetch(
    "new-service-page-slugs",
    `*[_type == "newServicePage"].slug.current`
  );
  return (slugs ?? []).map((slug) => ({ "City-Service": slug }));
}
