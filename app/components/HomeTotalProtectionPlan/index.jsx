import Link from "next/link";
import styles from "./styles.module.css";

const BENEFITS = [
  "Catch issues early",
  "Reduce unexpected repairs",
  "Keep systems running safely",
];

export default function HomeTotalProtectionPlan({ city = "" }) {
  const plansHref = city ? `/membership/${city}` : "/membership";

  return (
    <section
      className={styles.section}
      aria-labelledby="total-protection-heading"
    >
      <div className={styles.inner}>
        <h2 id="total-protection-heading" className={styles.title}>
          Want to Prevent Problems Before They Start?
        </h2>
        <p className={styles.intro}>
          <Link href={plansHref} className={styles.introLink}>
            👉 Our Total Home Protection Plan helps you:
          </Link>
        </p>
        <ul className={styles.list}>
          {BENEFITS.map((label) => (
            <li key={label} className={styles.item}>
              <Link href={plansHref} className={styles.benefitLink}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href={plansHref} className={styles.cta}>
          👉 View Maintenance Plans
        </Link>
      </div>
    </section>
  );
}
