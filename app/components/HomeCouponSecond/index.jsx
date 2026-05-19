import Link from "next/link";
import styles from "./styles.module.css";

const PHONE_DISPLAY = "(720) 272-2562";
const PHONE_HREF = "tel:+17202722562";

export default function HomeCouponSecond() {
  return (
    <section className={styles.section} aria-labelledby="home-coupon-second-heading">
      <div className={styles.inner}>
        <h2 id="home-coupon-second-heading" className={styles.title}>
          <span className={styles.titleLead}>Don&apos;t Forget</span>
          <span className={styles.titleSep} aria-hidden>
            |
          </span>
          <span className={styles.titleOffer}>$35 Off Any Service</span>
        </h2>

        <p className={styles.mention}>
          Mention this offer when you call or book.
        </p>
        <p className={styles.welcome}>New and existing customers welcome.</p>

        <div className={styles.actions}>
          <Link href="/contact" className={styles.primaryCta}>
            Book Now
          </Link>
          <Link href="/instant-quote" className={styles.secondaryCta}>
            Claim $35 Off
          </Link>
          <Link href={PHONE_HREF} className={styles.phoneCta}>
            {PHONE_DISPLAY}
          </Link>
        </div>
      </div>
    </section>
  );
}
