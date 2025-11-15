import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const navItem =
    "px-4 py-2 rounded-lg hover:bg-gray-100 transition text-sm font-medium";

  const activeStyle =
    "px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium";

  return (
    <header className="w-full shadow-sm bg-white">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        {/* 로고/홈 이동 */}
        <Link to="/" className="text-xl font-semibold text-blue-600">
          Church Attendance
        </Link>

        {/* 메뉴 */}
        <nav className="flex gap-3">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? activeStyle : navItem)}
          >
            홈
          </NavLink>

          <NavLink
            to="/attendance"
            className={({ isActive }) => (isActive ? activeStyle : navItem)}
          >
            출석 관리
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) => (isActive ? activeStyle : navItem)}
          >
            교인 등록
          </NavLink>
        
          
          <NavLink
            to="/weekly-report"
            className={({ isActive }) => (isActive ? activeStyle : navItem)}
          >
            주차 보고서 작성
          </NavLink>


          <NavLink
            to="/stats"
            className={({ isActive }) => (isActive ? activeStyle : navItem)}
          >
            통계
          </NavLink>

        </nav>
      </div>
    </header>
  );
}
