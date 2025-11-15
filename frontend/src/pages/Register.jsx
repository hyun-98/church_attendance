import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    birthDate: "",
    phone: "",
    ageGroup: "",       // 또래 추가
    hasAttended: false,
    registeredAt: "",
    photo: null,        // 사진 파일
  });
  const [preview, setPreview] = useState(null); // 사진 미리보기

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setForm(prev => ({ ...prev, photo: file }));
      setPreview(file ? URL.createObjectURL(file) : null);
    } else {
      setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("이름을 입력해주세요!");

    if (!form.registeredAt) {
      form.registeredAt = new Date().toISOString().split("T")[0]; // yyyy-MM-dd
    }

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("birthDate", form.birthDate);
      formData.append("phone", form.phone);
      formData.append("ageGroup", form.ageGroup);   // 또래 추가
      formData.append("hasAttended", form.hasAttended);
      formData.append("registeredAt", form.registeredAt);
      if (form.photo) formData.append("photo", form.photo);

      await axios.post("http://localhost:8080/api/members", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("등록 완료!");
      navigate("/attendance");
    } catch (err) {
      console.error(err);
      alert("등록 실패!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">📝 교인 등록</h2>

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
            <p className="text-gray-500 text-sm mt-1">앞자리가 0인 경우도 그대로 입력</p>
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
            {preview && (
              <img
                src={preview}
                alt="미리보기"
                className="mt-2 w-32 h-32 object-cover rounded-lg"
              />
            )}
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
          >
            등록하기
          </button>
        </form>
      </div>
    </div>
  );
}
