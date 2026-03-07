/**
 * Routes.jsx
 * Handles all application routing
 */
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./MainLayout";

import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Dashboard from "../pages/Dashboard";

import Modules from "../views/Modules";
import Exams from "../views/Exams";
import Assignments from "../views/Assignments";
import StudyTasks from "../views/StudyTasks";

export default function AppRoutes({ token, user, onLogin, onLogout }) {
  return (
    <Routes>
      {token ? (
        <>
          <Route element={<MainLayout user={user} onLogout={onLogout} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/tasks" element={<StudyTasks />} />
          </Route>

          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/register" element={<Navigate to="/" replace />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </>
      )}

      <Route path="*" element={<Navigate to={token ? "/" : "/login"} replace />} />
    </Routes>
  );
}