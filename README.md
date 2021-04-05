# testPC
test

## Instalación
Es necesario tener nodeJs instalado en el equipo. 
info: https://nodejs.org/es/download/


## Configuración
Para el Server, es necesario cambiar las variables que se encuentran en la carpeta de /config, por los valores de los credenciales propios 
```

const MONGO_USERNAME = process.env.MONGO_USERNAME || <USUARIO>;
const MONGO_PASSWORD = process.env.MONGO_USERNAME || <CONTRASEÑA>;

```
y el url correspondiente, esto se encuentra en la nube de mongodb.
Si aún no se tiene cuenta, se debe crear una, crear un cluster, crear un usuario, y el mismo cluster tiene una opción de "connect", para copiar el URL necesario.
```
const MONGO = {
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    options: MONGO_OPTIONS,
    url: <URL OBTENIDO>
};
```
instalar las dependencias de ambos proyectos
```
$ npm install or $ yarn install 
```

## Correr los proyectos
En una terminal
```
$ cd server/
$ nodemon source/server.ts
```
En otra terminal
```
$ cd fe-react/
$ npm start
```
