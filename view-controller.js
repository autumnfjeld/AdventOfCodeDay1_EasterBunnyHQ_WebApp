'use strict';

(function(window) {

    /**
     *
     * @param {Array} sequence
     * @param {Object} position
     * @param {number} minBlocks
     * @constructor
     */
    function ViewController(sequence, position, minBlocks) {
        this.sequence = sequence;
        this.minBlocks = minBlocks;
        this.pathBoundaries = position.pathBoundaries;
        //TODO eliminate pathCoordinates
        this.pathCoordinates = position.pathCoordinates;
        this.setIntervalId = null;

        // Properties for the html canvas grid (Consider making canvas it's own class or adding on to native object)
        // TODO for variable input, compute scaleFactor according to pathBoundaries
        this.canvasProps = {
            // scaleFactor represents #of pixels per city block
            scaleFactor: 5,
            gridBoundaries: {
                minX: null,
                maxX: null,
                minY: null,
                maxY: null,
            },
            axisColor: 'hsl(0,100%,100%)',
            gridLineColor: 'hsl(0,0%,70%)',
            pathColor: 'hsl(88, 48%, 41%)',
        };
        this.scaledPathCoords = this.pathCoordinates.map(function(coord) {
            return {
                x: coord.x * this.canvasProps.scaleFactor,
                y: coord.y * this.canvasProps.scaleFactor,
            }
        }.bind(this));
    

        // Define DOM selectors
        this.$instructionSequence = document.querySelector('.instruction-sequence');
        this.$solution = document.querySelector('.solution');
        this.$path = document.querySelector('.path');
    }

    /**
     * Initiate render of DOM
     */
    ViewController.prototype.render = function() {
        this.$solution.innerHTML = this.minBlocks;
        this.$canvas = document.getElementById("city-grid");
        this.context = this.$canvas.getContext("2d");

        this._setUpCanvas();
        this._animate();
        //TODO Draw shortest path
    };

    /**
     * Sets up:
     *   - canvas size based on pathBoundaries computed in FindEasterBunnyHQ
     *   - x, y coordinates axes 
     *   - grid lines that represent the city grid
     */
    ViewController.prototype._setUpCanvas = function() {
        this._computeCanvasBoundaries();
        var cb = this.canvasProps.gridBoundaries;

        this.$canvas.width = (Math.abs(cb.minX) + cb.maxX);
        this.$canvas.height = (Math.abs(cb.minY) + cb.maxY);

        // Canvas puts [0,0] point at top left, with x+ going right and y+ going down.  Use canvas translate and 
        // scale methods to convert the x, y axis into the familiar cartision grid coordinate directions
        var translateXAxix = Math.abs(cb.minX),
            translateYAxis = cb.maxY;
        this.context.translate(translateXAxix, translateYAxis);
        this.context.scale(1, -1);
        this.context.lineWidth = 1;
        this.context.strokeStyle = this.canvasProps.axisColor;

        // Draw coordinate axes: tell canvas context to begin a new path 
        this.context.beginPath();
        // Draw x coordinate axis
        this.context.moveTo(cb.minX, 0);
        this.context.lineTo(cb.maxX, 0);
        // Draw y axis
        this.context.moveTo(0, cb.minY);
        this.context.lineTo(0, cb.maxY);
        this.context.stroke();

        // Draw grid lines
        var x = cb.minX,
            y = cb.minY;
        while (y <= cb.maxY || x <= cb.maxX) {
            this.context.lineWidth = .5;
            this.context.strokeStyle = this.canvasProps.gridLineColor;
            this.context.beginPath();
            // Draw horizontal grid lines
            this.context.moveTo(cb.minX, y);
            this.context.lineTo(cb.maxX, y);
            // Draw vertical grid lines
            this.context.moveTo(x, cb.minY);
            this.context.lineTo(x, cb.maxY);
            this.context.stroke();
            // For very large grids, more efficient to break up x & y iterations
            x = x > cb.maxX ? x : x + this.canvasProps.scaleFactor;
            y = y > cb.maxY ? y : y + this.canvasProps.scaleFactor;
        }
    };

    /**
     * Computes the boundaries of the html canvas as a function of the input path boundaries
     * and the scaleFactor
     */
    ViewController.prototype._computeCanvasBoundaries = function() {
        var boundaryExtension = null;
        // Entry contains the [key, value] pair for each item in this.pathBoundaries
        Object.entries(this.pathBoundaries).forEach(function(entry) {
            boundaryExtension = entry[0].includes('max') ? 2 * this.canvasProps.scaleFactor : -2 * this.canvasProps.scaleFactor;
            this.canvasProps.gridBoundaries[entry[0]] = entry[1] * this.canvasProps.scaleFactor + boundaryExtension;
        }.bind(this));
    };

    /**
     * Draw a single segment of the path for the given destination coordinates
     * @param  {Object} coordinate - {x: , y: } coordiante position
     */
    ViewController.prototype._drawLine = function(coordinate) {
        this.context.lineTo(coordinate.x, coordinate.y);
        this.context.stroke();
    };

    /**
     * Animate the path using setInterval and _drawLine function
     * TODO: make general to handle the Manhattan Distance path
     */
    ViewController.prototype._animate = function() {
        // Set line properties and starting position
        this.context.lineWidth = 2;
        this.context.strokeStyle = this.canvasProps.pathColor;
        this.context.beginPath();
        this.context.moveTo(0, 0);
        var i = 0;

        this.setIntervalId = window.setInterval(function() {
            this._renderCurrentPathInstruction(i);
            this._drawLine(this.scaledPathCoords[i++]);
            if (this.scaledPathCoords.length === i) {
                this._stopAnimation(this.setIntervalId);
            }
        }.bind(this), 200);

        function stop() {
            window.clearInterval(this.setIntervalId)
        }
    };

    /**
     * Stop the setInterval execution
     * @param  {number} intervalId - the setInterval id
     */
    ViewController.prototype._stopAnimation = function(intervalId) {
        window.clearInterval(intervalId);
    };

    /**
     * Append the sequence instruction to the DOM
     * @param  {[type]} i [description]
     * @return {[type]}   [description]
     */
    ViewController.prototype._renderCurrentPathInstruction = function(i) {
        var text,
            $newInstruction = document.createElement('p'),
            $previousInstruction = document.querySelector('.instruction-' + i),
            displayIndex = i + 1;

        if (this.sequence[i].startsWith('R')) {
            text = 'Right ';
        } else {
            text = 'Left   ';
        }
        text = displayIndex + ')  ' + text + this.sequence[i].substring(1) + ' blocks';
      
        $newInstruction.className = 'instruction-' + displayIndex;
        $newInstruction.innerHTML = text;
        this.$instructionSequence.insertBefore($newInstruction, $previousInstruction)
    };

    // Export to window
    window.app = window.app || {};
    window.app.ViewController = ViewController;

})(window);