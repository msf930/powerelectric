const SITE_URL = "https://www.powerelectricalservices.net";

export const revalidate = 3600;

// Training and data-harvesting AI crawlers.
const AI_TRAINING_BOTS = [
  "GPTBot", // OpenAI model training
  "ClaudeBot", // Anthropic model training
  "anthropic-ai", // Anthropic
  "Google-Extended", // Gemini training (not used for Google Search indexing)
  "CCBot", // Common Crawl (AI training datasets)
  "Bytespider", // ByteDance / TikTok
  "Meta-ExternalAgent", // Meta AI training
  "meta-externalfetcher", // Meta AI fetching
  "Applebot-Extended", // Apple AI training (Applebot still allowed for Siri/previews)
  "Amazonbot", // Amazon / Alexa training
  "cohere-ai", // Cohere
  "Diffbot", // Commercial scraping / AI datasets
  "ImagesiftBot",
  "omgili",
  "omgilibot",
  "YouBot", // You.com
  "Timpibot",
  "PetalBot", // Huawei
  "Ai2Bot", // Allen Institute for AI
];

const SEARCH_ENGINE_BOTS = ["Googlebot", "Bingbot", "Slurp", "DuckDuckBot"];

export default function robots() {
  return {
    rules: [
      ...SEARCH_ENGINE_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/studio/"],
      })),
      ...AI_TRAINING_BOTS.map((userAgent) => ({
        userAgent,
        disallow: "/",
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
