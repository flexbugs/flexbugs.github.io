let roundsPlayed = 0;
let wins = 0;
let losses = 0;
let roundResults = [];
let playButtons = document.querySelector('#play-buttons');

playButtons.addEventListener('click', (e) => {
    let target = e.target.id;

    // Target validation to avoid playing round if user clicks between buttons
    if (target === 'rock' || target === 'paper' || target === 'scissors') {
        playRound(`${target}`);
        console.log(winnerCheck(), roundResults);
    }
});

function playRound(playerSelection) {
    computerSelection = getComputerChoice();
    
    let roundData = {};
    roundData.roundNumber = roundsPlayed + 1;
    roundData.playerSelection = playerSelection;
    roundData.computerSelection = computerSelection;

    if (playerSelection === computerSelection) {
        
        roundData.result = 'tie';
    
    } else if 
        ((playerSelection === 'rock' && computerSelection === 'paper') || 
        (playerSelection === 'paper' && computerSelection === 'scissors') || 
        (playerSelection === 'scissors' && computerSelection === 'rock')) {
            
            roundData.result = 'loss';
            losses ++;

        } else if 
        ((computerSelection === 'rock' && playerSelection === 'paper') || 
        (computerSelection === 'paper' && playerSelection === 'scissors') || 
        (computerSelection === 'scissors' && playerSelection === 'rock')) {
            
            roundData.result = 'win';
            wins ++;
        }

    roundResults.push(roundData);
    roundsPlayed++;
}

function getComputerChoice() {
    let randomNumber = Math.floor((Math.random() * 3) + 1);

    if (randomNumber === 1) {
        return 'rock';

    } else if (randomNumber === 2) {
        return 'paper'; 

    } else if (randomNumber === 3) {
        return 'scissors';
    }
}

function winnerCheck() {
    if (wins >= 5) {
        return 'player wins the game';
    } else if (losses >= 5) {
        return 'computer wins the game';
    } else {
        return 'no winner yet';
    }
} 