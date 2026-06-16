"use client";

import styles from "./styles.module.css";
import { HCaptcha } from "@hcaptcha/react-hcaptcha";
import { useState, useEffect, useRef } from "react";
import { client } from "../../../sanity/lib/client";
import { PortableText } from "@portabletext/react";

const CONTACT_QUERY = `*[_type == "contact"][0]{
  _id,
  accessString
}`;

const SERVICE_QUERY = `*[_type == "newServicePage" && slug.current == $slug][0]{
  _id,
  yourProcessTitle,
  yourProcessDescription
}`;

export default function ServiceForm({ serviceName }) {
    const captchaRef = useRef(null);
    const [contactData, setContactData] = useState(null);
    const [data, setData] = useState(null);

    const onHCaptchaChange = (token) => {
        setValue("h-captcha-response", token);
    };

    useEffect(() => {
        const fetchContact = async () => {
            const contact = await client.fetch(CONTACT_QUERY);
            setContactData(contact);
        };
        fetchContact();
    }, []);

    useEffect(() => {
        if (!serviceName) {
            setData(null);
            return;
        }

        const fetchService = async () => {
            const service = await client.fetch(SERVICE_QUERY, { slug: serviceName });
            setData(service);
        };
        fetchService();
    }, [serviceName]);

    return (
        <div className={styles.homeFormContOuter}>
            <div className={styles.homeFormCont}>
                <form
                    action="https://api.web3forms.com/submit"
                    method="POST"
                    className={styles.homeFormContForm}
                >
                    <div className={styles.homeFormContInner}>
                        <h2 className={styles.homeFormContTitle}>Get In Touch</h2>
                        <input
                            type="hidden"
                            name="access_key"
                            value={contactData?.accessString ?? "d6ffcb9a-65d9-4a10-85a8-51ed76bcd533"}
                        />
                        <input
                            ref={captchaRef}
                            type="hidden"
                            name="h-captcha-response"
                            defaultValue=""
                        />
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
                                <input type="tel" required name="phone" />
                            </div>
                        </div>
                        <div className={styles.homeFormContInputCont}>
                            <p className={styles.homeFormContInputContLabel}>Message *</p>
                            <textarea required name="message" />
                        </div>
                        <div className={styles.homeFormContInputContRow}>
                            <div className={styles.homeFormContInputCont}>
                                <p className={styles.homeFormContInputContLabel}>
                                    How Did You Hear About Us?
                                </p>
                                <input type="text" name="howDidYouHearAboutUs" />
                            </div>
                            <div className={styles.homeFormContCheckCont}>
                                <input
                                    type="checkbox"
                                    id="previousClient"
                                    name="previousClient"
                                />
                                <label
                                    htmlFor="previousClient"
                                    className={styles.homeFormContCheckContLabel}
                                >
                                    I am a previous client
                                </label>
                            </div>
                        </div>
                        <div className={styles.hCaptchaCont}>
                            <HCaptcha
                                sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                                reCaptchaCompat={false}
                                onVerify={onHCaptchaChange}
                            />
                        </div>
                        <button className={styles.homeFormContSubmitButton} type="submit">
                            Submit
                        </button>
                    </div>
                </form>
                {(data?.yourProcessTitle || data?.yourProcessDescription) ? (
                    <div className={styles.homeFormInfoContainer}>
                        {data.yourProcessTitle ? (
                            <h2 className={styles.homeFormInfoTitle}>
                                {data.yourProcessTitle}
                            </h2>
                        ) : null}
                        {data.yourProcessDescription ? (
                            <PortableText value={data.yourProcessDescription} />
                        ) : null}
                    </div>
                ) :
                    <div className={styles.homeFormInfoContainer}>

                        <h2 className={styles.homeFormInfoTitle}>
                            Your Service Process
                        </h2>
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
                }
            </div>
        </div>
    );
}
