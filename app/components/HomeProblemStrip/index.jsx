import styles from "./styles.module.css";

export default function HomeProblemStrip() {
  return (
    <section className={styles.strip} aria-label="Common problems we solve">
      <div className={styles.inner}>
        <p className={styles.line}>
          Power Out? No Heat? AC Not Working? We Can Help.
        </p>
      </div>
    </section>
  );
}
