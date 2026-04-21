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
    serviceItems[]->{
        _id,
        title,
        imagePrimary,
        bookNowText,
        slug
    }
}`;
export default function HomeForm({ city = "" }) {
    const onHCaptchaChange = (token) => {
        setValue("h-captcha-response", token);
    };
    const [contactData, setContactData] = useState(null);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const router = useRouter();
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
            <div className={styles.stripeCont}>
                <div className={styles.stripeTop}></div>
                <div className={styles.stripeBottom}></div>
                <div className={styles.stripeContent}>
                    <h1 className={styles.stripeContentTitle}>We Put The Power In Your Project</h1>
                </div>
            </div>
            <div className={styles.homeFormCont}>
                <form action="https://api.web3forms.com/submit" method="POST">
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
                <div className={styles.homeFormCarouselCont}>
                    <div className={styles.homeFormCarouselViewport}>
                        <div
                            className={styles.homeFormCarouselTrack}
                            style={{
                                width: serviceItems.length ? `${serviceItems.length * 100}%` : "100%",
                                transform: serviceItems.length
                                    ? `translateX(-${carouselIndex * (100 / serviceItems.length)}%)`
                                    : "none",
                            }}
                        >
                            {serviceItems.map((service, i) => (
                                <div
                                    key={`slide-${i}-${service._id ?? i}`}
                                    className={styles.homeFormCarouselSlide}
                                    style={{
                                        width: serviceItems.length ? `${100 / serviceItems.length}%` : "100%",
                                    }}
                                >
                                    {service?.imagePrimary && (
                                        <div className={styles.homeFormCarouselImageCont}>
                                            <Link href={`service/${service.slug.current}/${city && `${city}`}`} >

                                            <Image
                                                src={urlFor(service.imagePrimary).url()}
                                                alt={service.title ?? ""}
                                                fill
                                                object-fit="contain"
                                                className={styles.homeFormCarouselImage}
                                            />
                                            </Link>
                                            <p className={styles.homeFormCarouselImageTitle}>{service.title}</p>
                                        </div>
                                    )}
                                    {service.bookNowText && (
                                        <div className={styles.homeFormCarouselImageButtonCont}>
                                            <Link href={`${service.slug.current}/${city && `${city}`}`} className={styles.homeFormCarouselServiceTitle}>{service.bookNowText}</Link>
                                            
                                        </div>
                                    )}
                                    <div className={styles.homeFormCarouselImageButtonCont}>
                                        <Link href={`service/${service.slug.current}/${city && `${city}`}`} className={styles.homeFormCarouselServiceButton}>View Service</Link>
                                        <BookBtn />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {serviceItems.length > 1 && (
                        <div className={styles.homeFormCarouselDots}>
                            {serviceItems.map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setCarouselIndex(i)}
                                    className={carouselIndex === i ? styles.homeFormCarouselDotActive : styles.homeFormCarouselDot}
                                    aria-label={`Slide ${i + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}