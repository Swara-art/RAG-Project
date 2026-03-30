import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

   return (
        <div className="text-center mt-36 px-6 relative z-10">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-lime-400/20 bg-lime-400/10 text-lime-300 px-5 py-1 rounded-full text-sm mb-8 backdrop-blur-md">
            <span className="w-2 h-2 bg-lime-400 rounded-full"></span>
            RAG-Powered Study Assistant
        </div>

        {/* Heading */}
        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight tracking-tight">
            Chat with your <br />
            <span className="text-lime-400 drop-shadow-[0_0_20px_rgba(132,204,22,0.5)]">
            study materials
            </span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            Stop scrolling through hundreds of pages. Upload your PDFs and ask
            questions — get accurate answers instantly powered by AI.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-10">

            <button
            onClick={() => navigate("/dashboard")}
            className="bg-lime-400 text-black px-7 py-3 rounded-xl font-semibold hover:scale-105 hover:shadow-[0_0_25px_rgba(132,204,22,0.6)] transition"
            >
            Get Started Free
            </button>

            <button className="border border-gray-700 px-7 py-3 rounded-xl hover:bg-gray-900 transition">
            Sign In
            </button>

        </div>

        </div>
    );
}