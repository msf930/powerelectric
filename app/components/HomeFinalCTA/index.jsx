import styles from "./styles.module.css";
import CallBtn from "../CallBtn";
import BookBtn from "../BookBtn";

export default function HomeFinalCTA({ bookLink = null, callNumber = null }) {
  return (
    <section className={styles.section} aria-labelledby="final-cta-heading">
      <div className={styles.inner}>
        <h2 id="final-cta-heading" className={styles.title}>
          Need Service Today?
        </h2>
        <div className={styles.buttons}>
          <CallBtn label="Call Now" number={callNumber} />
          <BookBtn label="Book Service" link={bookLink} />
        </div>
      </div>
    </section>
  );
}
