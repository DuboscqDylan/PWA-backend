# PWA-backend


## 🚀 Instalación y ejecución

1. Ingresar a la carpeta del proyecto:

```bash
cd PWA-backend
```

2. Instalar las dependencias:

```bash  
npm install
npm install express
npm install cors
npm install -D nodemon
```

3. Ejecutar el servidor en modo desarrollo:
   
```bash 
   npm run dev
```

4. Verificar que el servidor esté funcionando:
   
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
* Cors: Permite solicitudes desde otros dominios (frontend).
* Nodemon: Reinicia automáticamente el servidor al detectar cambios.