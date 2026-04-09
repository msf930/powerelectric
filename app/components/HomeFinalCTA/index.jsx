import styles from "./styles.module.css";
import CallBtn from "../CallBtn";
import BookBtn from "../BookBtn";

export default function HomeFinalCTA() {
  return (
    <section className={styles.section} aria-labelledby="final-cta-heading">
      <div className={styles.inner}>
        <h2 id="final-cta-heading" className={styles.title}>
          Need Service Today?
        </h2>
        <div className={styles.buttons}>
          <CallBtn label="Call Now" />
          <BookBtn label="Book Service" />
        </div>
      </div>
    </section>
  );
}
