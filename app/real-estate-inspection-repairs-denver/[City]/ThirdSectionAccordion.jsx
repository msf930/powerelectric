"use client";
import { useState } from "react";
import { GoTriangleDown } from "react-icons/go";
import styles from "./styles.module.css";

import BookBtn from "../../components/BookBtn";
import CallBtn from "../../components/CallBtn";

export default function ThirdSectionAccordion({ thirdItems }) {
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
                : "h-auto opacity-100 overflow-visible transition-all duration-300 w-[80%]"
            }
          >
            <ul className={styles.thirdSectionItemList}>
              {item?.content?.map((line, index) => (
                <li key={`${item._id}-${index}`}>● {line}</li>
              ))}
            </ul>
            {item.footer ? <p>{item.footer}</p> : null}
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
