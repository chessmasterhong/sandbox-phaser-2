define([
    'Phaser'
], function() {
    'use strict';

    function Teleporter(game, x, y) {
        Phaser.Sprite.call(this, game, x, y);
    }

    Teleporter.prototype = Object.create(Phaser.Sprite.prototype);
    Teleporter.prototype.constructor = Teleporter;

    Teleporter.prototype.update = function() {};

    return Teleporter;
});
