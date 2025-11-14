import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    birthDate: "",
    phone: "",
    hasAttended: false,
    registeredAt: "", // 추가
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("이름을 입력해주세요!");

    // 등록일자가 비어있으면 현재시간 넣기
    if (!form.registeredAt) {
      form.registeredAt = new Date().toISOString().split("T")[0]; // yyyy-MM-dd
    }


    try {
      await axios.post("http://localhost:8080/api/members", form);
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
