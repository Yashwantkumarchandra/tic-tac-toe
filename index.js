const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid; //how many attempts needed

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//let's create  a fucntion to initialize a game

function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  //ui par empty v krna padega boxes ko
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    boxes[index].classList.remove("win");
  });

  newGameBtn.classList.remove("active");
  //UI update
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();
function swapturn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
  let answer = "";
  winningPositions.forEach((position) => {
    //all 3 boxes should be non-empty and exactly same in value
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      //if winner is X
      if (gameGrid[position[0]] === "X") {
        answer = "X";
      } else {
        answer = "O";
      }
      //disable pointer events

      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      //now we know X/O is winner
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });
  if (answer !== "") {
    gameInfo.innerText = `Winner Player - ${answer}`;
    newGameBtn.classList.add("active");
    return;
  }

  //when there is tied

  let fillCount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") {
      fillCount++;
    }
  });

    //board is filled , game is TIE

  if (fillCount == 9) {
    gameInfo.innerText = "Game Tied !";
    newGameBtn.classList.add("active");
  }
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;                                          //for UI
    gameGrid[index] = currentPlayer;                                         // for player
    boxes[index].style.pointerEvents = "none";
    swapturn();                                                           //swap turn x to o
    checkGameOver();                                                 //check if anyone won
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGameBtn.addEventListener("click", initGame);
