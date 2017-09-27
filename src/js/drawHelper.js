export default class drawHelper {

  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.ctx.strokeStyle = "#000000";
  }

  drawBoard(num, gridWidth) {
    const width = gridWidth * num;

    for (let i = 1; i < num; i++) {
      this.ctx.moveTo(0, i * gridWidth);
      this.ctx.lineTo(width, i * gridWidth);
      this.ctx.moveTo(i * gridWidth, 0);
      this.ctx.lineTo(i * gridWidth, width);
    }
    this.ctx.stroke();
  }

  drawPiece(cx, cy, imageSrc, gridWidth) {
    const pieceImage = new Image();
    pieceImage.src = imageSrc;
    pieceImage.onload = () => {
      this.ctx.drawImage(pieceImage, cx * gridWidth - gridWidth / 2, cy * gridWidth - gridWidth / 2, gridWidth, gridWidth);
    };
  }

  clearPiece(cx, cy, gridWidth) {
    this.ctx.beginPath();
    this.ctx.clearRect(cx * gridWidth - gridWidth / 2, cy * gridWidth- gridWidth / 2, gridWidth, gridWidth);
    this.ctx.moveTo(cx * gridWidth - gridWidth / 2, cy * gridWidth);
    this.ctx.lineTo(cx * gridWidth + gridWidth / 2, cy * gridWidth);
    this.ctx.moveTo(cx * gridWidth, cy * gridWidth - gridWidth / 2);
    this.ctx.lineTo(cx * gridWidth, cy * gridWidth + gridWidth / 2);
    this.ctx.stroke();
  }
}
