import NavServer from "../components/Nav/NavServer";
import Footer from "../components/Footer";
import styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/sanityImageUrl";
import ServiceForm from "../components/ServiceForm";
import LocationCont from "../components/LocationsCont";
export default async function MembershipPage() {
    const monthlyAd = await client.fetch(`*[_type == "monthlyAd"][0]{
        _id,
        title,
        description,
        image,
        monthlySpecials[]->{ _id, title, description }
    }`);
    return (
        <div>
            <NavServer />
            <div className={styles.membershipPage}>
                <div className={styles.membershipInnerContainer}>
                    <div className={styles.membershipHeaderContent}>
                        <h1>Special Offer</h1>
                        <p>We're excited to provide our customers with exceptional value on electrical services. Whether you're looking to upgrade your home, ensure safety, or simply need maintenance, we have something special for you.</p>
                        <div className={styles.membershipHeaderLine}></div>
                    </div>
                    <div className={styles.membershipTiers}>
                        <div className={styles.membershipTierLeft}>
                            <Image src="/star.png" alt="Tier 1" width={100} height={100} />
                            <h3 className={styles.membershipTierTitle}>1 year</h3>
                            <h3 className={styles.membershipTierSubtitle}>Membership Plan</h3>
                            <div className={styles.membershipLine}></div>
                            <h2 className={styles.membershipTierPrice}>$99.00</h2>
                            <Link href="/contact" className={styles.membershipTierButton}>Learn More</Link>
                        </div>
                        <div className={styles.membershipTierDiamond}>
                            <Image src="/diamond.png" alt="Tier 1" width={100} height={100} />
                            <h3 className={styles.membershipTierTitle}>1 year</h3>
                            <h3 className={styles.membershipTierSubtitle}>Membership Plan</h3>
                            <div className={styles.membershipLine}></div>
                            <h2 className={styles.membershipTierPrice}>$268.00</h2>
                            <Link href="/contact" className={styles.membershipTierButton}>Learn More</Link>
                        </div>
                        <div className={styles.membershipTierRight}>
                            <Image src="/star.png" alt="Tier 1" width={100} height={100} />
                            <h3 className={styles.membershipTierTitle}>1 year</h3>
                            <h3 className={styles.membershipTierSubtitle}>Membership Plan</h3>
                            <div className={styles.membershipLine}></div>
                            <h2 className={styles.membershipTierPrice}>$189.00</h2>
                            <Link href="/contact" className={styles.membershipTierButton}>Learn More</Link>
                        </div>
                    </div>
                    <div className={styles.membershipBenefits}>
                        <h2 className={styles.membershipBenefitsTitle}>Service Plan members receive:</h2>
                        <div className={styles.membershipBenefitsList}>
                            <ul>
                                <li>Guaranteed 24-hour response time</li>
                                <li>2-hour window time</li>
                                <li>Annual maintenance & evaluation of your electrical including inspection of electrical wiring &amp; labeling of main circuit breakers  on the panel</li>
                                <li>10% up to $250.00 off all repairs</li>
                            </ul>
                        </div>
                        <p className={styles.membershipBenefitsSubtitle}>***Service Plan is transferable if you sell your home***</p>
                    </div>
                    <div className={styles.membershipDiscountContainer}>
                        <div className={styles.membershipDiscountContent}>
                            <h2 className={styles.membershipDiscountTitle}>Discounts on Services</h2>
                            <p className={styles.membershipDiscountSubtitle}>FOLLOW US ON FACEBOOK AND MENTION THIS AD AT THE TIME OF YOUR ESTIMATE TO RECEIVE $35.00 OFF.</p>
                            <Link href="https://www.facebook.com/Powereletricalservices" className={styles.membershipDiscountButton}>Follow Us<FaFacebook /></Link>
                        </div>
                        <div className={styles.membershipDiscountAttention}>
                            <h3 className={styles.membershipDiscountAttentionTitle}>$35.00 OFF</h3>
                            <p className={styles.membershipDiscountAttentionSubtitle}>**Special Discount**</p>
                        </div>
                    </div>
                    <div className={styles.membershipSpecials}>
                        <div className={styles.membershipSpecialsContent}>
                            {monthlyAd.image && (
                                <div className={styles.membershipSpecialsContentImageContainer}>
                                    <div className={styles.membershipSpecialsContentImage}>
                                        <Image src={urlFor(monthlyAd.image).url()} alt={monthlyAd.title} fill objectFit="contain" />
                                    </div>
                                </div>
                            )}
                            <div className={styles.membershipSpecialsContentTextContainer}>

                                {monthlyAd.title && (
                                    <h3 className={styles.membershipSpecialsTitle}>{monthlyAd.title}</h3>
                                )}
                                {monthlyAd.description && (
                                    <p className={styles.membershipSpecialsDescription}>{monthlyAd.description}</p>
                                )}
                                <div className={styles.membershipSpecialsList}>
                                    {monthlyAd && monthlyAd.monthlySpecials && monthlyAd.monthlySpecials.map((special) => (
                                        <div key={special._id} className={styles.membershipSpecialsItem}>
                                            <h3 className={styles.membershipSpecialsItemTitle}>{special.title}</h3>
                                            <p className={styles.membershipSpecialsItemDescription}>{special.description}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className={styles.membershipSpecialsDisclaimer}>*Service fee may apply. Limit one coupon/ad per household and coupon/ad must be presented at time of service and purchase. Cannot be combined with any other offers or discounts. Some restrictions, taxes and fees may apply.</p>
                                <div className={styles.membershipSpecialsButtonContainer}>
                                    <Link href="/contact" className={styles.membershipSpecialsButton}>Learn More</Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <LocationCont />
                <ServiceForm />
                <Footer />
            </div>
        </div>
    );
}