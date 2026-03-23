import styles from "./styles.module.css";

export default function ParallaxStrip() {
  return (
    <div className={styles.parallaxStrip}>
        <div className={styles.parallaxStripContent}></div>
      <div className={styles.parallaxStripImage} aria-hidden />
    </div>
  );
}
