const express = require("express");
const cors = require("cors");

/// ELIMINAR
const jwt = require("jsonwebtoken");
const config = require("./app/config/auth.config")
////

  
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();

app.get("/", (req, res) => {
  res.sendFile(__dirname+'/public/html/index.html')
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname+'/public/html/signup.html')
})

//// LIMPIAR TODO ESTO
app.get("/dashboard", (req, res) => {
  res.sendFile(__dirname+'/public/html/si.html')
})

app.get("/paginaUsuario", (req, res) => {
  res.sendFile(__dirname+'/public/html/otraPagina.html')
})

///////////////////////////////// IDEAS IDEAS IDEAS
/*app.get("/api/redireccionToken", (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  jwt.verify(token.replace('Bearer ', ''), config.secret, (err, usuario) => {
    if (err) {
      return res.status(403).json({ mensaje: 'Token no válido' });
    }
    
    res.json({
      valido: true,
      redirectURL: '/paginaUsuario'
    });
  });
});*/

app.get("/api/redireccionToken", (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  jwt.verify(token.replace('Bearer ', ''), config.secret, (err, usuario) => {
    if (err) {
      return res.status(403).json({ mensaje: 'Token no válido' });
    }

    const roles = usuario.roles || [];
    console.log(usuario)

    // Lógica de redirección basada en roles
    if (roles.includes('admin')) {
      redirectURL = '/public/html/paginaAdmin.html';
    } else if (roles.includes('user')) {
      redirectURL = '/public/html/paginaUser.html';
    } else if (roles.includes('moderator')) {
      redirectURL = '/public/html/paginaModerator.html';
    } else {
      // Manejar otros roles o escenarios según sea necesario
      redirectURL = '/public/html/default.html';
    }

    res.json({
      valido: true,
      redirectURL: redirectURL,
    });
  });
});


require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
