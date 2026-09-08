"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

export default function PodiumWidget() {
  const pathname = usePathname();

  if (pathname?.includes("/studio")) {
    return null;
  }

  return (
    <Script
      strategy="lazyOnload"
      src="https://connect.podium.com/widget.js#ORG_TOKEN=ca9d015d-d28a-4e9d-a4f1-e875bf1b580b"
      id="podium-widget"
      data-organization-api-token="ca9d015d-d28a-4e9d-a4f1-e875bf1b580b"
    />
  );
}
