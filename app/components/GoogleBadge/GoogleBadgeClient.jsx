"use client";

import { useEffect, useState } from "react";
import { FEATURABLE_API_URL } from "../../../lib/featurable";
import GoogleBadgeDisplay from "./GoogleBadgeDisplay";

export default function GoogleBadgeClient() {
  const [widget, setWidget] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchWidget() {
      try {
        const res = await fetch(FEATURABLE_API_URL);
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && data?.success && data?.widget) {
          setWidget(data.widget);
        }
      } catch {
        /* optional badge */
      }
    }
    fetchWidget();
    return () => {
      cancelled = true;
    };
  }, []);

  return <GoogleBadgeDisplay widget={widget} />;
}
