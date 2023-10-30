
import Gameboard from "./gameboard.js";
import Player from "./player.js";

import prompt from "prompt";

let coodsary = [
    {x:0,y:0},
    {x:1,y:0},
    {x:0,y:3},
    {x:1,y:3},
    {x:2,y:3},
    {x:3,y:3},
    {x:6,y:4},
    {x:6,y:5},
    {x:6,y:6},
    {x:6,y:7},
    {x:6,y:8},
    {x:6,y:9},
    {x:0,y:9},
    {x:1,y:9},
    {x:2,y:9},
    {x:3,y:9},
    {x:4,y:9},
]

let gameboard = new Gameboard(10);

let shiplength = 2;
let coords = { x: 0, y: 0 };
gameboard.AddShipToGrid(shiplength, coords, 0);

shiplength = 3;
coords = { x: 6, y: 4 };
gameboard.AddShipToGrid(shiplength, coords, 1);

shiplength = 3;
coords = { x: 6, y: 7 };
gameboard.AddShipToGrid(shiplength, coords, 1);

shiplength = 4;
coords = { x: 0, y: 3 };
gameboard.AddShipToGrid(shiplength, coords, 0);

shiplength = 5;
coords = { x: 0, y: 9 };
gameboard.AddShipToGrid(shiplength, coords, 0);


let player = new Player("bryny",gameboard);
console.table(player.gameBoard.grid);


let coordi = 0;
while(player.gameBoard.AllSunk()!==true){

    player.MakeMove(coodsary[coordi]);
    console.table(player.gameBoard.grid);
    coordi++;
}
console.log("game OVER");


