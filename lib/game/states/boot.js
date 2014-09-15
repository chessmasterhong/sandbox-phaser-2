define(function() {
    'use strict';

    function Boot() {}

    Boot.prototype = {
        init: function() {
            this.game.input.maxPointers = 1;

            this.game.stage.disableVisibilityChange = true;

            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.setMinMax(480, 260, 1024, 768);
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.setScreenSize(true);
            this.game.scale.refresh();
        },

        preload: function() {},

        create: function() {
            this.game.state.start('Preloader');
        }
    };

    return Boot;
});
