import Link from "next/link";
import styles from "./styles.module.css";

const TOP_LINKS = [
  {
    label: "Electrical Repair",
    description: "Fast Diagnostics + Same-Day Service",
    href: "/service/electrical/electrical-repair-services-you-can-trust",
  },
  {
    label: "Panel Upgrades",
    description: "Safe, Code-Compliant Upgrades",
    href: "/service/electrical/electrical-panel-upgrade--replacement-services",
  },
  {
    label: "EV Charger Installation",
    description: "Level 2 Charger + Same-Day Evaluations",
    href: "/service/electrical/ev-charger-installation-services",
  },
  {
    label: "Heating Services",
    description: "Furnace, Heat Pump & More",
    href: "/service/heating",
  },
  {
    label: "Furnace Repair",
    description: "Fast, Reliable Heat Restored",
    href: "/service/heating/furnace-repair-services",
  },
  {
    label: "Cooling Services",
    description: "AC, Mini Split & More",
    href: "/service/cooling",
  },
  {
    label: "AC Maintenance",
    description: "Inspections, Tune-Ups & Cleaning",
    href: "/service/cooling/ac-maintenance-services",
  },
  {
    label: "Membership Plans",
    description: "Starting at $14/Month",
    href: "/membership",
  },
];

export default function TopLinks() {
  return (
    <section className={styles.section} aria-labelledby="top-links-heading">
      <div className={styles.inner}>
        <h2 id="top-links-heading" className={styles.sectionTitle}>
          What Do You Need Help With?
        </h2>
        <ul className={styles.list}>
          {TOP_LINKS.map((item) => (
            <li key={item.label} className={styles.item}>
              <Link href={item.href} className={styles.link}>
                <span className={styles.label}>{item.label}:</span>{" "}
                <span className={styles.description}>{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
