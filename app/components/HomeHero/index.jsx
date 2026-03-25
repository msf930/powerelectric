
import styles from "./styles.module.css";
import Image from "next/image";
import GoogleBadge from "../GoogleBadge";
import Link from "next/link";
import BookBtn from "../BookBtn";
import CallBtn from "../CallBtn";
export default function HomeHero( { city } ) {
  
  return (
    <div className={styles.hero}>
      <div className={styles.heroImage}>
        <Image src="/homeHero.jpg" alt="Hero" width={500} height={450} className="w-[50%] h-[450px] object-cover absolute top-0 right-0" />
      </div>
        <div className={styles.heroContent}>
          <div className={styles.heroContentInner}>
            <h1 className={styles.heroTitle}>Power Electrical Services {city ? `in ${city.replace(/-/g, " ")}` : ""}</h1>
            <p className={styles.heroDescription}>We provide a wide range of professional services to meet your needs. We promise to provide every service with a smile, and to your highest level of satisfaction.</p>
           
            <GoogleBadge />
            <div className={styles.heroButtonContainer}>
              <BookBtn />
              <CallBtn />
              <Link href={`/instant-quote${city ? `/${city}` : ""}`} className={styles.heroButton}>Get a Quote</Link>
            </div>

          </div>
        </div>
    </div>
  );
}