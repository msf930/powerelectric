import Link from "next/link";
import { client } from "../../../sanity/lib/client";
import styles from "./styles.module.css";

/** Matches sanity/schemaTypes/homePage.ts — one linkTitle + link per document. */
const HOME_TOP_LINKS_QUERY = `*[_type == "homePage"] | order(_updatedAt desc) {
  _id,
  linkTitle,
  link
}`;

export default async function TopLinks() {
  const rows = await client.fetch(HOME_TOP_LINKS_QUERY);
  const links = (rows ?? []).filter(
    (row) =>
      row?.linkTitle &&
      typeof row.link === "string" &&
      row.link.trim() !== ""
  );

  if (links.length === 0) return null;

  return (
    <section className={styles.section} aria-label="Quick links">
      <h2 className={styles.sectionTitle}>Quick Links</h2>
      <div className={styles.inner}>
        <nav className={styles.nav}>
          {rows?.map((item) => (
            <Link key={item._id} href={item.link ? item.link.trim() : ``} className={styles.button}>
              {String(item.linkTitle).trim()}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
