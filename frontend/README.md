# Frontend Blog de Películas

Una aplicación web moderna desarrollada con Angular 17, esta aplicación consume la API REST del backend para proporcionar una interfaz de usuario completa e intuitiva.

## Descripción

Este frontend permite a los usuarios navegar por un blog de películas con funcionalidades de filtro por categoria y busqueda por termino. 

## Tecnologías utilizadas

- **Angular 17** - Framework principal
- **TypeScript** - Lenguaje de programación
- **Bootstrap** - UI Components
- **RxJS** - Programación reactiva
- **Angular Router** - Navegación
- **HttpClient** - Comunicación con la API
- **Angular CLI** - Herramientas de desarrollo

## Pre-requisitos

Para poder ejecutar el proyecto es necesario tener instalado lo siguiente:

- **Node.js** versión 18 o superior  
  [Descargar Node.js](https://nodejs.org/es/download)
- **npm** (incluido con Node.js) o **yarn** como gestor de paquetes
- **Angular CLI** versión 17  
  ```bash
  npm install -g @angular/cli@17
  ```
- **Git** para clonar el repositorio  
  [Descargar Git](https://git-scm.com/downloads)

## Instalación y configuración

1. **Clonar el repositorio:**
```bash
git clone https://github.com/williamRA25/moviesBlog.git
cd moviesBlog/frontend
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Iniciar el servidor de desarrollo:**
```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200`

## Funcionalidades principales

- Ver lista de publicaciones 
- Ver una publicación
- Filtrar por categoria
- Buscar por terminos 

## Conexión con el Backend

Asegúrate de que el backend esté ejecutándose en `http://localhost:3001` antes de iniciar el frontend. La comunicación se realiza através de servicios Angular que consumen la API REST.

## Colaboradores

- WILLIAM RODRIGUEZ AVILA
- RONAL LUIS AVILA NORIEGA

## Documentación adicional

- [Documentación del Backend](../backend/README.md)
- [API Documentation](https://documenter.getpostman.com/view/47434181/2sB3BEnA71)
- [Angular Documentation](https://angular.io/docs)
