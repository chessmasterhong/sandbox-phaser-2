define([
    'Phaser'
], function() {
    'use strict';

    function MainPlayer(game, x, y) {
        Phaser.Sprite.call(this, game, x, y, 'MainPlayer');
    }

    MainPlayer.prototype = Object.create(Phaser.Sprite.prototype);
    MainPlayer.prototype.constructor = MainPlayer;

    MainPlayer.prototype.collide = function() {
        console.log(1)
    }

    return MainPlayer;
});
