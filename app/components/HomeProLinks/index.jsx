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
              Inspection findings resolved quickly so your transaction doesn&apos;t stall.
            </span>
            <span className={styles.sub}>
              Fast turnaround, clear documentation, and one call for electrical and HVAC repairs.
            </span>
            <span className={styles.arrow} aria-hidden>
              →
            </span>
          </Link>
          <Link href={contractorPath} className={styles.card}>
            <span className={styles.label}>Contractor Services</span>
            <span className={styles.sub}>
              2,047 contractor projects completed.
            </span>
            <span className={styles.sub}>
              We show up, communicate clearly, and never leave a job site worse than we found it.


            </span>
            <span className={styles.sub}>
              Electrical and HVAC under one roof.


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
