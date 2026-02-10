# 🔐 Guía de Integración del Login

Este documento explica cómo enlazar la activación del módulo de Login desde otros módulos de la aplicación.

---

## 📋 Estructura del Componente Login

El componente `Login` es un módulo de autenticación que soporta tres operaciones:
- **Login**: Iniciar sesión con credenciales existentes
- **Register**: Registrar nuevos usuarios
- **Unsubscribe**: Solicitar baja de cuenta

---

## 🔧 Props Requeridos

Para usar el componente Login, debes pasar los siguientes props desde `App.jsx`:

```jsx
<Login 
  setCurrentView={setCurrentView}           // Función para cambiar de vista
  onLoginSuccess={handleLoginSuccess}       // Callback cuando login es exitoso
  usersDatabase={usersDatabase}             // Array de usuarios base de datos
/>
```

### Explicación de Props:

| Prop | Tipo | Descripción |
|------|------|-------------|
| `setCurrentView` | `Function` | Función de cambio de vista. Recibe un string con el nombre de la vista |
| `onLoginSuccess` | `Function` | Callback que se ejecuta al login exitoso. Recibe el objeto usuario |
| `usersDatabase` | `Array` | Array con usuarios iniciales del sistema |

---

## 👥 Estructura del Objeto Usuario

Tanto en `usersDatabase` como al registrar nuevos usuarios, la estructura es:

```javascript
{
  name: 'Nombre del Usuario',                    // String: nombre completo
  email: 'usuario@ejemplo.com',                  // String: email único
  password: 'contraseña123',                     // String: contraseña
  userType: 'profesor_admin'                     // String: tipo de usuario
}
```

### Tipos de Usuario Disponibles:
- `'profesor_admin'` - Administrador (acceso completo)
- `'profesor_avanzado'` - Profesor con permisos avanzados
- `'profesor_normal'` - Profesor con permisos básicos
- `'usuario'` - Usuario estándar (solo lectura)

---

## 🔓 Credenciales de Prueba

Usa estas credenciales para testing:

```
Email: admin@profesores.com
Password: admin123
Tipo: profesor_admin

---

Email: avanzado@profesores.com
Password: avanzado123
Tipo: profesor_avanzado

---

Email: normal@profesores.com
Password: normal123
Tipo: profesor_normal
```

---

## 🚀 Cómo Activar Login desde Otro Módulo

### Opción 1: Desde un Botón en tu Módulo

```jsx
// En tu componente
function MiModulo({ setCurrentView }) {
  return (
    <button onClick={() => setCurrentView('login')}>
      Ir al Login
    </button>
  );
}
```

### Opción 2: Condicionalmente si No Hay Usuario Logueado

```jsx
function MiModulo({ currentUser, setCurrentView }) {
  if (!currentUser) {
    return (
      <div>
        <p>Debes iniciar sesión para acceder</p>
        <button onClick={() => setCurrentView('login')}>
          Ir al Login
        </button>
      </div>
    );
  }
  
  return <div>Contenido protegido</div>;
}
```

### Opción 3: Redirigir Automáticamente Después de Acción

```jsx
// En App.jsx, en el handler de logout
const handleLogout = () => {
  setCurrentUser(null);
  setCurrentView('home');
  // Si quieres ir directamente al login:
  // setCurrentView('login');
};
```

---

## 🔄 Flujo de Autenticación

```
┌─────────────────┐
│   Usuario      │
│   Abre App     │
└────────┬────────┘
         │
         v
┌──────────────────┐
│  currentView     │  Si es 'login', muestra
│  === 'login'     │  el componente Login
└────────┬─────────┘
         │
         v
┌──────────────────────────────────┐
│  Usuario ingresa credenciales    │
└────────┬─────────────────────────┘
         │
         v
┌──────────────────────────────────┐
│  onLoginSuccess(usuario)         │  ← Callback ejecutado
│  setCurrentUser(usuario)         │
│  Cambiar a vista apropiada       │
└──────────────────────────────────┘
```

---

## 💾 Manejo de Usuarios Registrados

**Importante**: El componente Login mantiene los usuarios registrados en estado local. Esto significa que:

✅ Los usuarios se guardan durante la sesión  
✅ Se pueden registrar nuevos usuarios dinámicamente  
❌ Los datos se pierden al recargar la página (usar una BD real para persistencia)

Para implementar persistencia, necesitarías:
- Enviar datos a un servidor/API
- Usar localStorage (no recomendado para datos sensibles)
- Integrar una base de datos real

---

## 🔗 Integración Completa en App.jsx

Aquí está el código actual en `App.jsx`:

```jsx
// En App.jsx
import Login from './components/Login/Login.jsx';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);
  
  // Base de datos de usuarios inicial
  const usersDatabase = [
    { name: 'Admin', email: 'admin@profesores.com', password: 'admin123', userType: 'profesor_admin' },
    { name: 'Profesor Avanzado', email: 'avanzado@profesores.com', password: 'avanzado123', userType: 'profesor_avanzado' },
    { name: 'Profesor Normal', email: 'normal@profesores.com', password: 'normal123', userType: 'profesor_normal' },
  ];
  
  // Callback al login exitoso
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    // Redirigir según tipo de usuario
    if (user.userType.includes('profesor')) {
      setCurrentView('profesores-list');
    } else if (user.userType === 'usuario') {
      setCurrentView('documents-readonly');
    } else {
      setCurrentView('documents-crud');
    }
  };
  
  // Vista Login
  {currentView === 'login' && (
    <Login 
      setCurrentView={setCurrentView} 
      onLoginSuccess={handleLoginSuccess} 
      usersDatabase={usersDatabase} 
    />
  )}
  
  return (
    // ... resto del código
  );
}
```

---

## 📱 Botones de Acceso Rápido

### En Navbar
Anteriormente había un botón "Login" en la barra de navegación que ejecutaba:
```jsx
<button onClick={() => setCurrentView('login')}>Login</button>
```

### Desde Componentes Externos
Si quieres activar Login desde otro módulo:

```jsx
// En tu componente externo
import { useContext } from 'react';

function OtroModulo({ setCurrentView }) {
  return (
    <button onClick={() => setCurrentView('login')}>
      Activar Login
    </button>
  );
}
```

---

## 🛡️ Validaciones Implementadas

El componente valida:

✅ Correo electrónico requerido  
✅ Contraseña requerida  
✅ Email único en registro  
✅ Credenciales válidas en login  
✅ Formularios con campos dinámicos según tipo

---

## 📝 Notas Importantes

1. **No hay botón en Navbar**: El botón de login fue removido de la barra de navegación. Puedes activarlo desde otros módulos usando `setCurrentView('login')`.

2. **Estado de usuario**: El estado `currentUser` se mantiene en App.jsx y se pasa a componentes que lo necesiten.

3. **Protección de rutas**: Implementa validaciones con `currentUser` para proteger vistas que requieran autenticación.

4. **Cerrar sesión**: Usa `handleLogout()` para limpiar el usuario y volver al home.

---

## 🎯 Ejemplo Completo: Activar Login desde un Botón

```jsx
// En MyModule.jsx
import React from 'react';

function MyModule({ setCurrentView, currentUser }) {
  return (
    <div className="my-module">
      <h1>Mi Módulo</h1>
      
      {!currentUser && (
        <div className="auth-required">
          <p>Necesitas estar logueado para continuar</p>
          <button 
            onClick={() => setCurrentView('login')}
            className="btn-login"
          >
            🔐 Iniciar Sesión
          </button>
        </div>
      )}
      
      {currentUser && (
        <div className="welcome">
          <p>¡Bienvenido, {currentUser.name}!</p>
          <p>Tipo de usuario: {currentUser.userType}</p>
        </div>
      )}
    </div>
  );
}

export default MyModule;
```

---

## 📞 Soporte

Si tienes dudas sobre la integración:
1. Revisa el archivo `src/App.jsx` para ver cómo está implementado
2. Consulta `src/components/Login/Login.jsx` para entender la lógica interna
3. Verifica que estés pasando correctamente los props necesarios

