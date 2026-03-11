import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
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
import { API_BASE, parseJsonResponse } from "../api";

export default function Registration() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setSuccess("");

    if (!firstName.trim()) return setErr("Please enter your first name");
    if (!lastName.trim()) return setErr("Please enter your last name");
    if (!email.trim()) return setErr("Please enter your email");
    if (!password.trim()) return setErr("Please enter your password");
    if (!confirmPassword.trim()) return setErr("Please confirm your password");
    if (password !== confirmPassword) return setErr("Passwords do not match");

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/api/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          password,
          password2: confirmPassword,
        }),
      });

      const data = await parseJsonResponse(res);

      if (!res.ok) {
        const msg =
          data?.email?.[0] ||
          data?.password?.[0] ||
          data?.password2?.[0] ||
          data?.first_name?.[0] ||
          data?.last_name?.[0] ||
          data?.detail ||
          "Registration failed";
        throw new Error(msg);
      }

      setSuccess("Account created successfully");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
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
            <Typography variant="h6" className="auth-heading">
              Create account
            </Typography>

            {err && <Alert severity="error">{err}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}

            <TextField
              label="First Name"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="given-name"
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
              autoComplete="family-name"
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
              className="auth-submit-btn"
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>

            <Divider>OR</Divider>

            <Button
              component={RouterLink}
              to="/login"
              variant="outlined"
              className="auth-switch-btn"
            >
              Already have an account? Log in
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
