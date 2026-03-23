import styles from "./styles.module.css";
import Footer from "../components/Footer";
import { client } from "../../sanity/lib/client";
import Image from "next/image";
import BookBtn from "../components/BookBtn";
import CallBtn from "../components/CallBtn";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";
import FinanceCont from "../components/FinanceCont";
import CategoryForm from "../components/CategoryForm";
import NavServer from "../components/Nav/NavServer";
const LOCATIONS_QUERY = `*[_type == "locations"]{
    _id,
    County,
    cities
}`;
export default async function ServiceAreasPage() {
    const serviceAreas = await client.fetch(LOCATIONS_QUERY);
    return (
        <div className={styles.serviceAreasPage}>
            <NavServer city={""} />
            <div className={styles.serviceAreasPageHeader}>
                <Image src="/homeHero.jpg" alt="Power Electrical Services" fill objectFit="cover" />
                <div className={styles.serviceAreasPageHeaderContent}>
                    <h1>Power Electrical Services Service Areas</h1>
                    <div className={styles.serviceAreasPageHeaderButtonContainer}>
                        <BookBtn />
                        <CallBtn />
                    </div>
                </div>
            </div>
            <h1 className={styles.serviceAreasPageTitle}>Service Area </h1>
            <h1 className={styles.serviceAreasPageTitleSub}>Select a Service Area To See Services Available In That Area</h1>
            <div className={styles.serviceAreasPageContent}>
                {serviceAreas.map((serviceArea, index) => (
                    <div key={index} className={styles.serviceArea}>
                        <h2>{serviceArea.County}</h2>
                        <div className={styles.serviceAreaCities}>
                        {serviceArea.cities.map((city, cityIndex) => (
                            <div key={cityIndex} className={styles.serviceAreaCity}>
                                  <FaMapMarkerAlt />  
                                  <Link href={`/location/${city.replace(/\s+/g, "-") ?? ""}`}>{city}</Link>
                                </div>
                            ))}
                        </div>
                       
                    </div>
                ))}
            </div>
            <FinanceCont />
            <CategoryForm />
            <Footer />
        </div>
    )
}