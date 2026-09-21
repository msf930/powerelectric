"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const HomeForm = dynamic(() => import("./index"), { ssr: false });

export default function LazyHomeForm(props) {
  const ref = useRef(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={load ? undefined : { minHeight: 520 }}>
      {load ? <HomeForm {...props} /> : null}
    </div>
  );
}
