const steps = [
  {
    title: "Upload your PDFs",
    desc: "Add lecture notes, textbooks, or any study material.",
  },
  {
    title: "We process them",
    desc: "The system chunks, embeds, and indexes your documents automatically.",
  },
  {
    title: "Ask anything",
    desc: "Type a question in plain English and get a grounded answer instantly.",
  },
];

export default function HowItWorks() {
  const steps = [
    {
      title: "Drop your files",
      desc: "Upload lecture notes, PDFs, or textbooks. Our AI handles the heavy lifting of processing.",
      icon: "📁",
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Smart Indexing",
      desc: "We analyze every sentence, creating a neural map of your study materials instantly.",
      icon: "🧠",
      color: "bg-indigo-50 text-indigo-600"
    },
    {
      title: "Ask & Master",
      desc: "Ask complex questions and get grounded answers with direct citations from your own notes.",
      icon: "⚡",
      color: "bg-rose-50 text-rose-600"
    },
  ];

  return (
    <section className="py-32 px-6 md:px-10 relative overflow-hidden">
      
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-50/20 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            How it <span className="text-indigo-600">works</span>
          </h2>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Revolutionize your learning workflow in three simple steps. No more endless scrolling.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative group bg-white border border-slate-100 p-10 rounded-[3rem] shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 hover:-translate-y-3"
            >
              <div className={`w-20 h-20 ${step.color} rounded-3xl flex items-center justify-center text-4xl mb-10 group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                {step.icon}
              </div>

              <div className="flex items-center gap-4 mb-4">
                 <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600/40 bg-indigo-50 px-3 py-1 rounded-full">Step {i+1}</span>
              </div>

              <h4 className="text-2xl font-black text-slate-900 mb-4">{step.title}</h4>
              <p className="text-slate-500 font-medium leading-relaxed text-lg">
                {step.desc}
              </p>
              
              {/* Connector for desktop */}
              {i < 2 && (
                <div className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 z-20">
                   <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-200">
                     <path d="M1 10H39M39 10L30 1M39 10L30 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
