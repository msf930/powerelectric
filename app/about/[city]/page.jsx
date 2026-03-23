import { client } from "../../../sanity/lib/client";
import { notFound } from "next/navigation";
import styles from "./styles.module.css";
import { PortableText } from "next-sanity";
import BookBtn from "../../components/BookBtn";
import CallBtn from "../../components/CallBtn";
import { urlFor } from "../../../sanity/sanityImageUrl";
import Image from "next/image";
import GoogleCarousel from "../../components/GoogleCarousel";
import FinanceCont from "../../components/FinanceCont";
import CategoryForm from "../../components/CategoryForm";
import Footer from "../../components/Footer";
import NavServer from "../../components/Nav/NavServer";
const ABOUT_QUERY = `*[_type == "about"][0]{

  _id,
  title,
  description,
  contactText,
  values[]->{ _id, title, subtitle, description, icon },
  image { asset->{ _id, url } }
}`;

export default async function AboutCityPage({ params }) {
  const { city } = await params;
  const data = await client.fetch(ABOUT_QUERY);

  if (!data) {
    notFound();
  }

  return (
    <article className={styles.aboutPage}>
      <NavServer city={city} />
      <header className={styles.aboutPageHeader}>
        <h1>{data.title}</h1>
        <div className={styles.aboutPageHeaderDescription}>
          <PortableText value={data.description} />
        </div>
        <div className={styles.headerContactContainer}>
          <div className={styles.headerContactLeft}>

            <PortableText value={data.contactText} />
            <div className={styles.headerContactButtonContainer}>
              <BookBtn />
              <CallBtn />
            </div>
          </div>
          <div className={styles.headerContactRight}>
            <div className={styles.headerContactRightInnerContainer}>
              <h3 className={styles.headerContactRightInnerContainerTitle}>Emergency Services</h3>
              <p className={styles.headerContactRightInnerContainerDescription}>For immediate assistance, please call us directly at:</p>
              <div className={styles.headerContactRightInnerContainerButtonContainer}>

                <CallBtn />
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className={styles.aboutPageValues}>
        <h1 className={styles.aboutPageValuesTitle}>Who we are</h1>
        <p className={styles.aboutPageValuesDescription}>We are a trusted provider of electrical services, serving both residential and commercial clients across the Colorado area.</p>
        <div className={styles.aboutPageValuesContainer}>
          <div className={styles.aboutPageValuesItemsContainer}>
            <div className={styles.aboutPageValuesItemsContainerInner}>

            {data.values.map((value) => (
              <div className={styles.aboutPageValuesItem} key={value._id}>
                <Image src={urlFor(value.icon).width(65).height(65).url()} alt={value.title} width={65} height={65} />
                <h2 className={styles.aboutPageValuesItemTitle}>{value.title}</h2>
                <p className={styles.aboutPageValuesItemSubtitle}>{value.subtitle}</p>
                <p className={styles.aboutPageValuesItemDescription}>{value.description}</p>
              </div>
            ))}
            </div>
            <div className={styles.aboutPageValuesButtonContainer}>
              <BookBtn />
              <CallBtn />
            </div>
          </div>
          <div className={styles.aboutPageValuesImageContainer}>
            {data.image && (
              <div className={styles.aboutPageValuesImageContainerInner}>
              <Image src={urlFor(data.image).url()} alt="Who we are" fill objectFit="cover" />
              </div>
            )}
          </div>
        </div>
      </section>
      <GoogleCarousel />
      <FinanceCont city={city} />
      <CategoryForm />
      <Footer />
    </article>
  );
};