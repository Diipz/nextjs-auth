import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import ValidSession from "./components/ValidSession";
import Hero from "../sections/Hero";
import CallToAction from "@/sections/CallToAction";
import Mission from "@/sections/Mission";
import ProductShowcase from "@/sections/ProductShowcase";
import FAQs from "@/sections/FAQs";
import Footer from "@/sections/Footer";
import Contact from "@/sections/Contact";
import Header from "@/sections/Header";
import Appbar from "./components/Appbar";
import LogoTicker from "../sections/LogoTicker";
import Testimonials from "@/sections/Testimonials";

export default async function Home() {


  const session = await getServerSession(authOptions);

  //if user logged in display Link button to go to dashboard
  if (session) return (
    <>
      <Appbar />
      <ValidSession />
    </>
  )

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
