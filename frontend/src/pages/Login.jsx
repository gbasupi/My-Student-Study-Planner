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
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function Login({ onGoRegister = () => {}, onLogin = () => {} }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!email.trim()) {
      setErr("Please enter your email");
      return;
    }

    if (!password.trim()) {
      setErr("Please enter your password");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const msg =
          data?.non_field_errors?.[0] ||
          data?.detail ||
          "Login failed";
        throw new Error(msg);
      }

      localStorage.setItem("token", data.token);
      onLogin(data);
    } catch (error) {
      setErr(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
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
            {err && <Alert severity="error">{err}</Alert>}

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
              autoComplete="current-password"
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
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <Divider>OR</Divider>

            <Button
              type="button"
              variant="outlined"
              sx={{ textTransform: "none" }}
              onClick={onGoRegister}
            >
              Create an account
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}