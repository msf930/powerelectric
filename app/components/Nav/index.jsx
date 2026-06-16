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
import { servicePageHref } from "../../../lib/servicePaths";

function MenuLink({ prefetch = false, ...props }) {
  return <Link prefetch={prefetch} {...props} />;
}

const HOLIDAY_LIGHTING_ID = "holiday-lighting";

const HOLIDAY_LIGHTING_CATEGORY = {
  _id: HOLIDAY_LIGHTING_ID,
  title: "Holiday Lighting",
  services: [
    {
      _id: "christmas-light-installation",
      title: "Christmas Light Installation Services",
      slug: { current: "holiday-lighting" },
    },
  ],
};

function serviceLinkHref(slug, city) {
  return servicePageHref(slug, city);
}

export default function Nav({ dropdownItems = [], city = "", aboutMoreItems = [], cityItems = [], bookLink = null, callNumber = null }) {
  const pathname = usePathname();
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeServiceSubCategoryId, setActiveServiceSubCategoryId] = useState(null);
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
  const serviceSubCategories = dropdownItems.flatMap((item) => item.subCategories ?? []);
  const activeServiceSubCategory =
    activeServiceSubCategoryId === HOLIDAY_LIGHTING_ID
      ? HOLIDAY_LIGHTING_CATEGORY
      : serviceSubCategories.find((subCategory) => {
        if (!activeServiceSubCategoryId) return false;
        return (
          String(subCategory._id ?? subCategory.title) ===
          activeServiceSubCategoryId
        );
      }) ?? serviceSubCategories[0];
  const openServicesDropdown = () => {
    setOpenDropdown("services");
    if (!activeServiceSubCategoryId && serviceSubCategories.length > 0) {
      setActiveServiceSubCategoryId(String(serviceSubCategories[0]._id ?? serviceSubCategories[0].title));
    }
  };

  const instantQuoteHref = `/instant-quote${city ? `/${city}` : ""}`;

  return (
    <>
      <header className={styles.siteHeader}>
        <nav className={styles.nav}>
          <Link href={`/${city ? `location/${city}` : ""}`} className={styles.logoLink} aria-label="Home">
            <Image
              src="/PESLogo.png"
              alt="Power Electrical Services"
              width={200}
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
                        <MenuLink href={item.slug?.current ? (item.slug.current.startsWith("/") ? item.slug.current : `/${item.slug.current}`) : "#"} className={styles.dropdownLink} role="menuitem">
                          {item.city}
                        </MenuLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li
                className={styles.menuItem}

              >

                <MenuLink
                  href={`/real-estate-inspection-repairs-denver${city ? `/${city}` : ""}`}
                  className={styles.dropdownTrigger}
                  aria-expanded={openDropdown === "electrician"}
                  aria-haspopup="true"
                >
                  Real Estate Pro

                </MenuLink>

              </li>
              <li className={styles.menuItem}>
                <MenuLink
                  type="button"
                  className={styles.dropdownTrigger}
                  href={`/contractor${city ? `/${city}` : ""}`}
                >
                  Contractor
                </MenuLink>
              </li>
              <li
                className={styles.menuItem}
                onMouseEnter={openServicesDropdown}
                onMouseLeave={() => setOpenDropdown(null)}
                onClick={openServicesDropdown}
              >
                <button
                  type="button"
                  className={styles.dropdownTrigger}
                  aria-expanded={openDropdown === "services"}
                  aria-haspopup="true"
                >
                  {openDropdown === "services" ? "Services" : (
                    <h3 className={styles.dropdownCategoryTitle}>
                      Services
                    </h3>
                  )}
                  <GoTriangleDown className={styles.dropdownArrow} aria-hidden />
                </button>
                {openDropdown === "services" && (
                  <ul className={styles.dropdown} role="menu">
                    <li className={styles.servicesDropdownColumns} role="none">
                      <div className={styles.servicesDropdownSubCategories}>
                        {serviceSubCategories.map((subCategory) => {
                          const subCategoryId = String(subCategory._id ?? subCategory.title);
                          const isActive = activeServiceSubCategoryId === subCategoryId;
                          return (
                            <button
                              key={subCategoryId}
                              type="button"
                              className={`${styles.servicesDropdownSubCategoryButton} ${isActive ? styles.servicesDropdownSubCategoryButtonActive : ""}`}
                              onClick={() => setActiveServiceSubCategoryId(subCategoryId)}
                            >
                              {subCategory.title}
                            </button>
                          );
                        })}
                        <button
                          key={HOLIDAY_LIGHTING_ID}
                          type="button"
                          className={`${styles.servicesDropdownSubCategoryButton} ${activeServiceSubCategoryId === HOLIDAY_LIGHTING_ID ? styles.servicesDropdownSubCategoryButtonActive : ""}`}
                          onClick={() => setActiveServiceSubCategoryId(HOLIDAY_LIGHTING_ID)}
                        >
                          {HOLIDAY_LIGHTING_CATEGORY.title}
                        </button>
                      </div>
                      <div className={styles.servicesDropdownServices}>
                        <p className={styles.dropdownSubCategoryTitle}>
                          {activeServiceSubCategory?.title}
                        </p>
                        {(activeServiceSubCategory?.services ?? []).map((service, serviceIndex) => (
                          <MenuLink
                            key={`${service._id}-${serviceIndex}`}
                            href={serviceLinkHref(service.slug?.current, city)}
                            className={styles.dropdownLink}
                            role="menuitem"
                          >
                            {service.title}
                          </MenuLink>
                        ))}
                      </div>
                    </li>

                  </ul>
                )}
              </li>
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
                    <MenuLink href={`/about${city ? `/${city}` : ""}`} >
                      About Us
                    </MenuLink>
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
                      <MenuLink key="about-us" href={`/about${city ? `/${city}` : ""}`} className={styles.dropdownLink} role="menuitem">
                        About Us
                      </MenuLink>
                      <MenuLink key="contact" href={`/contact${city ? `/${city}` : ""}`} className={styles.dropdownLink} role="menuitem">
                        Contact Us
                      </MenuLink>
                      <MenuLink key="instant-quote" href={`/instant-quote${city ? `/${city}` : ""}`} className={styles.dropdownLink} role="menuitem">
                        Instant Quote
                      </MenuLink>
                      <MenuLink key="service-areas" href={`/service-areas${city ? `/${city}` : ""}`} className={styles.dropdownLink} role="menuitem">
                        Service Areas
                      </MenuLink>
                      <MenuLink key="blog" href={`/blog${city ? `/location/${city}` : ""}`} className={styles.dropdownLink} role="menuitem">
                        Blog
                      </MenuLink>
                    </li>
                    <li key="financing" role="none">
                      <p className={styles.dropdownSubCategoryTitle}>
                        Financing
                      </p>
                      <MenuLink key="membership" href={`/membership${city ? `/${city}` : ""}`} className={styles.dropdownLink} role="menuitem">
                        Membership
                      </MenuLink>
                      <MenuLink key="financing" href={`/financing${city ? `/${city}` : ""}`} className={styles.dropdownLink} role="menuitem">
                        Financing
                      </MenuLink>

                    </li>
                    {aboutMoreItems && (
                      <li key="more" role="none">
                        <p className={styles.dropdownSubCategoryTitle}>
                          More
                        </p>
                        {aboutMoreItems.map((item) => (
                          <MenuLink key={item._id} href={item.slug?.current ? (item.slug.current.startsWith("/") ? item.slug.current : `/about/more/${item.slug.current}${city ? `/${city}` : ""}`) : "#"} className={styles.dropdownLink} role="menuitem">
                            {item.title}
                          </MenuLink>
                        ))}
                      </li>
                    )}


                  </ul>
                )}
              </li>
            </ul>
            {/* <ul className={styles.menuAbout}>
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
                    <MenuLink href={`/about${city ? `/${city}` : ""}`} >
                      About Us
                    </MenuLink>
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
                      <MenuLink key="about-us" href={`/about${city ? `/${city}` : ""}`} className={styles.dropdownLink} role="menuitem">
                        About Us
                      </MenuLink>
                      <MenuLink key="contact" href={`/contact${city ? `/${city}` : ""}`} className={styles.dropdownLink} role="menuitem">
                        Contact Us
                      </MenuLink>
                      <MenuLink key="instant-quote" href={`/instant-quote${city ? `/${city}` : ""}`} className={styles.dropdownLink} role="menuitem">
                        Instant Quote
                      </MenuLink>
                      <MenuLink key="service-areas" href={`/service-areas${city ? `/${city}` : ""}`} className={styles.dropdownLink} role="menuitem">
                        Service Areas
                      </MenuLink>
                      <MenuLink key="blog" href={`/blog${city ? `/location/${city}` : ""}`} className={styles.dropdownLink} role="menuitem">
                        Blog
                      </MenuLink>
                    </li>
                    <li key="financing" role="none">
                      <p className={styles.dropdownSubCategoryTitle}>
                        Financing
                      </p>
                      <MenuLink key="membership" href={`/membership${city ? `/${city}` : ""}`} className={styles.dropdownLink} role="menuitem">
                        Membership
                      </MenuLink>
                      <MenuLink key="financing" href={`/financing${city ? `/${city}` : ""}`} className={styles.dropdownLink} role="menuitem">
                        Financing
                      </MenuLink>

                    </li>
                    {aboutMoreItems && (
                      <li key="more" role="none">
                        <p className={styles.dropdownSubCategoryTitle}>
                          More
                        </p>
                        {aboutMoreItems.map((item) => (
                          <MenuLink key={item._id} href={item.slug?.current ? (item.slug.current.startsWith("/") ? item.slug.current : `/about/more/${item.slug.current}${city ? `/${city}` : ""}`) : "#"} className={styles.dropdownLink} role="menuitem">
                            {item.title}
                          </MenuLink>
                        ))}
                      </li>
                    )}


                  </ul>
                )}
              </li>

            </ul> */}

            <MenuLink href={`/instant-quote${city ? `/${city}` : ""}`} className={styles.aboutButtonBook}>
              Instant Quote
            </MenuLink>
            <BookBtn link={bookLink} />
            <CallBtn number={callNumber} />
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
          className={styles.offerBanner}
          role="region"
          aria-label="Limited time offer"
        >
          <div className={styles.offerBannerInner}>
            <span className={styles.offerBannerHighlight}>LIMITED OFFER</span>
            <span className={styles.offerBannerSep} aria-hidden>
              |
            </span>
            <span>$35 Off Any Service</span>
            <span className={styles.offerBannerSep} aria-hidden>
              |
            </span>
            <span>New &amp; Existing Customers Welcome</span>
            <span className={styles.offerBannerSep} aria-hidden>
              |
            </span>
            <MenuLink href={instantQuoteHref} className={styles.offerBannerLink}>
              Claim This Offer
            </MenuLink>
            <span className={styles.offerBannerSep} aria-hidden>
              |
            </span>
            <MenuLink href="tel:+17202722562" className={styles.offerBannerLink}>
              Call (720) 272-2562
            </MenuLink>
          </div>
        </div>
      </header>

      <div className={styles.headerSpacer} aria-hidden />

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
        <div className={styles.mobileScroll}>
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
                <MenuLink key={item._id} href={item.slug?.current ? (item.slug.current.startsWith("/") ? item.slug.current : `/${item.slug.current}`) : "#"} className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
                  {item.city}
                </MenuLink>
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
        <div>
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
                  {/* <button
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
                  </button> */}
                  {(item.subCategories ?? []).map((subCategory) => (
                    <div key={subCategory._id} className={styles.mobileSubBlock}>
                      <p className={styles.mobileSubTitle}>{subCategory.title}</p>
                      {(subCategory.services ?? []).map((service, index) => (
                        <MenuLink
                          key={`${service._id}-${index}`}
                          href={
                            service.slug?.current
                              ? serviceLinkHref(service.slug.current, city)
                              : "#"
                          }
                          className={styles.mobileLink}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {service.title}
                        </MenuLink>
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
              onClick={() => toggleMobileSection(HOLIDAY_LIGHTING_ID)}
              aria-expanded={!!expandedMobile[HOLIDAY_LIGHTING_ID]}
            >
              {HOLIDAY_LIGHTING_CATEGORY.title}
              <GoTriangleDown
                className={`${styles.mobileChevron} ${expandedMobile[HOLIDAY_LIGHTING_ID] ? styles.mobileChevronOpen : ""}`}
                aria-hidden
              />
            </button>
            {expandedMobile[HOLIDAY_LIGHTING_ID] && (
              <div className={styles.mobileSectionBody}>
                <div className={styles.mobileSubBlock}>
                  <p className={styles.mobileSubTitle}>
                    {HOLIDAY_LIGHTING_CATEGORY.title}
                  </p>
                  {HOLIDAY_LIGHTING_CATEGORY.services.map((service, index) => (
                    <MenuLink
                      key={`${service._id}-${index}`}
                      href="/holidayLighting"
                      className={styles.mobileLink}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {service.title}
                    </MenuLink>
                  ))}
                </div>
              </div>
            )}
          </div>

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
                  <MenuLink href={`/about${city ? `/${city}` : ""}`} className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
                    About Us
                  </MenuLink>
                  <MenuLink
                    href={`/contact${city ? `/${city}` : ""}`}
                    className={styles.mobileLink}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact Us
                  </MenuLink>
                  <MenuLink
                    href={`/instant-quote${city ? `/${city}` : ""}`}
                    className={styles.mobileLink}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Instant Quote
                  </MenuLink>
                  <MenuLink
                    href={`/service-areas${city ? `/${city}` : ""}`}
                    className={styles.mobileLink}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Service Areas
                  </MenuLink>
                  <MenuLink
                    href={`/blog${city ? `/location/${city}` : ""}`}
                    className={styles.mobileLink}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Blog
                  </MenuLink>
                </div>
                <div className={styles.mobileSubBlock}>
                  <p className={styles.mobileSubTitle}>Financing</p>
                  <MenuLink
                    href={`/membership${city ? `/${city}` : ""}`}
                    className={styles.mobileLink}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Membership
                  </MenuLink>
                  <MenuLink
                    href={`/financing${city ? `/${city}` : ""}`}
                    className={styles.mobileLink}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Financing
                  </MenuLink>
                </div>
                {aboutMoreItems && (
                  <div className={styles.mobileSubBlock}>
                    <p className={styles.mobileSubTitle}>More</p>
                    {aboutMoreItems.map((moreItem) => (
                      <MenuLink
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
                      </MenuLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        </div>

        <div className={styles.mobileActions}>
          <MenuLink
            href={`/instant-quote${city ? `/${city}` : ""}`}
            className={styles.mobileCta}
            onClick={() => setMobileMenuOpen(false)}
          >
            Instant Quote
          </MenuLink>
          <div className={styles.mobileBtnRow}>
            <BookBtn link={bookLink} />
            <CallBtn number={callNumber} />
          </div>
        </div>
      </aside>
    </>
  );
}
