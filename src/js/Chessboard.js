import drawHelper from './drawHelper';

export default class ChessBoard {
  constructor(n) {
    this.num = n;
    this.gridWidth = 35;
    this.board = [];
    this.lastPiece = {
      x: 0,
      y: 0,
      value: 0
    };
    this.icon = 0;
    this.canvas = document.getElementById('chessboard-canvas');
    this.canvas.width = this.gridWidth * this.num;
    this.canvas.height = this.gridWidth * this.num;
    this.brush = new drawHelper(this.canvas);
    this.bindEvents();
    this.initBoard();
  }

  initBoard() {
    for (let x = 0; x < this.num; x++) {
      this.board[x] = [];
      for (let y = 0; y < this.num; y++) {
        this.board[x][y] = 0
      }
    }
    this.brush.drawBoard(this.num, this.gridWidth);
  }

  setPiece(x, y, value) {
    this.board[x][y] = value;
    this.lastPiece = {x, y, value}
  }

  regret() {
    const piece = this.lastPiece;
    this.board[piece.x][piece.y] = 0;
  }

  bindEvents() {
    this.canvas.addEventListener('click', this.calculatePiecePosition.bind(this));
  }

  isPieceInBoard(x, y) {
    return (x > 0 && x < this.gridWidth * this.num - this.gridWidth / 2 ||
    y > 0 || y < this.gridWidth * this.num - this.gridWidth / 2)
  }

  calculatePiecePosition(e) {
    const x = e.offsetX, y = e.offsetY;
    if (!this.isPieceInBoard(x, y)) {
      return;
    }
    const cx = Math.round(x / this.gridWidth),
          cy = Math.round(y / this.gridWidth);
    let color;
    if (this.board[cy][cx] !== 0) {
      return;
    }
    this.icon += 1;
    if (this.icon % 2 === 0) {
      color = '#fff';
      this.board[cy][cx] = 1;
      this.judge(cx, cy, this.board[cy][cx])
    }
    if (this.icon % 2 === 1) {
      color = 'black';
      this.board[cy][cx] = 2;
      this.judge(cx, cy, this.board[cy][cx]);
    }
    this.brush.drawPiece(cx, cy, color, this.gridWidth);
  }

  judge(x, y, colNum) {
    this.isX(colNum, x, y);
    this.isY(colNum, x, y);
    this.isLx(colNum, x, y);
    this.isLy(colNum, x, y);
  }

  //*设置一个count，为当前颜色棋子的数量.
  //点击向各方向查询，如果为同一颜色便++
  isX(colNum, x, y) {
    var count = 0;
    // console.log('当前colNum颜色为'+colNum+',x:'+x+',y:'+y)
    for (var i = x; i >= 0; i--) {
      if (this.board[y][i] === colNum) {
        count++;
      } else {
        i = -1;
      }
    }
    for (var i = x; i <= this.num; i++) {
      if (this.board[y][i] === colNum) {
        count++;
      } else {
        i = 100;
      }
    }
    this.success(count, colNum)
  }

  isY(colNum, x, y) {
    var count = 0;
    // console.log('当前colNum颜色为'+colNum+',x:'+x+',y:'+y)
    for (var i = y; i >= 0; i--) {
      if (this.board[i][x] === colNum) {
        count++;
      } else {
        i = -1;
      }
    }
    for (var i = y; i <= this.num; i++) {
      if (this.board[i][x] === colNum) {
        count++;
      } else {
        i = 100;
      }
    }
    this.success(count, colNum)
  }

  isLx(colNum, x, y) {
    var count = 0;
    // console.log('当前colNum颜色为'+colNum+',x:'+x+',y:'+y)
    for (var i = x, k = y; i >= 0 && k >= 0; i--, k--) {
      if (this.board[k][i] === colNum) {
        count++;
      } else {
        i = -1;
      }
    }
    for (var i = x, k = y; i <= this.num && k <= this.num; i++, k++) {
      if (this.board[k][i] === colNum) {
        count++;
      } else {
        i = 100;
      }
    }
    this.success(count, colNum)
  }

  isLy(colNum, x, y) {
    var count = 0;
    // console.log('当前colNum颜色为'+colNum+',x:'+x+',y:'+y)
    for (var i = x, k = y; i >= 0 && k <= this.num; i--, k++) {
      if (this.board[k][i] === colNum) {
        count++;
        console.log('count:' + count)
      } else {
        i = -1;
      }
    }
    for (var i = x, k = y; i <= this.num && k >= 0; i++, k--) {
      if (this.board[k][i] === colNum) {
        count++;
      } else {
        i = 100;
      }
    }
    this.success(count, colNum)
  }

  success(count, colNum) {
    if (count >= 6) {
      if (colNum === 2) {
        alert('黑棋获胜');
      } else {
        alert('白棋获胜');
      }
      this.canvas.removeEventListener('click', this.calculatePiecePosition);
    }
  }
}
