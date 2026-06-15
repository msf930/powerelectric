const HOLIDAY_LIGHTING_ID = "holiday-lighting";

/** Remove leading/trailing slashes from a Sanity slug value. */
export function normalizeSlugPath(slug) {
  return (slug || "").replace(/^\/+/, "").replace(/\/+$/, "");
}

/**
 * Build a service page URL from Sanity `service.slug.current`
 * (stored as `/category/service-name` in CMS).
 */
export function servicePageHref(slug, city = "") {
  const path = normalizeSlugPath(slug);
  if (!path) return "#";
  if (path === HOLIDAY_LIGHTING_ID) {
    return `/holidayLighting${city ? `/${city}` : ""}`;
  }
  const base = `/service/${path}`;
  return city ? `${base}/${city}` : base;
}

/** Build a service category overview URL from `serviceCategory.slug.current`. */
export function serviceCategoryHref(slug, city = "") {
  const path = normalizeSlugPath(slug);
  if (!path) return "/";
  if (city) return `/service/${path}/service-area/${city}`;
  return `/service/${path}`;
}
