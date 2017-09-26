export default class drawHelper {

  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
  }

  drawBoard(num, gridWidth) {
    const width = gridWidth * num;
    this.ctx.fillStyle = '#ffc007';

    this.ctx.fillRect(0, 0, width, width);
    for (let i = 1; i < num; i++) {
      this.ctx.moveTo(0, i * gridWidth);
      this.ctx.lineTo(width, i * gridWidth);
      this.ctx.stroke();
      this.ctx.moveTo(i * gridWidth, 0);
      this.ctx.lineTo(i * gridWidth, width);
      this.ctx.stroke()
    }
  }

  drawPiece(cx, cy, color, gridWidth) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(cx * gridWidth, cy * gridWidth, gridWidth / 2 - 3, 0, 2 * Math.PI);
    this.ctx.fill()
  }
}
