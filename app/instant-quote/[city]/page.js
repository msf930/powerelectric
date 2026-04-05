import NavServer from "../../components/Nav/NavServer";
import Footer from "../../components/Footer";
import styles from "./styles.module.css";
import InstantQuote from "./InstantQuote";
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