(()=>{"use strict";class e{hits=0;constructor(e){this.length=e}hit(){this.hits++}isSunk(){return!(this.hits<this.length)}}class t{ships=[];constructor(e){this.grid=new Array(e),this.gridSize=e;for(let t=0;t<e;t++)this.grid[t]=Array(e).fill(0)}AddShipToGrid(t,i,l){if(1===l){if(!1===this.validVerticalInput(i,t))return!1;this.placeShipVertical(i,t,this.ships.length+1)}else{if(!1===this.validHorizontalInput(i,t))return!1;this.placeShipHorizontal(i,t,this.ships.length+1)}return this.ships.push(new e(t)),this.ships[this.ships.length-1],!0}placeShipHorizontal(e,t,i){for(let l=0;l<t;l++)this.grid[e.y][e.x+l]=i}placeShipVertical(e,t,i){for(let l=0;l<t;l++)this.grid[e.y+l][e.x]=i}AllSunk(){for(let e=0;e<this.ships.length;e++)if(!1===this.ships[e].isSunk())return!1;return!0}validHorizontalInput(e,t){for(let i=0;i<t;i++)if(!1===this.validInput(e.y,e.x+i))return!1;return!0}validVerticalInput(e,t){for(let i=0;i<t;i++)if(!1===this.validInput(e.y+i,e.x))return!1;return!0}validInput(e,t){return!(t>=this.gridSize||t<0||e>=this.gridSize||e<0||0!==this.grid[e][t])}validShotInput(e,t){return!(t>=this.gridSize||t<0||e>=this.gridSize||e<0||-1===this.grid[e][t])}ReceiveAttack(e){if(!this.validShotInput(e.y,e.x))throw new Error("Invalid Input");return 0===this.grid[e.y][e.x]?(this.grid[e.y][e.x]=-1,0):(this.ships[this.grid[e.y][e.x]-1].hit(),this.grid[e.y][e.x]=-1,1)}}class i{constructor(e,t){this.playerName=e,this.gameBoard=t}MakeMove(e){try{return this.gameBoard.ReceiveAttack(e)}catch{return-1}}}class l extends i{constructor(e,t){super(e,t),this.moves=[]}MakeRandomMove(){let e=this.getRandomInt(this.gameBoard.grid.length),t=this.getRandomInt(this.gameBoard.grid.length),i=this.getValidShot(e,t);return{status:this.MakeMove(i),coords:i}}GenerateRandomMove(){let e=this.getRandomInt(this.gameBoard.grid.length),t=this.getRandomInt(this.gameBoard.grid.length);return this.getValidShot(e,t)}getRandomInt(e){return Math.floor(Math.random()*e)}placeRandomShipsOnBoard(){let e=[5,4,3,3,2];for(let t=0;t<e.length;t++){let i=this.getRandomInt(2),l=0,a=0;1===i?(l=this.getRandomInt(this.gameBoard.grid.length),a=this.getRandomInt(this.gameBoard.grid.length-e[t])):(l=this.getRandomInt(this.gameBoard.grid.length-e[t]),a=this.getRandomInt(this.gameBoard.grid.length));let n={x:l,y:a};!1===this.gameBoard.AddShipToGrid(e[t],n,i)&&t--}}getValidShot(e,t){let i=t,l=e;if(-1!==this.gameBoard.grid[i][l])return{x:l,y:i};for(let e=t;e<this.gameBoard.grid.length+1;e++){e===this.gameBoard.grid.length&&(e=0);for(let t=0;t<this.gameBoard.grid.length;t++)if(-1!==this.gameBoard.grid[e][t])return{x:t,y:e}}}}function a(){let e=document.createElement("div");e.classList.add("board");let t=document.createElement("div");t.classList.add("name"),t.textContent="Player",e.appendChild(t);let i=document.createElement("div");i.classList.add("tiles");for(let e=0;e<10;e++)for(let t=0;t<10;t++){let l=document.createElement("div");l.classList.add("tile"),l.dataset.row=e,l.dataset.col=t,i.appendChild(l)}return e.appendChild(i),e}function n(e,t){e.querySelector(".name").textContent=t}class r{players=[];constructor(e,t){this.players.push(e),this.players.push(t),this.currentPlayerIndex=0,this.currentPlayer=this.players[this.currentPlayerIndex]}MakeMove(e){let t;console.log(this.currentPlayer);let i=this.currentPlayer.MakeMove(e);if(1===i){if(t=1,console.log(this.currentPlayer.gameBoard.AllSunk()),!0!==this.currentPlayer.gameBoard.AllSunk())return this.switchPlayerTurn(),t;t=2}else 0===i?(t=0,this.switchPlayerTurn()):(console.log("Bad Move"),t=-1);return t}switchPlayerTurn(){this.currentPlayerIndex=++this.currentPlayerIndex%2,this.currentPlayer=this.players[this.currentPlayerIndex]}}function s(){let e=d("Enter Player Names"),t=o("Play Game","playgame"),i=document.createElement("label");i.classList.add("label"),i.textContent="Player One Name",i.htmlFor="PlayerOneName";let l=document.createElement("input");l.placeholder="Player One",l.id="playeroneinput",l.Name="PlayerOneName",l.value="Player One";let a=document.createElement("label");a.classList.add("label"),a.textContent="Player Two Name",a.htmlFor="PlayerTneName";let n=document.createElement("input");n.placeholder="Player Two",n.id="playertwoinput",l.Name="PlayerTwoName",n.value="Player Two";let r=document.createElement("div");return r.classList.add("modal-content"),r.appendChild(e),r.appendChild(i),r.appendChild(l),r.appendChild(a),r.appendChild(n),r.appendChild(t),r}function d(e){let t=document.createElement("div");return t.classList.add("game-choice"),t.textContent=e,t}function o(e,t){let i=document.createElement("div");return i.classList.add("game-button"),i.textContent=e,i.id=t,i}let c,h,u,p,m=[],y=[5,4,3,3,2],g=0,f=0,v=!1,S=["Player One","Player Two"];const E=document.querySelector(".modal");let L=function(){let e=d("Select Game Type"),t=o("Player vs Computer","PvE"),i=o("Player vs Player","PvP"),l=document.createElement("div");return l.classList.add("modal-content"),l.appendChild(e),l.appendChild(t),l.appendChild(i),l}();E.appendChild(L);const C=document.querySelector("#next-turn"),P=document.querySelector(".control-message");s(),C.addEventListener("click",(()=>{C.style.display="none",v=!1,u.querySelectorAll(".occupied-hidden").forEach((e=>{e.classList.remove("occupied-hidden"),e.classList.add("occupied")})),A(h)}));let w=new t(10),x=new t(10);const k=document.querySelector(".game");let I=a(),B=a();k.insertBefore(I,k.firstChild),k.appendChild(B);let M=I.querySelector(".tiles"),q=B.querySelector(".tiles"),R=L.querySelector("#PvE"),N=L.querySelector("#PvP");function T(e){[...e.children].forEach((e=>{e.classList.add("disabled")}))}function A(e){[...e.children].forEach((e=>{e.classList.remove("disabled")}))}function z(e,t,a){document.addEventListener("keydown",F),P.style.display="flex",P.textContent=S[f]+" Click to place ship. Press 'space' to rotate.",[...e.children].forEach((n=>{n.addEventListener("mouseover",(()=>{O(n,e)})),n.addEventListener("click",(()=>{let s={x:+n.dataset.col,y:+n.dataset.row};t.AddShipToGrid(y[g],s,c)&&(m.forEach((e=>{e.classList.add("occupied")})),g++,g===y.length&&(document.removeEventListener("keydown",F),n.onclick=null,n.onmouseover=null,a>0?(b(),1===a?(m=[],T(q),c=0,g=0,j(q),Y(e),f=1,z(M,x,2)):(console.log("startPvPgame(tiles)"),function(){P.style.display="none",Y(q),Y(M),T(q),A(M);let e=new i(S[0],x),t=new i(S[1],w);f=0,p=new r(e,t),u=q,h=M,V(u,h),j(M),[...M.children].forEach((t=>{t.addEventListener("click",(()=>{u=M,h=q,G(t,0,e)}))})),[...q.children].forEach((e=>{e.addEventListener("click",(()=>{u=q,h=M,G(e,1,t)}))}))}())):function(e){P.style.display="none",Y(e),T(q),A(M);let t=new l("Computer",x);t.placeRandomShipsOnBoard();let a=new i("You",t.gameBoard);t=new l("Computer",w),p=new r(a,t),[...M.children].forEach((e=>{e.addEventListener("click",(()=>{let i={x:+e.dataset.col,y:+e.dataset.row},l=p.MakeMove(i);if(2===l)return e.classList.add("hit"),void $(a.playerName);if(1===l)e.classList.add("hit");else{if(0!==l)return;e.classList.add("miss")}let n=t.GenerateRandomMove();l=p.MakeMove(n);let r=q.querySelector(`[data-row="${n.y}"][data-col="${n.x}"]`);if(2===l)return r.classList.add("hit"),void $(t.playerName);1===l?r.classList.add("hit"):0===l&&r.classList.add("miss")}))}))}(e)))}))}))}function O(e,t){b();let i={x:+e.dataset.col,y:+e.dataset.row};m=0===c?function(e,t){let i=[];for(let l=0;l<y[g];l++){let a=e.x+l,n=t.querySelector(`[data-row="${e.y}"][data-col="${a}"]`);null==n||n.classList.contains("occupied")||i.push(n)}return i}(i,t):function(e,t){let i=[];for(let l=0;l<y[g];l++){let a=t.querySelector(`[data-row="${e.y+l}"][data-col="${e.x}"]`);null==a||a.classList.contains("occupied")||i.push(a)}return i}(i,t),m.length==y[g]?m.forEach((e=>{e.classList.add("valid")})):m.forEach((e=>{e.classList.add("hit")}))}function b(){void 0!==m&&m.forEach((e=>{e.classList.remove("hit"),e.classList.remove("valid")}))}function G(e,t,i){if(f===t&&!v){let t={x:+e.dataset.col,y:+e.dataset.row},l=p.MakeMove(t);if(2===l)return e.classList.add("hit"),void $(i.playerName);1===l?(e.classList.add("hit"),f=++f%2,V(h,u)):0===l&&(e.classList.add("miss"),f=++f%2,V(h,u))}}function V(e,t){v=!0,j(e),T(t),T(e),C.style.display="inline",C.textContent=S[f]+"'s turn"}function $(e){E.removeChild(E.firstChild);let t=function(e){let t=d(`${e} won!`),i=o("New Game","newgame"),l=document.createElement("div");return l.classList.add("modal-content"),l.appendChild(t),l.appendChild(i),l}(e);E.appendChild(t),E.style.display="flex",t.querySelector("#newgame"),t.addEventListener("click",H)}function H(){I=a(),B=a(),k.firstElementChild.remove(),k.lastElementChild.remove(),k.insertBefore(I,k.firstChild),k.appendChild(B),M=I.querySelector(".tiles"),q=B.querySelector(".tiles"),E.firstElementChild.remove(),E.appendChild(L),w=new t(10),x=new t(10),g=0}function F(e){console.log("Space"===e.code),c=0===c?1:0,m.length>0&&O(m[0],h)}function Y(e){[...e.children].forEach((e=>{let t=e.cloneNode(!0);e.parentNode.replaceChild(t,e)}))}function j(e){e.querySelectorAll(".occupied").forEach((e=>{e.classList.remove("occupied"),e.classList.add("occupied-hidden")}))}R.addEventListener("click",(function(){E.style.display="none",n(B,"You"),n(I,"Computer"),T(M),c=0,z(q,w,0)})),N.addEventListener("click",(function(){L.style.display="none";let e=s();E.appendChild(e);let t=e.querySelector("#playeroneinput"),i=e.querySelector("#playertwoinput");e.querySelector("#playgame").addEventListener("click",(()=>{let e=t.value,l=i.value;/\S/.test(e)||(e="Player One"),/\S/.test(l)||(l="Player Two"),S=[e,l],E.removeChild(E.lastElementChild),L.style.display="flex",n(B,S[0]),n(I,S[1]),E.style.display="none",c=0,f=0,T(M),h=q,z(q,w,1)}))}))})();