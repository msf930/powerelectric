"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeferredOfferPopup() {
  const pathname = usePathname();
  const [Popup, setPopup] = useState(null);

  useEffect(() => {
    if (pathname?.includes("/studio")) return undefined;
    if (Popup) return undefined;

    let cancelled = false;
    const enable = () => {
      import("./OfferPopup").then((mod) => {
        if (!cancelled) setPopup(() => mod.default);
      });
    };

    if (window.scrollY > 0) {
      enable();
      return undefined;
    }

    window.addEventListener("scroll", enable, { once: true, passive: true });
    return () => {
      cancelled = true;
      window.removeEventListener("scroll", enable);
    };
  }, [pathname, Popup]);

  if (!Popup) return null;

  return <Popup />;
}
