import styles from "./styles.module.css";
import Image from "next/image";
import GoogleBadge from "../GoogleBadge";
import Link from "next/link";
import BookBtn from "../BookBtn";
import CallBtn from "../CallBtn";

function getHeroLinks(city) {
  const service = (category, serviceSlug) =>
    city
      ? `/service/${category}/${serviceSlug}/${city}`
      : `/service/${category}/${serviceSlug}`;
  const category = (categorySlug) =>
    city
      ? `/service/${categorySlug}/service-area/${city}`
      : `/service/${categorySlug}`;

  return {
    noPower: service("electrical", "electrical-repair"),
    noHeat: category("heating"),
    noCooling: category("cooling"),
  };
}

export default function HomeHero({ city }) {
  const cityLabel = city ? city.replace(/-/g, " ") : "";
  const links = getHeroLinks(city);

  return (
    <div className={styles.hero}>
      <div className={styles.heroImage}>
        <Image
          src="/homeHero.jpg"
          alt=""
          width={500}
          height={450}
          className="w-[50%] h-[450px] object-cover absolute top-0 right-0"
        />
      </div>
      <div className={styles.heroContent}>
        <div className={styles.heroContentInner}>
          <h1 className={styles.heroTitle}>
            One Call. Complete Home Comfort &amp; Power Solutions
          </h1>
          <p className={styles.heroDescription}>
            We handle electrical, heating, cooling, and air quality — so
            homeowners don&apos;t need multiple companies.
          </p>
          {cityLabel ? (
            <p className={styles.heroDescription}>
              Serving {cityLabel} and surrounding communities.
            </p>
          ) : null}

          <ul className={styles.quickLinks} aria-label="Common problems">
            <li>
              <Link href={links.noPower} className={styles.quickLink}>
                👉 No power
              </Link>
            </li>
            <li>
              <Link href={links.noHeat} className={styles.quickLink}>
                👉 No heat
              </Link>
            </li>
            <li>
              <Link href={links.noCooling} className={styles.quickLink}>
                👉 No cooling
              </Link>
            </li>
          </ul>

          <p className={styles.heroTagline}>
            You need one team that can handle it all.
          </p>

          <div className={styles.heroButtonContainer}>
            <CallBtn label="Call Now" />
            <BookBtn label="Book Service" />
          </div>
          <GoogleBadge />
        </div>
      </div>
    </div>
  );
}
