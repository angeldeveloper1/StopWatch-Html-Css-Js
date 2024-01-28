let intervalId;
let minutes=0;
let seconds=0;
let milliseconds=0;


window.onload = function(){
    const chronometerData = JSON.parse(localStorage.getItem('chronometerData'));
    if (chronometerData){
        minutes = chronometerData.min;
        seconds = chronometerData.sec;
        milliseconds = chronometerData.milli;
        updateTemplate();
        stopButton.disabled=true;
    } else {
        resetChronometer();
    }
}


const startButton = document.querySelector('.js-start-button');

const stopButton = document.querySelector('.js-pause-button');

const resetButton = document.querySelector('.js-reset-button');

    startButton.addEventListener('click', () => {
        startChronometer();
    });

    stopButton.addEventListener('click', () => {
        stopChronometer();
    });

    resetButton.addEventListener('click', () => {
        resetChronometer();
    });

function startChronometer(){
    intervalId = setInterval(() => {
        updateChronometer();
    },10);
    startButton.disabled=true;
    stopButton.disabled=false;
    resetButton.disabled=true;
}

function stopChronometer(){
    clearInterval(intervalId);
    startButton.disabled=false;
    stopButton.disabled=true;
    resetButton.disabled=false;
    saveChronometer();
}
function resetChronometer(){
    stopChronometer();
    minutes=0;
    seconds=0;
    milliseconds=0;
    updateTemplate();
    localStorage.removeItem('chronometerData');
}


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
    updateTemplate();
    saveChronometer();
}

function updateTemplate(){
    const minutesElement = document.querySelector('.js-minutes');
    const secondsElement = document.querySelector('.js-seconds');
    const millisecondsElement = document.querySelector('.js-milliseconds');

    minutesElement.innerHTML = minutes.toString().padStart(2,'0');

    secondsElement.innerHTML = seconds.toString().padStart(2,'0');

    millisecondsElement.innerHTML = milliseconds.toString().padStart(2,'0');

}

function saveChronometer(){
    const chronometerData = {
        min: minutes,
        sec: seconds,
        milli: milliseconds
    };
    localStorage.setItem('chronometerData', JSON.stringify(chronometerData));
}