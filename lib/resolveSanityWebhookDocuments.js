import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../sanity/env";

const DOCUMENT_QUERY = `*[_id in $ids]{
  _type,
  "slug": slug.current
}`;

const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

/**
 * Normalize Sanity webhook bodies into `{ _type, slug: { current } }` documents.
 * Supports:
 * - Projected document: `{ _type, slug }` or `{ _type, slug: { current } }`
 * - Batch: `[{ ... }, { ... }]`
 * - Transaction ids: `{ ids: { created, updated, deleted } }`
 */
export async function resolveSanityWebhookDocuments(body) {
  if (!body || typeof body !== "object") return [];

  if (body._type) {
    const doc = normalizeDocument(body);
    return doc ? [doc] : [];
  }

  if (Array.isArray(body)) {
    return body.map(normalizeDocument).filter(Boolean);
  }

  const ids = [
    ...(body.ids?.created ?? []),
    ...(body.ids?.updated ?? []),
    ...(body.ids?.deleted ?? []),
  ];

  if (ids.length > 0) {
    const docs = await serverClient.fetch(DOCUMENT_QUERY, { ids });
    return docs.map(normalizeDocument).filter(Boolean);
  }

  return [];
}

function normalizeDocument(doc) {
  if (!doc?._type) return null;

  const slugCurrent =
    typeof doc.slug === "string"
      ? doc.slug
      : doc.slug?.current ?? null;

  return {
    _type: doc._type,
    slug: slugCurrent ? { current: slugCurrent } : undefined,
  };
}
