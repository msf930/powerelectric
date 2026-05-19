import styles from "./styles.module.css";

const REASONS = [
  {
    label: "Family-Owned & Operated",
    description:
      "You're calling a real local business. When you reach us, you're talking to someone who genuinely cares about the work and about your home",
  },
  {
    label: "20+ Years in the Trade",
    description:
      "Licensed since 2007, serving Denver metro homeowners with honest, code-compliant electrical and HVAC work",
  },
  {
    label: "Fast Response Times",
    description:
      "Electrical and HVAC problems don't wait. We move quickly so you're not left without power or comfort",
  },
  {
    label: "Electrical + HVAC Under One Roof",
    description:
      "Most companies do one or the other. We do both | One call, one team, one invoice",
  },
  {
    label: "Honest Recommendations",
    description:
      "We tell you what your home actually needs. No upselling, no unnecessary work, no surprises on your bill",
  },
  {
    label: "5.0 Rating | 202+ Reviews",
    description: "Our customers speak for themselves",
  },
];

export default function HomeWhyChoose() {
  return (
    <section className={styles.section} aria-labelledby="why-choose-heading">
      <div className={styles.inner}>
        <h2 id="why-choose-heading" className={styles.title}>
          Why Homeowners Choose Power Electrical, Heating &amp; Cooling Services
        </h2>
        <ul className={styles.list}>
          {REASONS.map((item) => (
            <li key={item.label} className={styles.item}>
              <span className={styles.label}>{item.label}:</span>{" "}
              <span className={styles.description}>{item.description}</span>
            </li>
          ))}
        </ul>
        <p className={styles.tagline}>We Put The Power In Your Project!</p>
      </div>
    </section>
  );
}
