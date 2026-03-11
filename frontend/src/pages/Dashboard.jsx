import { useEffect, useMemo, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";

import { getModules, getExams, getAssignments, getTasks } from "../api/api";

import DashboardStats from "../components/dashcards/DashboardStats";
import ExamCard from "../components/dashcards/ExamCard";
import AssignmentCard from "../components/dashcards/AssignmentCard";
import TaskCard from "../components/dashcards/TaskCard";

import "../styles/Layout.css";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [modules, setModules] = useState([]);
  const [exams, setExams] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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
        console.error("Dashboard load error:", err);
      }
    };

    fetchData();
  }, []);

  const now = new Date();

  const getModuleLabel = (item) =>
    item.module_code || item.module_name || "Unknown Module";

  const stats = useMemo(() => {
    const upcomingExams = exams.filter(
      (e) => new Date(e.exam_date) >= now
    ).length;

    const submitted = assignments.filter(
      (a) => a.status === "S" || a.status === "G"
    ).length;

    const progress =
      assignments.length > 0
        ? Math.round((submitted / assignments.length) * 100)
        : 0;

    const completedTasks = tasks.filter((t) => t.is_completed).length;

    return {
      totalModules: modules.length,
      upcomingExams,
      assignmentProgress: progress,
      completedTasks,
      totalTasks: tasks.length,
    };
  }, [modules, exams, assignments, tasks]);

  const upcomingExamItems = exams
    .filter((e) => new Date(e.exam_date) >= now)
    .slice(0, 5)
    .map((exam) => {
      const examDate = new Date(exam.exam_date);

      const daysLeft = Math.ceil(
        (examDate - now) / (1000 * 60 * 60 * 24)
      );

      return {
        id: exam.id,
        moduleLabel: getModuleLabel(exam),
        dateLabel: examDate.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        countdownLabel: daysLeft === 0 ? "Today" : `${daysLeft}d`,
      };
    });

  const pendingAssignmentItems = assignments
    .filter((a) => a.status !== "S" && a.status !== "G")
    .slice(0, 5)
    .map((a) => {
      const dueDate = new Date(a.due_date);
      const overdue = dueDate < now;

      return {
        id: a.id,
        moduleLabel: getModuleLabel(a),
        title: a.title,
        dueLabel: overdue
          ? "Overdue"
          : dueDate.toLocaleDateString("en-GB"),
        isOverdue: overdue,
      };
    });

  const taskItems = tasks.slice(0, 6).map((task) => ({
    id: task.id,
    moduleLabel: getModuleLabel(task),
    title: task.title,
    statusLabel: task.is_completed ? "Completed" : "Pending",
  }));

  return (
    <Box className="dashboard-page">
      <DashboardStats {...stats} />

      <Box className="dashboard-sections">
        <Box className="dashboard-top-grid">
          <Paper elevation={0} className="dashboard-panel">
            <Typography variant="h6">Upcoming Exams</Typography>

            {upcomingExamItems.length === 0 ? (
              <Box className="dashboard-empty-state">
                <CalendarTodayOutlinedIcon />
                <Typography>No upcoming exams</Typography>
              </Box>
            ) : (
              upcomingExamItems.map((exam) => (
                <ExamCard key={exam.id} exam={exam} />
              ))
            )}
          </Paper>

          <Paper elevation={0} className="dashboard-panel">
            <Typography variant="h6">Pending Assignments</Typography>

            {pendingAssignmentItems.length === 0 ? (
              <Box className="dashboard-empty-state">
                <CheckCircleOutlineOutlinedIcon />
                <Typography>No pending assignments</Typography>
              </Box>
            ) : (
              pendingAssignmentItems.map((assignment) => (
                <AssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                />
              ))
            )}
          </Paper>
        </Box>

        <Paper elevation={0} className="dashboard-panel">
          <Typography variant="h6">Today's Study Tasks</Typography>

          {taskItems.length === 0 ? (
            <Box className="dashboard-empty-state">
              <TrendingUpOutlinedIcon />
              <Typography>No study tasks</Typography>
            </Box>
          ) : (
            <Box className="dashboard-task-grid">
              {taskItems.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}