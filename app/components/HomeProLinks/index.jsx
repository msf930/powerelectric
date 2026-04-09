import Link from "next/link";
import styles from "./styles.module.css";

export default function HomeProLinks() {
  const rePath = "/real-estate-inspection-repairs-denver";
  const contractorPath = "/contractor";

  return (
    <section className={styles.section} aria-label="Programs for professionals">
      <div className={styles.inner}>
        <div className={styles.row}>
          <Link href={rePath} className={styles.card}>
            <span className={styles.label}>Real Estate Pros</span>
            <span className={styles.sub}>
              Inspection repairs &amp; deadline-friendly scheduling
            </span>
            <span className={styles.arrow} aria-hidden>
              →
            </span>
          </Link>
          <Link href={contractorPath} className={styles.card}>
            <span className={styles.label}>Contractor Services</span>
            <span className={styles.sub}>
              Job site electrical &amp; HVAC support
            </span>
            <span className={styles.arrow} aria-hidden>
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
