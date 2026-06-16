import { getLayoutNavData } from "../../../lib/navData";
import StickyMobileCall from "./index";

export default async function StickyMobileCallServer() {
  const data = await getLayoutNavData();
  return <StickyMobileCall number={data?.callNumber} />;
}
