'use strict';

(function (window) {

    /**
     *
     * @param {Array} sequence
     * @param {number} minBlocks
     * @constructor
     */
    function ViewController(sequence, minBlocks) {
        this.sequence = sequence;
        this.minBlocks = minBlocks;
    }

    /**
     * Initiate render of dynamic DOM info
     */
    ViewController.prototype.render = function(){
        console.log('render test data');
        var $input = document.querySelector('.input');
        console.log('$input', $input);
        $input.innerHTML= '[R1, R2, L3]';

    };

    // Export to window
    window.app = window.app || {};
    window.app.ViewController = ViewController;

})(window);


(function () {

    /**
     * Web App tha facilitates computation ond view rendering
     * @constructor
     */
    function WebApp() {
        this.viewController = new app.ViewController();
    }

    var easterBunnyHQ = new WebApp();

    /**
     * Kick off web app
     */
    function run() {
        console.log('run');
        easterBunnyHQ.viewController.render();
    }

    run();
    //TODO  No internet on plane
    // window.onload(run)

})(window);




