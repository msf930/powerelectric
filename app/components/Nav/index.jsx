"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.css";
import { GoTriangleDown } from "react-icons/go";
import { HiMenu, HiX } from "react-icons/hi";
import BookBtn from "../BookBtn";
import CallBtn from "../CallBtn";
import { useRouter } from "next/navigation";
export default function Nav({ dropdownItems = [], city = "", aboutMoreItems = [], cityItems = [] }) {
  const pathname = usePathname();
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState({});

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  const toggleMobileSection = (id) => {
    setExpandedMobile((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // console.log(aboutMoreItems);
  if (pathname?.includes("/studio")) {
    return null;
  }

  const lowerCity = city.toLowerCase();
  
  return (
    <>
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
          <Image
            src="/PESLogo.png"
            alt="Power Electrical Services"
            width={100}
            height={50}
            className={styles.logoMobile}
            priority
          />
        </Link>

        <div className={styles.desktopNav}>
          <ul className={styles.menu}>
          <li
               className={styles.menuItem}
                onMouseEnter={() => setOpenDropdown("electrician")}
               onMouseLeave={() => setOpenDropdown(null)}
               onClick={() => setOpenDropdown("electrician")}
              >

                <button
                  type="button"
                  className={styles.dropdownTrigger}
                  aria-expanded={openDropdown === "electrician"}
                  aria-haspopup="true"
                >
                  Electrician
                  <GoTriangleDown className={styles.dropdownArrow} aria-hidden />
                </button>
                {openDropdown === "electrician" && (
                  <ul className={styles.dropdownCityItems} role="menu">
                    {cityItems.map((item) => (
                      <li key={item._id} role="none">
                        <Link href={item.slug?.current ? (item.slug.current.startsWith("/") ? item.slug.current : `/${item.slug.current}`) : "#"} className={styles.dropdownLink} role="menuitem">
                          {item.city}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
          <li
               className={styles.menuItem}
                
              >

                <button
                  type="button"
                  className={styles.dropdownTrigger}
                  aria-expanded={openDropdown === "electrician"}
                  aria-haspopup="true"
                  onClick={() => router.push("/real-estate-inspection-repairs-denver")}
                >
                  Real Estate Pro
                  
                </button>
              
              </li>
          <li className={styles.menuItem}>
                <button
                  type="button"
                  className={styles.dropdownTrigger}
                  onClick={() => router.push("/contractor")}
                >
                  Contractor
                </button>
              </li>
            {dropdownItems.map((item, index) => (
              <li
                key={`${item._id}-${index}`}
                className={styles.menuItem}
                onMouseEnter={() => setOpenDropdown(item._id)}
                onMouseLeave={() => setOpenDropdown(null)}
                onClick={() => setOpenDropdown(item._id)}
              >

                <button
                  type="button"
                  className={styles.dropdownTrigger}
                  aria-expanded={openDropdown === item._id}
                  aria-haspopup="true"
                >
                  {openDropdown === item._id ? (
                    <Link href={item.slug?.current ? (item.slug.current.startsWith("/") ? item.slug.current : `/service/${item.slug.current}${city ? `/service-area/${city}` : ""}`) : "#"} >
                      {item.title}
                    </Link>
                  ) : (
                    <h3 className={styles.dropdownCategoryTitle}>
                      {item.title}
                    </h3>
                  )}


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
                          <Link key={`${service._id}-${index}`} href={service.slug?.current ? (service.slug.current.startsWith("/") ? `service/${service.slug.current}${city ? `/${city}` : ""}` : `/service/${service.slug.current}${city ? `/${city}` : ""}`) : "#"} className={styles.dropdownLink} role="menuitem">
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
              onClick={() => setOpenDropdown("about")}
            >

              <button
                type="button"
                className={styles.dropdownTrigger}
                aria-expanded={openDropdown === "about"}
                aria-haspopup="true"
              >
                {openDropdown === "about" ? (
                  <Link href={`/about${city ? `/${city}` : ""}`} >
                    About Us
                  </Link>
                ) : (
                  <h3 className={styles.dropdownCategoryTitle}>
                    About Us
                  </h3>
                )}

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
                  {aboutMoreItems && (
                    <li key="more" role="none">
                    <p className={styles.dropdownSubCategoryTitle}>
                      More
                    </p>
                    { aboutMoreItems.map((item) => (
                      <Link key={item._id} href={item.slug?.current ? (item.slug.current.startsWith("/") ? item.slug.current : `/about/more/${item.slug.current}${city ? `/${city}` : ""}`) : "#"} className={styles.dropdownLink} role="menuitem">
                        {item.title}
                      </Link>
                    ))}
                  </li>
                  )}


                </ul>
              )}
            </li>

          </ul>

          <Link href={`/instant-quote${city ? `/${city}` : ""}`} className={styles.aboutButtonBook}>
            Instant Quote
          </Link>
          <BookBtn />
          <CallBtn />
        </div>

        <button
          type="button"
          className={styles.hamburger}
          onClick={() => setMobileMenuOpen(true)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-panel"
          aria-label={mobileMenuOpen ? "Menu open" : "Open menu"}
        >
          <HiMenu className={styles.hamburgerIcon} aria-hidden />
        </button>
      </nav>

      <div
        className={`${styles.mobileBackdrop} ${mobileMenuOpen ? styles.mobileOpen : ""}`}
        aria-hidden={!mobileMenuOpen}
        onClick={() => setMobileMenuOpen(false)}
      />
      <aside
        id="mobile-nav-panel"
        className={`${styles.mobilePanel} ${mobileMenuOpen ? styles.mobileOpen : ""}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className={styles.mobilePanelHeader}>
          <span className={styles.mobilePanelTitle}>Menu</span>
          <button
            type="button"
            className={styles.mobileClose}
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <HiX className={styles.mobileCloseIcon} aria-hidden />
          </button>
        </div>
        <div className={styles.mobileSection}>
          <button
            type="button"
            className={styles.mobileSectionToggle}
            onClick={() => toggleMobileSection("services")}
            aria-expanded={!!expandedMobile.services}
          >
            <Link href={`/${city ? `location/${city}` : ""}`} className={styles.mobilePrimaryLink} onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
          </button>

        </div>
        <div className={styles.mobileSection}>
          <button
            type="button"
            className={styles.mobileSectionToggle}
            onClick={() => toggleMobileSection("electrician")}
            aria-expanded={!!expandedMobile.electrician}
          >
            Electrician Services
            <GoTriangleDown
                  className={`${styles.mobileChevron} ${expandedMobile.electrician ? styles.mobileChevronOpen : ""}`}
                  aria-hidden
                />
          </button>
          {expandedMobile.electrician && (
            <div className={styles.mobileSectionBody}>
              {cityItems.map((item) => (
                <Link key={item._id} href={item.slug?.current ? (item.slug.current.startsWith("/") ? item.slug.current : `/${item.slug.current}`) : "#"} className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
                  {item.city}
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className={styles.mobileSection}>
          <button
            type="button"
            className={styles.mobileSectionToggle}
            onClick={() => router.push("/real-estate-inspection-repairs-denver")}
          >
            Real Estate Pro
           
          </button>
         
        </div>
        <div className={styles.mobileSection}>
          <button
            type="button"
            className={styles.mobileSectionToggle}
            onClick={() => router.push("/contractor")}
          >
            Contractor
          </button>
        </div>
        <div className={styles.mobileScroll}>
          {dropdownItems.map((item, index) => (
            <div key={`${item._id}-${index}`} className={styles.mobileSection}>
              <button
                type="button"
                className={styles.mobileSectionToggle}
                onClick={() => toggleMobileSection(item._id)}
                aria-expanded={!!expandedMobile[item._id]}
              >
                {item.title}
                <GoTriangleDown
                  className={`${styles.mobileChevron} ${expandedMobile[item._id] ? styles.mobileChevronOpen : ""}`}
                  aria-hidden
                />
              </button>
              {expandedMobile[item._id] && (
                <div className={styles.mobileSectionBody}>
                  <Link
                    href={
                      item.slug?.current
                        ? item.slug.current.startsWith("/")
                          ? item.slug.current
                          : `/${item.slug.current}${city ? `/service-area/${city}` : ""}`
                        : "#"
                    }
                    className={styles.mobilePrimaryLink}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title} overview
                  </Link>
                  {(item.subCategories ?? []).map((subCategory) => (
                    <div key={subCategory._id} className={styles.mobileSubBlock}>
                      <p className={styles.mobileSubTitle}>{subCategory.title}</p>
                      {(subCategory.services ?? []).map((service, index) => (
                        <Link
                          key={`${service._id}-${index}`}
                          href={
                            service.slug?.current
                              ? service.slug.current.startsWith("/")
                                ? `${service.slug.current}${city ? `/${city}` : ""}`
                                : `/${service.slug.current}${city ? `/${city}` : ""}`
                              : "#"
                          }
                          className={styles.mobileLink}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className={styles.mobileSection}>
            <button
              type="button"
              className={styles.mobileSectionToggle}
              onClick={() => toggleMobileSection("about")}
              aria-expanded={!!expandedMobile.about}
            >
              About Us
              <GoTriangleDown
                className={`${styles.mobileChevron} ${expandedMobile.about ? styles.mobileChevronOpen : ""}`}
                aria-hidden
              />
            </button>
            {expandedMobile.about && (
              <div className={styles.mobileSectionBody}>
                <div className={styles.mobileSubBlock}>
                  <p className={styles.mobileSubTitle}>Company</p>
                  <Link href={`/about${city ? `/${city}` : ""}`} className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
                    About Us
                  </Link>
                  <Link
                    href={`/contact${city ? `/${city}` : ""}`}
                    className={styles.mobileLink}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                  <Link
                    href={`/instant-quote${city ? `/${city}` : ""}`}
                    className={styles.mobileLink}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Instant Quote
                  </Link>
                  <Link
                    href={`/service-areas${city ? `/${city}` : ""}`}
                    className={styles.mobileLink}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Service Areas
                  </Link>
                  <Link
                    href={`/blog${city ? `/location/${city}` : ""}`}
                    className={styles.mobileLink}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Blog
                  </Link>
                </div>
                <div className={styles.mobileSubBlock}>
                  <p className={styles.mobileSubTitle}>Financing</p>
                  <Link
                    href={`/membership${city ? `/${city}` : ""}`}
                    className={styles.mobileLink}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Membership
                  </Link>
                  <Link
                    href={`/financing${city ? `/${city}` : ""}`}
                    className={styles.mobileLink}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Financing
                  </Link>
                </div>
                {aboutMoreItems && (
                <div className={styles.mobileSubBlock}>
                  <p className={styles.mobileSubTitle}>More</p>
                  {aboutMoreItems.map((moreItem) => (
                    <Link
                      key={moreItem._id}
                      href={
                        moreItem.slug?.current
                          ? moreItem.slug.current.startsWith("/")
                            ? moreItem.slug.current
                            : `/about/more/${moreItem.slug.current}${city ? `/${city}` : ""}`
                          : "#"
                      }
                      className={styles.mobileLink}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {moreItem.title}
                    </Link>
                  ))}
                </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className={styles.mobileActions}>
          <Link
            href={`/instant-quote${city ? `/${city}` : ""}`}
            className={styles.mobileCta}
            onClick={() => setMobileMenuOpen(false)}
          >
            Instant Quote
          </Link>
          <div className={styles.mobileBtnRow}>
            <BookBtn />
            <CallBtn />
          </div>
        </div>
      </aside>
    </>
  );
}
