import Link from "next/link";
import { client } from "../../../sanity/lib/client";
import styles from "./styles.module.css";

const CATEGORY_QUERY = `*[_type == "allServices"]{ allServices[]->{ _id, title, slug, subCategories[]->{ _id, title, slug, services[]->{ _id, title, slug } } } }`;

const BLOCKS = [
  {
    title: "Electrical Services",
    list: [
      "Electrical Repairs",
      "Panel Upgrades",
      "Breaker Issues",
      "Wiring & Rewiring",
      "EV Charger Installation",
    ],
    slugFallback: "electrical",
    match: (cat) => /electrical|electric/i.test(cat.title || ""),
  },
  {
    title: "Cooling Services",
    list: [
      "AC Repair",
      "AC Installation",
      "AC Maintenance",
      "Mini Split Installation",
    ],
    slugFallback: "cooling",
    match: (cat) =>
      /cooling|air conditioning|\bac\b/i.test(cat.title || ""),
  },
  {
    title: "Heating Services",
    list: [
      "Furnace Repair",
      "Furnace Installation",
      "Heating Repair",
      "Heat Pump Systems",
    ],
    slugFallback: "heating",
    match: (cat) => /heating|furnace|heat pump/i.test(cat.title || ""),
  },
  // {
  //   title: "Indoor Air Quality (IAQ)",
  //   list: [
  //     "Air Purifiers & UV Systems",
  //     "Filtration Upgrades",
  //     "Humidity Control",
  //     "Ventilation Solutions",
  //   ],
  //   slugFallback: "indoor-air-quality",
  //   match: (cat) =>
  //     /air quality|iaq|indoor air|humid/i.test(cat.title || ""),
  // },
  // {
  //   title: "Holiday Lighting",
  //   list: [
  //     "Custom Lighting Design",
  //     "Safe, Professional Installation",
  //     "Timers & Clean Setup",
  //     "Post-Season Removal",
  //   ],
  //   slugFallback: "holiday-lighting",
  //   match: (cat) => /holiday|christmas/i.test(cat.title || ""),
  // },
];

function categoryHref(slug, city) {
  const s = (slug || "").replace(/^\//, "");
  if (!s) return "/";
  if (city) return `/service/${s}/service-area/${city}`;
  return `/service/${s}`;
}

export default async function HomeServiceCategories({ city = "" }) {
  let categories = [];
  try {
    categories = await client.fetch(CATEGORY_QUERY);
    console.log(categories);
  } catch {
    categories = [];
  }

  const used = new Set();
  const rows = categories[0].allServices.map((block) => {
    return {
      key: block.slug.current,
      title: block.subCategories[0].title,
      list: block.subCategories[0].services.map((service) => ({ title: service.title, slug: service.slug.current })),
      href: categoryHref(block.slug.current, city)
    };
  });

  return (
    <section className={styles.section} aria-labelledby="home-services-heading">
      <div className={styles.inner}>
        <h2 id="home-services-heading" className={styles.mainTitle}>
          Our Services
        </h2>
        <div className={styles.grid}>
          {rows.map((row) => (
            <div key={row.key} className={styles.card}>
              <h3 className={styles.cardTitle}>{row.title}</h3>
              <ul className={styles.list}>
                {row.list.map((item) => (
                  <li key={item}>
                    <Link href={`/service/${item.slug}${city ? `/${city}` : ''}`}>{item.title}</Link>
                  </li>
                ))}
              </ul>
              <Link href={row.href} className={styles.cta}>
                View Services
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
