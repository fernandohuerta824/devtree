# 🌳 DevTree (en desarrollo)

DevTree será un clon de Linktree: una plataforma que permitirá a los usuarios crear una página pública con enlaces personalizados a sus redes sociales y contenido.

Actualmente, este proyecto está en desarrollo.

---

## 🧠 Descripción del proyecto

El objetivo es construir una aplicación fullstack con autenticación, creación de perfiles, subida de imágenes y ordenamiento dinámico de enlaces.

Permitirá:

- Registro e inicio de sesión
- Personalización de perfil (nombre, foto, descripción)
- Agregar enlaces a redes sociales
- Compartir una página pública con tu "devtree"

---

## 📦 Stack Tecnológico (planeado)

- **Frontend:** React, Tailwind CSS, React Router (posiblemente migrar a Next.js en futuros proyectos)
- **Backend:** Node.js + Express
- **Base de datos:** MongoDB con Mongoose
- **Gestión de datos:** React Query
- **Autenticación:** JWT (JSON Web Token)
- **Almacenamiento de imágenes:** Cloudinary


## 💻 Backend

En este repositorio es donde se encuentra y se desarrollará el backend de la aplicación, por lo tanto el codigo del backend esta en otro repositorio. El backend se desarrollará con Node.js y Express, y se conectará a una base de datos MongoDB a través del ODM Mongoose. Como hosting de la base de datos se utilizará MongoDB Atlas. El backend proporcionará una API RESTful para alimentar la comunicación con el frontend, se encargará de la autenticación de usuarios, subida de imágenes, autenticación y autorización, y la gestión de enlaces. 

## 💻 Frontend

El frontend se desarrollará en un **repositorio separado**, utilizando React y Tailwind CSS. Se conectará a esta API.

> 🔗 [Repositorio del frontend](#) _(próximamente disponible)_

## 🚀 Instalación
1. Clona el repositorio:
   ```bash
   git clone
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto y agrega las variables de entorno necesarias (ejemplo: `MONGODB_URI`, `JWT_SECRET`, etc.). Puedes usar el archivo `.env.example` como referencia.

4. Inicia el servidor:
   ```bash
   npm dev
   ```
5. Ahore puedes acceder a la API en `http://localhost:8080` y enviar peticiones a los endpoints disponibles. Puedes usar Postman o cualquier otra herramienta para probar la API o usar el cliente de React que se desarrollará en el otro repositorio.


## 🚧 Estado Actual (RoadMap)

- [x] Inicializar el repositorio
- [x] Configurar el entorno de desarrollo
- [x] Añadir la conexión a la base de datos
- [x] Crear el modelo de usuario
- [x] Establecer las primeras rutas de la API
- [x] Permitir el registro de usuarios
- [ ] Añadir la autenticación de usuarios

Se añadiran más tareas a medida que se avance en el desarrollo del proyecto.

---
 
## 📂 Estructura del proyecto

```bash
├── src/ # Código fuente del proyecto
│   ├── index.js # Punto de entrada de la aplicación
│   ├── models/ # Modelos de Mongoose
│   ├── routes/ # Rutas de la API
│   ├── controllers/ # Controladores de las rutas
│   ├── middlewares/ # Middlewares de Express
│   ├── config/ # Configuración de la aplicación
│   ├── utils/ # Funciones utilitarias
│   ├── types/ # Tipos de datos
├── .env.example # Ejemplo de archivo .env
├── .gitignore # Archivos y carpetas a ignorar por git
├── package.json # Dependencias y scripts del proyecto
└── README.md # Documentación del proyecto
```

## 🧑🏾 Autor
- **Fernando Huerta** - [https://github.com/fernandohuerta824]




