"use client";
import { useState } from "react";
import { PortableText } from "next-sanity";
import { GoTriangleDown } from "react-icons/go";
import styles from "./styles.module.css";
import { getPortableTextComponents } from "./portableTextComponents";
import BookBtn from "../../../../components/BookBtn";
import CallBtn from "../../../../components/CallBtn";

export default function FaqAccordion({ faqItems, serviceTitle }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [hideContent, setHideContent] = useState(false);
  const ptComponents = getPortableTextComponents(styles);

  const toggleContent = (id) => {
    if (selectedItem === id) {
      setSelectedItem(null);
      setHideContent(true);
    } else {
      setSelectedItem(id);
      setHideContent(false);
    }
  };

  if (!faqItems?.length) return null;

  return (
    <section className={styles.faqSection}>
      <div className={styles.faqSectionInnerContainer}>
        <h2 className={styles.faqSectionTitle}>
          The {serviceTitle} Professionals
        </h2>
        <div className={styles.faqItemsContainer}>
          {faqItems.map((item) => (
            <div className={styles.faqItem} key={item._id}>
              <button
                onClick={() => toggleContent(item._id)}
                className={styles.faqItemButton}
              >
                {item.title}{" "}
                <GoTriangleDown
                  className={
                    selectedItem !== item._id || hideContent
                      ? styles.faqItemButtonIcon
                      : styles.faqItemButtonIconRotated
                  }
                />
              </button>
              <div
                className={
                  selectedItem !== item._id || hideContent
                    ? "h-0 opacity-0 overflow-hidden transition-all duration-300"
                    : "h-auto opacity-100 overflow-visible transition-all duration-300 w-full bg-white p-4"
                }
              >
                {item.content && (
                  <PortableText value={item.content} components={ptComponents} />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.faqSectionButtonContainer}>
          <BookBtn />
          <CallBtn />
        </div>
      </div>
    </section>
  );
}
