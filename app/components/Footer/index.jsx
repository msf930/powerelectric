import styles from "./styles.module.css";
import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import CallBtn from "../CallBtn";
import BookBtn from "../BookBtn";
import LazyGoogleMap from "../GoogleMap/LazyGoogleMap";

export default function Footer({ bookLink = null, callNumber = null }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerMeta}>
        <div className={styles.footerTrustBadges} role="list" aria-label="Trust badges">
          <span className={styles.trustBadge} role="listitem">
            Best of Business
          </span>
          <span className={styles.trustBadge} role="listitem">
            Housecall Pro Super Pro
          </span>
          <span className={styles.trustBadge} role="listitem">
            BBB Accredited
          </span>
        </div>
        <nav className={styles.footerSocials} aria-label="Social links">
          <a
            href="https://www.facebook.com/Powereletricalservices/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerSocialLink}
          >
            Facebook
          </a>
          <a
            href="https://www.instagram.com/power_electrical_hvac_services/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerSocialLink}
          >
            Instagram
          </a>
          <a
            href="https://www.tiktok.com/@powerelectricalhvac"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerSocialLink}
          >
            TikTok
          </a>
          <a
            href="https://www.yelp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerSocialLink}
          >
            Yelp
          </a>
          <a
            href="https://nextdoor.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerSocialLink}
          >
            Nextdoor
          </a>
          <a
            href="https://www.bbb.org/us/co/denver/profile/electrical-contractors/power-electrical-services-1296-1000125617"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerSocialLink}
          >
            BBB
          </a>
        </nav>
      </div>
      <div className={styles.footerStrip}>
        <div className={styles.footerStripInner}>
          <div className={styles.footerStripInnerContentLeft}>
            <Image
              src="/PESLogo.png"
              alt="Power Electrical Services"
              width={300}
              height={100}
              className={styles.footerStripInnerContentLeftImage}
            />
            <Image
              src="/PESLogo.png"
              alt="Power Electrical Services"
              width={500}
              height={500}
              className={styles.footerStripInnerContentLeftImageMobile}
            />
            <div className={styles.footerStripInnerContentLeftButtonContainer}>
              <BookBtn link={bookLink} />
              <CallBtn number={callNumber} />
            </div>
          </div>
          <div className={styles.footerStripInnerContentCenter}>
            <div className={styles.locationsCont}>
              <LazyGoogleMap className={styles.locationsContMap} />
              <Link
                className={styles.locationsContMessage}
                href="https://maps.app.goo.gl/Lw2x8JKXuSi5YrMq9"
                target="_blank"
              >
                <FaMapMarkerAlt /> 5650 N Washington St. Unit C-6 Denver, CO 80216
              </Link>
            </div>
          </div>
          <div className={styles.footerStripInnerContentRight}>
            <div className={styles.footerStripInnerContentRightImagesContainer}>
              <Image
                src="/apartmentassociationLogo.png"
                alt="apartment association logo"
                width={150}
                height={150}
                className={styles.footerStripInnerContentRightImage}
              />
              <Image
                src="/googleGarrunteedLogo.png"
                alt="apartment association logo"
                width={150}
                height={150}
                className={styles.footerStripInnerContentRightImage}
              />
              <Image
                src="/clipaLogo.png"
                alt="apartment association logo"
                width={150}
                height={150}
                className={styles.footerStripInnerContentRightImage}
              />
              <Image
                src="/EATONLogo.png"
                alt="apartment association logo"
                width={150}
                height={150}
                className={styles.footerStripInnerContentRightImage}
              />
            </div>
            <p className={styles.footerStripInnerContentRightMessage}>
              © Power Electrical Services {new Date().getFullYear()}
            </p>
          </div>
        </div>
        <div className={styles.footerStripContent}></div>
        <div className={styles.footerStripImage} aria-hidden />
      </div>
    </footer>
  );
}
