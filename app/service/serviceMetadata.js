import { parseBlogPostSchema } from "../blog/blogPostQueries";
import { urlFor } from "../../sanity/sanityImageUrl";

const SITE_URL = "https://www.powerelectricalservices.net";

function schemaImageToUrl(image) {
    if (!image) return null;
    if (typeof image === "string") return image;
    if (typeof image === "object" && typeof image.url === "string") return image.url;
    return null;
}

function pickServiceLikeNode(parsed) {
    if (!parsed || typeof parsed !== "object") return null;
    const candidates = parsed["@graph"] ?? (Array.isArray(parsed) ? parsed : [parsed]);
    const wanted = new Set([
        "Service",
        "WebPage",
        "LocalBusiness",
        "ProfessionalService",
        "Product",
        "BlogPosting",
        "Article",
        "FAQPage",
    ]);
    for (const node of candidates) {
        if (!node || typeof node !== "object") continue;
        const t = node["@type"];
        const types = (Array.isArray(t) ? t : [t]).filter(Boolean);
        if (types.some((x) => wanted.has(x))) return node;
    }
    if (parsed.name || parsed.headline) return parsed;
    return null;
}

export function extractServiceSchemaMetadataFields(parsed) {
    const node = pickServiceLikeNode(parsed);
    if (!node) return {};

    const headline = typeof node.headline === "string" ? node.headline : null;
    const name = typeof node.name === "string" ? node.name : null;
    const description = typeof node.description === "string" ? node.description : null;
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

    return {
        title: headline || name || null,
        description: description || null,
        imageUrl,
        pageUrl,
    };
}

function resolveAbsoluteUrl(maybeUrl, fallbackPath) {
    if (maybeUrl && typeof maybeUrl === "string") {
        if (maybeUrl.startsWith("http://") || maybeUrl.startsWith("https://")) return maybeUrl;
        if (maybeUrl.startsWith("/")) return `${SITE_URL}${maybeUrl}`;
    }
    return `${SITE_URL}${fallbackPath}`;
}

/**
 * Next.js metadata from service `schema` after parseBlogPostSchema strips script wrappers.
 */
export function buildServicePageMetadata(data, { canonicalPath, cityDisplayName = null } = {}) {
    if (!data) return {};

    const parsed = parseBlogPostSchema(data.schema);
    const fromSchema = extractServiceSchemaMetadataFields(parsed);

    const citySuffix = cityDisplayName ? ` in ${cityDisplayName}` : "";
    const fallbackTitle = `${data.titleHero || data.title || "Service"}${citySuffix}`.trim();

    const title = (fromSchema.title && fromSchema.title.trim()) || fallbackTitle;

    const description =
        (fromSchema.description && fromSchema.description.trim()) ||
        (typeof data.bookNowSubtext === "string" && data.bookNowSubtext.trim()
            ? data.bookNowSubtext.trim()
            : undefined);

    const fallbackOg = data.imagePrimary ? urlFor(data.imagePrimary).width(1200).height(630).url() : null;
    const ogImage = fromSchema.imageUrl || fallbackOg;

    const canonical = resolveAbsoluteUrl(fromSchema.pageUrl, canonicalPath);

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "website",
            url: canonical,
            ...(ogImage ? { images: [{ url: ogImage }] } : {}),
        },
        alternates: {
            canonical,
        },
    };
}
