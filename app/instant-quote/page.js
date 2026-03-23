import NavServer from "../components/Nav/NavServer";
import Footer from "../components/Footer";
import styles from "./styles.module.css";
import InstantQuote from "./InstantQuote";
export default function InstantQuotePage() {
  return (
    <div>
      <NavServer />
      <div className={styles.instantQuoteContainer}>
        <InstantQuote />
      </div>
      <Footer />
    </div>
  );
}