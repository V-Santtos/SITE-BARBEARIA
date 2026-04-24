import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HaloTransition from "@/components/HaloTransition";
import PainBenefits from "@/components/PainBenefits";
import DemoVideo from "@/components/DemoVideo";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div style={{ position: "relative" }}>
          <Hero />
          <div
            aria-hidden="true"
            className="hero-blur-seam"
            style={{
              position: "absolute",
              // top: "100svh",
              left: 0,
              right: 0,
              height: 160,
              width: "auto",
              transform: "translateY(-50%)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              maskImage:
                "linear-gradient(to bottom, transparent, black 35%, black 65%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 35%, black 65%, transparent)",
              zIndex: 40,
              pointerEvents: "none",
            }}
          />
          <HaloTransition />
        </div>
        <PainBenefits />
        <DemoVideo />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
