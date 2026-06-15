import Link from "next/link";
import CallBtn from "../CallBtn";
import BookBtn from "../BookBtn";
import styles from "./styles.module.css";

const PHONE_DISPLAY = "(720) 272-2562";
const PHONE_HREF = "tel:+17202722562";
const ADDRESS = "5650 N Washington St. Unit C-6, Denver, CO 80216";
const MAPS_HREF = "https://maps.app.goo.gl/Lw2x8JKXuSi5YrMq9";

export default function ClosingCTA({
  title,
  subtext,
  showCouponOffer = false,
  bookLink = null,
  callNumber = null,
}) {
  const headingId = "closing-cta-heading";
  const resolvedTitle =
    title ?? (showCouponOffer ? "Need Service Today?" : null);

  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <div className={styles.inner}>
        {resolvedTitle ? (
          <h2 id={headingId} className={styles.title}>
            {resolvedTitle}
          </h2>
        ) : null}
        {subtext ? <p className={styles.subtext}>{subtext}</p> : null}

        <div className={styles.body}>
          {showCouponOffer ? (
            <>
              <div className={styles.actions}>
                <CallBtn label="Call Now" number={callNumber} />
                <span className={styles.sep} aria-hidden>
                  |
                </span>
                <BookBtn label="Book Service" link={bookLink} />
              </div>
              <p className={styles.offer}>
                <Link href="/instant-quote" className={styles.offerLink}>
                  $35 Off Any Service
                </Link>
                <span className={styles.sep} aria-hidden>
                  |
                </span>
                <span>Mention This Offer When You Call or Book</span>
              </p>
            </>
          ) : (
            <>
              <p className={styles.line}>
                <Link href={PHONE_HREF} className={styles.link}>
                  Call or Text: {PHONE_DISPLAY}
                </Link>
              </p>
              <div className={styles.book}>
                <BookBtn label="Book Service Today" link={bookLink} />
              </div>
            </>
          )}

          <p className={styles.tagline}>We Put The Power In Your Project!</p>

          {!showCouponOffer ? (
            <>
              <p className={styles.line}>
                <Link href={PHONE_HREF} className={styles.link}>
                  Book Now: {PHONE_DISPLAY}
                </Link>
              </p>
              <p className={styles.address}>
                <Link
                  href={MAPS_HREF}
                  className={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ADDRESS}
                </Link>
              </p>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
