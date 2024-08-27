let clock = document.querySelector('#timer');
clock.innerHTML = '00:00:00';
let seconds = 0;
let intervalId = null ;

function timer(){
  
    seconds++;
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;

    let display = 
        (hours < 10 ? "0" : "") + hours + ":" + 
        (minutes < 10 ? "0" : "") + minutes + ":" + 
        (secs < 10 ? "0" : "") + secs;

    clock.innerHTML = display;
}

const começa = document.querySelector('#start');
começa.addEventListener('click', function() {
    if (!intervalId) { // Apenas inicia se não estiver rodando
        intervalId = setInterval(timer, 1000); // Inicia o cronômetro
    }
});

const pausa = document.querySelector('#pause');
pausa.addEventListener('click', function() {
    if (intervalId){
        clearInterval(intervalId);
        intervalId = null;
    }   
})

const reset = document.querySelector('#restart');
reset.addEventListener('click', function(){
    
        clearInterval(intervalId);
        intervalId = null;
        seconds = 0;
        clock.innerHTML = '00:00:00'
    }
)