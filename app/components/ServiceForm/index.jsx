"use client";
import styles from "./styles.module.css";
import { HCaptcha } from "@hcaptcha/react-hcaptcha";
import { useState, useEffect } from "react";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/sanityImageUrl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BookBtn from "../BookBtn";
const CAROUSEL_INTERVAL_MS = 4000;

const CONTACT_QUERY = `*[_type == "contact"][0]{
    _id,
    accessString,
    image { asset->{ _id, url } },
   
}`;
export default function CategoryForm({ serviceName }) {

    const onHCaptchaChange = (token) => {
        setValue("h-captcha-response", token);
    };
    const [contactData, setContactData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await client.fetch(CONTACT_QUERY);
            setContactData(data);
            
        };
        fetchData();
    }, []);

    const serviceItems = contactData?.serviceItems ?? [];
    useEffect(() => {
        if (serviceItems.length <= 1) return;
        const id = setInterval(
            () => setCarouselIndex((i) => (i + 1) % serviceItems.length),
            CAROUSEL_INTERVAL_MS
        );
        return () => clearInterval(id);
    }, [serviceItems.length]);
    return (
        <div className={styles.homeFormContOuter}>

            <div className={styles.homeFormCont}>

                <form action="https://api.web3forms.com/submit" method="POST" className={styles.homeFormContForm}>
                    <div className={styles.homeFormContInner}>
                        <h2 className={styles.homeFormContTitle}>Get In Touch</h2>
                        <input type="hidden" name="access_key" value={contactData?.accessString ?? ""} />
                        <div className={styles.homeFormContInputCont}>
                            <p className={styles.homeFormContInputContLabel}>Name *</p>
                            <input type="text" required name="name" />
                        </div>
                        <div className={styles.homeFormContInputContRow}>
                            <div className={styles.homeFormContInputCont}>
                                <p className={styles.homeFormContInputContLabel}>Email *</p>
                                <input type="email" required name="email" />
                            </div>
                            <div className={styles.homeFormContInputCont}>
                                <p className={styles.homeFormContInputContLabel}>Phone *</p>
                                <input type="phone" required name="phone" />
                            </div>
                        </div>
                        <div className={styles.homeFormContInputCont}>
                            <p className={styles.homeFormContInputContLabel}>Message *</p>
                            <textarea required name="message" />
                        </div>
                        <div className={styles.homeFormContInputContRow}>
                            <div className={styles.homeFormContInputCont}>
                                <p className={styles.homeFormContInputContLabel}>How Did You Hear About Us?</p>
                                <input type="text" name="howDidYouHearAboutUs" />
                            </div>
                            <div className={styles.homeFormContCheckCont}>
                                <input type="checkbox" id="previousClient" name="previousClient" />
                                <p className={styles.homeFormContCheckContLabel}>I am a previous client</p>
                            </div>
                        </div>
                        <div className={styles.hCaptchaCont}>
                            <HCaptcha
                                sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                                reCaptchaCompat={false}
                                onVerify={onHCaptchaChange}
                                theme="light"
                            />
                        </div>
                        <button className={styles.homeFormContSubmitButton} type="submit">Submit</button>
                    </div>
                </form>
                <div className={styles.homeFormInfoContainer}>
                    <h2 className={styles.homeFormInfoTitle}>Your {serviceName} Process</h2>
                    <div className={styles.homeFormInfoListContainer}>
                        <ul className={styles.homeFormInfoList}>
                            <li>Rapid emergency response within hours</li>
                            <li>Comprehensive system diagnosis and assessment</li>
                            <li>Transparent pricing with detailed explanations</li>
                            <li>Expert repair using quality replacement parts</li>
                            <li>Thorough testing and performance verification</li>
                            <li>Professional cleanup and maintenance recommendations</li>
                            <li>Follow up service to ensure continued operation</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    )
}