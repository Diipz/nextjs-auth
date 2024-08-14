import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import ValidSession from "./components/ValidSession";
import Hero from "../sections/Hero";
import CallToAction from "@/sections/CallToAction";
import Features from "@/sections/Features";
import ProductShowcase from "@/sections/ProductShowcase";
import FAQs from "@/sections/FAQs";
import Footer from "@/sections/Footer";

export default async function Home() {


  const session = await getServerSession(authOptions);

  //if user logged in display Link button to go to dashboard
  if (session) return (
    <ValidSession />
  )

  return (
    <>
      <Hero />
      <Features />
      <ProductShowcase />
      <FAQs />
      <CallToAction />
      <Footer />
    </>
  );
}
