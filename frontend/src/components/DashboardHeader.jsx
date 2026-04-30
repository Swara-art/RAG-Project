export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between border-b border-slate-100 px-8 py-6 bg-white/50 backdrop-blur-sm sticky top-0 z-40">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Welcome back, Student! 👋</h2>
        <p className="text-sm text-slate-500 font-medium">
          Ready to dive into your studies? Upload your materials below.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex flex-col items-end mr-4">
           <span className="text-sm font-bold text-slate-900">John Doe</span>
           <span className="text-xs text-indigo-600 font-semibold">Premium Student</span>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition active:scale-95 flex items-center gap-2">
          <span className="text-lg leading-none">+</span> New Study Session
        </button>
      </div>
    </header>
  );
}