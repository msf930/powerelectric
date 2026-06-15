"use client";

import Link from "next/link";
import styles from "./styles.module.css";

export default function StickyMobileCall({ number }) {
  if (!number) return null;

  return (
    <div className={styles.bar}>
      <Link href={`tel:${number}`} className={styles.btn}>
        Call Now
      </Link>
    </div>
  );
}
