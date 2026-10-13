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
    cargarFiltrosOpciones();
  })
  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.error('Error al leer el archivo JSON:', error);
  });

let comidas = [];

const container = document.getElementById('comidaContainer');
const formulario = document.getElementById('formAgregar');

const filtroCategoria = document.getElementById('filtroCategoria');
const filtroProvincia = document.getElementById('filtroProvincia');
const buscador = document.getElementById('buscador');

const btnBuscar = document.getElementById('btnBuscar');
const btnFiltroCategoria = document.getElementById('btnFiltroCategoria');
const btnFiltroProvincia = document.getElementById('btnFiltroProvincia');
const btnMostrarTodos = document.getElementById('btnMostrarTodos');

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

function cargarFiltrosOpciones() {
  filtroCategoria.innerHTML = '<option value="">Todas las categorías</option>';
  filtroProvincia.innerHTML = '<option value="">Todas las provincias</option>';

  const categorias = [];
  const provincias = [];

  comidas.forEach(comida => {
    if (!categorias.includes(comida.categoria)) {
      categorias.push(comida.categoria);
    }
    if (!provincias.includes(comida.provincia)) {
      provincias.push(comida.provincia);
    }
  });

  categorias.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    filtroCategoria.appendChild(option);
  });

  provincias.forEach(prov => {
    const option = document.createElement('option');
    option.value = prov;
    option.textContent = prov;
    filtroProvincia.appendChild(option);
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

  container.innerHTML = '';
  mostrarComidas();
  cargarFiltrosOpciones();

  alert('Comida recibida');
  formulario.reset();
});

// Buscador triple con OR (||)
btnBuscar.addEventListener('click', () => {
  const texto = buscador.value.toLowerCase().trim();

  if (texto === '') {
    mostrarComidas(comidas);
  } else {
    const filtradas = comidas.filter(comida => 
      comida.nombre.toLowerCase().includes(texto) ||
      comida.categoria.toLowerCase().includes(texto) ||
      comida.provincia.toLowerCase().includes(texto)
    );
    mostrarComidas(filtradas);
  }
});

btnFiltroCategoria.addEventListener('click', () => {
  const seleccion = filtroCategoria.value;
  if (seleccion === '') {
    mostrarComidas(comidas);
  } else {
    const filtradas = comidas.filter(comida => comida.categoria === seleccion);
    mostrarComidas(filtradas);
  }
});

btnFiltroProvincia.addEventListener('click', () => {
  const seleccion = filtroProvincia.value;
  if (seleccion === '') {
    mostrarComidas(comidas);
  } else {
    const filtradas = comidas.filter(comida => comida.provincia === seleccion);
    mostrarComidas(filtradas);
  }
});

btnMostrarTodos.addEventListener('click', () => {
  buscador.value = '';
  filtroCategoria.value = '';
  filtroProvincia.value = '';
  mostrarComidas(comidas);
});