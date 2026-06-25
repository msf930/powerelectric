import { revalidatePath, revalidateTag } from "next/cache";
import { getSanityRevalidationTargets } from "../../../lib/sanityRevalidate";
import { resolveSanityWebhookDocuments } from "../../../lib/resolveSanityWebhookDocuments";

function isAuthorized(request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) return false;

  const authHeader = request.headers.get("authorization");
  if (authHeader === `Bearer ${secret}`) return true;

  const querySecret = request.nextUrl.searchParams.get("secret");
  return querySecret === secret;
}

function applyRevalidation(tags, paths) {
  for (const tag of tags) {
    revalidateTag(tag);
  }

  for (const path of paths) {
    if (path === "/") {
      revalidatePath(path, "layout");
    } else {
      revalidatePath(path);
    }
  }

  if (tags.includes("sitemap-data")) {
    revalidatePath("/sitemap.xml");
    revalidatePath("/robots.txt");
  }
}

export async function POST(request) {
  if (!isAuthorized(request)) {
    return Response.json({ message: "Invalid secret" }, { status: 401 });
  }

  let body = {};
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const manualPath = request.nextUrl.searchParams.get("path");
  const manualTag = request.nextUrl.searchParams.get("tag");

  const documents = await resolveSanityWebhookDocuments(body);
  const tags = new Set();
  const paths = new Set();
  const types = new Set();

  for (const document of documents) {
    types.add(document._type);
    const targets = getSanityRevalidationTargets(document);
    targets.tags.forEach((tag) => tags.add(tag));
    targets.paths.forEach((path) => paths.add(path));
  }

  if (manualTag) tags.add(manualTag);
  if (manualPath) paths.add(manualPath);

  const uniqueTags = [...tags];
  const uniquePaths = [...paths];

  if (uniqueTags.length === 0 && uniquePaths.length === 0) {
    return Response.json(
      {
        revalidated: false,
        message:
          "No documents resolved. Use a Sanity projection with _type and slug, or send ids.created/updated.",
      },
      { status: 400 }
    );
  }

  applyRevalidation(uniqueTags, uniquePaths);

  return Response.json({
    revalidated: true,
    documentCount: documents.length,
    documentTypes: [...types],
    tags: uniqueTags,
    paths: uniquePaths,
  });
}
