!function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,n){"use strict";var i=n(1),r=function(t){return t&&t.__esModule?t:{default:t}}(i);n(8),document.addEventListener("DOMContentLoaded",function(){new r.default(15)})},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=n(2),a=i(o),s=n(3),c=i(s),f=n(6),h=i(f),l=function(){function t(e){r(this,t),this.num=e,this.gridWidth=35,this.board=[],this.step=0,this.canvas=document.getElementById("chessboard-canvas"),this.canvas.width=this.gridWidth*this.num,this.canvas.height=this.gridWidth*this.num,this.brush=new a.default(this.canvas),this.computerAI=new h.default,this.bindEvents(),this.initBoard(),this.isLx=this.isLx.bind(this),this.isLy=this.isLy.bind(this),this.isX=this.isX.bind(this),this.isY=this.isY.bind(this),this.calculatePiecePosition=this.calculatePiecePosition.bind(this)}return u(t,[{key:"initBoard",value:function(){for(var t=0;t<this.num;t++){this.board[t]=[];for(var e=0;e<this.num;e++)this.board[t][e]=0}this.brush.drawBoard(this.num,this.gridWidth)}},{key:"bindEvents",value:function(){this.canvas.addEventListener("click",this.calculatePiecePosition.bind(this))}},{key:"isPieceInBoard",value:function(t,e){return t>0&&t<this.gridWidth*this.num-this.gridWidth/2||e>0||e<this.gridWidth*this.num-this.gridWidth/2}},{key:"calculatePiecePosition",value:function(t){var e=t.offsetX,n=t.offsetY;if(this.isPieceInBoard(e,n)){var i=Math.round(e/this.gridWidth),r=Math.round(n/this.gridWidth);this.completeBoard(i,r);var u=this.computerAI.nextStep(this.board);this.completeBoard(u.x,u.y)}}},{key:"completeBoard",value:function(t,e){if(0!==this.board[t][e])return void alert("当前位置已有棋子，请不要重复落子哦");this.step+=1;var n=c.default[this.step%2];this.brush.drawPiece(t,e,n.image,this.gridWidth),this.setPiece(t,e,n.value)}},{key:"setPiece",value:function(t,e,n){this.board[t][e]=n,this.judge(t,e,n)}},{key:"judgeAlgorithms",value:function(){return[this.isX,this.isY,this.isLx,this.isLy]}},{key:"judge",value:function(t,e,n){this.judgeAlgorithms().map(function(i){i(n,t,e)})}},{key:"calculatePieceLine",value:function(t,e,n,i){return t?(n===i?e++:t=!1,{count:e,flag:t}):{count:e,flag:t}}},{key:"getDynamicPosition",value:function(t,e){return t<0||t>=this.num||e<0||e>=this.num?0:this.board[t][e]}},{key:"getMaxCount",value:function(t,e,n,i,r,u,o){for(var a=0,s=!0,c=!0,f=1;f<=5;f++){var h=this.calculatePieceLine(s,a,this.getDynamicPosition(t(r,f),e(u,f)),o);a=h.count,s=h.flag,h=this.calculatePieceLine(c,a,this.getDynamicPosition(n(r,f),i(u,f)),o),a=h.count,c=h.flag}this.success(a,o)}},{key:"valueGenerator",value:function(t,e){return t}},{key:"isX",value:function(t,e,n){this.getMaxCount(function(t,e){return t-e},this.valueGenerator,function(t,e){return t+e},this.valueGenerator,e,n,t)}},{key:"isY",value:function(t,e,n){this.getMaxCount(this.valueGenerator,function(t,e){return t-e},this.valueGenerator,function(t,e){return t+e},e,n,t)}},{key:"isLx",value:function(t,e,n){this.getMaxCount(function(t,e){return t-e},function(t,e){return t-e},function(t,e){return t+e},function(t,e){return t+e},e,n,t)}},{key:"isLy",value:function(t,e,n){this.getMaxCount(function(t,e){return t-e},function(t,e){return t+e},function(t,e){return t+e},function(t,e){return t-e},e,n,t)}},{key:"success",value:function(t,e){t>=4&&(c.default.map(function(t){t.value===e&&alert(t.name+"获胜")}),this.canvas.removeEventListener("click",this.calculatePiecePosition))}}]),t}();e.default=l},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),u=function(){function t(e){i(this,t),this.ctx=e.getContext("2d")}return r(t,[{key:"drawBoard",value:function(t,e){for(var n=e*t,i=1;i<t;i++)this.ctx.moveTo(0,i*e),this.ctx.lineTo(n,i*e),this.ctx.stroke(),this.ctx.moveTo(i*e,0),this.ctx.lineTo(i*e,n),this.ctx.stroke()}},{key:"drawPiece",value:function(t,e,n,i){var r=this,u=new Image;u.src=n,u.onload=function(){r.ctx.drawImage(u,t*i-i/2,e*i-i/2,i,i)}}}]),t}();e.default=u},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(4),u=i(r),o=n(5),a=i(o);e.default=[{value:1,image:a.default,name:"白棋"},{value:2,name:"黑棋",image:u.default}]},function(t,e,n){t.exports=n.p+"piece-black.png"},function(t,e,n){t.exports=n.p+"piece-white.png"},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),u=n(7),o=function(){function t(){i(this,t);var e=(0,u.calculateWinNums)();this.wins=e.wins,this.count=e.count}return r(t,[{key:"nextStep",value:function(t){for(var e=[],n=[],i=[],r=[],u=[],o=[],a=0;a<this.count;a++)i[a]=0,r[a]=0,u[a]=0,o[a]=0;for(var s=0,c=0,f=0,h=0;h<15;h++){e[h]=[],n[h]=[];for(var l=0;l<15;l++)e[h][l]=0,n[h][l]=0}for(var d=0;d<15;d++)for(var v=0;v<15;v++)for(var y=0;y<this.count;y++)this.wins[d][v][y]&&(1===t[d][v]?(i[y]++,u[y]=6):2===t[d][v]&&(i[y]=6,o[y]=u[y],u[y]++));for(var g=0;g<15;g++)for(var p=0;p<15;p++)if(0==t[g][p]){for(var m=0;m<this.count;m++)this.wins[g][p][m]&&(1==i[m]?e[g][p]+=200:2==i[m]?e[g][p]+=400:3==i[m]?e[g][p]+=2e3:4==i[m]&&(e[g][p]+=1e4),1==u[m]?n[g][p]+=220:2==u[m]?n[g][p]+=420:3==u[m]?n[g][p]+=2100:4==u[m]&&(n[g][p]+=2e4));e[g][p]>s?(s=e[g][p],c=g,f=p):e[g][p]==s&&n[g][p]>n[c][f]&&(c=g,f=p),n[g][p]>s?(s=n[g][p],c=g,f=p):n[g][p]==s&&e[g][p]>e[c][f]&&(c=g,f=p)}return{x:c,y:f}}}]),t}();e.default=o},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.calculateWinNums=function(){for(var t=[],e=0;e<15;e++){t[e]=[];for(var n=0;n<15;n++)t[e][n]=[]}for(var i=0,r=0;r<15;r++)for(var u=0;u<11;u++){for(var o=0;o<5;o++)t[r][u+o][i]=!0;i++}for(var a=0;a<15;a++)for(var s=0;s<11;s++){for(var c=0;c<5;c++)t[s+c][a][i]=!0;i++}for(var f=0;f<11;f++)for(var h=0;h<11;h++){for(var l=0;l<5;l++)t[f+l][h+l][i]=!0;i++}for(var d=0;d<11;d++)for(var v=14;v>3;v--){for(var y=0;y<5;y++)t[d+y][v-y][i]=!0;i++}return{wins:t,count:i}}},function(t,e){}]);
//# sourceMappingURL=main.73acc8dcc4c2fd3d9882.js.map