"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const GA_MEASUREMENT_ID = "G-7TMYKNHR2T";
const LOAD_DELAY_MS = 6000;
const PODIUM_SRC =
  "https://connect.podium.com/widget.js#ORG_TOKEN=ca9d015d-d28a-4e9d-a4f1-e875bf1b580b";
const PODIUM_TOKEN = "ca9d015d-d28a-4e9d-a4f1-e875bf1b580b";
const PODIUM_SCRIPT_ID = "podium-widget";

function loadPodiumWidget() {
  if (document.getElementById(PODIUM_SCRIPT_ID)) return;

  const script = document.createElement("script");
  script.id = PODIUM_SCRIPT_ID;
  script.src = PODIUM_SRC;
  script.async = true;
  script.setAttribute("data-organization-api-token", PODIUM_TOKEN);
  document.body.appendChild(script);
}

export default function DeferredThirdParty() {
  const pathname = usePathname();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (pathname?.includes("/studio")) return undefined;

    let done = false;
    const enable = () => {
      if (done) return;
      done = true;
      setLoad(true);
    };

    const timer = window.setTimeout(enable, LOAD_DELAY_MS);
    const events = ["pointerdown", "keydown", "touchstart"];
    events.forEach((event) =>
      window.addEventListener(event, enable, { once: true, passive: true })
    );

    return () => {
      window.clearTimeout(timer);
      events.forEach((event) => window.removeEventListener(event, enable));
    };
  }, [pathname]);

  useEffect(() => {
    if (!load || pathname?.includes("/studio")) return undefined;
    loadPodiumWidget();
  }, [load, pathname]);

  if (!load || pathname?.includes("/studio")) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `,
        }}
      />
      <Script
        id="microsoft-clarity"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "wbop021nwj");`,
        }}
      />
    </>
  );
}
