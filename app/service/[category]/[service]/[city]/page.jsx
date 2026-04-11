import { client } from "../../../../../sanity/lib/client";
import { urlFor } from "../../../../../sanity/sanityImageUrl";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import styles from "../styles.module.css";
import GoogleBadge from "../../../../components/GoogleBadge";
import BookBtn from "../../../../components/BookBtn";
import CallBtn from "../../../../components/CallBtn";
import ValueCont from "../../../../components/ValueCont";
import ServiceForm from "../../../../components/ServiceForm";
import GoogleCarousel from "../../../../components/GoogleCarousel";
import FinanceCont from "../../../../components/FinanceCont";
import LocationCont from "../../../../components/LocationsCont";
import ServiceMenuCategory from "../../../../components/ServiceMenuCategory";
import Footer from "../../../../components/Footer";
import { getPortableTextComponents } from "./portableTextComponents";
import ThirdSectionAccordion from "./ThirdSectionAccordion";
import FaqAccordion from "./FaqAccordion";
import NavServer from "../../../../components/Nav/NavServer";
import JsonLdSchemaScript from "../../../../components/JsonLdSchemaScript";
import { getServiceBySlug } from "../../../serviceQueries";
import { buildServicePageMetadata } from "../../../serviceMetadata";

const CATEGORY_QUERY = `*[_type == "serviceCategory" && slug.current == $category][0]{
  _id,
  title,
  "subCategories": subCategories[]->{
    _id,
    title,
    "services": services[]->{ _id, title, slug, imagePrimary { asset->{ _id, url } },bookNowText,bookNowSubtext }
  }
}`;

export async function generateMetadata({ params }) {
  const { category, service, city } = await params;
  const slug = `/${category}/${service}`;
  const data = await getServiceBySlug(slug);
  if (!data) return { title: "Service" };
  const canonicalPath = `/service/${category}/${service}/${city}`;
  const cityDisplayName = city ? String(city).replace(/-/g, " ") : null;
  return buildServicePageMetadata(data, { canonicalPath, cityDisplayName });
}

export default async function ServicePage({ params }) {
  const { category, service, city } = await params;
  const slug = `/${category}/${service}`;

  const [data, categoryData] = await Promise.all([
    getServiceBySlug(slug),
    client.fetch(CATEGORY_QUERY, { category }),
  ]);

  if (!data) {
    notFound();
  }

  const ptComponents = getPortableTextComponents(styles);

  return (
    <article className={styles.servicePage}>
      <JsonLdSchemaScript schema={data.schema} />
      <NavServer city={city} />
      <div className={styles.hero}>
        <Image
          src={urlFor(data.imagePrimary).width(1200).height(600).url()}
          alt="Hero"
          width={500}
          height={300}
          className="w-[50%] h-[300px] object-cover absolute top-0 right-0"
        />
        <div className={styles.heroContent}>
          <div className={styles.heroContentInner}>
            <h1 className={styles.heroTitle}>{data.titleHero} {city ? `in ${city.replace(/-/g, " ")}` : ""}</h1>
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
            <h2>{data.titlePrimary} {city ? `in ${city.replace(/-/g, " ")}` : ""}</h2>
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
      <ValueCont city={city} />

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
                src={urlFor(data.imageSecond).url()}
                alt={data.imageSecond?.alt ?? ""}
                fill
                objectFit="cover"
              />
            )}
          </div>
        </div>
      </section>

      <ServiceForm serviceName={data.title} />

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
      <GoogleCarousel />
      <FinanceCont city={city} />
      <LocationCont city={city} />
      <FaqAccordion faqItems={data.faqItems} serviceTitle={data.title} />

      <div className={styles.relatedServicesContainer}>
        <h2>Related Services</h2>
        <div className={styles.relatedServicesGrid}>
          {categoryData?.subCategories?.flatMap((subCategory) =>
            (subCategory.services ?? []).slice(0, 3).map((svc, index) => (
              <div
                className={styles.relatedServicesItem}
                key={svc._id + index}
              >
                <div className={styles.relatedServicesItemImageContainer}>
                  {svc.imagePrimary?.asset?.url && (
                    <Link href={`${svc.slug.current}/${city && `${city}`}`} >
                    <Image
                      src={urlFor(svc.imagePrimary).url()}
                      alt={svc.imagePrimary?.alt ?? ""}
                      fill
                      objectFit="cover"
                    />
                    </Link>
                  )}
                </div>
                <div className={styles.relatedServicesItemTextContainer}>
                <Link href={`${svc.slug.current}/${city && `${city}`}`} >
                  <h3>{svc.bookNowText}</h3>
                  </Link>
                  <Link href={`${svc.slug.current}/${city && `${city}`}`} >
                  <p>{svc.bookNowSubtext}</p>
                  </Link>
                  <div className={styles.relatedServicesItemButtonContainer}>
                    <BookBtn />
                    <CallBtn />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* <div className={styles.serviceMenuCategoryContainer}>
        <h2>All {categoryData?.title} Services</h2>
      </div> */}
      {/* <ServiceMenuCategory slug={category} city={city} /> */}
      <Footer />
    </article>
  );
}
