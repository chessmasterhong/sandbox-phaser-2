define(function() {
    'use strict';

    function Boot() {}

    Boot.prototype = {
        init: function() {
            Game.input.maxPointers = 1;

            Game.stage.disableVisibilityChange = true;

            Game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            Game.scale.setMinMax(480, 260, 1024, 768);
            Game.scale.pageAlignHorizontally = true;
            Game.scale.pageAlignVertically = true;
            Game.scale.setScreenSize(true);
            Game.scale.refresh();
        },

        preload: function() {},

        create: function() {
            Game.state.start('Preloader');
        }
    };

    return Boot;
});
