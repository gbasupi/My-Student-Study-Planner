import { Box, Paper, Typography } from "@mui/material";

export default function AssignmentCard({ assignment }) {
  return (
    <Paper
      elevation={0}
      className={`dashboard-item-card ${
        assignment.isOverdue ? "dashboard-item-card-overdue" : ""
      }`}
    >
      <Box className="dashboard-item-row">
        <Box>
          <Typography className="dashboard-item-subtext">
            {assignment.moduleLabel}
          </Typography>

          <Typography className="dashboard-item-title dashboard-item-title-spaced">
            {assignment.title}
          </Typography>
        </Box>

        <Box className="dashboard-item-right">
          <Typography
            className={
              assignment.isOverdue
                ? "dashboard-status-overdue"
                : "dashboard-status-normal"
            }
          >
            {assignment.dueLabel}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}