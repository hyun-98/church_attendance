import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function WeeklyReport() {
  const { id } = useParams(); // memberId
  const [reports, setReports] = useState([]);
  const [member, setMember] = useState({});
  const navigate = useNavigate();
  
  const API_URL = import.meta.env.VITE_API_URL; // ✅ Vite 환경변수

  const handleDelete = async (reportId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await axios.delete(`${API_URL}/api/reports/${reportId}`);
      setReports(prev => prev.filter(r => r.id !== reportId));
    } catch (err) {
      console.error(err);
      alert("삭제 실패!");
    }
  };

    const handleEdit = (report) => {
      navigate(`/reports/edit/${report.id}`, { state: { report } });
    };

  useEffect(() => {
    // 교인 정보 가져오기
    axios.get(`${API_URL}/api/members/${id}`)
      .then(res => setMember(res.data))
      .catch(err => console.error(err));

    // 해당 교인 보고서 가져오기
    axios.get(`${API_URL}/api/reports/member/${id}`)
      .then(res => setReports(res.data))
      .catch(err => console.error(err));
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          📄 {member.name} 주차보고서
        </h1>

        <div className="grid grid-cols-1 gap-6">
          {reports.map(report => (
            <div key={report.id} className="bg-white rounded-xl shadow-lg p-5 transition hover:scale-105 relative">
              
              {/* 기존 내용 */}
              <div className="flex justify-between mb-3">
                <span className="font-semibold text-gray-600">{report.week}</span>
                <span className="text-gray-400 text-sm">{report.createdAt}</span>
              </div>
              <div className="mb-2">
                <span className="font-medium">담당 리더: </span>
                {report.leader}
              </div>
              <p className="text-gray-700 whitespace-pre-line">{report.content}</p>

              {/* 편집/삭제 버튼 */}
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
                  onClick={() => handleEdit(report)}
                >
                  수정
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                  onClick={() => handleDelete(report.id)}
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>

        {reports.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            아직 작성된 보고서가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
