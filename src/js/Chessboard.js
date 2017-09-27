import drawHelper from './drawHelper';
import players from './playerConfig';
import computerAI from './computerAI';

export default class ChessBoard {
  constructor(n) {
    this.num = n;
    this.gridWidth = 35;
    this.board = [];
    this.step = 0;
    this.canvas = document.getElementById('chessboard-canvas');
    this.canvas.width = this.gridWidth * this.num;
    this.canvas.height = this.gridWidth * this.num;
    this.brush = new drawHelper(this.canvas);
    this.computerAI = new computerAI(n);
    this.bindEvents();
    this.initBoard();
    this.isLx = this.isLx.bind(this);
    this.isLy = this.isLy.bind(this);
    this.isX = this.isX.bind(this);
    this.isY = this.isY.bind(this);
    this.calculatePiecePosition = this.calculatePiecePosition.bind(this);
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
    this.completeBoard(cx, cy);
    const computerPiece = this.computerAI.nextStep(this.board);
    this.completeBoard(computerPiece.x, computerPiece.y);
  }

  completeBoard(cx, cy) {
    if (this.board[cx][cy] !== 0) {
      alert("当前位置已有棋子，请不要重复落子哦");
      return;
    }
    this.step += 1;
    const player = players[this.step % 2];
    this.brush.drawPiece(cx, cy, player.image, this.gridWidth);
    this.setPiece(cx, cy, player.value);
  }

  setPiece(cx, cy, value) {
    this.board[cx][cy] = value;
    this.judge(cx, cy, value);
  }

  judgeAlgorithms() {
    return [this.isX, this.isY, this.isLx, this.isLy]
  }

  judge(x, y, colNum) {
    this.judgeAlgorithms().map((algorithm) => {
      algorithm(colNum, x, y);
    });
  }

  calculatePieceLine(flag, count, pieceValue, calculateValue) {
    if (!flag) return { count, flag };
    if (pieceValue === calculateValue) { count++; }
    else { flag = false; }
    return { count, flag };
  }

  getDynamicPosition(x, y) {
    if (x < 0 || x >= this.num || y < 0 || y >= this.num) {
      return 0;
    }
    return this.board[x][y];
  }

  getMaxCount(minusXGenerator, minusYGenerator, plusXGenerator, plusYGenerator, x, y, colNum) {
    let count = 0, minus = true, plus = true;
    for (let i = 1; i <= 5; i++) {
      let result = this.calculatePieceLine(minus, count, this.getDynamicPosition(minusXGenerator(x, i), minusYGenerator(y, i)), colNum);
      count = result.count;
      minus = result.flag;

      result = this.calculatePieceLine(plus, count, this.getDynamicPosition(plusXGenerator(x, i), plusYGenerator(y, i)), colNum);
      count = result.count;
      plus = result.flag;
    }
    this.success(count, colNum);
  }

  valueGenerator(x, i) {
    return x;
  }

  isX(colNum, x, y) {
    this.getMaxCount((x, i) => {return x - i}, this.valueGenerator,
      (x, i) => {return x + i}, this.valueGenerator, x, y, colNum);
  }

  isY(colNum, x, y) {
    this.getMaxCount(this.valueGenerator, (x, i) => {return x - i}, this.valueGenerator,
      (x, i) => {return x + i}, x, y, colNum);
  }

  isLx(colNum, x, y) {
    this.getMaxCount((x, i) => {return x - i}, (y, i) => {return y - i}, (x, i) => {return x + i},
      (y, i) => {return y + i}, x, y, colNum);
  }

  isLy(colNum, x, y) {
    this.getMaxCount((x, i) => {return x - i}, (y, i) => {return y + i}, (x, i) => {return x + i},
      (y, i) => {return y - i}, x, y, colNum);
  }

  success(count, colNum) {
    if (count >= 4) {
      players.map((player) => {
        if(player.value === colNum) {
          alert(`${player.name}获胜`);
        }
      });
      this.canvas.removeEventListener('click', this.calculatePiecePosition);
    }
  }
}
