import Link from "next/link";

import NavServer from "../../components/Nav/NavServer";
import Footer from "../../components/Footer";
import BookBtn from "../../components/BookBtn";
import CallBtn from "../../components/CallBtn";
import GoogleBadge from "../../components/GoogleBadge";
import GoogleCarousel from "../../components/GoogleCarousel";
import CategoryForm from "../../components/CategoryForm";
import styles from "./styles.module.css";
import StatCont from "../../components/StatCont";

const PHONE_DISPLAY = "(720) 272-2562";
const PHONE_HREF = "tel:+17202722562";
const ADDRESS = "5650 N Washington St. Unit C-6, Denver, CO 80216";
const MAPS_HREF = "https://maps.app.goo.gl/Lw2x8JKXuSi5YrMq9";

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/Powereletricalservices/" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/power_electrical_hvac_services/",
  },
  { label: "TikTok", href: "https://www.tiktok.com/@powerelectricalhvac" },
  { label: "Yelp", href: "https://www.yelp.com/" },
  { label: "Nextdoor", href: "https://nextdoor.com/" },
  {
    label: "BBB",
    href: "https://www.bbb.org/us/co/denver/profile/electrical-contractors/power-electrical-services-1296-1000125617",
  },
];

const CORE_VALUES = [
  {
    letter: "P",
    title: "Professionalism",
    subtitle: "Respect – Preparation – Pride",
    description:
      "We hold ourselves to a high standard on every job — how we show up, how we communicate, and how we leave your home or job site. Every time, no exceptions.",
  },
  {
    letter: "O",
    title: "Outstanding Service",
    subtitle: "Customer First – Above & Beyond – Satisfaction",
    description:
      "We don't just complete jobs — we create experiences worth talking about. Our goal is to leave every customer wondering why they didn't call us sooner.",
  },
  {
    letter: "W",
    title: "Winning Attitude",
    subtitle: "Positive – Driven – Solution-Oriented",
    description:
      "Every job has surprises. We don't make excuses — we find solutions. No challenge is too complicated and no question is too small.",
  },
  {
    letter: "E",
    title: "Efficiency",
    subtitle: "Timely – Organized – Effective",
    description:
      "We respect your time as much as our own. We show up when we say, work without unnecessary delays, and leave your space cleaner than we found it.",
  },
  {
    letter: "R",
    title: "Reliability",
    subtitle: "Dependable – Consistent – Trustworthy",
    description:
      "When we say we'll be there, we're there. When we say it's done right, it is. Our customers don't have to follow up — because we follow through.",
  },
];

export const metadata = {
  title: "About Us | Power Electrical, Heating & Cooling Services",
  description:
    "Family-owned electrical and HVAC company serving the Denver metro since 2005. 20+ years of experience, 5.0 Google rating, and one call for electrical and HVAC.",
};

export default async function AboutPage({ params }) {
  const { city } = await params;
  return (
    <article className={styles.page}>
      <NavServer city={city} />

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>
            About Power Electrical, Heating &amp; Cooling Services
          </p>
          <h1 className={styles.heroTitle}>
            We&apos;re Not Just Another Service Company — We&apos;re a Family
            Serving Families Across the Denver Metro Area.
          </h1>
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
            <span>200+ Reviews</span>
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
          <p className={styles.prose}>
            Power Electrical, Heating &amp; Cooling Services is a family-owned
            and operated company built on experience, trust, and a genuine
            commitment to the communities we serve. What started as one licensed
            electrician with a truck and a passion for doing things right has
            grown into a full electrical and HVAC team serving homeowners,
            businesses, contractors, and real estate professionals across the
            Denver metro area.
          </p>
          <p className={styles.prose}>
            Our story didn&apos;t start overnight. It started in 2005 with an
            apprenticeship, continued through years of hands-on field work, and
            was built one satisfied customer at a time. Over 20 years later that
            same commitment to honest, quality work is at the core of everything
            we do.
          </p>
          <p className={styles.prose}>
            In 2020 the Power Electrical brand was born and with it came a true
            family operation. A key member of our team brings over 23 years of
            residential, commercial, and industrial electrical experience to
            every project, helping ensure our work meets the highest standards of
            quality and code compliance. Together our team shares the same
            mindset: show up, do it right, and always put the customer first.
          </p>
          <p className={styles.prose}>
            In 2025 we expanded into heating and cooling services, adding a skilled
            HVAC team with years of industry experience. Today Power Electrical,
            Heating &amp; Cooling Services is one of the few Denver metro
            companies offering electrical and HVAC under one roof so our
            customers never have to juggle multiple companies or make more than
            one call.
          </p>
          <h2>Our Mission</h2>
          <p className={styles.prose}>
            To deliver honest, reliable electrical and HVAC services that
            homeowners, contractors, and businesses can count on — every single
            time.
          </p>
          <p className={styles.prose}>
            We believe great work speaks for itself. That&apos;s why we focus on
            doing the job right the first time, communicating clearly throughout,
            and standing behind everything we do. No upselling. No unnecessary
            work. No surprises on your bill.
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <h2>Our Core Values — Built Into Everything We Do</h2>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            Our values don&apos;t just sit on a wall. They&apos;re the foundation
            every member of our team is held to on every job.
          </p>
          <div className={styles.valuesGrid}>
            {CORE_VALUES.map((value) => (
              <div key={value.letter} className={styles.valueCard}>
                <p className={styles.valueLetter}>{value.letter}</p>
                <p className={styles.valueTitle}>{value.title}</p>
                <p className={styles.valueSubtitle}>{value.subtitle}</p>
                <p className={styles.prose}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <h2>Our Credentials</h2>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            We&apos;re proud to be recognized and accredited by the organizations
            and platforms that hold service companies to the highest standards:
          </p>
          <ul className={styles.bulletList} style={{ maxWidth: "480px", margin: "0 auto" }}>
            <li>● Best of Business</li>
            <li>● Housecall Pro Super Pro</li>
            <li>● BBB Accredited Business</li>
          </ul>
        </div>
      </section>
            <StatCont />
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <h2>Where You Can Find Us</h2>
          <div className={styles.addressBlock}>
            <p className={styles.prose}>
              <a
                href={MAPS_HREF}
                className={styles.addressLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ADDRESS}
              </a>
            </p>
            <p className={styles.prose}>
              <a href={PHONE_HREF} className={styles.addressLink}>
                {PHONE_DISPLAY}
              </a>
            </p>
          </div>
          <h3 style={{ textAlign: "center" }}>Follow us</h3>
          <ul className={styles.socialList}>
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <div className={styles.contactGrid}>
            <div className={styles.contactBox}>
              <h3>Non-Emergency Requests</h3>
              <p className={styles.prose}>
                Have a question or want to schedule service? Fill out the form
                below or give us a call and we&apos;ll get back to you promptly.
              </p>
              <p className={styles.prose}>
                <a href={PHONE_HREF} className={styles.addressLink}>
                  Book Now: {PHONE_DISPLAY}
                </a>
              </p>
              <BookBtn />
            </div>
            <div className={`${styles.contactBox} ${styles.emergencyBox}`}>
              <h3>Emergency Services</h3>
              <p className={styles.prose}>
                For immediate assistance please call us directly:
              </p>
              <p className={styles.prose}>
                <a href={PHONE_HREF} style={{ color: "#fff", fontWeight: 700 }}>
                  {PHONE_DISPLAY}
                </a>
              </p>
              <p className={styles.prose}>We&apos;re here when you need us most.</p>
              <CallBtn />
            </div>
          </div>
        </div>
      </section>

      <CategoryForm />

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <h2>Financing &amp; Membership</h2>
          <div className={styles.dualCards}>
            <div className={styles.infoCard}>
              <h3>Financing Options</h3>
              <p className={styles.prose}>
                We offer flexible financing options so cost never stands between
                you and a safe, comfortable home.
              </p>
              <Link href="/financing" className={styles.infoCardLink}>
                Check Our Financing Options
              </Link>
            </div>
            <div className={styles.infoCard}>
              <h3>Service Plan Memberships</h3>
              <p className={styles.prose}>
                Our membership plans keep your home running smoothly year round
                with priority scheduling and regular maintenance.
              </p>
              <Link href="/membership" className={styles.infoCardLink}>
                See Membership Benefits
              </Link>
            </div>
          </div>
        </div>
      </section>

      <GoogleCarousel />

      <section className={styles.closing}>
        <h2>Ready to Experience the Power Electrical Difference?</h2>
        <p>
          Whether you&apos;re a homeowner dealing with an electrical issue, a
          contractor who needs a reliable sub, or a real estate professional on a
          deadline — we&apos;re ready to help.
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
      </section>

      <Footer />
    </article>
  );
}
