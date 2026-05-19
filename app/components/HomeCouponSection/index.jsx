import Link from "next/link";
import styles from "./styles.module.css";

const PHONE_DISPLAY = "(720) 272-2562";
const PHONE_HREF = "tel:+17202722562";

const BENEFITS = [
  "New and existing customers welcome",
  "Applies to any electrical, HVAC, or IAQ service",
  "No expiration date",
  "Cannot be combined with other offers | One per household",
];

export default function HomeCouponSection() {
  return (
    <section className={styles.section} aria-labelledby="home-coupon-heading">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>$35 OFF ANY SERVICE</p>

        <h2 id="home-coupon-heading" className={styles.title}>
          Save $35 On Your Next Electrical, HVAC, or IAQ Service
        </h2>

        <p className={styles.intro}>
          Whether it&apos;s an emergency repair, a planned upgrade, or your first
          maintenance visit, save $35 when you book with Power Electrical,
          Heating &amp; Cooling Services.
        </p>

        <ul className={styles.benefits}>
          {BENEFITS.map((item) => (
            <li key={item} className={styles.benefit}>
              {item}
            </li>
          ))}
        </ul>

        <p className={styles.mention}>
          Just mention this offer when you call or book online.
        </p>

        <div className={styles.actions}>
          <Link href="/instant-quote" className={styles.primaryCta}>
            Claim $35 Off
          </Link>
          <Link href="/contact" className={styles.secondaryCta}>
            Book Now
          </Link>
          <Link href={PHONE_HREF} className={styles.phoneCta}>
            {PHONE_DISPLAY}
          </Link>
        </div>
      </div>
    </section>
  );
}
