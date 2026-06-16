"use client";

import { useEffect, useState, useRef } from "react";
import { HCaptcha } from "@hcaptcha/react-hcaptcha";
import { client } from "../../sanity/lib/client";
import styles from "./styles.module.css";

const CONTACT_QUERY = `*[_type == "contact"][0]{ accessString }`;

const HEAR_ABOUT_OPTIONS = [
  "Google Search",
  "Google Review",
  "Friend or Family Referral",
  "Social Media",
  "Door Hanger or Flyer",
  "I am a previous client",
  "Other",
];

export default function MembershipSignupForm() {
  const [accessKey, setAccessKey] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const captchaRef = useRef(null);
  useEffect(() => {
    client.fetch(CONTACT_QUERY).then((data) => {
      if (data?.accessString) setAccessKey(data.accessString);
    });
  }, []);

  const onHCaptchaChange = (token) => {
    setValue("h-captcha-response", token);
  };

  return (
    <form
      id="membership-signup"
      className={styles.signupForm}
      action="https://api.web3forms.com/submit"
      method="POST"
    >
      <input type="hidden" name="access_key" value={accessKey ?? "d6ffcb9a-65d9-4a10-85a8-51ed76bcd533"} />
      <input ref={captchaRef} type="hidden" name="h-captcha-response" defaultValue="" />

      <input type="hidden" name="form_type" value="Membership Signup" />

      <div className={styles.formRow}>
        <div className={styles.formField}>
          <label htmlFor="firstName">First Name *</label>
          <input id="firstName" name="firstName" type="text" required />
        </div>
        <div className={styles.formField}>
          <label htmlFor="lastName">Last Name *</label>
          <input id="lastName" name="lastName" type="text" required />
        </div>
      </div>

      <div className={styles.formField}>
        <label htmlFor="serviceAddress">Service Address *</label>
        <input id="serviceAddress" name="serviceAddress" type="text" required />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formField}>
          <label htmlFor="city">City *</label>
          <input id="city" name="city" type="text" required />
        </div>
        <div className={styles.formField}>
          <label htmlFor="zipCode">Zip Code *</label>
          <input id="zipCode" name="zipCode" type="text" required />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formField}>
          <label htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div className={styles.formField}>
          <label htmlFor="phone">Phone *</label>
          <input id="phone" name="phone" type="tel" required />
        </div>
      </div>

      <fieldset className={styles.formFieldset}>
        <legend>Which plan are you interested in? *</legend>
        <label className={styles.radioLabel}>
          <input type="radio" name="plan" value="Power Advantage — $14/month" required />
          ⚡ Power Advantage — $14/month
        </label>
        <label className={styles.radioLabel}>
          <input type="radio" name="plan" value="Power Club — $24/month" />
          🌟 Power Club — $24/month (Most Popular)
        </label>
        <label className={styles.radioLabel}>
          <input type="radio" name="plan" value="Power Protection — $39/month" />
          🛡️ Power Protection — $39/month
        </label>
      </fieldset>

      <fieldset className={styles.formFieldset}>
        <legend>New member or renewal? *</legend>
        <label className={styles.radioLabel}>
          <input type="radio" name="memberType" value="New Member" required />
          New Member
        </label>
        <label className={styles.radioLabel}>
          <input type="radio" name="memberType" value="Renewal" />
          Renewal
        </label>
      </fieldset>

      <label className={styles.checkboxLabel}>
        <input type="checkbox" name="heroesPlan" value="Yes" />
        I am applying for the Power Heroes Lifetime Membership — I understand
        proof of service will be required before activation
      </label>

      <div className={styles.formField}>
        <label htmlFor="referral">How did you hear about us?</label>
        <select id="referral" name="referral" defaultValue="">
          <option value="">Select one</option>
          {HEAR_ABOUT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formField}>
        <label htmlFor="notes">Notes or Questions</label>
        <textarea id="notes" name="notes" rows={4} />
      </div>

      <input type="hidden" name="h-captcha-response" value={captchaToken} />
      <div className={styles.hCaptchaWrap}>
        <HCaptcha
          sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
          reCaptchaCompat={false}
          onVerify={onHCaptchaChange}
          theme="light"
        />
      </div>

      <button type="submit" className={styles.submitBtn}>
        Submit My Membership Application
      </button>

      <p className={styles.formDisclaimer}>
        By submitting this form you are requesting membership enrollment. A
        member of our team will contact you within one business day to complete
        your enrollment, collect payment information, and activate your first
        month free.
      </p>
      <p className={styles.formDisclaimer}>
        Membership requires a 12-month minimum commitment. Full terms provided at
        enrollment.
      </p>
    </form>
  );
}
