import Link from "next/link";
import styles from "./styles.module.css";

const PHONE_DISPLAY = "(720) 272-2562";
const PHONE_HREF = "tel:+17202722562";

export default function HomeCouponThird() {
  return (
    <section className={styles.section} aria-labelledby="home-coupon-third-heading">
      <div className={styles.inner}>
        <h2 id="home-coupon-third-heading" className={styles.title}>
          Ready to Book? Save $35 On Your First Service.
        </h2>

        <p className={styles.mention}>
          Mention this offer when you call or book online.
        </p>

        <div className={styles.actions}>
          <Link href="/contact" className={styles.primaryCta}>
            Book Now
          </Link>
          <span className={styles.actionSep} aria-hidden>
            |
          </span>
          <Link href={PHONE_HREF} className={styles.phoneCta}>
            Call {PHONE_DISPLAY}
          </Link>
        </div>
      </div>
    </section>
  );
}
