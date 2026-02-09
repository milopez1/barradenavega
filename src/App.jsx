import React, { useState, useEffect } from 'react'; // Importamos React y hooks para manejar estado y efectos
import logo from './logo.svg'; // Logo de React
import './App.css'; // Estilos principales de la aplicación
import Navbar from './components/Navbar/Navbar.jsx'; // Componente de la barra de navegación
import Documents from './components/Documents/Documents.jsx'; // Componente para gestionar documentos (CRUD)
import DocumentsReadOnly from './components/Documents/DocumentsReadOnly.jsx'; // Componente para ver documentos (solo lectura)
import Login from './components/Login/Login.jsx'; // Componente del módulo de login/registro/baja
import Profesores from './components/Profesores/Profesores.jsx'; // Componente para gestionar profesores

// Diccionario de usuarios (simulación de base de datos)
const usersDatabase = [
  { name: 'Admin', email: 'admin@profesores.com', password: 'admin123', userType: 'profesor_admin' },
  { name: 'Profesor Avanzado', email: 'avanzado@profesores.com', password: 'avanzado123', userType: 'profesor_avanzado' },
  { name: 'Profesor Normal', email: 'normal@profesores.com', password: 'normal123', userType: 'profesor_normal' },
];

function App() {
  // ELIMINADO: const [count, setCount] = useState(0); - No se usaba
  
  // Estado para la vista actual (home, documents-readonly, documents-crud, login, profesores-list, etc.)
  const [currentView, setCurrentView] = useState('home');
  // Estado para el modo oscuro
  const [isDark, setIsDark] = useState(false);
  // Estado para la lista de documentos
  const [documents, setDocuments] = useState([
    { id: 1, title: 'Documento 1', content: 'Contenido psicológico 1', pdfFile: null },
    { id: 2, title: 'Documento 2', content: 'Contenido psicológico 2', pdfFile: null },
  ]);
  // Estado para la lista de profesores
  const [profesores, setProfesores] = useState([
    { id: 1, nombre: 'Juan Pérez', especialidad: 'Matemáticas', foto: 'https://via.placeholder.com/150/0077FF/FFFFFF?text=Juan+P', cursosAsignados: [1, 2], descripcion: 'Experiencia en enseñanza de matemáticas avanzadas.', estado: 'activo', hojaDeVida: null, hojaDeVidaLink: '/media/hojas/Juan_Perez_CV.pdf', fotoFile: null },
    { id: 2, nombre: 'María García', especialidad: 'Física', foto: 'https://via.placeholder.com/150/FF6600/FFFFFF?text=Maria+G', cursosAsignados: [3], descripcion: 'Especialista en física cuántica y laboratorio.', estado: 'activo', hojaDeVida: null, hojaDeVidaLink: '/media/hojas/Maria_Garcia_CV.pdf', fotoFile: null },
    { id: 3, nombre: 'Carlos López', especialidad: 'Química', foto: 'https://via.placeholder.com/150/00AA55/FFFFFF?text=Carlos+L', cursosAsignados: [], descripcion: 'Profesor de química orgánica con 10 años de experiencia.', estado: 'activo', hojaDeVida: null, hojaDeVidaLink: '/media/hojas/Carlos_Lopez_CV.pdf', fotoFile: null },
    { id: 4, nombre: 'Ana Fernández', especialidad: 'Biología', foto: 'https://via.placeholder.com/150/AA00CC/FFFFFF?text=Ana+F', cursosAsignados: [4], descripcion: 'Investigadora en biología molecular y docencia.', estado: 'activo', hojaDeVida: null, hojaDeVidaLink: '/media/hojas/Ana_Fernandez_CV.pdf', fotoFile: null },
    { id: 5, nombre: 'Luis Martínez', especialidad: 'Historia', foto: 'https://via.placeholder.com/150/FF0077/FFFFFF?text=Luis+M', cursosAsignados: [], descripcion: 'Especialista en historia contemporánea y patrimonio cultural.', estado: 'activo', hojaDeVida: null, hojaDeVidaLink: '/media/hojas/Luis_Martinez_CV.pdf', fotoFile: null },
    { id: 6, nombre: 'Sofía Ramírez', especialidad: 'Literatura', foto: 'https://via.placeholder.com/150/007744/FFFFFF?text=Sofia+R', cursosAsignados: [], descripcion: 'Docente de literatura hispanoamericana y narrativas.', estado: 'activo', hojaDeVida: null, hojaDeVidaLink: '/media/hojas/Sofia_Ramirez_CV.pdf', fotoFile: null },
    { id: 7, nombre: 'Diego Torres', especialidad: 'Inglés', foto: 'https://via.placeholder.com/150/2244FF/FFFFFF?text=Diego+T', cursosAsignados: [2,3], descripcion: 'Profesor de inglés técnico y comunicación.', estado: 'activo', hojaDeVida: null, hojaDeVidaLink: '/media/hojas/Diego_Torres_CV.pdf', fotoFile: null },
    { id: 8, nombre: 'Mariana Ruiz', especialidad: 'Informática', foto: 'https://via.placeholder.com/150/FFAA00/FFFFFF?text=Mariana+R', cursosAsignados: [1,4], descripcion: 'Especialista en desarrollo web y bases de datos.', estado: 'activo', hojaDeVida: null, hojaDeVidaLink: '/media/hojas/Mariana_Ruiz_CV.pdf', fotoFile: null },
    { id: 9, nombre: 'Ramón Silva', especialidad: 'Economía', foto: 'https://via.placeholder.com/150/00CCCC/FFFFFF?text=Ramon+S', cursosAsignados: [], descripcion: 'Economista con foco en microeconomía y finanzas.', estado: 'activo', hojaDeVida: null, hojaDeVidaLink: '/media/hojas/Ramon_Silva_CV.pdf', fotoFile: null },
    { id: 10, nombre: 'Laura Gómez', especialidad: 'Psicología', foto: 'https://via.placeholder.com/150/8844FF/FFFFFF?text=Laura+G', cursosAsignados: [], descripcion: 'Profesora de psicología educativa y clínica.', estado: 'activo', hojaDeVida: null, hojaDeVidaLink: '/media/hojas/Laura_Gomez_CV.pdf', fotoFile: null },
    { id: 11, nombre: 'Andrés Molina', especialidad: 'Filosofía', foto: 'https://via.placeholder.com/150/FF4444/FFFFFF?text=Andres+M', cursosAsignados: [], descripcion: 'Investiga ética aplicada y filosofía política.', estado: 'activo', hojaDeVida: null, hojaDeVidaLink: '/media/hojas/Andres_Molina_CV.pdf', fotoFile: null },
    { id: 12, nombre: 'Clara Vega', especialidad: 'Arte', foto: 'https://via.placeholder.com/150/44FF88/FFFFFF?text=Clara+V', cursosAsignados: [], descripcion: 'Docente de artes plásticas y técnicas contemporáneas.', estado: 'activo', hojaDeVida: null, hojaDeVidaLink: '/media/hojas/Clara_Vega_CV.pdf', fotoFile: null },
    { id: 13, nombre: 'Pablo Herrera', especialidad: 'Música', foto: 'https://via.placeholder.com/150/CC0044/FFFFFF?text=Pablo+H', cursosAsignados: [], descripcion: 'Profesor de teoría musical y práctica instrumental.', estado: 'activo', hojaDeVida: null, hojaDeVidaLink: '/media/hojas/Pablo_Herrera_CV.pdf', fotoFile: null },
    { id: 14, nombre: 'Verónica Díaz', especialidad: 'Educación Física', foto: 'https://via.placeholder.com/150/0066CC/FFFFFF?text=Veronica+D', cursosAsignados: [4], descripcion: 'Especialista en entrenamiento y salud deportiva.', estado: 'activo', hojaDeVida: null, hojaDeVidaLink: '/media/hojas/Veronica_Diaz_CV.pdf', fotoFile: null },
    { id: 15, nombre: 'Raúl Ortega', especialidad: 'Estadística', foto: 'https://via.placeholder.com/150/6600FF/FFFFFF?text=Raul+O', cursosAsignados: [1,2], descripcion: 'Docente en estadística aplicada y análisis de datos.', estado: 'activo', hojaDeVida: null, hojaDeVidaLink: '/media/hojas/Raul_Ortega_CV.pdf', fotoFile: null },
  ]);
  // Estado para la lista de cursos
  const [cursos] = useState([ // CAMBIADO: Removido setCursos ya que no se usa
    { id: 1, nombre: 'Álgebra Lineal', descripcion: 'Curso básico de álgebra.' },
    { id: 2, nombre: 'Cálculo Diferencial', descripcion: 'Introducción al cálculo.' },
    { id: 3, nombre: 'Física Mecánica', descripcion: 'Principios de la mecánica.' },
    { id: 4, nombre: 'Química Orgánica', descripcion: 'Estudio de compuestos orgánicos.' },
  ]);
  // Estado para la consulta de búsqueda
  const [query, setQuery] = useState('');
  // Estado para el usuario actualmente logueado
  const [currentUser, setCurrentUser] = useState(null);

  // Efecto para aplicar el modo oscuro al body
  useEffect(() => {
    document.body.className = isDark ? 'dark' : '';
  }, [isDark]);

  // Función para manejar login exitoso
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    // Redirigir basado en el tipo de usuario
    if (user.userType.includes('profesor')) {
      setCurrentView('profesores-list');
    } else if (user.userType === 'usuario') {
      setCurrentView('documents-readonly');
    } else {
      setCurrentView('documents-crud');
    }
  };

  // Función para manejar logout
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  // Función para alternar el modo oscuro
  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  // Filtrar profesores basado en la consulta de búsqueda
  // Sólo aplicar filtro cuando la consulta tenga 3 o más caracteres.
  // Para el nombre, la coincidencia se evalúa a partir de la 3ª letra (slice(2)).
  const filteredProfesores = profesores.filter(prof => {
    const q = (query || '').trim().toLowerCase();
    if (q.length < 3) return true; // sin suficiente longitud, mostrar todo

    const name = (prof.nombre || prof.nombreCompleto || '').toLowerCase();
    const nameFromThird = name.length > 2 ? name.slice(2) : name;
    const especialidad = (prof.especialidad || prof.areasAsignadas || '').toLowerCase();
    const descripcion = (prof.descripcion || prof.perfilProfesional || '').toLowerCase();

    return (
      nameFromThird.includes(q) ||
      especialidad.includes(q) ||
      descripcion.includes(q)
    );
  });

  // Función para crear un nuevo documento
  const handleCreate = (newDoc) => {
    setDocuments([...documents, { id: Date.now(), ...newDoc }]);
  };

  // Función para actualizar un documento existente
  const handleUpdate = (id, updatedDoc) => {
    setDocuments(documents.map(doc => doc.id === id ? { ...doc, ...updatedDoc } : doc));
  };

  // Función para eliminar un documento
  const handleDelete = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  // Función para crear un nuevo profesor
  const handleCreateProfesor = (newProf) => {
    setProfesores([...profesores, { id: Date.now(), ...newProf, estado: 'activo' }]);
  };

  // Función para actualizar un profesor existente
  const handleUpdateProfesor = (id, updatedProf) => {
    setProfesores(profesores.map(prof => prof.id === id ? { ...prof, ...updatedProf } : prof));
  };

  // Función para desactivar un profesor
  const handleDeactivateProfesor = (id) => {
    setProfesores(profesores.map(prof => prof.id === id ? { ...prof, estado: 'inactivo' } : prof));
  };

  // Función para asignar cursos a un profesor
  const handleAssignCursos = (profId, cursosIds) => {
    setProfesores(profesores.map(prof => prof.id === profId ? { ...prof, cursos: cursosIds } : prof));
  };

  return (
    <div className="App">
      {/* Barra de navegación con búsqueda, modo oscuro y login */}
      <Navbar 
        query={query} 
        setQuery={setQuery} 
        setCurrentView={setCurrentView} 
        toggleDarkMode={toggleDarkMode} 
        isDark={isDark}
        currentUser={currentUser}
        handleLogout={handleLogout}
      />
      {/* Vista de inicio con logo y contador */}
     {currentView === 'home' && (
  <div className="home-container">
    <div className="home-hero">
      <h1>Sistema de Gestión de Profesores</h1>
      <p>
        Plataforma centralizada para la administración de profesores,
        asignación de cursos y control académico.
      </p>
    </div>

    <div className="home-cards">
      <div className="home-card">
        <h3>📋 Gestión de Profesores</h3>
        <p>Registro, edición y consulta de profesores.</p>
      </div>

      <div className="home-card">
        <h3>📚 Asignación de Cursos</h3>
        <p>Administra los cursos y profesores asignados.</p>
      </div>

      <div className="home-card">
        <h3>🔐 Acceso Seguro</h3>
        <p>Roles diferenciados para administradores y profesores.</p>
      </div>
    </div>
  </div>
)}


      {/* Vista de documentos con lista filtrada (CRUD completo) */}
      {currentView === 'documents-crud' && (
        <Documents
          documents={documents}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
      {/* Vista de documentos de solo lectura */}
      {currentView === 'documents-readonly' && (
        <DocumentsReadOnly
          documents={documents}
        />
      )}
      {/* Vista de login/registro/baja */}
      {currentView === 'login' && (
        <Login setCurrentView={setCurrentView} onLoginSuccess={handleLoginSuccess} usersDatabase={usersDatabase} />
      )}
      {/* Vistas de profesores */}
      {(currentView.startsWith('profesores-')) && (
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