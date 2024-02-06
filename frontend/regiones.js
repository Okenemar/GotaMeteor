const hoy = new Date();
const año = hoy.getFullYear();
const mes = ('0' + (hoy.getMonth() + 1)).slice(-2);
const dia = ('0' + hoy.getDate()).slice(-2);
const fechaFormateada = `${año}/${mes}/${dia}`;

const mañana = new Date();
mañana.setDate(hoy.getDate() + 1);
const añoMañana = mañana.getFullYear();
const mesMañana = ('0' + (mañana.getMonth() + 1)).slice(-2);
const diaMañana = ('0' + mañana.getDate()).slice(-2);

function predicciones(lugar) {
    let card = document.getElementById(`card-${lugar}`)

    let config = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJJRVMgUExBSUFVTkRJIEJISSBJUlVOIiwiZXhwIjoyMjM4MTMxMDAyLCJ2ZXJzaW9uIjoiMS4wLjAiLCJpYXQiOjE2Mzk3NDc5MDcsImVtYWlsIjoiaWtjZmJAcGxhaWF1bmRpLm5ldCJ9.INhCrp3KNs6HEii6jrM1w81tBmxxjkVaL8f-Aj1NEMS_wNBZu3KL0FnNrJLxGX3peKI6SDUa3RsmRcqkltAEU4JpeXZTAGzZ6XGgOt8WD3NNFezGKvZy3-RGoit2xJnsC8hU6e539bOJzs2Mz3_SF-igJwYCjO-jQwsNAs7LRreaOymCdCRhaVUKtipfKs46M14CyoZkWRFAg_s6FLEPIGpqRbofsKlQkaDf7m0OxcAd38rrXfuCai70uDpPdvP9Px_-kfhJ3aGaHNo8KirpRnYu73BjEMBqbKxkqgU7ZbgX-6bQiny0y_LAh9R5xVZVcGHJimjeKVFAHTQ4Rj9zbQ'
        },
    };
    switch (lugar) {
        case 'Donostia':
            fetch(`https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/donostialdea/locations/donostia/forecast/at/${fechaFormateada}/for/${añoMañana + mesMañana + diaMañana}`, config)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                })
                
                .then(data => {
                    card.title = data["forecastText"]["SPANISH"]
                });
            break;

        case 'Irun':
            fetch(`https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/coast_zone/locations/irun/forecast/at/${fechaFormateada}/for/${añoMañana + mesMañana + diaMañana}`, config)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                })
               
                .then(data => {
                    card.title = data["forecastText"]["SPANISH"]
                });
            break;

        case 'Zarautz':
            fetch(`https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/coast_zone/locations/zarautz/forecast/at/${fechaFormateada}/for/${añoMañana + mesMañana + diaMañana}`, config)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                })
              
                .then(data => {
                    card.title = data["forecastText"]["SPANISH"]
                });
            break;

        case 'Errenteria':
            fetch(`https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/donostialdea/locations/errenteria/forecast/at/${fechaFormateada}/for/${añoMañana + mesMañana + diaMañana}`, config)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                })
              
                .then(data => {
                    card.title = data["forecastText"]["SPANISH"]
                });
            break;

        case 'Bilbao':
            fetch(`https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/great_bilbao/locations/bilbao/forecast/at/${fechaFormateada}/for/${añoMañana + mesMañana + diaMañana}`, config)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                })
        
                .then(data => {
                    card.title = data["forecastText"]["SPANISH"]
                });
            break;

    }
}

