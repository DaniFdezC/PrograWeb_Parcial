const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

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

  //app.get("/api/auth/signup", )
};