
            //Mapa
            var map = L.map('map-container').setView([43.338, -2.2], 9);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            var cardContainer = document.getElementById('card-container');
            var ciudadesCreadas = [];

            var lugares = [
                { "nombre": "Irun", "latitud": 43.3390, "longitud": -1.7896, "temperatura": "14ºC", "humedad": "94%", "viento": "10 km/h", "nieve":"0 cm", "lluvia": "0 mm" },
                { "nombre": "Donosti", "latitud": 43.3183, "longitud": -1.9812, "temperatura": "17ºC", "humedad": "54%", "viento": "15 km/h", "nieve":"1 cm", "lluvia": "1 mm" },
                { "nombre": "Orereta", "latitud": 43.3119, "longitud": -1.8985, "temperatura": "11ºC", "humedad": "92%", "viento": "19 km/h", "nieve":"2 cm", "lluvia": "2 mm" },
                { "nombre": "Bilbo", "latitud": 43.26838, "longitud": -2.93408, "temperatura": "19ºC", "humedad": "90%", "viento": "20 km/h", "nieve":"3 cm", "lluvia": "3 mm" },
                { "nombre": "Zarautz", "latitud": 43.2844400, "longitud": -2.1699200, "temperatura": "10ºC", "humedad": "85%", "viento": "23 km/h", "nieve":"4 cm", "lluvia": "4 mm" }
            ];

            lugares.forEach(lugar => {
                console.log(lugar)
                var marker = L.marker([lugar.latitud, lugar.longitud]).addTo(map);
                var tooltip = marker.bindTooltip(lugar.nombre, {
                    permanent: false,
                    direction: 'top',
                    offset: L.point(0, -20)
                });

                //Cards
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
                        case 'nieve':
                            cardContenido += `
                                <div class="icon-container">
                                    <img src="imagenes/nieve.png" alt="Nieve" class="card-icon" id="${dato}">
                                    <span>${lugar.nieve}</span>
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
                }

                tooltip.on('click', function () {
                    card.style.display = card.style.display === 'none' ? 'block' : 'none';
                    saveState(lugar.nombre, card.style.display === 'block');
                    marker._icon.classList.add("clicked");
                });

                marker._icon.classList.add("huechange");

                
            });
        