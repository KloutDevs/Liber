const Chart = require('chart.js')

let menuBtn = document.getElementById('btn');
let logoutBtn = document.getElementById('logOutBtn')
let sidebar = document.querySelector('.sidebar');
let mainContent = document.querySelector('.main_content');
let sidebarObjects = document.querySelectorAll('.list-object');
let pieCtx = document.getElementById('pieChart').getContext('2d');

let { ipcRenderer } = require('electron');

menuBtn.onclick = function () {
    sidebar.classList.toggle("active");
    mainContent.classList.toggle("main-content-active");
}

sidebarObjects.forEach(li => {
    li.onclick = function () {
        sidebarObjects.forEach(li2 => {
            li2.classList.remove('selected');
        });
        li.classList.add('selected');
    }
});

logoutBtn.onclick = function () {
    ipcRenderer.invoke('logout');
};

let progressBar = document.querySelector('.circular-progress');
let valueContainer  = document.querySelector('.value-container');

let progressValue = 0;
let progressEndValue = 65;
let speed = 20;

let progress = setInterval(() => {
    progressValue++;
    valueContainer.textContent = `${progressValue}%`;
    progressBar.style.background = `conic-gradient(
        #2ed573 ${progressValue * 3.6}deg,
        #7bed9f ${progressValue * 3.6}deg
    )`
    if(progressValue == progressEndValue){
        clearInterval(progress);
    }
}, speed);


const pie = new Chart(pieCtx, {
    type: 'pie',
    data: {
        labels: ['Pruductividad', 'Descanso', 'OSEO'],
        datasets: [{
            label: '# of Votes',
            data: [1200, 1900, 3000],
            backgroundColor: [
                '#c56cf0',
                '#17c0eb',
                '#7d5fff'
            ],
            borderColor: [
                '#222',
                '#111',
                '#999'
            ],
            borderWidth: 0.5
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            }
        }
    },
}
)

/*

GENERAL WEBPAGE



Tareas realizadas / nro

Tareas pendientes / nro



Cumplimiento de responsabilidades

Tareas por día/semana/mes

Graf de Productividad


Tareas recientes

*/