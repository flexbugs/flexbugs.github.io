let roundsPlayed = 0;
let wins = 0;
let losses = 0;
let roundResults = [];

let roundArea = document.querySelector('#round-area');
let roundNumber = document.querySelector('#round-number');
let makeChoice = document.querySelector('#make-choice');
let playButtons = document.querySelector('#play-buttons');

let roundRecap = document.querySelector('#round-recap');
let continueButtons = document.querySelector('#continue-buttons');
let playAgain = document.querySelector('#play-again');

let currentScore = document.querySelector('.current-score');
let recapSelections = document.querySelector('.recap-selections');

// Hide roundRecap until user plays first round
roundRecap.style.display = 'none';
playAgain.style.display = 'none';

function switchTo(view) {
    // toggles roundArea between showing makeChoice or roundRecap view
    if (view === 'roundRecap') {
        makeChoice.style.display = 'none';
        roundRecap.style.display = '';
    } else if (view === 'makeChoice') {
        roundRecap.style.display = 'none';
        makeChoice.style.display = '';
    } else if (view === 'gameOver') {
        /* 
        - update roundResult to show game score instead of round result 
        ('you win 5-3!' / 'you lose 3-5!') 
        - show Play again button
        */

    }
}

playButtons.addEventListener('click', (e) => {
    let target = e.target.id;

    // Target validation to avoid playing round if user clicks between buttons
    if (target === 'rock' || target === 'paper' || target === 'scissors') {
        playRound(`${target}`);
        console.log(winnerCheck(), roundResults);
        
        switchTo('roundRecap');
    }
});

continueButtons.addEventListener('click', (e) => {
    let target = e.target.id;
    
    if (target === 'next-round') {
        updateRoundNumber();
        switchTo('makeChoice');
    } 
    // else if (target = play-again) {
        
    // }
})

/* 

User presses hand button:

    Round area:
    - Change to Results state
        - Hide hand buttons
        - call playRound()
        - Show choices, round result, updated score and Next round button

    Log area:
    - If this was first round: hide empty state and show log columns
    - Add round to log

User presses Play again:

    - Reset everything

All states:
    - roundNumber

Choice state:
    - div: playButtons
        - p: Make your choice 
        - div: buttons
    - p: currentScore

Result state:
    - div: roundChoices
    - p: roundResult
    - p: currentScore
    - button: nextRound

Game over state:
    - div: roundChoices
    - p: gameResult
    - button: playAgain
*/    

function updateRoundNumber() {
    roundNumber.textContent = `Round ${roundsPlayed + 1}`;
}

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