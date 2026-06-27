import { normalizeSlugPath } from "./servicePaths";

/**
 * Map a Sanity webhook document payload to cache tags and paths to revalidate.
 */
export function getSanityRevalidationTargets(document) {
  const type = document?._type;
  const slugCurrent =
    typeof document?.slug === "string"
      ? document.slug
      : document?.slug?.current;
  const tags = new Set();
  const paths = new Set();

  const addTag = (tag) => {
    if (tag) tags.add(tag);
  };
  const addPath = (path) => {
    if (path) paths.add(path);
  };

  switch (type) {
    case "service": {
      const slug = slugCurrent?.startsWith("/")
        ? slugCurrent
        : slugCurrent
          ? `/${slugCurrent}`
          : "";
      if (slug.length > 1) {
        addTag(`service-${slug}`);
        addPath(`/service${slug}`);
      }
      addTag("service-slugs");
      addTag("sitemap-data");
      break;
    }
    case "blogPost": {
      if (slugCurrent) {
        addTag(`blog-post-${slugCurrent}`);
        addPath(`/blog/${slugCurrent}`);
      }
      addTag("blog-slugs");
      addTag("sitemap-data");
      addPath("/blog");
      break;
    }
    case "serviceCategory": {
      const category = normalizeSlugPath(slugCurrent);
      if (category) {
        addPath(`/service/${category}`);
      }
      addTag("category-slugs");
      addTag("sitemap-data");
      break;
    }
    case "newServicePage": {
      if (slugCurrent) addPath(`/${slugCurrent}`);
      addTag("new-service-page-slugs");
      addTag("sitemap-data");
      break;
    }
    case "aboutMorePage": {
      if (slugCurrent) addPath(`/about/more/${slugCurrent}`);
      addTag("about-more-slugs");
      addTag("sitemap-data");
      break;
    }
    case "bookButton":
    case "callButton":
      addTag("site-buttons");
      addTag("layout-nav-data");
      addPath("/");
      break;
    case "contact":
      addTag("contact-data");
      addPath("/contact");
      addPath("/");
      break;
    case "statsContainer":
      addTag("home-stats");
      addPath("/");
      break;
    case "allServices":
      addTag("layout-nav-data");
      addTag("home-service-categories");
      addPath("/");
      break;
    case "aboutMore":
    case "newServices":
      addTag("layout-nav-data");
      addTag("sitemap-data");
      break;
    case "locations":
      addTag("sitemap-data");
      addPath("/service-areas");
      break;
    default:
      addTag("sitemap-data");
      break;
  }

  return {
    tags: [...tags],
    paths: [...paths],
  };
}
