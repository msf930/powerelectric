"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import Link from "next/link";

const ITEMS = [
  {
    q: "Do you handle both electrical and HVAC?",
    a: ["Yes.", "We offer four membership tiers starting at just $14/ month.",  "Plans include scheduled maintenance visits, priority scheduling, repair discounts, quarterly filter delivery, and more.",  "Our Power Protection Plan includes POWERSTAT, an exclusive 24 / 7 smart monitoring system that watches your heating and cooling system around the clock and alerts us when something goes wrong, often before you even notice.",  "Our Power Heroes Lifetime Membership is completely free for qualifying military members, first responders, and frontline healthcare professionals."],

  },
  {
    q: "How fast can you come out?",
    a: ["We aim to respond the same day for urgent electrical and HVAC issues, particularly situations involving no power, no heat, burning smells, or complete system failure.", "For non-emergency work we typically schedule within a few days.", "Membership plan members receive priority scheduling and move to the front of the line.", "Call us at (720) 272-2562 and we'll give you a realistic arrival estimate."],

  },
  {
    q: "Do you offer maintenance plans?",
    a: ["We offer four membership tiers starting at just $14/month.", "Plans include scheduled maintenance visits, priority scheduling, repair discounts, quarterly filter delivery, and more.", "Our Power Protection Plan includes POWERSTAT, an exclusive 24/7 smart monitoring system that watches your heating and cooling system around the clock and alerts us when something goes wrong, often before you even notice.", "Our Power Heroes Lifetime Membership is completely free for qualifying military members, first responders, and frontline healthcare professionals."],
    href: "/membership",
    hrefText: "View Plan Details Here",
  },
  {
    q: "What areas do you serve?",
    a: ["We serve the Denver metro area including Thornton, Brighton, Denver, Northglenn, Westminster, Broomfield, Commerce City, Arvada, Erie, and surrounding communities."],
    href: "/service-areas",
    hrefText: "View our full service area here.",
  },
  {
    q: "What Do you offer financing?",
    a: ["Yes,", 
      "We offer flexible financing through Momnt with options starting at just $1 and going up to $25,000.", 
      "Promotional plans include 12 months no interest no payments and 0% interest for 10 years for qualifying customers.",
      "Don't let cost stand between your family and a safe, comfortable home."
    ],
    href: "/financing",
    hrefText: "View financing options here.",
  },
  {
    q: "What makes you different from other companies?",
    a: [
      "Three things set us apart from most contractors in the Denver metro market.",
      "First, we handle both electrical and HVAC under one roof. Most companies do one or the other. We do both.",
      "Second, we're family-owned and operated with 20+ years in the trade, not a private equity-backed company focused on commission-driven sales and investor returns.",
      "Third, we're genuinely honest.",
      "We tell you what your home actually needs, fix what needs fixing, and nothing more.",
      "Our 5.0 rating across 202 reviews reflects that approach consistently.",
    ]
  },
];

export default function HomeFAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className={styles.section} aria-labelledby="faq-heading">
      <div className={styles.inner}>
        <h2 id="faq-heading" className={styles.title}>
          FAQ
        </h2>
        <div className={styles.list}>
          {ITEMS.map((item, i) => {
            const id = `faq-${i}`;
            const isOpen = open === i;
            return (
              <div key={id} className={styles.item}>
                <button
                  type="button"
                  className={styles.question}
                  aria-expanded={isOpen}
                  aria-controls={`${id}-panel`}
                  id={`${id}-btn`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  {item.q}
                  <span className={styles.chevron} aria-hidden>
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div
                  id={`${id}-panel`}
                  role="region"
                  aria-labelledby={`${id}-btn`}
                  className={isOpen ? styles.answer : styles.answerHidden}
                >
                  {item.a.map((a, i) => (
                    <p key={i} className={styles.answerText}>{a}</p>
                  ))}
                  {item?.href && item?.hrefText && <Link href={item.href} className={styles.contactLink}>{item.hrefText}</Link>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
