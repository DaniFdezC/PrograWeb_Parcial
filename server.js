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

app.get("/dashboard", (req, res) => {
  res.sendFile(__dirname+'/public/html/si.html')
})

app.get("/paginaUsuario", (req, res) => {
  // verificar TOKEN, si vale --> 
  res.sendFile(__dirname+'/public/html/otraPagina.html')
})

///////////////////////////////// IDEAS IDEAS IDEAS
/*
app.get("/api/redireccionToken", (req, res) => {
  const token = req.body.token;
  if (!token) {
    console.log("NO HAY TOKEN")
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.log("ERROR 2 TOKEN")
      return res.json({ tokenValido: false });
    }
    res.json({
      valido: true,
      redirectURL: __dirname+'\\public\\html\\otraPagina.html'
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
    
    res.json({
      valido: true,
      redirectURL: '/paginaUsuario'
    });
  });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
