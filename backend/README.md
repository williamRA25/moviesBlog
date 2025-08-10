# API Blog de Películas

Una API REST completa para un blog de películas desarrollada con Node.js, Express.js y MongoDB.

## Descripción

Esta API permite la gestión completa de un blog de películas, incluyendo usuarios, publicaciones, comentarios y categorías. La aplicación implementa autenticación y autorización para proteger ciertas operaciones.

## Características principales

- Gestión de usuarios con roles (admin, usuario)
- CRUD completo para publicaciones de películas
- Sistema de comentarios
- Gestión de categorías de películas
- Autenticación con JWT
- Autorización basada en roles
- Conexión a MongoDB con Mongoose

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs (para encriptación de contraseñas)
- CORS

## Pre-requisitos 

Para poder iniciar el proyecto es nesesario tener instalado lo siguiente en el PC:  

- **Node.js** versión 20 o superior  
  [Descargar Node.js](https://nodejs.org/es/download)  

- **npm** (incluido con Node.js) o **yarn** como gestor de paquetes  

- **MongoDB** (local o en la nube, por ejemplo, [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))  
  [Descargar MongoDB](https://www.mongodb.com/try/download/community)  

- Crear una base de datos en mongodb que se llame `movies_blog` 

- **Git** (para clonar el repositorio)  
  [Descargar Git](https://git-scm.com/downloads)  

**Opcional pero recomendado:**  
- **Postman** para probar los endpoints de la API. [Descargar postman](https://www.postman.com/downloads/)  
- **Editor de código** como [Visual Studio Code](https://code.visualstudio.com/).  



## iniciar el proyecto

1. Clonar el repositorio:
```bash
git clone https://github.com/williamRA25/moviesBlog.git
cd moviesBlog
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
PORT=3001
MONGODB_URI="mongodb://william:william123@localhost:27017/movies_blog"
CLIENT_URL=http://localhost:4200
JWT_SECRET=mysupersecret
```
O copiar el contenido del archivo [.env.example](./.env.example) al archivo `.env`

4. Iniciar el servidor:
```bash
npm start
```

El servidor se ejecutará en `http://localhost:3001`

## Documentacion del uso de la API
[https://documenter.getpostman.com/view/47434181/2sB3BEnA71](https://documenter.getpostman.com/view/47434181/2sB3BEnA71)