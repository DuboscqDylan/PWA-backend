# PWA-backend

Backend de la aplicación desarrollado con Node.js, Express, Prisma ORM y PostgreSQL.

## 🚀 Instalación y ejecución

1. Ingresar a la carpeta del proyecto:

```bash
cd PWA-backend
```

2. Instalar las dependencias:

Express:
```bash  
npm install
npm install express
npm install cors
npm install -D nodemon
```   
Prisma:
```bash 
   npm install @prisma/client dotenv
   npm install @prisma/adapter-pg pg
   npx prisma init
```

3. Configurar variables de entorno:

Crear un archivo .env en la raíz del proyecto:

```bash 
  DATABASE_URL="postgresql://neondb_owner:usuario:password@host:5432/database"
```

4. Generar el cliente Prisma:
   
```bash
  npx prisma generate
```
5. Ejecutar el servidor en modo desarrollo:
   
```bash 
   npm run dev
```

6. Verificar que el servidor esté funcionando:
   
```bash  
   http://localhost:3000/health
```

Respuesta esperada:

```json 
{
  "status": "ok"
}
```

## 📦 Dependencias principales

* Express: Framework para crear la API REST.
* Prisma ORM: Acceso y gestión de la base de datos.
* PostgreSQL: Sistema gestor de base de datos.
* Cors: Permite solicitudes desde otros dominios (frontend).
* Dotenv: Gestión de variables de entorno.
* Nodemon: Reinicia automáticamente el servidor al detectar cambios.
  
## 📁 Estructura del proyecto

```bash
PWA-backend/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── controllers/
│   ├── lib/
│   ├── middlewares/
│   ├── routes/
│   └── app.js
├── .env
├── package.json
└── server.js
```

## 🛠 Funcionalidades implementadas

* CRUD completo de canciones.
* Gestión de favoritos.
* Integración con PostgreSQL mediante Prisma.
* Middleware global de manejo de errores.
* Middleware para rutas inexistentes (404).
* Validación de datos en solicitudes POST y PUT.
* Respuestas consistentes en formato JSON.
* Soporte para CORS.

## 📡 Endpoints principales

 ### Health Check

```bash
   GET /health
```

 ### Canciones

```bash
   GET /songs
   GET /songs/:id
   POST /songs
   PUT /songs/:id
   DELETE /songs/:id
```

 ### Favoritos

```bash
   GET /favorites
   POST /favorites
   DELETE /favorites/:id
```

## 🔒 Validaciones

Las operaciones de creación y actualización incluyen:

- No se permiten objetos vacíos.
- No se permiten strings vacíos.
- Se devuelve HTTP 400 con mensajes descriptivos cuando los datos son inválidos.
 
## ⚠️ Manejo de errores

El proyecto implementa:

- Middleware global de errores.
- Manejo de rutas inexistentes.
- Respuestas de error consistentes.
- Prevención de caídas del servidor ante errores controlados.

## 🗄 Base de datos

Las entidades incluyen los campos:

- createdAt
- updatedAt

Los timestamps son gestionados automáticamente por Prisma para registrar la fecha de creación y última modificación de cada registro.

## 📷 Nuestra API

<img src="docs/image.png" width="800">
<img src="docs/image2.png" width="800">

## 👩‍💻 Integrantes
    Cyntia Nasabun
    Lucas Gabriel Cerda
    Dylan Duboscq

---

## 📎 Repositorio

    👉 https://github.com/DuboscqDylan/PWA-backend.git

## 📎 Linear

    👉 https://linear.app/pwa-cerda-duboscq/project/tp3-express-6f9dd05b9a8b/overview

## 📎 Vercel

    👉 https://react-tp2-grupo16.vercel.app/