import { client } from "../../../sanity/lib/client";
import { getSiteButtons } from "../../../lib/siteData";
import Nav from "./index.jsx";

const NAV_QUERY = `*[_type == "allServices"]{
  _id,
  allServices[]->{
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
        slug,
      }
    }
  }
}`;

const ABOUT_MORE_QUERY = `*[_type == "aboutMore"][0]{
  pages[]->{
    _id,
    title,
    slug,
  }
}`;

const CITY_QUERY = `*[_type == "newServices"][0]{
  _id,
  newServices[]->{
    _id,
    city,
    slug,
  }
}`;

export default async function NavServer({
  city,
  bookLink: bookLinkProp,
  callNumber: callNumberProp,
}) {
  const [data, aboutMoreData, cityData, buttons] = await Promise.all([
    client.fetch(NAV_QUERY),
    client.fetch(ABOUT_MORE_QUERY),
    client.fetch(CITY_QUERY),
    bookLinkProp && callNumberProp
      ? Promise.resolve({
          bookLink: bookLinkProp,
          callNumber: callNumberProp,
        })
      : getSiteButtons(),
  ]);

  const dropdownItems = data?.[0]?.allServices ?? [];
  const aboutMoreItems = aboutMoreData?.pages;
  const cityItems = cityData?.newServices;
  const bookLink = bookLinkProp ?? buttons?.bookLink ?? null;
  const callNumber = callNumberProp ?? buttons?.callNumber ?? null;

  return (
    <Nav
      dropdownItems={dropdownItems}
      city={city}
      aboutMoreItems={aboutMoreItems}
      cityItems={cityItems}
      bookLink={bookLink}
      callNumber={callNumber}
    />
  );
}
