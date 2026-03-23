"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useMotionValueEvent, animate } from "framer-motion";

export default function StatCounter({
  from = 0,
  to,
  duration = 2,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(from);
  const [display, setDisplay] = useState(from);

  useMotionValueEvent(count, "change", (latest) => {
    setDisplay(Math.round(latest));
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, {
        duration,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, to, duration, count]);

  return (
    <motion.span ref={ref}>
      {display}
    </motion.span>
  );
}