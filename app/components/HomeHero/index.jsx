import styles from "./styles.module.css";
import Image from "next/image";
import GoogleBadge from "../GoogleBadge";
import Link from "next/link";
import BookBtn from "../BookBtn";
import CallBtn from "../CallBtn";
import homeHeroImage from "../../../public/homeHero.jpg";
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
    noPower: category("electrical"),
    noHeat: category("heating"),
    noCooling: category("cooling"),
  };
}

export default function HomeHero({ city, widget, bookLink, callNumber }) {
  const cityLabel = city ? city.replace(/-/g, " ") : "";
  const links = getHeroLinks(city);

  return (
    <div className={styles.hero}>
      <div className={styles.heroImage}>
        <Image
          src={homeHeroImage}
          alt=""
          width={500}
          height={600}
          className="w-[50%] h-[600px] object-cover absolute top-0 right-0"
        />
      </div>
      <div className={styles.heroContent}>
        <div className={styles.heroContentInner}>
          <h1 className={styles.heroTitle}>
            Your Heat Is Out. Your Power Is Down. We&apos;re One Call Away.
          </h1>
          <p className={styles.heroDescription}>
            Power Electrical, Heating & Cooling Services is one of the few Denver metro companies handling electrical, HVAC, and indoor air quality under one roof.
            No runaround. No waiting on two different companies. Just fast, honest work from a family-owned team backed by 20+ years in the trade.
            Serving Thornton, Brighton, Denver, Northglenn, Westminster, Broomfield, Commerce City, Arvada, Erie, and the surrounding Denver metro area.
          </p>
          {cityLabel ? (
            <p className={styles.heroDescription}>
              Serving {cityLabel} and surrounding communities.
            </p>
          ) : null}

          <ul className={styles.quickLinks} aria-label="Common problems">
            <li>
              <Link href={links.noPower} className={styles.quickLink}>
                No power
              </Link>
            </li>
            <li>
              <Link href={links.noHeat} className={styles.quickLink}>
                No heat
              </Link>
            </li>
            <li>
              <Link href={links.noCooling} className={styles.quickLink}>
                No cooling
              </Link>
            </li>
          </ul>

          <p className={styles.heroTagline}>
          One call handles it all.
          </p>

          <div className={styles.heroButtonContainer}>
            <CallBtn label="Call Now" number={callNumber} />
            <BookBtn label="Book Service" link={bookLink} />
          </div>
          <GoogleBadge widget={widget} />
        </div>
      </div>
    </div>
  );
}
