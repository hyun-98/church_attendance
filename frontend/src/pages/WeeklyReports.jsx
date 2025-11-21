import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios"; 

export default function WeeklyReport() {
  const { id } = useParams(); // memberId
  const [reports, setReports] = useState([]);
  const [member, setMember] = useState({});
  
  const API_URL = import.meta.env.VITE_API_URL; // ✅ Vite 환경변수

  useEffect(() => {
    // 교인 정보 가져오기
    api.get(`/api/members/${id}`)
      .then(res => setMember(res.data))
      .catch(err => console.error(err));

    // 해당 교인 보고서 가져오기
    api.get(`/api/reports/member/${id}`)
      .then(res => setReports(res.data))
      .catch(err => console.error(err));
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          📄 {member.name} 주차보고서
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map(report => (
            <div key={report.id} className="bg-white rounded-xl shadow-lg p-5 transition hover:scale-105">
              <div className="flex justify-between mb-3">
                <span className="font-semibold text-gray-600">{report.week}</span>
                <span className="text-gray-400 text-sm">{report.createdAt}</span>
              </div>
              <div className="mb-2">
                <span className="font-medium">담당 리더: </span>
                {report.leader}
              </div>
              <p className="text-gray-700 whitespace-pre-line">{report.content}</p>
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
