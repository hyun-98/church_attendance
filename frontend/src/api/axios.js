import axios from "axios";

const baseURL =
  import.meta.env.MODE === "production"
    ? "https://church-attendance-backend.com" // 배포 서버 URL
    : "http://localhost:8080";               // 로컬 서버 URL

const api = axios.create({
  baseURL,
  withCredentials: true, // 쿠키/세션 전송 허용
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
