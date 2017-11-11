var utils = require('../src/utils');

describe('isBoardValid validates the board size', function() {
  it('expects true if both values are greater than 0', function() {
    expect(utils.isBoardValid([4, 5])).toBe(true);
  });
  it('expects false if one value is less than 0', function() {
    expect(utils.isBoardValid([0, 5])).toBe(false);
  });
});

describe('isCoordValid', function() {
  var cell = {
    'x': 1,
    'y': 0
  };
  var size = [4, 5];

  it('expects true if position is inside the board', function() {
    expect(utils.isCoordValid(cell, size)).toBe(true);
  });

  it('expects false if position is outside the board', function() {
    cell = {
      'x': 6,
      'y': 0
    };
    expect(utils.isCoordValid(cell, size)).toBe(false);
  });

  it('expects false if position is outside the board', function() {
    cell = {
      'x': 0,
      'y': -1
    };

    expect(utils.isCoordValid(cell, size)).toBe(false);
  });
});

describe('loadCoord converts the string value in coord object to integer,', function() {
  it('returns the parsed object if the values are valid', function() {
    var cell = {
      'x': '1',
      'y': '0'
    };
    expect(utils.loadCoord(cell)).toEqual({
      'x': 1,
      'y': 0
    });
  });
  it('returns empty object if the values are not valid', function() {
    var cell = {
      'x': '',
      'y': ''
    };
    expect(utils.loadCoord(cell)).toEqual({});
  });
});

describe('isPositionValid', function() {
  var pos = {
    'direction' : 'W',
    'coord': {
      'x': 1,
      'y': 0
    }
  };
  var size = [4, 5];

  it('expects true if direction is a valid value', function() {
    expect(utils.isPositionValid(pos, size)).toBe(true);
  });

  it('expects true if position is inside the board', function() {
    expect(utils.isPositionValid(pos, size)).toBe(true);
  });

  it('expects false if position is outside the board', function() {
    pos.coord.x = 6;
    pos.coord.y = 3;

    expect(utils.isPositionValid(pos, size)).toBe(false);
  });

  it('expects false if position is outside the board', function() {
    pos.coord.x = -1;
    pos.coord.y = -1;

    expect(utils.isPositionValid(pos, size)).toBe(false);
  });

  it('expects false if direction is not a valid value', function() {
    pos.direction = '';
    expect(utils.isPositionValid(pos, size)).toBe(false);
  });

});

describe('isMoveValid validates the direction', function() {
  it('expects true if dir is == R or F', function() {
    expect(utils.isMoveValid('R')).toBe(true);
    expect(utils.isMoveValid('F')).toBe(true);
  });
  it('expects false if dir is !== R or F', function() {
    expect(utils.isMoveValid('')).toBe(false);
    expect(utils.isMoveValid('r')).toBe(false);
  });
});

describe('rotate validates the rotation function', function() {
  it('returns the next direction', function() {
    expect(utils.rotate('S')).toBe('W');
    expect(utils.rotate('N')).toBe('E');
    expect(utils.rotate('W')).toBe('N');
    expect(utils.rotate('E')).toBe('S');
  });
});

describe('walk moves in the board by one cell facing west,', function() {
  var size = [5, 5];
  var pos = {
    'direction' : 'W',
    'coord': {
      'x': 1,
      'y': 2
    }
  };
  it('returns the new cell', function() {
    expect(utils.walk(pos, size)).toEqual({
      'direction' : 'W',
      'coord': {
        'x': 1,
        'y': 1
      }
    });
  });
});

describe('walk moves in the board by one cell facing south,', function() {
  var size = [5, 5];
  var pos = {
    'direction' : 'S',
    'coord': {
      'x': 0,
      'y': 2
    }
  };
  it('returns the new cell', function() {
    expect(utils.walk(pos, size)).toEqual({
      'direction' : 'S',
      'coord': {
        'x': 1,
        'y': 2
      }
    });
  });
});


describe('getNewPosition retrieves the next position, ', function() {
  var pos = {
    'direction' : 'W',
    'coord': {
      'x': 1,
      'y': 2
    }
  };
  var move = 'F';
  var size = [4, 5];

  it('if move is F, expects to walk by one cell', function() {
    expect(utils.getNewPosition(pos, move, size)).toEqual({
      'direction' : 'W',
      'coord': {
        'x': 1,
        'y': 1
      }
    });
  });
});

describe('getNewPosition retrieves the next position, ', function() {
  var pos = {
    'direction' : 'W',
    'coord': {
      'x': 1,
      'y': 2
    }
  };
  var move = 'R';
  var size = [4, 5];

  it('if move is R, expects to rotate and stay in the same cell', function() {
    expect(utils.getNewPosition(pos, move, size)).toEqual({
      'direction' : 'N',
      'coord': {
        'x': 1,
        'y': 2
      }
    });
  });
});


describe('getTarget checks if current position hits a given target,',
function() {
  var coord = {
    'x': 1,
    'y': 1
  };
  var target = {
    'x': 1,
    'y': 1
  };

  it('if the position corresponds to a mine expects true', function() {
    expect(utils.getTarget(coord, target)).toBe(true);
  });

  it('if the position does not corresponds to a mine expects false',
  function() {
    coord = {
      'x': 1,
      'y': 0
    };
    expect(utils.getTarget(coord, target)).toBe(false);
  });

});

describe('hitMines checks if current position hits a mine,', function() {
  var coord = {
    'x': 1,
    'y': 1
  };
  var mines = [
    {
      'x': 1,
      'y': 1
    },
    {
      'x': 1,
      'y': 3
    },
    {
      'x': 3,
      'y': 4
    }
  ];
  it('if the position corresponds to a mine expects true', function() {
    expect(utils.hitMine(coord, mines)).toBe(true);
  });

  it('if the position does not corresponds to a mine expects false',
  function() {
    coord = {
      'x': 1,
      'y': 0
    };
    expect(utils.hitMine(coord, mines)).toBe(false);
  });

});
