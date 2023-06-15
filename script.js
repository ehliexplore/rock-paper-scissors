let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0 
  };


updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;

  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}


document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
  });

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

let autoPlayButton = document.querySelector('.js-auto-play-button');

autoPlayButton.addEventListener('click', () => {
  autoPlayFunc();
});

function autoPlayFunc() {
  if (autoPlayButton.innerHTML === 'Auto Play') {
    autoPlay();
    autoPlayButton.innerHTML = 'Stop Playing';

  } else {
    autoPlayButton.innerHTML = 'Auto Play';
    autoPlay();
  }
};


function resetConfirm() {
  document.querySelector('.js-confirm-reset-message').innerHTML = `Are you sure you want to reset the score? 
  <button class="js-yes-reset-button">Yes</button> 
  <button class="js-no-reset-button">No</button>`;

  document.querySelector('.js-yes-reset-button').addEventListener('click', () => {
    resetScore();
    updateScoreElement();
    hideResetConfirmation();
  });
  document.querySelector('.js-no-reset-button').addEventListener('click', () => {
    hideResetConfirmation();
  })
}

function resetScore() {

  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  
  localStorage.removeItem('score');

};

document.querySelector('.js-reset-score-button').addEventListener('click', () => {
  resetConfirm();
  updateScoreElement();
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    autoPlayFunc();
  } else if (event.key === 'c') {
    resetConfirm();
    updateScoreElement(); 
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();


  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
     score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();
  resultElement();

  function resultElement() {
  document.querySelector('.js-result').innerHTML = `${result}`;
  }

  
  document.querySelector('.js-moves').innerHTML = `    You
<img src="${playerMove}-emoji.png" class="move-icon">
<img src="${computerMove}-emoji.png" class="move-icon">
Computer`;
  
}  
   
  
function updateScoreElement() {
    document.querySelector('.js-score')
      .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    document.querySelector('.js-total').innerHTML = `Rounds: 
    ${score.wins + score.losses + score.ties}`
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 &&  randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if  (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
    }


function hideResetConfirmation() {
  document.querySelector('.js-confirm-reset-message').innerHTML = '';
};