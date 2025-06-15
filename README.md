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