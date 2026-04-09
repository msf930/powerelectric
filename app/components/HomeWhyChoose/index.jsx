import styles from "./styles.module.css";

const BULLETS = [
  "Family-Owned & Operated",
  "Fast Response",
  "Electrical + HVAC Experts",
  "Honest Recommendations",
];

export default function HomeWhyChoose() {
  return (
    <section className={styles.section} aria-labelledby="why-choose-heading">
      <div className={styles.inner}>
        <h2 id="why-choose-heading" className={styles.title}>
          Why Choose Us
        </h2>
        <ul className={styles.list}>
          {BULLETS.map((item) => (
            <li key={item} className={styles.item}>
              {item}
            </li>
          ))}
        </ul>
        <p className={styles.tagline}>
          Electrical + HVAC — One Call. One Solution.
        </p>
      </div>
    </section>
  );
}
