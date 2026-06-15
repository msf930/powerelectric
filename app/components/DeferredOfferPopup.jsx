"use client";

import dynamic from "next/dynamic";

const OfferPopup = dynamic(() => import("./OfferPopup"), { ssr: false });

export default function DeferredOfferPopup() {
  return <OfferPopup />;
}
