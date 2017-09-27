import Chessboard from './js/Chessboard';
import {hideModal} from './js/modal';
import './styles/styles.scss';

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('single-player').addEventListener('click', startSingleGame);
  document.getElementById('multi-player').addEventListener('click', startMultipleGame);
});

const startSingleGame = () => {
  new Chessboard(15, 'single');
  hideModal();
};

const startMultipleGame = () => {
  new Chessboard(15, 'multiple');
  hideModal();
};
