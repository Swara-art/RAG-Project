export default function FileList({ files }) {
  return (
    <div className="bg-[#111] border border-gray-900 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Uploaded Files</h3>

      <div className="space-y-3">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-[#181818] border border-gray-800 rounded-xl px-4 py-3"
          >
            <div>
              <p className="text-white text-sm">{file}</p>
              <p className="text-xs text-gray-500">Ready for chat</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}