import { Paper, Typography } from "@mui/material";

export default function TaskCard({ task }) {
  return (
    <Paper elevation={0} className="dashboard-task-card">
      <Typography className="dashboard-item-subtext">
        {task.moduleLabel}
      </Typography>

      <Typography className="dashboard-item-title dashboard-task-title">
        {task.title}
      </Typography>

      <Typography className="dashboard-item-subtext">
        {task.statusLabel}
      </Typography>
    </Paper>
  );
}