# VIBES Marketplace

## 📋 Descripción del Proyecto
Marketplace desarrollado con **Next.js**, **Express.js**, **TypeScript** y **MongoDB**. Incluye catálogo de productos, búsqueda, filtros y sistema de favoritos.

---

## 🛠️ Tecnologías
- ⚡ **Frontend:** Next.js + TypeScript + Tailwind CSS
- 🚀 **Backend:** Express.js + TypeScript + MongoDB Atlas
- 🗃️ **Monorepo:** Estructura optimizada

---

## 🧩 Funcionalidades
### Backend
- 🔗 API RESTful para productos
- 🗄️ Conexión a MongoDB Atlas
- 📑 Paginación y filtros avanzados
- 🔍 Búsqueda textual optimizada
- 🌱 Seed automático de base de datos

### Frontend
- 🛒 Catálogo de productos con grid responsive
- 📦 Página de detalle de producto
- 🔎 Búsqueda y filtros en tiempo real
- ⏩ Paginación client-side
- 🎨 Diseño responsive con Tailwind CSS
- ⚙️ Gestión de estado con React Hooks
- 🛡️ Tipado fuerte con TypeScript
- 🔐 Variables de entorno configuradas
- 🏃 Scripts de desarrollo optimizados
- 📚 Documentación completa

---

## 🚀 Instalación Rápida

```bash
# Clona el repositorio
git clone https://github.com/Ddun28/prueba-tecnica-vibes.git
cd vibes-marketplace

# Backend
cd api
cp .env.example .env   # Configura variables de entorno
npm run seed           # Correr seed de productos

# Frontend
cd ../web
cp .env.example .env.local   # Configura variables de entorno

URLs de Desarrollo

Frontend: http://localhost:3000

Backend: http://localhost:3001


Instalar Dependencias

cd ../vibes-marketplace

npm run install:all

correr proyecto
npm run dev
```

### URLs de Desarrollo
Frontend: http://localhost:3000
Backend: http://localhost:3001