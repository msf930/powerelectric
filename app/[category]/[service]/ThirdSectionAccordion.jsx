"use client";
import { useState } from "react";
import { PortableText } from "next-sanity";
import { GoTriangleDown } from "react-icons/go";
import styles from "./styles.module.css";
import { getPortableTextComponents } from "./portableTextComponents";
import BookBtn from "../../components/BookBtn";
import CallBtn from "../../components/CallBtn";

export default function ThirdSectionAccordion({ thirdItems }) {
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

  return (
    <div className={styles.thirdSectionItemsContainer}>
      {thirdItems?.map((item) => (
        <div key={item._id}>
          <button
            onClick={() => toggleContent(item._id)}
            className={styles.thirdSectionItemButton}
          >
            {item.title}{" "}
            <GoTriangleDown
              className={
                selectedItem !== item._id || hideContent
                  ? styles.thirdSectionItemButtonIcon
                  : styles.thirdSectionItemButtonIconRotated
              }
            />
          </button>
          <div
            className={
              selectedItem !== item._id || hideContent
                ? "h-0 opacity-0 overflow-hidden transition-all duration-300"
                : "h-auto opacity-100 overflow-visible transition-all duration-300 w-[90%] sm:w-[80%]"
            }
          >
            {item.content && (
              <PortableText value={item.content} components={ptComponents} />
            )}
          </div>
        </div>
      ))}
      <div className={styles.thirdSectionItemButtonContainer}>
        <BookBtn />
        <CallBtn />
      </div>
    </div>
  );
}
