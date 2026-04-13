import Link from "next/link";
import styles from "./styles.module.css";

/**
 * Bottom CTA on service pages — links to membership (optionally city-local).
 * @param {{ city?: string }} props
 */
export default function ServiceProtectionPlanCta({ city }) {
  const href = city ? `/membership/${city}` : "/membership";

  return (
    <section className={styles.section} aria-labelledby="protection-plan-cta-heading">
      <div className={styles.inner}>
        <h2 id="protection-plan-cta-heading" className={styles.heading}>
          <span className={styles.emoji} aria-hidden>
            🔄{" "}
          </span>
          Want to Prevent This From Happening Again?
        </h2>
        <p className={styles.lead}>
          Many electrical problems start small and turn into bigger issues over time.
        </p>
        <p className={styles.sublead}>
          <span className={styles.emoji} aria-hidden>
            👉{" "}
          </span>
          Our Total Home Protection Plan helps you:
        </p>
        <ul className={styles.list}>
          <li>Catch issues early</li>
          <li>Reduce unexpected repairs</li>
          <li>Keep your system running safely</li>
        </ul>
        <p className={styles.ctaLine}>
          <span className={styles.emoji} aria-hidden>
            👉{" "}
          </span>
          <Link href={href} className={styles.ctaLink}>
            View Maintenance Plans
          </Link>
        </p>
      </div>
    </section>
  );
}
