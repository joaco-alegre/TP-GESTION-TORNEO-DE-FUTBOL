# Goal Manager - Gestor de Torneos de Fútbol ⚽

Este proyecto es una *Single Page Application (SPA)* desarrollada con *Angular* para la gestión integral de torneos de fútbol. El sistema permite centralizar el seguimiento de torneos, equipos y jugadores, ofreciendo una interfaz moderna y dinámica tanto para el hincha como para los administradores.
El proyecto fue realizado como trabajo práctico final para la materia Programación IV de la Universidad Tecnológica Nacional, Facultad Regional de Mar del Plata.

## Características Principales

El sistema está diseñado con una arquitectura modular y responsive, atendiendo las necesidades de tres tipos de usuarios principales:

### Roles de Usuario

#### 👤 Hincha (Público General)
* *Visualización:* Consultar listados de torneos, equipos, jugadores y DTs.
* *Detalles:* Acceder a información detallada de cada entidad (fixture, estadísticas, noticias).
* *Interacción:* Visualización de noticias y formulario de contacto/feedback.
* *Experiencia:* Interfaz adaptada a dispositivos móviles y soporte multi-idioma (Español/Inglés).

#### Administrador (ADMIN) 🛡
* *Gestión Total:* CRUD completo (Crear, Leer, Actualizar, Eliminar) de torneos, equipos, jugadores, DTs y noticias.
* *Organización:* Asignación de equipos a torneos y jugadores a equipos.
* *Gestión de Fixtures:* Modificación de fechas, horarios y carga de resultados (goles).
* *Seguridad:* Acceso restringido mediante autenticación y validación de roles (Guards).

#### Director Técnico (DT) 📋
* *Gestión de Equipo:* Visualización y administración de los datos de su propio equipo y plantilla de jugadores.
* *Autenticación:* Acceso seguro mediante Login dedicado.

## Tecnologías Utilizadas 🛠

El frontend fue construido utilizando tecnologías modernas y librerías específicas para mejorar la experiencia de usuario (UX/UI):

* *Framework:* Angular (TypeScript).
* *Estilos y Diseño:* Bootstrap, CSS3 (Diseño Responsive).
* *Internacionalización:* ngx-translate para cambio dinámico de idioma (ES/EN).
* *Animaciones:* AOS (Animate On Scroll) para efectos visuales al desplazar la pantalla.
* *Simulación de Backend:* json-server (para simular la persistencia de datos y autenticación en esta entrega).
* *Gestión de Imágenes:* Integración con API externa (ImgBB) para almacenamiento de fotos.

## Arquitectura del Sistema 🏗 

El frontend de la aplicación fue diseñado con una *arquitectura modular* en Angular. Esto nos permite separar claramente las responsabilidades, mejorar la organización del código y facilitar la escalabilidad del proyecto. La estructura se divide en:

* *CoreModule:* Provee servicios transversales únicos para toda la aplicación, como la autenticación (AuthService) y la configuración de traducciones (TranslateService).
* *PublicModule:* Contiene todos los componentes visuales y de navegación destinados al usuario final ("Hincha"), como listados de torneos y vistas de detalles.
* *AdminModule:* Agrupa los componentes de gestión y administración (ABM), accesibles únicamente para usuarios con rol de Administrador.
* *SharedModule:* Módulo para componentes reutilizables y elementos comunes en distintas partes de la aplicación.

## Decisiones de Diseño (ADRs) 💡 

Para resolver desafíos técnicos específicos y cumplir con los plazos de entrega, el equipo documentó y adoptó las siguientes decisiones clave:

1.  *Internacionalización:*
    * *Decisión:* Se implementó la librería *ngx-translate*.
    * *Motivo:* A diferencia de la solución nativa de Angular, esta librería permite cambiar el idioma (Español/Inglés) en tiempo real y de forma dinámica sin necesidad de recargar la página ni generar builds separados.

2.  *Entorno de Ejecución y Datos:*
    * *Decisión:* Implementación de un *Backend Simulado con json-server*.
    * *Motivo:* Originalmente el proyecto consumía una API REST en Java Spring Boot. Debido a riesgos de integración detectados cerca de la fecha de entrega, se optó por simular la persistencia y la autenticación en el frontend. Esto garantiza que el profesor pueda probar todos los flujos funcionales (Login, ABMs, Listados) sin depender del despliegue del servidor Java.

## Instalación y Puesta en Marcha 🚀

Sigue estos pasos para ejecutar el proyecto en tu entorno local. Es necesario levantar tanto el cliente Angular como el servidor de datos simulado.

### Prerrequisitos
* Node.js y NPM instalados.
* Angular CLI (npm install -g @angular/cli).

### Pasos

1.  *Clonar el repositorio:*
    bash
    git clone [https://github.com/joaco-alegre/TP-GESTION-TORNEO-DE-FUTBOL.git](https://github.com/joaco-alegre/TP-GESTION-TORNEO-DE-FUTBOL.git)
    cd TP-GESTION-TORNEO-DE-FUTBOL
    

2.  *Instalar dependencias:*
    bash
    npm install
    

3.  *Iniciar el servidor de datos (Json-Server):*
    Abrir una terminal y ejecutar el comando para levantar la API simulada (asegurarse de estar en la raíz o carpeta correcta donde está el db.json):
    bash
    json-server --watch db.json
    

4.  *Iniciar la aplicación Angular:*
    En una nueva terminal, ejecutar:
    bash
    ng serve 
    
    La aplicación se abrirá automáticamente en http://localhost:4200/.

    ## Autores 👨‍💻

* *Alegre, Joaquin*
* *Bettinelli, Marcos*
* *Bustos, Facundo*

---
UTN Mar del Plata - 2025
