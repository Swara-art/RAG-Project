import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-[#F8FAFC] text-slate-900 min-h-screen relative overflow-hidden">

      {/* Decorative Background Elements */}
      <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] bg-indigo-100 opacity-50 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-rose-50 opacity-40 blur-[100px] rounded-full"></div>

      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <HowItWorks />
        <Footer />
      </div>

    </div>
  );
}