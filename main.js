let playerScore = 0;
let computerScore = 0;
let winner = '';
let playButtons = document.querySelector('#play-buttons');
let results = document.querySelector('#results');

playButtons.addEventListener('click', (e) => {
    let target = e.target;
    playRound(`${target.id}`);
});

function playRound(playerSelection,computerSelection) {
    computerSelection = getComputerChoice();
    
    if (playerSelection === computerSelection) {
        
        const roundResult = document.createElement("p");
        roundResult.textContent = `Tie! Both chose ${playerSelection}. 
                                    Nobody wins!`;
        results.appendChild(roundResult);
    
    } else if 
        ((playerSelection === 'rock' && computerSelection === 'paper') || 
        (playerSelection === 'paper' && computerSelection === 'scissors') || 
        (playerSelection === 'scissors' && computerSelection === 'rock')) {
            
            const roundResult = document.createElement("p");
            roundResult.textContent = `You lose! Computer's ${computerSelection} 
                                        beats your ${playerSelection}!`;
            results.appendChild(roundResult);
            updateScore('computerWin');

    } else if 
        ((computerSelection === 'rock' && playerSelection === 'paper') || 
        (computerSelection === 'paper' && playerSelection === 'scissors') || 
        (computerSelection === 'scissors' && playerSelection === 'rock')) {
            
            const roundResult = document.createElement("p");
            roundResult.textContent = `You win! Your ${playerSelection} 
                                        beats computer's ${computerSelection}!`
            results.appendChild(roundResult);
            updateScore('playerWin');
    };
}

function getComputerChoice() {
    let randomNumber = Math.floor((Math.random() * 3) + 1);
    if (randomNumber === 1) {
        return 'rock';
    } else if (randomNumber === 2) {
        return 'paper';
    } else if (randomNumber === 3) {
        return 'scissors';
    };
}

function updateScore(latestResult) {
    if (latestResult == 'playerWin') {
        playerScore++;
    } else if (latestResult == 'computerWin') {
        computerScore++;
    };

    if (playerScore == 5 || computerScore == 5) {
        if (playerScore == 5) {
            winner = 'Player';
        } else if (computerScore == 5) {
            winner = 'Computer';
        }

        const winnerAnnouncement = document.createElement('div');
        winnerAnnouncement.id = 'announcement'
        winnerAnnouncement.textContent = `${winner} has won 5 rounds and 
                                        wins the game!`;
        results.appendChild(winnerAnnouncement);

        playButtons.setAttribute('style', 'display: none');

        let resetButton = document.createElement('button')
        resetButton.textContent = 'Play again';
        results.appendChild(resetButton);

        resetButton.addEventListener('click', (e) => {
            resetGame();
        })
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }
    playButtons.setAttribute('style', 'display: null');
}