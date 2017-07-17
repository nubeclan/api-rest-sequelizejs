# Inslación de backend-sellador

Esta es una guía para hacer correr la aplicación sellador-web

## Prerequisitos para el backend-sellador

- [NodeJS](https://nodejs.org/en/)

Tener instalado una versión actualizado de nodejs (>5.3)

- [MySQL](https://www.mysql.com/)

Tener instalado MySQL, crear la base de datos 'admtsa' y ejecutar el script sellador.sql del Repositorio

## Instalación del backend-sellador

### Bajar el Repositorio

- [Repositorio sellador-web](https://gitlab.geo.gob.bo/adsib/sellador-web)

```
$ git clone git@gitlab.geo.gob.bo:adsib/sellador-web.git
```

Una vez descargado editamos el archivo sellador-web/backend-sellador/config/connections.js con los datos de conexión mysql de nuestra base de datos

### Nos ubicamos dentro del backend-sellador

```
$ cd sellador-web/backend-sellador
```

### Instalamos las dependencias y libreria

```
$ npm install
```

### Iniciamos la aplicación sellador-web

```
$ node server.js
```

Esto iniciara la aplicación en la dirección http://localhost:3000/
