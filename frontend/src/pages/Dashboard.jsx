import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import UploadBox from "../components/UploadBox";
import FileList from "../components/FileList";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

import { useState } from "react";


export default function Dashboard() {

  const [messages, setMessages] = useState([]);
  const [files, setFiles] = useState([]);

  return (
    <div className="bg-[#FBFCFE] text-slate-900 min-h-screen flex">
      <Sidebar />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <DashboardHeader />

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8">
            
            {/* Left Column: Tools */}
            <div className="xl:col-span-4 space-y-8">
              <UploadBox setFiles={setFiles} />
              <FileList files={files} />
              
            </div>

            {/* Right Column: Chat */}
            <div className="xl:col-span-8 flex flex-col gap-6">
              <ChatWindow messages={messages} />
              <ChatInput setMessages={setMessages} />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}