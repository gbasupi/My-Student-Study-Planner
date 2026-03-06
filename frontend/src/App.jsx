import { useState } from "react";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import "./index.css";

export default function App() {
  const [page, setPage] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setPage("login");
  };

  return (
    <div className="app-bg">
      <div className="app-content">
        {isLoggedIn ? (
          <Dashboard onLogout={handleLogout} />
        ) : page === "login" ? (
          <Login
            onGoRegister={() => setPage("register")}
            onLogin={() => setIsLoggedIn(true)}
          />
        ) : (
          <Registration onGoLogin={() => setPage("login")} />
        )}
      </div>
    </div>
  );
}