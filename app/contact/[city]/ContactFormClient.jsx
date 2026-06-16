"use client";

import { useState, useRef } from "react";
import { HCaptcha } from "@hcaptcha/react-hcaptcha";
import styles from "./styles.module.css";

function formatPhoneDisplay(number) {
  if (!number) return "";
  const digits = number.replace(/\D/g, "").replace(/^\+1/, "");
  if (digits.length < 10) return number;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function ContactFormClient({ accessKey, phoneNumber, city }) {
  const captchaRef = useRef(null);
  const onHCaptchaChange = (token) => {
    setValue("h-captcha-response", token);
  };
  return (
    <div className={styles.homeFormCont}>
      <form action="https://api.web3forms.com/submit" method="POST">
        <div className={styles.homeFormContInner}>
          <h2 className={styles.homeFormContTitle}>Contact Power Electrical Services {city ? `for ${city.replace(/-/g, " ")}` : ""}</h2>
          <p className={styles.homeFormContDescription}>
            Power Electrical Services is your first choice for professional {city ? `for ${city.replace(/-/g, " ")}` : ""} electrical
            electrical solutions. Specialising in expert electrical
            installations, repairs, and maintenance, we're committed to keeping
            your home and business safe, efficient, and reliably powered.
          </p>
          <div className={styles.homeFormContInfoInner}>
            <a
              href="https://maps.app.goo.gl/XF6B6ZZw1BcrRgyV6"
              className={styles.homeFormContInfoInnerDescription}
            >
              5650 Washington St unit c-6, Denver, CO 80216
            </a>
            <a
              href="mailto:powerelectricalservicesco@gmail.com"
              className={styles.homeFormContInfoInnerDescription}
            >
              Email: powerelectricalservicesco@gmail.com
            </a>
            {phoneNumber && (
              <a
                href={`tel:${phoneNumber}`}
                className={styles.homeFormContInfoInnerDescription}
              >
                Phone: {formatPhoneDisplay(phoneNumber)}
              </a>
            )}
          </div>
          <input type="hidden" name="access_key" value={accessKey ?? "d6ffcb9a-65d9-4a10-85a8-51ed76bcd533"} />
          <input ref={captchaRef} type="hidden" name="h-captcha-response" defaultValue="" />

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
              <p className={styles.homeFormContCheckContLabel}>
                I am a previous client
              </p>
            </div>
          </div>
          <div className={styles.hCaptchaCont}>
          <HCaptcha
              sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
              reCaptchaCompat={false}
              onVerify={onHCaptchaChange}
            />
          </div>
          <button
            className={styles.homeFormContSubmitButton}
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

