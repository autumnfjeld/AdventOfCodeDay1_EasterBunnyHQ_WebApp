'use strict';

(function (window) {

    /**
     *
     * @param {Array} sequence
     * @param {Object} position
     * @param {number} minBlocks
     * @constructor
     */
    function ViewController(sequence, minBlocks) {
        this.sequence = sequence;
        this.minBlocks = minBlocks;

        this.$input = document.querySelector('.input');
        this.$solution = document.querySelector('.solution');
    }

    /**
     * Initiate render of dynamic DOM info
     */
    ViewController.prototype.render = function(){
        this.$input.innerHTML= this.sequence;
        this.$solution.innerHTML = this.minBlocks;

        this.setUpCanvas();

    };

    ViewController.prototype.setUpCanvas = function(){

        var gridLineColor = 'hsl(0,0%,80%)',
            axisColor = 'hsl(0,0%,60%)';

        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d"),
            transX = canvas.width * 0.5,
            transY = canvas.height * 0.5;


        // Move x and y axis to center of canvas
        context.translate(transX, transY);
        // Mirror y axis to create Cartesian coordinate system
        context.scale(1,-1);
        context.lineWidth = 1;
        context.strokeStyle = axisColor;

        // tell canvas you are beginning a new path
        context.beginPath();
        var xMin = -canvas.width/2, xMax = canvas.width/2;
        var yMin = -canvas.height/2, yMax = canvas.height/2;

        // Draw coordinates axis
        context.moveTo(xMin, 0);
        context.lineTo(xMax, 0);
        context.moveTo(0, yMin);
        context.lineTo(0, yMax);
        context.stroke();
    };


    // Export to window
    window.app = window.app || {};
    window.app.ViewController = ViewController;

})(window);