import { client } from "../../../../sanity/lib/client";
import { urlFor } from "../../../../sanity/sanityImageUrl";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import styles from "./styles.module.css";
import styles2 from "./stylesCopy.module.css";
import GoogleBadge from "../../../components/GoogleBadge";
import BookBtn from "../../../components/BookBtn";
import CallBtn from "../../../components/CallBtn";
import ValueCont from "../../../components/ValueCont";
import ServiceForm from "../../../components/ServiceForm";
import GoogleCarousel from "../../../components/GoogleCarousel";
import FinanceCont from "../../../components/FinanceCont";
import LocationCont from "../../../components/LocationsCont";
import ServiceMenuCategory from "../../../components/ServiceMenuCategory";
import Footer from "../../../components/Footer";
import { getPortableTextComponents } from "./portableTextComponents";
import ThirdSectionAccordion from "./ThirdSectionAccordion";
import FaqAccordion from "./FaqAccordion";
import NavServer from "../../../components/Nav/NavServer";
import JsonLdSchemaScript from "../../../components/JsonLdSchemaScript";
import { getServiceBySlug } from "../../serviceQueries";
import { buildServicePageMetadata } from "../../serviceMetadata";
import ServiceProtectionPlanCta from "../../../components/ServiceProtectionPlanCta";
import { color } from "framer-motion";
import { getPortableTextComponentsCopy } from "./portableTextComponentsCopy";
import { servicePageHref } from "../../../../lib/servicePaths";

import { generateServiceParams } from "../../../../lib/staticParams";

export const revalidate = false;

export async function generateStaticParams() {
  return generateServiceParams();
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

export async function generateMetadata({ params }) {
  const { category, service } = await params;
  const slug = `/${category}/${service}`;
  const data = await getServiceBySlug(slug);
  if (!data) return { title: "Service" };
  const canonicalPath = `/service/${category}/${service}`;
  return buildServicePageMetadata(data, { canonicalPath });
}

export default async function ServicePage({ params }) {
  const { category, service } = await params;
  const slug = `/${category}/${service}`;

  const [data, categoryData] = await Promise.all([
    getServiceBySlug(slug),
    client.fetch(CATEGORY_QUERY, { category }),
  ]);

  if (!data) {
    notFound();
  }
  const ptComponents = getPortableTextComponents(styles);
  const ptComponents2 = getPortableTextComponentsCopy(styles2);

  
  return (
    <article className={styles.servicePage}>
      <JsonLdSchemaScript schema={data.schema} />
      <NavServer />
      <div className={styles.hero}>
        <Image
          src={urlFor(data.imagePrimary).width(1200).height(600).url()}
          alt="Hero"
          width={500}
          height={700}
          className="w-[50%] h-[700px] object-cover absolute top-0 right-0"
        />
        <div className={styles.heroContent}>
          <div className={styles.heroContentInner}>
            <h1 className={styles.heroTitle}>{data.titleHero}</h1>
            {data.heroDescription && (
              <PortableText
                value={data.heroDescription}
                components={ptComponents2}
              />
            )}
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
      <ValueCont />

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
            {data.imagePrimary?.asset?.url && (
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
      <FinanceCont />
      <LocationCont />
      <FaqAccordion faqItems={data.faqItems} serviceTitle={data.title} />

      <div className={styles.relatedServicesContainer}>
        {data.relatedServices && (
          <h2>Related Services</h2>
        )}
        <div className={styles.relatedServicesGrid}>
          {data.relatedServices?.map((svc, index) => (
            <div
              className={styles.relatedServicesItem}
              key={svc._id + index}
            >
              <div className={styles.relatedServicesItemImageContainer}>
                {svc.imagePrimary?.asset?.url && (
                  <Link href={servicePageHref(svc.slug.current)} >

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
                <Link href={servicePageHref(svc.slug.current)} >
                  <h3>{svc.title}</h3>
                </Link>
                <Link href={servicePageHref(svc.slug.current)} >
                  <p>{svc.bookNowText}</p>
                </Link>
                <div className={styles.relatedServicesItemButtonContainer}>
                  <BookBtn />
                  <CallBtn />
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
      {/* <div className={styles.serviceMenuCategoryContainer}>
        <h2>All {categoryData?.title} Services</h2>
      </div> */}
      {/* <ServiceMenuCategory slug={category} /> */}
      <ServiceProtectionPlanCta title={data.closingCTATitle} subtext={data.closingCTASubtext} />
      <Footer />
    </article>
  );
}
