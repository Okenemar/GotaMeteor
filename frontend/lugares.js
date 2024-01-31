// const provincias =
// {
//     Gipuzkoa: {
//         id: 20,
//         municipios: {
//             Donosti: 20069,
//             Errenteria: 20067,
//             Irun: 20045,
//             Zarautz: 20079
//         }
//     },
//     Bizkaia: {
//         id: 48,
//         municipios: {
//             Bilbo: 48020
//         }
//     }
// }
// for (const provincia in provincias) {
//     for(const municipio in provincias[provincia]){
//         for(const ciudad in provincias[provincia][municipio]){
//             fetch(`https://www.el-tiempo.net/api/json/v2/provincias/${provincias[provincia].id}/municipios/${provincias[provincia][municipio][ciudad]}`)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error("La solicitud no se pudo completar correctamente.");
//                 }
//                 return response.text();
//             })
//             .then(data => {
               
//             })
//         }

//     }        
// }

