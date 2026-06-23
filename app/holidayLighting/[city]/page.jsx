import Link from "next/link";

import NavServer from "../../components/Nav/NavServer";
import Footer from "../../components/Footer";
import BookBtn from "../../components/BookBtn";
import CallBtn from "../../components/CallBtn";
import GoogleBadge from "../../components/GoogleBadge";
import GoogleCarousel from "../../components/GoogleCarousel";
import HolidayLightingAccordion from "./HolidayLightingAccordion";
import styles from "./styles.module.css";

import { generateCityParams } from "../../../lib/staticParams";

export const revalidate = false;

export async function generateStaticParams() {
  return generateCityParams();
}

const PHONE_DISPLAY = "(720) 272-2562";
const PHONE_HREF = "tel:+17202722562";
const MAPS_HREF = "https://maps.app.goo.gl/Lw2x8JKXuSi5YrMq9";
const ADDRESS = "5650 N Washington St. Unit C-6, Denver, CO 80216";

const SERVICE_ITEMS = [
  {
    _id: "roofline",
    title: "Roofline Christmas Light Installation",
    intro: [
      "Our most popular service.",
      "We install professional-grade LED C-9 and LED C-7 Christmas lights along rooflines, peaks, ridges, and architectural features for a clean, high-end holiday look.",
    ],
    bullets: [
      "LED C-9 lighting installation",
      "LED C-7 lighting installation",
      "Custom roofline lighting layouts",
      "Professional clips and secure attachment methods",
      "12-inch spacing available",
      "15-inch spacing available",
      "Warm white and multicolor options available",
      "Residential and commercial roofline lighting",
    ],
  },
  {
    _id: "tree-wrap",
    title: "Tree Wrap & Landscape Lighting",
    intro: [
      "Holiday landscape lighting adds depth and warmth that roofline lighting alone cannot create.",
      "We professionally wrap trees, bushes, columns, railings, and landscape features using commercial-grade LED mini lights designed for long-lasting outdoor performance.",
    ],
    bullets: [
      "LED mini light tree wraps",
      "Bush and shrub lighting",
      "Railing and column wraps",
      "Window frame lighting",
      "Entryway and porch lighting",
      "Landscape accent lighting",
      "Commercial landscape holiday lighting",
    ],
  },
  {
    _id: "icicle",
    title: "Icicle Light Installation",
    intro: [
      "Classic icicle lighting remains one of the most requested holiday lighting styles for homes and businesses throughout Denver metro.",
      "We install clean, evenly spaced icicle lighting along rooflines, patios, porches, and commercial storefronts for a traditional holiday appearance.",
    ],
    bullets: [
      "LED icicle lighting installation",
      "Residential icicle lighting",
      "Commercial storefront icicle lighting",
      "Porch and patio icicle lighting",
      "Clean professional spacing and layout",
    ],
  },
  {
    _id: "commercial",
    title: "Commercial Christmas Light Installation",
    intro: [
      "Professional holiday lighting helps businesses stand out, attract attention, and create a welcoming seasonal atmosphere for customers and employees.",
      "We install holiday lighting for retail storefronts, office buildings, restaurants, HOA entrances, apartment communities, shopping centers, and municipal spaces.",
      "Our team is CLIPA certified for both residential and commercial Christmas light installation.",
    ],
    bullets: [
      "Retail storefronts",
      "Office buildings",
      "Restaurants",
      "HOA entrances and clubhouses",
      "Apartment communities",
      "Commercial properties and shopping centers",
      "Municipal and public spaces",
    ],
  },
];

const LEASE_PURCHASE_ITEMS = [
  {
    _id: "lease",
    title: "Christmas Light Leasing Program",
    intro: [
      "Our leasing option is the easiest, most popular solution for homeowners who want a completely hands-off experience.",
    ],
    bullets: [
      "We provide the professional-grade lights",
      "We custom-fit the lighting to your home",
      "We install everything professionally",
      "We maintain and service the lights during the season if needed",
      "We remove the lights after the holidays",
      "We store the lights safely at our shop until next season",
    ],
    body: ["You enjoy the holidays. We handle everything else."],
  },
  {
    _id: "purchase",
    title: "Purchase Your Own Lighting",
    intro: [
      "Prefer to own your lighting system long term?",
      "We also offer custom holiday lighting purchases.",
    ],
    bullets: [
      "The lights belong to you",
      "We custom-fit and professionally install the system",
      "You can store the lights yourself or request storage options if available",
      "We offer flat-rate return installation pricing for future seasons",
      "Your lighting layout stays consistent year after year",
    ],
    body: [
      "This is a great option for homeowners who want a permanent custom-fit lighting system they can reuse annually.",
    ],
  },
];

const FAQ_ITEMS = [
  {
    _id: "faq-types",
    title: "What types of Christmas lights do you install?",
    body: [
      "We install professional-grade LED C-9 lights, LED C-7 lights, LED mini lights for tree wraps and landscaping, and LED icicle lights.",
      "Our systems are designed for both residential and commercial holiday lighting applications.",
      "We offer custom layouts based on your home's architecture, landscaping, and overall holiday style.",
    ],
  },
  {
    _id: "faq-lease",
    title: "What's the difference between leasing and purchasing the lights?",
    body: [
      "With a lease program, we provide the lights, install them, maintain them during the season if needed, remove them afterward, and store them at our shop until the next holiday season.",
      "With a purchase option, you own the lighting system permanently.",
      "We still professionally install the lights, and we offer flat-rate return installation pricing for future years if you'd like us to reinstall them annually.",
    ],
  },
  {
    _id: "faq-spacing",
    title: "What spacing options do you offer for roofline lights?",
    body: [
      "We offer both 12-inch spacing and 15-inch spacing for LED C-9 and C-7 roofline lighting installations.",
      "Tighter spacing creates a fuller, brighter appearance, while wider spacing provides a cleaner traditional look.",
      "We'll help recommend the best option based on your home's size, roofline, and desired appearance.",
    ],
  },
  {
    _id: "faq-landscape",
    title: "Do you install lights on trees, bushes, and railings?",
    body: [
      "Yes.",
      "We install LED mini lights on trees, shrubs, bushes, railings, columns, windows, entryways, and landscape features.",
      "Landscape lighting adds depth and dimension to holiday displays and creates a much more complete finished look.",
    ],
  },
  {
    _id: "faq-certified",
    title: "Are your installers certified and insured?",
    body: [
      "Yes.",
      "We are CLIPA certified for both residential and commercial Christmas light installation.",
      "Our team is fully insured and trained to work safely on roofs, ladders, commercial properties, and elevated installations.",
    ],
  },
  {
    _id: "faq-service",
    title: "Do you provide service if lights stop working during the season?",
    body: [
      "Yes.",
      "For leased lighting systems, in-season service and maintenance are included.",
      "If any section experiences an issue, we'll return and correct it promptly.",
      "For purchased systems, service availability depends on the installation agreement and lighting condition.",
    ],
  },
  {
    _id: "faq-schedule",
    title: "When should I schedule Christmas light installation?",
    body: [
      "The earlier the better.",
      "Holiday lighting schedules fill quickly throughout October and November across the Denver metro area.",
      "Most homeowners schedule installation several weeks before Thanksgiving to secure preferred installation dates.",
      "Commercial properties often schedule even earlier.",
    ],
  },
];

const RELATED_SERVICES = [
  {
    label: "Lighting Installation & Upgrade Services",
    description: "Indoor & Outdoor Lighting Upgrades + Professional Installation",
    href: "/service/electrical",
  },
  {
    label: "Outdoor Lighting Installation",
    description: "Landscape & Security Lighting Solutions",
    href: "/service/electrical",
  },
  {
    label: "Electrical Repair Services",
    description: "Fast Diagnostics + Same-Day Service Available",
    href: "/service/electrical/electrical-repair-services-you-can-trust",
  },
];

export const metadata = {
  title:
    "Christmas Light Installation Denver | Power Electrical, Heating & Cooling",
  description:
    "Professional Christmas light installation in the Denver metro. Rooflines, tree wraps, icicle lights, commercial displays. CLIPA certified. Lease or purchase options.",
};

export default async function HolidayLightingPage({params}) {
  const {city} = await params;
  return (
    <div className={styles.page}>
      <NavServer city={city} />

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>
            Professional Christmas Light Installation: Beautiful Holiday Lighting
            Without the Stress.
          </h1>
          <p className={styles.heroLead}>
            Holiday lighting should make your home feel magical, not turn into a
            weekend spent on ladders, untangling lights, and fighting frozen
            fingers in Colorado weather.
          </p>
          <p className={styles.heroLead}>
            Power Electrical, Heating &amp; Cooling Services provides professional
            residential and commercial Christmas light installation throughout the
            Denver metro area. From rooflines and tree wraps to custom holiday
            displays and commercial properties, we design, install, maintain,
            remove, and store professional-grade LED holiday lighting safely and
            professionally.
          </p>
          <p className={styles.heroLead}>
            Whether you want a simple clean roofline or a full custom holiday
            display, we make the process easy from start to finish.
          </p>
          <p className={styles.heroTagline}>
            Professional design. Safe installation. Clean finished look.
          </p>
          <div className={styles.heroMeta}>
            <a href={PHONE_HREF} className={styles.heroPhone}>
              Book Now: {PHONE_DISPLAY}
            </a>
            <span className={styles.heroMetaSep} aria-hidden>
              |
            </span>
            <span>5.0 Stars</span>
            <span className={styles.heroMetaSep} aria-hidden>
              |
            </span>
            <span>201 Reviews</span>
          </div>
          <div className={styles.heroBadge}>
            <GoogleBadge />
          </div>
          <div className={styles.heroActions}>
            <BookBtn />
            <CallBtn />
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <h2>Professional Holiday Lighting Services We Offer</h2>
          <HolidayLightingAccordion items={SERVICE_ITEMS} />
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <h2>Lease or Purchase Options Available</h2>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            Flexible options designed around what works best for you.
          </p>
          <HolidayLightingAccordion items={LEASE_PURCHASE_ITEMS} />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <h2>Why Professional Christmas Light Installation Matters</h2>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            Holiday lighting looks better and lasts longer when it&apos;s done
            correctly. Professional installation is about more than
            convenience — it creates a cleaner appearance, improves safety, and
            protects both your home and the lighting system itself.
          </p>
          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <h3>Safety</h3>
              <p className={styles.prose}>
                Ladder injuries increase dramatically during the holiday season,
                especially when homeowners work on icy roofs, steep pitches, or
                second-story rooflines. Our team uses professional installation
                methods, proper safety equipment, and commercial-grade attachment
                systems designed specifically for holiday lighting.
              </p>
            </div>
            <div className={styles.whyCard}>
              <h3>Cleaner Finished Appearance</h3>
              <p className={styles.prose}>
                Professional spacing, proper light sizing, straight lines,
                balanced layouts, and hidden extension runs create the polished
                look homeowners want but rarely achieve with retail store lights
                and temporary clips. The difference is immediately visible.
              </p>
            </div>
            <div className={styles.whyCard}>
              <h3>Commercial-Grade Materials</h3>
              <p className={styles.prose}>
                We install professional-grade LED holiday lighting systems
                designed for outdoor commercial use, not temporary retail lights
                designed to last one season. Our LED lighting uses less
                electricity, produces brighter output, lasts longer, handles
                Colorado weather better, and reduces outages during the season.
              </p>
            </div>
            <div className={styles.whyCard}>
              <h3>Colorado Weather Matters</h3>
              <p className={styles.prose}>
                Denver metro weather changes fast. Snow, ice, wind, freezing
                temperatures, and rapid temperature swings are hard on holiday
                lighting systems and unsafe for DIY installation. Professional
                installation helps protect your home, your roof, and your
                lighting investment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <h2>Our Christmas Light Installation Process</h2>
          <ul className={styles.bulletList} style={{ maxWidth: "640px", margin: "0 auto" }}>
            <li>● We discuss your lighting goals, layout ideas, and budget</li>
            <li>● We measure rooflines, trees, landscaping, and architectural features</li>
            <li>● We recommend the best lighting options for your property</li>
            <li>● We custom-fit and professionally install the lighting system</li>
            <li>● We test every section before leaving</li>
            <li>● We provide in-season service if needed</li>
            <li>● We remove and store leased systems after the holidays</li>
          </ul>
          <p className={styles.prose} style={{ textAlign: "center", marginTop: "1.25rem" }}>
            <strong>Simple. Professional. Stress-free.</strong>
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <h2>Why Homeowners &amp; Businesses Choose Us</h2>
          <ul className={styles.bulletList}>
            <li>
              ● <strong>20+ Years in the Trade:</strong> Real experience working
              safely on homes and commercial properties throughout Denver metro
            </li>
            <li>
              ● <strong>Family-Owned &amp; Operated:</strong> A local team that
              genuinely cares about clean finished work and customer experience
            </li>
            <li>
              ● <strong>CLIPA Certified:</strong> Certified for residential and
              commercial Christmas light installation
            </li>
            <li>
              ● <strong>Professional-Grade Materials:</strong> Commercial LED
              lighting systems built for reliability and appearance
            </li>
            <li>
              ● <strong>Residential &amp; Commercial Service:</strong> From
              single-family homes to large commercial properties
            </li>
            <li>
              ● <strong>Lease or Purchase Options:</strong> Flexible solutions
              that fit your goals and budget
            </li>
            <li>
              ● <strong>Fully Licensed &amp; Insured:</strong> Professional
              installation with safety and liability handled properly
            </li>
            <li>
              ● <strong>5.0-Star Rating With 201 Reviews:</strong> Our customers
              speak for themselves
            </li>
          </ul>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            We make holiday lighting easy, safe, and professionally done.
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <h2>Christmas Light Installation FAQs</h2>
          <HolidayLightingAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <h2>Want to Make Next Year Even Easier?</h2>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            Our returning customer scheduling program helps simplify future
            holiday lighting installation year after year.
          </p>
          <div className={styles.ctaCard}>
            <Link href="/contact" className={styles.ctaCardLink}>
              Ask About Returning Customer Scheduling
            </Link>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <h2>Financing &amp; Membership</h2>
          <div className={styles.dualCards}>
            <div className={styles.ctaCard}>
              <h3>Flexible Payment Options</h3>
              <p className={styles.prose}>
                We offer flexible options for larger residential and commercial
                holiday lighting projects.
              </p>
              <Link href="/financing" className={styles.ctaCardLink}>
                Ask About Payment Options
              </Link>
            </div>
            <div className={styles.ctaCard}>
              <h3>Returning Customer Benefits</h3>
              <p className={styles.prose}>
                Priority scheduling and simplified reinstallations for returning
                customers.
              </p>
              <Link href="/membership" className={styles.ctaCardLink}>
                Ask About Returning Customer Benefits
              </Link>
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

      <section className={styles.closing}>
        <h2>Ready to Light Up Your Home for the Holidays? Let&apos;s Make It Happen.</h2>
        <p>
          Skip the ladders, tangled lights, and frustration this year. We&apos;ll
          design, install, remove, and store your holiday lighting professionally
          so you can simply enjoy the season.
        </p>
        <p>
          <a href={PHONE_HREF} className={styles.closingPhone}>
            Call or Text: {PHONE_DISPLAY}
          </a>
        </p>
        <div className={styles.closingActions}>
          <BookBtn label="Book Service Today" />
          <CallBtn />
        </div>
        <p className={styles.closingTagline}>We Put The Power In Your Project!</p>
        <p className={styles.closingAddress}>
          <a href={MAPS_HREF} target="_blank" rel="noopener noreferrer">
            {ADDRESS}
          </a>
        </p>
      </section>

      <Footer />
    </div>
  );
}
