import styles from "./styles.module.css";
import BookBtn from "../BookBtn";
import { FaMapMarkerAlt } from "react-icons/fa";
import CallBtn from "../CallBtn";
import Link from "next/link";
import LazyGoogleMap from "../GoogleMap/LazyGoogleMap";

const SERVICE_AREAS_NEW = [
  "Thornton",
  "Brighton",
  "Denver",
  "Northglenn",
  "Westminster",
  "Broomfield",
  "Commerce City",
  "Arvada",
  "Erie",
  "Aurora",
  "Lakewood",
  "Wheat Ridge",
  "Centennial",
  "Littleton",
  "Englewood",
  "Greenwood Village",
  "Highlands Ranch",
  "Golden",
];

export default function LocationsCont({
  bookLink = null,
  callNumber = null,
}) {
  return (
    <div className={styles.locationsContOuter}>
      <div className={styles.locationsCont}>
        <h2 className={styles.locationsContTitleMobile}>Locations</h2>
        <LazyGoogleMap className={styles.locationsContMap} />
        <Link
          className={styles.locationsContAddressLink}
          href="https://maps.app.goo.gl/Lw2x8JKXuSi5YrMq9"
          target="_blank"
        >
          <FaMapMarkerAlt /> 5650 Washington St. Unit C-6 Denver, CO 80216
        </Link>
      </div>
      <div className={styles.locationsContInfo}>
        <h2 className={styles.locationsContTitle}>Areas we Serve</h2>
        <div className={styles.locationsContList}>
          {SERVICE_AREAS_NEW.map((location) => (
            <span
              key={location}
              className={styles.locationsContItemContentItem}
            >
              <FaMapMarkerAlt aria-hidden />
              {location}
            </span>
          ))}
        </div>
        <Link
          href="/service-areas"
          className={styles.locationsContItemContentLink}
        >
          See All Locations
        </Link>
        <div className={styles.locationsContBookButtonCont}>
          <BookBtn link={bookLink} />
          <CallBtn number={callNumber} />
        </div>
      </div>
    </div>
  );
}
