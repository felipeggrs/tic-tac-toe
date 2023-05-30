// player factory to... create players
const playerFactory = () => {
  const playerSelection = "X";
  const gameContainer = document.getElementById("gameContainer");
  const selectionX = document.createElement("button");
  selectionX.textContent = "X";
  gameContainer.appendChild(selectionX);
  const selectionO = document.createElement("button");
  selectionO.textContent = "O";
  gameContainer.appendChild(selectionO);

  return { playerSelection, selectionX, selectionO };
};

const player = playerFactory();

// module
const Gameboard = (function () {
  const board = ["", "", "", "", "", "", "", "", ""];
  let gameOver = false;
  const game = () => {
    for (let i = 0; i < 9; i += 1) {
      // create 9 buttons in a grid format of 3x3
      const gameTable = document.getElementById("gameTable");
      const gameSquare = document.createElement("button");
      gameTable.appendChild(gameSquare);

      // 'X' button: player chooses X
      player.selectionX.addEventListener("click", () => {
        player.playerSelection = "X";
      });

      // 'O' button: player chooses O
      player.selectionO.addEventListener("click", () => {
        player.playerSelection = "O";
      });

      // square click functionality
      const squareClick = function () {
        if (gameOver) {
          return; // Ignore click if the game is already over
        }
        // change array items "" to playerSelection and display them on the page
        board[i] = player.playerSelection;
        gameSquare.textContent = board[i];

        // check if player won
        const winningCombinations = [
          [0, 1, 2], // Horizontal rows
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6], // Vertical columns
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8], // Diagonals
          [2, 4, 6],
        ];

        function checkWin() {
          return winningCombinations.some((combination) =>
            combination.every(
              (index) => board[index] === player.playerSelection
            )
          );
        }

        // win or tie?
        if (checkWin()) {
          gameOver = true;
          console.log(`Game over, player ${player.playerSelection} won!`);
        }
        if (!board.includes("")) {
          gameOver = true;
          console.log("Tie!");
        }

        // alternate between X and O players with each click
        if (player.playerSelection === "X") {
          player.playerSelection = "O";
        } else if (player.playerSelection === "O") {
          player.playerSelection = "X";
        }
        gameSquare.removeEventListener("click", squareClick);
      };
      gameSquare.addEventListener("click", squareClick);
    }
  };
  return { game };
})();

Gameboard.game();
