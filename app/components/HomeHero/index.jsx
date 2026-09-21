import { preload } from "react-dom";
import { getImageProps } from "next/image";
import styles from "./styles.module.css";
import GoogleBadge from "../GoogleBadge";
import Link from "next/link";
import BookBtn from "../BookBtn";
import CallBtn from "../CallBtn";
import homeHeroImage from "../../../public/homeHero.jpg";

const HERO_LINKS = {
  noPower: "/service/electrical",
  noHeat: "/service/heating",
  noCooling: "/service/cooling",
};

const HERO_IMAGE_SIZES = "50vw";
const DESKTOP_HERO_MEDIA = "(min-width: 768px)";

export default function HomeHero({ widget, bookLink, callNumber }) {
  const {
    props: { srcSet: heroSrcSet, src: heroSrc },
  } = getImageProps({
    src: homeHeroImage,
    alt: "",
    fill: true,
    sizes: HERO_IMAGE_SIZES,
    quality: 50,
  });

  preload(heroSrc, {
    as: "image",
    imageSrcSet: heroSrcSet,
    imageSizes: HERO_IMAGE_SIZES,
    fetchPriority: "high",
    media: DESKTOP_HERO_MEDIA,
  });

  return (
    <div className={styles.hero}>
      <div className={styles.heroImage}>
        <picture>
          <source
            media={DESKTOP_HERO_MEDIA}
            srcSet={heroSrcSet}
            sizes={HERO_IMAGE_SIZES}
          />
          <img
            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            alt=""
            className={styles.heroImg}
            decoding="async"
          />
        </picture>
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

          <ul className={styles.quickLinks} aria-label="Common problems">
            <li>
              <Link href={HERO_LINKS.noPower} className={styles.quickLink}>
                No power
              </Link>
            </li>
            <li>
              <Link href={HERO_LINKS.noHeat} className={styles.quickLink}>
                No heat
              </Link>
            </li>
            <li>
              <Link href={HERO_LINKS.noCooling} className={styles.quickLink}>
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
