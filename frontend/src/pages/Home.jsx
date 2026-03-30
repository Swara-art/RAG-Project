import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">

      {/* Glow Background */}
      <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-lime-400 opacity-10 blur-[200px] rounded-full"></div>

      {/* Subtle radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#111_0%,_black_70%)]"></div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <HowItWorks />
        <Footer />
      </div>

    </div>
  );
}