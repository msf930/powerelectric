import HomeHero from "./components/HomeHero";
import ServiceMenuHome from "./components/ServiceMenuHome";
import StatCont from "./components/StatCont";
import InfoContHome from "./components/InfoContHome";
import GoogleCarousel from "./components/GoogleCarousel";
import HomeForm from "./components/HomeForm";
import FinanceCont from "./components/FinanceCont";
import ParallaxStrip from "./components/ParallaxStrip";
import LocationsCont from "./components/LocationsCont";
import Footer from "./components/Footer";
import NavServer from "./components/Nav/NavServer";
export default function Home() {
  return (
    <div>
      <NavServer />
      <HomeHero />
      {/* <ServiceMenuHome /> */}
      <StatCont />
      <InfoContHome />
      <GoogleCarousel />
      <HomeForm />
      <FinanceCont />
      <ParallaxStrip />
      <LocationsCont />
      <Footer />
    </div>
  );
}
