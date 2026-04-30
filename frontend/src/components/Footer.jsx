export default function Footer() {
  return (
    <footer className="pt-32 pb-20 px-6 md:px-10 bg-white relative overflow-hidden">
      
      {/* Decorative line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">
                C
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tighter">
                CourseMate<span className="text-indigo-600">AI</span>
              </h2>
            </div>
            <p className="text-slate-500 font-medium leading-relaxed">
              Empowering the next generation of learners with advanced RAG technology. Stop searching, start knowing.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-24">
            <div>
              <h3 className="text-slate-900 font-black uppercase tracking-widest text-xs mb-8">Product</h3>
              <ul className="space-y-4 text-slate-500 font-bold text-sm">
                <li className="hover:text-indigo-600 transition cursor-pointer">Features</li>
                <li className="hover:text-indigo-600 transition cursor-pointer">Pricing</li>
                <li className="hover:text-indigo-600 transition cursor-pointer">Releases</li>
              </ul>
            </div>
            <div>
              <h3 className="text-slate-900 font-black uppercase tracking-widest text-xs mb-8">Resources</h3>
              <ul className="space-y-4 text-slate-500 font-bold text-sm">
                <li className="hover:text-indigo-600 transition cursor-pointer">Documentation</li>
                <li className="hover:text-indigo-600 transition cursor-pointer">Help Center</li>
                <li className="hover:text-indigo-600 transition cursor-pointer">Community</li>
              </ul>
            </div>
            <div>
              <h3 className="text-slate-900 font-black uppercase tracking-widest text-xs mb-8">Social</h3>
              <ul className="space-y-4 text-slate-500 font-bold text-sm">
                <li className="hover:text-indigo-600 transition cursor-pointer">Twitter</li>
                <li className="hover:text-indigo-600 transition cursor-pointer">GitHub</li>
                <li className="hover:text-indigo-600 transition cursor-pointer">Discord</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
            © {new Date().getFullYear()} CourseMate AI. Built for the future of education.
          </p>
          <div className="flex gap-8">
            <span className="text-slate-400 hover:text-slate-900 transition cursor-pointer text-xs font-black uppercase tracking-widest">Privacy</span>
            <span className="text-slate-400 hover:text-slate-900 transition cursor-pointer text-xs font-black uppercase tracking-widest">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
