// player factory to... create players
const playerFactory = () => {
  const playerSelection = "X";
  const gameContainer = document.getElementById("gameContainer");

  const selectionX = document.createElement("button");
  selectionX.textContent = "X";
  selectionX.setAttribute("style", "display: none");
  gameContainer.appendChild(selectionX);

  const selectionO = document.createElement("button");
  selectionO.textContent = "O";
  selectionO.setAttribute("style", "display: none");
  gameContainer.appendChild(selectionO);

  const gameReset = document.createElement("button");
  gameReset.textContent = "New battle!";
  gameReset.setAttribute("style", "display: none");
  gameContainer.appendChild(gameReset);

  const selectWeapon = document.createElement("h1");
  selectWeapon.id = "selectWeapon";

  return { playerSelection, selectionX, selectionO, gameReset, selectWeapon };
};

const player = playerFactory();

// module 1 - player vs player gameplay
const humanGameboard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];
  let gameOver = false;
  const resetBtn = player.gameReset;
  const game = () => {
    for (let i = 0; i < 9; i += 1) {
      // create 9 buttons in a grid format of 3x3
      const gameTable = document.getElementById("gameTable");
      const gameSquare = document.createElement("button");
      gameTable.appendChild(gameSquare);

      // 'X' button: player chooses X
      player.selectionX.addEventListener("click", () => {
        player.playerSelection = "X";
        player.selectionX.setAttribute("style", "display: none");
        player.selectionO.setAttribute("style", "display: none");
        player.selectWeapon.textContent = "Fight!";
      });

      // 'O' button: player chooses O
      player.selectionO.addEventListener("click", () => {
        player.playerSelection = "O";
        player.selectionX.setAttribute("style", "display: none");
        player.selectionO.setAttribute("style", "display: none");
        player.selectWeapon.textContent = "Fight!";
      });

      // square click functionality
      const squareClick = function () {
        if (gameOver) {
          return; // Ignore click if the game is already over
        }

        // hide selection after game has started
        player.selectionX.setAttribute("style", "display: none");
        player.selectionO.setAttribute("style", "display: none");

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
          player.gameReset.setAttribute("style", "display: inline-block");
          player.selectWeapon.textContent = `Game over, player ${player.playerSelection} won!`;
        }
        if (!board.includes("") && !checkWin()) {
          gameOver = true;
          player.selectWeapon.textContent = "Tie!";
        }

        // alternate between X and O players with each click
        if (player.playerSelection === "X") {
          player.playerSelection = "O";
        } else if (player.playerSelection === "O") {
          player.playerSelection = "X";
        }
        gameSquare.removeEventListener("click", squareClick);
      };

      // reset button
      resetBtn.addEventListener("click", () => {
        gameOver = false;
        board = ["", "", "", "", "", "", "", "", ""];
        player.playerSelection = "X";
        gameSquare.textContent = board[i];
        gameSquare.addEventListener("click", squareClick);

        player.gameReset.setAttribute("style", "display: none");
        player.selectionX.setAttribute("style", "display: inline-block");
        player.selectionO.setAttribute("style", "display: inline-block");
        player.selectWeapon.textContent = "Select your weapon!";
      });

      gameSquare.addEventListener("click", squareClick);
    }
  };
  return { game };
})();

// // module 2 - player vs machine gameplay
// const machineGameboard = (function () {
//   let board = ["", "", "", "", "", "", "", "", ""];
//   let gameOver = false;
//   const resetBtn = player.gameReset;
//   const game = () => {
//     for (let i = 0; i < 9; i += 1) {
//       // create 9 buttons in a grid format of 3x3
//       const gameTable = document.getElementById("gameTable");
//       const gameSquare = document.createElement("button");
//       gameTable.appendChild(gameSquare);

//       // 'X' button: player chooses X
//       player.selectionX.addEventListener("click", () => {
//         player.playerSelection = "X";
//         player.selectionX.setAttribute("style", "display: none");
//         player.selectionO.setAttribute("style", "display: none");
//         player.selectWeapon.textContent = "Fight!";
//       });

//       // 'O' button: player chooses O
//       player.selectionO.addEventListener("click", () => {
//         player.playerSelection = "O";
//         player.selectionX.setAttribute("style", "display: none");
//         player.selectionO.setAttribute("style", "display: none");
//         player.selectWeapon.textContent = "Fight!";
//       });

//       // square click functionality
//       const squareClick = function () {
//         if (gameOver) {
//           return; // Ignore click if the game is already over
//         }

//         // hide selection after game has started
//         player.selectionX.setAttribute("style", "display: none");
//         player.selectionO.setAttribute("style", "display: none");

//         // change array items "" to playerSelection and display them on the page
//         board[i] = player.playerSelection;
//         gameSquare.textContent = board[i];

//         // check if player won
//         const winningCombinations = [
//           [0, 1, 2], // Horizontal rows
//           [3, 4, 5],
//           [6, 7, 8],
//           [0, 3, 6], // Vertical columns
//           [1, 4, 7],
//           [2, 5, 8],
//           [0, 4, 8], // Diagonals
//           [2, 4, 6],
//         ];

//         function checkWin() {
//           return winningCombinations.some((combination) =>
//             combination.every(
//               (index) => board[index] === player.playerSelection
//             )
//           );
//         }

//         // win or tie?
//         if (checkWin()) {
//           gameOver = true;
//           player.gameReset.setAttribute("style", "display: inline-block");
//           player.selectWeapon.textContent = `Game over, ${player.playerSelection} won!`;
//         }
//         if (!board.includes("") && !checkWin()) {
//           gameOver = true;
//           player.selectWeapon.textContent = "Tie!";
//         }

//         // alternate between X and O players with each click
//         if (player.playerSelection === "X") {
//           player.playerSelection = "O";
//         } else if (player.playerSelection === "O") {
//           player.playerSelection = "X";
//         }
//         gameSquare.removeEventListener("click", squareClick);
//       };

//       // reset button
//       resetBtn.addEventListener("click", () => {
//         gameOver = false;
//         board = ["", "", "", "", "", "", "", "", ""];
//         player.playerSelection = "X";
//         gameSquare.textContent = board[i];
//         gameSquare.addEventListener("click", squareClick);

//         player.gameReset.setAttribute("style", "display: none");
//         player.selectionX.setAttribute("style", "display: inline-block");
//         player.selectionO.setAttribute("style", "display: inline-block");
//         player.selectWeapon.textContent = "Select your weapon!";
//       });

//       gameSquare.addEventListener("click", squareClick);
//     }
//   };
//   return { game };
// })();

const startGameHuman = document.getElementById("startGameHuman");
const startGameMachine = document.getElementById("startGameMachine");
const claimSword = document.getElementById("claimSword");

claimSword.addEventListener("click", () => {
  claimSword.setAttribute("style", "display: none");
  startGameMachine.setAttribute("style", "display: inline-block");
  startGameHuman.setAttribute("style", "display: inline-block");
});

function humanStart() {
  player.selectionX.setAttribute("style", "display: inline-block");
  player.selectionO.setAttribute("style", "display: inline-block");
  humanGameboard.game();
  startGameHuman.setAttribute("style", "display: none");
  startGameMachine.setAttribute("style", "display: none");
  const gameContainer = document.getElementById("gameContainer");
  player.selectWeapon.textContent = "Select your weapon!";
  gameContainer.insertBefore(
    player.selectWeapon,
    gameContainer.firstChild.nextSibling.nextSibling
  );
}

startGameHuman.addEventListener("click", humanStart);

// function machineStart() {
//   player.selectionX.setAttribute("style", "display: inline-block");
//   player.selectionO.setAttribute("style", "display: inline-block");
//   startGameHuman.setAttribute("style", "display: none");
//   startGameMachine.setAttribute("style", "display: none");
//   const gameContainer = document.getElementById("gameContainer");
//   player.selectWeapon.textContent = "Select your weapon!";
//   gameContainer.insertBefore(
//     player.selectWeapon,
//     gameContainer.firstChild.nextSibling.nextSibling
//   );
//   machineGameboard.game();
// }

// startGameMachine.addEventListener("click", machineStart);
