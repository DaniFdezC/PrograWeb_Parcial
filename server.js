const express = require("express");
const cors = require("cors");

const jwt = require("jsonwebtoken");
const config = require("./app/config/auth.config")

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public', {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();

app.get("/", (req, res) => {
  res.sendFile(__dirname+'/public/html/index.html')
})

app.get("/dashboard", (req, res) => {
  res.sendFile(__dirname+'/public/html/dashboard.html')
})

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
    console.log(usuario);

    let redirectURL = '/';
    if (roles.includes('admin')) {
      console.log("SOY ADMIN");
      redirectURL = '/paginaAdmin';
    } else if (roles.includes('moderator')) {
      redirectURL = '/paginaModerator';
    } else if (roles.includes('user')) {
      redirectURL = '/paginaUser';
    }

    if (redirectURL === '/') {
      return res.status(403).json({ mensaje: 'Acceso no permitido' });
    }

    const filePath = __dirname + '/public/html' + redirectURL + '.html';
    
    const fs = require('fs');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ mensaje: 'Error al leer el archivo HTML' });
      }
      res.send(data);
    });

  });
});


require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});