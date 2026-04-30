export default function Sidebar({ chatSessions, activeChatId, onSelectChat, onNewChat }) {
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

      <nav className="space-y-6 flex-1 overflow-hidden">
        <div className="space-y-2">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium bg-indigo-50 text-indigo-700 shadow-sm">
            <span className="text-lg">📊</span>
            Dashboard
          </div>
          <a
            href="#documents"
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200"
          >
            <span className="text-lg">📄</span>
            My Documents
          </a>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex items-center justify-between px-4 mb-2">
            <div className="flex items-center gap-3 text-slate-500 font-medium">
              <span className="text-lg">💬</span>
              Chat History
            </div>
            <button
              onClick={onNewChat}
              className="w-7 h-7 rounded-lg bg-slate-100 text-slate-500 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
              title="New chat"
            >
              +
            </button>
          </div>

          <div className="space-y-1 overflow-y-auto pr-1 custom-scrollbar">
            {chatSessions.length === 0 ? (
              <p className="px-4 py-3 text-xs font-medium text-slate-400">
                Your previous chats will appear here.
              </p>
            ) : (
              chatSessions.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => onSelectChat(chat.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium truncate transition-all duration-200 ${
                    activeChatId === chat.id
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                  title={chat.title}
                >
                  {chat.title}
                </button>
              ))
            )}
          </div>
        </div>
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

