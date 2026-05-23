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
import HomeFinancingSection from "./components/HomeFinancingSection";
import GoogleCarousel from "./components/GoogleCarousel";
import HomeCouponThird from "./components/HomeCouponThird";
import HomeForm from "./components/HomeForm";
import HomeFinalCTA from "./components/HomeFinalCTA";
import HomeFAQ from "./components/HomeFAQ";
import ParallaxStrip from "./components/ParallaxStrip";
import LocationsCont from "./components/LocationsCont";
import Footer from "./components/Footer";
import ClosingCTA from "./components/ClosingCTA";
import NavServer from "./components/Nav/NavServer";
import StickyMobileCall from "./components/StickyMobileCall";
import SeoFaqPageJsonLd from "./components/SeoFaqPageJsonLd";
import TopLinks from "./components/TopLinks";

export default function Home() {
  return (
    <div className="pb-10 md:pb-0"> 
      <NavServer />
      <HomeHero />
      <HomeCouponSection />
      <TopLinks />
      <StatCont />
      <HomeProblemStrip />
      <HomeWhyChoose />
      <HomeCouponSecond />
      <HomeReviewSnippets />
      <HomeServiceCategories />
      <HomeProLinks />
      <HomeMembership />
      <HomeTotalProtectionPlan />
      {/* <HomeFinancingSection /> */}
      <GoogleCarousel />
      <HomeCouponThird />
      <HomeForm />
      <HomeFinalCTA />
      <HomeFAQ />
      <ParallaxStrip />
      <LocationsCont />
      <Footer />
      <ClosingCTA title="Need Service Today?"
        subtext="" 
        showCouponOffer={true}
        />
    </div>
  );
}
