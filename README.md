
# Sistema de gestion de productos y facturas

Es un proyecto en el que estaré trabajando cada cierto tiempo para hacerlo más grande, aunque sea bastante básico. Tengo pensado agregar soporte para imágenes, incluir una zona de facturas para poder imprimirlas y, quizá en el futuro, implementar un sistema OAuth para que se pueda probar vía web sin necesidad de descargarlo o tener una base de datos en MongoDB. No creo que lo haga, pero es una idea.


## API Reference

#### Obtener todos los productos

```http
  GET api/productos/viewAllProductos
```

#### Agregar productos

```http
  POST api/productos/createProducto
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nombre` | `string` | **Required**.Nombre del producto |
| `precio` | `number` | **Required**.precio del producto |

#### Eliminar producto

```http
  DELETE api/productos/deleteProducto
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nombre` | `string` | **Required**.Nombre del producto |


#### Buscar producto

```http
  DELETE api/productos/searchProductos
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nombre` | `string` | **Required**.Nombre del producto |


