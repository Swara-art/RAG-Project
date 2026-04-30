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

export async function streamChatAnswer(query, onChunk) {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${API_BASE_URL}/chat/ask/stream?query=${encodeURIComponent(query)}`,
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
}

export default API;
