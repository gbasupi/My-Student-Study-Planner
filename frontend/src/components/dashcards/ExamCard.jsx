import { Box, Paper, Typography } from "@mui/material";

export default function ExamCard({ exam }) {
  return (
    <Paper elevation={0} className="dashboard-item-card">
      <Box className="dashboard-item-row">
        <Box>
          <Typography className="dashboard-item-title">
            {exam.moduleLabel}
          </Typography>

          <Typography className="dashboard-item-subtext dashboard-date-text">
            {exam.dateLabel}
          </Typography>
        </Box>

        <Box className="dashboard-item-right">
          <Typography className="dashboard-countdown">
            {exam.countdownLabel}
          </Typography>

          <Typography className="dashboard-item-subtext">
            remaining
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}