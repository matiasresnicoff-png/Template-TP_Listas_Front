/*
    Cargar comidas en memoria desde el JSON
*/
fetch('./data/comidas.json')          // Ruta al archivo JSON
  .then(function (response) {         // Convertir la respuesta en JSON
    return response.json();
  })
  .then(function (data) {             // Aquí tienes acceso al JSON en formato de objeto JS
    console.log('Comidas cargadas desde JSON:');
    console.log(data);    
    comidas = data;                   // Asignar el JSON a la variable comidas
    mostrarComidas();
    cargarFiltrosOpciones();
  })
  .catch(function (error) {           // Manejo de errores al leer el archivo JSON
    console.error('Error al leer el archivo JSON:', error);
  });

let comidas = [];

const container = document.getElementById('comidaContainer');
const formulario = document.getElementById('formAgregar');

const filtroCategoria = document.getElementById('filtroCategoria');
const filtroProvincia = document.getElementById('filtroProvincia');
const filtroIngredientes = document.getElementById('filtroIngredientes');
const buscador = document.getElementById('buscador');

const btnBuscar = document.getElementById('btnBuscar');
const btnFiltroCategoria = document.getElementById('btnFiltroCategoria');
const btnFiltroProvincia = document.getElementById('btnFiltroProvincia');
const btnFiltroIngredientes = document.getElementById('btnFiltroIngredientes');
const btnMostrarTodos = document.getElementById('btnMostrarTodos');

function mostrarComidas(lista) {
  if (!lista) {
    lista = comidas;
  }

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

function cargarFiltrosOpciones() {
  filtroCategoria.innerHTML = '<option value="">Todas las categorías</option>';
  filtroProvincia.innerHTML = '<option value="">Todas las provincias</option>';
  filtroIngredientes.innerHTML = '<option value="">Todos los ingredientes</option>';

  const categorias = [];
  const provincias = [];
  const ingredientesUnicos = [];

  comidas.forEach(function (comida) {
    if (!categorias.includes(comida.categoria)) {
      categorias.push(comida.categoria);
    }
    if (!provincias.includes(comida.provincia)) {
      provincias.push(comida.provincia);
    }
    comida.ingredientes.forEach(function (ing) {
      const ingredienteLimpio = ing.trim();
      if (!ingredientesUnicos.includes(ingredienteLimpio)) {
        ingredientesUnicos.push(ingredienteLimpio);
      }
    });
  });

  categorias.forEach(function (cat) {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    filtroCategoria.appendChild(option);
  });

  provincias.forEach(function (prov) {
    const option = document.createElement('option');
    option.value = prov;
    option.textContent = prov;
    filtroProvincia.appendChild(option);
  });

  ingredientesUnicos.forEach(function (ing) {
    const option = document.createElement('option');
    option.value = ing;
    option.textContent = ing;
    filtroIngredientes.appendChild(option);
  });
}

formulario.addEventListener('submit', function (evento) {
  evento.preventDefault();

  const listaIngredientes = evento.target.ingredientes.value.split(',').map(function (i) {
    return i.trim();
  });

  const nuevaComida = {
    nombre: evento.target.nombre.value,
    categoria: evento.target.categoria.value,
    provincia: evento.target.provincia.value,
    ingredientes: listaIngredientes
  };

  comidas.push(nuevaComida);

  container.innerHTML = '';
  mostrarComidas();
  cargarFiltrosOpciones();

  alert('Comida recibida');
  formulario.reset();
});

// Buscador general con OR (||)
btnBuscar.addEventListener('click', function () {
  const texto = buscador.value.toLowerCase().trim();

  if (texto === '') {
    mostrarComidas(comidas);
  } else {
    const filtradas = comidas.filter(function (comida) {
      const coincideIngrediente = comida.ingredientes.some(function (ing) {
        return ing.toLowerCase().includes(texto);
      });

      return comida.nombre.toLowerCase().includes(texto) ||
             comida.categoria.toLowerCase().includes(texto) ||
             comida.provincia.toLowerCase().includes(texto) ||
             coincideIngrediente;
    });
    mostrarComidas(filtradas);
  }
});

btnFiltroCategoria.addEventListener('click', function () {
  const seleccion = filtroCategoria.value;
  if (seleccion === '') {
    mostrarComidas(comidas);
  } else {
    const filtradas = comidas.filter(function (comida) {
      return comida.categoria === seleccion;
    });
    mostrarComidas(filtradas);
  }
});

btnFiltroProvincia.addEventListener('click', function () {
  const seleccion = filtroProvincia.value;
  if (seleccion === '') {
    mostrarComidas(comidas);
  } else {
    const filtradas = comidas.filter(function (comida) {
      return comida.provincia === seleccion;
    });
    mostrarComidas(filtradas);
  }
});

btnFiltroIngredientes.addEventListener('click', function () {
  const seleccion = filtroIngredientes.value;
  if (seleccion === '') {
    mostrarComidas(comidas);
  } else {
    const filtradas = comidas.filter(function (comida) {
      return comida.ingredientes.includes(seleccion);
    });
    mostrarComidas(filtradas);
  }
});

btnMostrarTodos.addEventListener('click', function () {
  buscador.value = '';
  filtroCategoria.value = '';
  filtroProvincia.value = '';
  filtroIngredientes.value = '';
  mostrarComidas(comidas);
});