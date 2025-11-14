import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Attendance() {
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/members");
      setMembers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">

        {/* 헤더 */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">📋 출석부 관리</h1>
          <Link
            to="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            교인 등록 +
          </Link>
        </div>

        {/* 테이블 */}
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-3 border text-left">사진</th>
                <th className="p-3 border text-left">이름</th>
                <th className="p-3 border text-left">또래</th>
                <th className="p-3 border text-left">등록일</th>
                <th className="p-3 border text-center">주차보고서</th>
                <th className="p-3 border text-center">목장편성</th>
              </tr>
            </thead>

            <tbody>
              {members.map((member) => (
                <tr key={member.id} className="text-center border-b hover:bg-gray-50">

                  {/* 사진 */}
                  <td className="p-3 border text-left">
                    <img
                      src={member.photoUrl || "/default-profile.png"}
                      alt="profile"
                      className="w-14 h-14 rounded-full mx-auto md:mx-0 object-cover border"
                    />
                  </td>

                  {/* 이름 */}
                  <td className="p-3 border text-left font-medium text-gray-800">
                    {member.name}
                  </td>

                  {/* 또래 */}
                  <td className="p-3 border text-left text-gray-600">
                    {member.ageGroup || "-"}
                  </td>

                  {/* 등록일 */}
                  <td className="p-3 border text-left text-gray-600">
                    {member.registeredAt || "-"}
                  </td>

                  {/* 주차보고서 */}
                  <td className="p-3 border text-center">
                    <Link
                      to={`/weekly-report/${member.id}`}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                    >
                      확인 / 작성
                    </Link>
                  </td>

                  {/* 목장편성 */}
                  <td className="p-3 border text-center">
                    <button className="bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600 transition">
                      편성
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
