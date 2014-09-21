define([
    'game/entities/players/main_player',
    'Phaser'
], function(MainPlayer) {
    'use strict';

    function Teleporter(game, x, y) {
        Phaser.Sprite.call(this, game, x, y);
    }

    Teleporter.prototype = Object.create(Phaser.Sprite.prototype);
    Teleporter.prototype.constructor = Teleporter;

    Teleporter.prototype.update = function() {};

    Teleporter.prototype.moveTo = function(entity, teleporter) {
        console.log('Moving ' + entity.key + ' to ' + teleporter.destMap + ' (' + teleporter.destX + ', ' + teleporter.destY + ')');

        var state = Game.state.states[Game.state.current];

        state.loadMap(teleporter.destMap, teleporter.destX, teleporter.destY);
    };

    return Teleporter;
});
