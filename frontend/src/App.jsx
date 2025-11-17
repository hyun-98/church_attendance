import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

import Home from "./pages/Home";
import Attendance from "./pages/Attendance";
import Register from "./pages/Register";
import Stats from "./pages/Stats";
import ReportCreate from "./pages/ReportCreate";
import WeeklyReport from "./pages/WeeklyReports";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attendance" element={<Attendance />} />
        {/* 등록용 */}
        <Route path="/register" element={<Register />} />
        {/* 수정용: id 파라미터 전달 */}
        <Route path="/register/:id" element={<Register />} />

        
        {/* 주차보고서 작성용 */}
        <Route path="/report-create" element={<ReportCreate />} />
        {/* 수정용: id 파라미터 전달 */}
        <Route path="/weekly-report/:id" element={<WeeklyReport />} />

        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  );
}
