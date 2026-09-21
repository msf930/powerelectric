"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const GA_MEASUREMENT_ID = "G-7TMYKNHR2T";
const PODIUM_SRC =
  "https://connect.podium.com/widget.js#ORG_TOKEN=ca9d015d-d28a-4e9d-a4f1-e875bf1b580b";
const PODIUM_TOKEN = "ca9d015d-d28a-4e9d-a4f1-e875bf1b580b";
const PODIUM_SCRIPT_ID = "podium-widget";

function injectScript(src, { id, attrs } = {}) {
  if (id && document.getElementById(id)) return;
  const script = document.createElement("script");
  if (id) script.id = id;
  script.src = src;
  script.async = true;
  if (attrs) {
    Object.entries(attrs).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });
  }
  document.body.appendChild(script);
}

function loadThirdPartyScripts() {
  if (window.__pesThirdPartyLoaded) return;
  window.__pesThirdPartyLoaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);
  injectScript(
    `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  );

  injectScript("https://www.clarity.ms/tag/wbop021nwj");

  injectScript(PODIUM_SRC, {
    id: PODIUM_SCRIPT_ID,
    attrs: { "data-organization-api-token": PODIUM_TOKEN },
  });
}

export default function DeferredThirdParty() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.includes("/studio")) return undefined;

    const enable = () => loadThirdPartyScripts();
    const events = ["pointerdown", "keydown", "touchstart"];
    events.forEach((event) =>
      window.addEventListener(event, enable, { once: true, passive: true })
    );

    return () => {
      events.forEach((event) => window.removeEventListener(event, enable));
    };
  }, [pathname]);

  return null;
}
