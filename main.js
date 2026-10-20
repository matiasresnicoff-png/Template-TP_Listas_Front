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
const contenedorIngredientes = document.getElementById('contenedorIngredientes');
const btnAgregarIngrediente = document.getElementById('btnAgregarIngrediente');

const filtroCategoria = document.getElementById('filtroCategoria');
const filtroProvincia = document.getElementById('filtroProvincia');
const buscador = document.getElementById('buscador');

const btnBuscar = document.getElementById('btnBuscar');
const btnFiltroCategoria = document.getElementById('btnFiltroCategoria');
const btnFiltroProvincia = document.getElementById('btnFiltroProvincia');
const btnMostrarTodos = document.getElementById('btnMostrarTodos');

function mostrarComidas(lista) {
  if (!lista) {
    lista = comidas;
  }

  container.innerHTML = '';

  lista.forEach(function (comida) {
    const tarjeta = document.createElement('article');

    let HTMLIngredientes = '<div class="lista-chips">';
    comida.ingredientes.forEach(function (ing) {
      HTMLIngredientes += '<span class="chip">' + ing + '</span>';
    });
    HTMLIngredientes += '</div>';

    tarjeta.innerHTML = `
      <h2>${comida.nombre}</h2>
      <p>Categoría: ${comida.categoria}</p>
      <p>Provincia: ${comida.provincia}</p>
      ${HTMLIngredientes}
    `;

    container.appendChild(tarjeta);
  });
}

function cargarFiltrosOpciones() {
  filtroCategoria.innerHTML = '<option value="">Todas las categorías</option>';
  filtroProvincia.innerHTML = '<option value="">Todas las provincias</option>';

  const categorias = [];
  const provincias = [];

  comidas.forEach(function (comida) {
    if (!categorias.includes(comida.categoria)) {
      categorias.push(comida.categoria);
    }
    if (!provincias.includes(comida.provincia)) {
      provincias.push(comida.provincia);
    }
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
}

btnAgregarIngrediente.addEventListener('click', function () {
  const nuevoInput = document.createElement('input');
  nuevoInput.type = 'text';
  nuevoInput.className = 'input-ingrediente';
  nuevoInput.placeholder = 'Un ingrediente por box';
  contenedorIngredientes.appendChild(nuevoInput);
});

formulario.addEventListener('submit', function (evento) {
  evento.preventDefault();

  const inputsIngredientes = document.querySelectorAll('.input-ingrediente');
  const listaIngredientes = [];

  inputsIngredientes.forEach(function (input) {
    if (input.value.trim() !== '') {
      listaIngredientes.push(input.value.trim());
    }
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

  contenedorIngredientes.innerHTML = '<input type="text" class="input-ingrediente" placeholder="Un ingrediente por box">';
});

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

btnMostrarTodos.addEventListener('click', function () {
  buscador.value = '';
  filtroCategoria.value = '';
  filtroProvincia.value = '';
  mostrarComidas(comidas);
});