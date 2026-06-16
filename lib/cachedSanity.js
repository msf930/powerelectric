import { unstable_cache } from "next/cache";
import { client } from "../sanity/lib/client";
import { REVALIDATE_SECONDS } from "./isr";

export function cachedSanityFetch(cacheKey, query, params = {}) {
  const paramsKey = JSON.stringify(params);
  return unstable_cache(
    async () => client.fetch(query, params),
    [cacheKey, paramsKey],
    { revalidate: REVALIDATE_SECONDS, tags: [cacheKey] }
  )();
}
