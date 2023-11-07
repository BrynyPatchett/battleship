(()=>{"use strict";class e{hits=0;constructor(e){this.length=e}hit(){this.hits++}isSunk(){return!(this.hits<this.length)}}class t{ships=[];constructor(e){this.grid=new Array(e),this.gridSize=e;for(let t=0;t<e;t++)this.grid[t]=Array(e).fill(0)}AddShipToGrid(t,i,r){if(1===r){if(!1===this.validVerticalInput(i,t))return!1;this.placeShipVertical(i,t,this.ships.length+1)}else{if(!1===this.validHorizontalInput(i,t))return!1;this.placeShipHorizontal(i,t,this.ships.length+1)}return this.ships.push(new e(t)),this.ships[this.ships.length-1],!0}placeShipHorizontal(e,t,i){for(let r=0;r<t;r++)this.grid[e.y][e.x+r]=i}placeShipVertical(e,t,i){for(let r=0;r<t;r++)this.grid[e.y+r][e.x]=i}AllSunk(){for(let e=0;e<this.ships.length;e++)if(!1===this.ships[e].isSunk())return!1;return!0}validHorizontalInput(e,t){for(let i=0;i<t;i++)if(!1===this.validInput(e.y,e.x+i))return!1;return!0}validVerticalInput(e,t){for(let i=0;i<t;i++)if(!1===this.validInput(e.y+i,e.x))return!1;return!0}validInput(e,t){return!(t>=this.gridSize||t<0||e>=this.gridSize||e<0||0!==this.grid[e][t])}validShotInput(e,t){return!(t>=this.gridSize||t<0||e>=this.gridSize||e<0||-1===this.grid[e][t])}ReceiveAttack(e){if(!this.validShotInput(e.y,e.x))throw new Error("Invalid Input");return 0===this.grid[e.y][e.x]?(this.grid[e.y][e.x]=-1,0):(this.ships[this.grid[e.y][e.x]-1].hit(),this.grid[e.y][e.x]=-1,1)}}class i{constructor(e,t){this.playerName=e,this.gameBoard=t}MakeMove(e){try{return this.gameBoard.ReceiveAttack(e)}catch{return-1}}}class r extends i{constructor(e,t){super(e,t),this.moves=[]}MakeRandomMove(){let e=this.getRandomInt(this.gameBoard.grid.length),t=this.getRandomInt(this.gameBoard.grid.length),i=this.getValidShot(e,t);return{status:this.MakeMove(i),coords:i}}GenerateRandomMove(){let e=this.getRandomInt(this.gameBoard.grid.length),t=this.getRandomInt(this.gameBoard.grid.length);return this.getValidShot(e,t)}getRandomInt(e){return Math.floor(Math.random()*e)}placeRandomShipsOnBoard(){let e=[5,4,3,3,2];for(let t=0;t<e.length;t++){let i=this.getRandomInt(2),r=0,n=0;1===i?(r=this.getRandomInt(this.gameBoard.grid.length),n=this.getRandomInt(this.gameBoard.grid.length-e[t])):(r=this.getRandomInt(this.gameBoard.grid.length-e[t]),n=this.getRandomInt(this.gameBoard.grid.length));let s={x:r,y:n};!1===this.gameBoard.AddShipToGrid(e[t],s,i)&&t--}}getValidShot(e,t){let i=t,r=e;if(-1!==this.gameBoard.grid[i][r])return{x:r,y:i};for(let e=t;e<this.gameBoard.grid.length+1;e++){e===this.gameBoard.grid.length&&(e=0);for(let t=0;t<this.gameBoard.grid.length;t++)if(-1!==this.gameBoard.grid[e][t])return{x:t,y:e}}}}function n(){let e=document.createElement("div");e.classList.add("board");let t=document.createElement("div");t.classList.add("name"),t.textContent="Player",e.appendChild(t);let i=document.createElement("div");i.classList.add("tiles");for(let e=0;e<10;e++)for(let t=0;t<10;t++){let r=document.createElement("div");r.classList.add("tile"),r.dataset.row=e,r.dataset.col=t,i.appendChild(r)}return e.appendChild(i),e}function s(e,t){e.querySelector(".name").textContent=t}class l{players=[];constructor(e,t){this.players.push(e),this.players.push(t),this.currentPlayerIndex=0,this.currentPlayer=this.players[this.currentPlayerIndex]}MakeMove(e){let t;console.log(this.currentPlayer);let i=this.currentPlayer.MakeMove(e);if(1===i){if(t=1,console.log(this.currentPlayer.gameBoard.AllSunk()),!0!==this.currentPlayer.gameBoard.AllSunk())return this.switchPlayerTurn(),t;t=2}else 0===i?(t=0,this.switchPlayerTurn()):(console.log("Bad Move"),t=-1);return t}switchPlayerTurn(){this.currentPlayerIndex=++this.currentPlayerIndex%2,this.currentPlayer=this.players[this.currentPlayerIndex]}}function a(e){let t=document.createElement("div");return t.classList.add("game-choice"),t.textContent=e,t}function d(e,t){let i=document.createElement("div");return i.classList.add("game-button"),i.textContent=e,i.id=t,i}let o,c,h,u,p=[],m=[5,4,3,3,2],g=0,y=0,f=!1;const v=document.querySelector(".modal");let S=function(){let e=a("Select Game Type"),t=d("Player vs Computer","PvE"),i=d("Player vs Player","PvP"),r=document.createElement("div");return r.classList.add("modal-content"),r.appendChild(e),r.appendChild(t),r.appendChild(i),r}();v.appendChild(S);const L=document.querySelector("#next-turn");L.addEventListener("click",(()=>{L.style.display="none",f=!1,Y(h),q(c)}));let E=new t(10),w=new t(10);const x=document.querySelector(".game");let P=n(),C=n();x.insertBefore(P,x.firstChild),x.appendChild(C);let k=P.querySelector(".tiles"),I=C.querySelector(".tiles"),B=S.querySelector("#PvE"),M=S.querySelector("#PvP");function R(e){[...e.children].forEach((e=>{e.classList.add("disabled")}))}function q(e){[...e.children].forEach((e=>{e.classList.remove("disabled")}))}function A(e,t,n){document.addEventListener("keydown",b),c=e,[...e.children].forEach((s=>{s.addEventListener("mouseover",(()=>{z(s,e)})),s.addEventListener("click",(()=>{let a={x:+s.dataset.col,y:+s.dataset.row};t.AddShipToGrid(m[g],a,o)&&(p.forEach((e=>{e.classList.add("occupied")})),g++,g===m.length&&(document.removeEventListener("keydown",b),s.onclick=null,s.onmouseover=null,n>0?(T(),1===n?(p=[],R(I),o=0,g=0,O(I),H(e),A(k,w,2)):(Y(I),console.log("startPvPgame(tiles)"),function(){H(I),H(k),R(I),q(k);let e=new i("Player One",w),t=new i("Player Two",E);y=0,u=new l(e,t),O(k),[...k.children].forEach((t=>{t.addEventListener("click",(()=>{h=k,c=I,V(t,0,e)}))})),[...I.children].forEach((e=>{e.addEventListener("click",(()=>{h=I,c=k,V(e,1,t)}))}))}())):function(e){H(e),R(I),q(k);let t=new r("Computer",w);t.placeRandomShipsOnBoard();let n=new i("You",t.gameBoard);t=new r("Computer",E),u=new l(n,t),[...k.children].forEach((e=>{e.addEventListener("click",(()=>{let i={x:+e.dataset.col,y:+e.dataset.row},r=u.MakeMove(i);if(2===r)return e.classList.add("hit"),void N(n.playerName);if(1===r)e.classList.add("hit");else{if(0!==r)return;e.classList.add("miss")}let s=t.GenerateRandomMove();r=u.MakeMove(s);let l=I.querySelector(`[data-row="${s.y}"][data-col="${s.x}"]`);if(2===r)return l.classList.add("hit"),void N(t.playerName);1===r?l.classList.add("hit"):0===r&&l.classList.add("miss")}))}))}(e)))}))}))}function z(e,t){T();let i={x:+e.dataset.col,y:+e.dataset.row};p=0===o?function(e,t){let i=[];for(let r=0;r<m[g];r++){let n=e.x+r,s=t.querySelector(`[data-row="${e.y}"][data-col="${n}"]`);null==s||s.classList.contains("occupied")||i.push(s)}return i}(i,t):function(e,t){let i=[];for(let r=0;r<m[g];r++){let n=t.querySelector(`[data-row="${e.y+r}"][data-col="${e.x}"]`);null==n||n.classList.contains("occupied")||i.push(n)}return i}(i,t),p.length==m[g]?p.forEach((e=>{e.classList.add("valid")})):p.forEach((e=>{e.classList.add("hit")}))}function T(){void 0!==p&&p.forEach((e=>{e.classList.remove("hit"),e.classList.remove("valid")}))}function V(e,t,i){if(y===t&&!f){let t={x:+e.dataset.col,y:+e.dataset.row},r=u.MakeMove(t);if(2===r)return e.classList.add("hit"),void N(i.playerName);1===r?(e.classList.add("hit"),G(c,h),y=++y%2):0===r&&(e.classList.add("miss"),G(c,h),y=++y%2)}}function G(e,t){f=!0,O(e),R(t),R(e),L.style.display="inline"}function N(e){v.removeChild(v.firstChild);let t=function(e){let t=a(`${e} won!`),i=d("New Game","newgame"),r=document.createElement("div");return r.classList.add("modal-content"),r.appendChild(t),r.appendChild(i),r}(e);v.appendChild(t),v.style.display="flex",t.querySelector("#newgame"),t.addEventListener("click",$)}function $(){P=n(),C=n(),x.firstElementChild.remove(),x.lastElementChild.remove(),x.insertBefore(P,x.firstChild),x.appendChild(C),k=P.querySelector(".tiles"),I=C.querySelector(".tiles"),v.firstElementChild.remove(),v.appendChild(S),E=new t(10),w=new t(10),g=0}function b(e){console.log("Space"===e.code),o=0===o?1:0,p.length>0&&z(p[0],c)}function H(e){[...e.children].forEach((e=>{let t=e.cloneNode(!0);e.parentNode.replaceChild(t,e)}))}function O(e){e.querySelectorAll(".occupied").forEach((e=>{e.classList.remove("occupied"),e.classList.add("occupied-hidden")}))}function Y(e){e.querySelectorAll(".occupied-hidden").forEach((e=>{e.classList.remove("occupied-hidden"),e.classList.add("occupied")}))}B.addEventListener("click",(function(){v.style.display="none",s(P,"Computer"),s(C,"You"),R(k),o=0,A(I,E,0)})),M.addEventListener("click",(function(){console.log("selected Player Versus Player"),console.log("Display player names"),v.style.display="none",o=0,R(k),c=I,A(I,E,1)}))})();