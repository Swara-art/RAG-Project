import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

   return (
        <section className="relative pt-32 pb-32 md:pt-48 md:pb-48 px-6 text-center overflow-hidden">
        
        {/* Background Decorative Circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[120%] h-full pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-rose-100/30 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-indigo-100/50 text-indigo-600 px-6 py-2 rounded-full text-sm font-bold mb-10 shadow-xl shadow-indigo-50/50 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Trusted by 10,000+ Students
          </div>

          {/* Heading */}
          <h1 className="text-6xl md:text-8xl font-black leading-[0.95] tracking-tighter text-slate-900 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
              Transform your notes <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-rose-500 bg-[length:200%_auto] animate-gradient-flow">
              into AI brilliance
              </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-500 mt-10 max-w-2xl mx-auto text-xl md:text-2xl leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              The world's first RAG-powered study companion. 
              <span className="text-slate-900 block mt-2">Chat with your PDFs, get instant summaries, and master any subject.</span>
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">

              <button
                onClick={() => navigate("/dashboard")}
                className="group relative bg-indigo-600 text-white px-12 py-5 rounded-3xl font-black text-xl shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                Start Studying Now
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

          </div>

          {/* Floating Indicators */}
          <div className="mt-32 relative hidden lg:block">
            <div className="absolute -left-12 top-0 bg-white p-4 rounded-2xl shadow-2xl border border-slate-50">
               <div className="flex gap-2 items-center">
                 <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center font-bold">✓</div>
                 <div className="text-left">
                    <p className="text-[10px] font-black uppercase text-slate-400 leading-none">Status</p>
                    <p className="text-xs font-bold text-slate-900">PDF Indexed</p>
                 </div>
               </div>
            </div>

            <div className="absolute -right-12 bottom-0 bg-white p-4 rounded-2xl shadow-2xl border border-slate-50">
               <div className="flex gap-2 items-center">
                 <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center font-bold">✨</div>
                 <div className="text-left">
                    <p className="text-[10px] font-black uppercase text-slate-400 leading-none">Insight</p>
                    <p className="text-xs font-bold text-slate-900">Summary Ready</p>
                 </div>
               </div>
            </div>
          </div>
        </div>

        </section>
    );
}
