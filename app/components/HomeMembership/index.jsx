import Link from "next/link";
import styles from "./styles.module.css";

const POINTS = [
  "Prevent breakdowns",
  "Priority service",
  "Long-term savings",
];

export default function HomeMembership({ city = "" }) {
  const plansHref = city ? `/membership/${city}` : "/membership";

  return (
    <section className={styles.section} aria-labelledby="membership-heading">
      <div className={styles.inner}>
        <h2 id="membership-heading" className={styles.title}>
          Maintenance Membership
        </h2>
        <ul className={styles.list}>
          {POINTS.map((p) => (
            <li key={p} className={styles.item}>
              <span className={styles.check} aria-hidden>
                ✓
              </span>{" "}
              {p}
            </li>
          ))}
        </ul>
        <Link href={plansHref} className={styles.cta}>
          View Plans
        </Link>
      </div>
    </section>
  );
}
