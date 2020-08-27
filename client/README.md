# La Pizzeria Cosmica

La pizza del futuro, en el presente.

## Dudas

### Creador de Pizza

**Es mejor crear la pizza directamente en la pagina de crear pizza?**

La pagina de crear pizza queda mejor ubicada en la pagina landing para evitar impedimentos entre los interesados y la creacion del pedido.

**Es mejor manejar el estado de la pizza con useState o useReducer?**

El estado es interdependiente, entonces es mejor utilizar useReducer que useState. Redux seria demasiado para este proyecto en el momento porque no hay estado que se este enviando entre diferentes componentes en ramas distintas del arbol de componentes. Si llega a ser necesario, migrar de useReducer a Redux es muy facil debido a que el 90% del codigo es re-utilizable para la logica del estado que se este moviendo a Redux.

**Como quedaria mejor el creador de pizza?**

Dos listas paralelas, una con los ingredientes disponibles de un lado, la otra con los ingredientes actualmente en la pizza. Dependiendo de el tamaño de el dispositivo el orden se puede cambiar para que una quede sobre la otra.

**Como sera la mejor manera de manejar la seleccion de ingredientes?**

La lista de ingredientes disponibles no es mutable. Los ingredientes de la pizza si son mutables. Es mejor que los ingredientes permanezcan en la lista de seleccion permanentemente y se cree una propiedad seleccionados con un boolean para manejar la presentacion al cliente. De esta forma, si se cambia el orden de las listas, en el caso de dispositivos moviles, el flujo es mas natural y se pueden remover los ingredientes desde la lista de ingredientes seleccionados y la lista de la pizza.

**Como manejar el ingreso de datos?**

Crear un formulario para los datos del usuario para que usuarios no registrados puedan hacer pedidos. En caso de que se expanda a que el usuario se registre, sus datos estarian en el estado y se podria auto-completar el formulario con ellos.

### Backend

**Utilizar un BaaS o crear un servidor?**

El servidor no seria muy complejo de crear, necesitaria la logica para guardar datos en una base de datos y pedirlos. Adicionalmente necesitaria la logica de autenticacion y sesiones para pedir datos del dashboard. Esto lo haria escalable para lo usuarios tambien. Adicionalmente la estructuracion de los datos y el manejo de los datos a traves de MongoDB es mucho mas flexible/facil que Firestore y la migracion de datos es mucho mas facil a futuro.

**TypeScript o JavaScript?**

Si fuera un proyecto con muchas mas colecciones y rutas me ayudaria enormemente utilizar TS, sobre todo para expandir y prevenir errores. Sin embargo, no he implementado Passport ni Mongoose con TypeScript por lo cual mi ritmo de trabajo se veria bastante afectado.

**Colecciones necesarias**

Coleccion de usuario y coleccion de pedidos:

```typescript
interface Usuario = {
	_id: MongoId
	nombre: string,
	correo: string,
	password: string,
	telefono: number,
	pedidos: [
		_id: MongoId
	]
}

interface Pedido = {
	user_id: MongoId
	nobre: string,
	telefono: number,
	nombre_pizza: string,
	precio: number,
	fecha: Date
}
```

**Cuantas Rutas Necesito crear?**

**Pedidos**

-  Ruta POST para procesar la orden del pedido /pedidos/new/:\_id
-  Ruta GET para pedir todos los pedidos /pedidos/index
-  Ruta GET para ver detalles de un pedido /pedidos/:\_id

**Auth**

### Dashboard
