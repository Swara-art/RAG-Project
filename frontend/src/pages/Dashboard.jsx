import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import UploadBox from "../components/UploadBox";
import FileList from "../components/FileList";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

import { useState } from "react";


export default function Dashboard() {

  // ✅ FIX: move here
  const [messages, setMessages] = useState([]);
  const [files, setFiles] = useState([]);

  return (
    <div className="bg-black text-white min-h-screen flex">
      <Sidebar />

      <main className="flex-1">
        <DashboardHeader />

        <div className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-1 space-y-6">
            <UploadBox setFiles={setFiles} />
            <FileList files={files} />
          </div>

          <div className="xl:col-span-2 space-y-4">
            <ChatWindow messages={messages} />
            <ChatInput setMessages={setMessages} />
          </div>
        </div>
      </main>
    </div>
  );
}