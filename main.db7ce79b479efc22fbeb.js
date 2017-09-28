!function(t){function e(n){if(i[n])return i[n].exports;var s=i[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,e),s.l=!0,s.exports}var i={};e.m=t,e.c=i,e.d=function(t,i,n){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=1)}([function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.hideModal=function(){document.getElementsByClassName("modal")[0].className="modal"},e.showModal=function(t){document.getElementsByClassName("modal")[0].className="modal active",t&&(document.getElementsByClassName("modal__info")[0].innerHTML=t)}},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}var s=i(2),r=n(s),o=i(0);i(10);var a=i(11),u=n(a);document.addEventListener("DOMContentLoaded",function(){document.getElementById("single-player").addEventListener("click",l),document.getElementById("multi-player").addEventListener("click",h),c()});var c=function(){var t=document.getElementById("chessboard-canvas");t.style.backgroundImage="none";var e=new Image;e.src=u.default,e.onload=function(){t.style.backgroundImage="url("+u.default+")",t.style.filter="blur(0)"}},l=function(){new r.default(15,"single"),(0,o.hideModal)()},h=function(){new r.default(15,"multiple"),(0,o.hideModal)()}},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),o=i(3),a=n(o),u=i(4),c=n(u),l=i(7),h=n(l),d=i(0),f=i(9),v=n(f),m=function(){function t(e,i){s(this,t),this.num=e,this.gridWidth=35,this.step=0,this.canvas=document.getElementById("chessboard-canvas"),this.regretButton=document.getElementById("regret"),this.cancelRegretButton=document.getElementById("cancel-regret"),this.restartButton=document.getElementById("restart"),this.restartButton.disabled=!1,this.canvas.width=this.gridWidth*this.num,this.canvas.height=this.gridWidth*this.num,this.resetStep=0,this.over=!1,this.brush=new a.default(this.canvas),this.mode=i,this.history=[],this.isSingleMode()&&(this.computerAI=new h.default(e)),this.timeBox={black:new v.default("black-timer"),white:new v.default("white-timer")},this.initBoard()}return r(t,[{key:"isSingleMode",value:function(){return"single"===this.mode}},{key:"initBoard",value:function(){this.board=[];for(var t=0;t<this.num;t++){this.board[t]=[];for(var e=0;e<this.num;e++)this.board[t][e]=0}this.brush.drawBoard(this.num,this.gridWidth),this.bindEvents()}},{key:"bindEvents",value:function(){this.isLx=this.isLx.bind(this),this.isLy=this.isLy.bind(this),this.isX=this.isX.bind(this),this.isY=this.isY.bind(this),this.calculatePiecePosition=this.calculatePiecePosition.bind(this),this.regret=this.regret.bind(this),this.cancelRegret=this.cancelRegret.bind(this),this.gameOver=this.gameOver.bind(this),this.canvas.addEventListener("click",this.calculatePiecePosition),this.regretButton.addEventListener("click",this.regret),this.cancelRegretButton.addEventListener("click",this.cancelRegret),this.restartButton.addEventListener("click",this.gameOver)}},{key:"regret",value:function(){this.isSingleMode()&&this.resetPiece(),this.resetPiece()}},{key:"cancelRegret",value:function(){var t=this.history[this.step+1],e=this.history[this.step+2];this.isSingleMode()?(this.setPiece(t.x,t.y),this.setPiece(e.x,e.y),this.resetStep--):this.setPiece(t.x,t.y),0==--this.resetStep&&(this.cancelRegretButton.disabled=!0)}},{key:"resetPiece",value:function(){var t=this.history[this.step];this.brush.clearPiece(t.x,t.y,this.gridWidth),this.board[t.x][t.y]=0,this.step--,0===this.step&&(this.regretButton.disabled=!0),this.cancelRegretButton.disabled=!1,this.resetStep++}},{key:"isPieceInBoard",value:function(t,e){return t>0&&t<this.gridWidth*this.num-this.gridWidth/2||e>0||e<this.gridWidth*this.num-this.gridWidth/2}},{key:"calculatePiecePosition",value:function(t){var e=this,i=t.offsetX,n=t.offsetY;if(!this.isPieceInBoard(i,n))return void alert("当前已经是棋盘边缘了");var s=Math.round(i/this.gridWidth),r=Math.round(n/this.gridWidth);if(0===this.board[s][r]){if(this.resetStep=0,this.cancelRegretButton.disabled=!0,this.setPiece(s,r),this.isSingleMode()&&!this.over){var o=this.computerAI.nextStep(this.board);setTimeout(function(){e.setPiece(o.x,o.y)},100)}}else alert("当前位置已有棋子，请不要重复落子哦")}},{key:"setPiece",value:function(t,e){this.step++;var i=c.default[this.step%2];this.brush.drawPiece(t,e,i.image,this.gridWidth),this.board[t][e]=i.value,this.history[this.step]={x:t,y:e},this.regretButton.disabled=!1,this.timeBox[i.id].startTime(),this.timeBox[i.otherId].stopTime(),this.judge(t,e,i.value)}},{key:"judgeAlgorithms",value:function(){return[this.isX,this.isY,this.isLx,this.isLy]}},{key:"judge",value:function(t,e,i){this.judgeAlgorithms().map(function(n){n(i,t,e)})}},{key:"calculatePieceLine",value:function(t,e,i,n){return t?(i===n?e++:t=!1,{count:e,flag:t}):{count:e,flag:t}}},{key:"getDynamicPosition",value:function(t,e){return t<0||t>=this.num||e<0||e>=this.num?0:this.board[t][e]}},{key:"getMaxCount",value:function(t,e,i,n,s,r,o){for(var a=0,u=!0,c=!0,l=1;l<=5;l++){var h=this.calculatePieceLine(u,a,this.getDynamicPosition(t(s,l),e(r,l)),o);a=h.count,u=h.flag,h=this.calculatePieceLine(c,a,this.getDynamicPosition(i(s,l),n(r,l)),o),a=h.count,c=h.flag}this.success(a,o)}},{key:"valueGenerator",value:function(t,e){return t}},{key:"isX",value:function(t,e,i){this.getMaxCount(function(t,e){return t-e},this.valueGenerator,function(t,e){return t+e},this.valueGenerator,e,i,t)}},{key:"isY",value:function(t,e,i){this.getMaxCount(this.valueGenerator,function(t,e){return t-e},this.valueGenerator,function(t,e){return t+e},e,i,t)}},{key:"isLx",value:function(t,e,i){this.getMaxCount(function(t,e){return t-e},function(t,e){return t-e},function(t,e){return t+e},function(t,e){return t+e},e,i,t)}},{key:"isLy",value:function(t,e,i){this.getMaxCount(function(t,e){return t-e},function(t,e){return t+e},function(t,e){return t+e},function(t,e){return t-e},e,i,t)}},{key:"success",value:function(t,e){var i=this;t>=4&&c.default.map(function(t){t.value===e&&i.gameOver(t.name+"获胜")})}},{key:"gameOver",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"请选择游戏模式";this.over=!0,"click"===e.type&&(e="请选择游戏模式"),(0,d.showModal)(e),this.clearButtons(),c.default.map(function(e){t.timeBox[e.id].stopTime()})}},{key:"clearButtons",value:function(){this.canvas.removeEventListener("click",this.calculatePiecePosition),this.regretButton.removeEventListener("click",this.regret),this.cancelRegretButton.removeEventListener("click",this.cancelRegret),this.restartButton.removeEventListener("click",this.gameOver),this.regretButton.disabled=!0,this.cancelRegretButton.disabled=!0,this.restartButton.disabled=!0}}]),t}();e.default=m},function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),r=function(){function t(e){n(this,t),this.ctx=e.getContext("2d"),this.ctx.strokeStyle="rgba(0,0,0,1)",this.ctx.fillStyle="rgba(0,0,0,1)",this.ctx.lineWidth=1.5}return s(t,[{key:"drawBoard",value:function(t,e){for(var i=e*t,n=1;n<t;n++)this.ctx.moveTo(0,n*e),this.ctx.lineTo(i,n*e),this.ctx.moveTo(n*e,0),this.ctx.lineTo(n*e,i);this.ctx.stroke()}},{key:"drawPiece",value:function(t,e,i,n){var s=this,r=new Image;r.src=i,r.onload=function(){s.ctx.drawImage(r,t*n-n/2,e*n-n/2,n,n)}}},{key:"clearPiece",value:function(t,e,i){var n=t*i-i/2,s=e*i-i/2;this.ctx.beginPath(),this.ctx.clearRect(n,s,i,i),this.ctx.moveTo(n-.5,e*i),this.ctx.lineTo(n+i+.5,e*i),this.ctx.moveTo(t*i,s-.5),this.ctx.lineTo(t*i,s+i+.5),this.ctx.stroke()}}]),t}();e.default=r},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var s=i(5),r=n(s),o=i(6),a=n(o);e.default=[{id:"black",value:1,image:a.default,name:"白棋",otherId:"white"},{id:"white",value:2,name:"黑棋",image:r.default,otherId:"black"}]},function(t,e,i){t.exports=i.p+"piece-black.png"},function(t,e,i){t.exports=i.p+"piece-white.png"},function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),r=i(8),o=function(){function t(e){n(this,t);var i=(0,r.calculateWinNums)();this.wins=i.wins,this.count=i.count,this.num=e}return s(t,[{key:"nextStep",value:function(t){for(var e=[],i=[],n=[],s=[],r=[],o=[],a=0;a<this.count;a++)n[a]=0,s[a]=0,r[a]=0,o[a]=0;for(var u=0,c=0,l=0,h=0;h<this.num;h++){e[h]=[],i[h]=[];for(var d=0;d<this.num;d++)e[h][d]=0,i[h][d]=0}for(var f=0;f<this.num;f++)for(var v=0;v<this.num;v++)for(var m=0;m<this.count;m++)this.wins[f][v][m]&&(1===t[f][v]?(n[m]++,r[m]=6):2===t[f][v]&&(n[m]=6,o[m]=r[m],r[m]++));for(var g=0;g<this.num;g++)for(var y=0;y<this.num;y++)if(0==t[g][y]){for(var b=0;b<this.count;b++)this.wins[g][y][b]&&(1==n[b]?e[g][y]+=220:2==n[b]?e[g][y]+=420:3==n[b]?e[g][y]+=2100:4==n[b]&&(e[g][y]+=2e4),1==r[b]?i[g][y]+=200:2==r[b]?i[g][y]+=400:3==r[b]?i[g][y]+=2900:4==r[b]&&(i[g][y]+=1e4));e[g][y]>u?(u=e[g][y],c=g,l=y):e[g][y]==u&&i[g][y]>i[c][l]&&(c=g,l=y),i[g][y]>u?(u=i[g][y],c=g,l=y):i[g][y]==u&&e[g][y]>e[c][l]&&(c=g,l=y)}return{x:c,y:l}}}]),t}();e.default=o},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.calculateWinNums=function(){for(var t=[],e=0;e<15;e++){t[e]=[];for(var i=0;i<15;i++)t[e][i]=[]}for(var n=0,s=0;s<15;s++)for(var r=0;r<11;r++){for(var o=0;o<5;o++)t[s][r+o][n]=!0;n++}for(var a=0;a<15;a++)for(var u=0;u<11;u++){for(var c=0;c<5;c++)t[u+c][a][n]=!0;n++}for(var l=0;l<11;l++)for(var h=0;h<11;h++){for(var d=0;d<5;d++)t[l+d][h+d][n]=!0;n++}for(var f=0;f<11;f++)for(var v=14;v>3;v--){for(var m=0;m<5;m++)t[f+m][v-m][n]=!0;n++}return{wins:t,count:n}}},function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),r=function(){function t(e){n(this,t),this.timeInput=document.getElementById(e),this.millisecond=0,this.second=0,this.minute=0,this.timer=this.timer.bind(this),this.timeInput.value=o(this.minute)+" : "+o(this.second)+" : "+o(this.millisecond)}return s(t,[{key:"startTime",value:function(){this.interval=setInterval(this.timer,10)}},{key:"timer",value:function(){this.millisecond=this.millisecond+1,this.millisecond>=100?(this.millisecond=0,this.second++):this.second>=60&&(this.second=0,this.minute++),this.timeInput.value=o(this.minute)+" : "+o(this.second)+" : "+o(this.millisecond)}},{key:"stopTime",value:function(){window.clearInterval(this.interval)}}]),t}();e.default=r;var o=function(t){return t/10<1?"0"+t:t}},function(t,e){},function(t,e,i){t.exports=i.p+"chessboard.jpg"}]);
//# sourceMappingURL=main.db7ce79b479efc22fbeb.js.map