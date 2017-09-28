export default class drawHelper {

  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.ctx.strokeStyle = 'rgba(0,0,0,1)';
    this.ctx.fillStyle = 'rgba(0,0,0,1)';
    this.ctx.lineWidth = 1.5;
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
    const startX = cx * gridWidth - gridWidth / 2,
      startY = cy * gridWidth - gridWidth / 2;
    this.ctx.beginPath();
    this.ctx.clearRect(startX, startY, gridWidth, gridWidth);
    this.ctx.moveTo(startX - 0.5, cy * gridWidth);
    this.ctx.lineTo(startX + gridWidth + 0.5, cy * gridWidth);
    this.ctx.moveTo(cx * gridWidth, startY - 0.5);
    this.ctx.lineTo(cx * gridWidth, startY + gridWidth + 0.5);
    this.ctx.stroke();
  }
}
