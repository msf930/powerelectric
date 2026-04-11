"use client";
import styles from "./styles.module.css";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/sanityImageUrl";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Image from "next/image";
export default function ServiceMenuCategory({ slug, city = "" }) {
        const SERVICE_CATEGORY_QUERY = `*[_type == "serviceCategory" && slug.current == $slug][0]{
            _id,
            title,
            slug,
            icon,
            subCategories[]->{
                _id,
                title,
                icon,
                services[]->{
                    _id,
                    title,
                    slug,
                }
            }
        }`;
  const [serviceCategory, setServiceCategory] = useState(null);
  useEffect(() => {
    const fetchServiceCategory = async () => {
      const data = await client.fetch(SERVICE_CATEGORY_QUERY, { slug });
      setServiceCategory(data);
      
    };
    fetchServiceCategory();
  }, []);
  
  return (
    <div className={styles.serviceMenuHome}>
      {serviceCategory?.subCategories?.map((subCategory) => (
        <div key={subCategory._id} className={styles.serviceCategory}>
            {/* <div className={styles.serviceCategoryIcon}>
                <div className="p-8 relative">
                    <Image src={urlFor(subCategory.icon).url()} alt={subCategory.title} fill objectFit="cover"  />
                </div>
            </div> */}
          <h2 className={styles.serviceCategoryTitle}>{subCategory.title}</h2>
          {
            subCategory.services.map((service, index) => (
              <div key={`${service._id}-${index}`}>
                <div className={styles.serviceText}>
                  <Link href={`${service.slug.current ?? ''}${city ? `/${city}` : ''}`} className={styles.serviceTitle}>{service.title}</Link>
                  </div>
                </div>  
              ))
            }
          </div>
        ))}
      </div>
    );
  }