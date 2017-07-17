# Inslación de api-rest-sequelizejs

Esta es una guía para hacer correr la aplicación sellador-web

## Prerequisitos para el api-rest-sequelizejs

- [NodeJS](https://nodejs.org/en/)

Tener instalado una versión actualizado de nodejs (>5.3)

- [MySQL](https://www.mysql.com/)

Tener instalado MySQL, crear la base de datos 'admtsa' y ejecutar el script sellador.sql del Repositorio

## Instalación del api-rest-sequelizejs

### Bajar el Repositorio

- [Repositorio api-rest-sequelizejs](https://github.com/NubeAndoBo/api-rest-sequelizejs)

```
$ git clone https://github.com/NubeAndoBo/api-rest-sequelizejs.git
```

Una vez descargado editamos el archivo sellador-web/api-rest-sequelizejs/config/connections.js con los datos de conexión mysql de nuestra base de datos

### Nos ubicamos dentro del api-rest-sequelizejs

```
$ cd api-rest-sequelizejs
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
