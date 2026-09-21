"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const GA_MEASUREMENT_ID = "G-7TMYKNHR2T";
const PODIUM_SRC =
  "https://connect.podium.com/widget.js#ORG_TOKEN=ca9d015d-d28a-4e9d-a4f1-e875bf1b580b";
const PODIUM_TOKEN = "ca9d015d-d28a-4e9d-a4f1-e875bf1b580b";
const PODIUM_SCRIPT_ID = "podium-widget";
const PODIUM_DELAY_MS = 2500;

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

function loadPodium() {
  if (window.__pesPodiumLoaded) return;
  window.__pesPodiumLoaded = true;
  injectScript(PODIUM_SRC, {
    id: PODIUM_SCRIPT_ID,
    attrs: { "data-organization-api-token": PODIUM_TOKEN },
  });
}

function loadAnalytics() {
  if (window.__pesAnalyticsLoaded) return;
  window.__pesAnalyticsLoaded = true;

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
}

export default function DeferredThirdParty() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.includes("/studio")) return undefined;

    const onInteract = () => {
      loadPodium();
      loadAnalytics();
    };
    const events = ["pointerdown", "keydown", "touchstart"];
    events.forEach((event) =>
      window.addEventListener(event, onInteract, { once: true, passive: true })
    );

    let idleId;
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(loadPodium, {
        timeout: PODIUM_DELAY_MS,
      });
    }
    const timer = window.setTimeout(loadPodium, PODIUM_DELAY_MS);

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, onInteract)
      );
      if (idleId != null && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      window.clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
