import { Link } from "react-router-dom";

export default function Stats() {
  return (
    <div className="p-8">
      <Link to="/" className="text-blue-600 hover:underline">← 홈으로</Link>
      <h2 className="text-2xl font-semibold mt-4 mb-6">출석 통계</h2>
      <p>출석 현황 그래프나 통계를 시각화할 수 있는 영역입니다.</p>
    </div>
  );
}
