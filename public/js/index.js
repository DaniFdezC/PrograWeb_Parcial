document.addEventListener("DOMContentLoaded", function() {
  localStorage.removeItem("token");
});

function createUser(){
  var newUsername = document.getElementById("new-username").value;
  var newPassword = document.getElementById("new-password").value;
  var newEmail = document.getElementById("email").value;
  var role = document.getElementById("user-role").value;

  var data = {
    username : newUsername,
    password : newPassword,
    email : newEmail,
    roles : [role]
  }

  console.log(data)

  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch("http://localhost:8080/api/auth/signup", requestOptions)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    if (data.success) {
      alert("Usuario creado con éxito");
      window.location.href = data.redirectURL;
    } else {
      alert("El usuario o email ya existe");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });

}

function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    var data = {
      username: username,
      password: password,
    };
  
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  
    fetch("http://localhost:8080/api/auth/signin", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem('token', data.accessToken);
          window.location.href = data.redirectURL;
        } else {
          alert("Usuario o contraseña erróneo");
          document.getElementById("username").value = "";
          document.getElementById("password").value = "";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function toggleForm() {
    var loginForm = document.getElementById("login-form");
    var registerForm = document.getElementById("register-form");
    var formTitle = document.getElementById("form-title");

    if (loginForm.style.display === "none") {
        loginForm.style.display = "flex";
        registerForm.style.display = "none";
        formTitle.innerText = "Iniciar Sesión";
        document.getElementById("toggle-form-btn").innerText = "Crear usuario";
    } else {
        loginForm.style.display = "none";
        registerForm.style.display = "flex";
        formTitle.innerText = "Crear usuario";
        document.getElementById("toggle-form-btn").innerText = "Regresar a login";
    }
}

  
  