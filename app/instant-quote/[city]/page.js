import NavServer from "../../components/Nav/NavServer";
import Footer from "../../components/Footer";
import styles from "./styles.module.css";
import InstantQuote from "./InstantQuote";

import { generateCityParams } from "../../../lib/staticParams";

export const revalidate = false;

export async function generateStaticParams() {
  return generateCityParams();
}

export default async function InstantQuotePage({ params }) {
  const { city } = await params;
  return (
    <div>
      <NavServer city={city} />
      <div className={styles.instantQuoteContainer}>
        <InstantQuote city={city} />
      </div>
      <Footer />
    </div>
  );
}