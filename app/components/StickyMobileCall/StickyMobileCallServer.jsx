import { getSiteButtons } from "../../../lib/siteData";
import StickyMobileCall from "./index";

export default async function StickyMobileCallServer() {
  const { callNumber } = await getSiteButtons();
  return <StickyMobileCall number={callNumber} />;
}
