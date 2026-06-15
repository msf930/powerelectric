import { cache } from "react";
import { client } from "../sanity/lib/client";

export const getSiteButtons = cache(async () => {
  return client.fetch(`{
    "bookLink": *[_type == "bookButton"][0].link,
    "callNumber": *[_type == "callButton"][0].number
  }`);
});

export const getHomeStats = cache(async () => {
  const data = await client.fetch(
    `*[_type == "statsContainer"][0].stats[]->{
      _id,
      leadingText,
      value,
      trailingText,
      description
    }`
  );
  return data ?? [];
});

export const getContactData = cache(async () => {
  return client.fetch(`*[_type == "contact"][0]{
    _id,
    accessString,
    serviceItems[]->{
      _id,
      title,
      imagePrimary,
      bookNowText,
      slug
    }
  }`);
});

export const getHomePageData = cache(async () => {
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
});
