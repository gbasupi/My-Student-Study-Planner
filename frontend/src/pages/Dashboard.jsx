import { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import { getModules, getExams, getAssignments, getTasks } from "../api/api";
import "../styles/Layout.css";
import "../styles/Dashboard.css";

function StatCard({ title, value, icon, colorClass }) {
  return (
    <Paper elevation={0} className="dashboard-stat-card">
      <Box className="dashboard-stat-content">
        <Typography className="dashboard-stat-title">{title}</Typography>
        <Typography className="dashboard-stat-value">{value}</Typography>
      </Box>

      <Box className={`dashboard-stat-icon ${colorClass}`}>
        {icon}
      </Box>
    </Paper>
  );
}

export default function Dashboard() {
  const [modules, setModules] = useState([]);
  const [exams, setExams] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [m, e, a, t] = await Promise.all([
          getModules(),
          getExams(),
          getAssignments(),
          getTasks(),
        ]);
        setModules(m || []);
        setExams(e || []);
        setAssignments(a || []);
        setTasks(t || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };

    fetchAll();
  }, []);

  const now = new Date();

  const upcomingExams = exams.filter((e) => new Date(e.exam_date) >= now).length;
  const submittedOrGraded = assignments.filter(
    (a) => a.status === "S" || a.status === "G"
  ).length;

  const assignmentProgress =
    assignments.length > 0
      ? Math.round((submittedOrGraded / assignments.length) * 100)
      : 0;

  const completedTasks = tasks.filter((t) => t.is_completed).length;

  return (
    <Box className="dashboard-page">
      <Box className="dashboard-stats-row">
        <Box className="dashboard-stats-item">
          <StatCard
            title="Total Subjects"
            value={modules.length}
            colorClass="purple"
            icon={<CalendarTodayOutlinedIcon />}
          />
        </Box>

        <Box className="dashboard-stats-item">
          <StatCard
            title="Upcoming Exams"
            value={upcomingExams}
            colorClass="red"
            icon={<ErrorOutlineOutlinedIcon />}
          />
        </Box>

        <Box className="dashboard-stats-item">
          <StatCard
            title="Assignment Progress"
            value={`${assignmentProgress}%`}
            colorClass="green"
            icon={<CheckCircleOutlineOutlinedIcon />}
          />
        </Box>

        <Box className="dashboard-stats-item">
          <StatCard
            title="Study Tasks Done"
            value={`${completedTasks}/${tasks.length}`}
            colorClass="blue"
            icon={<TrendingUpOutlinedIcon />}
          />
        </Box>
      </Box>
    </Box>
  );
}