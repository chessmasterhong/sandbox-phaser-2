define(function() {
    'use strict';

    function Boot() {}

    Boot.prototype = {
        create: function() {
            Game.input.maxPointers = 1;

            Game.stage.disableVisibilityChange = true;

            Game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            Game.scale.setMinMax(320, 240, 800, 600);
            Game.scale.pageAlignHorizontally = true;
            Game.scale.pageAlignVertically = true;
            Game.scale.setScreenSize(true);
            Game.scale.refresh();

            Game.state.start('Preloader');
        }
    };

    return Boot;
});
