import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL;

// -------------------- GET: 멤버 전체 조회 --------------------
export async function getMembers() {
  const res = await axios.get(`${API_URL}/api/members`);
  return res.data;
}

// -------------------- POST: 멤버 추가 --------------------
export async function addMember(memberData) {
  const res = await axios.post(`${API_URL}/api/members`, memberData, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
}

// -------------------- PUT: 멤버 정보 수정 --------------------
export async function updateMember(id, updateData) {
  const res = await axios.put(`${API_URL}/api/members/${id}`, updateData, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
}

// -------------------- DELETE: 멤버 삭제 --------------------
export async function deleteMember(id) {
  const res = await axios.delete(`${API_URL}/api/members/${id}`);
  return res.data;
}
