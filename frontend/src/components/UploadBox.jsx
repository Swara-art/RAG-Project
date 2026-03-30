import { useState } from "react";
import API from "../services/api";

export default function UploadBox({ setFiles }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files); // support multiple files
    if (!selectedFiles.length) return;

    setUploading(true);

    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append("file", file); // key MUST be "file"

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
    e.target.value = ""; // reset so same file can be re-uploaded
  };

  return (
    <div className="bg-[#111] border border-dashed border-gray-700 rounded-2xl p-8 text-center hover:border-lime-400/50 transition">
      <div className="text-4xl mb-4">📄</div>
      <h3 className="text-xl font-semibold text-white">Upload your PDFs</h3>
      <p className="text-gray-400 mt-2">
        Drag and drop your lecture notes, textbooks, or study materials here.
      </p>

      <div className="mt-6">
        <label className="inline-block bg-lime-400 text-black px-5 py-3 rounded-lg font-semibold cursor-pointer hover:scale-105 transition">
          {uploading ? "Uploading..." : "Choose Files"}
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
    </div>
  );
}