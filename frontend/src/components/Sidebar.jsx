import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "My Documents", path: "/documents", icon: "📄" },
    { name: "Chat History", path: "/history", icon: "💬" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-slate-100 px-6 py-8 hidden md:flex flex-col">
      <div className="mb-10 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-100">
          C
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-900 leading-none">CourseMate</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">Study Companion</p>
        </div>
      </div>

      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                isActive
                  ? "bg-indigo-50 text-indigo-700 shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">System Status</p>
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <p className="text-sm font-bold text-slate-900">All Systems Operational</p>
           </div>
        </div>
      </div>
    </aside>
  );
}
