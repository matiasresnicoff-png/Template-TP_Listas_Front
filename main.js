/*
    Cargar comidas en memoria desde el JSON
*/
fetch('./data/comidas.json')          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
    console.log('Comidas cargadas desde JSON:');
    console.log(data);    
    comidas = data;                   // Asignar el JSON a la variable comidas
    mostrarComidas();
  })
  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.error('Error al leer el archivo JSON:', error);
  });

let comidas = [];

const container = document.getElementById('comidaContainer');

function mostrarComidas() {
  for (let i = 0; i < comidas.length; i++) {
    const comida = comidas[i];

    const tarjeta = document.createElement('article');

    tarjeta.innerHTML = `
      <img src="${comida.COMPLETAR}" alt="${comida.COMPLETAR}">
      <h2>${comida.COMPLETAR}</h2>
      <p>${comida.COMPLETAR}</p>
    `;

    container.appendChild(tarjeta);
  }
}