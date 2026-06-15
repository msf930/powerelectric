import styles from "./styles.module.css";

export default function HomeReviewSnippets({ snippets = [] }) {
  if (!snippets.length) return null;

  return (
    <section className={styles.section} aria-label="Customer reviews">
      <div className={styles.inner}>
        <h2 className={styles.heading}>What Our Customers Say</h2>
        <div className={styles.grid}>
          {snippets.map((s) => (
            <blockquote key={s.id} className={styles.card}>
              <div className={styles.cardTop}>
                {s.photo ? (
                  <img
                    src={s.photo}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.avatar}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className={styles.avatarPlaceholder} aria-hidden />
                )}
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
