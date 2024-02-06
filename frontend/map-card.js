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
                    <div class="icon-container">
                        <img src="imagenes/sensor-de-temperatura.png" alt="Temperatura" class="card-icon">
                        <span id="dato-temperatura">${lugar.temperatura} ºC</span>
                    </div>
                    <div class="icon-container">
                        <img src="imagenes/humedad.png" alt="Humedad" class="card-icon">
                        <span id="dato-humedad">${lugar.humedad} %</span>
                    </div>
                </div>`;

            cardContainer.appendChild(card);

            predicciones(lugar.nombre)

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
                mostrarInfo(dato, nombreCard);
            });

            function mostrarInfo(dato, nombreCard) {
                var card = document.getElementById(nombreCard);
                // card.getElementsByClassName('card-body')
                // console.log(card.getElementsByClassName('card-body')[0])
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
                                <span id="dato-lluvia">${lugar.lluvia} </span>
                            </div>`;
                        break;
                    case 'viento':
                        cardContenido += `
                            <div class="icon-container">
                                <img src="imagenes/viento.png" alt="Viento" class="card-icon" id="${dato}">
                                <span id="dato-viento">${lugar.viento} km/h</span>
                            </div>`;
                        break;
                    default:
                        break;
                }

                card.innerHTML = cardContenido;
                card.classList.add('contenido-insertado');
            }

            tooltip.on('click', function () {
                var card = document.getElementById(`card-${lugar.nombre}`);
                card.style.display = card.style.display === 'none' ? 'block' : 'none';

                if (card.style.display === 'block') {
                    // Guarda el estado en localStorage al abrir la tarjeta
                    guardarEstadoTarjeta(lugar.nombre, true);
                    $(document.getElementsByClassName(`huechange${lugar.nombre}`)[0]).css("filter", "hue-rotate(120deg)")
                } else {
                    // Guarda el estado en localStorage al cerrar la tarjeta
                    guardarEstadoTarjeta(lugar.nombre, false);
                    $(document.getElementsByClassName(`huechange${lugar.nombre}`)[0]).css("filter", "hue-rotate(0deg)")
                }

                marker._icon.classList.add("clicked");
            });

            marker._icon.classList.add(`huechange${lugar.nombre}`);
        });

        // Almacena en localStorage
        localStorage.setItem('lugares', lugares.map(lugar => lugar.nombre).join(','));

        // Restaura el estado al cargar la página
        restaurarEstado();
    });

function guardarEstadoTarjeta(nombre, estado) {
    // Guarda el estado de la tarjeta en localStorage
    var estadoTarjetas = JSON.parse(localStorage.getItem('estadoTarjetas')) || {};
    estadoTarjetas[nombre] = estado;
    localStorage.setItem('estadoTarjetas', JSON.stringify(estadoTarjetas));
}

function restaurarEstado() {
    // Restaura el estado de las tarjetas desde localStorage
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
 setInterval(actualizarCard, 20000);


function actualizarCard() {
    fetch('http://10.10.17.123:8085/api/recoger')
        .then(response => response.json())
        .then(data => {
            lugares = data.lugares;
            for (lugar of lugares) {
                console.log(document.getElementById(`card-${lugar.nombre}`).children[0])


            }
        })

}
