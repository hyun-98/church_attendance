import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-4xl font-bold text-blue-700 mb-10">📖 교회 출석부</h1>

      <div className="grid gap-5 w-64">

        {/* 출석부 관리 */}
        <Link
          to="/attendance"
          className="bg-blue-500 hover:bg-blue-600 text-white text-center py-3 rounded-lg shadow-md transition"
        >
          출석부 관리
        </Link>

        
        {/* 교인 등록 */}
        <Link
          to="/register"
          className="bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-lg shadow-md transition"
        >
          교인 등록
        </Link>

        {/* 보고서 작성 */}
        <Link
          to="/report-create"
          className="bg-purple-500 hover:bg-purple-600 text-white text-center py-3 px-6 rounded-lg shadow-md transition"
        >
          보고서 작성
        </Link>

        {/* 출석 통계 */}
        <Link
          to="/stats"
          className="bg-indigo-500 hover:bg-indigo-500 text-white text-center py-3 rounded-lg shadow-md transition"
          >
          출석 통계
        </Link>

      </div>
    </div>
  );
}
