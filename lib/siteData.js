import { cachedSanityFetch } from "./cachedSanity";

export function getSiteButtons() {
  return cachedSanityFetch(
    "site-buttons",
    `{
      "bookLink": *[_type == "bookButton"][0].link,
      "callNumber": *[_type == "callButton"][0].number
    }`
  );
}

export function getHomeStats() {
  return cachedSanityFetch(
    "home-stats",
    `*[_type == "statsContainer"][0].stats[]->{
      _id,
      leadingText,
      value,
      trailingText,
      description
    }`
  ).then((data) => data ?? []);
}

export function getContactData() {
  return cachedSanityFetch(
    "contact-data",
    `*[_type == "contact"][0]{
      _id,
      accessString,
      serviceItems[]->{
        _id,
        title,
        imagePrimary,
        bookNowText,
        slug
      }
    }`
  );
}

export async function getHomePageData() {
  const [buttons, stats, contact, widget] = await Promise.all([
    getSiteButtons(),
    getHomeStats(),
    getContactData(),
    import("./featurable").then(({ fetchFeaturableWidget }) =>
      fetchFeaturableWidget()
    ),
  ]);

  const { mapCarouselReviews, mapReviewSnippets } = await import("./featurable");

  return {
    bookLink: buttons?.bookLink ?? null,
    callNumber: buttons?.callNumber ?? null,
    stats,
    contact,
    widget,
    carouselReviews: widget ? mapCarouselReviews(widget) : [],
    reviewSnippets: widget ? mapReviewSnippets(widget) : [],
  };
}
