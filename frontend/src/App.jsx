import { useState } from "react";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import "./index.css";

export default function App() {
  const [page, setPage] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  if (isLoggedIn) {
    return (
      <div className="app-bg">
        <div className="app-content">
          <h1 style={{ color: "white" }}>Logged in successfully</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="app-bg">
      <div className="app-content">
        {page === "login" ? (
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