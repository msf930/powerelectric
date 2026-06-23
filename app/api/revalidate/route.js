import { revalidatePath, revalidateTag } from "next/cache";
import { getSanityRevalidationTargets } from "../../../lib/sanityRevalidate";

function isAuthorized(request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) return false;

  const authHeader = request.headers.get("authorization");
  if (authHeader === `Bearer ${secret}`) return true;

  const querySecret = request.nextUrl.searchParams.get("secret");
  return querySecret === secret;
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

  const { tags, paths } = getSanityRevalidationTargets(body);

  if (manualTag) tags.push(manualTag);
  if (manualPath) paths.push(manualPath);

  const uniqueTags = [...new Set(tags)];
  const uniquePaths = [...new Set(paths)];

  for (const tag of uniqueTags) {
    revalidateTag(tag);
  }

  for (const path of uniquePaths) {
    if (path === "/" || path === "/service") {
      revalidatePath(path, "layout");
    } else {
      revalidatePath(path);
    }
  }

  revalidatePath("/sitemap.xml");
  revalidatePath("/robots.txt");

  return Response.json({
    revalidated: true,
    documentType: body?._type ?? null,
    tags: uniqueTags,
    paths: uniquePaths,
  });
}
