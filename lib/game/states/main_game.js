define(function() {
    'use strict';

    function MainGame() {}

    MainGame.prototype = {
        create: function() {
            this.add.sprite(0, 0, 'img');
        },

        update: function() {},
    };

    return MainGame;
});
