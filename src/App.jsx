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
    { id: 1, nombre: 'Juan Pérez', nombreCompleto: 'Juan Miguel Pérez', numeroDocumento: '10000001', correoElectronico: 'juan.perez@universidad.edu', celular: '3001000001', nivelAcademico: 'Maestría', areasAsignadas: 'Matemáticas', anosExperiencia: 12, tipoContrato: 'Tiempo Completo', perfilProfesional: 'Especialista en análisis matemático y enseñanza universitaria.', especialidad: 'Matemáticas', foto: 'https://via.placeholder.com/150/0077FF/FFFFFF?text=Juan+P', cursosAsignados: [1, 2], descripcion: 'Experiencia en enseñanza de matemáticas avanzadas.', estado: 'activo', hojaDeVidaLink: '/media/hojas/Juan_Perez_CV.pdf', fotoFile: null },
    { id: 2, nombre: 'María García', nombreCompleto: 'María Isabel García', numeroDocumento: '10000002', correoElectronico: 'maria.garcia@universidad.edu', celular: '3001000002', nivelAcademico: 'Doctorado', areasAsignadas: 'Física', anosExperiencia: 15, tipoContrato: 'Tiempo Completo', perfilProfesional: 'Investigadora en física cuántica y docente de laboratorio.', especialidad: 'Física', foto: 'https://via.placeholder.com/150/FF6600/FFFFFF?text=Maria+G', cursosAsignados: [3], descripcion: 'Especialista en física cuántica y laboratorio.', estado: 'activo', hojaDeVidaLink: '/media/hojas/Maria_Garcia_CV.pdf', fotoFile: null },
    { id: 3, nombre: 'Carlos López', nombreCompleto: 'Carlos Alberto López', numeroDocumento: '10000003', correoElectronico: 'carlos.lopez@universidad.edu', celular: '3001000003', nivelAcademico: 'Maestría', areasAsignadas: 'Química', anosExperiencia: 10, tipoContrato: 'Medio Tiempo', perfilProfesional: 'Docente de química orgánica y métodos analíticos.', especialidad: 'Química', foto: 'https://via.placeholder.com/150/00AA55/FFFFFF?text=Carlos+L', cursosAsignados: [], descripcion: 'Profesor de química orgánica con 10 años de experiencia.', estado: 'activo', hojaDeVidaLink: '/media/hojas/Carlos_Lopez_CV.pdf', fotoFile: null },
    { id: 4, nombre: 'Ana Fernández', nombreCompleto: 'Ana Lucía Fernández', numeroDocumento: '10000004', correoElectronico: 'ana.fernandez@universidad.edu', celular: '3001000004', nivelAcademico: 'Doctorado', areasAsignadas: 'Biología', anosExperiencia: 9, tipoContrato: 'Contrato', perfilProfesional: 'Investigadora en biología molecular y docente universitaria.', especialidad: 'Biología', foto: 'https://via.placeholder.com/150/AA00CC/FFFFFF?text=Ana+F', cursosAsignados: [4], descripcion: 'Investigadora en biología molecular y docencia.', estado: 'activo', hojaDeVidaLink: '/media/hojas/Ana_Fernandez_CV.pdf', fotoFile: null },
    { id: 5, nombre: 'Luis Martínez', nombreCompleto: 'Luis Alberto Martínez', numeroDocumento: '10000005', correoElectronico: 'luis.martinez@universidad.edu', celular: '3001000005', nivelAcademico: 'Maestría', areasAsignadas: 'Historia', anosExperiencia: 7, tipoContrato: 'Cátedra', perfilProfesional: 'Especialista en historia contemporánea y patrimonio cultural.', especialidad: 'Historia', foto: 'https://via.placeholder.com/150/FF0077/FFFFFF?text=Luis+M', cursosAsignados: [], descripcion: 'Especialista en historia contemporánea y patrimonio cultural.', estado: 'activo', hojaDeVidaLink: '/media/hojas/Luis_Martinez_CV.pdf', fotoFile: null },
    { id: 6, nombre: 'Sofía Ramírez', nombreCompleto: 'Sofía Elena Ramírez', numeroDocumento: '10000006', correoElectronico: 'sofia.ramirez@universidad.edu', celular: '3001000006', nivelAcademico: 'Maestría', areasAsignadas: 'Literatura', anosExperiencia: 6, tipoContrato: 'Medio Tiempo', perfilProfesional: 'Docente de literatura hispanoamericana y técnicas narrativas.', especialidad: 'Literatura', foto: 'https://via.placeholder.com/150/007744/FFFFFF?text=Sofia+R', cursosAsignados: [], descripcion: 'Docente de literatura hispanoamericana y narrativas.', estado: 'activo', hojaDeVidaLink: '/media/hojas/Sofia_Ramirez_CV.pdf', fotoFile: null },
    { id: 7, nombre: 'Diego Torres', nombreCompleto: 'Diego Andrés Torres', numeroDocumento: '10000007', correoElectronico: 'diego.torres@universidad.edu', celular: '3001000007', nivelAcademico: 'Licenciatura', areasAsignadas: 'Inglés', anosExperiencia: 8, tipoContrato: 'Tiempo Completo', perfilProfesional: 'Profesor de inglés técnico y comunicación profesional.', especialidad: 'Inglés', foto: 'https://via.placeholder.com/150/2244FF/FFFFFF?text=Diego+T', cursosAsignados: [2,3], descripcion: 'Profesor de inglés técnico y comunicación.', estado: 'activo', hojaDeVidaLink: '/media/hojas/Diego_Torres_CV.pdf', fotoFile: null },
    { id: 8, nombre: 'Mariana Ruiz', nombreCompleto: 'Mariana Alejandra Ruiz', numeroDocumento: '10000008', correoElectronico: 'mariana.ruiz@universidad.edu', celular: '3001000008', nivelAcademico: 'Maestría', areasAsignadas: 'Informática', anosExperiencia: 11, tipoContrato: 'Tiempo Completo', perfilProfesional: 'Especialista en desarrollo web, bases de datos y metodologías ágiles.', especialidad: 'Informática', foto: 'https://via.placeholder.com/150/FFAA00/FFFFFF?text=Mariana+R', cursosAsignados: [1,4], descripcion: 'Especialista en desarrollo web y bases de datos.', estado: 'activo', hojaDeVidaLink: '/media/hojas/Mariana_Ruiz_CV.pdf', fotoFile: null },
    { id: 9, nombre: 'Ramón Silva', nombreCompleto: 'Ramón Eduardo Silva', numeroDocumento: '10000009', correoElectronico: 'ramon.silva@universidad.edu', celular: '3001000009', nivelAcademico: 'Maestría', areasAsignadas: 'Economía', anosExperiencia: 13, tipoContrato: 'Tiempo Completo', perfilProfesional: 'Economista con experiencia en microeconomía y análisis financiero.', especialidad: 'Economía', foto: 'https://via.placeholder.com/150/00CCCC/FFFFFF?text=Ramon+S', cursosAsignados: [], descripcion: 'Economista con foco en microeconomía y finanzas.', estado: 'activo', hojaDeVidaLink: '/media/hojas/Ramon_Silva_CV.pdf', fotoFile: null },
    { id: 10, nombre: 'Laura Gómez', nombreCompleto: 'Laura Fernanda Gómez', numeroDocumento: '10000010', correoElectronico: 'laura.gomez@universidad.edu', celular: '3001000010', nivelAcademico: 'Doctorado', areasAsignadas: 'Psicología', anosExperiencia: 14, tipoContrato: 'Tiempo Completo', perfilProfesional: 'Profesora de psicología educativa y clínica con investigación aplicada.', especialidad: 'Psicología', foto: 'https://via.placeholder.com/150/8844FF/FFFFFF?text=Laura+G', cursosAsignados: [], descripcion: 'Profesora de psicología educativa y clínica.', estado: 'activo', hojaDeVidaLink: '/media/hojas/Laura_Gomez_CV.pdf', fotoFile: null },
    { id: 11, nombre: 'Andrés Molina', nombreCompleto: 'Andrés Felipe Molina', numeroDocumento: '10000011', correoElectronico: 'andres.molina@universidad.edu', celular: '3001000011', nivelAcademico: 'Maestría', areasAsignadas: 'Filosofía', anosExperiencia: 10, tipoContrato: 'Cátedra', perfilProfesional: 'Investigador en ética aplicada y filosofía política.', especialidad: 'Filosofía', foto: 'https://via.placeholder.com/150/FF4444/FFFFFF?text=Andres+M', cursosAsignados: [], descripcion: 'Investiga ética aplicada y filosofía política.', estado: 'activo', hojaDeVidaLink: '/media/hojas/Andres_Molina_CV.pdf', fotoFile: null },
    { id: 12, nombre: 'Clara Vega', nombreCompleto: 'Clara Isabel Vega', numeroDocumento: '10000012', correoElectronico: 'clara.vega@universidad.edu', celular: '3001000012', nivelAcademico: 'Maestría', areasAsignadas: 'Arte', anosExperiencia: 5, tipoContrato: 'Medio Tiempo', perfilProfesional: 'Docente de artes plásticas y técnicas contemporáneas.', especialidad: 'Arte', foto: 'https://via.placeholder.com/150/44FF88/FFFFFF?text=Clara+V', cursosAsignados: [], descripcion: 'Docente de artes plásticas y técnicas contemporáneas.', estado: 'activo', hojaDeVidaLink: '/media/hojas/Clara_Vega_CV.pdf', fotoFile: null },
    { id: 13, nombre: 'Pablo Herrera', nombreCompleto: 'Pablo Andrés Herrera', numeroDocumento: '10000013', correoElectronico: 'pablo.herrera@universidad.edu', celular: '3001000013', nivelAcademico: 'Licenciatura', areasAsignadas: 'Música', anosExperiencia: 8, tipoContrato: 'Cátedra', perfilProfesional: 'Profesor de teoría musical, composición y práctica instrumental.', especialidad: 'Música', foto: 'https://via.placeholder.com/150/CC0044/FFFFFF?text=Pablo+H', cursosAsignados: [], descripcion: 'Profesor de teoría musical y práctica instrumental.', estado: 'activo', hojaDeVidaLink: '/media/hojas/Pablo_Herrera_CV.pdf', fotoFile: null },
    { id: 14, nombre: 'Verónica Díaz', nombreCompleto: 'Verónica Patricia Díaz', numeroDocumento: '10000014', correoElectronico: 'veronica.diaz@universidad.edu', celular: '3001000014', nivelAcademico: 'Licenciatura', areasAsignadas: 'Educación Física', anosExperiencia: 9, tipoContrato: 'Tiempo Completo', perfilProfesional: 'Especialista en entrenamiento, acondicionamiento y salud deportiva.', especialidad: 'Educación Física', foto: 'https://via.placeholder.com/150/0066CC/FFFFFF?text=Veronica+D', cursosAsignados: [4], descripcion: 'Especialista en entrenamiento y salud deportiva.', estado: 'activo', hojaDeVidaLink: '/media/hojas/Veronica_Diaz_CV.pdf', fotoFile: null },
    { id: 15, nombre: 'Raúl Ortega', nombreCompleto: 'Raúl Eduardo Ortega', numeroDocumento: '10000015', correoElectronico: 'raul.ortega@universidad.edu', celular: '3001000015', nivelAcademico: 'Maestría', areasAsignadas: 'Estadística', anosExperiencia: 11, tipoContrato: 'Tiempo Completo', perfilProfesional: 'Docente en estadística aplicada y análisis de datos con herramientas modernas.', especialidad: 'Estadística', foto: 'https://via.placeholder.com/150/6600FF/FFFFFF?text=Raul+O', cursosAsignados: [1,2], descripcion: 'Docente en estadística aplicada y análisis de datos.', estado: 'activo', hojaDeVidaLink: '/media/hojas/Raul_Ortega_CV.pdf', fotoFile: null },
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