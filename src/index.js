import Chessboard from './js/Chessboard';
import {hideModal} from './js/modal';
import './styles/styles.scss';
import chessboardBackground from './asset/chessboard.jpg';

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('single-player').addEventListener('click', startSingleGame);
  document.getElementById('multi-player').addEventListener('click', startMultipleGame);
  showBackgroundAfterFullyLoaded();
});

const showBackgroundAfterFullyLoaded = () => {
  const canvas = document.getElementById('chessboard-canvas');
  canvas.style.backgroundImage = "none";
  const bgImage = new Image();
  bgImage.src = chessboardBackground;
  bgImage.onload = function() {
    canvas.style.backgroundImage = `url(${chessboardBackground})`;
    canvas.style.filter = 'blur(0)';
  };
};

const startSingleGame = () => {
  new Chessboard(15, 'single');
  hideModal();
};

const startMultipleGame = () => {
  new Chessboard(15, 'multiple');
  hideModal();
};
