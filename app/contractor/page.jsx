import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";
import GoogleBadge from "../components/GoogleBadge";
import BookBtn from "../components/BookBtn";
import CallBtn from "../components/CallBtn";
import ServiceForm from "../components/ServiceForm";
import GoogleCarousel from "../components/GoogleCarousel";
import LocationCont from "../components/LocationsCont";
import Footer from "../components/Footer";
import NavServer from "../components/Nav/NavServer";
import { getContractorLinks } from "./resolveServiceLinks";


export const revalidate = false;

const CITY_NAME = "Denver";
const CITY_SLUG = "Denver";
const HERO_IMAGE = "/homeHero.jpg";
const SECONDARY_IMAGE = "/statsBG.jpg";
const PHONE_DISPLAY = "(720) 272-2562";
const PHONE_HREF = "tel:+17202722562";
const ADDRESS = "5650 Washington St. Unit C-6, Denver, CO 80216";

export const metadata = {
  title: "Electrical & HVAC for Contractors | Denver Metro",
  description:
    "Dependable electrical and HVAC subcontractor support for contractors in the Denver Metro. On-time scheduling, clear communication, and code-compliant work. Call (720) 272-2562.",
};

export default async function ContractorPage() {
  const L = await getContractorLinks();

  return (
    <article className={styles.servicePage}>
      <NavServer/>
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
              Keep Your Project on Schedule: We Show Up, We Deliver, We Get It
              Done.
            </h1>
            <p className={styles.heroSubtitle}>
              When your electrical or HVAC subcontractor falls behind, your
              entire project pays the price.
            </p>
            <p className={styles.heroTagline}>
              Power Electrical, Heating &amp; Cooling Services provides
              dependable, licensed electrical and HVAC support for general
              contractors, project managers, developers, and property
              professionals across the Denver metro area.
              <br />
              <br />
              One team. Both trades. No delays.
            </p>
            <p className={styles.heroTagline}>
              <a href={PHONE_HREF} style={{ color: "#fff", fontWeight: 700 }}>
                Book Now: {PHONE_DISPLAY}
              </a>
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
            <h2>The Problem We Solve</h2>
            <p className={styles.lead}>
              When Subcontractors Let You Down, We Step In.
            </p>
            <p className={styles.prose}>
              We understand what keeps contractors, project managers, and
              developers up at night.
            </p>
            <ul className={styles.bulletList}>
              <li>● Subcontractors not showing up or falling behind schedule</li>
              <li>● Failed inspections and code violations slowing progress</li>
              <li>● Poor communication leaving you in the dark</li>
              <li>● Last-minute electrical or HVAC needs with no available crew</li>
              <li>
                ● Previous work needing correction before the project can move
                forward
              </li>
              <li>
                ● Paying twice for jobs that weren&apos;t done right the first
                time
              </li>
              <li>● Permit delays holding up timelines</li>
              <li>
                ● No documentation of completed work for liability protection
              </li>
              <li>
                ● Coordinating multiple trades with no single point of contact
              </li>
              <li>● Cost overruns eating into project margins</li>
            </ul>
            <p className={styles.prose}>
              That&apos;s exactly why we built our business the way we did.
            </p>
            <p className={styles.prose}>
              One licensed team handling both electrical and HVAC means fewer
              subcontractors to coordinate, fewer scheduling conflicts, and one
              clear point of contact when you need answers fast.
            </p>
            <p className={styles.prose}>
              We pull permits properly, document our work, communicate
              proactively, and never leave a job site without making sure
              everything is right.
            </p>
            <p className={styles.prose}>
              We&apos;ve built our reputation on being the team that shows up,
              communicates clearly, and leaves the job done correctly the first
              time.
            </p>
            <p className={styles.lead}>One call. Both trades. No excuses.</p>
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
                <h3>Schedule project support</h3>
                <p className={styles.prose}>
                  Need panel upgrades or corrections? See our{" "}
                  <Link href={L.panelUpgrades} className={styles.inlineLink}>
                    Electrical Panel Upgrade Services
                  </Link>
                  .
                </p>
                <p className={styles.ctaLine}>
                  Call or Text: {PHONE_DISPLAY}
                </p>
                <p className={styles.ctaLine}>
                  <Link href={L.contact} className={styles.bookLink}>
                    Schedule Project Support
                  </Link>
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

      <section className={styles.secondarySection}>
        <div className={styles.secondarySectionInnerContainer}>
          <div className={styles.secondarySectionContent}>
            <h2>About Our Team</h2>
            <p className={styles.lead}>Built on Teamwork. Driven by Results.</p>
            <p className={styles.prose}>
              What started as one licensed electrician with a truck and a
              commitment to honest work has grown into a full electrical and HVAC
              team serving the Denver metro area.
            </p>
            <p className={styles.prose}>
              From our Master Licensed electrician handling permits and code
              compliance to our HVAC technicians and apprentices coming up
              through the trade, every person on our crew is held to the same
              standard: show up on time, communicate clearly, do the work right
              the first time.
            </p>
            <p className={styles.prose}>
              With 20+ years of hands-on experience behind us and a team
              that&apos;s constantly growing, we bring the skill,
              professionalism, and reliability contractors and developers need
              to keep projects moving.
            </p>
            <p className={styles.ctaLine}>
              <a href={PHONE_HREF} className={styles.inlineLink}>
                Book Now: {PHONE_DISPLAY}
              </a>
            </p>
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
            <h2>Services We Provide for Contractors</h2>
            <p className={styles.lead}>
              Electrical &amp; HVAC Services Built for the Job Site
            </p>
            <ul className={styles.bulletList}>
              <li>● Electrical rough-in and finish work</li>
              <li>● Panel installations and upgrades</li>
              <li>● Code compliance and corrections</li>
              <li>● Inspection repairs and rework</li>
              <li>● Troubleshooting and diagnostics</li>
              <li>● Job site coordination and support</li>
              <li>● HVAC installation and replacement</li>
              <li>● HVAC system repairs and corrections</li>
              <li>● Full project support, electrical and HVAC combined</li>
            </ul>
            <p className={styles.prose}>
              Need panel upgrades or corrections? See our{" "}
              <Link href={L.panelUpgrades} className={styles.inlineLink}>
                Electrical Panel Upgrade Services
              </Link>
              .
            </p>
            <p className={styles.prose}>
              Need reliable HVAC installation? Explore our{" "}
              <Link href={L.hvacInstallation} className={styles.inlineLink}>
                HVAC Installation Services
              </Link>
              .
            </p>
            <p className={styles.prose}>
              Dealing with code violations? See our{" "}
              <Link href={L.codeCorrections} className={styles.inlineLink}>
                Electrical Code Correction Services
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.extraSection} ${styles.extraSectionAlt}`}>
        <div className={styles.extraSectionInner}>
          <h2>Your Process When You Work With Us</h2>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            Here&apos;s what to expect every time.
          </p>
          <ul className={styles.bulletList} style={{ maxWidth: "720px", margin: "0 auto" }}>
            <li>
              ● <strong>Fast response:</strong> We prioritize contractor calls
              and aim to be onsite quickly for urgent needs
            </li>
            <li>
              ● <strong>Clear scope:</strong> We assess the situation and provide
              straightforward recommendations and pricing
            </li>
            <li>
              ● <strong>Transparent estimates:</strong> Detailed pricing before
              any work begins, no surprise invoices
            </li>
            <li>
              ● <strong>Licensed work:</strong> All electrical work performed
              under proper licensing and permits
            </li>
            <li>
              ● <strong>Clean execution:</strong> Quality materials, professional
              installation, and complete testing
            </li>
            <li>
              ● <strong>Clear communication:</strong> Ongoing updates so
              you&apos;re never left wondering where things stand
            </li>
            <li>
              ● <strong>Follow-through:</strong> We don&apos;t leave until the
              work is complete and done correctly
            </li>
          </ul>
        </div>
      </section>

      <section className={styles.extraSection}>
        <div className={styles.extraSectionInner}>
          <h2>Why Contractors, Project Managers &amp; Developers Choose Us</h2>
          <ul className={styles.bulletListCenter}>
            <li>
              ● <strong>20+ Years in the Trade:</strong> Real hands-on experience
              across hundreds of job sites
            </li>
            <li>
              ● <strong>Properly Licensed &amp; Permitted:</strong> Electrical
              Contractor License and Master Electrical License for full permit
              compliance
            </li>
            <li>
              ● <strong>Electrical + HVAC Under One Roof:</strong> One
              subcontractor for both trades means fewer scheduling headaches
            </li>
            <li>
              ● <strong>We Show Up:</strong> Reliable scheduling and clear
              communication on every project
            </li>
            <li>
              ● <strong>Code-Compliant Work:</strong> We do it right the first
              time so inspections pass
            </li>
            <li>
              ● <strong>2,047 Contractor Projects Completed:</strong> We
              understand job site expectations because we&apos;ve lived them
            </li>
            <li>
              ● <strong>No Finger Pointing:</strong> One team handling both
              trades means no blame game between subcontractors
            </li>
            <li>
              ● <strong>Family-Owned &amp; Operated:</strong> You&apos;re working
              with people who care about their reputation
            </li>
          </ul>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            We make your job easier, not harder.
          </p>
        </div>
      </section>

      <section className={`${styles.extraSection} ${styles.extraSectionAlt}`}>
        <div className={styles.extraSectionInner}>
          <h2>Get In Touch</h2>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            Have a project coming up or a job site issue that needs fast
            attention?
          </p>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            Fill out the form below or call us directly.
          </p>
          <p className={styles.ctaLine} style={{ textAlign: "center" }}>
            <a href={PHONE_HREF} className={styles.inlineLink}>
              Call or Text: {PHONE_DISPLAY}
            </a>
          </p>
          <p className={styles.ctaLine} style={{ textAlign: "center" }}>
            <Link href={L.contact} className={styles.bookLink}>
              Schedule Project Support
            </Link>
          </p>
        </div>
      </section>

      <ServiceForm serviceName="Denver Contractor Electrical & HVAC Support" />

      <section className={styles.extraSection}>
        <div className={styles.extraSectionInner}>
          <h2>Common Job Site Problems We Solve</h2>
          <ul className={styles.bulletList} style={{ maxWidth: "640px", margin: "0 auto" }}>
            <li>● Delayed electrical or HVAC work holding up your schedule</li>
            <li>● Failed inspections and code issues</li>
            <li>● Poor workmanship from previous subcontractors</li>
            <li>● Last-minute project needs with no available crew</li>
            <li>● Jobs falling behind schedule with no clear solution</li>
          </ul>
          <p className={styles.lead} style={{ textAlign: "center" }}>
            We step in, solve the issue, and keep your project moving forward.
          </p>
        </div>
      </section>

      <section className={`${styles.extraSection} ${styles.extraSectionAlt}`}>
        <div className={styles.extraSectionInner}>
          <h2>Financing &amp; Membership</h2>
          <div className={styles.dualCards}>
            <div className={styles.infoCard}>
              <h3>Financing Options</h3>
              <p className={styles.prose}>
                We offer financing options to help keep your project moving.
              </p>
              <Link href="/financing" className={styles.infoCardLink}>
                Check Our Financing Options
              </Link>
            </div>
            <div className={styles.infoCard}>
              <h3>Service Plan Memberships</h3>
              <p className={styles.prose}>
                Ongoing project support with priority scheduling and consistent
                service.
              </p>
              <Link href="/membership" className={styles.infoCardLink}>
                See Membership Benefits
              </Link>
            </div>
          </div>
        </div>
      </section>

      <GoogleCarousel />

      <section className={styles.extraSection}>
        <div className={styles.extraSectionInner}>
          <h2>Serving the Denver Metro Area</h2>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            We provide contractor electrical and HVAC support across:
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
            <li>Thornton | Northglenn | Westminster | Brighton | Commerce City | Broomfield</li>
            <li>Aurora | Arvada | Lakewood | Wheat Ridge | Denver | Erie</li>
            <li>Littleton | Centennial | Greenwood Village | Highlands Ranch | Golden</li>
          </ul>
          <p className={styles.lead} style={{ textAlign: "center" }}>
            Fast, reliable support across the entire Denver metro area.
          </p>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            {ADDRESS}
          </p>
        </div>
      </section>

      <LocationCont />

      <section className={`${styles.extraSection} ${styles.extraSectionAlt}`}>
        <div className={styles.extraSectionInner}>
          <h2>Need a Reliable Team on Your Next Project? Let&apos;s Get to Work.</h2>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            Whether you need dependable electrical and HVAC support for a single
            job or a long-term subcontractor relationship, we&apos;re ready to
            show up and deliver.
          </p>
          <p className={styles.ctaLine} style={{ textAlign: "center" }}>
            <a href={PHONE_HREF} className={styles.inlineLink}>
              Call or Text: {PHONE_DISPLAY}
            </a>
          </p>
          <p className={styles.ctaLine} style={{ textAlign: "center" }}>
            <Link href={L.contact} className={styles.bookLink}>
              Schedule Project Support Today
            </Link>
          </p>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            Have a deadline to meet? Tell us your timeline and we&apos;ll make it
            work.
          </p>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            Looking for a reliable long-term partner?{" "}
            <Link href={L.contact} className={styles.inlineLink}>
              Contact us today
            </Link>{" "}
            to discuss your next project.
          </p>
          <p className={styles.lead} style={{ textAlign: "center", marginTop: "1.25rem" }}>
            We Put The Power In Your Project!
          </p>
          <p className={styles.ctaLine} style={{ textAlign: "center" }}>
            <a href={PHONE_HREF} className={styles.bookLink}>
              Book Now: {PHONE_DISPLAY}
            </a>
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

      <Footer />
    </article>
  );
}
