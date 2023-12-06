function loadRole(){
  const token = localStorage.getItem('token');
  verificaTokenYRedirige(token);
}

function verificaTokenYRedirige(token) {
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