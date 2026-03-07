/**
 * MainLayout
 * Shared application layout for authenticated pages.
 * Includes header, navigation tabs, welcome banner
 */
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Link, Outlet, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/", icon: <DashboardRoundedIcon /> },
  { label: "Modules", path: "/modules", icon: <MenuBookRoundedIcon /> },
  { label: "Exams", path: "/exams", icon: <EventNoteRoundedIcon /> },
  { label: "Assignments", path: "/assignments", icon: <AssignmentRoundedIcon /> },
  { label: "Study Tasks", path: "/tasks", icon: <RadioButtonUncheckedRoundedIcon /> },
];

function isActivePath(currentPath, itemPath) {
  if (itemPath === "/") {
    return currentPath === "/";
  }
  return currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);
}

function NavPill({ icon, label, to, active }) {
  return (
    <Button
      component={Link}
      to={to}
      startIcon={icon}
      variant={active ? "contained" : "text"}
      disableElevation
      sx={{
        px: 2.25,
        py: 1.2,
        minWidth: 150,
        justifyContent: "flex-start",
        borderRadius: 3,
        textTransform: "none",
        fontWeight: 700,
        fontSize: 15,
        color: active ? "common.white" : "#667085",
        bgcolor: active ? "#3b82f6" : "transparent",
        boxShadow: "none",
        "&:hover": {
          bgcolor: active ? "#2f73e8" : "rgba(59, 130, 246, 0.06)",
        },
      }}
    >
      {label}
    </Button>
  );
}

export default function MainLayout({ user, onLogout }) {
  const location = useLocation();

  const fullName = `${user?.first_name || ""} ${user?.last_name || ""}`.trim();

const displayName =
  fullName || user?.username?.trim() || "Student";

  const displayEmail = user?.email || "";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: "#f5f7fb",
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        color="transparent"
        sx={{
          bgcolor: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 70,
            px: { xs: 2, md: 4 },
            justifyContent: "space-between",
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              component="img"
              src="/logo.webp"
              alt="Student Study Planner logo"
              sx={{
                width: 60,
                height: 60,
                objectFit: "contain",
              }}
            />

            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                letterSpacing: -0.3,
                color: "#1f2937",
                fontSize: { xs: 20, md: 22 },
              }}
            >
              Student Study Planner
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <Typography
              sx={{
                color: "#667085",
                fontWeight: 600,
                display: { xs: "none", md: "block" },
              }}
            >
              {displayEmail}
            </Typography>

            <Button
              variant="outlined"
              startIcon={<LogoutRoundedIcon />}
              onClick={onLogout}
              sx={{
                borderRadius: 3,
                textTransform: "none",
                px: 2,
                py: 0.9,
                fontWeight: 700,
                color: "#344054",
                borderColor: "#d0d5dd",
                bgcolor: "#fff",
                "&:hover": {
                  borderColor: "#98a2b3",
                  bgcolor: "#f9fafb",
                },
              }}
            >
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: 1.1,
            borderRadius: 4,
            border: "1px solid #e5e7eb",
            bgcolor: "#ffffff",
            overflowX: "auto",
            mb: 3,
          }}
        >
          <Stack direction="row" spacing={1.2} sx={{ minWidth: "max-content" }}>
            {navItems.map((item) => (
              <NavPill
                key={item.label}
                icon={item.icon}
                label={item.label}
                to={item.path}
                active={isActivePath(location.pathname, item.path)}
              />
            ))}
          </Stack>
        </Paper>

        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            background: "linear-gradient(90deg, #2451d6 0%, #3b82f6 68%, #5b96f3 100%)",
            color: "common.white",
            position: "relative",
            minHeight: 190,
            mb: 3,
            "&::after": {
              content: '""',
              position: "absolute",
              right: -70,
              top: -20,
              width: 310,
              height: 310,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
            },
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 5 }, position: "relative", zIndex: 1 }}>
            <Typography
              sx={{
                fontSize: { xs: 34, md: 42 },
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: -0.8,
                mb: 2,
              }}
            >
              Welcome back!
            </Typography>

            <Typography sx={{ fontSize: 18, opacity: 0.95, fontWeight: 500 }}>
              {displayName}
            </Typography>
          </CardContent>
        </Card>

        <Outlet />
      </Box>
    </Box>
  );
}