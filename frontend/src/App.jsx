import { useState } from "react";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import "./index.css";

export default function App() {
  const [page, setPage] = useState("login");

  return (
    <div className="app-bg">
      <div className="app-content">
        {page === "login" ? (
          <Login onGoRegister={() => setPage("register")} />
        ) : (
          <Registration onGoLogin={() => setPage("login")} />
        )}
      </div>
    </div>
  );
}