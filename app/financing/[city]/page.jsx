import NavServer from "../../components/Nav/NavServer";
import Footer from "../../components/Footer";
import styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";
export default async function FinancingPage({params}) {
    const  {city} = await params;
    return (
        <div>
            <NavServer city={city}/>
            <div className={styles.financingPage}>
                <div className={styles.financingInnerContainer}>
                    <div className={styles.financingContentEven}>
                        <h1>Financing Options</h1>
                        <p>Let&apos;s explore financing options for your project. We&apos;re committed to providing you with the highest quality electrical services, supported by financial solutions that make sense for you.</p>
                    </div>
                    <div className={styles.financingContentOdd}>
                        <h1>How Our Financing Options Works</h1>
                        <p>At Power Electrical Services, we understand that electrical installations, upgrades, and maintenance can represent a significant investment for our customers. Whether you&apos;re a homeowner looking to renovate your property, a business requiring an electrical system overhaul, or you&apos;re in need of urgent repairs, we believe that financial constraints shouldn&apos;t stand in the way of your safety and comfort. That&apos;s why we&apos;re proud to offer comprehensive Electrical Project Financing Solutions designed to fit your budget and meet your needs.</p>
                        <Link href={`/contact/${city && `${city}`}`} className={styles.financingContentButton}>Apply Now</Link>
                    </div>
                    <div className={styles.financingContentEven}>
                        <div className={styles.financingContentRowContainer}>
                            <div className={styles.financingContentRowItemLeft}>
                                <p className={styles.financingContentRowItemText}>At Power Electrical Services, we&apos;re committed to providing you with the highest quality electrical services, supported by financial solutions that make sense for you. Contact us today to learn more about our Electrical Project Financing Solutions and take the first step towards upgrading your electrical system without financial stress.</p>
                            </div>
                            <div className={styles.financingContentRowItemRight}>
                                <p className={styles.financingContentRowItemText}>We&apos;re now offering fast and simple financing to customers on purchases between $500 and $100,000* through Hearth.  Hearth helps you find monthly payments for your project!</p>
                                <ul className={styles.financingContentRowItemList}>
                                    <li>Rates in under 2 minutes</li>
                                    <li>Get your money fast</li>
                                    <li>Easy monthly payments</li>
                                    <li>No prepayment penalties</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={styles.financingContentOdd}>
                        <div className={styles.financingContentRowContainer}>
                            <div className={styles.financingContentRowItemLeft}>
                                <h2 className={styles.financingContentRowItemTitle}>More financing option for you</h2>
                                <p className={styles.financingContentRowItemText}>Power Electrical Services is excited to share that we&apos;ve expanded our financing options through a new partnership with Moment. Along with our high-quality electrical services, we now offer flexible and convenient financing solutions designed to fit your budget. If you&apos;d like to learn more or begin the application process, feel free to reach out to us. Our team is happy to guide you every step of the way.</p>
                                <div className={styles.financingContentRowItemButtonContainer}>
                                    <Link href={`/contact/${city && `${city}`}`} className={styles.financingContentButton}>Get Financing Today</Link>
                                </div>
                            </div>
                            <div className={styles.financingContentRowItemRight}>
                                <div className={styles.financingContentRowItemImageContainer}>
                                    <Link href="https://app.momnt.com/widgets/?merchantId=60aa7462-3380-4077-855b-bf116c4235a3&widget=ConsumerLoanApplicationWizard" target="_blank">
                                        <Image src="/momnt.png" alt="Moment" width={500} height={500} className={styles.financingContentRowItemImage} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        </div>
    )
}