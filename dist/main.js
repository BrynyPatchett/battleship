(()=>{"use strict";class e{hits=0;constructor(e){this.length=e}hit(){this.hits++}isSunk(){return!(this.hits<this.length)}}class t{ships=[];constructor(e){this.grid=new Array(e),this.gridSize=e;for(let t=0;t<e;t++)this.grid[t]=Array(e).fill(0)}AddShipToGrid(t,i,l){if(1===l){if(!1===this.validVerticalInput(i,t))return!1;this.placeShipVertical(i,t,this.ships.length+1)}else{if(!1===this.validHorizontalInput(i,t))return!1;this.placeShipHorizontal(i,t,this.ships.length+1)}return this.ships.push(new e(t)),this.ships[this.ships.length-1],!0}placeShipHorizontal(e,t,i){for(let l=0;l<t;l++)this.grid[e.y][e.x+l]=i}placeShipVertical(e,t,i){for(let l=0;l<t;l++)this.grid[e.y+l][e.x]=i}AllSunk(){for(let e=0;e<this.ships.length;e++)if(!1===this.ships[e].isSunk())return!1;return!0}validHorizontalInput(e,t){for(let i=0;i<t;i++)if(!1===this.validInput(e.y,e.x+i))return!1;return!0}validVerticalInput(e,t){for(let i=0;i<t;i++)if(!1===this.validInput(e.y+i,e.x))return!1;return!0}validInput(e,t){return!(t>=this.gridSize||t<0||e>=this.gridSize||e<0||0!==this.grid[e][t])}validShotInput(e,t){return!(t>=this.gridSize||t<0||e>=this.gridSize||e<0||-1===this.grid[e][t])}ReceiveAttack(e){if(!this.validShotInput(e.y,e.x))throw new Error("Invalid Input");return 0===this.grid[e.y][e.x]?(this.grid[e.y][e.x]=-1,0):(this.ships[this.grid[e.y][e.x]-1].hit(),this.grid[e.y][e.x]=-1,1)}}class i{constructor(e,t){this.playerName=e,this.gameBoard=t}MakeMove(e){try{return this.gameBoard.ReceiveAttack(e)}catch{return-1}}}class l extends i{constructor(e,t){super(e,t),this.moves=[]}MakeRandomMove(){let e=this.getRandomInt(this.gameBoard.grid.length),t=this.getRandomInt(this.gameBoard.grid.length),i=this.getValidShot(e,t);return{status:this.MakeMove(i),coords:i}}GenerateRandomMove(){let e=this.getRandomInt(this.gameBoard.grid.length),t=this.getRandomInt(this.gameBoard.grid.length);return this.getValidShot(e,t)}getRandomInt(e){return Math.floor(Math.random()*e)}placeRandomShipsOnBoard(){let e=[5,4,3,3,2];for(let t=0;t<e.length;t++){let i=this.getRandomInt(2),l=0,a=0;1===i?(l=this.getRandomInt(this.gameBoard.grid.length),a=this.getRandomInt(this.gameBoard.grid.length-e[t])):(l=this.getRandomInt(this.gameBoard.grid.length-e[t]),a=this.getRandomInt(this.gameBoard.grid.length));let r={x:l,y:a};!1===this.gameBoard.AddShipToGrid(e[t],r,i)&&t--}}getValidShot(e,t){let i=t,l=e;if(-1!==this.gameBoard.grid[i][l])return{x:l,y:i};for(let e=t;e<this.gameBoard.grid.length+1;e++){e===this.gameBoard.grid.length&&(e=0);for(let t=0;t<this.gameBoard.grid.length;t++)if(-1!==this.gameBoard.grid[e][t])return{x:t,y:e}}}}function a(){let e=document.createElement("div");e.classList.add("board");let t=document.createElement("div");t.classList.add("name"),t.textContent="Player",e.appendChild(t);let i=document.createElement("div");i.classList.add("tiles");for(let e=0;e<10;e++)for(let t=0;t<10;t++){let l=document.createElement("div");l.classList.add("tile"),l.dataset.row=e,l.dataset.col=t,i.appendChild(l)}return e.appendChild(i),e}function r(e,t){e.querySelector(".name").textContent=t}class n{players=[];constructor(e,t){this.players.push(e),this.players.push(t),this.currentPlayerIndex=0,this.currentPlayer=this.players[this.currentPlayerIndex]}MakeMove(e){let t;console.log(this.currentPlayer);let i=this.currentPlayer.MakeMove(e);if(1===i){if(t=1,console.log(this.currentPlayer.gameBoard.AllSunk()),!0!==this.currentPlayer.gameBoard.AllSunk())return this.switchPlayerTurn(),t;t=2}else 0===i?(t=0,this.switchPlayerTurn()):(console.log("Bad Move"),t=-1);return t}switchPlayerTurn(){this.currentPlayerIndex=++this.currentPlayerIndex%2,this.currentPlayer=this.players[this.currentPlayerIndex]}}function s(e){let t=document.createElement("div");return t.classList.add("game-choice"),t.textContent=e,t}function d(e,t){let i=document.createElement("div");return i.classList.add("game-button"),i.textContent=e,i.id=t,i}let o,c,h,u,p=[],m=[5,4,3,3,2],y=0,g=0,f=!1,v=["Player One","Player Two"];const S=document.querySelector(".modal");let E=function(){let e=s("Select Game Type"),t=d("Player vs Computer","PvE"),i=d("Player vs Player","PvP"),l=document.createElement("div");return l.classList.add("modal-content"),l.appendChild(e),l.appendChild(t),l.appendChild(i),l}();S.appendChild(E);const L=document.querySelector("#next-turn"),C=document.querySelector(".control-message");L.addEventListener("click",(()=>{L.style.display="none",f=!1,h.querySelectorAll(".occupied-hidden").forEach((e=>{e.classList.remove("occupied-hidden"),e.classList.add("occupied")})),T(c)}));let P=new t(10),w=new t(10);const x=document.querySelector(".game");let k=a(),I=a();x.insertBefore(k,x.firstChild),x.appendChild(I);let B=k.querySelector(".tiles"),M=I.querySelector(".tiles"),q=E.querySelector("#PvE"),R=E.querySelector("#PvP");function N(e){[...e.children].forEach((e=>{e.classList.add("disabled")}))}function T(e){[...e.children].forEach((e=>{e.classList.remove("disabled")}))}function A(e,t,a){c=e,document.addEventListener("keydown",H),C.style.display="flex",C.textContent=v[g]+" Click to place ship. Press 'space' to rotate.",[...e.children].forEach((r=>{r.addEventListener("mouseover",(()=>{z(r,e)})),r.addEventListener("click",(()=>{let s={x:+r.dataset.col,y:+r.dataset.row};t.AddShipToGrid(m[y],s,o)&&(p.forEach((e=>{e.classList.add("occupied")})),y++,y===m.length&&(document.removeEventListener("keydown",H),a>0?(O(),1===a?(p=[],N(M),o=0,y=0,Y(M),F(e),g=1,A(B,w,2)):(console.log("startPvPgame(tiles)"),function(){C.style.display="none",F(M),F(B),N(M),T(B),f=!0;let e=new i(v[0],w),t=new i(v[1],P);g=0,u=new n(e,t),h=M,c=B,G(h,c),Y(B),[...B.children].forEach((t=>{t.addEventListener("click",(()=>{f||(h=B,c=M,b(t,0,e))}))})),[...M.children].forEach((e=>{e.addEventListener("click",(()=>{f||(h=M,c=B,b(e,1,t))}))}))}())):function(e){C.style.display="none",F(e),N(M),T(B);let t=new l("Computer",w);t.placeRandomShipsOnBoard();let a=new i("You",t.gameBoard);t=new l("Computer",P),u=new n(a,t),[...B.children].forEach((e=>{e.addEventListener("click",(()=>{let i={x:+e.dataset.col,y:+e.dataset.row},l=u.MakeMove(i);if(2===l)return e.classList.add("hit"),void V(a.playerName);if(1===l)e.classList.add("hit");else{if(0!==l)return;e.classList.add("miss")}let r=t.GenerateRandomMove();l=u.MakeMove(r);let n=M.querySelector(`[data-row="${r.y}"][data-col="${r.x}"]`);if(2===l)return n.classList.add("hit"),void V(t.playerName);1===l?n.classList.add("hit"):0===l&&n.classList.add("miss")}))}))}(e)))}))}))}function z(e,t){O();let i={x:+e.dataset.col,y:+e.dataset.row};p=0===o?function(e,t){let i=[];for(let l=0;l<m[y];l++){let a=e.x+l,r=t.querySelector(`[data-row="${e.y}"][data-col="${a}"]`);null==r||r.classList.contains("occupied")||i.push(r)}return i}(i,t):function(e,t){let i=[];for(let l=0;l<m[y];l++){let a=t.querySelector(`[data-row="${e.y+l}"][data-col="${e.x}"]`);null==a||a.classList.contains("occupied")||i.push(a)}return i}(i,t),p.length==m[y]?p.forEach((e=>{e.classList.add("valid")})):p.forEach((e=>{e.classList.add("hit")}))}function O(){void 0!==p&&p.forEach((e=>{e.classList.remove("hit"),e.classList.remove("valid")}))}function b(e,t,i){if(g===t){let t={x:+e.dataset.col,y:+e.dataset.row},l=u.MakeMove(t);if(2===l)return e.classList.add("hit"),void V(i.playerName);1===l?(e.classList.add("hit"),g=++g%2,G(c,h)):0===l&&(e.classList.add("miss"),g=++g%2,G(c,h))}}function G(e,t){f=!0,Y(e),N(t),N(e),L.style.display="inline",L.textContent=v[g]+"'s turn"}function V(e){S.removeChild(S.firstChild);let t=function(e){let t=s(`${e} won!`),i=d("New Game","newgame"),l=document.createElement("div");return l.classList.add("modal-content"),l.appendChild(t),l.appendChild(i),l}(e);S.appendChild(t),S.style.display="flex",t.querySelector("#newgame"),t.addEventListener("click",$)}function $(){k=a(),I=a(),x.firstElementChild.remove(),x.lastElementChild.remove(),x.insertBefore(k,x.firstChild),x.appendChild(I),B=k.querySelector(".tiles"),M=I.querySelector(".tiles"),S.firstElementChild.remove(),S.appendChild(E),P=new t(10),w=new t(10),y=0}function H(e){console.log("Space"===e.code),o=0===o?1:0,p.length>0&&z(p[0],c)}function F(e){[...e.children].forEach((e=>{let t=e.cloneNode(!0);e.parentNode.replaceChild(t,e)}))}function Y(e){e.querySelectorAll(".occupied").forEach((e=>{e.classList.remove("occupied"),e.classList.add("occupied-hidden")}))}q.addEventListener("click",(function(){S.style.display="none",r(I,"You"),r(k,"Computer"),N(B),o=0,A(M,P,0)})),R.addEventListener("click",(function(){E.style.display="none";let e=function(){let e=s("Enter Player Names"),t=d("Play Game","playgame"),i=document.createElement("label");i.classList.add("label"),i.textContent="Player One Name",i.htmlFor="PlayerOneName";let l=document.createElement("input");l.placeholder="Player One",l.id="playeroneinput",l.Name="PlayerOneName",l.value="Player One";let a=document.createElement("label");a.classList.add("label"),a.textContent="Player Two Name",a.htmlFor="PlayerTneName";let r=document.createElement("input");r.placeholder="Player Two",r.id="playertwoinput",l.Name="PlayerTwoName",r.value="Player Two";let n=document.createElement("div");return n.classList.add("modal-content"),n.appendChild(e),n.appendChild(i),n.appendChild(l),n.appendChild(a),n.appendChild(r),n.appendChild(t),n}();S.appendChild(e);let t=e.querySelector("#playeroneinput"),i=e.querySelector("#playertwoinput");e.querySelector("#playgame").addEventListener("click",(()=>{let e=t.value,l=i.value;/\S/.test(e)||(e="Player One"),/\S/.test(l)||(l="Player Two"),v=[e,l],S.removeChild(S.lastElementChild),E.style.display="flex",r(I,v[0]),r(k,v[1]),S.style.display="none",o=0,g=0,N(B),c=M,A(M,P,1)}))}))})();