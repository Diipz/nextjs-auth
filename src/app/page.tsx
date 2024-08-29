import Hero from "../sections/Hero";
import CallToAction from "@/sections/CallToAction";
import Mission from "@/sections/Mission";
import ProductShowcase from "@/sections/ProductShowcase";
import FAQs from "@/sections/FAQs";
import Footer from "@/sections/Footer";
import Contact from "@/sections/Contact";
import Header from "@/sections/Header";
import LogoTicker from "../sections/LogoTicker";
import Testimonials from "@/sections/Testimonials";

export default async function Home() {

  return (
    <>
      <Header />
      <Hero />
      <LogoTicker />
      <Mission />
      <ProductShowcase />
      <FAQs />
      <Testimonials />
      <CallToAction />
      <Contact />
      <Footer />
    </>
  );
}
