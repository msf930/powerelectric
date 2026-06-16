import { cachedSanityFetch } from "./cachedSanity";

const LAYOUT_NAV_QUERY = `{
  "bookLink": *[_type == "bookButton"][0].link,
  "callNumber": *[_type == "callButton"][0].number,
  "dropdown": *[_type == "allServices"][0].allServices[]->{
    _id,
    title,
    slug,
    subCategories[]->{
      _id,
      title,
      slug,
      services[]->{
        _id,
        title,
        slug
      }
    }
  },
  "aboutMore": *[_type == "aboutMore"][0].pages[]->{
    _id,
    title,
    slug
  },
  "cities": *[_type == "newServices"][0].newServices[]->{
    _id,
    city,
    slug
  }
}`;

export function getLayoutNavData() {
  return cachedSanityFetch("layout-nav-data", LAYOUT_NAV_QUERY);
}
