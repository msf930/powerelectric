import { getLayoutNavData } from "../../../lib/navData";
import Nav from "./index.jsx";

export default async function NavServer({
  bookLink: bookLinkProp,
  callNumber: callNumberProp,
}) {
  const data = await getLayoutNavData();

  const dropdownItems = data?.dropdown ?? [];
  const aboutMoreItems = data?.aboutMore;
  const cityItems = data?.cities;
  const bookLink = bookLinkProp ?? data?.bookLink ?? null;
  const callNumber = callNumberProp ?? data?.callNumber ?? null;

  return (
    <Nav
      dropdownItems={dropdownItems}
      aboutMoreItems={aboutMoreItems}
      cityItems={cityItems}
      bookLink={bookLink}
      callNumber={callNumber}
    />
  );
}
