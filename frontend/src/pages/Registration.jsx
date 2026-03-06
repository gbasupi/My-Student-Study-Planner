// Registration page component with form validation and error handling
import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Divider,
  InputAdornment,
  Container,
} from "@mui/material";

import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
export default function Registration({ onGoLogin }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");

    if (!firstName.trim()) {
        setErr("Please enter your first name");
        return;
    }

        if (!lastName.trim()) {
        setErr("Please enter your last name");
        return;
    }

    if (!email.trim()) {
      setErr("Please enter your email");
      return;
    }

    if (!password.trim()) {
      setErr("Please enter your password");
      return;
    }

    if (!confirmPassword.trim()) {
      setErr("Please confirm your password");
      return;
    }

    if (password !== confirmPassword) {
      setErr("Passwords do not match");
      return;
    }

    setLoading(true);

  };

  return (
    <Box sx={{ width: "100%" }}>
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(255,255,255,0.9)",
          }}
        >
          <Box sx={{ p: 4, bgcolor: "#111827", color: "white" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <SchoolRoundedIcon sx={{ fontSize: 36 }} />
              <Box>
                <Typography variant="h5" fontWeight={700}>
                  My Student Study Planner
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ p: 4, display: "flex", flexDirection: "column", gap: 3 }}
          >
            <Typography variant="h6" fontWeight={700}>
              Create account
            </Typography>

            {err && <Alert severity="error">{err}</Alert>}

            {/* Input fields with icons */}
            <TextField
              label="First Name"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Last Name"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Student Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ py: 1.5, textTransform: "none", fontWeight: 600 }}
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>

            <Divider>OR</Divider>

            <Button
                variant="outlined"
                sx={{ textTransform: "none" }}
                onClick={onGoLogin}
                >
                Back to login
                </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}