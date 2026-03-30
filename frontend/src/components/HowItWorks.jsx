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
  return (
    <div className="mt-48 px-10 relative z-10">

      <h2 className="text-4xl font-bold mb-16 text-center">
        How it works
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {["Upload your PDFs", "We process them", "Ask anything"].map((title, i) => (
          <div
            key={i}
            className="bg-[#0f0f0f] border border-gray-800 p-8 rounded-2xl hover:border-lime-400/40 hover:shadow-[0_0_25px_rgba(132,204,22,0.1)] transition"
          >
            <h3 className="text-lime-400 text-4xl font-bold mb-4">
              {`0${i + 1}`}
            </h3>

            <h4 className="text-xl font-semibold">{title}</h4>

            <p className="text-gray-400 mt-3">
              Experience seamless AI-powered study assistance with fast and accurate results.
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}