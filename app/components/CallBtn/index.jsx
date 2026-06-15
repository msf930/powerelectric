"use client";

import Link from "next/link";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";

const CALL_BUTTON_QUERY = `*[_type == "callButton"][0]{ number }`;

function formatPhoneDisplay(number) {
  if (!number) return "";
  const digits = number.replace(/\D/g, "").replace(/^\+1/, "");
  if (digits.length < 10) return number;
  return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
}

export default function CallBtn({ label, number: numberProp }) {
  const [number, setNumber] = useState(numberProp ?? null);

  useEffect(() => {
    if (numberProp) {
      setNumber(numberProp);
      return;
    }

    let cancelled = false;
    import("../../../sanity/lib/client").then(({ client }) => {
      client.fetch(CALL_BUTTON_QUERY).then((data) => {
        if (!cancelled && data?.number) setNumber(data.number);
      });
    });

    return () => {
      cancelled = true;
    };
  }, [numberProp]);

  if (!number) return null;

  return (
    <Link href={`tel:${number}`} className={styles.callBtn}>
      {label ?? formatPhoneDisplay(number)}
    </Link>
  );
}
