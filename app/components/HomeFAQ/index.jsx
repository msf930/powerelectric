"use client";

import { useState } from "react";
import styles from "./styles.module.css";

const ITEMS = [
  {
    q: "Do you handle both electrical and HVAC?",
    a: "Yes full electrical, heating, and cooling services.",
  },
  {
    q: "How fast can you come out?",
    a: "Fast response + same-day availability.",
  },
  {
    q: "Do you offer maintenance plans?",
    a: "Yes designed to prevent breakdowns and save money.",
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
                  <p className={styles.answerText}>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
