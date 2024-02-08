var map = L.map('map-container').setView([43.338, -2.2], 9);
var lugares = [];
var cardContainer = document.getElementById('card-container');
var ciudadesCreadas = localStorage.getItem('lugares') || "";
ciudadesCreadas = ciudadesCreadas.split(',');

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

fetch('http://10.10.17.123:8085/api/recoger')
    .then(response => response.json())
    .then(data => {
        lugares = data.lugares;

        lugares.forEach(lugar => {
            var marker = L.marker([lugar.latitud, lugar.longitud]).addTo(map);
            var tooltip = marker.bindTooltip(lugar.nombre, {
                permanent: false,
                direction: 'top',
                offset: L.point(0, -20)
            });

            var card = document.createElement('div');
            card.id = `card-${lugar.nombre}`;
            card.className = 'card droppable';
            card.style.width = '18rem';
            card.style.marginRight = '10px';
            card.style.marginBottom = '10px';
            card.style.display = 'none';

            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${lugar.nombre}</h5>
                    <div class="temperatura">
                        <img src="imagenes/sensor-de-temperatura.png" alt="Temperatura" class="card-icon">
                        <span id="dato-temperatura">${lugar.temperatura} ºC</span>
                    </div>
                    <div class="humedad">
                        <img src="imagenes/humedad.png" alt="Humedad" class="card-icon">
                        <span id="dato-humedad">${lugar.humedad} %</span>
                    </div>
                </div>`;

            cardContainer.appendChild(card);

            predicciones(lugar.nombre);

            $(".draggable").off("dragstart").on('dragstart', function (event) {
                event.originalEvent.dataTransfer.setData("text/plain", event.target.id);
            });

            $(".droppable").off("dragover").on("dragover", function (event) {
                event.preventDefault();
            });

            $(".droppable").off("drop").on("drop", function (event) {
                event.preventDefault();
                var dato = event.originalEvent.dataTransfer.getData("text/plain");
                var nombreCard = this.id;
                mostrarInfo(dato, nombreCard);
            });

            function mostrarInfo(dato, nombreCard) {
                var card = document.getElementById(nombreCard);
                var cardBody = card.querySelector('.card-body');

                if (cardBody.querySelector(`#${dato}`)) {
                    console.log(`Ya existe un ${dato} en esta tarjeta.`);
                    return;
                }

                var nuevoElemento = cardBody.innerHTML;

                switch (dato) {
                    case 'lluvia':
                        nuevoElemento += ` 
                            <div class="lluvia">
                                <img src="imagenes/lluvia.png" alt="Lluvia" class="card-icon" id="${dato}">
                                <span id="dato-lluvia">${lugar.lluvia} mm</span>
                                <img src="imagenes/papelera-de-reciclaje.png" alt="Papelera" class="papelera" onclick="eliminarDato('${nombreCard}','${dato}')">
                            </div>`;
                        break;
                    case 'viento':
                        nuevoElemento += `
                            <div class="viento">
                                <img src="imagenes/viento.png" alt="Viento" class="card-icon" id="${dato}">
                                <span id="dato-viento">${lugar.viento} km/h</span>
                                <img src="imagenes/papelera-de-reciclaje.png" alt="Papelera" class="papelera" onclick="eliminarDato('${nombreCard}','${dato}')">
                            </div>`;
                        break;
                    default:
                        break;
                }

                cardBody.innerHTML = nuevoElemento;
                card.classList.add('contenido-insertado');
            }

            tooltip.on('click', function () {
                var card = document.getElementById(`card-${lugar.nombre}`);
                card.style.display = card.style.display === 'none' ? 'block' : 'none';

                if (card.style.display === 'block') {
                    guardarEstadoTarjeta(lugar.nombre, true);
                    $(document.getElementsByClassName(`huechange${lugar.nombre}`)[0]).css("filter", "hue-rotate(120deg)")
                } else {
                    guardarEstadoTarjeta(lugar.nombre, false);
                    $(document.getElementsByClassName(`huechange${lugar.nombre}`)[0]).css("filter", "hue-rotate(0deg)")
                }

                marker._icon.classList.add("clicked");
            });

            marker._icon.classList.add(`huechange${lugar.nombre}`);
        });

        localStorage.setItem('lugares', lugares.map(lugar => lugar.nombre).join(','));
        restaurarEstado();
    });

function guardarEstadoTarjeta(nombre, estado) {
    var estadoTarjetas = JSON.parse(localStorage.getItem('estadoTarjetas')) || {};
    estadoTarjetas[nombre] = estado;
    localStorage.setItem('estadoTarjetas', JSON.stringify(estadoTarjetas));
}

function restaurarEstado() {
    var estadoTarjetas = JSON.parse(localStorage.getItem('estadoTarjetas')) || {};
    for (var nombre in estadoTarjetas) {
        var card = document.getElementById(`card-${nombre}`);
        if (card) {
            card.style.display = estadoTarjetas[nombre] ? 'block' : 'none';
            if (card.style.display == "block") {
                $(document.getElementsByClassName(`huechange${nombre}`)[0]).css("filter", "hue-rotate(120deg)")
            }
        }
    }
}

setInterval(actualizarCard, 15000);

function actualizarCard() {
    fetch('http://10.10.17.123:8085/api/recoger')
        .then(response => response.json())
        .then(data => {
            lugares = data.lugares;
            for (lugar of lugares) {
                datos = document.getElementById(`card-${lugar.nombre}`).children[0].children;
                for (dato of datos) {
                    switch (dato.className) {
                        case 'temperatura':
                            dato.getElementsByTagName('span')[0].innerHTML = `${lugar.temperatura} ºC`;
                            break;
                        case 'humedad':
                            dato.getElementsByTagName('span')[0].innerHTML = `${lugar.humedad} %`;
                            break;
                        case 'lluvia':
                            dato.getElementsByTagName('span')[0].innerHTML = `${lugar.lluvia} mm`;
                            break;
                        case 'viento':
                            dato.getElementsByTagName('span')[0].innerHTML = `${lugar.viento} km/h`;
                            break;
                        default:
                            break;
                    }
                }
            }
        });
}
function eliminarDato(nombreCard, dato) {
    document.getElementById(nombreCard).children[0].removeChild(document.getElementById(nombreCard).children[0].getElementsByClassName(dato)[0])
}
