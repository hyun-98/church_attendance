import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ReportCreate() {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [report, setReport] = useState({
    week: "",
    createdAt: "",
    leader: "",
    content: "",
  });

  const navigate = useNavigate();
  
  const API_URL = import.meta.env.VITE_API_URL; // ✅ Vite 환경변수

  useEffect(() => {
    axios.get(`${API_URL}/api/members`)
      .then(res => setMembers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setReport({ ...report, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!selectedMember) return alert("교인을 선택해주세요");
    if (!report.createdAt) report.createdAt = new Date().toISOString().split("T")[0];

    try {
      await axios.post(`${API_URL}/api/reports`, {
        ...report,
        memberId: parseInt(selectedMember),
      });
      alert("보고서 저장 완료!");
      navigate(`/weekly-report/${selectedMember}`);
    } catch (err) {
      console.error(err);
      alert("저장 실패");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">📄 주차보고서 작성</h1>

        <div className="mb-4">
          <label className="block mb-1 font-medium">교인 선택</label>
          <select
            value={selectedMember}
            onChange={e => setSelectedMember(e.target.value)}
            className="w-full border p-2 rounded-lg"
          >
            <option value="">교인을 선택하세요</option>
            {members.map(member => (
              <option key={member.id} value={member.id}>
                {member.name} ({member.ageGroup})
              </option>
            ))}
          </select>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-1 font-medium">몇 주차</label>
            <select
              name="week"
              value={report.week}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
              required
            >
              <option value="">선택</option>
              <option value="1주차">1주차</option>
              <option value="2주차">2주차</option>
              <option value="3주차">3주차</option>
              <option value="4주차">4주차</option>
              <option value="5주차">5주차</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">작성 날짜</label>
            <input
              type="date"
              name="createdAt"
              value={report.createdAt}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">담당 리더</label>
            <input
              type="text"
              name="leader"
              value={report.leader}
              onChange={handleChange}
              placeholder="담당 리더 이름"
              className="w-full border p-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">보고서 내용</label>
            <textarea
              name="content"
              value={report.content}
              onChange={handleChange}
              placeholder="보고서 내용을 작성하세요"
              className="w-full border p-2 rounded-lg h-40"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg font-semibold"
          >
            작성 완료
          </button>
        </form>
      </div>
    </div>
  );
}
