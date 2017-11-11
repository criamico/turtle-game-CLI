var utils = {
  isBoardValid: function(board){
    return (Number.isInteger(board[0])
      && Number.isInteger(board[1])
      && board[0] > 0 && board[1] > 0);
  },

  isCoordValid: function(coord, size){
    return (coord.x >= 0 && coord.x < size[0]
      && coord.y >= 0 && coord.y < size[1]);
  },

  loadCoord: function(coord){
    var newCoord = {};
    if (Number.isInteger(parseInt(coord.x))
      && Number.isInteger(parseInt(coord.y))){
      newCoord.x = parseInt(coord.x);
      newCoord.y = parseInt(coord.y);
    }
    return newCoord;
  },

  isPositionValid: function(pos, size){
    var directions = ['N', 'E', 'S', 'W'];
    if (this.isCoordValid(pos.coord, size)
      && directions.indexOf(pos.direction) !== -1)
      return true;
    return false;
  },

  isMoveValid: function(dir){
    return (dir === 'R' || dir ==='F');
  },

  rotate: function(dir){
    var directions = ['N', 'E', 'S', 'W'];
    var i = directions.indexOf(dir);
    if (i !== -1)
      return directions[((i + 1) % 4)];
  },

  walk: function(pos){
    var newP = {
      coord: {}
    };
    newP.direction = pos.direction;
    switch (pos.direction) {
    case 'N':
      newP.coord.x = pos.coord.x - 1;
      newP.coord.y = pos.coord.y;
      break;
    case 'E':
      newP.coord.y = pos.coord.y + 1;
      newP.coord.x = pos.coord.x;
      break;
    case 'S':
      newP.coord.x = pos.coord.x + 1;
      newP.coord.y = pos.coord.y;
      break;
    case 'W':
      newP.coord.y = pos.coord.y - 1;
      newP.coord.x = pos.coord.x;
      break;
    }
    return newP;
  },

  getNewPosition: function(pos, newMove, size){
    var newP = {};
    if (newMove === 'R'){
      newP.direction = this.rotate(pos.direction);
      newP.coord = pos.coord;
    } else if (newMove === 'F') {
      newP = this.walk(pos, size);
    }
    return newP;
  },

  getTarget: function(coord, target){
    return (coord.x === target.x && coord.y === target.y);
  },

  hitMine: function(coord, mines){
    var result = false;
    for (var i = 0; i < mines.length; i++) {
      if (this.getTarget(coord, mines[i])){
        result = true;
        break;
      }
    }
    return result;
  }
};

module.exports = utils;
