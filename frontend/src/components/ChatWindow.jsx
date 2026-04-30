import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatWindow({ messages, loading }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 h-[600px] flex flex-col card-shadow">
      <div className="flex items-center gap-3 border-b border-slate-50 pb-4 mb-4">
        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-xl">
          🤖
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Study Assistant</h3>
          <p className="text-xs text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-1">
             <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
             AI Online
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-10">
            <div className="text-5xl mb-4 opacity-20">💬</div>
            <h4 className="text-slate-900 font-bold text-lg mb-2">No messages yet</h4>
            <p className="text-slate-400 text-sm font-medium">
              Ask a question about your uploaded documents to start a conversation!
            </p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[85%] px-5 py-4 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100 rounded-tr-none"
                    : "bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-none shadow-sm"
                }`}
              >
                {/* 📄 Source */}
                {msg.sender === "ai" && msg.source && (
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-500 mb-3 uppercase tracking-wider bg-indigo-50/50 px-2 py-1 rounded-lg w-fit">
                    <span className="text-xs">📄</span> Source: {msg.source}
                  </div>
                )}

                {/* 💬 Message */}
                {msg.sender === "ai" ? (
                  <div
                    className="prose prose-slate prose-sm max-w-none text-[15px] leading-7
                               prose-p:my-3 prose-p:leading-7
                               prose-headings:font-extrabold prose-headings:text-slate-950
                               prose-h2:mt-6 prose-h2:mb-3 prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-2
                               prose-h3:mt-5 prose-h3:mb-2
                               prose-ul:my-4 prose-ol:my-4 prose-li:my-1.5
                               prose-hr:my-6 prose-hr:border-slate-200
                               prose-strong:text-indigo-700
                               prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-1 prose-code:rounded"
                  >
                    {msg.text ? (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          table: ({ children }) => (
                            <div className="overflow-x-auto my-5 rounded-xl border border-slate-200 bg-white">
                              <table className="table-auto w-full text-left">
                                {children}
                              </table>
                            </div>
                          ),
                          thead: ({ children }) => (
                            <thead className="bg-slate-100/70">
                              {children}
                            </thead>
                          ),
                          th: ({ children }) => (
                            <th className="px-4 py-3 text-slate-900 font-bold border-b border-slate-200">
                              {children}
                            </th>
                          ),
                          td: ({ children }) => (
                            <td className="px-4 py-3 border-b border-slate-100 align-top">
                              {children}
                            </td>
                          ),
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    ) : (
                      <div className="flex items-center gap-1.5 py-1">
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    )}
                    {msg.isStreaming && msg.text && (
                      <span className="inline-block w-2 h-4 ml-1 align-[-2px] bg-indigo-500 rounded-sm animate-pulse"></span>
                    )}
                  </div>
                ) : (
                  <p className="font-medium">{msg.text}</p>
                )}
              </div>
              <span className="text-[10px] text-slate-400 font-bold mt-1.5 px-1 uppercase tracking-tighter">
                {msg.sender === "user" ? "You" : "CourseMate AI"}
              </span>
            </div>
          ))
        )}

        {/* ⏳ Loading dots */}
        {loading && (
          <div className="flex flex-col items-start gap-1">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-none px-5 py-4 flex gap-1.5 items-center">
              <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
