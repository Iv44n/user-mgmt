
# Proyecto Full Stack con React y Node.js

## Descripción

Este proyecto es una aplicación full stack que combina **React** para el frontend y **Node.js** para el backend. La aplicación está organizada en dos secciones principales:

- **`client`**: Contiene la interfaz de usuario construida con React.
- **`server`**: Administra la lógica del servidor y la API utilizando Node.js.

## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto localmente.

### Clonar el Repositorio

Primero, clona el repositorio en tu máquina local:

```bash
git clone https://github.com/Iv44n/user-mgmt.git
```

### Instalar Dependencias

Accede a cada carpeta del proyecto para instalar las dependencias necesarias:

1. **Para el frontend (React)**:

    ```bash
    cd client
    npm install
    ```

2. **Para el backend (Node.js)**:

    ```bash
    cd ../server
    npm install
    ```

### Configurar Variables de Entorno

Accede a la carpeta `server` y crea un archivo `.env` para definir las variables de entorno necesarias:

- `MONGODB_URI`: URL de conexión a la base de datos MongoDB.
- `PORT`: Puerto en el que el servidor escuchará las solicitudes.

Ejemplo de archivo `.env`:

```
MONGODB_URI=mongodb://localhost:27017/tu-base-de-datos
PORT=5000
```

## Uso

Para iniciar el proyecto, sigue estos pasos:

1. **Iniciar el backend**:

    Navega a la carpeta `server` y ejecuta:

    ```bash
    npm run dev
    ```

2. **Iniciar el frontend**:

    Navega a la carpeta `client` y ejecuta:

    ```bash
    npm run dev
    ```

El frontend estará disponible en `http://localhost:3000` (o el puerto que hayas configurado) y el backend en `http://localhost:5000` (o el puerto configurado en las variables de entorno).