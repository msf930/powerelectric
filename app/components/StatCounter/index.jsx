"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

export default function StatCounter({ from = 0, to, duration = 2 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(from);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        observer.disconnect();

        const start = performance.now();
        const delta = to - from;

        const tick = (now) => {
          const progress = Math.min((now - start) / (duration * 1000), 1);
          const eased = 1 - (1 - progress) ** 3;
          setDisplay(Math.round(from + delta * eased));
          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [from, to, duration]);

  return (
    <span ref={ref} className={styles.statCounter}>
      {display}
    </span>
  );
}
