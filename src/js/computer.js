import Player from "./player.js";

export default class Computer extends Player {
  constructor(playerName, gameBoard) {
    super(playerName, gameBoard);
    this.moves = [];
    this.lastShotHit = false;
    this.lastShot = false;
  }

  MakeRandomMove() {
    let coords;
    console.log(this.moves.length);
    if (this.moves.length > 0) {
        coords = this.moves.shift();
      
    } else {
      let x1 = this.getRandomInt(this.gameBoard.grid.length);
      let y1 = this.getRandomInt(this.gameBoard.grid.length);
      coords = this.getValidShot(x1, y1);
    }

    
    if (this.gameBoard.grid[coords.y][coords.x] >= 1 ) {

        console.log("WE NEWHIT");
        this.addHitMove(coords);
   
    }
    return coords;
  }

  GenerateRandomMove() {
    let x = this.getRandomInt(this.gameBoard.grid.length);
    let y = this.getRandomInt(this.gameBoard.grid.length);
    return this.getValidShot(x, y);
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  placeRandomShipsOnBoard() {
    let shipLengths = [5, 4, 3, 3, 2];
    for (let s = 0; s < shipLengths.length; s++) {
      let direction = this.getRandomInt(2);
      let rX = 0;
      let rY = 0;
      if (direction === 1) {
        rX = this.getRandomInt(this.gameBoard.grid.length);
        rY = this.getRandomInt(this.gameBoard.grid.length - shipLengths[s]);
      } else {
        rX = this.getRandomInt(this.gameBoard.grid.length - shipLengths[s]);
        rY = this.getRandomInt(this.gameBoard.grid.length);
      }
      let coords = { x: rX, y: rY };
      //if location is invalid, try place the ship again
      if (
        this.gameBoard.AddShipToGrid(shipLengths[s], coords, direction) ===
        false
      ) {
        s--;
      }
    }
  }

  getValidShot(x, y) {
    let j = y;
    let i = x;

    if (this.gameBoard.grid[j][i] !== -1) {
      return { x: i, y: j };
    }

    for (let j = y; j < this.gameBoard.grid.length + 1; j++) {
      if (j === this.gameBoard.grid.length) {
        j = 0;
      }
      for (let i = 0; i < this.gameBoard.grid.length; i++) {
        if (this.gameBoard.grid[j][i] !== -1) {
          return { x: i, y: j };
        }
      }
    }
  }

  addHitMove(coords) {
    //add possible up and down left right coords only if not already in queue
    
    if (
      coords.y - 1 >= 0 &&
      this.gameBoard.grid[coords.y - 1][coords.x] !== -1
    ) {
      if(!this.moves.some(tempcoord => coords.x === tempcoord.x && coords.y -1 === tempcoord.y )){
        this.moves.push({ x: coords.x, y: coords.y - 1 });
      }
    }
    if (
      coords.y + 1 < this.gameBoard.grid.length &&
      this.gameBoard.grid[coords.y + 1][coords.x] !== -1
    ) {
      if(!this.moves.some(tempcoord => coords.x === tempcoord.x && coords.y  +1 === tempcoord.y )){
      this.moves.push({ x: coords.x, y: coords.y + 1 });
      }
    }
    if (
      coords.x - 1 >= 0 &&
      this.gameBoard.grid[coords.y][coords.x - 1] !== -1
    ) {
      if(!this.moves.some(tempcoord => coords.x -1 === tempcoord.x && coords.y  === tempcoord.y )){
      this.moves.push({ x: coords.x - 1, y: coords.y });
      }
    }
    if (
      coords.x + 1 < this.gameBoard.grid.length &&
      this.gameBoard.grid[coords.y][coords.x + 1] !== -1
    ) {
      if(!this.moves.some(tempcoord => coords.x +1 === tempcoord.x && coords.y  === tempcoord.y )){
      this.moves.push({ x: coords.x + 1, y: coords.y});
      }
    }
  }

}
