const SITE_URL = "https://www.powerelectricalservices.net";

export const revalidate = 3600;

const SEARCH_ENGINE_BOTS = ["Googlebot", "Bingbot", "Slurp", "DuckDuckBot"];

export default function robots() {
  return {
    rules: [
      ...SEARCH_ENGINE_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/studio/"],
      })),
      
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
