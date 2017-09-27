import {calculateWinNums} from './winStrategy';

const scoreWeight = {
  player: [200, 400, 2000, 10000, 0],
  computer: [220, 420, 2200, 20000, 0]
};

export default class ComputerAI {
  constructor(num) {
    const result = calculateWinNums();
    this.wins = result.wins;
    this.count = result.count;
    this.num = num;
    this.playerScore = [];
    this.computerScore = [];
    this.playerWin = [];
    this.computerWin = [];
  }

  initScores() {
    for (let i = 0; i < this.num; i++) {
      this.playerScore[i] = [];
      this.computerScore[i] = [];
      for (let j = 0; j < this.num; j++) {
        this.playerScore[i][j] = 0;
        this.computerScore[i][j] = 0;
      }
    }

    for (let i = 0; i < this.count; i++) {
      this.playerWin[i] = 0;
      this.computerWin[i] = 0;
    }
  }

  calculateWinStrategies(chessboard) {
    for (let i = 0; i < this.num; i++) {
      for (let j = 0; j < this.num; j++) {
        for (let k = 0; k < this.count; k++) { // 将可能赢的情况都加1
          if (this.wins[i][j][k]) {
            if (chessboard[i][j] === 1) {
              this.playerWin[k]++;
              this.computerWin[k] = 5;//
            } else if (chessboard[i][j] === 2) {
              this.playerWin[k] = 5;
              this.computerWin[k]++;//
            }
          }
        }
      }
    }
  }

  calculateOptimizePosition(chessboard) {
    let max = 0, u = 0, v = 0;
    for (let i = 0; i < this.num; i++) {
      for (let j = 0; j < this.num; j++) {
        if (chessboard[i][j] == 0) {
          for (let k = 0; k < this.count; k++) {
            if (this.wins[i][j][k]) {
              this.playerScore[i][j] += scoreWeight.player[this.playerWin[k]];
              this.computerScore[i][j] += scoreWeight.computer[this.computerWin[k]];
            }
          }
          if (this.playerScore[i][j] > max) {
            max = this.playerScore[i][j];
            u = i;
            v = j;
          } else if (this.playerScore[i][j] == max) {
            if (this.computerScore[i][j] > this.computerScore[u][v]) {
              u = i;
              v = j;
            }
          }

          if (this.computerScore[i][j] > max) {
            max = this.computerScore[i][j];
            u = i;
            v = j;
          } else if (this.computerScore[i][j] == max) {
            if (this.playerScore[i][j] > this.playerScore[u][v]) {
              u = i;
              v = j;
            }
          }
        }
      }
    }
    return {x: u, y: v};
  }

  nextStep(chessboard) {
    this.initScores();
    this.calculateWinStrategies(chessboard);
    return this.calculateOptimizePosition(chessboard);
  }
}
