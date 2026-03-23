"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.css";
import { GoTriangleDown } from "react-icons/go";
import BookBtn from "../BookBtn";
import CallBtn from "../CallBtn";

export default function Nav({ dropdownItems = [], city = "", aboutMoreItems = [] }) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);
  // console.log(aboutMoreItems);
  if (pathname?.includes("/studio")) {
    return null;
  }

  return (
    <nav className={styles.nav}>
      <Link href={`/${city ? `location/${city}` : ""}`} className={styles.logoLink} aria-label="Home">
        <Image
          src="/PESLogo.png"
          alt="Power Electrical Services"
          width={250}
          height={250}
          className={styles.logo}
          priority
        />
      </Link>

      <ul className={styles.menu}>
        {dropdownItems.map((item) => (
          <li
            key={item._id}
            className={styles.menuItem}
            onMouseEnter={() => setOpenDropdown(item._id)}
            onMouseLeave={() => setOpenDropdown(null)}
          >

            <button
              type="button"
              className={styles.dropdownTrigger}
              aria-expanded={openDropdown === item._id}
              aria-haspopup="true"
            >
              <Link href={item.slug?.current ? (item.slug.current.startsWith("/") ? item.slug.current : `/${item.slug.current}${city ? `/service-area/${city}` : ""}`) : "#"} >
                {item.title}
              </Link>

              <GoTriangleDown className={styles.dropdownArrow} aria-hidden />
            </button>
            {openDropdown === item._id && (
              <ul className={styles.dropdown} role="menu">
                {(item.subCategories ?? []).map((subCategory) => (
                  <li key={subCategory._id} role="none">
                    <p className={styles.dropdownSubCategoryTitle}>
                      {subCategory.title}
                    </p>
                    {(subCategory.services ?? []).map((service, index) => (
                      <Link key={`${service._id}-${index}`} href={service.slug?.current ? (service.slug.current.startsWith("/") ? `${service.slug.current}${city ? `/${city}` : ""}`: `/${service.slug.current}${city ? `/${city}` : ""}`) : "#"} className={styles.dropdownLink} role="menuitem">
                        {service.title}
                      </Link>
                    ))}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <ul className={styles.menuAbout}>
        <li
          key="about"
          className={styles.menuItem}
          onMouseEnter={() => setOpenDropdown("about")}
          onMouseLeave={() => setOpenDropdown(null)}
        >

          <button
            type="button"
            className={styles.dropdownTrigger}
            aria-expanded={openDropdown === "about"}
            aria-haspopup="true"
          >
            <Link href="/about" >
              About Us
            </Link>

            <GoTriangleDown className={styles.dropdownArrow} aria-hidden />
          </button>
          {openDropdown === "about" && (
            <ul className={styles.dropdown} role="menu">
              <li key="company" role="none">
                <p className={styles.dropdownSubCategoryTitle}>
                  Company
                </p>
                <Link key="contact" href={`/contact${city ? `/${city}` : ""}`} className={styles.dropdownLink} role="menuitem">
                  Contact Us
                </Link>
                <Link key="instant-quote" href={`/instant-quote${city ? `/${city}` : ""}`} className={styles.dropdownLink} role="menuitem">
                  Instant Quote
                </Link>
                <Link key="service-areas" href={`/service-areas${city ? `/${city}` : ""}`} className={styles.dropdownLink} role="menuitem">
                  Service Areas
                </Link>
                <Link key="blog" href={`/blog${city ? `/location/${city}` : ""}`} className={styles.dropdownLink} role="menuitem">
                  Blog
                </Link>
              </li>
              <li key="financing" role="none">
                <p className={styles.dropdownSubCategoryTitle}>
                  Financing
                </p>
                <Link key="membership" href={`/membership${city ? `/${city}` : ""}`} className={styles.dropdownLink} role="menuitem">
                  Membership
                </Link>
                <Link key="financing" href={`/financing${city ? `/${city}` : ""}`} className={styles.dropdownLink} role="menuitem">
                  Financing
                </Link>

              </li>
              <li key="more" role="none">
                <p className={styles.dropdownSubCategoryTitle}>
                  More
                </p>
                {aboutMoreItems.map((item) => (
                  <Link key={item._id} href={item.slug?.current ? (item.slug.current.startsWith("/") ? item.slug.current : `/about/more/${item.slug.current}${city ? `/${city}` : ""}`) : "#"} className={styles.dropdownLink} role="menuitem">
                    {item.title}
                  </Link>
                ))}
              </li>


            </ul>
          )}
        </li>

      </ul>

      <Link href="/instant-quote" className={styles.aboutButtonBook}>
        Instant Quote
      </Link>
      <BookBtn />
      <CallBtn />
    </nav>
  );
}
