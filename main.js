let comidas = [];
const container = document.getElementById('comidaContainer');
const filtroProvincia = document.getElementById('filtroProvincia');

function cargarComidas(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('Error en la respuesta HTTP');
      return response.json();
    })
    .then(data => {
      comidas = data;
      mostrarComidas(comidas);
    })
    .catch(error => {
      console.error('Error al leer el archivo JSON:', error);
    });
}

function mostrarComidas(lista) {
  container.innerHTML = '';

  lista.forEach(comida => {
    const tarjeta = document.createElement('article');

    tarjeta.innerHTML = `
      <h2>${comida.nombre}</h2>
      <p>Categoría: ${comida.categoria}</p>
      <p>Provincia: ${comida.provincia}</p>
      <p>Ingredientes: ${comida.ingredientes.join(', ')}</p>
    `;

    container.appendChild(tarjeta);
  });
}

cargarComidas('./data/comidas.json');

const formulario = document.getElementById('formAgregar');

formulario.addEventListener('submit', function (evento) {
  evento.preventDefault();

  const nuevaComida = {
    nombre: evento.target.nombre.value,
    categoria: evento.target.categoria.value,
    provincia: evento.target.provincia.value,
    ingredientes: evento.target.ingredientes.value.split(',').map(i => i.trim())
  };

  comidas.push(nuevaComida);
  
  filtrarYMostrar();

  alert('Comida recibida');
  formulario.reset();
});

filtroProvincia.addEventListener('change', function () {
  filtrarYMostrar();
});

function filtrarYMostrar() {
  const provinciaSeleccionada = filtroProvincia.value;

  if (provinciaSeleccionada === '' || provinciaSeleccionada === null) {
    mostrarComidas(comidas);
  } else {
    const comidasFiltradas = comidas.filter(comida => comida.provincia === provinciaSeleccionada);
    mostrarComidas(comidasFiltradas);
  }
}