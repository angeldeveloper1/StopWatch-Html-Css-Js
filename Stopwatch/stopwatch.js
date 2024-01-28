// Definición de variables para el cronómetro
let intervalId;
let minutes=0;
let seconds=0;
let milliseconds=0;

// Función que se ejecuta al cargar la página
window.onload = function(){
    // Recupera los datos del cronómetro del almacenamiento local
    const chronometerData = JSON.parse(localStorage.getItem('chronometerData'));
    // Verifica si hay datos almacenados
    if (chronometerData){
        // Restaura los valores del cronómetro
        minutes = chronometerData.min;
        seconds = chronometerData.sec;
        milliseconds = chronometerData.milli;
        // Actualiza la interfaz y desactiva el botón de inicio
        updateTemplate();
        stopButton.disabled=true;
    } else {
        // Inicia el cronómetro con valores predeterminados
        resetChronometer();
    }
}

// Referencias a los botones del cronómetro
const startButton = document.querySelector('.js-start-button');

const stopButton = document.querySelector('.js-pause-button');

const resetButton = document.querySelector('.js-reset-button');

    // Event listeners para los botones del cronómetro
    startButton.addEventListener('click', () => {
        startChronometer();
    });

    stopButton.addEventListener('click', () => {
        stopChronometer();
    });

    resetButton.addEventListener('click', () => {
        resetChronometer();
    });
// Función para iniciar el cronómetro
function startChronometer(){
    intervalId = setInterval(() => {
        updateChronometer();
    },10);
    // Desactiva el botón de inicio y reinicio, activa el de pausa
    startButton.disabled=true;
    stopButton.disabled=false;
    resetButton.disabled=true;
}
// Función para detener el cronómetro
function stopChronometer(){

    clearInterval(intervalId);
    // Activa el botón de inicio y reinicio, desactiva el de pausa
    startButton.disabled=false;
    stopButton.disabled=true;
    resetButton.disabled=false;
    saveChronometer();
}
// Función para reiniciar el cronómetro
function resetChronometer(){
    stopChronometer();
    // Restablece los valores del cronómetro
    minutes=0;
    seconds=0;
    milliseconds=0;
    // Actualiza la interfaz
    updateTemplate();
    // Elimina los datos del cronómetro del almacenamiento local
    localStorage.removeItem('chronometerData');
}

// Función para actualizar el cronómetro
function updateChronometer(){
    milliseconds += 10;
    if (milliseconds === 1000){
        milliseconds=0;
        seconds++;
        if (seconds === 60){
            seconds=0;
            minutes++;
        }
    }
    // Actualiza la interfaz y guarda los datos en el almacenamiento local
    updateTemplate();
    saveChronometer();
}
// Función para actualizar la interfaz del cronómetro
function updateTemplate(){
    const minutesElement = document.querySelector('.js-minutes');
    const secondsElement = document.querySelector('.js-seconds');
    const millisecondsElement = document.querySelector('.js-milliseconds');
    // Muestra los valores formateados en la interfaz
    minutesElement.innerHTML = minutes.toString().padStart(2,'0');

    secondsElement.innerHTML = seconds.toString().padStart(2,'0');

    millisecondsElement.innerHTML = milliseconds.toString().padStart(2,'0');

}
// Función para guardar los datos del cronómetro en el almacenamiento local
function saveChronometer(){
    const chronometerData = {
        min: minutes,
        sec: seconds,
        milli: milliseconds
    };
    localStorage.setItem('chronometerData', JSON.stringify(chronometerData));
}