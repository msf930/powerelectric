
import styles from "./styles.module.css";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/sanityImageUrl";

import Link from "next/link";

import Image from "next/image";

const SERVICE_CATEGORIES_QUERY = `*[_type == "allServices"]{
  _id,
  allServices[]->{
      _id,
      title,
      slug,
      icon,
      subCategories[]->{
          _id,
          title,
          slug,
          icon,
          services[]->{
              _id,
              title,
              slug,
          }
      }
  }
}`;
export default async function ServiceMenuHome({city}) {
  const params = {
    city: city,
  }
  const serviceCategorys = await client.fetch(SERVICE_CATEGORIES_QUERY);
  const serviceCategories = serviceCategorys[0].allServices;
  
  return (
    <div className={styles.serviceMenuHome}>
      {serviceCategories.map((serviceCategory) => (
        <div key={serviceCategory._id} className={styles.serviceCategory}>
            <div className={styles.serviceCategoryIcon}>
                <div className="p-8 relative">
                    <Image src={urlFor(serviceCategory.icon).url()} alt={serviceCategory.title} fill objectFit="cover"  />
                </div>
            </div>
          <Link href={`${serviceCategory.slug.current && city ? `/${serviceCategory.slug.current}/service-area/${city}` : `${serviceCategory.slug.current}`}`} className={styles.serviceCategoryTitle}>{serviceCategory.title}</Link>
          {serviceCategory.subCategories.map((subCategory) => (
            subCategory.services.map((service, index) => (
              <div key={`${service._id}-${index}`}>
                <div className={styles.serviceText}>
                  <Link href={`${service.slug.current && city ? `${service.slug.current}/${city}` : `${service.slug.current}`}`} className={styles.serviceTitle}>{service.title}</Link>
                  </div>
                </div>  
              ))
            ))}
          </div>
        ))}
      </div>
    );
  }