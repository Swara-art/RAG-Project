import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl flex justify-between items-center px-8 py-4 border border-white/40 bg-white/60 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-indigo-100/50 animate-in fade-in slide-in-from-top-4 duration-1000">

      <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate("/")}>
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200 group-hover:rotate-6 transition-transform">
          C
        </div>
        <h1 className="text-xl font-black text-slate-900 tracking-tighter">
          CourseMate<span className="text-indigo-600">AI</span>
        </h1>
      </div>

      <div className="flex gap-10 items-center font-bold text-sm">
        <button className="hidden md:block text-slate-500 hover:text-indigo-600 transition-colors relative group">
          Features
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
        </button>
        <button className="hidden md:block text-slate-500 hover:text-indigo-600 transition-colors relative group">
          Pricing
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
        </button>
        
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-extrabold shadow-xl shadow-slate-200 hover:bg-indigo-600 hover:shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2"
        >
          Open App
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

      </div>

    </nav>
  );
}
