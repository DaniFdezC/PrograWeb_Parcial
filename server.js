const express = require("express");
const cors = require("cors");

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

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
