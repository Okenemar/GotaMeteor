// Mapa
var map = L.map('map-container').setView([43.338, -2.2], 9);
var lugares = new Array();

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var cardContainer = document.getElementById('card-container');
var ciudadesCreadas = [];

fetch('http://10.10.17.123:8085/api/recoger')
    .then(response => {
        return response.json()
    })
    .then(data => {
        lugares = data.lugares

        lugares.forEach(lugar => {
            var marker = L.marker([lugar.latitud, lugar.longitud]).addTo(map);
            var tooltip = marker.bindTooltip(lugar.nombre, {
                permanent: false,
                direction: 'top',
                offset: L.point(0, -20)
            });

            // Cards
            var card = document.createElement('div');
            card.id = `card-${lugar.nombre}`;
            card.className = 'card droppable';
            card.style = 'width: 18rem; margin-right: 10px; margin-bottom: 10px; display: none;';

            card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${lugar.nombre}</h5>
            <div class="icon-container">
                <img src="imagenes/sensor-de-temperatura.png" alt="Temperatura" class="card-icon">
                <span>${lugar.temperatura}</span>
            </div>
            <div class="icon-container">
                <img src="imagenes/humedad.png" alt="Humedad" class="card-icon">
                <span>${lugar.humedad}</span>
            </div>
        </div>`;

            cardContainer.appendChild(card);

            $(".draggable").on('dragstart', function (event) {
                event.originalEvent.dataTransfer.setData("dato", event.target.id);
            });

            $(".droppable").on("dragover", function (event) {
                event.preventDefault();
            });

            $(".droppable").on("drop", function (event) {
                event.preventDefault();
                var dato = event.originalEvent.dataTransfer.getData("dato");
                var nombreCard = this.id;
                console.log(nombreCard);

                mostrarInfo(dato, nombreCard);
            });

            function mostrarInfo(dato, nombreCard) {
                var card = document.getElementById(nombreCard);

                // Verificar si ya existe un elemento del mismo tipo en la tarjeta
                if ($(`#${dato}`, card).length > 0) {
                    console.log(`Ya existe un ${dato} en esta tarjeta.`);
                    return;
                }

                var cardContenido = card.innerHTML;

                switch (dato) {
                    case 'lluvia':
                        cardContenido += `
                    <div class="icon-container">
                        <img src="imagenes/lluvia.png" alt="Lluvia" class="card-icon" id="${dato}">
                        <span>${lugar.lluvia}</span>
                    </div>`;
                        break;
                    case 'viento':
                        cardContenido += `
                    <div class="icon-container">
                        <img src="imagenes/viento.png" alt="Viento" class="card-icon" id="${dato}">
                        <span>${lugar.viento}</span>
                    </div>`;
                        break;
                    default:
                        break;
                }

                card.innerHTML = cardContenido;

                // Marcar la tarjeta como "contenido-insertado"
                card.classList.add('contenido-insertado');

                // Save the state to local storage
                saveState(lugar.nombre, card.style.display === 'block');
            }

            tooltip.on('click', function () {
                card.style.display = card.style.display === 'none' ? 'block' : 'none';
                saveState(lugar.nombre, card.style.display === 'block');
                marker._icon.classList.add("clicked");
            });

            marker._icon.classList.add("huechange");
        });

    })


// Load saved card states from local storage
window.onload = function () {
    loadSavedStates();
};

function loadSavedStates() {
    ciudadesCreadas = JSON.parse(localStorage.getItem('ciudadesCreadas')) || [];

    ciudadesCreadas.forEach(function (ciudad) {
        var card = document.getElementById(`card-${ciudad.nombre}`);
        if (card) {
            card.style.display = ciudad.display ? 'block' : 'none';
        }
    });
}

function saveState(nombre, display) {
    // Find or create the ciudad object in the array
    var ciudad = ciudadesCreadas.find(c => c.nombre === nombre);
    if (!ciudad) {
        ciudad = { nombre: nombre, display: false };
        ciudadesCreadas.push(ciudad);
    }

    // Update the display property
    ciudad.display = display;

    // Save the array to local storage
    localStorage.setItem('ciudadesCreadas', JSON.stringify(ciudadesCreadas));
}
