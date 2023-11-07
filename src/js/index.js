import Gameboard from "./gameboard.js";
import Player from "./player.js";
import Computer from "./computer.js";
import { CreateGameBoard, updateBoardName } from "./boardUI.js";
import Game from "./game";
import { selectGameModal, playerWinModal } from "./modals";

let currentDirection;
let currentLocations = [];
let ships = [5, 4, 3, 3, 2];
let selectedShipIndex = 0;
let currentPlayer = 0;
let currentTiles;
let enemyTiles;
let game;
let inputDisabled = false;

const modal = document.querySelector(".modal");
let modalContent = selectGameModal();
modal.appendChild(modalContent);

const turnButton = document.querySelector("#next-turn");

turnButton.addEventListener('click',()=>{
 turnButton.style.display = "none";
  inputDisabled = false;
 showOccupied(enemyTiles);
   addHoverToTiles(currentTiles);
})

let gameboardRight = new Gameboard(10);
let gameboardLeft = new Gameboard(10);

const gameInterface = document.querySelector(".game");
let playerLeftBoard = CreateGameBoard();
let playerRightBoard = CreateGameBoard();

gameInterface.insertBefore(playerLeftBoard, gameInterface.firstChild);
gameInterface.appendChild(playerRightBoard);
let playerLeftTiles = playerLeftBoard.querySelector(".tiles");
let playerRightTiles = playerRightBoard.querySelector(".tiles");

let selectedPvE = modalContent.querySelector("#PvE");
let selectedPvP = modalContent.querySelector("#PvP");
selectedPvE.addEventListener("click", initPvEGame);
selectedPvP.addEventListener("click", initPvPGame);

function initPvEGame() {
  modal.style.display = "none";
  updateBoardName(playerLeftBoard, "Computer");
  updateBoardName(playerRightBoard, "You");
  removeHoverFromTiles(playerLeftTiles);
  //list of ships, add click event, then remove after each one placed
  currentDirection = 0;
  //add hover selection UI to boatin
  initaliseGame(playerRightTiles, gameboardRight, 0);
}

function initPvPGame() {
  console.log("selected Player Versus Player");
  console.log("Display player names");
  modal.style.display = "none";
  currentDirection = 0;
  removeHoverFromTiles(playerLeftTiles);
  currentTiles = playerRightTiles;
  initaliseGame(playerRightTiles, gameboardRight, 1);
}

function removeHoverFromTiles(tiles) {
  [...tiles.children].forEach((element) => {
    element.classList.add("disabled");
  });
}

function addHoverToTiles(tiles) {
  [...tiles.children].forEach((element) => {
    element.classList.remove("disabled");
  });
}

function initaliseGame(tiles, gameBoard, isPvP) {
  document.addEventListener("keydown", rotateShip);
  currentTiles = tiles;

  [...tiles.children].forEach((element) => {
    element.addEventListener("mouseover", () => {
      hoverPlacementPreview(element, tiles);
    });
    element.addEventListener("click", () => {
      let coords = { x: +element.dataset.col, y: +element.dataset.row };
      if (
        gameBoard.AddShipToGrid(
          ships[selectedShipIndex],
          coords,
          currentDirection
        )
      ) {
        currentLocations.forEach((element) => {
          element.classList.add("occupied");
        });
        selectedShipIndex++;
        if (selectedShipIndex === ships.length) {
          document.removeEventListener("keydown", rotateShip);
          element.onclick = null;
          element.onmouseover = null;
          if (isPvP > 0) {
              removeHoverPlacementToBoard(tiles)
            //if PvP = 1, first player setup complete setup second player, else ,play PvP game
            if (isPvP === 1) {
              currentLocations = [];
              removeHoverFromTiles(playerRightTiles);
              //list of ships, add click event, then remove after each one placed
              currentDirection = 0;
              //add hover selection UI to boatin
              selectedShipIndex = 0;
              hideOccupied(playerRightTiles);
              resetBoard(tiles);
              initaliseGame(playerLeftTiles, gameboardLeft, 2);
            } else {
              showOccupied(playerRightTiles);
              console.log("startPvPgame(tiles)");
              startPvPgame();
            }
          } else {
            startPvEgame(tiles);
          }
        }
      }
    });
  });
}

function hoverPlacementPreview(element, tiles) {
  //remove hover placement from last location

  removeHoverPlacementToBoard();
  let coords = { x: +element.dataset.col, y: +element.dataset.row };
  if (currentDirection === 0) {
    currentLocations = getHorizontalPlacementTiles(coords, tiles);
  } else {
    currentLocations = getVericalPlacementTiles(coords, tiles);
  }
  //if the returned coords can fit a ship, mark tiles valid else mark tiles invalid
  if (currentLocations.length == ships[selectedShipIndex]) {
    currentLocations.forEach((element) => {
      element.classList.add("valid");
    });
  } else {
    currentLocations.forEach((element) => {
      element.classList.add("hit");
    });
  }
}

function removeHoverPlacementToBoard() {
  if (currentLocations !== undefined)
    currentLocations.forEach((element) => {
      element.classList.remove("hit");
      element.classList.remove("valid");
    });
}

function getHorizontalPlacementTiles(coords, tiles) {
  let locations = [];
  for (let i = 0; i < ships[selectedShipIndex]; i++) {
    let x = coords.x + i;
    let tile = tiles.querySelector(`[data-row="${coords.y}"][data-col="${x}"]`);
    if (tile != null && !tile.classList.contains("occupied")) {
      locations.push(tile);
    }
  }
  return locations;
}
function getVericalPlacementTiles(coords, tiles) {
  let locations = [];
  for (let i = 0; i < ships[selectedShipIndex]; i++) {
    let tile = tiles.querySelector(
      `[data-row="${coords.y + i}"][data-col="${coords.x}"]`
    );
    if (tile != null && !tile.classList.contains("occupied")) {
      locations.push(tile);
    }
  }
  return locations;
}

function startPvPgame() {
  //get rid of placement event listeners
  resetBoard(playerRightTiles);
  resetBoard(playerLeftTiles);
  //add hover to tiles of first playerr
  removeHoverFromTiles(playerRightTiles);
  addHoverToTiles(playerLeftTiles);
  let playerOne = new Player("Player One", gameboardLeft);
  let playerTwo = new Player("Player Two", gameboardRight);
  currentPlayer = 0;
   game = new Game(playerOne, playerTwo);
  hideOccupied(playerLeftTiles);

  [...playerLeftTiles.children].forEach((element) => {
    element.addEventListener("click", () => {
      enemyTiles = playerLeftTiles;
      currentTiles = playerRightTiles;
      PvPTurn(element, 0, playerOne,playerRightTiles,playerLeftTiles);

    });
  });

  [...playerRightTiles.children].forEach((element) => {
    element.addEventListener("click", () => {
      enemyTiles = playerRightTiles;
      currentTiles = playerLeftTiles;
      PvPTurn(element, 1, playerTwo,playerLeftTiles,playerRightTiles);

    });
  });
  
}

function startPvEgame(tiles) {
  resetBoard(tiles);
  removeHoverFromTiles(playerRightTiles);
  addHoverToTiles(playerLeftTiles);
  //simulate Game

  let computer = new Computer("Computer", gameboardLeft);
  //generate sips on the blank board for the player to use
  computer.placeRandomShipsOnBoard();
  let player = new Player("You", computer.gameBoard);
  computer = new Computer("Computer", gameboardRight);

   game = new Game(player, computer);

  [...playerLeftTiles.children].forEach((element) => {
    element.addEventListener("click", () => {
      //make Player Move
      let coords = { x: +element.dataset.col, y: +element.dataset.row };
      let move = game.MakeMove(coords);
      if (move === 2) {
        element.classList.add("hit");
        displayEndScreen(player.playerName);
        return;
      } else if (move === 1) {
        element.classList.add("hit");
      } else if (move === 0) {
        element.classList.add("miss");
      } else {
        return;
      }
      //make AI move
      let pcMoveCoords = computer.GenerateRandomMove();
      move = game.MakeMove(pcMoveCoords);
      let shotTile = playerRightTiles.querySelector(
        `[data-row="${pcMoveCoords.y}"][data-col="${pcMoveCoords.x}"]`
      );
      if (move === 2) {
        shotTile.classList.add("hit");
        displayEndScreen(computer.playerName);
        return;
      } else if (move === 1) {
        shotTile.classList.add("hit");
      } else if (move === 0) {
        shotTile.classList.add("miss");
      }
    });
  });
}

function PvPTurn(element, playerId, player) {

  if (currentPlayer === playerId && !inputDisabled) {
    let coords = { x: +element.dataset.col, y: +element.dataset.row };
    let move = game.MakeMove(coords);
    if (move === 2) {
      element.classList.add("hit");
      displayEndScreen(player.playerName);
      return;
    } else if (move === 1) {
      element.classList.add("hit");
      switchDisplay(currentTiles, enemyTiles);
      currentPlayer = ++currentPlayer % 2;
    } else if (move === 0) {
      element.classList.add("miss");
      switchDisplay(currentTiles, enemyTiles);
      currentPlayer = ++currentPlayer % 2;
    }
  }
  return;
}

function switchDisplay(currentTiles, enemyTiles) {
   inputDisabled = true;
  hideOccupied(currentTiles);
   removeHoverFromTiles(enemyTiles);
  removeHoverFromTiles(currentTiles);
   turnButton.style.display = "inline";
}

function displayEndScreen(player) {
  modal.removeChild(modal.firstChild);
  let winnerDiv = playerWinModal(player);
  modal.appendChild(winnerDiv);
  modal.style.display = "flex";
  winnerDiv.querySelector("#newgame");
  winnerDiv.addEventListener("click", resetGame);
}

function resetGame() {
  playerLeftBoard = CreateGameBoard();
  playerRightBoard = CreateGameBoard();

  gameInterface.firstElementChild.remove();
  gameInterface.lastElementChild.remove();

  gameInterface.insertBefore(playerLeftBoard, gameInterface.firstChild);
  gameInterface.appendChild(playerRightBoard);
  playerLeftTiles = playerLeftBoard.querySelector(".tiles");
  playerRightTiles = playerRightBoard.querySelector(".tiles");

  modal.firstElementChild.remove();
  modal.appendChild(modalContent);

  gameboardRight = new Gameboard(10);
  gameboardLeft = new Gameboard(10);

  selectedShipIndex = 0;
}

function rotateShip(e) {
  console.log(e.code === "Space");
  if (currentDirection === 0) {
    currentDirection = 1;
  } else {
    currentDirection = 0;
  }
  if (currentLocations.length > 0) {
    let currentLocation = currentLocations[0];
    hoverPlacementPreview(currentLocation, currentTiles);
  }
}

function resetBoard(tiles) {
  [...tiles.children].forEach((x) => {
    let clone = x.cloneNode(true);
    x.parentNode.replaceChild(clone, x);
  });
}


function hideOccupied(tiles) {
  tiles.querySelectorAll(".occupied").forEach((element) => {
    element.classList.remove("occupied");
    element.classList.add("occupied-hidden");
  });
}

function showOccupied(tiles) {
  tiles.querySelectorAll(".occupied-hidden").forEach((element) => {
    element.classList.remove("occupied-hidden");
    element.classList.add("occupied");
  });
}
