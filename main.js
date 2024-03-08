function getComputerChoice() {
    let randomNumber = Math.floor((Math.random() * 3) + 1);
    if (randomNumber === 1) {
        return 'Rock'
    } else if (randomNumber === 2) {
        return 'Paper'
    } else if (randomNumber === 3) {
        return 'Scissors'
    };
}

function getPlayerChoice() {
    let playerChoice = prompt('Type "Rock", "Paper" or "Scissors"');
    
    // Make playerChoice case insensitive
    playerChoice = playerChoice.toLowerCase();
    playerChoice = playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1);

    if (playerChoice !== 'Rock' && playerChoice !== 'Paper' && playerChoice !== 'Scissors') {
        alert('Something else was typed! Please try again.');
        getPlayerChoice();
    }

    return playerChoice;
}

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
    playerSelection = getPlayerChoice();
    computerSelection = getComputerChoice();

    // Announce result of round
    if (playerSelection === computerSelection) {
        
        console.log(`Tie! Both chose ${playerSelection}. Re-playing round!`)
        return playRound(playerSelection,computerSelection);
    
    } else if 
        ((playerSelection === 'Rock' && computerSelection === 'Paper') || 
        (playerSelection === 'Paper' && computerSelection === 'Scissors') || 
        (playerSelection === 'Scissors' && computerSelection === 'Rock')) {
            
            console.log(`You lose! Computer's ${computerSelection} beats your ${playerSelection}!`)
            return addcomputerWin();

    } else if 
        ((computerSelection === 'Rock' && playerSelection === 'Paper') || 
        (computerSelection === 'Paper' && playerSelection === 'Scissors') || 
        (computerSelection === 'Scissors' && playerSelection === 'Rock')) {
            
            console.log(`You win! Your ${playerSelection} beats computer's ${computerSelection}!`)
            return addplayerWin();
    };
}