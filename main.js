let comidas = [];

const container = document.getElementById('comidaContainer');
const formulario = document.getElementById('formAgregar');
const filtroProvincia = document.getElementById('filtroProvincia');

function cargarComidas(ruta) {
  fetch(ruta)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      comidas = datos;
      mostrarComidas(comidas);
    });
}

function mostrarComidas(lista) {
  container.innerHTML = '';

  lista.forEach(function (comida) {
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

formulario.addEventListener('submit', function (evento) {
  evento.preventDefault();

  const nuevaComida = {
    nombre: evento.target.nombre.value,
    categoria: evento.target.categoria.value,
    provincia: evento.target.provincia.value,
    ingredientes: evento.target.ingredientes.value.split(',')
  };

  comidas.push(nuevaComida);

  filtrarComidas();

  alert('Comida agregada');
  formulario.reset();
});

filtroProvincia.addEventListener('change', function () {
  filtrarComidas();
});

function filtrarComidas() {
  const provinciaSeleccionada = filtroProvincia.value;

  if (provinciaSeleccionada === '') {
    mostrarComidas(comidas);
  } else {
    const filtradas = comidas.filter(function (comida) {
      return comida.provincia === provinciaSeleccionada;
    });
    mostrarComidas(filtradas);
  }
}