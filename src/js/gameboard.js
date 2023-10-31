import Ship from "./ship.js";

export default class Gameboard {
  ships = [];
  constructor(gridSize) {
    this.grid = new Array(gridSize);
    this.gridSize = gridSize;
    for (let i = 0; i < gridSize; i++) {
      this.grid[i] = Array(gridSize).fill(0);
    }
  }
  //direction 1 = veritcal, 0 = horizontal
  AddShipToGrid(shiplength, coords, direction) {
    if (direction === 1) {
      if (this.validVerticalInput(coords, shiplength) === false) {
        return false;
      }
      this.placeShipVertical(coords, shiplength, this.ships.length +1);
    } else {
      if (this.validHorizontalInput(coords, shiplength) === false) {
        return false;
      }
      this.placeShipHorizontal(coords, shiplength, this.ships.length + 1);
    }
    this.ships.push(new Ship(shiplength));
    let ship = this.ships[this.ships.length - 1];
    return true;
  }

  placeShipHorizontal(coords, shiplength, shipid) {
    for (let i = 0; i < shiplength; i++) {
      this.grid[coords.y][coords.x + i] = shipid;
    }
  }
  placeShipVertical(coords, shiplength, shipid) {
    for (let i = 0; i < shiplength; i++) {
      this.grid[coords.y + i][coords.x] = shipid;
    }
  }

  AllSunk() {
   for(let i = 0 ; i < this.ships.length; i++){
    if (this.ships[i].isSunk() === false){
      return false;
    }
   }
   return true;
  }

  validHorizontalInput(coords, length) {
    for (let i = 0; i < length; i++) {
      if(this.validInput(coords.y, coords.x + i) === false){
        return false;
      }
    }
    return true;
  }
  validVerticalInput(coords, length) {
    for (let i = 0; i < length; i++) {
        if(this.validInput(coords.y + i, coords.x) === false){
        return false;
      }
    }
    return true;
  }

  validInput(y, x) {
    if (
      x >= this.gridSize ||
      x < 0 ||
      y >= this.gridSize ||
      y < 0 ||
      this.grid[y][x] !== 0
    ) {
      return false;
    }
    return true;
  }

  validShotInput(y, x) {
    if (
      x >= this.gridSize ||
      x < 0 ||
      y >= this.gridSize ||
      y < 0 || this.grid[y][x] === -1) {
      return false;
    }
    return true;
  }

  ReceiveAttack(coords){
    if(!this.validShotInput(coords.y,coords.x)){
      throw new Error("Invalid Input");
    }
    if(this.grid[coords.y][coords.x] === 0){
      this.grid[coords.y][coords.x] = -1;
      return 0;
    }else{
      this.ships[this.grid[coords.y][coords.x] -1].hit();
      this.grid[coords.y][coords.x] = -1;
      return 1;
    }
  }
}
