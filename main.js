let roundsPlayed = 0;
let wins = 0;
let losses = 0;
let roundData = {};

let roundArea = document.querySelector('#round-area');
let roundNumber = document.querySelector('#round-number');
let makeChoice = document.querySelector('#make-choice');
let playButtons = document.querySelector('#play-buttons');

let roundRecap = document.querySelector('#round-recap');
let playerChoiceText = document.querySelector('#player-choice-text');
let playerChoiceImg = document.querySelector('#player-choice-img');
let computerChoiceText = document.querySelector('#computer-choice-text');
let computerChoiceImg = document.querySelector('#computer-choice-img');
let roundResult = document.querySelector('#round-result');
let continueButtons = document.querySelector('#continue-buttons');
let playAgain = document.querySelector('#play-again');

let currentScore = document.querySelectorAll('.current-score');


// Hide roundRecap until user plays first round
roundRecap.style.display = 'none';
playAgain.style.display = 'none';

function switchTo(view) {
    // changes what roundArea shows
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

function toTitleCase(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

playButtons.addEventListener('click', (e) => {
    let target = e.target.id;

    // Target validation to avoid playing round if user clicks between buttons
    if (target === 'rock' || target === 'paper' || target === 'scissors') {
        target = toTitleCase(target);
        playRound(`${target}`);
        console.log(winnerCheck(), roundData);
        
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
    Log area:
    - If this was first round: hide empty state and show log columns
    - Add round to log
*/    

function playRound(playerSelection) {
    computerSelection = getComputerChoice();
    
    roundData.roundNumber = roundsPlayed + 1;
    roundData.playerSelection = playerSelection;
    roundData.computerSelection = computerSelection;

    if (playerSelection === computerSelection) {
        
        roundData.result = 'Tie';
    
    } else if 
        ((playerSelection === 'Rock' && computerSelection === 'Paper') || 
        (playerSelection === 'Paper' && computerSelection === 'Scissors') || 
        (playerSelection === 'Scissors' && computerSelection === 'Rock')) {
            
            roundData.result = 'Loss';
            losses ++;

        } else if 
        ((computerSelection === 'Rock' && playerSelection === 'Paper') || 
        (computerSelection === 'Paper' && playerSelection === 'Scissors') || 
        (computerSelection === 'Scissors' && playerSelection === 'Rock')) {
            
            roundData.result = 'Win';
            wins ++;
        }

    updateRoundRecap();
    roundsPlayed++;
}

function getComputerChoice() {
    let randomNumber = Math.floor((Math.random() * 3) + 1);

    if (randomNumber === 1) {
        return 'Rock';

    } else if (randomNumber === 2) {
        return 'Paper'; 

    } else if (randomNumber === 3) {
        return 'Scissors';
    }
}

function updateRoundRecap() {
    currentScore.forEach(element => {
        element.textContent = `Score is ${wins}-${losses}`;
    });

    roundResult.textContent = roundData.result;
    playerChoiceText.textContent = roundData.playerSelection;
    computerChoiceText.textContent = roundData.computerSelection;

    switch (roundData.playerSelection) {
        case 'Rock':
            playerChoiceImg.src='./images/rock-right.png';
            break;

        case 'Paper':
            playerChoiceImg.src='./images/paper-right.png';
            break;
        
        case 'Scissors':
            playerChoiceImg.src='./images/scissors-right.png';
            break;
    }

    switch (roundData.computerSelection) {
        case 'Rock':
            computerChoiceImg.src='./images/rock-left.png';
            break;

        case 'Paper':
            computerChoiceImg.src='./images/paper-right.png';
            break;
        
        case 'Scissors':
            computerChoiceImg.src='./images/scissors-right.png';
            break;
    }
}

function updateRoundNumber() {
    // Triggered on 'Next round' click; doesn't belong to updateRoundRecap
    roundNumber.textContent = `Round ${roundsPlayed + 1}`;
}

function winnerCheck() {
    if (wins >= 5) {
        return 'gameWin';

    } else if (losses >= 5) {
        return 'gameLoss';

    } else {
        return 'no winner yet';
    }
} 