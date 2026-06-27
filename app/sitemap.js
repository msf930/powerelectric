import { cachedSanityFetch } from "../lib/cachedSanity";
import { normalizeSlugPath } from "../lib/servicePaths";

const SITE_URL = "https://www.powerelectricalservices.net";

export const revalidate = false;

const STATIC_PATHS = [
  { path: "/", priority: 1.0 },
  { path: "/about", priority: 0.8 },
  { path: "/contact", priority: 0.8 },
  { path: "/faq", priority: 0.7 },
  { path: "/financing", priority: 0.8 },
  { path: "/membership", priority: 0.8 },
  { path: "/contractor", priority: 0.8 },
  { path: "/real-estate-inspection-repairs-denver", priority: 0.8 },
  { path: "/holidayLighting", priority: 0.8 },
  { path: "/blog", priority: 0.8 },
  { path: "/service-areas", priority: 0.7 },
  { path: "/instant-quote", priority: 0.7 },
];

const SITEMAP_DATA_QUERY = `{
  "categories": *[_type == "serviceCategory"]{
    "slug": slug.current,
    "_updatedAt": _updatedAt
  },
  "services": *[_type == "service"]{
    "slug": slug.current,
    "_updatedAt": _updatedAt
  },
  "newServicePages": *[_type == "newServicePage"]{
    "slug": slug.current,
    "_updatedAt": _updatedAt
  },
  "blogPosts": *[_type == "blogPost"]{
    "slug": slug.current,
    "date": date,
    "_updatedAt": _updatedAt
  },
  "aboutMorePages": *[_type == "aboutMorePage"]{
    "slug": slug.current,
    "_updatedAt": _updatedAt
  }
}`;

function toEntry(path, lastModified, priority = 0.7, changeFrequency = "weekly") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return {
    url: `${SITE_URL}${normalized === "//" ? "/" : normalized}`,
    lastModified: lastModified ? new Date(lastModified) : new Date(),
    changeFrequency,
    priority,
  };
}

function parseServiceSlug(slug) {
  const normalized = (slug || "").replace(/^\/+/, "");
  const parts = normalized.split("/").filter(Boolean);
  if (parts.length < 2) return null;
  const [category, ...rest] = parts;
  return { category, service: rest.join("/") };
}

export default async function sitemap() {
  let data = {
    categories: [],
    services: [],
    newServicePages: [],
    blogPosts: [],
    aboutMorePages: [],
  };

  try {
    data = await cachedSanityFetch("sitemap-data", SITEMAP_DATA_QUERY);
  } catch {
    // Fall back to static routes if Sanity is unavailable at build time.
  }

  const entries = [];
  const seen = new Set();

  const add = (path, lastModified, priority, changeFrequency) => {
    const normalized = path.startsWith("/") ? path : `/${path}`;
    if (seen.has(normalized)) return;
    seen.add(normalized);
    entries.push(toEntry(normalized, lastModified, priority, changeFrequency));
  };

  for (const { path, priority } of STATIC_PATHS) {
    add(path, null, priority);
  }

  for (const category of data.categories || []) {
    if (!category?.slug) continue;
    const categorySlug = normalizeSlugPath(category.slug);
    add(`/service/${categorySlug}`, category._updatedAt, 0.75);
  }

  for (const service of data.services || []) {
    if (!service?.slug) continue;
    const parsed = parseServiceSlug(service.slug);
    if (!parsed) continue;

    const { category, service: serviceSlug } = parsed;
    add(`/service/${category}/${serviceSlug}`, service._updatedAt, 0.8);
  }

  for (const page of data.newServicePages || []) {
    if (page?.slug) {
      add(`/${page.slug}`, page._updatedAt, 0.75);
    }
  }

  for (const post of data.blogPosts || []) {
    if (!post?.slug) continue;
    const lastMod = post.date || post._updatedAt;
    add(`/blog/${post.slug}`, lastMod, 0.7, "monthly");
  }

  for (const page of data.aboutMorePages || []) {
    if (!page?.slug) continue;
    add(`/about/more/${page.slug}`, page._updatedAt, 0.5);
  }

  return entries;
}
