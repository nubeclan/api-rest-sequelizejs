# Servicios API REST

Todos los mensajes que devuelven los Servicios API REST están en formato JSON

* ```/:param1```        -> Parámetros de entrada por la URL

* ```{}```              -> Body (Cuerpo del mensaje)

* ```POST (Insertar), GET (Mostrar), PUT (Modificar)```  -> Métodos del API REST


## Tabla Log

* GET http://localhost:3000/sellador/log

* POST http://localhost:3000/sellador/log
```{
"fecha": "2017-06-27 04:12:22",
"descripcion": "probando"
}```

## Tabla Configuracion

* GET http://localhost:3000/sellador/configuracion

* GET http://localhost:3000/sellador/configuracion/:codE

* POST http://localhost:3000/sellador/configuracion
```{
"codE": "adsib",
"Ippublica": "14.14.54.54",
"Ipprivada": "200.24.25.12",
"cantidadTotal": 50,
"cantidadSellado": 0,
"fechaFin": null,
"tipo": "publico",
"estadoServicio": 1
}```

* PUT http://localhost:3000/sellador/configuracion/:codE
```{
"Ippublica": "14.14.54.54",
"Ipprivada": "200.24.25.12",
"cantidadTotal": 50,
"cantidadSellado": 0,
"fechaFin": null,
"tipo": "publico",
"estadoServicio": 1
}```

## Tabla Usuario

* GET http://localhost:3000/sellador/usuario

* GET http://localhost:3000/sellador/usuario/:usuario/:contrasenia

* POST http://localhost:3000/sellador/usuario
```{
"id": 3,
"usuario": "acq1305",
"contrasenia": "123456",
"codEC": "adsib",
"estado": 1
}```

* PUT http://localhost:3000/sellador/usuario/:id
```{
"usuario": "acq1305",
"contrasenia": "123456",
"codEC": "adsib",
"estado": 1
}```


## Tabla Sellado

* GET http://localhost:3000/sellador/sellado

* POST http://localhost:3000/sellador/sellado
```{
"codhash": "VBJGFHGIJIGIGH",
"fecha": "2017-06-27 04:12:22",
"tipo": "S",
"idU": 1
}```
