import drawHelper from './drawHelper';
import players from './playerConfig';
import computerAI from './computerAI';
import {showModal} from './modal';

export default class ChessBoard {
  constructor(n, mode) {
    this.num = n;
    this.gridWidth = 35;
    this.step = 0;
    this.canvas = document.getElementById('chessboard-canvas');
    this.regretButton = document.getElementById('regret');
    this.cancelRegretButton = document.getElementById('cancel-regret');
    this.canvas.width = this.gridWidth * this.num;
    this.canvas.height = this.gridWidth * this.num;
    this.resetStep = 0;
    this.brush = new drawHelper(this.canvas);
    this.mode = mode;
    this.history = [];
    if (this.isSingleMode()) {
      this.computerAI = new computerAI(n);
    }
    this.isLx = this.isLx.bind(this);
    this.isLy = this.isLy.bind(this);
    this.isX = this.isX.bind(this);
    this.isY = this.isY.bind(this);
    this.calculatePiecePosition = this.calculatePiecePosition.bind(this);
    this.regret = this.regret.bind(this);
    this.cancelRegret = this.cancelRegret.bind(this);
    this.initBoard();
  }

  isSingleMode() {
    return this.mode === 'single';
  }

  initBoard() {
    this.board = [];
    for (let x = 0; x < this.num; x++) {
      this.board[x] = [];
      for (let y = 0; y < this.num; y++) {
        this.board[x][y] = 0
      }
    }
    this.brush.drawBoard(this.num, this.gridWidth);
    this.bindEvents();
  }

  bindEvents() {
    this.canvas.addEventListener('click', this.calculatePiecePosition);
    this.regretButton.addEventListener('click', this.regret);
    this.cancelRegretButton.addEventListener('click', this.cancelRegret);
  }

  regret() {
    if (this.isSingleMode()) {
      this.resetPiece();
    }
    this.resetPiece();
  }

  cancelRegret() {
    let pieceComputer = this.history[this.step + 1];
    let piecePlayer = this.history[this.step + 2];
    if (this.isSingleMode()) {
      this.setPiece(pieceComputer.x, pieceComputer.y);
      this.setPiece(piecePlayer.x, piecePlayer.y);
      this.resetStep --;
    } else {
      this.setPiece(pieceComputer.x, pieceComputer.y);
    }
    this.resetStep--;
    if (this.resetStep == 0) this.cancelRegretButton.disabled = true;
  }

  resetPiece() {
    let piece = this.history[this.step];
    this.brush.clearPiece(piece.x, piece.y, this.gridWidth);
    this.board[piece.x][piece.y] = 0;
    this.step--;
    if (this.step === 0) this.regretButton.disabled = true;
    this.cancelRegretButton.disabled = false;
    this.resetStep++;
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
    if (this.board[cx][cy] === 0) {
      this.setPiece(cx, cy);
      if (this.isSingleMode()) {
        const computerPiece = this.computerAI.nextStep(this.board);
        this.setPiece(computerPiece.x, computerPiece.y);
      }
    } else {
      alert("当前位置已有棋子，请不要重复落子哦");
    }
  }

  setPiece(cx, cy) {
    this.step++;
    const player = players[this.step % 2];
    this.brush.drawPiece(cx, cy, player.image, this.gridWidth);
    this.board[cx][cy] = player.value;
    this.judge(cx, cy, player.value);
    this.history[this.step] = {x: cx, y: cy};
    this.regretButton.disabled = false;
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
    if (!flag) return {count, flag};
    if (pieceValue === calculateValue) {
      count++;
    }
    else {
      flag = false;
    }
    return {count, flag};
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
    this.getMaxCount((x, i) => {
        return x - i
      }, this.valueGenerator,
      (x, i) => {
        return x + i
      }, this.valueGenerator, x, y, colNum);
  }

  isY(colNum, x, y) {
    this.getMaxCount(this.valueGenerator, (x, i) => {
        return x - i
      }, this.valueGenerator,
      (x, i) => {
        return x + i
      }, x, y, colNum);
  }

  isLx(colNum, x, y) {
    this.getMaxCount((x, i) => {
        return x - i
      }, (y, i) => {
        return y - i
      }, (x, i) => {
        return x + i
      },
      (y, i) => {
        return y + i
      }, x, y, colNum);
  }

  isLy(colNum, x, y) {
    this.getMaxCount((x, i) => {
        return x - i
      }, (y, i) => {
        return y + i
      }, (x, i) => {
        return x + i
      },
      (y, i) => {
        return y - i
      }, x, y, colNum);
  }

  success(count, colNum) {
    if (count >= 4) {
      players.map((player) => {
        if (player.value === colNum) {
          showModal(`${player.name}获胜`);
        }
      });
      this.canvas.removeEventListener('click', this.calculatePiecePosition);
      this.regretButton.addEventListener('click', this.regret);
    }
  }
}
