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
import { getContractorLinks } from "./resolveServiceLinks";

const CITY_NAME = "Denver";
const CITY_SLUG = "Denver";
const HERO_IMAGE = "/homeHero.jpg";
const SECONDARY_IMAGE = "/statsBG.jpg";

export const metadata = {
  title: "Electrical & HVAC for Contractors | Denver Metro",
  description:
    "Dependable electrical and HVAC support for contractors in the Denver Metro area. On-time scheduling, clear communication, and code-compliant work. Call (720) 272-2562.",
};

export default async function ContractorPage() {
  const L = await getContractorLinks(CITY_SLUG);

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
              Reliable Electrical &amp; HVAC Support for Contractors – Denver
              Metro
            </h1>
            <p className={styles.heroSubtitle}>
              Keep Your Project on Schedule — Without Sub Delays
            </p>
            <p className={styles.heroTagline}>
              Reliable Electrical &amp; HVAC Support That Gets the Job Done
              Right
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
            <h2>When subcontractors don’t show up or fall behind, your entire project suffers.</h2>
            <p className={styles.prose}>
              At Power Electrical, Heating &amp; Cooling Services, we provide
              dependable, professional electrical and HVAC support for
              contractors to keep your projects moving and eliminate costly
              delays.
            </p>
            <p className={styles.lead}>
              👉 Electrical + HVAC — One Team. One Solution.
            </p>
            <ul className={styles.bulletList}>
              <li>✅ Show Up On Time</li>
              <li>✅ Stay On Schedule</li>
              <li>✅ Get It Done Right the First Time</li>
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
                <h3>Panel upgrades &amp; corrections</h3>
                <p className={styles.prose}>
                  Need panel upgrades or electrical corrections? See our{" "}
                  <Link href={L.panelUpgrades} className={styles.inlineLink}>
                    panel upgrade services
                  </Link>
                  .
                </p>
                <p className={styles.ctaLine}>
                  📞 Call or Text: (720)-272-2562
                </p>
                <p className={styles.ctaLine}>
                  📅{" "}
                  <Link href={L.contact} className={styles.bookLink}>
                    Schedule Project Support
                  </Link>
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
            <h2>Built for Contractors Who Need Reliability</h2>
            <p className={styles.prose}>We understand what you’re dealing with:</p>
            <ul className={styles.bulletList}>
              <li>Missed timelines slowing down production</li>
              <li>Subcontractors not showing up</li>
              <li>Poor communication causing delays</li>
              <li>Rework costing time and money</li>
            </ul>
            <p className={styles.prose}>
              When you need a reliable electrical contractor for job site
              support, we step in and keep things moving. Dealing with job site
              issues or failed inspections?{" "}
              <Link href={L.electricalRepair} className={styles.inlineLink}>
                Our electrical repair services
              </Link>{" "}
              can get things back on track quickly. We also{" "}
              <Link
                href={L.inspectionRepairs}
                className={styles.softLink}
              >
                assist with inspection-related repairs when needed
              </Link>
              —without pulling focus from your schedule.
            </p>
            <p className={styles.lead}>
              👉 We don’t slow projects down — we keep them moving.
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

      <ServiceForm serviceName="Denver Contractor Electrical & HVAC Support" />

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
            <h2>Electrical &amp; HVAC Services for Contractors</h2>
            <p className={styles.prose}>
              Handling rough-ins or full rewires? Learn more about our{" "}
              <Link href={L.wiringRewiring} className={styles.inlineLink}>
                wiring and rewiring services
              </Link>
              . Need reliable HVAC installation or replacement? Explore{" "}
              <Link href={L.hvacInstallation} className={styles.inlineLink}>
                HVAC installation services for contractor support
              </Link>
              .
            </p>
            <p className={styles.prose}>
              Fixing code violations or inspection issues? See our{" "}
              <Link href={L.codeCorrections} className={styles.inlineLink}>
                code correction services
              </Link>{" "}
              for fast, compliant solutions. Not sure what’s causing the issue?{" "}
              <Link href={L.troubleshooting} className={styles.inlineLink}>
                Troubleshooting and diagnostic services
              </Link>{" "}
              identify and fix problems fast.
            </p>
            <ul className={styles.bulletList}>
              <li>✔ Electrical Rough-In &amp; Finish Work</li>
              <li>
                ✔{" "}
                <Link href={L.panelUpgrades} className={styles.inlineLink}>
                  Panel Installations &amp; Upgrades
                </Link>
              </li>
              <li>
                ✔{" "}
                <Link href={L.hvacInstallation} className={styles.inlineLink}>
                  HVAC Installation &amp; Replacement
                </Link>
              </li>
              <li>
                ✔{" "}
                <Link href={L.troubleshooting} className={styles.inlineLink}>
                  Troubleshooting &amp; Corrections
                </Link>
              </li>
              <li>
                ✔{" "}
                <Link href={L.codeCorrections} className={styles.inlineLink}>
                  Code Compliance &amp; Safety Work
                </Link>
              </li>
              <li>✔ Job Site Coordination &amp; Support</li>
              <li>
                ✔{" "}
                <Link href={L.electricalRepair} className={styles.inlineLink}>
                  Repair &amp; Rework Completion
                </Link>
              </li>
            </ul>
            <p className={styles.prose}>
              We provide full electrical contractor services and HVAC support
              for construction projects, ensuring your work is completed
              efficiently and up to code.
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.extraSection} ${styles.extraSectionAlt}`}>
        <div className={styles.extraSectionInner}>
          <h2>Why Contractors Choose Us</h2>
          <ul className={styles.bulletList}>
            <li>● 20+ Years of Experience</li>
            <li>● Serving the Denver Metro Area Since 2005</li>
            <li>● Family-Owned &amp; Operated</li>
            <li>● Reliable Scheduling — We Show Up</li>
            <li>● Clear Communication</li>
            <li>● Electrical + HVAC = One Team</li>
          </ul>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            👉 We make your job easier — not harder.
          </p>
        </div>
      </section>

      <section className={styles.extraSection}>
        <div className={styles.extraSectionInner}>
          <h2>A Team You Can Count On</h2>
          <p className={styles.prose}>
            Led by Lance Padilla, Power Electrical, Heating &amp; Cooling
            Services has been serving the Denver Metro area since 2005.
          </p>
          <p className={styles.prose}>
            With over 20+ years of electrical experience and the addition of his
            brother Dino in 2020, we’ve built a company contractors rely on for
            consistent, high-quality work.
          </p>
          <p className={styles.prose}>
            In 2025, we expanded into heating and cooling services, bringing on
            a skilled HVAC team with years of experience to support contractors
            with full system installs and repairs.
          </p>
          <p className={styles.prose}>
            We understand job site expectations — and we meet them.
          </p>
          <p className={styles.prose}>
            Want to learn more about our experience and team?{" "}
            <Link href={L.about} className={styles.inlineLink}>
              Visit our About Us page
            </Link>
            .
          </p>
        </div>
      </section>

      <section className={`${styles.extraSection} ${styles.extraSectionAlt}`}>
        <div className={styles.extraSectionInner}>
          <h2>Common Job Site Problems We Solve</h2>
          <ul className={styles.bulletList}>
            <li>Delayed electrical or HVAC work</li>
            <li>Failed inspections and code issues</li>
            <li>Poor workmanship from previous subcontractors</li>
            <li>Last-minute project needs</li>
            <li>Jobs falling behind schedule</li>
          </ul>
          <p className={styles.lead} style={{ textAlign: "center" }}>
            👉 We step in, fix the issue, and keep your project moving forward.
          </p>
        </div>
      </section>

      <GoogleCarousel />
      <FinanceCont city={CITY_NAME} />

      <section className={styles.extraSection}>
        <div className={styles.extraSectionInner}>
          <h2>Serving the Denver Metro Area</h2>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            We provide contractor electrical and HVAC support across:
          </p>
          <ul
            className={styles.bulletList}
            style={{ maxWidth: "28rem", margin: "0 auto 1rem" }}
          >
            <li>Thornton</li>
            <li>Northglenn</li>
            <li>Westminster</li>
            <li>Brighton</li>
            <li>Commerce City</li>
            <li>Broomfield</li>
          </ul>
          <p className={styles.lead} style={{ textAlign: "center" }}>
            👉 Fast, reliable support across the entire Denver Metro area.
          </p>
        </div>
      </section>

      <LocationCont city={CITY_NAME} />

      <section className={`${styles.extraSection} ${styles.extraSectionAlt}`}>
        <div className={styles.extraSectionInner}>
          <h2>Need a Reliable Team on Your Next Project? Let’s Get to Work.</h2>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            If you need dependable electrical and HVAC support for contractors,
            we’re ready to help.
          </p>
          <p className={styles.ctaLine} style={{ textAlign: "center" }}>
            📞 Call or Text: (720)-272-2562
          </p>
          <p className={styles.ctaLine} style={{ textAlign: "center" }}>
            📅{" "}
            <Link href={L.contact} className={styles.bookLink}>
              Schedule Project Support Today
            </Link>
          </p>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            Have a timeline to meet? We’ll help you stay on track.
          </p>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            Looking for a reliable long-term partner?{" "}
            <Link href={L.contact} className={styles.inlineLink}>
              Contact us today
            </Link>{" "}
            to discuss your next project.
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
        <p>We Show Up. We Deliver. We Keep You on Track.</p>
      </div>

      <Footer />
    </article>
  );
}
