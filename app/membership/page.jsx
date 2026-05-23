import Link from "next/link";

import NavServer from "../components/Nav/NavServer";
import Footer from "../components/Footer";
import BookBtn from "../components/BookBtn";
import CallBtn from "../components/CallBtn";
import GoogleCarousel from "../components/GoogleCarousel";
import MembershipAccordion from "./MembershipAccordion";
import MembershipSignupForm from "./MembershipSignupForm";
import styles from "./styles.module.css";

const COMPARISON_ROWS = [
  ["Monthly Price", "$14/month", "$24/month", "$39/month"],
  ["Priority Scheduling", "✓ Within 24 hrs", "✓ Guaranteed", "✓ Dedicated Line"],
  ["Arrival Window Guarantee", "✓ 2-hour window", "✓ 2-hour window", "✓ 2-hour window"],
  ["Repair Discount", "5% off", "10% off up to $250", "10% off up to $250"],
  ["HVAC Visits Per Year", "1: Your choice", "2: AC + Furnace", "2: AC + Furnace"],
  ["Annual Electrical Panel Check", "✓", "✓", "✓"],
  ["Quarterly Filter Delivery & Install", "✕", "✓", "✓"],
  ["Annual Condensate Line Cleaning", "✕", "✓", "✓"],
  ["Diagnostic Fee Waived", "✕", "✓ On approved repair", "✓ On approved repair"],
  ["Free Annual IAQ Assessment", "✕", "✓", "✓"],
  ["Full Combustion Safety Check", "✕", "✓ Every Fall", "✓ Every Fall"],
  ["Transferable When You Sell", "✓", "✓", "✓"],
  ["24/7 Smart Monitoring: POWERSTAT", "✕", "✕", "✓"],
  [
    "Holiday Lighting Priority & Pricing",
    "Member Pricing",
    "Priority + Pricing",
    "Priority + Pricing",
  ],
  ["Special Pricing on HVAC Add-Ons", "✕", "✓", "✓"],
];

const PLAN_DETAIL_ITEMS = [
  {
    _id: "advantage",
    title: "⚡ Power Advantage Plan: $14/month",
    body: [
      "The essential protection plan. Perfect for homeowners who want priority access and annual peace of mind.",
      "For less than $0.50 a day you get priority scheduling that puts you ahead of the general public, a guaranteed 2-hour arrival window so you're not waiting around all day, one professional HVAC performance visit per year for the system of your choosing, an annual electrical panel safety check, 5% off all electrical and HVAC repairs, and transferable coverage when you sell your home.",
      "This plan is for the homeowner who wants to know that when something goes wrong, they're not starting from scratch. They have a team. They have priority. They have a discount.",
    ],
    bestFor:
      "Homeowners who want essential protection and priority access at the most affordable price point.",
    ctaLabel: "Sign Up: Power Advantage — First Month Free",
  },
  {
    _id: "club",
    title: "🌟 Power Club Plan: $24/month — Most Popular",
    body: [
      "Our most popular plan. Two system visits per year, the most comprehensive benefits, and savings that consistently exceed the cost of membership.",
      "For $24 a month you get everything in Power Advantage PLUS a second annual visit, spring AC tune-up and fall furnace tune-up, quarterly filter delivery and install so you never have to think about it, annual condensate line cleaning that prevents the water damage and system shutdowns that a clogged drain causes, your diagnostic fee waived every time you approve a repair, a free annual IAQ assessment, and a full combustion safety check every fall that includes heat exchanger inspection and carbon monoxide testing.",
      "This is the plan that pays for itself. One diagnostic fee waived covers four months of membership. One repair discount on a mid-size job covers the whole year. And that's before counting the two tune-ups, the filters, the condensate cleaning, and the IAQ assessment.",
    ],
    bestFor:
      "Homeowners who want comprehensive coverage, maximum value, and the plan that most consistently pays for itself within the first few months.",
    ctaLabel: "Sign Up: Power Club — First Month Free",
  },
  {
    _id: "protection",
    title: "🛡️ Power Protection Plan: $39/month",
    body: [
      "Our most comprehensive plan, including POWERSTAT 24/7 smart monitoring that watches your system around the clock and calls you before you know there's a problem.",
      "For $39 a month you get everything in Power Club PLUS POWERSTAT, an exclusive smart thermostat monitoring system available only through certified contractor partners that watches your heating and cooling system 24 hours a day, 7 days a week.",
      "When an alert triggers we contact you within one hour. We tell you exactly what the system is showing, what it means, and whether you need a tech, before you've even noticed anything is wrong.",
      "You also get a dedicated service line that connects you directly to our team, special pricing on HVAC system add-ons like surge protectors, hard start kits, and smart thermostats, and priority scheduling for holiday exterior lighting.",
      "This is the plan for homeowners who want to know their home is being watched, not just serviced once a year.",
    ],
    bestFor:
      "Homeowners who want the highest level of protection, the exclusive POWERSTAT monitoring advantage, and the most comprehensive coverage available.",
    ctaLabel: "Sign Up: Power Protection — First Month Free",
  },
];

const FAQ_ITEMS = [
  {
    _id: "faq-cancel",
    title: "Can I cancel my membership?",
    body: [
      "Our membership plans require a 12-month minimum commitment.",
      "After the first year your plan renews month-to-month and can be cancelled in writing at least 30 days prior to your next billing date.",
      "Early cancellation during the initial term results in a one-time charge for the remaining balance of the initial commitment.",
    ],
  },
  {
    _id: "faq-transfer",
    title: "Is my membership transferable if I sell my home?",
    body: [
      "Yes.",
      "Power Advantage and Power Club memberships are transferable to the new homeowner if you sell your home.",
      "This is a genuine value-add when selling. A home with an active service membership is more attractive to buyers.",
    ],
  },
  {
    _id: "faq-between",
    title: "What happens if I need service between scheduled visits?",
    body: [
      "Members receive priority scheduling on all service calls, not just their included maintenance visits.",
      "When you call as a member you go to the front of the line.",
      "Your repair discounts apply to any service call throughout the year.",
    ],
  },
  {
    _id: "faq-repairs",
    title: "Does my membership cover repairs or just maintenance?",
    body: [
      "Maintenance visits are included in your plan.",
      "Repairs are discounted, 5% for Power Advantage members and 10% up to $250 for Power Club and Power Protection members, but not included in the base membership cost.",
      "This keeps your monthly cost low while still saving you money every time you need a repair.",
    ],
  },
  {
    _id: "faq-free-month",
    title: "When does my first month free start?",
    body: [
      "Your first month free begins on your enrollment date.",
      "Your second month billing begins 30 days after enrollment.",
      "Your included maintenance visits are scheduled after enrollment. We'll contact you to set those up at a time that works for you.",
    ],
  },
  {
    _id: "faq-upgrade",
    title: "Can I upgrade my plan after signing up?",
    body: [
      "Yes.",
      "You can upgrade to a higher tier at any time.",
      "Downgrades are processed at your next renewal date.",
    ],
  },
];

export const metadata = {
  title: "Home Protection Membership Plans | Power Electrical, Heating & Cooling",
  description:
    "Power membership plans from $14/month. Priority scheduling, annual HVAC maintenance, repair discounts, and first month free. Power Advantage, Power Club, and Power Protection.",
};

export default function MembershipPage() {
  return (
    <div className={styles.page}>
      <NavServer />

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>
            Home Protection Membership Plans: Stop Paying Emergency Prices.
            Start Paying Member Prices.
          </h1>
          <p className={styles.heroLead}>
            Here&apos;s the reality of home ownership in Colorado.
          </p>
          <p className={styles.heroLead}>
            Your furnace doesn&apos;t break down in October when it&apos;s
            convenient and you have time to shop around. It breaks down in
            January at 11pm when it&apos;s 8 degrees outside and your family is
            trying to sleep.
          </p>
          <p className={styles.heroLead}>
            Your AC doesn&apos;t fail in April before summer starts. It fails in
            July during a heat wave when every HVAC company in Denver is booked
            out for days.
          </p>
          <p className={styles.heroLead}>
            Emergency repairs cost more. Wait times are longer. And the stress of
            scrambling to find a reliable contractor when something breaks is
            something no homeowner should have to deal with.
          </p>
          <p className={styles.heroLead}>
            Our membership plans change that equation entirely.
          </p>
          <p className={styles.heroLead}>
            For as little as $14 a month, less than a single fast food meal, you
            get priority scheduling that puts you at the front of the line,
            annual maintenance that prevents most breakdowns before they happen,
            repair discounts that pay for your membership with a single service
            call, and the peace of mind that comes from knowing a licensed team
            that knows your home is always just one call away.
          </p>
          <p className={styles.promoBanner}>
            This month only: Your first month is FREE when you sign up for any
            Power membership plan.
          </p>
          <div className={styles.heroActions}>
            <a href="#membership-signup" className={styles.signUpBtn}>
              Sign Up Today: First Month Free
            </a>
            <BookBtn />
            <CallBtn />
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <h2>The Math That Makes This a No-Brainer</h2>
          <div className={styles.mathGrid}>
            <div>
              <h3>What One Emergency Repair Call Costs Without a Membership</h3>
              <ul className={styles.bulletList}>
                <li>● Emergency HVAC diagnostic fee: $89 to $129</li>
                <li>● After-hours or weekend service premium: $50 to $100 additional</li>
                <li>● Average furnace repair: $250 to $500</li>
                <li>● Average AC repair: $200 to $450</li>
                <li>● Total for one emergency call: $350 to $700+</li>
              </ul>
            </div>
            <div>
              <h3>What a Power Club Membership Costs for an Entire Year</h3>
              <ul className={styles.bulletList}>
                <li>● $24/month × 12 months = $288 per year</li>
              </ul>
              <h3>What You Get for That $288</h3>
              <ul className={styles.bulletList}>
                <li>● Spring AC tune-up: $149.98 value</li>
                <li>● Fall furnace tune-up: $149.98 value</li>
                <li>● Diagnostic fee waived when you approve a repair: $89 to $129 value per visit</li>
                <li>● 10% off all repairs: Ongoing savings</li>
                <li>● Priority scheduling: Priceless when your heat goes out in January</li>
                <li>● Quarterly filter delivery and install: Included</li>
                <li>● Annual condensate line cleaning: Included</li>
                <li>● Free annual IAQ assessment: Included</li>
                <li>● Full combustion safety check every fall: Included</li>
              </ul>
            </div>
          </div>
          <div className={styles.mathHighlight}>
            <p>
              That&apos;s over $500 in value for $288 a year.
              <br />
              And your membership pays for itself the moment you use it for the
              first time.
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={`${styles.sectionInner} ${styles.sectionWide}`}>
          <h2>Choose Your Plan</h2>
          <div className={styles.tableScroll}>
            <table className={styles.compareTable}>
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  <th scope="col">⚡ Power Advantage</th>
                  <th scope="col">🌟 Power Club</th>
                  <th scope="col">🛡️ Power Protection</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row[0]}>
                    <th scope="row">{row[0]}</th>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                    <td>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <h2>Plan Details</h2>
          <MembershipAccordion items={PLAN_DETAIL_ITEMS} />
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <h2>What Our Members Say</h2>
          <blockquote className={styles.testimonial}>
            &ldquo;Joey came out and did a fantastic job looking over and cleaning
            my system for the winter. I had someone come out earlier in the year,
            but it felt more like he was trying to get me to buy a new system than
            help with my existing. Joey looked over the system, gave a few small
            but very helpful suggestions, and cleaned it. Could not recommend these
            folks enough.&rdquo;
            <cite>— W.B., Power Electrical Member</cite>
          </blockquote>
          <blockquote className={styles.testimonial}>
            &ldquo;We were lucky to have found Power Electrical. They have been an
            incredible asset to our property management company and do a great job
            in everything they do. Pricing is fair and communication is always
            clear and consistent. We highly recommend them for any of your
            needs.&rdquo;
            <cite>— Nikki H., Power Electrical Member</cite>
          </blockquote>
          <blockquote className={styles.testimonial}>
            &ldquo;I&apos;ve been doing business with Power Electrical Services for
            years. Owner is a stand up guy. Great service for a fair price. Always
            great communication. Respectful of your space and time.&rdquo;
            <cite>— Ryan S., Power Electrical Member</cite>
          </blockquote>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <h2>Why Membership Makes Sense in Colorado</h2>
          <p className={styles.prose}>
            Colorado&apos;s climate is uniquely demanding on home comfort systems.
          </p>
          <p className={styles.prose}>
            Six months of heating season from October through April. Intense summer
            heat waves that push AC systems to their limits. Cottonwood season that
            clogs coils and filters faster than almost anywhere else. Summer
            thunderstorms that surge electrical components. And temperature swings
            that put mechanical stress on every component in your system.
          </p>
          <p className={styles.prose}>
            The contractors who respond fastest when something breaks are the ones
            who already know your home.
          </p>
          <p className={styles.prose}>
            The repairs that cost the least are the ones caught during maintenance
            before they become emergencies.
          </p>
          <p className={styles.prose}>
            And the families that sleep best in January are the ones who had their
            furnace serviced in October.
          </p>
          <p className={styles.prose}>
            That&apos;s what a Power membership delivers, not just a discount
            card, but a relationship with a licensed local team that knows your
            systems, knows your home, and is ready when you need them.
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <h2>A Special Thank You to Those Who Serve</h2>
          <h3>⭐ Power Heroes Lifetime Membership</h3>
          <p className={styles.prose}>
            Power Electrical, Heating &amp; Cooling Services was built on the
            belief that great work comes from great communities, and our community
            includes the men and women who dedicate their lives to protecting and
            serving others.
          </p>
          <p className={styles.prose}>
            As a small token of our gratitude we offer a complimentary lifetime
            membership to qualifying first responders, military members, and
            frontline healthcare professionals.
          </p>
          <p className={styles.prose}>
            This isn&apos;t a discount. This isn&apos;t a promotion. This is our
            permanent commitment to the people who show up for others every day.
          </p>
          <div className={styles.heroesBox}>
            <h3>The Power Heroes Lifetime Membership Includes</h3>
            <ul className={styles.bulletList}>
              <li>● One annual furnace precision cleaning</li>
              <li>● One annual AC performance cleaning</li>
              <li>● One annual electrical panel safety inspection</li>
              <li>● 10% off all repairs and services</li>
              <li>● Priority scheduling</li>
              <li>● No monthly fee — No expiration — Ever</li>
            </ul>
            <h3>Qualifying Service Categories</h3>
            <ul className={styles.bulletList}>
              <li>● Law Enforcement Officers</li>
              <li>● Firefighters, career and volunteer</li>
              <li>● EMS, EMTs and Paramedics</li>
              <li>● 911 Dispatchers</li>
              <li>● Military, active duty, National Guard, Reserves, and Veterans</li>
              <li>
                ● Licensed hospital-based healthcare professionals, nurses,
                physicians, respiratory therapists, and clinical staff directly
                involved in patient care
              </li>
            </ul>
            <p className={styles.prose}>
              Proof of service is required. Benefits apply to the member&apos;s
              primary residence only.
            </p>
            <p className={styles.prose}>
              To apply for the Power Heroes Lifetime Membership, check the Heroes
              Plan box on the signup form below. We will verify your eligibility
              and activate your membership personally.
            </p>
          </div>
          <div className={styles.heroActions} style={{ marginTop: "1.5rem" }}>
            <a href="#membership-signup" className={styles.signUpBtn}>
              Sign Up Today: First Month Free
            </a>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.sectionInner} ${styles.signupSection}`}>
          <h2>Ready to stop paying emergency prices and start paying member prices?</h2>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            Fill out the form below and our team will contact you within one
            business day to complete your enrollment and activate your first month
            free.
          </p>
          <p className={styles.prose} style={{ textAlign: "center" }}>
            Already a member renewing your plan? Use the same form — just let us
            know in the notes field.
          </p>
          <h3 style={{ textAlign: "center" }}>Membership Signup Form</h3>
          <MembershipSignupForm />
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <h2>Frequently Asked Questions About Membership</h2>
          <MembershipAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <h2>Financing &amp; Membership</h2>
          <div className={styles.financingCard}>
            <h3>Financing Options</h3>
            <p className={styles.prose}>
              Need repairs before you&apos;re ready to join?
            </p>
            <p className={styles.prose}>
              We offer flexible financing so necessary work never has to wait.
            </p>
            <Link href="/financing" className={styles.financingLink}>
              Check Our Financing Options
            </Link>
          </div>
        </div>
      </section>

      <GoogleCarousel />

      <section className={styles.closing}>
        <h2>Ready to Join? Your First Month Is On Us.</h2>
        <p>
          Stop waiting until something breaks to think about your home&apos;s
          systems. Join today and start experiencing the difference a Power
          membership makes.
        </p>
        <p>
          <a href="tel:+17202722562" className={styles.phoneLink}>
            Call or Text: (720) 272-2562
          </a>
        </p>
        <div className={styles.closingActions}>
          <a href="#membership-signup" className={styles.signUpBtn}>
            Sign Up Now: First Month Free
          </a>
          <BookBtn />
          <CallBtn />
        </div>
        <p className={styles.closingTagline}>We Put The Power In Your Project!</p>
        <p className={styles.closingAddress}>
          <a
            href="https://maps.app.goo.gl/Lw2x8JKXuSi5YrMq9"
            target="_blank"
            rel="noopener noreferrer"
          >
            5650 N Washington St. Unit C-6, Denver, CO 80216
          </a>
        </p>
      </section>

      <Footer />
    </div>
  );
}
