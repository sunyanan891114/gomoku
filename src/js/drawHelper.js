export default class drawHelper {

  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
  }

  drawBoard(num, gridWidth) {
    const width = gridWidth * num;

    for (let i = 1; i < num; i++) {
      this.ctx.moveTo(0, i * gridWidth);
      this.ctx.lineTo(width, i * gridWidth);
      this.ctx.stroke();
      this.ctx.moveTo(i * gridWidth, 0);
      this.ctx.lineTo(i * gridWidth, width);
      this.ctx.stroke()
    }
  }

  drawPiece(cx, cy, imageSrc, gridWidth) {
    const pieceImage = new Image();
    pieceImage.src = imageSrc;
    pieceImage.onload = () => {
      this.ctx.drawImage(pieceImage, cx * gridWidth - gridWidth / 2, cy * gridWidth - gridWidth / 2, gridWidth, gridWidth);
    };
  }
}
