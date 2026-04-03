import { client } from "../../../sanity/lib/client";
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
export default async function NavServer( { city } ) {
  const [data] = await Promise.all([
    client.fetch(NAV_QUERY),
  ]);
  const [aboutMoreData] = await Promise.all([
    client.fetch(ABOUT_MORE_QUERY),
  ]);
  const [cityData] = await Promise.all([
      client.fetch(CITY_QUERY),
  ]);
  

  const dropdownItems = data?.[0]?.allServices ?? [];
  const aboutMoreItems = aboutMoreData?.pages;
  const cityItems = cityData?.newServices;
  return <Nav dropdownItems={dropdownItems} city={city} aboutMoreItems={aboutMoreItems} cityItems={cityItems} />
}
