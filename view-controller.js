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
        this.pathCoordinates = position.pathCoordinates;

        // Set the # of pixels in a city grid (TODO: will need to be computed for variable pathBoundaries)
        // Properties for the html canvas grid (Consider making canvas it's own class or adding on to native object)
        this.canvasProps = {
            // TODO for variable input, compute scaleFactor according to pathBoundaries
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

        // DOM selectors
        this.$input = document.querySelector('.input');
        this.$solution = document.querySelector('.solution');
    }

    /**
     * Initiate render of DOM
     */
    ViewController.prototype.render = function() {
        this.$input.innerHTML = this.sequence;
        this.$solution.innerHTML = this.minBlocks;
        this.$canvas = document.getElementById("canvas");
        this.context = this.$canvas.getContext("2d");

        this._setUpCanvas();
        this._drawPath();
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
     * Draw the path resulting from the input sequence instructions
     */
    ViewController.prototype._drawPath = function() {
        this.context.lineWidth = 2;
        this.context.strokeStyle = this.canvasProps.pathColor;
        this.context.beginPath();
        this.context.moveTo(0, 0); // put in variable
        // TODO animate path drawing and coordinate display of the sequence instruction
        this.pathCoordinates.forEach(function(coord) {
            var x = coord.x * this.canvasProps.scaleFactor,
                y = coord.y * this.canvasProps.scaleFactor;
            this.context.lineTo(x, y);
            this.context.stroke();
        }.bind(this));
    };

    // Export to window
    window.app = window.app || {};
    window.app.ViewController = ViewController;

})(window);