# 📋 Sistema de Reclamos y Seguimiento
Proyecto Full Stack desarrollado como práctica profesional, enfocado en la gestión de reclamos con autenticación, roles y seguimiento de estados.

>  Proyecto en desarrollo – algunos flujos de autenticación están siendo ajustados.

---

##  Tecnologías utilizadas

### Frontend
- React + TypeScript
- Vite
- TailwindCSS
- React Router DOM
- Axios

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT (JSON Web Tokens)
- bcrypt

---

##  Funcionalidades implementadas

### Autenticación
- Login con email y contraseña
- Generación de JWT
- Protección de rutas (ProtectedRoute)
- Persistencia de sesión con LocalStorage

### Reclamos
- Crear reclamos
- Listar reclamos
- Actualizar estado:
  - PENDING
  - IN_PROGRESS
  - RESOLVED

### Dashboard
- Contadores de reclamos por estado
- Arquitectura basada en hooks personalizados
- Componentes reutilizables (StatCard)

---

## Arquitectura

```txt
client/
 ├── components/
 ├── hooks/
 ├── pages/
 ├── util/
 └── api/

server/
 ├── modules/
 │    ├── auth/
 │    └── complaints/
 ├── config/
 └── prisma/
