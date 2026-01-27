import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Documents from "./components/Documents/Documents.jsx";
import DocumentsReadOnly from "./components/Documents/DocumentsReadOnly.jsx";
import Login from "./components/Login/Login.jsx";
import Profesores from "./components/Profesores/Profesores.jsx";
import InicioProfesores from "./components/Inicio/Inicio.jsx";

const usersDatabase = [
  { name: "Admin", email: "admin@profesores.com", password: "admin123", userType: "profesor_admin" },
  { name: "Profesor Avanzado", email: "avanzado@profesores.com", password: "avanzado123", userType: "profesor_avanzado" },
  { name: "Profesor Normal", email: "normal@profesores.com", password: "normal123", userType: "profesor_normal" },
];

function App() {
  const [currentView, setCurrentView] = useState("profesores-inicio");
  const [isDark, setIsDark] = useState(false);

  const [documents, setDocuments] = useState([
    { id: 1, title: "Documento 1", content: "Contenido psicológico 1", pdfFile: null },
    { id: 2, title: "Documento 2", content: "Contenido psicológico 2", pdfFile: null },
  ]);

  const [profesores, setProfesores] = useState([
    { id: 1, nombre: "Juan Pérez", especialidad: "Matemáticas", foto: "https://via.placeholder.com/150", cursosAsignados: [1, 2], descripcion: "Experiencia en enseñanza de matemáticas avanzadas.", estado: "activo", hojaDeVida: null, fotoFile: null },
    { id: 2, nombre: "María García", especialidad: "Física", foto: "https://via.placeholder.com/150", cursosAsignados: [3], descripcion: "Especialista en física cuántica.", estado: "activo", hojaDeVida: null, fotoFile: null },
    { id: 3, nombre: "Carlos López", especialidad: "Química", foto: "https://via.placeholder.com/150", cursosAsignados: [], descripcion: "Profesor de química orgánica.", estado: "activo", hojaDeVida: null, fotoFile: null },
  ]);

  const [cursos, setCursos] = useState([
    { id: 1, nombre: "Álgebra Lineal", descripcion: "Curso básico de álgebra." },
    { id: 2, nombre: "Cálculo Diferencial", descripcion: "Introducción al cálculo." },
    { id: 3, nombre: "Física Mecánica", descripcion: "Principios de la mecánica." },
    { id: 4, nombre: "Química Orgánica", descripcion: "Estudio de compuestos orgánicos." },
  ]);

  const [query, setQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    document.body.className = isDark ? "dark" : "";
  }, [isDark]);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);

    if (user.userType.includes("profesor")) {
      setCurrentView("profesores-inicio");
    } else if (user.userType === "usuario") {
      setCurrentView("documents-readonly");
    } else {
      setCurrentView("documents-crud");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView("profesores-inicio");
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  const filteredProfesores = profesores.filter(
    (prof) =>
      prof.nombre.toLowerCase().includes(query.toLowerCase()) ||
      prof.especialidad.toLowerCase().includes(query.toLowerCase()) ||
      prof.descripcion.toLowerCase().includes(query.toLowerCase())
  );

  const handleCreate = (newDoc) => {
    setDocuments([...documents, { id: Date.now(), ...newDoc }]);
  };

  const handleUpdate = (id, updatedDoc) => {
    setDocuments(documents.map((doc) => (doc.id === id ? { ...doc, ...updatedDoc } : doc)));
  };

  const handleDelete = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  const handleCreateProfesor = (newProf) => {
    setProfesores([...profesores, { id: Date.now(), ...newProf, estado: "activo" }]);
  };

  const handleUpdateProfesor = (id, updatedProf) => {
    setProfesores(profesores.map((prof) => (prof.id === id ? { ...prof, ...updatedProf } : prof)));
  };

  const handleDeactivateProfesor = (id) => {
    setProfesores(profesores.map((prof) => (prof.id === id ? { ...prof, estado: "inactivo" } : prof)));
  };

  const handleAssignCursos = (profId, cursosIds) => {
    setProfesores(profesores.map((prof) => (prof.id === profId ? { ...prof, cursosAsignados: cursosIds } : prof)));
  };

  return (
    <div className="App">
      <Navbar
        query={query}
        setQuery={setQuery}
        setCurrentView={setCurrentView}
        toggleDarkMode={toggleDarkMode}
        isDark={isDark}
        currentUser={currentUser}
        handleLogout={handleLogout}
      />

      {currentView === "profesores-inicio" && (
        <InicioProfesores currentUser={currentUser} />
      )}

      {currentView === "documents-crud" && (
        <Documents documents={documents} onCreate={handleCreate} onUpdate={handleUpdate} onDelete={handleDelete} />
      )}

      {currentView === "documents-readonly" && <DocumentsReadOnly documents={documents} />}

      {currentView === "login" && (
        <Login setCurrentView={setCurrentView} onLoginSuccess={handleLoginSuccess} usersDatabase={usersDatabase} />
      )}

      {currentView.startsWith("profesores-") && currentView !== "profesores-inicio" && (
        <Profesores
          currentView={currentView}
          currentUser={currentUser}
          profesores={filteredProfesores}
          cursos={cursos}
          onCreateProfesor={handleCreateProfesor}
          onUpdateProfesor={handleUpdateProfesor}
          onDeactivateProfesor={handleDeactivateProfesor}
          onAssignCursos={handleAssignCursos}
          setCurrentView={setCurrentView}
          query={query}
          setQuery={setQuery}
        />
      )}
    </div>
  );
}

export default App;


