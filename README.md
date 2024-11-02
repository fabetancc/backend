# Servicio prueba técnica

Esta es un servicio web que contiene el backend de la prueba técnica de Domina.

## Requisitos

- Instalar la versión `22.11.0` de Node desde el [sitio oficial de Node](https://nodejs.org/en).
- Instalar Typescript desde una ventana de comandos ejecutando el comando `npm install --global typescript`
- Instalar Nodemon: `npm i nodemon`

## Clonar proyecto

- Ejecutar el comando `git clone https://github.com/fabetancc/backend.git` en la ubicación de su preferencia.

### Instalar dependencias

- En la raiz del proyecto, ejecutar `npm install`

## Uso

- Ejecutar el comando `tsc -w` en una ventana de comandos, desde la raiz del proyecto. Esto es para iniciar un proceso que se encarga de detectar los cambios en los archivos de Typescript y transpilarlos a Javascript.

- Ejecutar el comando `nodemon dist` en una ventana de comandos, desde la raiz del proyecto. Esto es para iniciar el servidor de node, y reiniciarlo automáticamente cuando se detecta un cambio.