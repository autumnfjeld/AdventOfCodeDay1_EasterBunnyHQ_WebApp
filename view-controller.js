'use strict';

(function (window) {

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
        // Properties for the html canvas grid
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
    ViewController.prototype.render = function(){
        this.$input.innerHTML= this.sequence;
        this.$solution.innerHTML = this.minBlocks;
        this.$canvas = document.getElementById("canvas");
        this.context = this.$canvas.getContext("2d"),

        this._setUpCanvas();
        this._drawPath();

    };

    /**
     * Sets up:
     *   - canvas size based on pathBoundaries computed in FindEasterBunnyHQ
     *   - x, y coordinates axes 
     *   - grid lines that represent the city grid
     * 
     */
    ViewController.prototype._setUpCanvas = function(){

        var minX = this.pathBoundaries.minX * this.canvasProps.scaleFactor - 2 * this.canvasProps.scaleFactor,
            maxX = this.pathBoundaries.maxX * this.canvasProps.scaleFactor + 2 * this.canvasProps.scaleFactor,
            minY = this.pathBoundaries.minY * this.canvasProps.scaleFactor - 2 * this.canvasProps.scaleFactor,
            maxY = this.pathBoundaries.maxY * this.canvasProps.scaleFactor + 2 * this.canvasProps.scaleFactor;
            console.log('Grid boundaries', minX, maxX, minY, maxY);

        this.$canvas.width =  (Math.abs(minX) + maxX);
        this.$canvas.height = (Math.abs(minY) + maxY);
      

        //TODO use this.context
        // Canvas puts [0,0] point at top left, with x+ going right and y positive
        // going down.  Use canvas translate and scale methods to convert the x, y axis
        // into the familiar cartision grid coordinate directions
        var context = this.context,
            translateXAxix = Math.abs(minX),
            translateYAxis = maxY;

        // Move x and y axis to center of canvas
        context.translate(translateXAxix, translateYAxis);

        // Mirror y axis to create Cartesian coordinate system
        context.scale(1,-1);
        context.lineWidth = 1;
        context.strokeStyle = this.canvasProps.axisColor;

        // tell canvas you to begin a new path
        context.beginPath();
        // Draw x coordinate axis
        context.moveTo(minX, 0);
        context.lineTo(maxX, 0);
        // Draw y axis
        context.moveTo(0, minY);
        context.lineTo(0, maxY);
        context.stroke();

        // Draw grid lines
        var x = minX, y = minY;
        // TODO account for non-equal x,y iterations 
        while (y < maxY || x < maxX) {
            // console.log('before x', x, ' y', y);
            // console.log('after', x, ' y', y);
            var x = x + this.canvasProps.scaleFactor;
            var y = y + this.canvasProps.scaleFactor;
            context.lineWidth = .5;
            context.strokeStyle = this.canvasProps.gridLineColor;
            context.beginPath();
            // Draw horizontal grid lines
            context.moveTo(minX, y);
            context.lineTo(maxX, y);
            // Draw vertical grid lines
            context.moveTo(x, minY);
            context.lineTo(x, maxY);
            context.stroke();
        }

    };

    /**
     * Draw the path resulting from the input sequence instructions
     */
    ViewController.prototype._drawPath = function(){
        this.context.lineWidth = 2;
        this.context.strokeStyle = this.canvasProps.pathColor;
        this.context.beginPath();
        this.context.moveTo(0,0);  // put in variable
        // TODO animate path drawing and coordinate display of the sequence instruction
        this.pathCoordinates.forEach(function(coord){
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