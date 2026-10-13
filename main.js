let comidas = [];

const container = document.getElementById('comidaContainer');
const formulario = document.getElementById('formAgregar');
const filtroNombre = document.getElementById('filtroNombre');
const filtroProvincia = document.getElementById('filtroProvincia');

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

  aplicarFiltros();

  alert('Comida recibida');
  formulario.reset();
});

filtroNombre.addEventListener('input', aplicarFiltros);
filtroProvincia.addEventListener('input', aplicarFiltros);

function aplicarFiltros() {
  const textoNombre = filtroNombre.value.toLowerCase().trim();
  const textoProvincia = filtroProvincia.value.toLowerCase().trim();

  const filtradas = comidas.filter(comida => {
    const coincideNombre = comida.nombre.toLowerCase().includes(textoNombre);
    const coincideProvincia = comida.provincia.toLowerCase().includes(textoProvincia);
    return coincideNombre && coincideProvincia;
  });

  mostrarComidas(filtradas);
}