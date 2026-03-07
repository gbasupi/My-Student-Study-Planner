import { useState } from "react";
import AppRoutes from "./components/Routes";
import "./index.css";
import "./styles/Auth.css";
import "./styles/View.css";
import "./styles/Layout.css";


export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = ({ token, user }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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