import Link from "next/link";
import styles from "./styles.module.css";

const MOMNT_WIDGET_URL =
  "https://app.momnt.com/widgets/?merchantId=60aa7462-3380-4077-855b-bf116c4235a3&widget=ConsumerLoanApplicationWizard";

export default function HomeFinancingSection({ city = "" }) {
  const financingHref = city ? `/financing/${city}` : "/financing";

  return (
    <section className={styles.section} aria-labelledby="financing-home-heading">
      <div className={styles.inner}>
        <h2 id="financing-home-heading" className={styles.title}>
          Flexible Financing Options Available
        </h2>
        <p className={styles.text}>
          Get the services you need now with payment options that fit your
          budget.
        </p>
        <div className={styles.widgetWrap}>
          <iframe
            title="Apply for financing"
            src={MOMNT_WIDGET_URL}
            className={styles.iframe}
            loading="lazy"
          />
        </div>
        <p className={styles.fineprint}>
          Prefer to browse all options?{" "}
          <Link href={financingHref} className={styles.link}>
            See financing details
          </Link>
        </p>
      </div>
    </section>
  );
}
