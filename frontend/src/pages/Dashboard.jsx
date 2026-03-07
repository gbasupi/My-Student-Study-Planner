import { Paper, Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid #e5e7eb",
        bgcolor: "#fff",
      }}
    >
      <Typography>Dashboard content loading...</Typography>
    </Paper>
  );
}