export default function DashboardHeader() {
  return (
    <div className="flex items-center justify-between border-b border-gray-900 px-6 py-4">
      <div>
        <h2 className="text-2xl font-semibold text-white">Dashboard</h2>
        <p className="text-sm text-gray-500">
          Upload your study materials and start asking questions.
        </p>
      </div>

      <button className="bg-lime-400 text-black px-5 py-2 rounded-lg font-semibold hover:scale-105 transition">
        + New Chat
      </button>
    </div>
  );
}