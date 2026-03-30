import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function Documents() {
  return <div className="text-white p-4">📄 Documents Page</div>;
}

function History() {
  return <div className="text-white p-4">🕘 Chat History</div>;
}

function Settings() {
  return <div className="text-white p-4">⚙️ Settings</div>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;