import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center px-10 py-5 border-b border-gray-900 backdrop-blur-lg bg-black/40">

      <h1 className="text-xl font-semibold text-lime-400 tracking-wide">
        CourseMate AI
      </h1>

      <div className="flex gap-6 items-center">

        <button className="text-gray-400 hover:text-white transition">
          Login
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-lime-400 text-black px-5 py-2 rounded-lg font-semibold hover:shadow-[0_0_15px_rgba(132,204,22,0.6)] transition"
        >
          Get Started
        </button>

      </div>

    </div>
  );
}