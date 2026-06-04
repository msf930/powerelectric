import Image from "next/image";
import Link from "next/link";

import styles from "./styles.module.css";
import GoogleBadge from "../../components/GoogleBadge";
import BookBtn from "../../components/BookBtn";
import CallBtn from "../../components/CallBtn";
import ValueCont from "../../components/ValueCont";
import ServiceForm from "../../components/ServiceForm";
import GoogleCarousel from "../../components/GoogleCarousel";
import FinanceCont from "../../components/FinanceCont";
import LocationCont from "../../components/LocationsCont";
import Footer from "../../components/Footer";
import NavServer from "../../components/Nav/NavServer";
import ThirdSectionAccordion from "./ThirdSectionAccordion";
import ClosingCTA from "../../components/ClosingCTA";

const CITY_NAME = "Denver";
const CITY_SLUG = "Denver";
const HERO_IMAGE = "/homeHero.jpg";
const SECONDARY_IMAGE = "/statsBG.jpg";

const INSPECTION_ACCORDION_ITEMS = [
  {
    _id: "double-tapped",
    title: "Electrical Panel Issues",
    content: [
      "Double-tapped breakers",
      "Outdated or undersized panels",
      "Federal Pacific and Zinsco panels",
      "Improper panel wiring",
      "Missing breaker blanks",
      "Overfused circuits",
    ],
  },
  {
    _id: "outdated-panel",
    title: "Wiring & Outlet Issues",
    content: [
      "Missing GFCI protection in kitchens and bathrooms",
      "Ungrounded outlets",
      "Reversed polarity outlets",
      "Aluminum wiring concerns",
      "Open junction boxes",
      "Improper or unsafe wiring throughout the home",
    ],
  },
  {
    _id: "hvac-code",
    title: "HVAC & Safety Issues",
    content: [
      "Furnace systems not operating safely or efficiently",
      "AC systems not cooling properly",
      "Improper venting or exhaust concerns",
      "Carbon monoxide safety concerns",
      "Missing smoke or CO detectors",
      "HVAC systems not meeting current code requirements",
      "We identify the issue. We correct it properly. You move forward confidently."
    ]
  },
];

export const metadata = {
  description:
    "Fast electrical & HVAC inspection repairs in the Denver Metro area. Fix inspection issues quickly, keep deals on track, and close without delays. Call today.",
};

export default async function RealEstatePage({params}) {
  const { city } = await params;
  return (
    <article className={styles.servicePage}>
      <NavServer city={city} />
      <div className={styles.hero}>
        <Image
          src={HERO_IMAGE}
          alt=""
          width={500}
          height={700}
          className="w-[50%] h-[700px] object-cover absolute top-0 right-0"
          priority
        />
        <div className={styles.heroContent}>
          <div className={styles.heroContentInner}>
            <p className={styles.heroEyebrow}>
              Power Electrical, Heating &amp; Cooling Services
            </p>
            <h1 className={styles.heroTitle}>
              Real Estate Inspection Repair Specialists: Denver Metro

            </h1>
            <p className={styles.heroSubtitle}>
              Keep Closings on Track. Reduce Delays. Trust One Team for Everything.
            </p>
            <p className={styles.heroTagline}>
              Inspection findings don't have to derail your transaction.

              Power Electrical, Heating & Cooling Services specializes in fast, professional electrical and HVAC inspection repairs for realtors, buyers, sellers, investors, and property professionals across the Denver metro area.

              We understand that time matters during a real estate transaction, and we treat every project with the urgency it deserves.

              One call gets you a licensed team that handles both electrical and HVAC repairs.

              No coordinating multiple contractors. No waiting on different schedules. No confusion about who's responsible for what.

              Just fast, honest work that helps move your transaction toward closing.
            </p>
            <p className={styles.heroTagline}>
              Call or Text: (720) 272-2562
              <br />
              Request Priority Scheduling Today
            </p>
            <div className={styles.heroButtonContainer}>
              <BookBtn />
              <CallBtn />
            </div>
            <GoogleBadge />
          </div>
        </div>
      </div>

      <section className={styles.primarySection}>
        <div className={styles.primarySectionInnerContainer}>
          <div className={styles.primarySectionContent}>
            <h2>We Help You Close, Not Complicate
              <br />
              We Understand What&apos;s at Stake in Every Transaction.</h2>
            <p className={styles.prose}>
              When inspection issues surface during a real estate transaction, the clock starts ticking immediately.
              <br />
              <br />
              Buyers get nervous. Sellers get frustrated. Agents scramble to find reliable contractors who can move quickly, communicate clearly, and provide documentation everyone can trust.
              <br />
              <br />
              That&apos;s exactly where we come in.
            </p>
            <p className={styles.lead}>
              Here's what we understand about real estate transactions:
            </p>
            <ul className={styles.bulletList}>
              <li>
                ● Option periods are tight: There&apos;s no time to wait on slow
                contractors or unclear estimates
              </li>
              <li>
                ● Small issues create major concern: A flagged panel or HVAC
                issue can quickly affect buyer confidence
              </li>
              <li>
                ● Buyers need reassurance fast: Clear communication and prompt
                action help keep transactions moving
              </li>
              <li>
                ● Time matters: Every day between inspection and closing affects
                someone financially
              </li>
              <li>
                ● Multiple parties need updates: Agents, buyers, sellers, and
                lenders all require clear documentation
              </li>
              <li>
                ● One contractor for everything simplifies the process:
                Coordinating multiple trades during a transaction creates
                unnecessary delays and stress
              </li>
            </ul>
            <p className={styles.lead}>
              Our job is simple.
              <br />
              <br />
              Diagnose clearly. Repair efficiently. Document thoroughly. Keep your closing moving forward.            </p>
          </div>
          <div className={styles.primarySectionInfoContainer}>
            <div className={styles.primarySectionInfoContInner}>
              <div className={styles.primarySectionInfoImageContainer}>
                <Image
                  src={HERO_IMAGE}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.primarySectionInfoTextContainer}>
                <h3>Got an Inspection Report? We Handle It Fast</h3>
                <p>Upload your report and we&apos;ll take care of the rest.</p>
                <p>Need fast repairs? Tell us your deadline.</p>
                <p className={styles.ctaLine}>
                  📞 Call or Text Now: (720)-272-2562
                </p>
                <p className={styles.ctaLine}>
                  📅 Request Priority Scheduling Today
                </p>
                <div className={styles.primarySectionInfoButtonContainer}>
                  <BookBtn />
                  <CallBtn />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ValueCont city={CITY_NAME} />

      <section className={styles.secondarySection}>
        <div className={styles.secondarySectionInnerContainer}>
          <div className={styles.secondarySectionContent}>
            <h2>Your Real Estate Inspection Repair Process</h2>
            <p className={styles.lead}>
              Here&apos;s What to Expect When You Call Us.
            </p>
            <ul className={styles.bulletList}>
              <li>
                ● Fast response: We prioritize real estate calls and aim to be
                onsite quickly for urgent timelines
              </li>
              <li>
                ● Clear diagnosis: We review the inspection report and explain
                exactly what needs attention
              </li>
              <li>
                ● Transparent pricing: Detailed estimates before work begins with
                no surprise invoices
              </li>
              <li>
                ● Licensed work: All electrical work completed under proper
                licensing and permits
              </li>
              <li>
                ● Quality repairs: Professional installation, reliable materials,
                and complete testing
              </li>
              <li>
                ● Full documentation: Written records and photos provided for
                buyers, sellers, agents, and lenders
              </li>
              <li>
                ● Clear communication: We keep all parties updated so nothing
                stalls at the last minute
              </li>
              <li>
                ● Follow-through: We don&apos;t consider the project complete
                until your transaction is moving forward
              </li>
            </ul>
          </div>
          <div className={styles.secondarySectionImageContainer}>
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

      <section className={styles.thirdSection}>
        <div className={styles.thirdSectionInnerContainer}>
          <div className={styles.thirdSectionImageContainer}>
            <Image
              src={HERO_IMAGE}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 30vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={styles.thirdSectionContent}>
            <h2>Real Estate Electrical &amp; HVAC Repair Services</h2>
            <p className={styles.lead}>
              We Handle Everything on the Inspection Report.
            </p>
            <ul className={styles.bulletList}>
              <li>● Inspection report repairs: Electrical and HVAC</li>
              <li>● Panel upgrades and electrical corrections</li>
              <li>● Furnace and AC safety checks and repairs</li>
              <li>● Code and safety violation corrections</li>
              <li>● GFCI outlet installation and corrections</li>
              <li>● Improper or unsafe wiring corrections</li>
              <li>● Punch list completion</li>
              <li>● Move-in and move-out electrical verifications</li>
              <li>● Priority scheduling for closing timelines</li>
              <li>● Carbon monoxide and smoke detector compliance</li>
              <li>
                ● Arc Fault Circuit Interrupter (AFCI) installation
              </li>
              <li>● Dedicated circuit additions</li>
            </ul>
          </div>
        </div>
      </section>
      <section className={styles.thirdSection}>
        <div className={styles.thirdSectionInnerContainer}>
          <div className={styles.thirdSectionImageContainer}>
            <Image
              src={SECONDARY_IMAGE}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 30vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={styles.thirdSectionContent}>
            <h2>Common Inspection Issues We Fix</h2>
            <ThirdSectionAccordion thirdItems={INSPECTION_ACCORDION_ITEMS} />
          </div>
        </div>
      </section>
      <section className={`${styles.extraSection} ${styles.extraSectionAlt}`}>
        <div className={styles.extraSectionInner}>
          <h2>Why Realtors Choose Us</h2>
          <ul className={styles.bulletListCenterWhy}>
            <li>
              ● Serving the Denver Metro Area: Nearly two decades of
              experience working in local homes throughout the market
            </li>
            <li>
              ● Family-Owned &amp; Operated: A local team that treats every
              transaction like it matters, because it does
            </li>
            <li>
              ● Licensed &amp; Insured: Full electrical licensing and insurance
              with documentation provided when needed
            </li>
            <li>
              ● One Call for Electrical + HVAC: One team handling both trades
              means fewer scheduling issues and less coordination stress
            </li>
            <li>
              ● Inspection Report Specialists: We know what inspectors flag and
              how to correct it quickly and properly
            </li>
            <li>
              ● Fast Turnaround for Tight Timelines: Tell us your closing date
              and we&apos;ll work to make it happen
            </li>
            <li>
              ● Clear Itemized Estimates: Straightforward pricing and
              documentation for buyers, sellers, and lenders
            </li>
            <li>
              ● Communication With All Parties: We keep agents, buyers, and
              sellers informed throughout the process
            </li>
            <li>
              ● Photos &amp; Documentation After Every Job: Full written
              records provided for transaction files
            </li>
            <li>
              ● No Upselling: We fix what actually needs correction and nothing
              more
            </li>
          </ul>
          <p className={styles.prose} style={{ textAlign: "center" }}>
          Inspection issues resolved quickly so your transaction keeps moving.

</p>
        </div>
      </section>

      <section className={styles.extraSection}>
        <div className={styles.extraSectionInner}>
          <h2>Family-Owned. Built on Trust.</h2>
          <p className={styles.prose}>
          Power Electrical, Heating & Cooling Services was built on the belief that great work comes from great teams.


          </p>
          <p className={styles.prose}>
          From our Master Licensed electrician ensuring permit and code compliance to our HVAC technicians and growing apprentice team, every person on our crew is held to the same standard:


          </p>
          <p className={styles.prose}>
          Show up on time. Communicate clearly. Do the work right the first time.


          </p>
          <p className={styles.prose}>
          We treat every real estate transaction like it matters because for your clients, it absolutely does.

</p>
          <BookBtn />
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
          <ul
            className={styles.bulletListCenter}
            style={{
              maxWidth: "48rem",
              margin: "0 auto 1rem",
              listStyle: "none",
              paddingLeft: 0,
            }}
          >
            <li>Thornton | Aurora | Littleton</li>
            <li>Northglenn | Arvada | Centennial</li>
            <li>Westminster | Lakewood | Greenwood Village</li>
            <li>Brighton | Wheat Ridge | Highlands Ranch</li>
            <li>Commerce City | Denver | Golden</li>
            <li>Broomfield | Erie | Englewood</li>
          </ul>
          <p className={styles.lead} style={{ textAlign: "center" }}>
            Fast response across the entire Denver Metro area.
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
            className={styles.faqSectionButtonContainer}
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
      <ClosingCTA
        title="Need Inspection Repairs Before Closing? Let's Get It Done."
        subtext="Whether you're a realtor managing a tight timeline, a seller trying to keep the transaction moving, or a buyer needing clear answers fast, we're ready to help."
      />
      <Footer />
    </article>
  );
}
