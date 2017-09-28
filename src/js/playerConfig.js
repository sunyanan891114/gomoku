import blackPiece from '../asset/piece-black.png';
import whitePiece from '../asset/piece-white.png';

export default [{
  id: 'black',
  value: 1,
  image: whitePiece,
  name: '白棋',
  otherId: 'white'
},{
  id: 'white',
  value: 2,
  name: '黑棋',
  image: blackPiece,
  otherId: 'black'
}]
