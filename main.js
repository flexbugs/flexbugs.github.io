let playerWins = 0;
let computerWins = 0;
let buttons = document.querySelector('#buttons');
let results = document.querySelector('#results');

buttons.addEventListener('click', (e) => {
    let target = e.target;
    playRound(`${target.id}`)
});

function resetScore() {
    playerWins = 0;
    computerWins = 0;
}

function addplayerWin() {
    playerWins ++;
    const para = document.createElement("p");
    para.textContent = `player wins: ${playerWins}`;
    results.appendChild(para);
}

function addcomputerWin() {
    computerWins ++;
    const para = document.createElement("p");
    para.textContent = `computer wins: ${computerWins}`;
    results.appendChild(para);
}

function announceGameResult() {
    if (playerWins > computerWins) {
        console.log(`Game result: Player wins ${playerWins}\-${computerWins}!`)
    } else if (computerWins > playerWins) {
        console.log(`Game result: Computer wins ${computerWins}\-${playerWins}!`)
    }
}

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

function playRound(playerSelection,computerSelection) {
    computerSelection = getComputerChoice();
    
    if (playerSelection === computerSelection) {
        
        const para = document.createElement("p");
        para.textContent = `Tie! Both chose ${playerSelection}. Nobody wins!`;
        results.appendChild(para);
    
    } else if 
        ((playerSelection === 'rock' && computerSelection === 'paper') || 
        (playerSelection === 'paper' && computerSelection === 'scissors') || 
        (playerSelection === 'scissors' && computerSelection === 'rock')) {
            
            const para = document.createElement("p");
            para.textContent = `You lose! Computer's ${computerSelection} 
                                beats your ${playerSelection}!`;
            results.appendChild(para);
            addcomputerWin();

    } else if 
        ((computerSelection === 'rock' && playerSelection === 'paper') || 
        (computerSelection === 'paper' && playerSelection === 'scissors') || 
        (computerSelection === 'scissors' && playerSelection === 'rock')) {
            
            const para = document.createElement("p");
            para.textContent = `You win! Your ${playerSelection} 
                                beats computer's ${computerSelection}!`
            results.appendChild(para);
            addplayerWin();
    };
}