import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const { id } = useParams(); // 수정 모드용

  const API_URL = import.meta.env.VITE_API_URL; // ✅ Vite 환경변수

  const [form, setForm] = useState({
    name: "",
    birthDate: "",
    phone: "",
    hasAttended: false,
    registeredAt: "",
    ageGroup: "",
    photo: null, // 새로 업로드한 파일
  });
  const [preview, setPreview] = useState(null); // 사진 미리보기
  const [existingPhoto, setExistingPhoto] = useState(null); // 기존 사진

  // 수정 모드일 경우 기존 데이터 불러오기
  useEffect(() => {
    if (id) {
      axios
        .get(`${API_URL}/api/members/${id}`)
        .then((res) => {
          const data = res.data;
          setForm({
            name: data.name || "",
            birthDate: data.birthDate || "",
            phone: data.phone || "",
            hasAttended: data.hasAttendedBefore || false,
            registeredAt: data.registeredAt || "",
            ageGroup: data.ageGroup || "",
            photo: null,
          });
          setExistingPhoto(data.photoUrl ? `${API_URL}${data.photoUrl}` : null);
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setForm((prev) => ({ ...prev, photo: file }));
      setPreview(file ? URL.createObjectURL(file) : null);
    } else {
      setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("이름을 입력해주세요!");

    if (!form.registeredAt) {
      form.registeredAt = new Date().toISOString().split("T")[0];
    }

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("birthDate", form.birthDate);
      formData.append("phone", form.phone);
      formData.append("hasAttended", form.hasAttended);
      formData.append("registeredAt", form.registeredAt);
      formData.append("ageGroup", form.ageGroup);
      if (form.photo) formData.append("photo", form.photo);

      let res;
      if (id) {
        // 수정
        res = await axios.put(`${API_URL}/api/members/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("수정 완료!");
      } else {
        // 새 등록
        res = await axios.post(`${API_URL}/api/members`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("등록 완료!");
      }

      // 수정/등록 완료 후 Attendance로 state 전달
      navigate("/attendance", { state: { updatedMember: res.data } });

    } catch (err) {
      console.error(err);
      alert("저장 실패!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          {id ? "✏️ 교인 정보 수정" : "📝 교인 등록"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 이름 */}
          <div>
            <label className="block font-medium mb-1">이름</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
              placeholder="이름 입력"
              required
            />
          </div>

          {/* 생년월일 */}
          <div>
            <label className="block font-medium mb-1">생년월일</label>
            <input
              type="date"
              name="birthDate"
              value={form.birthDate}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
            />
          </div>

          {/* 전화번호 */}
          <div>
            <label className="block font-medium mb-1">전화번호</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
              placeholder="010-0000-0000"
            />
          </div>

          {/* 또래 */}
          <div>
            <label className="block font-medium mb-1">또래</label>
            <input
              type="text"
              name="ageGroup"
              value={form.ageGroup}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
              placeholder="예: 01"
            />
          </div>

          {/* 교회 다닌 적 있음 */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="hasAttended"
              checked={form.hasAttended}
              onChange={handleChange}
              className="h-5 w-5 text-blue-500"
            />
            <label className="font-medium">교회 다닌 적 있음</label>
          </div>

          {/* 등록일자 */}
          <div>
            <label className="block font-medium mb-1">등록일자</label>
            <input
              type="date"
              name="registeredAt"
              value={form.registeredAt}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
            />
          </div>

          {/* 사진 업로드 */}
          <div>
            <label className="block font-medium mb-1">사진 업로드</label>
            <input
              type="file"
              accept="image/*"
              name="photo"
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
            {preview ? (
              <img
                src={preview}
                alt="미리보기"
                className="mt-2 w-32 h-32 object-cover rounded-lg"
              />
            ) : existingPhoto ? (
              <img
                src={existingPhoto}
                alt="기존 사진"
                className="mt-2 w-32 h-32 object-cover rounded-lg"
              />
            ) : null}
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
          >
            {id ? "수정하기" : "등록하기"}
          </button>
        </form>
      </div>
    </div>
  );
}
