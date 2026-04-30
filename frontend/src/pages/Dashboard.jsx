import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import UploadBox from "../components/UploadBox";
import FileList from "../components/FileList";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import API from "../services/api";

import { useEffect, useState } from "react";


export default function Dashboard() {

  const [messages, setMessages] = useState([]);
  const [files, setFiles] = useState([]);
  const [chatSessions, setChatSessions] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  const loadDocuments = async () => {
    try {
      const res = await API.get("/documents/");
      setFiles(res.data);
    } catch (err) {
      console.error("Unable to load documents:", err);
    }
  };

  const loadChatSessions = async () => {
    try {
      const res = await API.get("/chat/sessions");
      setChatSessions(res.data);
    } catch (err) {
      console.error("Unable to load chat history:", err);
    }
  };

  const handleSelectChat = async (sessionId) => {
    try {
      const res = await API.get(`/chat/sessions/${sessionId}`);
      setActiveChatId(res.data.id);
      setMessages(res.data.messages);
    } catch (err) {
      console.error("Unable to load chat:", err);
    }
  };

  const handleNewChat = () => {
    setActiveChatId(null);
    setMessages([]);
  };

  useEffect(() => {
    loadDocuments();
    loadChatSessions();
  }, []);

  return (
    <div className="bg-[#FBFCFE] text-slate-900 min-h-screen flex">
      <Sidebar
        chatSessions={chatSessions}
        activeChatId={activeChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <DashboardHeader />

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8">
            
            {/* Left Column: Tools */}
            <div id="documents" className="xl:col-span-4 space-y-8 scroll-mt-8">
              <UploadBox setFiles={setFiles} />
              <FileList files={files} />
              
            </div>

            {/* Right Column: Chat */}
            <div className="xl:col-span-8 flex flex-col gap-6">
              <ChatWindow messages={messages} />
              <ChatInput
                activeChatId={activeChatId}
                setActiveChatId={setActiveChatId}
                setMessages={setMessages}
                refreshChatSessions={loadChatSessions}
              />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
