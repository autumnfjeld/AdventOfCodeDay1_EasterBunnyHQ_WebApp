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
        this.pathCoordinates = position.pathCoordinates;

        this.$input = document.querySelector('.input');
        this.$solution = document.querySelector('.solution');
    }

    /**
     * Initiate render of dynamic DOM info
     */
    ViewController.prototype.render = function(){
        this.$input.innerHTML= this.sequence;
        this.$solution.innerHTML = this.minBlocks;
        this.$canvas = document.getElementById("canvas");

        this.setUpCanvas();

    };

    ViewController.prototype.setUpCanvas = function(){

        var gridLineColor = 'hsl(0,0%,70%)',
            axisColor = 'hsl(0,0%,50%)';

        var context = this.$canvas.getContext("2d"),
            transX = this.$canvas.width * 0.5,
            transY = this.$canvas.height * 0.5;

        // Move x and y axis to center of canvas
        context.translate(transX, transY);
        // Mirror y axis to create Cartesian coordinate system
        context.scale(1,-1);
        context.lineWidth = 1;
        context.strokeStyle = axisColor;

        // tell canvas you to begin a new path
        context.beginPath();
        var minX = -this.$canvas.width/2, maxX = this.$canvas.width/2;
        var minY = -this.$canvas.height/2, maxY = this.$canvas.height/2;

        // Draw coordinates axis
        context.moveTo(minX, 0);
        context.lineTo(maxX, 0);
        context.moveTo(0, minY);
        context.lineTo(0, maxY);
        context.stroke();
    };


    // Export to window
    window.app = window.app || {};
    window.app.ViewController = ViewController;

})(window);