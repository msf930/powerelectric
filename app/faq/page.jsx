import NavServer from "../components/Nav/NavServer";
import Footer from "../components/Footer";
import StickyMobileCall from "../components/StickyMobileCall";
import CallBtn from "../components/CallBtn";
import BookBtn from "../components/BookBtn";
import styles from "./styles.module.css";
import {
  intro,
  sections,
  closingCta,
  numberedFaqs,
} from "./faqData";
import { FAQ_PAGE_JSON_LD } from "../components/SeoFaqPageJsonLd";

export const metadata = {
  title: "Electrical & HVAC FAQs | Power Electrical, Heating & Cooling Services",
  description:
    "Fast answers to common electrical, HVAC, real estate inspection, and service questions. Serving Brighton, Commerce City, Thornton, Northglenn, Westminster & Broomfield.",
};

export default function FaqPage() {
  return (
    <div className={`${styles.page} pb-20 md:pb-0`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(FAQ_PAGE_JSON_LD),
        }}
      />
      <NavServer />
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{intro.eyebrow}</p>
          <p className={styles.areas}>{intro.areas}</p>
          <h1 className={styles.heroTitle}>{intro.title}</h1>
          <p className={styles.lead}>{intro.lead}</p>
          <p className={styles.sub}>{intro.sub}</p>
        </div>
      </header>

      <main>
        {sections.map((section, i) => (
          <section
            key={section.id}
            id={section.id}
            className={`${styles.section} ${i % 2 === 0 ? styles.sectionAlt : ""}`}
            aria-labelledby={`faq-section-${section.id}`}
          >
            <div className={styles.sectionInner}>
              <h2
                id={`faq-section-${section.id}`}
                className={styles.sectionTitle}
              >
                {section.title}
              </h2>
              {section.items.map((item) => (
                <article key={item.q} className={styles.faqItem}>
                  <h3 className={styles.question}>{item.q}</h3>
                  <p className={styles.answer}>{item.a}</p>
                </article>
              ))}
            </div>
          </section>
        ))}

        <section
          className={styles.ctaBand}
          aria-labelledby="faq-closing-cta"
        >
          <div className={styles.ctaInner}>
            <h2 id="faq-closing-cta" className={styles.ctaTitle}>
              {closingCta.title}
            </h2>
            <p className={styles.phoneRow}>
              <span aria-hidden="true">📞 </span>
              {closingCta.phoneLabel}{" "}
              <a
                className={styles.phoneLink}
                href={`tel:${closingCta.phoneTel}`}
              >
                {closingCta.phoneDisplay}
              </a>
            </p>
            {closingCta.lines.map((line) => (
              <p key={line} className={styles.ctaLines}>
                {line}
              </p>
            ))}
            <div className={styles.ctaButtons}>
              <CallBtn label="Call Now" />
              <BookBtn label="Book Service" />
            </div>
          </div>
        </section>

        <section
          className={styles.numberedSection}
          aria-labelledby="faq-numbered-heading"
        >
          <div className={styles.numberedInner}>
            <h2 id="faq-numbered-heading" className={styles.numberedHeading}>
              More questions &amp; answers
            </h2>
            {numberedFaqs.map((item, index) => (
              <article key={item.q} className={styles.numberedItem}>
                <h3 className={styles.numberedQ}>
                  <span className={styles.numberPrefix}>{index + 1}. </span>
                  {item.q}
                </h3>
                <p className={styles.numberedA}>
                  <strong className="sr-only">Answer: </strong>
                  {item.a}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <StickyMobileCall />
    </div>
  );
}
