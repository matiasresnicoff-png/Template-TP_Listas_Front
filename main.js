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
    actualizarFiltros();              // Cargar las opciones en los desplegables
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

function actualizarFiltros() {
  filtroCategoria.innerHTML = '<option value="">Todas las categorías</option>';
  filtroProvincia.innerHTML = '<option value="">Todas las provincias</option>';

  comidas.forEach(function (comida) {
    if (comida.categoria) {
      const existeCategoria = filtroCategoria.querySelector('option[value="' + comida.categoria + '"]');
      if (!existeCategoria) {
        const opcionCat = document.createElement('option');
        opcionCat.value = comida.categoria;
        opcionCat.textContent = comida.categoria;
        filtroCategoria.appendChild(opcionCat);
      }
    }

    if (comida.provincia) {
      const existeProvincia = filtroProvincia.querySelector('option[value="' + comida.provincia + '"]');
      if (!existeProvincia) {
        const opcionProv = document.createElement('option');
        opcionProv.value = comida.provincia;
        opcionProv.textContent = comida.provincia;
        filtroProvincia.appendChild(opcionProv);
      }
    }
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

  mostrarComidas();
  actualizarFiltros();

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