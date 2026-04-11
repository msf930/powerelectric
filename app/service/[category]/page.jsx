
import { client } from "../../../sanity/lib/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { urlFor } from "../../../sanity/sanityImageUrl";
import Image from "next/image";
import styles from "./styles.module.css";
import Footer from "../../components/Footer";
import GoogleBadge from "../../components/GoogleBadge";
import StatCont from "../../components/StatCont";
import ServiceMenuCategory from "../../components/ServiceMenuCategory";
import LocationsCont from "../../components/LocationsCont";
import BookBtn from "../../components/BookBtn";
import CallBtn from "../../components/CallBtn";
import InfoContCategory from "../../components/InfoContCategory";
import ValueCont from "../../components/ValueCont";
import GoogleCarousel from "../../components/GoogleCarousel";
import ProcessCont from "../../components/ProcessCont";
import FinanceCont from "../../components/FinanceCont";
import CategoryForm from "../../components/CategoryForm";
import NavServer from "../../components/Nav/NavServer";
import HomeHero from "../../components/HomeHero";
const CATEGORY_QUERY = `*[_type == "serviceCategory" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  subTitle,
  image,
  "subCategories": subCategories[]->{
    _id,
    title,
    "services": services[]->{ _id, title, slug }
  }
}`;

export default async function CategoryPage({ params }) {
  const { category } = await params;

  const data = await client.fetch(CATEGORY_QUERY, {
    slug: category,
  });

  if (!data) {
    notFound();
  }

  return (
    <article>
      <NavServer />
      <HomeHero />
      {/* <header className={styles.categoryHeader}>
        <div className={styles.categoryHeaderContent}>
         
          {data.subTitle && <p className={styles.categoryHeaderSubTitle}>{data.subTitle}</p>}
          <div className={styles.categoryHeaderButtonContainer}>
            <BookBtn />
            <CallBtn />
          </div>
        <GoogleBadge />
        <div className={styles.categoryHeaderStatsContainer}>
          <StatCont />
        </div>
        </div>
        {data.image && (
          <div className={styles.categoryHeaderImageContainer}> 
            <div className={styles.categoryHeaderImage}>
              <div className={styles.categoryHeaderImageOverlay}></div>
              <Image src={urlFor(data.image).width(1200).height(314).url()} alt={data.title} objectFit="cover" fill />
            </div>
          </div>
        )}
      </header> */}
      <ServiceMenuCategory slug={category} />
      <LocationsCont />
      <InfoContCategory />
      <ValueCont city={""} />
      <GoogleCarousel />
      <ProcessCont category={data.title} />
      <FinanceCont />
      <CategoryForm />
      <Footer />
    </article>
  );
}
