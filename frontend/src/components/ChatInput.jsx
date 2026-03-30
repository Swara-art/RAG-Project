import { useState } from "react"; 
import API from "../services/api";

export default function ChatInput({ setMessages }) {

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
      if (!input) return;

      setMessages((prev) => [
        ...prev,
        { sender: "user", text: input },
      ]);

      setLoading(true);

      try {
        const res = await API.post("/chat/ask", null, {
          params: { query: input },
        });

        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: res.data.answer,
            source: res.data.source,   // ✅ ADD THIS
          },
        ]);
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
      setInput("");
    };

  return (
    <div className="bg-[#111] border border-gray-900 rounded-2xl p-4 flex items-center gap-3">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 bg-transparent outline-none text-white"
        placeholder="Ask something..."
      />



      <button
        onClick={handleSend}
        className="bg-lime-400 px-5 py-2 rounded-lg"
      >
        Send
      </button>
    </div>
  );
}