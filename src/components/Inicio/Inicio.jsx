import React from "react";
import "./Inicio.css";

export default function InicioProfesores({ currentUser }) {
  const nombre = currentUser?.name || "Profesor";

  return (
    <div className="inicio-container">
      <header className="inicio-header">
        <div className="welcome">
          <h1>Bienvenido, {nombre} 👋</h1>
          <p>
            Aquí tienes tu panel de control con avisos, tareas, estadísticas y
            herramientas.
          </p>

          <div className="header-buttons">
            <button className="btn primary" onClick={() => alert("Acceso a clases")}>
              📚 Mis Clases
            </button>
            <button className="btn" onClick={() => alert("Acceso a documentos")}>
              📝 Documentos
            </button>
            <button className="btn" onClick={() => alert("Acceso a evaluaciones")}>
              📌 Evaluaciones
            </button>
          </div>
        </div>

        <div className="header-img">
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=60"
            alt="Profesores trabajando"
          />
        </div>
      </header>

      <main className="inicio-main">
        <section className="cards">
          <div className="card">
            <h3>📢 Avisos importantes</h3>
            <p>Recuerda publicar el cronograma de evaluaciones antes del viernes.</p>
            <span className="badge yellow">Urgente</span>
          </div>

          <div className="card">
            <h3>📝 Documentos por revisar</h3>
            <p>Tienes 3 documentos pendientes de aprobación en el sistema.</p>
            <span className="badge blue">Pendiente</span>
          </div>

          <div className="card">
            <h3>📚 Recursos recomendados</h3>
            <p>Mira el nuevo material de apoyo para álgebra lineal.</p>
            <span className="badge green">Nuevo</span>
          </div>
        </section>

        <section className="stats">
          <div className="stat">
            <h4>📌 Clases hoy</h4>
            <p className="big">4</p>
          </div>
          <div className="stat">
            <h4>🧑‍🎓 Estudiantes</h4>
            <p className="big">120</p>
          </div>
          <div className="stat">
            <h4>🗂️ Tareas pendientes</h4>
            <p className="big">6</p>
          </div>
          <div className="stat">
            <h4>⭐ Evaluaciones</h4>
            <p className="big">2</p>
          </div>
        </section>

        <section className="timeline">
          <h3>📅 Agenda rápida</h3>
          <div className="timeline-item">
            <span className="dot"></span>
            <div>
              <h4>8:00 AM - Clase de Álgebra</h4>
              <p>Revisión de ejercicios y tarea.</p>
            </div>
          </div>
          <div className="timeline-item">
            <span className="dot blue"></span>
            <div>
              <h4>10:00 AM - Reunión con coordinador</h4>
              <p>Planificación de evaluaciones.</p>
            </div>
          </div>
          <div className="timeline-item">
            <span className="dot green"></span>
            <div>
              <h4>2:00 PM - Corrección de trabajos</h4>
              <p>Entrega de notas y feedback.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
