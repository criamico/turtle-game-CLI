## Turtle-game

Simulate the movement of a turtle in a minefield of size m x n. The turtle can ​move​  one cell forward or rotate​ 90 degrees to the right.
The program reads the initial settings from a file (game-settings.json) and one or more sequences of moves from another file (moves.json).

* `Settings.json` contains the board size, the starting position in the grid, the exit point and the list of cells containing mines.
* `Moves.json` contains the list of moves: 'R' for rotation and 'F' for forward movement
* The files `game-settings-invalid.json` and `moves_invalid.json`, used to check that the program doesn't start when the initial settings or the moves are not valid.

The program will read the initial game settings from one file (settings.json) and one or more sequences of moves from another file (moves.json).
For each move sequence the program will output if the sequence leads to the success or failure of the turtle: the turtle can either reach the exit (win), hit a mine (fail) or remain in the grid (danger).

The board size is m (rows) x n (columns) and the coordinates system follows the same convention.

The program is coded in **node.js v5.0.0** and the **Jasmine** test suit is used to create the unit tests for the helper functions.

The program is in index.js and all the helper functions are in utils.js, which is exported as a Node module. Its functions are covered by unit tests written in Jasmine, found inside `/spec/utils-specs.js`

# Installation
`npm install`

# Usage:
To start the tests:
`npm test`

If there is any problem with the Node version:
`nvm install 5.0`
`nvm use 5.0`

To start the program:
`npm start game-settings.json moves.json`
