import { cache } from "react";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/sanityImageUrl";

const SITE_URL = "https://www.powerelectricalservices.net";

export const BLOG_POST_QUERY = `*[_type == "blogPost" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    excerpt,
    content,
    keywords,
    image,
    date,
    schema,
    category->{
        _id,
        title,
        slug
    }
}`;

export const getBlogPostBySlug = cache(async (slug) => {
    if (!slug) return null;
    return client.fetch(BLOG_POST_QUERY, { slug });
});

// --- Blog index & /blog/location/[city] listing (paginated, category filter) ---

export const BLOG_LIST_PAGE_SIZE = 6;

export const BLOG_LIST_POST_FIELDS = `
  _id,
  title,
  slug,
  excerpt,
  keywords,
  image,
  date,
  category->{
    _id,
    title,
    slug
  }
`;

export const BLOG_LIST_COUNT_QUERY = `count(*[_type == "blogPost" && ($filterSlug == "" || category->slug.current == $filterSlug)])`;

export const BLOG_LIST_POSTS_PAGE_QUERY = `*[_type == "blogPost" && ($filterSlug == "" || category->slug.current == $filterSlug)] | order(date desc)[$start...$end] {
  ${BLOG_LIST_POST_FIELDS}
}`;

export const BLOG_CATEGORIES_QUERY = `*[_type == "blogCatagory"] | order(title asc) {
  _id,
  title,
  slug
}`;

/**
 * @param {string} basePath - `/blog` or `/blog/location/{city}`
 */
export function blogListHref(basePath, { page = 1, categorySlug = null } = {}) {
    const params = new URLSearchParams();
    if (categorySlug) params.set("category", categorySlug);
    if (page > 1) params.set("page", String(page));
    const q = params.toString();
    return q ? `${basePath}?${q}` : basePath;
}

export function excerptToMaxWords(text, maxWords = 20) {
    if (!text || typeof text !== "string") return "";
    const words = text.trim().split(/\s+/).filter(Boolean);
    if (words.length <= maxWords) return text.trim();
    return `${words.slice(0, maxWords).join(" ")}…`;
}

const LD_JSON_SCRIPT_OPEN = /^<script\s+type\s*=\s*["']application\/ld\+json["']\s*>/i;
const LD_JSON_SCRIPT_CLOSE = /<\/script>\s*$/i;

/** Parse Sanity `blogPost.schema` (JSON-LD JSON string). Returns null if empty or invalid. */
export function parseBlogPostSchema(schemaText) {
    if (schemaText == null || typeof schemaText !== "string") return null;
    let json = schemaText.trim();
    if (!json) return null;
    if (LD_JSON_SCRIPT_OPEN.test(json)) {
        json = json.replace(LD_JSON_SCRIPT_OPEN, "").trimStart();
    }
    if (LD_JSON_SCRIPT_CLOSE.test(json)) {
        json = json.replace(LD_JSON_SCRIPT_CLOSE, "").trimEnd();
    }
    json = json.trim();
    if (!json) return null;
    try {
        return JSON.parse(json);
    } catch {
        return null;
    }
}

function schemaImageToUrl(image) {
    if (!image) return null;
    if (typeof image === "string") return image;
    if (typeof image === "object" && typeof image.url === "string") return image.url;
    return null;
}

function pickArticleLikeNode(parsed) {
    if (!parsed || typeof parsed !== "object") return null;
    const candidates = parsed["@graph"] ?? (Array.isArray(parsed) ? parsed : [parsed]);
    for (const node of candidates) {
        if (!node || typeof node !== "object") continue;
        const t = node["@type"];
        const types = (Array.isArray(t) ? t : [t]).filter(Boolean);
        if (
            types.some((x) => x === "BlogPosting" || x === "Article" || x === "NewsArticle" || x === "TechArticle")
        ) {
            return node;
        }
    }
    if (parsed.headline || parsed.name) return parsed;
    return null;
}

/**
 * Pulls common SEO fields from JSON-LD (BlogPosting / Article) when present.
 * Used to align Next metadata with the same schema string from BLOG_POST_QUERY.
 */
export function extractSchemaMetadataFields(parsed) {
    const node = pickArticleLikeNode(parsed);
    if (!node) return {};

    const headline = typeof node.headline === "string" ? node.headline : null;
    const name = typeof node.name === "string" ? node.name : null;
    const description = typeof node.description === "string" ? node.description : null;
    const datePublished =
        typeof node.datePublished === "string"
            ? node.datePublished
            : typeof node.dateCreated === "string"
              ? node.dateCreated
              : null;
    let pageUrl =
        typeof node.url === "string"
            ? node.url
            : node.mainEntityOfPage && typeof node.mainEntityOfPage === "object"
              ? typeof node.mainEntityOfPage["@id"] === "string"
                  ? node.mainEntityOfPage["@id"]
                  : null
              : null;

    let imageUrl = schemaImageToUrl(node.image);
    if (!imageUrl && Array.isArray(node.image) && node.image.length) {
        imageUrl = schemaImageToUrl(node.image[0]);
    }

    let keywordsStr;
    if (typeof node.keywords === "string") {
        keywordsStr = node.keywords;
    } else if (Array.isArray(node.keywords)) {
        keywordsStr = node.keywords
            .map((k) => (typeof k === "string" ? k : k?.name))
            .filter(Boolean)
            .join(", ");
    }

    return {
        title: headline || name || null,
        description: description || null,
        imageUrl,
        datePublished,
        pageUrl,
        keywords: keywordsStr || null,
    };
}

function resolveAbsoluteUrl(maybeUrl, fallbackPath) {
    if (maybeUrl && typeof maybeUrl === "string") {
        if (maybeUrl.startsWith("http://") || maybeUrl.startsWith("https://")) return maybeUrl;
        if (maybeUrl.startsWith("/")) return `${SITE_URL}${maybeUrl}`;
    }
    return `${SITE_URL}${fallbackPath}`;
}

/** Safe string for `<script type="application/ld+json">` from `schema` field, or null. */
export function serializeBlogPostSchemaForLd(schemaText) {
    const parsed = parseBlogPostSchema(schemaText);
    if (parsed == null) return null;
    return JSON.stringify(parsed);
}

/**
 * Next.js metadata: merges JSON-LD schema fields (when valid) with post fallbacks.
 * `canonicalPath` is the path without origin (e.g. `/blog/my-post`).
 */
export function buildBlogPostMetadata(data, { canonicalPath } = {}) {
    if (!data?.title) return {};

    const slug = data.slug?.current;
    const path = canonicalPath ?? `/blog/${slug ?? ""}`;
    const parsed = parseBlogPostSchema(data.schema);
    const fromSchema = extractSchemaMetadataFields(parsed);
    
    const title = fromSchema.title || data.title;
    const description =
        (fromSchema.description && fromSchema.description.trim()) ||
        (data.excerpt?.trim() ? data.excerpt.trim() : undefined);

    const keywordSource =
        fromSchema.keywords ||
        (Array.isArray(data.keywords) && data.keywords.length ? data.keywords.join(", ") : undefined);

    const fallbackOg = data.image ? urlFor(data.image).width(1200).height(630).url() : null;
    const ogImage = fromSchema.imageUrl || fallbackOg;

    const publishedTime = fromSchema.datePublished || (data.date ? `${data.date}` : undefined);

    const canonical = resolveAbsoluteUrl(fromSchema.pageUrl, path);

    return {
        title,
        description,
        keywords: keywordSource,
        openGraph: {
            title,
            description,
            type: "article",
            publishedTime,
            url: canonical,
            ...(ogImage ? { images: [{ url: ogImage }] } : {}),
        },
        alternates: {
            canonical,
        },
    };
}
