export default function FileList({ files }) {
  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900">Your Library</h3>
        <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-2.5 py-1 rounded-full border border-indigo-100">
          {files.length} {files.length === 1 ? 'File' : 'Files'}
        </span>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {files.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-slate-400 text-sm font-medium">No documents yet.</p>
          </div>
        ) : (
          files.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 hover:bg-white hover:border-indigo-200 transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                📄
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-slate-900 text-sm font-bold truncate">{file}</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Ready to analyze</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}