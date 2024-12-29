# Documentación para levantar un front-end Task Manager

## Requisitos previos

- Tener **Node.js** instalado min **v20.18.0**.
- Tener **npm** instalado min **10.8.2**.
- Tener acceso a una terminal o consola de comandos.

## 1. Clonar el repositorio

Primero, debes clonar el repositorio

## 2. Instalar dependencias

Una vez dentro del directorio del proyecto, instala las dependencias necesarias.

Si usas **npm**:

```bash
npm install
```

## 3. Configuración de variables de entorno

Este proyecto utiliza una variable de entorno llamada `NEXT_PUBLIC_API` que define la URL de la API pública. Debes crear un archivo `.env.local` en la raíz del proyecto si aún no existe, y agregar la siguiente configuración:

### Ejemplo de archivo `.env.local`

```env
# URL de la API (usada en el front)
NEXT_PUBLIC_API=http://localhost:3001
```

> **Nota:** Asegúrate de reemplazar el valor de `NEXT_PUBLIC_API` con la URL correcta de la API que estás utilizando.

## 4. Levantar la aplicación

Para levantar el proyecto en desarrollo, ejecuta el siguiente comando:

```bash
npm run dev
```

Esto iniciará el servidor de desarrollo de Next.js. Por defecto, la aplicación estará disponible en la siguiente URL:

```bash
http://localhost:3000
```

> **Nota:** Si deseas cambiar el puerto, puedes hacerlo modificando el archivo `package.json` o configurando el puerto en el archivo `.env.local`.

## 5. Estructura del Proyecto

Este proyecto tiene la siguiente estructura:

```plaintext
/.
├── pages/
│   └── index.js        # Página de inicio
├── public/             # Archivos estáticos
├── .env.local          # Variables de entorno
├── package.json        # Dependencias y scripts
└── README.md           # Documentación
```

### Página de inicio

La única página en este proyecto es la página de inicio, ubicada en `pages/index.js`. Esta página utiliza la variable de entorno `NEXT_PUBLIC_API` para realizar solicitudes a la API definida en el archivo `.env.local`.

## 6. Comandos adicionales

A continuación, algunos comandos útiles para trabajar con el proyecto:

- **Levantar la aplicación en producción**:

```bash
npm run build
npm run start
```

- **Ver el estado de la aplicación en modo de desarrollo**:

```bash
npm run dev
```

- **Ejecutar pruebas (si el proyecto incluye pruebas)**:

```bash
npm run build
npm run test
```

## ¡Listo!

Con estos pasos deberías poder levantar el proyecto **Next.js** correctamente, configurar la variable de entorno `NEXT_PUBLIC_API`, y acceder a la página de inicio que interactúa con la API configurada.
