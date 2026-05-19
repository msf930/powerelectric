import Link from "next/link";
import styles from "./styles.module.css";

const PLANS = [
  {
    name: "Power Advantage",
    price: "$14/month",
    description:
      "Priority scheduling, annual system visit, 5% off repairs",
  },
  {
    name: "Power Club",
    price: "$24/month",
    description:
      "Two visits per year, 10% off repairs, quarterly filters, IAQ assessment",
  },
  {
    name: "Power Protection",
    price: "$39/month",
    description:
      "Everything in Power Club plus POWERSTAT 24/7 smart monitoring",
  },
  {
    name: "Power Heroes",
    price: "FREE lifetime membership",
    description:
      "for military, first responders, and frontline healthcare professionals",
  },
];

export default function HomeMembership({ city = "" }) {
  const plansHref = city ? `/membership/${city}` : "/membership";

  return (
    <section className={styles.section} aria-labelledby="membership-heading">
      <div className={styles.inner}>
        <h2 id="membership-heading" className={styles.title}>
          Want to Prevent Problems Before They Start?
        </h2>

        <p className={styles.intro}>
          Our membership plans keep your electrical and HVAC systems running
          safely year-round with scheduled maintenance, priority scheduling, and
          repair discounts that often pay for the membership with a single service
          call.
        </p>

        <ul className={styles.plans}>
          {PLANS.map((plan) => (
            <li key={plan.name} className={styles.plan}>
              <span className={styles.planName}>{plan.name}</span>
              <span className={styles.planSep} aria-hidden>
                |
              </span>
              <span className={styles.planPrice}>{plan.price}</span>
              <span className={styles.planSep} aria-hidden>
                |
              </span>
              <span className={styles.planDescription}>{plan.description}</span>
            </li>
          ))}
        </ul>

        <p className={styles.promo}>
          This month, your first month is <strong>FREE</strong> when you sign up
          for any plan.
        </p>

        <Link href={plansHref} className={styles.cta}>
          View All Membership Plans &amp; Benefits →
        </Link>
      </div>
    </section>
  );
}
