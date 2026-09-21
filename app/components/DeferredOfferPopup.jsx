"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const OfferPopup = dynamic(() => import("./OfferPopup"), { ssr: false });
const LOAD_DELAY_MS = 8000;

export default function DeferredOfferPopup() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), LOAD_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  if (!ready) return null;

  return <OfferPopup />;
}
