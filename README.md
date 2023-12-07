#Funcionamiento de la app

Página de login con 2 botones:
- Botón de Iniciar sesión
    - Envía una petición POST al servidor, enviando usuario y contraseña a /api/auth/signin
    - Recoge el token enviado y lo guarda en local storage, y se redirige a /dashboard

- Botón de crear usuario
    - Abre un nuevo formulario para crear usuario introduciendo usuario, contraseña, email y elegir el rol
        - No se ha creado el usuario correctamente (error)
            - Avisa del error para poder cambiarlo
        - Si se crea usuario correctamente, sale una alerta y vuelve al formulario de login

Tras hacer login correctamente se pasa a la página de dashboard:
- Un botón que al hacer click hace lo siguiente
    - Comprueba el token
        - Si no hay token envía una alerta que primero hay que hacer login para conseguir el token
        - Si hay token, hace una petición a la api para ver qué tiene que mostrar en pantalla, dependiendo del rol da unos datos u otros

# Requisitos para que funcione
1. Tener instalado un mysql (en mi caso utilicé wampserver ya que crea uno), con una base de datos testdb creada
```BBDD
CREATE DATABASE testdb;
```
2. Si se quieren dejar los datos de login de la base de datos tal y como está (usuario pruebas, contraseña pruebas) habrá que crear un usuario y darle permisos sobre la base de datos
```usuario
CREATE USER 'pruebas'@'localhost' IDENTIFIED BY 'pruebas';
GRANT ALL PRIVILEGES ON testdb.* TO 'pruebas'@'localhost';
```
3. En la primera ejecución será necesario crear los roles y hacer las foreigns key, así que el sync del sequalize de server.js debe ser el 
```server.js
db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Database with { force: true }');
    initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}
```

4. Descargar los modulos de node
```node
npm install
```