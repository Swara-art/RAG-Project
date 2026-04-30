import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

const API_BASE_URL = "http://127.0.0.1:8000";

// Add a request interceptor to include the JWT token in headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function streamChatAnswer(query, onChunk, sessionId) {
  const token = localStorage.getItem("token");
  const params = new URLSearchParams({ query });
  if (sessionId) {
    params.set("session_id", sessionId);
  }

  const response = await fetch(
    `${API_BASE_URL}/chat/ask/stream?${params.toString()}`,
    {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }
  );

  if (!response.ok || !response.body) {
    throw new Error("Unable to stream answer");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();

    if (done) {
      break;
    }

    onChunk(decoder.decode(value, { stream: true }));
  }

  const finalChunk = decoder.decode();
  if (finalChunk) {
    onChunk(finalChunk);
  }

  return response.headers.get("X-Chat-Session-Id");
}

export default API;
