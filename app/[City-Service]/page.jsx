import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/sanityImageUrl";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import styles from "./styles.module.css";
import GoogleBadge from "../components/GoogleBadge";
import BookBtn from "../components/BookBtn";
import CallBtn from "../components/CallBtn";
import ValueCont from "../components/ValueCont";
import ServiceForm from "../components/ServiceForm";
import GoogleCarousel from "../components/GoogleCarousel";
import FinanceCont from "../components/FinanceCont";
import LocationCont from "../components/LocationsCont";
import ServiceMenuCategory from "../components/ServiceMenuCategory";
import Footer from "../components/Footer";
import { getPortableTextComponents } from "./portableTextComponents";
import ThirdSectionAccordion from "./ThirdSectionAccordion";
import FaqAccordion from "./FaqAccordion";
import ClosingCTA from "../components/ClosingCTA";
import NavServer from "../components/Nav/NavServer";
const SERVICE_QUERY = `*[_type == "newServicePage" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  titleHero,
  imagePrimary { asset->{ _id, url }, alt },
  imageSecond { asset->{ _id, url }, alt },
  titlePrimary,
  descriptionPrimary,
  bookNowText,
  bookNowSubtext,
  titleSecond,
  descriptionSecond,
  titleThird,
  descriptionThird,
  thirdItems[]->{ _id, title, content },
  faqItems[]->{ _id, title, content },
  closingCTATitle,
  closingCTASubtext
}`;

import { generateCityServiceParams } from "../../lib/staticParams";

export const revalidate = 3600;

export async function generateStaticParams() {
  return generateCityServiceParams();
}

const CATEGORY_QUERY = `*[_type == "serviceCategory" && slug.current == $category][0]{
  _id,
  title,
  "subCategories": subCategories[]->{
    _id,
    title,
    "services": services[]->{ _id, title, slug, imagePrimary { asset->{ _id, url } },bookNowText,bookNowSubtext }
  }
}`;

export default async function ServicePage({ params }) {
  // Segment name matches the folder `[City-Service]` → param key is "City-Service"
  const { "City-Service": cityService } = await params;
  const cityArray = cityService.split("-");
  const service = cityArray[cityArray.length - 1];
  cityArray.pop();
  let fullCity = "";
  for (const city of cityArray) {
    const lowerCity = city.toLowerCase();
    const cityString = lowerCity.charAt(0).toUpperCase() + lowerCity.slice(1);
    fullCity += cityString + " ";
  }
  const cityName = fullCity.trim();
  const citySlug = cityName.replace(/ /g, "-");
  // console.log(cityName, service);
  // GROQ uses $slug — param keys must match (not cityService)
  const data = await client.fetch(SERVICE_QUERY, { slug: cityService });
 
  const ptComponents = getPortableTextComponents(styles);

  return (
    <article className={styles.servicePage}>
      <NavServer city={citySlug} />
      <div className={styles.hero}>
        <Image
          src={urlFor(data.imagePrimary).width(1200).height(600).url()}
          alt="Hero"
          width={500}
          height={300}
          className="w-[50%] h-[400px] object-cover absolute top-0 right-0"
        />
        <div className={styles.heroContent}>
          <div className={styles.heroContentInner}>
            <h1 className={styles.heroTitle}>{data.titleHero}</h1>
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
            <h2>{data.titlePrimary}</h2>
            {data.descriptionPrimary && (
              <PortableText
                value={data.descriptionPrimary}
                components={ptComponents}
              />
            )}
          </div>
          <div className={styles.primarySectionInfoContainer}>
            <div className={styles.primarySectionInfoContInner}>
            <div className={styles.primarySectionInfoImageContainer}>
              {data.imageSecond?.asset?.url && (
                <Image
                  src={urlFor(data.imageSecond).url()}
                  alt={data.imageSecond?.alt ?? ""}
                  fill
                  objectFit="cover"
                />
              )}
            </div>
            <div className={styles.primarySectionInfoTextContainer}>
              <h3>{data.bookNowText}</h3>
              <p>{data.bookNowSubtext}</p>
              <div className={styles.primarySectionInfoButtonContainer}>
                <BookBtn />
                <CallBtn />
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>
      <ValueCont city={cityName} />

      <section className={styles.secondarySection}>
        <div className={styles.secondarySectionInnerContainer}>
          <div className={styles.secondarySectionContent}>
            <h2>{data.titleSecond}</h2>
            {data.descriptionSecond && (
              <PortableText
                value={data.descriptionSecond}
                components={ptComponents}
              />
            )}
          </div>
          <div className={styles.secondarySectionImageContainer}>
            {data.imageSecond?.asset?.url && (
              <Image
                src={urlFor(data.imagePrimary).url()}
                alt={data.imagePrimary?.alt ?? ""}
                fill
                objectFit="cover"
              />
            )}
          </div>
        </div>
      </section>

      <ServiceForm serviceName={cityService} />

      <section className={styles.thirdSection}>
        <div className={styles.thirdSectionInnerContainer}>
          <div className={styles.thirdSectionImageContainer}>
            {data.imageSecond?.asset?.url && (
              <Image
                src={urlFor(data.imageSecond).url()}
                alt={data.imageSecond?.alt ?? ""}
                fill
                objectFit="cover"
              />
            )}
          </div>
          <div className={styles.thirdSectionContent}>
            <h2>{data.titleThird}</h2>
            {data.descriptionThird && (
              <PortableText
                value={data.descriptionThird}
                components={ptComponents}
              />
            )}
            <ThirdSectionAccordion thirdItems={data.thirdItems} />
          </div>
        </div>
      </section>
      <FinanceCont city={cityName} />
      <LocationCont city={cityName} />
      <FaqAccordion faqItems={data.faqItems} serviceTitle={cityName + " " + service.charAt(0).toUpperCase() + service.slice(1).toLowerCase()} />
      <GoogleCarousel />

      <ClosingCTA
        title={data.closingCTATitle}
        subtext={data.closingCTASubtext}
      />

      <Footer />
    </article>
  );
}
