import { useState } from "react";
import API from "../services/api";

export default function UploadBox({ setFiles }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;

    setUploading(true);

    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await API.post("/documents/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Uploaded:", res.data);
        setFiles((prev) => [...prev, file.name]);
      } catch (err) {
        console.error("Upload error for", file.name, ":", err);
      }
    }

    setUploading(false);
    e.target.value = "";
  };

  return (
    <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-10 text-center hover:border-indigo-400 hover:bg-indigo-50/30 transition-all duration-300 group card-shadow">
      <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
        📚
      </div>
      <h3 className="text-xl font-bold text-slate-900">Upload Study Materials</h3>
      <p className="text-slate-500 mt-2 text-sm max-w-[200px] mx-auto font-medium leading-relaxed">
        Drag & drop your PDFs here or click to browse.
      </p>

      <div className="mt-8">
        <label className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all duration-200 cursor-pointer shadow-lg active:scale-95 ${
          uploading 
          ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
          : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100"
        }`}>
          {uploading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </>
          ) : (
            <>
              <span>Choose Files</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </>
          )}
          <input
            type="file"
            className="hidden"
            multiple
            accept=".pdf"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>
      <p className="mt-4 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Max 10MB per file</p>
    </div>
  );
}