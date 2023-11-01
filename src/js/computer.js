import Player from "./player.js";

export default class Computer extends Player {
  constructor(playerName, gameBoard) {
    super(playerName, gameBoard);
    this.moves = [];
  }

  MakeRandomMove() {
    let x = this.getRandomInt(this.gameBoard.grid.length);
    let y = this.getRandomInt(this.gameBoard.grid.length);
    let coords = this.getValidShot(x,y);
     return {status:this.MakeMove(coords),coords};
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  getValidShot(x,y) {
    let j = y;
    let i = x;

    if(this.gameBoard.grid[j][i] !== -1){
        return {x:i,y:j};
    }

    for (let j = y; j < this.gameBoard.grid.length  + 1; j++) {
      if (j === this.gameBoard.grid.length) {
        j = 0;
      }
      for (let i = 0; i < this.gameBoard.grid.length ; i++ ) {
        if(this.gameBoard.grid[j][i] !== -1){
            return {x:i,y:j};
        }
      }
    }
  }
}
