import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatWindow({ messages, loading }) {
  return (
    <div className="bg-[#111] border border-gray-900 rounded-2xl p-6 h-[500px] flex flex-col">
      <h3 className="text-lg font-semibold text-white mb-4">
        Chat with Documents
      </h3>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
              msg.sender === "user"
                ? "ml-auto bg-lime-400 text-black"
                : "bg-[#1a1a1a] text-gray-200 border border-gray-800"
            }`}
          >

            {/* 📄 Source */}
            {msg.sender === "ai" && msg.source && (
              <div className="text-xs text-gray-400 mb-2">
                📄 Answer from{" "}
                <span className="text-lime-400">{msg.source}</span>
              </div>
            )}

            {/* 💬 Message */}
            {msg.sender === "ai" ? (
              <div
                className="prose prose-invert max-w-none
                           prose-p:my-2
                           prose-headings:mt-4 prose-headings:mb-2
                           prose-li:my-1
                           prose-hr:my-6"
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    table: ({ children }) => (
                      <table className="table-auto border border-gray-700 w-full my-4">
                        {children}
                      </table>
                    ),
                    th: ({ children }) => (
                      <th className="border border-gray-700 px-3 py-2 bg-gray-800 text-white text-left">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border border-gray-700 px-3 py-2 text-gray-200">
                        {children}
                      </td>
                    ),
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              </div>
            ) : (
              msg.text
            )}
          </div>
        ))}

        {/* ⏳ Loading dots */}
        {loading && (
          <div className="text-gray-400 text-sm flex gap-1 px-2">
            <span className="animate-bounce">.</span>
            <span className="animate-bounce delay-100">.</span>
            <span className="animate-bounce delay-200">.</span>
          </div>
        )}

      </div>
    </div>
  );
}