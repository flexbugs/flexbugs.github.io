let roundNumber = 1;
let wins = 0;
let losses = 0;
let roundData = {};

let overlays = document.querySelectorAll('.overlay');

let roundArea = document.querySelector('#round-area');
let roundNumberIndicator = document.querySelectorAll('.round-number');
let playButtons = document.querySelector('#play-buttons');

let roundRecap = document.querySelector('#round-recap');

let playerChoiceText = document.querySelector('#player-choice-text');
let playerChoiceImg = document.querySelector('#player-choice-img');
let computerChoiceText = document.querySelector('#computer-choice-text');
let computerChoiceImg = document.querySelector('#computer-choice-img');

let roundResult = document.querySelector('#round-result');

let continueButtons = document.querySelector('#continue-buttons');
let playAgain = document.querySelector('#play-again');

let playerScore = document.querySelector('#player-score');
let computerScore = document.querySelector('#computer-score');

function showRoundRecap() {
    overlays.forEach(element => {
        element.classList.remove('hidden');
        element.classList.add('shown');
    });

    setTimeout(hideRoundRecap, 2000);
}

function hideRoundRecap() {
    overlays.forEach(element => {
        element.classList.remove('shown');
        element.classList.add('hidden');
    })
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
        
        showRoundRecap();
    }
});

/*
    Log area:
    - If this was first round: hide empty state and show log columns
    - Add round to log
*/    

function playRound(playerSelection) {
    computerSelection = getComputerChoice();
    
    roundData.roundNumber = roundNumber;
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

    updateroundRecap();
    roundNumber++;
    showRoundRecap();
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

function updateroundRecap() {
    playerScore.textContent = `${wins}`;
    computerScore.textContent = `${losses}`;

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
            computerChoiceImg.src='./images/paper-left.png';
            break;
        
        case 'Scissors':
            computerChoiceImg.src='./images/scissors-left.png';
            break;
    }
}

function updateRoundNumberIndicator() {
    // Triggered on 'Next round' click; doesn't belong to updateroundRecap
    roundNumberIndicator.textContent = `Round ${roundNumber}`;
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