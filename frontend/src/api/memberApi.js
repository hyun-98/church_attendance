import api from "./axios";

// 회원 목록 조회
export const fetchMembers = async () => {
  try {
    const res = await api.get("/members");
    return res.data;
  } catch (err) {
    console.error("회원 조회 실패:", err.response?.status, err.response?.data);
    throw err;
  }
};

// 회원 추가
export const addMember = async (member) => {
  try {
    const res = await api.post("/members", member);
    return res.data;
  } catch (err) {
    console.error("회원 추가 실패:", err.response?.status, err.response?.data);
    throw err;
  }
};
