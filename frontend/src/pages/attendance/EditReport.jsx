import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditReport() {
  const { id } = useParams(); // report id
  const navigate = useNavigate();
  const location = useLocation();

  // WeeklyReport에서 state로 전달된 report 정보
  const report = location.state?.report || {};

  const [content, setContent] = useState(report.content || "");
  const [leader, setLeader] = useState(report.leader || "");
  const [week, setWeek] = useState(report.week || "");

  const API_URL = import.meta.env.VITE_API_URL;

  // 만약 navigate로 state 없이 직접 들어오는 경우
  useEffect(() => {
    if (!report.id) {
      axios.get(`${API_URL}/api/reports/${id}`)
        .then(res => {
          const r = res.data;
          setContent(r.content || "");
          setLeader(r.leader || "");
          setWeek(r.week || "");
        })
        .catch(err => console.error(err));
    }
  }, [id, report.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/api/reports/${id}`, {
        content,
        leader,
        week
      });
      alert("수정 완료!");
      navigate(-1, { replace: true }); // 이전 페이지(WeeklyReport)로 돌아가기
    } catch (err) {
      console.error(err);
      alert("수정 실패!");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">주차보고서 수정</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="font-medium mb-1 block">주차</label>
            <input
              type="text"
              value={week}
              onChange={(e) => setWeek(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="font-medium mb-1 block">담당 리더</label>
            <input
              type="text"
              value={leader}
              onChange={(e) => setLeader(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="font-medium mb-1 block">내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              저장
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
