import Link from "next/link";
import CallBtn from "../CallBtn";
import BookBtn from "../BookBtn";
import styles from "./styles.module.css";

export default function ClosingCTA() {
  return (
    <section className={styles.section} aria-labelledby="closing-cta-heading">
      <div className={styles.inner}>
        <h2 id="closing-cta-heading" className={styles.title}>
          Need Service Today?
        </h2>

        <div className={styles.actions}>
          <CallBtn label="Call Now" />
          <span className={styles.sep} aria-hidden>
            |
          </span>
          <BookBtn label="Book Service" />
        </div>

        <p className={styles.offer}>
          <Link href="/instant-quote" className={styles.offerLink}>
            $35 Off Any Service
          </Link>
          <span className={styles.sep} aria-hidden>
            |
          </span>
          <span>Mention This Offer When You Call or Book</span>
        </p>

        <p className={styles.tagline}>We Put The Power In Your Project!</p>
      </div>
    </section>
  );
}
