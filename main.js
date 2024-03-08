function getComputerChoice() {
    let randomNumber = Math.floor((Math.random() * 3) + 1);
    if (randomNumber === 1) {
        return 'rock'
    } else if (randomNumber === 2) {
        return 'paper'
    } else if (randomNumber === 3) {
        return 'scissors'
    };
}

let buttons = document.querySelector('#buttons');

buttons.addEventListener('click', (e) => {
    let target = e.target;
    playRound(`${target.id}`)
});

let playerWins = 0
let computerWins = 0

function resetScore() {
    playerWins = 0
    computerWins = 0
}

function addplayerWin() {
    playerWins ++
    console.log(`player wins: ${playerWins}`)
}

function addcomputerWin() {
    computerWins ++
    console.log(`computer wins: ${computerWins}`)
}

function announceGameResult() {
    if (playerWins > computerWins) {
        console.log(`Game result: Player wins ${playerWins}\-${computerWins}!`)
    } else if (computerWins > playerWins) {
        console.log(`Game result: Computer wins ${computerWins}\-${playerWins}!`)
    }
}

function playRound(playerSelection,computerSelection) {
    computerSelection = getComputerChoice();
    
    // Announce result of round
    if (playerSelection === computerSelection) {
        
        console.log(`Tie! Both chose ${playerSelection}. Re-playing round!`)
        return playRound(playerSelection,computerSelection);
    
    } else if 
        ((playerSelection === 'rock' && computerSelection === 'paper') || 
        (playerSelection === 'paper' && computerSelection === 'scissors') || 
        (playerSelection === 'scissors' && computerSelection === 'rock')) {
            
            console.log(`You lose! Computer's ${computerSelection} beats your ${playerSelection}!`)
            return addcomputerWin();

    } else if 
        ((computerSelection === 'rock' && playerSelection === 'paper') || 
        (computerSelection === 'paper' && playerSelection === 'scissors') || 
        (computerSelection === 'scissors' && playerSelection === 'rock')) {
            
            console.log(`You win! Your ${playerSelection} beats computer's ${computerSelection}!`)
            return addplayerWin();
    };
}