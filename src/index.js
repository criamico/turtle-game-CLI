var fs = require('fs');
var utils = require('./utils');

// usage:  npm start game-settings.json moves.json

var fSettings = process.argv[2];
var fMoves = process.argv[3];

var boardSize = [];
var currPosition = {};
var startPosition = {};
var target = {};
var mines = [];

try {
  var settings = JSON.parse(fs.readFileSync(fSettings, 'utf8'));

  boardSize = [ parseInt(settings.size.m), parseInt(settings.size.n) ];
  startPosition.coord = utils.loadCoord(settings.position.coord);
  startPosition.direction = settings.position.direction;
  target = utils.loadCoord(settings.exit);

  // load mines list
  settings.minesList.forEach(function(m){
    var mine = {};
    if (utils.isCoordValid(m, boardSize)) {
      mine = utils.loadCoord(m);
      mines.push(mine);
    }
  });

} catch (err) {
  console.log('Something went wrong while reading game-settings.'
  +' Please load another file.');
}

// load moves.json
try {
  var movesObj = JSON.parse(fs.readFileSync(fMoves, 'utf8'));
  var movesList = movesObj.moves;
} catch (err) {
  console.log(
    'Something went wrong while reading moves. Please load another file.');
}


if (utils.isBoardValid(boardSize)
  && utils.isPositionValid(startPosition, boardSize)
  && utils.isCoordValid(settings.exit, boardSize)
  && mines.length > 0
  && movesList.length > 0){

  console.log('Board size is', boardSize[0] + ' x ' + boardSize[1]);
  console.log('Start position is',
    startPosition.direction,
    startPosition.coord.x + ',' + startPosition.coord.y );
  console.log('The exit is in', target.x + ',' +  target.y);

  movesList.forEach(function(sequence, n){
    currPosition.direction = startPosition.direction;
    currPosition.coord = startPosition.coord;

    sequence.forEach(function(s, i) {
      if (utils.isMoveValid(sequence[i])){
        currPosition = utils.getNewPosition(
          currPosition, s, boardSize
        );

        if (utils.isPositionValid(currPosition, boardSize)){
          if (utils.hitMine(currPosition.coord, mines)){
            console.log('Sequence', n+1, ': Boom! you hit a mine.');
            return;
          } else if (utils.getTarget(currPosition.coord, target)){
            console.log('Sequence', n+1, ': Success! You found the exit!');
            return;
          } else if (i === sequence.length - 1){
            console.log('Sequence', n+1,
              ': Still in danger.' +
              'You didn\'t hit a mine but you didn\'t find the exit either. ');
            return;
          }
        } else {
          console.log('Sequence', n+1,
            ': Your moves determined an invalid position, sorry. Try again.');
          return;
        }
      } else {
        console.log('Sequence', n+1,
          ': The move entered is not a valid one, sorry.' +
          'Evaluating the next sequence.');
        return;
      }
    });
  });
} else {
  console.log('You entered invalid settings or moves. Please load new files.');
}
