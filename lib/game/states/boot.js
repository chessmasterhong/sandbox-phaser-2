define(function() {
    'use strict';

    function Boot() {}

    Boot.prototype = {
        create: function() {
            Game.input.maxPointers = 1;

            Game.stage.disableVisibilityChange = true;

            Game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            Game.scale.setMinMax(320, 240, 640, 480);
            //Game.scale.pageAlignHorizontally = true;
            //Game.scale.pageAlignVertically = true;
            Game.scale.setScreenSize(true);
            Game.scale.refresh();

            if(typeof Game.KEY === 'undefined') {
                Game.KEY = {};
            }
            Game.KEY.UP = Game.input.keyboard.addKey(Phaser.Keyboard.UP);
            Game.KEY.DOWN = Game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            Game.KEY.LEFT = Game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            Game.KEY.RIGHT = Game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

            //Game.state.start('Main');
        }
    };

    return Boot;
});
