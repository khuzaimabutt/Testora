import About from "@/components/layout/About";
import FeatureTest from "@/components/layout/FeatureTest";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/layout/Hero";
import HomeNav from "@/components/layout/HomeNav";

export default function Home() {
  return (
    <>
      <HomeNav />
      <main id="main">
        <section>
          <Hero />
        </section>
        <section id="about-us" className="scroll-mt-16 border-t bg-secondary/40 px-4 py-20 sm:px-8 sm:py-28">
          <About />
        </section>
        <section id="feature-test" className="scroll-mt-16 px-4 py-20 sm:px-8 sm:py-28">
          <FeatureTest />
        </section>
      </main>
      <Footer />
    </>
  );
}
