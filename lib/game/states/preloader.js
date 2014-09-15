define(function() {
    'use strict';

    function Preloader() {
        this.ready = false;
    }

    Preloader.prototype = {
        preload: function() {
            this.game.load.onLoadComplete.addOnce(this.onLoadComplete, this);

            this.game.load.image('titleForeground', 'media/backgrounds/d20_by_olracadejup-d4ohdvm.png');
        },

        create: function() {},

        update: function() {
            if(this.ready) {
                this.game.state.start('Title');
            }
        },

        onLoadComplete: function() {
            this.ready = true;
        }
    };

    return Preloader;
});
