import { renderNavBar } from "./navbar.js";
renderNavBar();
for (let i =0 ; i < document.querySelectorAll('button').length; i+=1) {
  document.querySelectorAll('button')[i].addEventListener('click', handleBtnClick);
}

  // document.addEventListener('keydown', (event) => {
  //   if (event.key === 'r' || event.key === 'p' || event.key === 's') {
  //     player(this.innerHTML);
  //   }
  //     console.log(event.key);
  // });


const scoreBoard = JSON.parse(localStorage.getItem('scoreBoard')) ||  {
  wins: 0,
  losses:0,
  tie:0
};
 document.querySelector('.score').innerHTML = `wins:${scoreBoard.wins} | loses:${scoreBoard.losses} | ties:${scoreBoard.tie}`;

function handleBtnClick() {
  player(this.innerHTML);

  if (this.innerHTML === 'Reset') {
    scoreBoard.wins = 0;
    scoreBoard.losses = 0;
    scoreBoard.tie = 0;
    localStorage.removeItem('scoreBoard')
    document.querySelector('.score').innerHTML = `wins:${scoreBoard.wins} | loses:${scoreBoard.losses} | ties:${scoreBoard.tie}`;
  }
  
  
}



// computer move 
function computerMove() {
  const randomMove = Math.floor(Math.random() * 3) + 1 ;
  let compMove = ``
  if (randomMove === 1) {
   compMove = `<img src="../Game/images/rock.png" alt="rock-png">`;
  }else if (randomMove === 2) {
    compMove = `<img src="../Game/images/paper.png" alt="paper-png">`;
  }else{
    compMove = `<img src="../Game/images/scissors.png" alt="scissors-png">`;
  }
  return compMove;
}


function player(playerMove) {
  const compMove = computerMove();
  let result = '';
  if (playerMove === `<img src="../Game/images/rock.png" alt="rock-png">`){
    if (compMove === `<img src="../Game/images/scissors.png" alt="scissors-png">`){
      result = 'win';
    }else if (compMove === `<img src="../Game/images/paper.png" alt="paper-png">`){
      result = 'lose';
      }else{
        result = 'tie';
      }
  }else if (playerMove === `<img src="../Game/images/paper.png" alt="paper-png">`) {
    if (compMove === `<img src="../Game/images/rock.png" alt="rock-png">`) {
      result = 'win';
    }else if (compMove === `<img src="../Game/images/scissors.png" alt="scissors-png">`) {
      result = 'lose';
    }else{
      result = 'tie';
    }
  }else if (playerMove === `<img src="../Game/images/scissors.png" alt="scissors-png">`) {
    if (compMove === `<img src="../Game/images/paper.png" alt="paper-png">`) {
      result = 'win';
    }else if (compMove === `<img src="../Game/images/rock.png" alt="rock-png">`) {
      result = 'lose';
    }else {
      result = 'tie';
    }
      

  }

  
  if (result === 'win') {
    scoreBoard.wins +=1; 
  }else if (result === 'lose' ) {
    scoreBoard.losses += 1;
  }else if (result === 'tie') {
    scoreBoard.tie +=1
  }
  
  if (playerMove === `<img src="../Game/images/rock.png" alt="rock-png">` || playerMove === `<img src="../Game/images/paper.png" alt="paper-png">` || playerMove === `<img src="../Game/images/scissors.png" alt="scissors-png">`) {
    document.querySelector('.victory').innerHTML = `You ${result}`;
    document.querySelector('.choice').innerHTML = `You: ${playerMove} | Computer: ${compMove}`;
    document.querySelector('.choice').classList.add('choice-img')
  }else{
    document.querySelector('.victory').innerHTML = null;
    document.querySelector('.choice').innerHTML = `Score board resest.`
  }
  

  localStorage.setItem('scoreBoard', JSON.stringify(scoreBoard))
  document.querySelector('.score').innerHTML = `wins:${scoreBoard.wins} | loses:${scoreBoard.losses} | ties:${scoreBoard.tie}`;

  //console.log(`you chose ${playerMove} , computer chose ${compMove}\nYou ${result}`)
}

//console.log(document.querySelectorAll('button'))