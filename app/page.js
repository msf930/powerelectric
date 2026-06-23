import dynamic from "next/dynamic";
import { getHomePageData } from "../lib/siteData";
import HomeHero from "./components/HomeHero";
import HomeCouponSection from "./components/HomeCouponSection";
import StatCont from "./components/StatCont";
import HomeProblemStrip from "./components/HomeProblemStrip";
import HomeWhyChoose from "./components/HomeWhyChoose";
import HomeCouponSecond from "./components/HomeCouponSecond";
import HomeReviewSnippets from "./components/HomeReviewSnippets";
import HomeServiceCategories from "./components/HomeServiceCategories";
import HomeProLinks from "./components/HomeProLinks";
import HomeMembership from "./components/HomeMembership";
import HomeTotalProtectionPlan from "./components/HomeTotalProtectionPlan";
import HomeCouponThird from "./components/HomeCouponThird";
import HomeFinalCTA from "./components/HomeFinalCTA";
import HomeFAQ from "./components/HomeFAQ";
import ParallaxStrip from "./components/ParallaxStrip";
import Footer from "./components/Footer";
import ClosingCTA from "./components/ClosingCTA";
import NavServer from "./components/Nav/NavServer";
import TopLinks from "./components/TopLinks";

const GoogleCarousel = dynamic(() => import("./components/GoogleCarousel"));
const HomeForm = dynamic(() => import("./components/HomeForm"));
const LocationsCont = dynamic(() => import("./components/LocationsCont"));

export const revalidate = false;

export default async function Home() {
  const {
    bookLink,
    callNumber,
    stats,
    contact,
    widget,
    carouselReviews,
    reviewSnippets,
  } = await getHomePageData();

  return (
    <div className="pb-10 md:pb-0">
      <NavServer bookLink={bookLink} callNumber={callNumber} />
      <HomeHero
        widget={widget}
        bookLink={bookLink}
        callNumber={callNumber}
      />
      <HomeCouponSection />
      <TopLinks />
      <StatCont stats={stats} />
      <HomeProblemStrip />
      <HomeWhyChoose />
      <HomeCouponSecond />
      <HomeReviewSnippets snippets={reviewSnippets} />
      <HomeServiceCategories />
      <HomeProLinks />
      <HomeMembership />
      <HomeTotalProtectionPlan />
      <GoogleCarousel widget={widget} reviews={carouselReviews} />
      <HomeCouponThird />
      <HomeForm contactData={contact} bookLink={bookLink} />
      <HomeFinalCTA />
      <HomeFAQ />
      <ParallaxStrip />
      <LocationsCont bookLink={bookLink} callNumber={callNumber} />
      <Footer bookLink={bookLink} callNumber={callNumber} />
      <ClosingCTA
        title="Need Service Today?"
        subtext=""
        showCouponOffer={true}
        bookLink={bookLink}
        callNumber={callNumber}
      />
    </div>
  );
}
