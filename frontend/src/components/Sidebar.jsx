import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "My Documents", path: "/documents" },
    { name: "Chat History", path: "/history" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#0d0d0d] border-r border-gray-900 px-5 py-6 hidden md:block">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-lime-400">CourseMate AI</h1>
        <p className="text-sm text-gray-500 mt-1">
          Study smarter with AI
        </p>
      </div>

      <nav className="space-y-3">
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-lime-400 text-black"
                  : "text-gray-300 hover:bg-[#171717] hover:text-white"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="mt-10 p-4 rounded-xl bg-[#121212] border border-gray-800">
        <p className="text-sm text-gray-400">
          Upload PDFs and chat with your notes instantly.
        </p>
      </div>
    </aside>
  );
}