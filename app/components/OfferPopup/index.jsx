"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiX } from "react-icons/hi";
import styles from "./styles.module.css";

const STORAGE_KEY = "pes-offer-popup-dismissed";
const SHOW_DELAY_MS = 8000;
const PHONE_DISPLAY = "(720) 272-2562";
const PHONE_HREF = "tel:+17202722562";

export default function OfferPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (pathname?.includes("/studio")) return;

    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (dismissed) return;

    const timer = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className={styles.backdrop}
      role="presentation"
      onClick={close}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="offer-popup-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.close}
          onClick={close}
          aria-label="Close offer"
        >
          <HiX aria-hidden />
        </button>

        <p className={styles.eyebrow}>Limited time</p>
        <h2 id="offer-popup-title" className={styles.title}>
          Save $35 On Your Next Service
        </h2>
        <p className={styles.businessName}>
          Power Electrical, Heating &amp; Cooling Services
        </p>
        <p className={styles.tagline}>
          Electrical + HVAC + IAQ | One Call Handles It All
        </p>

        <p className={styles.offer}>$35 Off Any Electrical, HVAC, or IAQ Service</p>

        <p className={styles.disclaimer}>
          New and existing customers welcome. One coupon per household. Cannot be
          combined with other offers.
        </p>

        <div className={styles.actions}>
          <Link href="/instant-quote" className={styles.primaryCta} onClick={close}>
            Claim This Offer
          </Link>
          <Link href="/contact" className={styles.secondaryCta} onClick={close}>
            Book Now
          </Link>
        </div>

        <p className={styles.call}>
          Call Us:{" "}
          <Link href={PHONE_HREF} className={styles.phoneLink}>
            {PHONE_DISPLAY}
          </Link>
        </p>

        <p className={styles.footer}>
          No expiration. Just mention this offer when you call or book.
        </p>
      </div>
    </div>
  );
}
