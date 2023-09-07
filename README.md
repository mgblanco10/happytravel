# Grupo Contento: Happy Travel 
<div align="center">
   <img src="./react-app/src/assets/logo.svg" width="180px">
</div>

## Transformación de Proyecto Monolítico a Arquitectura de API con Autenticación y CRUD

**Proyecto de Mejora del Bootcamp FemCoders - Grupo Contento**

En el marco del bootcamp de desarrollo fullstack de FemCoders, se ha abordado la tarea de optimizar y reestructurar un proyecto previamente creado por:
- https://github.com/genesis-nf
- https://github.com/florienborg
- https://github.com/CindyLeiva
- https://github.com/mgblanco10
 <br>Este proyecto original, fue realizado utilizando el patrón Modelo-Vista-Controlador (MVC) en el framework Laravel.

### Objetivo del Proyecto:
El objetivo central de esta mejora es evolucionar el proyecto monolítico existente hacia una arquitectura de API más flexible y eficiente. Para lograrlo, se han realizado cambios sustanciales tanto en el backend como en el frontend del sistema, con un enfoque en la modularidad, la seguridad y la usabilidad.

**Cambios Realizados:**

**Backend:**
- La arquitectura monolítica basada en el patrón MVC ha sido reemplazada por una API RESTful implementada en Laravel.
- Se ha incorporado un sólido sistema de autenticación utilizando tokens, garantizando la seguridad de las interacciones entre los usuarios y la aplicación.
- La funcionalidad CRUD (Crear, Leer, Actualizar, Eliminar) se ha rediseñado y reconfigurado en endpoints de la API, permitiendo una gestión más eficaz de los destinos.   
- Se ha implementado el manejo de roles con las bibliotecas Sanctum y Spatie, optimizando la gestión de permisos y accesos.
- Se ha priorizado la creación de un perfil de usuario como tarea de máxima prioridad, donde se puede cambiar la imagen del perfil.
Esto garantiza un enfoque claro en las funcionalidades más importantes del sistema.
- Aún en progreso el tema favoritos y la implementación de una galeria donde el usuario puede ver todo lo que el ha cargado y sus favoritos.
<img src="https://img.shields.io/badge/STATUS-EN%20DESAROLLO-green">
  

**Frontend:**
- El frontend original ha sido reescrito en React, proporcionando una experiencia de usuario más fluida e interactiva.
- Se ha establecido la comunicación con la API a través de solicitudes HTTP, permitiendo el consumo y manipulación de datos de destino de manera dinámica.

### 🛠 Tecnologías Utilizadas
<div>
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/>
<img src="https://profilinator.rishav.dev/skills-assets/css3-original-wordmark.svg" alt="CSS3" height="50" />  
<img src="https://profilinator.rishav.dev/skills-assets/bootstrap-plain.svg" alt="react" width="40" height="40"/>
<img src="https://raw.githubusercontent.com/jmnote/z-icons/master/svg/php.svg" alt="php" width="40" height="40"/>
<img src="https://profilinator.rishav.dev/skills-assets/mysql-original-wordmark.svg" alt="react" width="40" height="40"/>
<img src="https://profilinator.rishav.dev/skills-assets/laravel-plain-wordmark.svg" alt="Laravel" width="40" height="40"/>
<img src="https://profilinator.rishav.dev/skills-assets/react-original-wordmark.svg" alt="React" width="40" height="40" />
<img  src="https://profilinator.rishav.dev/skills-assets/javascript-original.svg" alt="JavaScript" width="40" height="50" /> 
</div>

### 🛠 Herramientas Utilizadas
<div>
<img src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg" alt="figma" width="40" height="40"/>
<img src="https://w7.pngwing.com/pngs/512/824/png-transparent-visual-studio-code-hd-logo-thumbnail.png" alt="vscode" width="40" heigth="40"/>
<img src="https://w7.pngwing.com/pngs/115/721/png-transparent-trello-social-icons-icon.png" alt="trello" width="40" heigth="40"/>
<img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/>
<img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="github" width="40" heigth="40"/>
<img src="https://profilinator.rishav.dev/skills-assets/xampp.png" alt="xampp" width="40" height="40"/>
<img src="https://www.pngkey.com/png/detail/802-8025481_mamp-mamp-icon.png" alt="mamp" width="40" height="40"/>
<img src="https://res.cloudinary.com/postman/image/upload/t_team_logo/v1629869194/team/2893aede23f01bfcbd2319326bc96a6ed0524eba759745ed6d73405a3a8b67a8" alt="postman" width="40" height="40"/>
<img src="https://spin.atomicobject.com/wp-content/uploads/insomnia.jpg" alt="insonnia" width="60" height="40"/>
</div>
### 🛠 Otros paquetes utilizados
<div>
<img src="https://miro.medium.com/v2/resize:fit:640/0*r3O0lVqhmhgql4Co.png" alt="Sanctum" width="60" height="40"/>
<img src="https://spatie.be/images/og-image.jpg" alt="spatie" width="60" height="40"/>
</div>

### Instrucciones de Uso
Para utilizar esta nueva versión del proyecto , sigue las instrucciones, para ejecutarlo necesitas tener conocimientos previos sobre como funciona Mamp/Xamp y tener instalado composer.

**Instalación del Proyecto Backend Laravel**
 1. Clona el repositorio de Laravel desde GitHut
 `https://github.com/mgblanco10/happytravel.git`
 2. Abre el proyecto en tu editor de código y en la terminal ingresa al directorio del proyecto
 `cd laravel`
 3. Instala las dependencias de Composer
 `composer install`
 4. Crea un archivo .env a partir del archivo .env.example.
 5. Configura tu base de datos en el archivo .env con la información adecuada, donde debes poner el nombre de tu base de datos previamente creada en mysql y tener claro cual es tu sistema operativo para la instalación.Ejemplo:
 `DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nombre_base_de_datos
DB_USERNAME=nombre_usuario
DB_PASSWORD=contraseña`
6. Ejecuta las migraciones para crear las tablas de la base de datos
`php artisan migrate`
  - Si deseas ya tener información en tu base de datos te recomendamos hacer uso de los seeders, para eso debes ejecutar el comando
  `php artisan db:seed`
7. Inicia el servidor de desarrollo
`php artisan serve`

**Instalación del Proyecto Frontend React**

1. ingresa al directorio del proyecto
 `cd react-app`
2. 
<img src="https://img.shields.io/badge/STATUS-EN%20DESAROLLO-green">


## Mockups

#### Atomic Design
<img src="./react-app/src/assets/atomic-desing.png" width=900px>

#### Versión Desktop
<img src="./react-app/src/assets/desktop.png" width=900px>

#### Versión Mobile
<img src="./react-app/src/assets/version-mobile.png" width=900px>

### Contribuciones y Feedback
Este proyecto es una muestra del proceso de aprendizaje y mejora continua. Si tienes sugerencias para mejoras adicionales o encuentras problemas, no dudes en abrir un issue o enviar una pull request. Tu contribución es valiosa para nosotros.

---

## Developers
  [<img src="https://avatars.githubusercontent.com/u/126439762?v=4" width=115><br><sub>Yana Tolstobrova</sub>](https://github.com/yana-tolstobrova) | [<img src="https://avatars.githubusercontent.com/u/131767553?v=4" width=150><br><sub>Rosa Pedret</sub>](https://github.com/Rosapedret2) |  [<img src="https://avatars.githubusercontent.com/u/131244871?v=4" width=150><br><sub>Cindy Leiva</sub>](https://github.com/CindyLeiva) | [<img src="https://avatars.githubusercontent.com/u/106617302?v=4" width=115><br><sub>Neema Shedevops</sub>](https://github.com/shedevopsbcn)| [<img src="https://avatars.githubusercontent.com/u/107352744?v=4" width=150><br><sub>Mónica Blanco</sub>](https://github.com/mgblanco10)| [<img src="https://avatars.githubusercontent.com/u/79811065?v=4" width=150><br><sub>Génesis Núñez</sub>](https://github.com/genesis-nf) | 
| :---: | :---: | :---: | :---: | :---: | :---: | 


## Recursos
- [Crear Api Rest](https://www.youtube.com/watch?v=XH2x8kAzzKQ&list=PLAXHw-BiDq2qtHnYMHhEuOomdIg--mDRy)

- [Sanctum](https://www.youtube.com/watch?v=fsiPXKzcH2M&t=1331s)

- [CRUD Laravel 10](https://www.youtube.com/watch?v=MJp8ycjNW5s)
