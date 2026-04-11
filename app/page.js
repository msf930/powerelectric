import HomeHero from "./components/HomeHero";
import StatCont from "./components/StatCont";
import HomeProblemStrip from "./components/HomeProblemStrip";
import HomeWhyChoose from "./components/HomeWhyChoose";
import HomeReviewSnippets from "./components/HomeReviewSnippets";
import HomeServiceCategories from "./components/HomeServiceCategories";
import HomeProLinks from "./components/HomeProLinks";
import HomeMembership from "./components/HomeMembership";
import HomeTotalProtectionPlan from "./components/HomeTotalProtectionPlan";
import HomeFinancingSection from "./components/HomeFinancingSection";
import GoogleCarousel from "./components/GoogleCarousel";
import HomeForm from "./components/HomeForm";
import HomeFinalCTA from "./components/HomeFinalCTA";
import HomeFAQ from "./components/HomeFAQ";
import ParallaxStrip from "./components/ParallaxStrip";
import LocationsCont from "./components/LocationsCont";
import Footer from "./components/Footer";
import NavServer from "./components/Nav/NavServer";
import StickyMobileCall from "./components/StickyMobileCall";
import SeoFaqPageJsonLd from "./components/SeoFaqPageJsonLd";
import TopLinks from "./components/TopLinks";

export default function Home() {
  return (
    <div className="pb-20 md:pb-0">
      
      <NavServer />
      <HomeHero />
      <TopLinks />
      <StatCont />
      <HomeProblemStrip />
      <HomeWhyChoose />
      <HomeReviewSnippets />
      <HomeServiceCategories />
      <HomeProLinks />
      <HomeMembership />
      <HomeTotalProtectionPlan />
      {/* <HomeFinancingSection /> */}
      <GoogleCarousel />
      <HomeForm />
      <HomeFinalCTA />
      <HomeFAQ />
      <ParallaxStrip />
      <LocationsCont />
      <Footer />
      <StickyMobileCall />
    </div>
  );
}
