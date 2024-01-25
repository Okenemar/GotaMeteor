 //Grafico
 const xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
 const yValues = [5, 10, 15, 20, 25, 30, 35, 40];

 new Chart("myChart", {
     type: "line",
     data: {
         labels: yValues,
         datasets: [{
             label: 'Temperatura',
             data: [12, 14, 12, 16, 19, 23, 20, 22, 17, 15],
             borderColor: "red",
             fill: false
         }, {
             label: 'Temperatura',
             data: [16, 17, 15, 19, 20, 27, 4, 14, 19, 18],
             borderColor: "green",
             fill: false
         }]
     },
     options: {
         legend: { display: false },
         responsive: true,
         maintainAspectRatio: false
     }
 });