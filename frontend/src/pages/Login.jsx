import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
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
import { apiFetch } from "../api/client";

export default function Login({ onLogin = () => {} }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!email.trim()) return setErr("Please enter your email");
    if (!password.trim()) return setErr("Please enter your password");

    try {
      setLoading(true);

      const tokenData = await apiFetch("/api/auth/token/", {
        method: "POST",
        body: JSON.stringify({
          username: email.trim(),
          password,
        }),
      });

      const token = tokenData?.token || tokenData?.key || tokenData?.access;

      if (!token) {
        throw new Error("Login succeeded but no token was returned");
      }

      sessionStorage.setItem("token", token);

      const userData = await apiFetch("/api/auth/user/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      onLogin({
        token,
        user: {
          username: userData?.username,
          email: userData?.email,
          first_name: userData?.first_name,
          last_name: userData?.last_name,
        },
      });
    } catch (error) {
      setErr(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="app-bg">
      <Container maxWidth="sm">
        <Paper elevation={10} className="auth-paper">
          <Box className="auth-header">
            <Box className="auth-header-content">
              <SchoolRoundedIcon className="auth-icon" />
              <Box>
                <Typography variant="h5" className="auth-title">
                  My Student Study Planner
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box component="form" onSubmit={handleSubmit} className="auth-form">
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
              className="auth-submit-btn"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <Divider>OR</Divider>

            <Button
              component={RouterLink}
              to="/register"
              variant="outlined"
              className="auth-switch-btn"
            >
              Create an account
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}