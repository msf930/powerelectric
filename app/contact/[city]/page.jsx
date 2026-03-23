import styles from "./styles.module.css";
import Image from "next/image";
import BookBtn from "../../components/BookBtn";
import CallBtn from "../../components/CallBtn";
import Footer from "../../components/Footer";
import { client } from "../../../sanity/lib/client";
import ContactFormClient from "./ContactFormClient";
import ContactMapClient from "./ContactMapClient";
import NavServer from "../../components/Nav/NavServer";

const CONTACT_QUERY = `*[_type == "contact"][0]{
    _id,
    accessString,
    serviceItems[]->{
        _id,
        title,
        imagePrimary,
        bookNowText,
        slug
    }
}`;
const CALL_BUTTON_QUERY = `*[_type == "callButton"][0]{
    _id,
    number
}`;
export default async function ContactCityPage({ params }) {
  const { city } = await params;
  const [contactData, callButton] = await Promise.all([
    client.fetch(CONTACT_QUERY),
    client.fetch(CALL_BUTTON_QUERY),
  ]);

  const phoneNumber = callButton?.number ?? "";
  const accessKey = contactData?.accessString ?? "";

  return (
    <>
    <NavServer city={city} />
      <div className={styles.homeFormContOuter}>
        <ContactFormClient accessKey={accessKey} phoneNumber={phoneNumber} city={city} />
        <div className={styles.contactPageRightContainer}>
          <ContactMapClient />
          <div className={styles.contactPageRightContainerInner}>
            <h3 className={styles.contactPageRightContainerInnerTitle}>
              Non-Emergency Requests
            </h3>
            <p className={styles.contactPageRightContainerInnerDescription}>
              Let us know how we can assist you. Please include any details about
              your needs or the issue you&apos;re experiencing. You can reach us
              by filling out the form on this page, scheduling on our button or
              call us!
            </p>
            <div className={styles.contactPageRightContainerInnerButtonContainer}>
              <BookBtn />
              <CallBtn />
            </div>
            <div className={styles.contactPageRightContainerInnerEmergencyButtonContainer}>
              <h3 className={styles.contactPageRightContainerInnerEmergencyButtonContainerTitle}>
                Emergency Services
              </h3>
              <p className={styles.contactPageRightContainerInnerEmergencyButtonContainerDescription}>
                For immediate assistance, please call us directly at:
              </p>
              <CallBtn />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
