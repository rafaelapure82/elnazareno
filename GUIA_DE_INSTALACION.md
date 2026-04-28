# Guía de Instalación y Puesta en Marcha: "El_Proyecto"

Esta guía detalla los pasos necesarios para configurar y ejecutar localmente el proyecto.

## 🛠️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu sistema:
- **Node.js** (versión 18 o superior recomendada).
- **MySQL Server** (y opcionalmente una herramienta de gestión como phpMyAdmin, DBeaver o MySQL Workbench).
- **Git** (opcional, para control de versiones).

---

## 🗄️ Paso 1: Configuración de la Base de Datos

El proyecto utiliza MySQL como base de datos. En la raíz del proyecto encontrarás el archivo `proyecto.sql` que contiene la estructura y los datos iniciales.

1. Abre tu gestor de base de datos MySQL.
2. Crea una base de datos nueva llamada `proyecto`:
   ```sql
   CREATE DATABASE proyecto;
   ```
3. Importa el archivo `proyecto.sql` dentro de esta nueva base de datos.
   - *Si usas línea de comandos:* `mysql -u root -p proyecto < proyecto.sql`

---

## ⚙️ Paso 2: Configuración del Backend (Servidor)

El backend está construido con **Node.js** y **Express**.

1. Abre una terminal y navega a la carpeta `backend`:
   ```bash
   cd backend
   ```
2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```
3. Revisa el archivo de configuración `.env` ubicado en la carpeta `backend`. Debería verse similar a esto:
   ```env
   PUERTO=3000
   NODE_ENV=Desarrollo
   ORIGENES_PERMITIDOS=http://localhost:5173,http://localhost:5174
   BD_HOST=localhost
   BD_USER=root
   BD_PASSWORD=30493727   # <-- Cambia esto por tu contraseña de MySQL si es diferente
   BD_NAME=proyecto
   BD_PORT=3306
   ACCESS_TOKEN_SECRET=6ea1339a-ec11-429f-9cf5-92dce85b2dcf
   REFRESH_TOKEN_SECRET=10b3b9d6-8533-47f9-b3fc-88304d8ae6ad
   JWT_ACCESS_EXPIRES_IN=24h
   JWT_REFRESH_EXPIRES_IN=7d
   ```
   > **[!IMPORTANT]**
   > Asegúrate de que `BD_USER` y `BD_PASSWORD` coincidan con las credenciales de tu instalación local de MySQL.

4. Inicia el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```
   *El servidor debería estar corriendo ahora en `http://localhost:3000`.*

---

## 🎨 Paso 3: Configuración del Frontend (Cliente)

El frontend es una aplicación de **React** construida con **Vite** y **TailwindCSS**.

1. Abre una **nueva** terminal (manteniendo la del backend abierta) y navega a la carpeta `frontend`:
   ```bash
   cd frontend
   ```
2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```
3. Inicia la aplicación en modo desarrollo:
   ```bash
   npm run dev
   ```
   *Vite levantará el servidor de desarrollo, típicamente en `http://localhost:5173`.*

---

## 🚀 Paso 4: ¡A probar!

1. Abre tu navegador web.
2. Ingresa a la URL que te proporcionó Vite (usualmente `http://localhost:5173`).
3. ¡El proyecto debería estar funcionando y conectándose a tu base de datos local!

> **[!NOTE]**
> En el código del frontend (`src/compartidos/api/axios.config.js`), la URL de conexión a la API está configurada por defecto apuntando a `http://localhost:3000/api`. Si por alguna razón cambiaste el puerto del backend, deberás actualizar ese archivo para que coincida.
