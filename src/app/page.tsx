import About from "@/components/layout/About";
import BuilderShowcase from "@/components/layout/BuilderShowcase";
import CallToAction from "@/components/layout/CallToAction";
import TrustRow from "@/components/layout/TrustRow";
import FeatureTest from "@/components/layout/FeatureTest";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/layout/Hero";
import HomeNav from "@/components/layout/HomeNav";
import Reveal from "@/components/motion/Reveal";

export default function Home() {
  return (
    <main className="relative ">
      <section>
        <HomeNav />
      </section>
      <section className="pb-32 px-4">
        <Hero />
      </section>
      <section className="-mt-20 pb-12 sm:pb-16">
        <Reveal>
          <TrustRow />
        </Reveal>
      </section>
      <section id="about-us" className="sm:px-16 px-8 sm:py-24 py-12">
        <Reveal>
          <About />
        </Reveal>
      </section >
      <section className="px-6 sm:py-12 py-8">
        <Reveal>
          <BuilderShowcase />
        </Reveal>
      </section>
      <section id='feature-test' className="sm:px-16 px-8 sm:py-24 py-12">
        <Reveal>
          <FeatureTest />
        </Reveal>
        </section>
      <section className="px-4 pb-16 sm:pb-24">
        <Reveal>
          <CallToAction />
        </Reveal>
      </section>
      <section>
        <Reveal>
          <Footer />
        </Reveal>
      </section>
    </main>
  );
}
