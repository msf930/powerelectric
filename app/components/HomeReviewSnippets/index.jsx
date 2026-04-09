"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.css";

const WIDGET_API_URL =
  "https://featurable.com/api/v2/widgets/2e211976-a45b-49e0-bf80-c706b35c50a8";

function truncate(text, max = 220) {
  if (!text || text.length <= max) return text || "";
  return text.slice(0, max).trim() + "…";
}

function reviewPhotoUrl(r) {
  const a = r?.author;
  if (!a) return "";
  return (
    a.avatarUrl ??
    a.photoUrl ??
    a.profilePhotoUrl ??
    a.imageUrl ??
    (typeof a.image === "string" ? a.image : a.image?.url) ??
    ""
  );
}

function ReviewAvatar({ src }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return <span className={styles.avatarPlaceholder} aria-hidden />;
  }
  return (
    <img
      src={src}
      alt=""
      width={40}
      height={40}
      className={styles.avatar}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}

export default function HomeReviewSnippets() {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(WIDGET_API_URL);

        if (!res.ok) return;
        const data = await res.json();
        const w = data?.widget;
        const raw = w?.reviews ?? [];
        const mapped = raw.slice(0, 3).map((r) => {
          const fullName = r.author?.name ?? "Customer";
          const parts = fullName.trim().split(/\s+/);
          let displayName = fullName;
          if (parts.length >= 2) {
            displayName = `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`;
          }
          return {
            id: r.id ?? displayName,
            displayName,
            comment: truncate(r.text ?? ""),
            photo: reviewPhotoUrl(r),
            stars: r.rating?.value ?? 5,
          };
        });
        if (!cancelled) setSnippets(mapped);
      } catch {
        /* optional section */
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (snippets.length === 0) return null;

  return (
    <section className={styles.section} aria-label="Customer reviews">
      <div className={styles.inner}>
        <h2 className={styles.heading}>What Our Customers Say</h2>
        <div className={styles.grid}>
          {snippets.map((s) => (
            <blockquote key={s.id} className={styles.card}>
              <div className={styles.cardTop}>
                <ReviewAvatar src={s.photo} />
                <div>
                  <cite className={styles.name}>{s.displayName}</cite>
                  <div className={styles.stars} aria-hidden>
                    {Array.from({ length: s.stars }, (_, i) => (
                      <span key={i} className={styles.star}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className={styles.quote}>{s.comment}</p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
