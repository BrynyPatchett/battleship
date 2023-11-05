(()=>{"use strict";class e{hits=0;constructor(e){this.length=e}hit(){this.hits++}isSunk(){return!(this.hits<this.length)}}class t{ships=[];constructor(e){this.grid=new Array(e),this.gridSize=e;for(let t=0;t<e;t++)this.grid[t]=Array(e).fill(0)}AddShipToGrid(t,r,i){if(1===i){if(!1===this.validVerticalInput(r,t))return!1;this.placeShipVertical(r,t,this.ships.length+1)}else{if(!1===this.validHorizontalInput(r,t))return!1;this.placeShipHorizontal(r,t,this.ships.length+1)}return this.ships.push(new e(t)),this.ships[this.ships.length-1],!0}placeShipHorizontal(e,t,r){for(let i=0;i<t;i++)this.grid[e.y][e.x+i]=r}placeShipVertical(e,t,r){for(let i=0;i<t;i++)this.grid[e.y+i][e.x]=r}AllSunk(){for(let e=0;e<this.ships.length;e++)if(!1===this.ships[e].isSunk())return!1;return!0}validHorizontalInput(e,t){for(let r=0;r<t;r++)if(!1===this.validInput(e.y,e.x+r))return!1;return!0}validVerticalInput(e,t){for(let r=0;r<t;r++)if(!1===this.validInput(e.y+r,e.x))return!1;return!0}validInput(e,t){return!(t>=this.gridSize||t<0||e>=this.gridSize||e<0||0!==this.grid[e][t])}validShotInput(e,t){return!(t>=this.gridSize||t<0||e>=this.gridSize||e<0||-1===this.grid[e][t])}ReceiveAttack(e){if(!this.validShotInput(e.y,e.x))throw new Error("Invalid Input");return 0===this.grid[e.y][e.x]?(this.grid[e.y][e.x]=-1,0):(this.ships[this.grid[e.y][e.x]-1].hit(),this.grid[e.y][e.x]=-1,1)}}class r{constructor(e,t){this.playerName=e,this.gameBoard=t}MakeMove(e){try{return this.gameBoard.ReceiveAttack(e)}catch{return-1}}}class i extends r{constructor(e,t){super(e,t),this.moves=[]}MakeRandomMove(){let e=this.getRandomInt(this.gameBoard.grid.length),t=this.getRandomInt(this.gameBoard.grid.length),r=this.getValidShot(e,t);return{status:this.MakeMove(r),coords:r}}GenerateRandomMove(){let e=this.getRandomInt(this.gameBoard.grid.length),t=this.getRandomInt(this.gameBoard.grid.length);return this.getValidShot(e,t)}getRandomInt(e){return Math.floor(Math.random()*e)}placeRandomShipsOnBoard(){let e=[5,4,3,3,2];for(let t=0;t<e.length;t++){let r=this.getRandomInt(2),i=0,s=0;1===r?(i=this.getRandomInt(this.gameBoard.grid.length),s=this.getRandomInt(this.gameBoard.grid.length-e[t])):(i=this.getRandomInt(this.gameBoard.grid.length-e[t]),s=this.getRandomInt(this.gameBoard.grid.length));let l={x:i,y:s};!1===this.gameBoard.AddShipToGrid(e[t],l,r)&&t--}}getValidShot(e,t){let r=t,i=e;if(-1!==this.gameBoard.grid[r][i])return{x:i,y:r};for(let e=t;e<this.gameBoard.grid.length+1;e++){e===this.gameBoard.grid.length&&(e=0);for(let t=0;t<this.gameBoard.grid.length;t++)if(-1!==this.gameBoard.grid[e][t])return{x:t,y:e}}}}function s(){let e=document.createElement("div");e.classList.add("board");let t=document.createElement("div");t.classList.add("name"),t.textContent="Player",e.appendChild(t);let r=document.createElement("div");r.classList.add("tiles");for(let e=0;e<10;e++)for(let t=0;t<10;t++){let i=document.createElement("div");i.classList.add("tile"),i.dataset.row=e,i.dataset.col=t,r.appendChild(i)}return e.appendChild(r),e}function l(e,t){e.querySelector(".name").textContent=t}class a{players=[];constructor(e,t){this.players.push(e),this.players.push(t),this.currentPlayerIndex=0,this.currentPlayer=this.players[this.currentPlayerIndex]}MakeMove(e){let t;console.log(this.currentPlayer);let r=this.currentPlayer.MakeMove(e);if(1===r){if(t=1,console.log(this.currentPlayer.gameBoard.AllSunk()),!0!==this.currentPlayer.gameBoard.AllSunk())return this.switchPlayerTurn(),t;t=2}else 0===r?(t=0,this.switchPlayerTurn()):(console.log("Bad Move"),t=-1);return t}switchPlayerTurn(){this.currentPlayerIndex=++this.currentPlayerIndex%2,this.currentPlayer=this.players[this.currentPlayerIndex],console.log(this.currentPlayer.playerName+"TURN")}}let o,n=[],d=[5,4,3,3,2],h=0;const c=document.querySelector(".modal");document.querySelector(".modal-content");let u=new t(10),g=new t(10);const m=document.querySelector(".game");let p=s(),y=s();m.insertBefore(p,m.firstChild),m.appendChild(y);let f,v=p.querySelector(".tiles"),S=y.querySelector(".tiles"),x=document.querySelector("#PvE"),B=document.querySelector("#PvP");function I(e){[...e.children].forEach((e=>{e.classList.add("disabled")}))}function P(e){c.style.display="flex"}x.addEventListener("click",(()=>{var e,t;console.log("selected Player Versus Computer"),c.style.display="none",l(p,"Computer"),l(y,"You"),I(v),o=0,t=u,[...(e=S).children].forEach((s=>{s.addEventListener("mouseover",f=function(){!function(e,t){n.forEach((e=>{e.classList.remove("hit"),e.classList.remove("valid")})),n=[];let r={x:+e.dataset.col,y:+e.dataset.row};n=0===o?function(e,t){let r=[];for(let i=0;i<d[h];i++){let s=e.x+i,l=t.querySelector(`[data-row="${e.y}"][data-col="${s}"]`);null==l||l.classList.contains("occupied")||r.push(l)}return console.log(r),r}(r,t):function(e,t){let r=[];for(let i=0;i<d[h];i++){let s=t.querySelector(`[data-row="${e.y+i}"][data-col="${e.x}"]`);null==s||s.classList.contains("occupied")||r.push(s)}return r}(r,t),n.length==d[h]?n.forEach((e=>{e.classList.add("valid")})):n.forEach((e=>{e.classList.add("hit")}))}(s,e)}),s.addEventListener("click",(()=>{let l={x:+s.dataset.col,y:+s.dataset.row};t.AddShipToGrid(d[h],l,o)&&(n.forEach((e=>{e.classList.add("occupied")})),h++,h===d.length&&(console.log("removing click from"+s),function(e){[...e.children].forEach((e=>{let t=e.cloneNode(!0);e.parentNode.replaceChild(t,e)})),I(S),function(e){[...e.children].forEach((e=>{e.classList.remove("disabled")}))}(v);let t=new i("Computer",g);t.placeRandomShipsOnBoard(),console.log(t.gameBoard);let s=new r("Player",t.gameBoard);console.log(s),t=new i("Computer",u),console.log(t);let l=new a(s,t);[...v.children].forEach((e=>{e.addEventListener("click",(()=>{let r={x:+e.dataset.col,y:+e.dataset.row},i=l.MakeMove(r);if(2===i)return console.log(l.currentPlayer.playerName+"Wins"),void P(s.playerName);if(1===i)e.classList.add("hit");else{if(0!==i)return void console.log("Bad Move");e.classList.add("miss")}let a=t.GenerateRandomMove();i=l.MakeMove(a);let o=S.querySelector(`[data-row="${a.y}"][data-col="${a.x}"]`);if(console.log("AI Move: "+i),2===i)return console.log(l.currentPlayer.playerName+"Wins"),void P(t.playerName);if(1===i)o.classList.add("hit");else{if(0!==i)return void console.log("Bad Move");o.classList.add("miss")}}))}))}(e)))}))}))})),B.addEventListener("click",(()=>{console.log("selected Player Versus Player"),console.log("Display player names"),c.style.display="none",o=0,I(v),addHoverPlacementToBoard(S,1)}))})();