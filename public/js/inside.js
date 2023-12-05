document.getElementById('ss').addEventListener('click', function() {
  const token = localStorage.getItem('token');
  verificarTokenEnServidor(token);
});

function verificarTokenEnServidor(token) {
  fetch('/api/redireccionToken', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if (data.valido) {
      console.log(data.redirectURL)
      window.location.href = data.redirectURL;
    } else {
      alert('Token no válido');
    }
  })
  .catch(error => {
    console.error('Error al verificar el token:', error);
  });
}
