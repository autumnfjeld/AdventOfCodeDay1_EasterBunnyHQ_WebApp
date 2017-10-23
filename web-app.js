'use strict';

(function (window) {

    /**
     * Web App ties together the Easter Bunny HQ computations and view rendering
     * @constructor
     */
    function WebApp() {
        // var sequence = ['R5', 'L5', 'R5', 'R3'];
        // var sequence = ['L2', 'L3', 'L3', 'L4', 'R1', 'R2', 'L3', 'R3', 'R3', 'L1', 'L3', 'R2', 'R3', 'L3', 'R4', 'R3', 'R3', 'L1', 'L4', 'R4', 'L2', 'R5', 'R1', 'L5', 'R1', 'R3', 'L5', 'R2', 'L2', 'R2', 'R1', 'L1', 'L3', 'L3', 'R4', 'R5', 'R4', 'L1', 'L189', 'L2', 'R2', 'L5', 'R5', 'R45', 'L3', 'R4', 'R77', 'L1', 'R1', 'R194', 'R2', 'L5', 'L3', 'L2', 'L1', 'R5', 'L3', 'L3', 'L5', 'L5', 'L5', 'R2', 'L1', 'L2', 'L3', 'R2', 'R5', 'R4', 'L2', 'R3', 'R5', 'L2', 'L2', 'R3', 'L3', 'L2', 'L1', 'L3', 'R5', 'R4', 'R3', 'R2', 'L1', 'R2', 'L5', 'R4', 'L5', 'L4', 'R4', 'L2', 'R5', 'L3', 'L2', 'R4', 'L1', 'L2', 'R2', 'R3', 'L2', 'L5', 'R1', 'R1', 'R3', 'R4', 'R1', 'R2', 'R4', 'R5', 'L3', 'L5', 'L3', 'L3', 'R5', 'R4', 'R1', 'L3', 'R1', 'L3', 'R3', 'R3', 'R3', 'L1', 'R3', 'R4', 'L5', 'L3', 'L1', 'L5', 'L4', 'R4', 'R1', 'L4', 'R3', 'R3', 'R5', 'R4', 'R3', 'R3', 'L1', 'L2', 'R1', 'L4', 'L4', 'L3', 'L4', 'L3', 'L5', 'R2', 'R4', 'L2'];
        var sequence = ['L2', 'L1', 'L4', 'R1', 'R6', 'R5', 'R6'];

        this.findEasterBunnyHQ = new app.FindEasterBunnyHQ(sequence);
        this.findEasterBunnyHQ.go();
        var minBlocks = this.findEasterBunnyHQ.minimumBlocksAway;
        var position = this.findEasterBunnyHQ.position;
        this.viewController = new app.ViewController(sequence, position, minBlocks);
    }

    var easterBunnyHQ = new WebApp();

    /**
     * Kick off web app
     */
    function run() {
        easterBunnyHQ.viewController.render();
    }

    run();

})(window);




