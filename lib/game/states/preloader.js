define(function() {
    'use strict';

    function Preloader() {
        this.ready = false;
    }

    Preloader.prototype = {
        preload: function() {
            Game.load.onLoadComplete.addOnce(this.onLoadComplete, this);

            Game.load.bitmapFont('04b03', 'media/interface/fonts/04b03.font.png', 'media/interface/fonts/04b03.font.xml');

            Game.load.image('titleForeground', 'media/backgrounds/d20_by_olracadejup-d4ohdvm.png');
            Game.load.image('titleMidground', 'media/backgrounds/BackdropBlackLittleSparkTransparent.png');
        },

        create: function() {},

        update: function() {
            if(this.ready) {
                Game.state.start('Title');
            }
        },

        onLoadComplete: function() {
            this.ready = true;
        }
    };

    return Preloader;
});
