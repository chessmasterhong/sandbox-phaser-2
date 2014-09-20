define([
    'Phaser'
], function() {
    'use strict';

    function EncounterZone(game, x, y) {
        Phaser.Sprite.call(this, game, x, y);
    }

    EncounterZone.prototype = Object.create(Phaser.Sprite.prototype);
    EncounterZone.prototype.constructor = EncounterZone;

    EncounterZone.prototype.update = function() {};

    return EncounterZone;
});
