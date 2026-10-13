let comidas = [];

const container = document.getElementById('comidaContainer');
const formulario = document.getElementById('formAgregar');

const filtroCategoria = document.getElementById('filtroCategoria');
const filtroProvincia = document.getElementById('filtroProvincia');

const btnFiltroCategoria = document.getElementById('btnFiltroCategoria');
const btnFiltroProvincia = document.getElementById('btnFiltroProvincia');
const btnMostrarTodos = document.getElementById('btnMostrarTodos');

fetch('./data/comidas.json')
  .then(response => response.json())
  .then(data => {
    comidas = data;
    mostrarComidas(comidas);
  })
  .catch(error => {
    console.error('Error al leer el archivo JSON:', error);
  });

function mostrarComidas(lista = comidas) {
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

formulario.addEventListener('submit', function (evento) {
  evento.preventDefault();

  const nuevaComida = {
    nombre: evento.target.nombre.value,
    categoria: evento.target.categoria.value,
    provincia: evento.target.provincia.value,
    ingredientes: evento.target.ingredientes.value.split(',').map(i => i.trim())
  };

  comidas.push(nuevaComida);

  mostrarComidas(comidas);

  alert('Comida recibida');
  formulario.reset();
});

btnFiltroCategoria.addEventListener('click', () => {
  const texto = filtroCategoria.value.toLowerCase().trim();
  const filtradas = comidas.filter(comida => comida.categoria.toLowerCase().includes(texto));
  mostrarComidas(filtradas);
});

btnFiltroProvincia.addEventListener('click', () => {
  const texto = filtroProvincia.value.toLowerCase().trim();
  const filtradas = comidas.filter(comida => comida.provincia.toLowerCase().includes(texto));
  mostrarComidas(filtradas);
});

btnMostrarTodos.addEventListener('click', () => {
  filtroCategoria.value = '';
  filtroProvincia.value = '';
  mostrarComidas(comidas);
});