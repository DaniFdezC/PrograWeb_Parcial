function loadRole(){
  const token = localStorage.getItem('token');
  if (!token) {
    alert("No hay token registrado, debes hacer login primero");
  }
  checkTokenAndRedirect(token);
}

function checkTokenAndRedirect(token) {
  fetch('/api/redireccionToken', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al obtener el archivo');
    }
    return response.text();
  })
  .then(htmlContent => {
    document.body.innerHTML = htmlContent;
  })
  .catch(error => {
    console.error('Error al verificar el token:', error);
  });
}