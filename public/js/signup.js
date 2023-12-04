document.addEventListener("DOMContentLoaded", function() {
  // Elimina el elemento "token" del localStorage
  localStorage.removeItem("token");
});

function login() {
    var username = document.getElementById("i_username").value;
    var password = document.getElementById("i_password").value;
  
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
          console.error("Inicio de sesión fallido");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  