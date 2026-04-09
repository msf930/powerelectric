"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import { client } from "../../../sanity/lib/client";

const CALL_BUTTON_QUERY = `*[_type == "callButton"][0]{
  _id,
  number
}`;

export default function StickyMobileCall() {
  const [number, setNumber] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await client.fetch(CALL_BUTTON_QUERY);
        if (!cancelled && data?.number) setNumber(data.number);
      } catch {
        /* optional */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!number) return null;

  return (
    <div className={styles.bar}>
      <Link href={`tel:${number}`} className={styles.btn}>
        Call Now
      </Link>
    </div>
  );
}
