import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Service from "@/components/Service/Service";
import LogoPartner from "@/components/LogoSlide/LogoPartner";
import LogoHospital from "@/components/LogoSlide/LogoHospital";
import LatestProduct from "@/components/Product/LatestProduct";
import { Footer } from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <div className="overflow-x-hidden text-gray-800">
        <Navbar />
        <Hero />
        <About />
        <Service />
        <LogoPartner />
        <LatestProduct />
        <LogoHospital />
        <Footer />
      </div>
    </>
  );
}
