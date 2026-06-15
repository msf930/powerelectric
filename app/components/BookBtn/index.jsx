"use client";

import Link from "next/link";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";

const BOOK_BUTTON_QUERY = `*[_type == "bookButton"][0]{ link }`;

export default function BookBtn({ label = "Book Now", link: linkProp }) {
  const [link, setLink] = useState(linkProp ?? null);

  useEffect(() => {
    if (linkProp) {
      setLink(linkProp);
      return;
    }

    let cancelled = false;
    import("../../../sanity/lib/client").then(({ client }) => {
      client.fetch(BOOK_BUTTON_QUERY).then((data) => {
        if (!cancelled && data?.link) setLink(data.link);
      });
    });

    return () => {
      cancelled = true;
    };
  }, [linkProp]);

  if (!link) return null;

  return (
    <Link href={link} className={styles.bookBtn}>
      {label}
    </Link>
  );
}
