// login.js

function login() {
    // Obtener los valores de username y password
    var username = document.getElementById("i_username").value;
    var password = document.getElementById("i_password").value;
  
    // Crear un objeto con los datos a enviar
    var data = {
      username: username,
      password: password,
    };
  
    // Configurar la opción de la solicitud
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  
    // Enviar la solicitud a la API
    fetch("http://localhost:8080/api/auth/signin", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
            window.location.href = data.redirectURL;
          } else {
            console.error("Inicio de sesión fallido");
          }
      })
      .catch((error) => {
        // Manejar errores
        console.error("Error:", error);
      });
  }
  