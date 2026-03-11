import { Box, Paper, Typography } from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";

function StatCard({ title, value, icon, colorClass }) {
  return (
    <Paper elevation={0} className="dashboard-stat-card">
      <Box className="dashboard-stat-content">
        <Typography className="dashboard-stat-title">
          {title}
        </Typography>

        <Typography className="dashboard-stat-value">
          {value}
        </Typography>
      </Box>

      <Box className={`dashboard-stat-icon ${colorClass}`}>
        {icon}
      </Box>
    </Paper>
  );
}

export default function DashboardStats({
  totalModules,
  upcomingExams,
  assignmentProgress,
  completedTasks,
  totalTasks,
}) {
  return (
    <Box className="dashboard-stats-row">
      <Box className="dashboard-stats-item">
        <StatCard
          title="TOTAL MODULES"
          value={totalModules}
          icon={<CalendarTodayOutlinedIcon />}
          colorClass="purple"
        />
      </Box>

      <Box className="dashboard-stats-item">
        <StatCard
          title="UPCOMING EXAMS"
          value={upcomingExams}
          icon={<ErrorOutlineOutlinedIcon />}
          colorClass="red"
        />
      </Box>

      <Box className="dashboard-stats-item">
        <StatCard
          title="ASSIGNMENT PROGRESS"
          value={`${assignmentProgress}%`}
          icon={<CheckCircleOutlineOutlinedIcon />}
          colorClass="green"
        />
      </Box>

      <Box className="dashboard-stats-item">
        <StatCard
          title="STUDY TASK DONE"
          value={`${completedTasks}/${totalTasks}`}
          icon={<TrendingUpOutlinedIcon />}
          colorClass="blue"
        />
      </Box>
    </Box>
  );
}