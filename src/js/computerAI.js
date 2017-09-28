import {calculateWinNums} from './winStrategy';

export default class ComputerAI {
  constructor(num) {
    const result = calculateWinNums();
    this.wins = result.wins;
    this.count = result.count;
    this.num = num;
  }

  nextStep(chessboard) {
    const myScore = [];
    const computerScore = [];
    const myWin = [];
    const _myWin = [];
    const computerWin = [];
    const _compWin = [];
    for (let i = 0; i < this.count; i++) {
      myWin[i] = 0;
      _myWin[i] = 0;
      computerWin[i] = 0;
      _compWin[i] = 0;
    }
    let max = 0, u = 0, v = 0;
    for (let i = 0; i < this.num; i++) {
      myScore[i] = [];
      computerScore[i] = [];
      for (let j = 0; j < this.num; j++) {
        myScore[i][j] = 0;
        computerScore[i][j] = 0;
      }
    }

    for (let i = 0; i < this.num; i++) {
      for (let j = 0; j < this.num; j++) {
        for (let k = 0; k < this.count; k++) { // 将可能赢的情况都加1
          if (this.wins[i][j][k]) {
            if(chessboard[i][j] === 1) {
              myWin[k]++;
              computerWin[k] = 6;//
            } else if(chessboard[i][j] === 2) {
              myWin[k] = 6;
              _compWin[k] = computerWin[k]; // 为悔棋做准备
              computerWin[k]++;//
            }
          }
        }
      }
    }
    for (let i = 0; i < this.num; i++) {
      for (let j = 0; j < this.num; j++) {
        if (chessboard[i][j] == 0) {
          for (let k = 0; k < this.count; k++) {
            if (this.wins[i][j][k]) {
              if (myWin[k] == 1) {
                myScore[i][j] += 220;
              } else if (myWin[k] == 2) {
                myScore[i][j] += 420;
              } else if (myWin[k] == 3) {
                myScore[i][j] += 2100;
              } else if (myWin[k] == 4) {
                myScore[i][j] += 20000;
              }

              if (computerWin[k] == 1) {
                computerScore[i][j] += 200;
              } else if (computerWin[k] == 2) {
                computerScore[i][j] += 400;
              } else if (computerWin[k] == 3) {
                computerScore[i][j] += 2900;
              } else if (computerWin[k] == 4) {
                computerScore[i][j] += 10000;
              }
            }
          }

          if (myScore[i][j] > max) {
            max = myScore[i][j];
            u = i;
            v = j;
          } else if (myScore[i][j] == max) {
            if (computerScore[i][j] > computerScore[u][v]) {
              u = i;
              v = j;
            }
          }

          if (computerScore[i][j] > max) {
            max = computerScore[i][j];
            u = i;
            v = j;
          } else if (computerScore[i][j] == max) {
            if (myScore[i][j] > myScore[u][v]) {
              u = i;
              v = j;
            }
          }

        }
      }
    }
    return {x: u, y: v}
  }
}
