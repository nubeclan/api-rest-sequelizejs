# backend-sellador

* una Apí REST, que añadira la funcionalidad de control de accesos, carga de usuarios, reportes, registro de sellos emitidos
* la aplicación api-rest-sequelizejs trabaja con una base de datos mysql

## Desarrollador

*  [Angel Céspedes Quiroz](https://bo.linkedin.com/in/acq1305)
*  Correo:  <angel@nubeando.com>

## Estructura de directorios

```
backend-sellador    
│
+───config/
|      │   
|      +───config.js                      // definimos las variables globales       
│   
+───rutas/                                // creamos las rutas API REST                                 
│         │   
│         +api.js                         // API REST Genéricos de una tabla
│
+───server.js                             // archivo que inicia el API REST
|
```

#### Para Instalar backend-sellador

Para correr el backend-sellador leer el manual de instalación [INSTALL.md](https://github.com/NubeAndoBo/api-rest-sequelizejs/blob/master/INSTALL.md)

#### Servicios API REST

Para ver como llamar a los servicios revisar el archivo: [APIREST.md](https://github.com/NubeAndoBo/api-rest-sequelizejs/blob/master/APIREST.md)
