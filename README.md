# Sistema de Gestión para Atunes del Pacífico S.A.

Este proyecto es un sistema de gestión integral desarrollado para la empresa "Atunes del Pacífico S.A.". La aplicación permite administrar las operaciones de la empresa, desde la producción y el control de inventario de productos de atún, hasta la gestión de clientes, pedidos y ventas.

El backend está construido con **Spring Boot** y sigue las mejores prácticas de seguridad utilizando Spring Security con JWT para la autenticación y autorización basada en roles.

## 📜 Características Principales

* **Gestión de Producción**: Registro y seguimiento de lotes de producción, control de inventario en tiempo real y gestión de lotes defectuosos.
* **Gestión de Pedidos**: Permite a los clientes realizar pedidos, valida la disponibilidad de stock y actualiza el inventario automáticamente.
* **Gestión de Clientes**: Administración de la información de los clientes y consulta de su historial de pedidos.
* **Seguridad Basada en Roles**:
    * **Administrador**: Acceso total al sistema, incluida la gestión de usuarios.
    * **Operador**: Gestiona el inventario y los pedidos.
    * **Cliente**: Puede realizar pedidos y ver su historial.
* **API RESTful Segura**: Endpoints protegidos mediante Spring Security y JSON Web Tokens (JWT).
* **Documentación de API**: Documentación interactiva y automática de los endpoints con Swagger.

## 🛠️ Tecnologías Utilizadas

### Backend
* Java 17
* Spring Boot 3.5.0
* Spring Web
* Spring Data JPA
* Spring Security
* Maven
* MySQL
* JSON Web Tokens (JWT) para la autenticación
* Lombok
* Swagger (OpenAPI) para la documentación de la API

### Frontend
* React (para consumir los endpoints del backend)

## 🚀 Puesta en Marcha

Sigue estos pasos para configurar y ejecutar el entorno de desarrollo del backend.

### 1. Requisitos Previos

Asegúrate de tener instalado lo siguiente:
* JDK 17 o superior.
* Apache Maven.
* Un servidor de base de datos MySQL.

### 2. Configuración de la Base de Datos

1.  Conéctate a tu servidor MySQL.
2.  Crea una nueva base de datos para el proyecto.
    ```sql
    CREATE DATABASE atunes_pacifico_db;
    ```
3.  Ejecuta el siguiente script SQL para crear todas las tablas, relaciones y datos de ejemplo necesarios.

    ```sql
    -- Script para crear la estructura completa de la base de datos --
    CREATE TABLE rol (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(50) UNIQUE NOT NULL
    ) ENGINE=InnoDB;

    CREATE TABLE usuario (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nombre_usuario VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        contrasena VARCHAR(255) NOT NULL,
        rol_id INT UNSIGNED NOT NULL,
        esta_activo BOOLEAN NOT NULL DEFAULT TRUE,
        fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        fecha_actualizacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_usuario_rol FOREIGN KEY (rol_id) REFERENCES rol(id)
    ) ENGINE=InnoDB;

    -- ... (resto de las tablas: clientes, lote_produccion, pedido, detalles_pedido) ...
    ```

### 3. Configuración de la Aplicación

1.  Abre el archivo `src/main/resources/application.properties`.
2.  Añade la configuración para conectar el servidor de Spring Boot con tu base de datos. Asegúrate de reemplazar `<tu_usuario>` y `<tu_contraseña>` con tus credenciales de MySQL.

    ```properties
    # Nombre de la aplicación
    spring.application.name=atunes-pacifico-api

    # Configuración del Puerto del Servidor
    server.port=8080

    # Configuración de la Base de Datos (MySQL)
    spring.datasource.url=jdbc:mysql://localhost:3306/atunes_pacifico_db?useSSL=false&serverTimezone=UTC
    spring.datasource.username=<tu_usuario>
    spring.datasource.password=<tu_contraseña>
    spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

    # Configuración de JPA / Hibernate
    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.show-sql=true
    spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
    spring.jpa.properties.hibernate.format_sql=true
    ```

### 4. Ejecutar la Aplicación

1.  Abre una terminal en la raíz del proyecto (`atunes_proyecto_del_pacifico_s`).
2.  Compila el proyecto y ejecuta las pruebas con Maven:
    ```bash
    mvn clean install
    ```
3.  Inicia la aplicación:
    ```bash
    mvn spring-boot:run
    ```
4.  El servidor del backend estará corriendo en `http://localhost:8080`.

## 📖 Uso de la API (Documentación Swagger)

Una vez que la aplicación esté en ejecución, puedes acceder a la documentación interactiva de la API a través de Swagger UI.

* **URL de Swagger**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

Desde esta interfaz podrás ver todos los endpoints disponibles, sus parámetros, y probarlos directamente.

**Endpoints Principales:**
* `POST /api/auth/login`: Para autenticar un usuario y obtener un token JWT.
* `GET /api/pedidos`: Para consultar pedidos (protegido).
* `POST /api/pedidos`: Para crear un nuevo pedido (protegido).
* `GET /api/lotes-produccion`: Para consultar el inventario (protegido).

## 👨‍💻 Autores

* **Juan Gutiérrez**
* **Oscar Diaz**