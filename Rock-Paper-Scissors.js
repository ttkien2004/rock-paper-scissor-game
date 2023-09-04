let score = JSON.parse(localStorage.getItem('kien')) ||
{
    win: 0,
    lose: 0,
    tie: 0
};


updateScore();
function computerMove(){
    let cal = Math.random();
    let computer;
    if(cal >= 0 && cal < 1/3) computer = 'Rock';
    else if(cal >= 1/3 && cal < 2/3) computer = 'Paper';
    else if(cal >= 2/3 && cal < 1) computer = 'Scissors';
    return computer;
}

function playerMove(computer, player){
    let result = '';
    if(computer === player){
        result = 'Tie';
    }else{
        if (player === 'Rock') result = (computer === 'Scissors')? 'Win' : 'Lose';
        else if(player === 'Paper') result = (computer === 'Rock')? 'Win' : 'Lose';
        else result = (computer === 'Paper')? 'Win' : 'Lose';
    }       

    if(result === 'Win') score.win += 1;
    else if(result === 'Lose') score.lose += 1;
    else if(result === 'Tie') score.tie += 1;

    localStorage.setItem('kien', JSON.stringify(score));
    return result;
}

function updateResult(res){
    document.querySelector('.result').innerHTML = `You ${res}`;
}

function updateChoice(player, computer){
    document.querySelector('.choice').innerHTML = 
    `You <img src="button/${player}.png" class="move-icon"> 
    <img src="button/${computer}.png" class="move-icon"> Computer`;
}

function updateScore(){
    let scoreMess = document.querySelector('.scores');    
     
    scoreMess.innerHTML = `Win: ${score.win}, 
    Lose: ${score.lose}, Tie: ${score.tie}`;
}

function updateMessage(res){
    let mess = document.querySelector('.message');
    if(res === 'Win') mess.innerHTML = 'Good job!';
    else if(res === 'Lose') mess.innerHTML = 'Try ur best next time!';
    else mess.innerHTML = 'It\'s okay';
}

function printResultChoice(player){
    let com = computerMove();
    let res = playerMove(com, player);
    updateResult(res);
    updateChoice(player,com);
    updateMessage(res);
    updateScore(res);
}

function refresh(){
    let refreshMess = document.querySelector('.message');
    let refreshChoice = document.querySelector('.choice');
    let refreshResult = document.querySelector('.result');

    refreshMess.innerHTML = '';
    refreshChoice.innerHTML = '';
    refreshResult.innerHTML = '';
}
document.querySelector('.rock').addEventListener('click',
() => {
    printResultChoice('Rock');
}
);

document.querySelector('.paper').addEventListener('click',
() => {
    printResultChoice('Paper');
});

document.querySelector('.scissors').addEventListener('click',
() => {
    printResultChoice('Scissors');
});

document.querySelector('.reset').addEventListener('click',
() => {
    score.win = 0;
    score.lose = 0;
    score.tie = 0;
    localStorage.removeItem('kien');
    
    updateScore();
    refresh();
});

document.querySelector('.refresh').addEventListener('click', refresh);

let autoPlaying = false;
let idAutoPlay;
function autoPlay(){
    if(!autoPlaying){
        idAutoPlay = setInterval(() =>{            
            let player = computerMove();            
            printResultChoice(player);
        }, 1000);
        autoPlaying = true;
    }else{
        clearInterval(idAutoPlay);
        autoPlaying = false;
    }
}

document.querySelector('.auto').addEventListener('click', () => {    
    let change = document.querySelector('.auto');
    if(change.innerText === 'AutoPlay'){
        change.innerHTML = 'StopPlaying';        
    }else{
        change.innerHTML = 'AutoPlay';
    }
    autoPlay();
});

document.body.addEventListener('keydown', 
(event) => {
    if(event.key === 'r') printResultChoice('Rock');
    else if(event.key === 'p') printResultChoice('Paper');
    else if(event.key === 's') printResultChoice('Scissors');
});