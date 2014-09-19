define(function() {
    'use strict';

    function BootOverlay() {}

    BootOverlay.prototype = {
        create: function() {
            GameOverlay.input.maxPointers = 1;

            GameOverlay.stage.disableVisibilityChange = true;

            GameOverlay.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            GameOverlay.scale.setMinMax(320, 240, 640, 480);
            GameOverlay.scale.setScreenSize(true);
            GameOverlay.scale.refresh();

            GameOverlay.state.start('TitleOverlay');
        }
    };

    return BootOverlay;
});
