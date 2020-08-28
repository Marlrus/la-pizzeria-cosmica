# La Pizzeria Cosmica

La pizza del futuro, en el presente.

## Como correr

-  Clonar el repositorio.
-  Instalar con los siguientes comandos:

```
yarn install
cd client yarn install
```

-  Dependencias Desarrollo:
   `Node version 10.19.0, NPM 6.14.5, Nodemon 1.19.1, concurrently 4.0.1`
-  Correr el proyecto desde el directorio root.

```
yarn dev
```

Para utilizar como Admin correo: julian.franco.f@gmail.com, contraseña: password.

## Paquetes Frontend Create React App

-  TypeScript: Menos errores de runtime por inferencia de tipos, accesso a funcionalidad experimental de JS.
-  node-sass: Aplicacion de estilos utilizando SASS para una estructura mas coherente de nidos.
-  react-router-dom: Manejo de rutas de SPA para imitacion de navegador.
-  axios: Enviar llamadas al API del servidor.

Traer paquetes a la aplicacion a medida que sea necesario. React ha introducido muchas herramientas nativas para el manejo de estado mas complejo. Con mas paginas/componentes definitivamente valdria la pena unificar todo bajo una sola herramienta.

## Paquetes Backend NodeJS

-  body-parser: Automaticamente formatear datos en el API provenientes del Front.
-  cookie-session: Manejo de sesion en Front y Backend utilizando un cookie encriptado para una sesion segura, sencilla, y ligera.
-  cors: Permiso para acceder entre origenes distintos debido a que el Front y el Back corren en puertos distintos.
-  dotenv: Manejo de variables de ambiente, para brevedad en este ejemplo deje las variables que irian en .env en el servidor. No hay datos sensibles en ninguna parte.
-  express-sslify: HTTP a HTTPS en Produccion.
-  mongoose: Paquete para el manejo de MongoDB.
-  passport, passport-local, passport-local-mongoose: Passport para el manejo de autenticacion. Maneja automaticamente la criptografia con dos niveles hash y salt si se esta utilizando autenticacion local. Los otros dos paquetes son para integrar mongoose y mongoDB con passport para la creacion segura y descomplicada de usuarios locales. Con otros paquetes de passport se puede utilizar OAuth2 de servicios como Google, Facebook, Twitter, Github con mucha facilidad utilizando un API Key.
-  compression: Comprime el archivo del servidor para enviar menos datos en el pedido HTTP.
-  concurrently -D: Permite correr Front y Backend en 1 solo terminal.
-  nodemon -D: Re-inicia el servidor automaticamente despues de cambiar un archivo.

El backend no maneja la renderizacion de ninguna pagina. Envia datos siguiendo los principios de un API REST. Cumple dos funciones principales, la interaccion entre el Frontend y la base de datos, y la autenticacion para permisos de acceso a ciertos datos. La instancia de MongoDB esta en la nube de MongoDB Atlas.

## Dudas

### Enunciado

**Nombre de pizza unico?**

No seria necesario para identificar la pizza porque al crear un documento en la DB se le asigna una llave \_id unica. Mejor utilizarla como parte de la gracia de la pagina y diversion en la creacion de pizzas con nombres comicos.

**Dashboard: Pedidos a lo largo del tiempo?**

Para este ejemplo no serian miles, pero en un caso de muchos datos tocaria configurar el API para paginacion de datos y crear vistas mas practicas con colecciones de datos derivadas de los pedidos tales como: semanas, meses, años, con detalles de totales derivados de los pedidos. En un servicio normal se volveria inviable rapidamente. Con MongoDB se pueden construir estas estructuras con mucha facilidad y actualizar con un CRON job.

**Dashboard: Detalle**

En el Show del dashboard se tendra una lista de pedidos con casi toda la informacion disponible desde esa vista. Para tener informacion adicional en la vista de detalle toca guardar la informacion de los ingredientes de la pizza.

**Como cuajaria toda esta idea?**

La pizzeria es una pizzeria con un angulo futuristico por lo cual utiliza nombres comicos para las pizzas.

### Creador de Pizza

**Es mejor crear la pizza directamente en la pagina de crear pizza?**

La pagina de crear pizza queda mejor ubicada en la pagina landing para evitar impedimentos entre los interesados y la creacion del pedido.

**Es mejor manejar el estado de la pizza con useState o useReducer?**

El estado es interdependiente, entonces es mejor utilizar useReducer que useState. Redux seria demasiado para este proyecto en el momento porque no hay estado que se este enviando entre diferentes componentes en ramas distintas del arbol de componentes. Si llega a ser necesario, migrar de useReducer a Redux es muy facil debido a que el 90% del codigo es re-utilizable para la logica del estado que se este moviendo a Redux.

**Como quedaria mejor el creador de pizza?**

Dos listas paralelas, una con los ingredientes disponibles de un lado, la otra con los ingredientes actualmente en la pizza. Dependiendo de el tamaño de el dispositivo el orden se puede cambiar para que una quede sobre la otra.

**Como sera la mejor manera de manejar la seleccion de ingredientes?**

La lista de ingredientes disponibles no es mutable. Los ingredientes de la pizza si son mutables. Es mejor que los ingredientes permanezcan en la lista de seleccion permanentemente y se cree una propiedad seleccionados con un boolean para manejar la presentacion al cliente. De esta forma, si se cambia el orden de las listas, en el caso de dispositivos moviles, el flujo es mas natural y se pueden remover los ingredientes desde la lista de ingredientes seleccionados y la lista de la pizza. Los ingredientes no van incluidos en la base de datos, son parte del Front completamente.

**Como manejar el ingreso de datos?**

Crear un formulario para los datos del usuario para que usuarios no registrados puedan hacer pedidos. En caso de que se expanda a que el usuario se registre, sus datos estarian en el estado y se podria auto-completar el formulario con ellos.

**Como saben a donde enviar la pizza?**

Agregar la direccion seria clave para el futuro saber donde se esta ubicando el mercado y para tener detalles adicionales del pedido.

**Vale la pena tener persistencia?**

Si, si el usuario navega a cualquier otra parte de la pagina se re-setearia el estado local del componente. Utilizar localStorage.setItem y getItem para manejar persistencia con el API del navegador y muy pocas lineas de codigo.

**Refactoro ahora o despues?**

Subestime el alcance de lo que necesitaba hacer esta pagina y me quedo un componente muy grande y complejo. Podria re-factorar y quebrar, pero mejor continuar con el resto de la funcionalidad y regresas a re-factorar si hay tiempo y se vuelve en un inpedimento en algun momento.

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

Con esta estructura se pueden procesar pedidos de usuarios no registrados y si se registran se puede guardar una lista de los pedidos para agregacion de datos usando mongoose. Mas adelante se podria crear un dashboard de clientes registrados para datos de consumo y metricas para determinar si se esta logrando que los usuarios creen cuenta dentro de la plataforma. La colleccion de Usuario es necesaria para la autenticacion, asi sea solo para el administrador.

**Cuantas Rutas Necesito crear?**

**Pedidos**

-  Ruta POST para procesar la orden del pedido /pedidos/new/:\_id
-  Ruta GET para pedir todos los pedidos /pedidos/index
-  Ruta GET para ver detalles de un pedido /pedidos/:\_id

**Auth**

Rutas generales para ingreso y cierre de sesion.

### Dashboard

**Sera mejor mantener todo bajo la misma pagina o en una aplicacion por separado que utiliza el API del servidor?**

El lado administrativo es altamente sencillo, no vale la pena desplegar una aplicacion independiente. El lado administrativo se esconde dentro de la pagina y se bloquea con autenticacion y como seguro la autenticacion para los datos del API en el servidor. La autenticacion es critica para que no sean publicos los datos del negocio.

**Que datos se pueden derivar de los datos que ya estan disponibles?**

Se pueden reducir en los pedidos datos como la cantidad de ingredientes de la pizza. Y en la vista show se puede reducir la cantidad de pedidos totales. Se podrian agregar unos filtros para los datos.

### Autenticacion en el Frontend

**No se esta registrando el usuario en el servidor pero tengo los cookies en el navegador y en el servidor esta registrada la sesion?**

Pense que no estaba enviando los cabezeros en los HTTP req pero tenia mal el orden en el servidor. Tenia que inicializar cookie-session antes de passport.

**Necesito subir el estado del usuario al componente app porque el Header depende de el al igual que la pagina del dashboard y de ingresar a la cuenta. Como seria mejor?**

Como solo tengo que subir un usuario, lo mas sencillo es utilizar useContext para crear un pedazo de estado que se puede compartir. El estado local lo guardo en el componente App, y utilizo el contexto para enviarlo a los Componentes menores. Envio la accion para actualizarlo en el ignreso o registro de cuenta y el estado se lee en todos los componentes que lo necesitan, efectivamente levantando el estado a el punto necesario en el arbol de componentes y afectandolo desde un componente mucho mas abajo en el arbol.
