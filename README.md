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



## 🚀 Puesta en Marcha



## Diagrama Base de Datos

#### Hecha con DBeaver


![Diagrama Base de Datos](https://github.com/SebaGut2103/Proyecto_BACK-FRONT_SpringBoot_GutierrezJuan_DiazOscar/blob/main/img/DiagramaBaseDeDatos.png)






## 📜 Índice

1.  [Características Principales](#-características-principales)
2.  [Tecnologías Utilizadas](#️-tecnologías-utilizadas)
3.  [Puesta en Marcha (Local)](#-puesta-en-marcha-local)
    * [Requisitos Previos](#1-requisitos-previos)
    * [Configuración del Backend](#2-configuración-del-backend)
    * [Configuración del Frontend](#3-configuración-del-frontend)
4.  [Documentación de la API](#-documentación-de-la-api)
    * [Acceso a Swagger](#acceso-a-swagger)
    * [Endpoints Detallados](#endpoints-detallados)
5.  [Autores](#-autores)

## ✨ Características Principales

* **Gestión de Producción**: Registro y seguimiento de lotes de producción, control de inventario en tiempo real y gestión de lotes defectuosos.
* **Gestión de Pedidos**: Permite a los clientes realizar pedidos, valida la disponibilidad de stock y actualiza el inventario automáticamente.
* **Gestión de Clientes**: Administración de la información de los clientes y consulta de su historial de pedidos.
* **Seguridad Basada en Roles**:
    * **ADMINISTRADOR**: Acceso total al sistema.
    * **OPERADOR**: Gestiona el inventario y los pedidos.
    * **CLIENTE**: Puede realizar pedidos y ver su historial.
* **Reportes Visuales**: Gráficos para visualizar ventas por producto, por cliente y estado del inventario.
* **API RESTful Segura**: Endpoints protegidos mediante Spring Security y JSON Web Tokens (JWT).

## 🛠️ Tecnologías Utilizadas

### Backend
* Java 17
* Spring Boot 3.5.0
* Spring Web, Spring Data JPA, Spring Security
* Maven
* MySQL
* JSON Web Tokens (JWT)
* Swagger (OpenAPI) para documentación

### Frontend
* React (con Vite)
* MUI (Material-UI)
* Axios
* Chart.js

## 🚀 Puesta en Marcha (Local)

Sigue estos pasos para configurar y ejecutar el proyecto completo en tu entorno de desarrollo.

### 1. Requisitos Previos

* JDK 17 o superior.
* Apache Maven.
* Node.js y npm.
* Un servidor de base de datos MySQL.
* Un editor de código como IntelliJ IDEA o VS Code.

### 2. Configuración del Backend

1.  **Clona el repositorio** y abre la carpeta del backend (`atunes_proyecto_del_pacifico_s`).

2.  **Crea la Base de Datos**: Conéctate a tu servidor MySQL y crea la base de datos.
    ```sql
    CREATE DATABASE atunes_pacifico_db;
    ```
3.  **Puebla la Base de Datos**: Ejecuta el script SQL que creamos para generar todas las tablas, relaciones y datos de ejemplo (usuarios, roles, etc.).

4.  **Configura la Conexión**: Abre el archivo `src/main/resources/application.properties` y asegúrate de que las credenciales de tu base de datos sean correctas.
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/atunes_pacifico_db?useSSL=false&serverTimezone=UTC
    spring.datasource.username=root
    spring.datasource.password=tu_contraseña_secreta
    ```
5.  **Ejecuta el Backend**: Desde la terminal, en la raíz del proyecto backend, ejecuta:
    ```bash
    mvn spring-boot:run
    ```
    El servidor backend estará corriendo en `http://localhost:8080`.

### 3. Configuración del Frontend

1.  **Abre una nueva terminal** en la carpeta del frontend (`atunes-pacifico-ui`).

2.  **Instala las dependencias**:
    ```bash
    npm install
    ```

3.  **Ejecuta el Frontend**:
    ```bash
    npm run dev
    ```
    La aplicación de React estará disponible en `http://localhost:5173`.

## 📖 Documentación de la API

La API está documentada de dos maneras: de forma interactiva con Swagger y con esta descripción estática.

### Acceso a Swagger

Una vez que el backend esté en ejecución, puedes acceder a la documentación interactiva de la API, donde podrás ver todos los endpoints y probarlos directamente.

* **URL de Swagger UI**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

### Endpoints Detallados

#### Autenticación (`/api/v1/auth`)

* **`POST /login`**
    * **Descripción**: Autentica a un usuario y devuelve un token JWT.
    * **Acceso**: Público.
    * **Request Body**: `{ "nombreUsuario": "admin", "contrasena": "password123" }`
    * **Respuesta Exitosa (200 OK)**: `{ "token": "ey..." }`

#### Usuarios (`/api/v1/usuarios`)

* **`GET /`**
    * **Descripción**: Obtiene una lista de todos los usuarios.
    * **Acceso**: `ADMINISTRADOR`.
* **`POST /`**
    * **Descripción**: Registra un nuevo usuario.
    * **Acceso**: `ADMINISTRADOR`.

#### Pedidos (`/api/v1/pedidos`)

* **`POST /`**
    * **Descripción**: Crea un nuevo pedido para el cliente autenticado.
    * **Acceso**: `CLIENTE`.
    * **Request Body**: `{ "fechaEntrega": "2025-12-31", "detalles": [{ "loteId": 1, "cantidad": 100 }] }`
* **`GET /historial`**
    * **Descripción**: Obtiene el historial de pedidos del cliente autenticado.
    * **Acceso**: `CLIENTE`.

#### Inventario (`/api/v1/lotes`)

* **`GET /`**
    * **Descripción**: Obtiene una lista de todos los lotes de producción (inventario).
    * **Acceso**: `ADMINISTRADOR`, `OPERADOR`, `CLIENTE`.
* **`POST /`**
    * **Descripción**: Registra un nuevo lote de producción.
    * **Acceso**: `ADMINISTRADOR`, `OPERADOR`.
* **`PATCH /{id}/marcar-defectuoso`**
    * **Descripción**: Cambia el estado de un lote a "Defectuoso".
    * **Acceso**: `ADMINISTRADOR`, `OPERADOR`.

#### Reportes (`/api/v1/reportes`)

* **`GET /ventas-por-producto`**
    * **Descripción**: Devuelve datos agregados de ventas por tipo de producto.
    * **Acceso**: `ADMINISTRADOR`.
* **`GET /ventas-por-cliente`**
    * **Descripción**: Devuelve datos agregados de ventas por cliente.
    * **Acceso**: `ADMINISTRADOR`.
* **`GET /inventario`**
    * **Descripción**: Devuelve un resumen del estado del inventario (disponible, vendido, etc.).
    * **Acceso**: `ADMINISTRADOR`.



## informacion adicional Base de Datos Insert en LOCAL

### Roles

-- Insertar los roles del sistema
INSERT INTO `rol` (`id`, `nombre`) VALUES
(1, 'ROLE_ADMINISTRADOR'),
(2, 'ROLE_OPERADOR'),
(3, 'ROLE_CLIENTE');


### Actualización de Roles

-- actualiza aqui 
UPDATE rol SET nombre = 'ADMINISTRADOR' WHERE id = 1;
UPDATE rol SET nombre = 'OPERADOR' WHERE id = 2;
UPDATE rol SET nombre = 'CLIENTE' WHERE id = 3;


### Insert de Clientes

INSERT INTO `clientes` (`id`, `nombre`, `ruc`, `email`, `telefono`, `direccion`, `estado`, `usuario_id`) VALUES
(1, 'Distribuidora XYZ', '20601234567', 'compras@distribuidoraxyz.com', '987654321', 'Av. Principal 123, Lima', 'Activo', 3);


### Actualización Contraseñas Por si hay problemas

UPDATE usuario 
SET contrasena = '$2a$10$wTtqpixryPHf7A36WNRzdO5Dr.5aho/SNTylNRE5Z4qVk.rSTncJ.' 
WHERE nombre_usuario = 'operador1' OR nombre_usuario = 'distribuidora_xyz';



## Importante Contraseña Estandar 
#### Si presenta algun problema Actualizar

-- Insertar los usuarios de prueba con la contraseña encriptada
### Insert Usuario
INSERT INTO `usuario` (`id`, `nombre_usuario`, `email`, `contrasena`, `rol_id`, `esta_activo`) VALUES
(1, 'admin', 'admin@atunes.com', '$2a$10$GiseSuhL2s32I4KA5T5iBuIign22inyyQLs0i2sD6g/4NK2k9CqEW', 1, 1),
(2, 'operador1', 'operador1@atunes.com', '$2a$10$GiseSuhL2s32I4KA5T5iBuIign22inyyQLs0i2sD6g/4NK2k9CqEW', 2, 1),
(3, 'distribuidora_xyz', 'compras@distribuidoraxyz.com', '$2a$10$GiseSuhL2s32I4KA5T5iBuIign22inyyQLs0i2sD6g/4NK2k9CqEW', 3, 1);


### Actualización si hay problemas de credenciales 
##### Se actualiza Rol admin, cliente y Operador
-- Actualiza aqui
### Actualización si hay problemas de credenciales 
UPDATE usuario 
SET contrasena = '$2a$10$wTtqpixryPHf7A36WNRzdO5Dr.5aho/SNTylNRE5Z4qVk.rSTncJ.' 
WHERE nombre_usuario = 'admin';

## 👨‍💻 Autores

* **Juan Gutiérrez**
* **Oscar Diaz**