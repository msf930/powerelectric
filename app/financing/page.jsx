import Link from "next/link";
import Image from "next/image";

import NavServer from "../components/Nav/NavServer";
import Footer from "../components/Footer";
import BookBtn from "../components/BookBtn";
import CallBtn from "../components/CallBtn";
import GoogleCarousel from "../components/GoogleCarousel";
import ClosingCTA from "../components/ClosingCTA";
import FinancingAccordion from "./FinancingAccordion";
import styles from "./styles.module.css";


export const revalidate = 3600;

const MOMNT_WIDGET_URL =
  "https://app.momnt.com/widgets/?merchantId=60aa7462-3380-4077-855b-bf116c4235a3&widget=ConsumerLoanApplicationWizard";

const FINANCING_PLAN_ITEMS = [
  {
    _id: "12-month",
    title: "12 Months: No Interest, No Payments",
    intro: [
      "Our most popular financing option for mid-size jobs.",
      "Approved customers pay nothing for 12 months, no interest accruing and no payments due. After 12 months standard loan terms apply.",
    ],
    bestFor: [
      "Furnace repairs and tune-ups",
      "Electrical panel repairs and upgrades",
      "AC repairs and service",
      "EV charger installation",
      "Lighting upgrades and electrical work",
      "IAQ system installation",
      "Any job where you want time to manage your cash flow before payments begin",
    ],
    whyWorks: [
      "You get the work done now, your home is safe and comfortable immediately, and you have 12 months before you make a single payment.",
      "For most homeowners that means the work has already started saving them money on energy bills before the first payment is ever due.",
    ],
  },
  {
    _id: "0-percent-10",
    title: "0% Interest: 10-Year Term",
    intro: [
      "Our most powerful financing option for larger investments.",
      "Approved customers pay zero interest over a full 10-year loan term, every dollar of your payment goes toward your principal balance with nothing going to interest.",
    ],
    bestFor: [
      "New furnace installation, especially under Colorado's new efficiency standards",
      "New AC or heat pump installation",
      "Electrical panel replacement or upgrade",
      "Whole-home generator installation",
      "Complete HVAC system replacement",
      "Comprehensive IAQ system installation",
      "Any large investment where spreading payments over time makes financial sense",
    ],
    whyWorks: [
      "A new high-efficiency furnace under Colorado's new HB23-1161 standards can cost $7,000 to $12,000.",
      "At 0% interest over 10 years that's approximately $58 to $100 per month, less than most utility bills, with every dollar going toward your investment and nothing lost to interest.",
      "Meanwhile your new high-efficiency system is saving you money on natural gas bills from day one.",
    ],
  },
];

const WHAT_YOU_CAN_FINANCE_ITEMS = [
  {
    _id: "electrical",
    title: "Electrical",
    bullets: [
      "Panel upgrades and replacements",
      "EV charger installation",
      "Whole home surge protection",
      "Dedicated circuit installation",
      "Electrical repair and troubleshooting",
      "Lighting installation and upgrades",
      "Wiring and rewiring",
      "Safety inspections and code corrections",
    ],
  },
  {
    _id: "hvac",
    title: "Heating & Cooling",
    bullets: [
      "Furnace installation and replacement",
      "AC installation and replacement",
      "Heat pump installation",
      "Mini split installation",
      "Furnace and AC repair",
      "HVAC maintenance services",
    ],
  },
  {
    _id: "iaq",
    title: "Indoor Air Quality",
    bullets: [
      "Whole-home humidifier installation",
      "ERV and HRV ventilation systems",
      "AprilAire air filtration systems",
      "Air purification installation",
    ],
  },
];

const FAQ_ITEMS = [
  {
    _id: "faq-min",
    title: "What is the minimum amount I can finance?",
    body: [
      "Through our Momnt financing partnership you can finance as little as $1, making financing available for virtually any job regardless of size.",
      "This is genuinely unique. Most home services financing programs have minimums of $500 or more.",
      "Whether you need to finance a small repair or a major system replacement, Momnt has a solution.",
    ],
  },
  {
    _id: "faq-max",
    title: "What is the maximum amount I can finance?",
    body: [
      "Momnt financing is available up to $25,000, covering even the largest electrical and HVAC projects including full system replacements, major panel upgrades, and comprehensive whole-home IAQ systems.",
    ],
  },
  {
    _id: "faq-credit",
    title: "Do I need perfect credit to qualify?",
    body: [
      "No.",
      "Momnt offers multiple financing plans designed for a range of credit profiles.",
      "While promotional rate plans like our 12-month no interest and 0% for 10 years options require qualification, additional options are available for customers at various credit levels.",
      "We encourage everyone to apply and let our team work with you to find the best available option for your situation.",
    ],
  },
  {
    _id: "faq-prepay",
    title: "Are there prepayment penalties?",
    body: [
      "No.",
      "You can pay off your Momnt financing early at any time without penalty.",
      "There are no fees for prepayment and no minimum interest requirements.",
    ],
  },
  {
    _id: "faq-estimate",
    title: "Can I apply before I know exactly what the job will cost?",
    body: [
      "Yes.",
      "You can apply for Momnt financing as part of your service booking process.",
      "Our team will provide a detailed estimate before any work begins and your financing can be applied to the approved scope of work.",
    ],
  },
  {
    _id: "faq-emergency",
    title: "Is financing available for emergency repairs?",
    body: [
      "Yes.",
      "Financing is available for any Power Electrical, Heating & Cooling Services work including emergency repairs.",
      "If you need same-day or urgent service, financing can be arranged as part of the service process.",
      "Ask our team when you call.",
    ],
  },
];

const RELATED_SERVICES = [
  {
    label: "Membership Plans",
    description: "Starting at $14/month: Another Way to Save",
    href: "/membership",
  },
  {
    label: "Furnace Installation",
    description: "Colorado Code-Compliant Installation",
    href: "/service/heating",
  },
  {
    label: "Electrical Panel Upgrade",
    description: "Safe, Code-Compliant Upgrades",
    href: "/service/electrical/panel-upgrades",
  },
  {
    label: "Heat Pump Installation",
    description: "Energy Efficient Heating & Cooling",
    href: "/service/heating",
  },
];

export const metadata = {
  title: "Financing Options | Power Electrical, Heating & Cooling Services",
  description:
    "Flexible Momnt financing for electrical, HVAC, and IAQ work from $1 to $25,000. 12-month no payment options and 0% for 10 years on qualifying projects. Apply today.",
};

export default function FinancingPage() {
  return (
    <div className={styles.page}>
      <NavServer />

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>
            Financing Options: Don&apos;t Let Cost Stand Between You and a Safe,
            Comfortable Home.
          </h1>
          <p className={styles.heroLead}>
            A failing furnace in January. An electrical panel that needs
            immediate replacement. An AC system that gives out during a Colorado
            heat wave. A heat pump installation that could cut your energy bills
            for the next 20 years.
          </p>
          <p className={styles.heroLead}>
            These aren&apos;t optional purchases. They&apos;re the systems that
            keep your family safe, comfortable, and living normally. And the cost
            of addressing them shouldn&apos;t force you to choose between your
            family&apos;s comfort and your financial stability.
          </p>
          <p className={styles.heroLead}>
            Power Electrical, Heating &amp; Cooling Services has partnered with
            Momnt to offer fast, flexible financing for electrical, HVAC, and
            IAQ services, with options starting at just $1 and going up to
            $25,000.
          </p>
          <p className={styles.heroLead}>
            Whether you need to finance a $150 repair or a $15,000 system
            replacement, we have a payment option designed to work for your
            budget.
          </p>
          <p className={styles.heroTagline}>
            The right solution for your home. On a payment schedule that works
            for you.
          </p>
          <div className={styles.heroActions}>
            <a href="#financing-widget" className={styles.applyBtn}>
              Apply Now
            </a>
            <BookBtn />
            <CallBtn />
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <h2>Why We Offer Financing</h2>
          <p className={styles.prose}>
            <strong>
              Because the right time to fix your home&apos;s systems is now, not
              when it&apos;s convenient.
            </strong>
          </p>
          <p className={styles.prose}>
            Electrical problems don&apos;t wait. HVAC systems don&apos;t break
            down on schedule. And the cost of deferring necessary repairs, higher
            energy bills, worsening damage, emergency repair premiums, and the
            real safety risks that come from aging electrical and HVAC systems,
            almost always exceeds the cost of addressing the problem promptly.
          </p>
          <p className={styles.prose}>
            We offer financing because we believe financial constraints
            shouldn&apos;t stand between your family and a safe, comfortable
            home.
          </p>
          <p className={styles.prose}>
            A new furnace that meets Colorado&apos;s new efficiency standards. A
            panel upgrade that eliminates a fire hazard. An IAQ system that helps
            your child breathe easier.
          </p>
          <p className={styles.prose}>
            These investments pay for themselves over time, and financing makes
            it possible to start that return immediately rather than waiting.
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <h2>Our Financing Partner: Momnt</h2>
          <p className={styles.prose}>
            Power Electrical, Heating &amp; Cooling Services has partnered with
            Momnt to provide fast, simple, and flexible financing for our
            customers.
          </p>
          <p className={styles.prose}>
            Momnt is a professional home services financing platform designed
            specifically for contractors and their customers, with a streamlined
            application process and financing options that work for a wide range
            of credit profiles.
          </p>
          <h3>Why Momnt</h3>
          <ul className={styles.bulletList}>
            <li>● Fast decisions: Find out quickly if you qualify</li>
            <li>● Simple application: No lengthy paperwork or complicated process</li>
            <li>● Flexible amounts: Finance as little as $1 or as much as $25,000</li>
            <li>● Multiple plan options: Choose the payment structure that fits your budget</li>
            <li>● No prepayment penalties: Pay off early anytime without fees</li>
            <li>● Designed for home services: Built specifically for exactly the kind of work we do</li>
          </ul>
          <Link
            href={MOMNT_WIDGET_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/momnt.png"
              alt="Momnt financing"
              width={400}
              height={120}
              className={styles.partnerLogo}
            />
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.sectionInner} ${styles.sectionWide}`}>
          <h2>Our Financing Plans</h2>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            These are the Momnt financing options available to qualifying
            customers.
          </p>
          <FinancingAccordion items={FINANCING_PLAN_ITEMS} />
          <h3>Additional Financing Options</h3>
          <p className={styles.prose}>
            Additional financing plans are available for customers who may not
            qualify for our promotional rate programs, with competitive terms
            designed to make necessary electrical and HVAC work accessible
            regardless of your credit profile.
          </p>
          <p className={styles.prose}>
            Our team will work with you to find the right option for your
            specific situation.
          </p>
          <p className={styles.disclaimer}>
            All financing subject to credit approval. Terms and conditions apply.
            Ask our team for complete details on all available options.
          </p>
        </div>
      </section>

      <section
        id="financing-widget"
        className={`${styles.section} ${styles.sectionAlt} ${styles.widgetSection}`}
      >
        <div className={styles.sectionInner}>
          <h2>Apply for Financing</h2>
          <p className={styles.widgetNote}>
            Complete your Momnt application below. Our team can also walk you
            through the process when you call or book service.
          </p>
          <div className={styles.widgetWrap}>
            <iframe
              title="Momnt financing application"
              src={MOMNT_WIDGET_URL}
              className={styles.widgetIframe}
              loading="lazy"
            />
          </div>
          <p className={styles.disclaimer}>
            Financing provided by Momnt. Subject to credit approval. Terms and
            conditions apply. Power Electrical, Heating &amp; Cooling Services is
            not a lender and does not make credit decisions. See Momnt for
            complete terms.
          </p>
          <div className={styles.ctaBlock}>
            <a href="#financing-widget" className={styles.applyBtn}>
              Apply for Financing Now
            </a>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <h2>What You Can Finance</h2>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            Momnt financing is available for all Power Electrical, Heating &amp;
            Cooling Services work, electrical, HVAC, and IAQ.
          </p>
          <FinancingAccordion items={WHAT_YOU_CAN_FINANCE_ITEMS} />
          <p className={styles.prose} style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <strong>Everything we do, financed simply and quickly.</strong>
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <h2>How It Works</h2>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            Getting financing through Momnt is straightforward.
          </p>
          <ol className={styles.stepsList}>
            <li>
              <strong>Apply</strong> — Complete the simple Momnt application
              using the widget above or ask our team to walk you through it
              during your service call.
            </li>
            <li>
              <strong>Get a Decision</strong> — Momnt provides fast decisions so
              you know your options quickly.
            </li>
            <li>
              <strong>Choose Your Plan</strong> — Select the financing option
              that works best for your budget and timeline.
            </li>
            <li>
              <strong>Get the Work Done</strong> — We schedule and complete your
              service immediately, no waiting.
            </li>
            <li>
              <strong>Pay Over Time</strong> — Make comfortable monthly payments
              on your chosen plan schedule.
            </li>
          </ol>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            Our team can walk you through the application process at any point,
            before, during, or after your service appointment.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <h2>Financing FAQs</h2>
          <FinancingAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <h2>Ready to Apply?</h2>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            Applying for Momnt financing takes just minutes.
          </p>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            Use the application widget above or call us and our team will walk
            you through the process directly.
          </p>
          <div className={styles.ctaBlock}>
            <p className={styles.prose}>
              <a href="tel:+17202722562" className={styles.phoneLink}>
                Call or Text: (720) 272-2562
              </a>
            </p>
            <div className={styles.heroActions}>
              <a href="#financing-widget" className={styles.applyBtn}>
                Apply for Financing Now
              </a>
              <BookBtn label="Book Service Today" />
            </div>
          </div>
        </div>
      </section>

      <GoogleCarousel />

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <h2>Related Services</h2>
          <ul className={styles.relatedList}>
            {RELATED_SERVICES.map((item) => (
              <li key={item.href + item.label}>
                <Link href={item.href} className={styles.relatedLink}>
                  {item.label}: {item.description}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCTA
        title="Don't Let Cost Be the Reason Your Home Isn't Safe and Comfortable."
        subtext="Apply for Momnt financing today and get the electrical, HVAC, or IAQ work your home needs, on a payment schedule that works for your budget."
      />

      <Footer />
    </div>
  );
}
