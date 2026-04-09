import Image from "next/image";
import Link from "next/link";
import serviceStyles from "../[City-Service]/styles.module.css";
import styles from "./styles.module.css";
import GoogleBadge from "../components/GoogleBadge";
import BookBtn from "../components/BookBtn";
import CallBtn from "../components/CallBtn";
import ValueCont from "../components/ValueCont";
import ServiceForm from "../components/ServiceForm";
import GoogleCarousel from "../components/GoogleCarousel";
import FinanceCont from "../components/FinanceCont";
import LocationCont from "../components/LocationsCont";
import Footer from "../components/Footer";
import NavServer from "../components/Nav/NavServer";

const CITY_NAME = "Denver";
const CITY_SLUG = "Denver";
const HERO_IMAGE = "/homeHero.jpg";
const SECONDARY_IMAGE = "/statsBG.jpg";

export const metadata = {
  description:
    "Fast electrical & HVAC inspection repairs in the Denver Metro area. Fix inspection issues quickly, keep deals on track, and close without delays. Call today.",
};

export default function RealEstatePage() {
  return (
    <article className={serviceStyles.servicePage}>
      <NavServer city={CITY_SLUG} />
      <div className={serviceStyles.hero}>
        <Image
          src={HERO_IMAGE}
          alt=""
          width={500}
          height={300}
          className="w-[50%] h-[400px] object-cover absolute top-0 right-0"
          priority
        />
        <div className={serviceStyles.heroContent}>
          <div className={serviceStyles.heroContentInner}>
            <p className={styles.heroEyebrow}>
              Power Electrical, Heating &amp; Cooling Services
            </p>
            <h1 className={serviceStyles.heroTitle}>
              Real Estate Inspection Repair Specialists - Denver Metro
            </h1>
            <p className={styles.heroSubtitle}>
              Close More Deals Without Inspection Delays
            </p>
            <p className={styles.heroTagline}>
              Fast, Reliable Electrical &amp; HVAC Repairs for Realtors, Buyers
              &amp; Sellers
            </p>
            <div className={serviceStyles.heroButtonContainer}>
              <BookBtn />
              <CallBtn />
            </div>
            <GoogleBadge />
          </div>
        </div>
      </div>

      <section className={serviceStyles.primarySection}>
        <div className={serviceStyles.primarySectionInnerContainer}>
          <div className={serviceStyles.primarySectionContent}>
            <h2>When inspection issues come up, deals are at risk.</h2>
            <p className={styles.prose}>
              At Power Electrical, Heating &amp; Cooling Services, we provide
              fast, reliable real estate inspection repairs to help keep your
              deal moving, maintain buyer confidence, and get to closing without
              delays.
            </p>
            <p className={styles.lead}>
              👉 Electrical + HVAC — One Call. One Solution.
            </p>
            <ul className={styles.bulletList}>
              <li>✅ Fast Response Times</li>
              <li>✅ Clear, Honest Recommendations</li>
              <li>✅ Electrical + HVAC – One Call</li>
            </ul>
          </div>
          <div className={serviceStyles.primarySectionInfoContainer}>
            <div className={serviceStyles.primarySectionInfoContInner}>
              <div className={serviceStyles.primarySectionInfoImageContainer}>
                <Image
                  src={HERO_IMAGE}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={serviceStyles.primarySectionInfoTextContainer}>
                <h3>Got an Inspection Report? We Handle It Fast</h3>
                <p>Upload your report and we’ll take care of the rest.</p>
                <p>Need fast repairs? Tell us your deadline.</p>
                <p className={styles.ctaLine}>
                  📞 Call or Text Now: (720)-272-2562
                </p>
                <p className={styles.ctaLine}>
                  📅 Request Priority Scheduling Today
                </p>
                <div className={serviceStyles.primarySectionInfoButtonContainer}>
                  <BookBtn />
                  <CallBtn />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ValueCont city={CITY_NAME} />

      <section className={serviceStyles.secondarySection}>
        <div className={serviceStyles.secondarySectionInnerContainer}>
          <div className={serviceStyles.secondarySectionContent}>
            <h2>We Help You Close Not Complicate</h2>
            <p className={styles.prose}>We understand:</p>
            <ul className={styles.bulletList}>
              <li>Option periods are tight</li>
              <li>Small issues can kill deals</li>
              <li>Buyers get nervous fast</li>
              <li>Time is everything</li>
            </ul>
            <p className={styles.prose}>
              When inspection issues come up, you need a trusted inspection
              repair electrician who can respond quickly and fix problems the
              right way.
            </p>
            <p className={styles.lead}>Our job is simple:</p>
            <p className={styles.prose}>
              Diagnose clearly. Fix efficiently. Keep your deal moving.
            </p>
          </div>
          <div className={serviceStyles.secondarySectionImageContainer}>
            <Image
              src={SECONDARY_IMAGE}
              alt=""
              fill
              sizes="(max-width: 768px) 0, 40vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      <ServiceForm serviceName="Denver Real Estate Inspection Repairs" />

      <section className={serviceStyles.thirdSection}>
        <div className={serviceStyles.thirdSectionInnerContainer}>
          <div className={serviceStyles.thirdSectionImageContainer}>
            <Image
              src={HERO_IMAGE}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 30vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={serviceStyles.thirdSectionContent}>
            <h2>Real Estate Electrical &amp; HVAC Repair Services</h2>
            <ul className={styles.bulletList}>
              <li>✔ Inspection Report Repairs (Electrical &amp; HVAC)</li>
              <li>✔ Panel Upgrades &amp; Electrical Corrections</li>
              <li>✔ Furnace &amp; AC Safety Checks</li>
              <li>✔ Code &amp; Safety Fixes</li>
              <li>✔ GFCI, Wiring &amp; Outlet Corrections</li>
              <li>✔ Punch List Completion</li>
              <li>✔ Move-In / Move-Out Verifications</li>
              <li>✔ Priority Scheduling for Closings</li>
            </ul>
            <p className={styles.prose}>
              We handle complete electrical inspection fixes and provide full
              HVAC inspection repairs to ensure your systems are safe,
              functional, and ready for closing.
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.extraSection} ${styles.extraSectionAlt}`}>
        <div className={styles.extraSectionInner}>
          <h2>Why Realtors Choose Us</h2>
          <ul className={styles.bulletList}>
            <li>● 20+ Years of Experience</li>
            <li>● Serving the Denver Metro Area Since 2005</li>
            <li>● Family-Owned &amp; Operated</li>
            <li>● One Call for Electrical + HVAC</li>
            <li>● Fast Turnaround for Deadlines</li>
            <li>● No Upselling — Just Honest Work</li>
          </ul>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            We protect your deal by solving problems fast and professionally.
          </p>
        </div>
      </section>

      <section className={styles.extraSection}>
        <div className={styles.extraSectionInner}>
          <h2>Family-Owned. Built on Trust.</h2>
          <p className={styles.prose}>
            Led by Lance Padilla, Power Electrical, Heating &amp; Cooling
            Services has been serving the Denver Metro area since 2005.
          </p>
          <p className={styles.prose}>
            With over 20+ years of electrical experience and the addition of
            his brother Dino in 2020, we’ve built a company grounded in
            reliability and professionalism.
          </p>
          <p className={styles.prose}>
            In 2025, we expanded into heating and cooling services, bringing on
            a skilled HVAC team with years of experience to deliver the same
            level of quality and reliability our customers expect.
          </p>
          <p className={styles.prose}>
            We treat every transaction like it matters — because it does.
          </p>
        </div>
      </section>

      <section className={`${styles.extraSection} ${styles.extraSectionAlt}`}>
        <div className={styles.extraSectionInner}>
          <h2>Common Inspection Issues We Fix</h2>
          <ul className={styles.bulletList}>
            <li>Double-tapped breakers</li>
            <li>Outdated or unsafe panels</li>
            <li>HVAC systems not up to code</li>
            <li>Missing GFCI protection</li>
            <li>Improper or unsafe wiring</li>
            <li>Furnace or AC safety concerns</li>
          </ul>
          <p className={styles.lead} style={{ textAlign: "center" }}>
            👉 We identify it. We fix it. You move forward.
          </p>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            Our goal is simple — fix inspection report issues quickly so you can
            move forward with confidence.
          </p>
        </div>
      </section>

      <GoogleCarousel />
      <FinanceCont city={CITY_NAME} />

      <section className={styles.extraSection}>
        <div className={styles.extraSectionInner}>
          <h2>Serving the Denver Metro Area</h2>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            We provide real estate inspection repairs across:
          </p>
          <ul className={styles.bulletList} style={{ maxWidth: "28rem", margin: "0 auto 1rem" }}>
            <li>Thornton</li>
            <li>Northglenn</li>
            <li>Westminster</li>
            <li>Brighton</li>
            <li>Commerce City</li>
            <li>Broomfield</li>
          </ul>
          <p className={styles.lead} style={{ textAlign: "center" }}>
            👉 Fast response across the entire Denver Metro area.
          </p>
        </div>
      </section>

      <LocationCont city={CITY_NAME} />

      <section className={`${styles.extraSection} ${styles.extraSectionAlt}`}>
        <div className={styles.extraSectionInner}>
          <h2>Need This Fixed Before Closing? Let’s Get It Done.</h2>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            If you need fast, professional real estate inspection repairs, we’re
            ready to help.
          </p>
          <p className={styles.ctaLine} style={{ textAlign: "center" }}>
            📞 Call or Text: (720)-272-2562
          </p>
          <p className={styles.ctaLine} style={{ textAlign: "center" }}>
            📅{" "}
            <Link href="/contact/Denver" className={styles.bookLink}>
              Book Service Now
            </Link>
          </p>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            Have a deadline? Let us know we prioritize real estate deals.
          </p>
          <div
            className={serviceStyles.faqSectionButtonContainer}
            style={{ marginTop: "1rem" }}
          >
            <BookBtn />
            <CallBtn />
          </div>
        </div>
      </section>

      <section className={styles.extraSection}>
        <div className={styles.extraSectionInner}>
          <h2>Our Core Values</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon} aria-hidden>
                🏆
              </div>
              <h3 className={styles.valueTitle}>Professionalism</h3>
              <p className={styles.valueSubtitle}>
                Respect – Preparation – Pride
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon} aria-hidden>
                🌟
              </div>
              <h3 className={styles.valueTitle}>Outstanding Service</h3>
              <p className={styles.valueSubtitle}>
                Customer First – Above &amp; Beyond – Satisfaction
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon} aria-hidden>
                🎯
              </div>
              <h3 className={styles.valueTitle}>Results-Driven Approach</h3>
              <p className={styles.valueSubtitle}>
                Positive – Driven – Solution-Oriented
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon} aria-hidden>
                ⚙️
              </div>
              <h3 className={styles.valueTitle}>
                Efficient, High-Quality Work
              </h3>
              <p className={styles.valueSubtitle}>
                Timely – Organized – Effective
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon} aria-hidden>
                🔒
              </div>
              <h3 className={styles.valueTitle}>Reliable Service</h3>
              <p className={styles.valueSubtitle}>
                Dependable – Consistent – Trustworthy
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.closingBanner}>
        <p>We Don’t Just Do Repairs We Help You Close Deals</p>
      </div>

      <Footer />
    </article>
  );
}
