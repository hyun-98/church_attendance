import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Attendance from "./pages/Attendance";
import Register from "./pages/Register";
import Stats from "./pages/Stats";
import ReportCreate from "./pages/ReportCreate";
import WeeklyReport from "./pages/WeeklyReports";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/register" element={<Register />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/weekly-report" element={<ReportCreate />} />
        <Route path="/weekly-report/:id" element={<WeeklyReport />} />
      </Routes>
    </Router>
  );
}
