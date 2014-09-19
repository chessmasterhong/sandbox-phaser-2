define(function() {
    'use strict';

    function Preloader() {
        this.ready = false;
        this.preloadBar = null;
    }

    Preloader.prototype = {
        preload: function() {
            Game.load.onLoadComplete.addOnce(this.onLoadComplete, this);

            this.preloadBar = Game.add.graphics(Game.width / 4, Game.height / 2);
            this.preloadBar.lineStyle(10, 0xffffff, 1);
            this.preloadBar.moveTo(0, 0);
            this.preloadBar.lineTo(Game.width, 0);
            this.preloadBar.scale.x = 0;

            Game.load.bitmapFont('04b03', 'media/interface/fonts/04b03.font.png', 'media/interface/fonts/04b03.font.xml');
        },

        loadUpdate: function() {
            this.preloadBar.scale.x = Game.load.progress * 0.01;
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
