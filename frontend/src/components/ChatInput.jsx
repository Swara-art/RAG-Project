import { useState } from "react"; 
import { streamChatAnswer } from "../services/api";

export default function ChatInput({
  activeChatId,
  setActiveChatId,
  setMessages,
  refreshChatSessions,
}) {

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
      const question = input.trim();
      if (!question || loading) return;

      setMessages((prev) => [
        ...prev,
        { sender: "user", text: question },
        { sender: "ai", text: "", isStreaming: true },
      ]);

      setLoading(true);
      setInput("");

      try {
        const sessionId = await streamChatAnswer(question, (chunk) => {
          setMessages((prev) => {
            const next = [...prev];
            const streamingIndex = next.findLastIndex((msg) => msg.isStreaming);

            if (streamingIndex === -1) {
              return next;
            }

            next[streamingIndex] = {
              ...next[streamingIndex],
              text: `${next[streamingIndex].text}${chunk}`,
            };

            return next;
          });
        }, activeChatId);

        setMessages((prev) =>
          prev.map((msg) =>
            msg.isStreaming ? { ...msg, isStreaming: false } : msg
          )
        );

        if (sessionId) {
          setActiveChatId(Number(sessionId));
        }
        refreshChatSessions();
      } catch (err) {
        console.error(err);
        setMessages((prev) => {
          const next = [...prev];
          const streamingIndex = next.findLastIndex((msg) => msg.isStreaming);
          const errorMessage = {
            sender: "ai",
            text: "Sorry, I encountered an error. Please try again.",
            isStreaming: false,
          };

          if (streamingIndex === -1) {
            return [...next, errorMessage];
          }

          next[streamingIndex] = errorMessage;
          return next;
        });
      }

      setLoading(false);
    };

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-3 flex items-center gap-3 card-shadow focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-50 transition-all duration-300">
      <div className="pl-4">
         <span className="text-xl">✨</span>
      </div>
      <input
        value={input}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 bg-transparent outline-none text-slate-900 font-medium placeholder:text-slate-400 py-3"
        placeholder="Ask a question about your study materials..."
        disabled={loading}
      />

      <button
        onClick={handleSend}
        disabled={!input.trim() || loading}
        className={`px-6 py-3 rounded-2xl font-bold transition-all duration-200 flex items-center gap-2 ${
          !input.trim() || loading 
          ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
          : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100 active:scale-95"
        }`}
      >
        {loading ? "Thinking..." : "Ask AI"}
        {!loading && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        )}
      </button>
    </div>
  );
}
