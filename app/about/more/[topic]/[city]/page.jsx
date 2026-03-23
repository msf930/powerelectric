import { client } from "../../../../../sanity/lib/client";
import { notFound } from "next/navigation";
import NavServer from "../../../../components/Nav/NavServer";
import { PortableText } from "next-sanity";
import styles from "./styles.module.css";
import { getPortableTextComponents } from "./portableTextComponents";
import Image from "next/image";
import { urlFor } from "../../../../../sanity/sanityImageUrl";
import BookBtn from "../../../../components/BookBtn";
import CallBtn from "../../../../components/CallBtn";
import GoogleBadge from "../../../../components/GoogleBadge";
import Link from "next/link";
import GoogleCarousel from "../../../../components/GoogleCarousel";
import FinanceCont from "../../../../components/FinanceCont";
import LocationCont from "../../../../components/LocationsCont";
import Footer from "../../../../components/Footer";
const ABOUT_MORE_QUERY = `*[_type == "aboutMore"][0]{
  "page": *[_type == "aboutMorePage" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    pageDescription,
    image,
    content,
    buttonBool,
    buttonText,
    buttonLink
  }
}`;

export default async function AboutMorePage({ params }) {
  const { topic, city } = await params;
  const ptComponents = getPortableTextComponents(styles);
  const data = await client.fetch(ABOUT_MORE_QUERY, { slug: topic });
  const page = data.page;

  if (!page) {
    notFound();
  }
  return (
    <div>
      <NavServer city={city} />
      <div className={styles.aboutMorePage}>
        <div className={styles.hero}>
          <Image
            src={urlFor(page.image).width(1200).height(600).url()}
            alt="Hero"
            width={500}
            height={300}
            className="w-[50%] h-[300px] object-cover absolute top-0 right-0"
          />
          <div className={styles.heroContent}>
            <div className={styles.heroContentInner}>
              <h1 className={styles.heroTitle}>{page.title}</h1>
              <div className={styles.heroButtonContainer}>
                <BookBtn />
                <CallBtn />
              </div>
              <GoogleBadge />
            </div>
          </div>
        </div>
        <div className={styles.aboutMorePageInnerContainer}>
          <h1 className={styles.aboutMorePageTitle}>{page.title}</h1>
          <div>
            <PortableText value={page.content} components={ptComponents} />
          </div>
          {page.buttonBool && (
            <div className={styles.aboutMorePageButtonContainer}>
              <Link href={page.buttonLink} target="_blank" className={styles.aboutMorePageButton}>{page.buttonText}</Link>
            </div>
          )}
        </div>
          <GoogleCarousel />
          <FinanceCont city={city} />
          <LocationCont city={city} />
      </div>
      <Footer />
    </div>
  );
}
