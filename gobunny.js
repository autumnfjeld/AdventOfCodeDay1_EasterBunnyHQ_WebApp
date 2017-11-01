'use strict';

/****************************************************************************
 *  Easter Bunny HQ App
 *
 *  Assumptions/Decisions
 *  - Grid is comprised of squares, every block is equidistant
 *  - Dr. Bunny is 'theoretically' moving about the grid in order to compute the location of Easter
 *    Bunny HQ and comments below refer to her in this sense
 *  - Start position is [0,0] on Cartesian grin
 *
 ****************************************************************************/


/**
 * Track the direction in which Dr. Bunny is facing as she 'theoretically' moves about the grid
 * Initial direction is facing north
 * Cardinal direction vectors in a Cartesian grid:  North [0, 1], South [0, -1], East [1,0], West [-1,0]
 * @constructor
 */
function Direction() {
    this.cardinalDirectionVectors = [
        [0,1],      // North
        [1,0],      // East
        [0,-1],     // South
        [-1, 0]     // West
    ];
    // Dr. Bunny initially faces North
    this.directionVectorIndex = 0;
}

/**
 * Compute the new direction vector that results from a R turn (clockwise) or L turn (counterclockwise)
 * Clockwise rotation increments the index of the cardinalDirectionVectors array, cycling through 0,1,2,3,0,1...
 * Counterclockwise rotation decrements the index of the cardinalDirectionVectors array, cycling through 0,3,3,2,1,0...
 * @param {string} turnDirection
 */
Direction.prototype.turn = function (turnDirection) {
    if (!turnDirection) {
        console.error('Dr. Bunny cannot turn without a turnDirection. Check the program input.');
        return;
    }
    if (turnDirection === 'R') {
        this.directionVectorIndex = this.directionVectorIndex === 3 ? 0 : ++this.directionVectorIndex;
    } else {
        this.directionVectorIndex = this.directionVectorIndex === 0 ? this.cardinalDirectionVectors.length - 1 : --this.directionVectorIndex;
    }
};



/**
 * Track the position of Dr. Bunny in the city grid in terms of a Cartesian grid
 * @constructor
 */
function Position() {
    this.x = 0;
    this.y = 0;
    this.pathCoordinates = [{x:0, y:0}];
    this.pathBoundaries = {
        minX: 0,
        maxX: 0,
        minY: 0,
        maxY: 0
    };
}

/**
 * Update Dr. Bunny's position by computing the distance moved in the specified direction
 * @param {number} distance
 * @param {Array} directionVector
 */
Position.prototype.updatePosition = function (distance, directionVector) {
    if (!distance || !directionVector) {
        console.error('Cannot move Dr. Bunny without distance and direction vector. Check the program input.');
        return;
    }
    if (directionVector[0] === 0) {
        this.y += distance * directionVector[1];
    } else {
        this.x += distance * directionVector[0];
    }
    this.pathCoordinates.push({x: this.x, y: this.y});
    this.trackBoundary();
};

Position.prototype.trackBoundary = function (){
    if (this.x < this.pathBoundaries.minX) {
        this.pathBoundaries.minX = this.x;
    }
    if (this.x > this.pathBoundaries.maxX) {
        this.pathBoundaries.maxX = this.x;
    }
    if (this.y < this.pathBoundaries.minY) {
        this.pathBoundaries.minY = this.y;
    }
    if (this.y > this.pathBoundaries.maxY) {
        this.pathBoundaries.maxY= this.y;
    }
};



/**
 * Find the location of the Easter Bunny HQ from a given sequence of movements in a city grid
 * @param {Array} sequence - array of strings
 * @constructor
 */
function FindEasterBunnyHQ(sequence) {
    if (!sequence) {
        console.error('FindEasterBunnyHQ requires a sequence of movements. Check the program input.');
        return;
    }
    this.direction = new Direction();
    this.position = new Position();
    this.minimumBlocksAway = null;
    this.parsedSequence = this.parseSequence(sequence);
}

/**
 * Break the sequence strings into turn direction and travel distance
 * @param {Array} sequence
 * @returns {Object}
 */
FindEasterBunnyHQ.prototype.parseSequence = function (sequence) {
    return sequence.map(function (instruction) {
        return {
            turn: instruction.slice(0, 1),
            distance: instruction.slice(1)
        };
    });
};

/**
 * Get Dr. Bunny on her way, this starts the computation of movement in the Cartesian grid
 */
FindEasterBunnyHQ.prototype.go = function(){
    this.hopAlongTheBlocks();
    this.computeMinBunnyBlocks();
};

/**
 * Move Dr. Bunny through the grid by computing the new direction and distance traveled for each sequence instruction
 */
FindEasterBunnyHQ.prototype.hopAlongTheBlocks = function () {
    this.parsedSequence.forEach(function (instruction) {
        this.direction.turn(instruction.turn);
        var directionVector = this.direction.cardinalDirectionVectors[this.direction.directionVectorIndex];
        this.position.updatePosition(instruction.distance, directionVector);
    }.bind(this));
};

/**
 * Compute the minimum number of blocks Dr. Bunny could travel to get from her start position to final position
 * Start position is [0,0]
 */
FindEasterBunnyHQ.prototype.computeMinBunnyBlocks = function () {
    this.minimumBlocksAway = Math.abs(this.position.x) + Math.abs(this.position.y);
};

window.app = window.app || {};
window.app.FindEasterBunnyHQ = FindEasterBunnyHQ;


// TODO setup different testing procedure