"use client";

import { useState } from "react";
import { GoTriangleDown } from "react-icons/go";
import styles from "./styles.module.css";

function AccordionBody({ item }) {
  return (
    <div className={styles.accordionBody}>
      {item.intro?.map((text, i) => (
        <p key={`intro-${i}`} className={styles.prose}>
          {text}
        </p>
      ))}
      {item.bullets?.length ? (
        <ul className={styles.bulletList}>
          {item.bullets.map((line, i) => (
            <li key={`bullet-${i}`}>● {line}</li>
          ))}
        </ul>
      ) : null}
      {item.bestFor?.length ? (
        <>
          <h4 className={styles.accordionSubhead}>Best for</h4>
          <ul className={styles.bulletList}>
            {item.bestFor.map((line, i) => (
              <li key={`best-${i}`}>● {line}</li>
            ))}
          </ul>
        </>
      ) : null}
      {item.whyWorks?.map((text, i) => (
        <p key={`why-${i}`} className={styles.prose}>
          {text}
        </p>
      ))}
      {item.body?.map((text, i) => (
        <p key={`body-${i}`} className={styles.prose}>
          {text}
        </p>
      ))}
    </div>
  );
}

export default function FinancingAccordion({ items, className = "" }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [hideContent, setHideContent] = useState(false);

  const toggleContent = (id) => {
    if (selectedItem === id) {
      setSelectedItem(null);
      setHideContent(true);
    } else {
      setSelectedItem(id);
      setHideContent(false);
    }
  };

  if (!items?.length) return null;

  return (
    <div className={`${styles.accordion} ${className}`.trim()}>
      {items.map((item) => (
        <div key={item._id} className={styles.accordionItem}>
          <button
            type="button"
            onClick={() => toggleContent(item._id)}
            className={styles.accordionButton}
            aria-expanded={selectedItem === item._id && !hideContent}
          >
            {item.title}
            <GoTriangleDown
              className={
                selectedItem !== item._id || hideContent
                  ? styles.accordionIcon
                  : styles.accordionIconOpen
              }
              aria-hidden
            />
          </button>
          <div
            className={
              selectedItem !== item._id || hideContent
                ? styles.accordionPanelCollapsed
                : styles.accordionPanelOpen
            }
          >
            <AccordionBody item={item} />
          </div>
        </div>
      ))}
    </div>
  );
}
