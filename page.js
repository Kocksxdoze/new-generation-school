import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Programs from "./components/Programs";
import AboutSection from "./components/AboutSection";
import Values from "./components/Values";
import Testimonials from "./components/Testimonials";
import Universities from "./components/Universities";
import News from "./components/News";
import LocationMap from "./components/LocationMap";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Programs />
      <AboutSection />
      <Values />
      <Testimonials />
      <Universities />
      <News />
      <LocationMap />
      <Footer />
    </>
  );
}
