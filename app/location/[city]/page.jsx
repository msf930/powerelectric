import HomeHero from "../../components/HomeHero";
import ServiceMenuHome from "../../components/ServiceMenuHome";
import StatCont from "../../components/StatCont";
import InfoContHome from "../../components/InfoContHome";
import GoogleCarousel from "../../components/GoogleCarousel";
import HomeForm from "../../components/HomeForm";
import FinanceCont from "../../components/FinanceCont";
import ParallaxStrip from "../../components/ParallaxStrip";
import LocationsCont from "../../components/LocationsCont";
import Footer from "../../components/Footer";
import NavServer from "../../components/Nav/NavServer";
export default async function CityPage({ params }) {
    const { city } = await params;

    return (
        <div>
            <NavServer city={city} />
            <HomeHero city={city} />
            <ServiceMenuHome city={city} />
            <StatCont />
            <InfoContHome />
            <GoogleCarousel />
            <HomeForm city={city} />
            <FinanceCont city={city} />
            <ParallaxStrip />
            <LocationsCont city={city} />
            <Footer />
        </div>
    );
}
