import { useState } from "react";
import AppRoutes from "./components/Routes";
import "./index.css";
import "./styles/Auth.css";
import "./styles/View.css";
import "./styles/Layout.css";

export default function App() {
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = ({ token, user }) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setToken("");
    setUser(null);
  };

  return (
    <AppRoutes
      token={token}
      user={user}
      onLogin={handleLogin}
      onLogout={handleLogout}
    />
  );
}
