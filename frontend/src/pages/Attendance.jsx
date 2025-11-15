import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Attendance() {
  const [members, setMembers] = useState([]);
  const [previewImg, setPreviewImg] = useState(null); 
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const fetchMembers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/members");
      const formatted = res.data.map(m => ({
        ...m,
        registeredAt: m.registeredAt ? m.registeredAt.split("T")[0] : "-"
      }));
      setMembers(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const openModal = (imgUrl) => {
    setPreviewImg(imgUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setPreviewImg(null);
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/members/${id}`);
      fetchMembers(); // 삭제 후 리스트 갱신
    } catch (err) {
      console.error(err);
      alert("삭제 실패!");
    }
  };

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
                <th className="p-3 border text-center">관리</th>
              </tr>
            </thead>

            <tbody>
              {members.map(member => (
                <tr key={member.id} className="text-center border-b hover:bg-gray-50">
                  {/* 사진 */}
                  <td className="p-3 border text-left">
                    <img
                      src={member.photoUrl ? `http://localhost:8080${member.photoUrl}` : "/default-profile.png"}
                      alt={member.name}
                      onClick={() => member.photoUrl && openModal(`http://localhost:8080${member.photoUrl}`)}
                      className="w-14 h-14 rounded-full mx-auto md:mx-0 object-cover border cursor-pointer hover:opacity-80 transition"
                    />
                  </td>

                  {/* 이름 */}
                  <td className="p-3 border text-left font-medium text-gray-800">{member.name || "-"}</td>

                  {/* 또래 */}
                  <td className="p-3 border text-left text-gray-600">{member.ageGroup || "-"}</td>

                  {/* 등록일 */}
                  <td className="p-3 border text-left text-gray-600">{member.registeredAt}</td>

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

                  {/* 관리 버튼 */}
                  <td className="p-3 border text-center space-x-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
                      onClick={() => navigate(`/register/${member.id}`)}
                    >
                      수정
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                      onClick={() => handleDelete(member.id)}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* 이미지 미리보기 모달 */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <img
            src={previewImg}
            alt="미리보기"
            className="max-h-[80vh] max-w-[80vw] rounded-lg shadow-lg"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
