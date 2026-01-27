import React from "react";
import "./Navbar.css";

function Navbar({
  query,
  setQuery,
  setCurrentView,
  toggleDarkMode,
  isDark,
  currentUser,
  handleLogout,
}) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/logo.png" alt="Sura logo" className="logo" />
        <div>
          <h2>Sistema de Gestión de Profesores</h2>
          <p className="subtitle">Portal administrativo Sura</p>
        </div>
      </div>

      <ul className="nav-menu">
        <li>
          <button onClick={() => setCurrentView("home")}>Inicio</button>
        </li>

        <li>
          <button onClick={() => setCurrentView("profesores-list")}>
            Profesores
          </button>
        </li>

        {currentUser && currentUser.userType.includes("profesor") && (
          <li>
            <button onClick={() => setCurrentView("profesores-inicio")}>
              Inicio Profesores
            </button>
          </li>
        )}

        {currentUser && currentUser.userType.includes("profesor") && (
          <li className="dropdown">
            <button className="dropbtn">Gestión Profesores</button>
            <div className="dropdown-content">
              <button onClick={() => setCurrentView("profesores-add")}>
                Agregar Profesor
              </button>

              {currentUser.userType === "profesor_admin" && (
                <button onClick={() => setCurrentView("profesores-edit")}>
                  Editar Profesores
                </button>
              )}

              {currentUser.userType === "profesor_admin" && (
                <button
                  onClick={() => setCurrentView("profesores-assign-courses")}
                >
                  Asignar Cursos
                </button>
              )}
            </div>
          </li>
        )}
      </ul>

      <div className="navbar-right">
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar profesores..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button className="search-button">Buscar</button>
        </div>

        <button onClick={toggleDarkMode} className="theme-toggle">
          {isDark ? "☀️" : "🌙"}
        </button>

        {currentUser ? (
          <div className="user-info">
            <span className="user-name">Hola, {currentUser.name}</span>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <button
            className="login-button"
            onClick={() => setCurrentView("login")}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

