
import styles from "./styles.module.css";
import { PortableText } from "next-sanity";
import BookBtn from "../BookBtn";
import CallBtn from "../CallBtn";

export default function ServiceProtectionPlanCta({ title, subtext }) {

  return (
    <section className={styles.section} aria-labelledby="protection-plan-cta-heading">
      <div className={styles.inner}>
        <h2 id="protection-plan-cta-heading" className={styles.heading}>
          <span className={styles.emoji} aria-hidden>
            
          </span>
          {title}
        </h2>
        <div className={styles.lead}>
          <PortableText value={subtext} />
        </div>
        <div className={styles.ctaLine}>
          <BookBtn />
          <CallBtn />
        </div>
      </div>
    </section>
  );
}
