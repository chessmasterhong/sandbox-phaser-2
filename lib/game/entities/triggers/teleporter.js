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

        state.map.layers.ground.destroy();
        state.map.layers.groundDetail.destroy();
        state.map.layers.eventObject.destroy();
        state.map.layers.overhead.destroy();
        state.map.layers.collision.destroy();

        state.map.tilemap = Game.add.tilemap(teleporter.destMap);

        state.map.tilemap.addTilesetImage('mountain_landscape_23', 'mountain_landscape_23');

        state.map.layers.ground = state.map.tilemap.createLayer('Ground Layer');
        state.map.layers.groundDetail = state.map.tilemap.createLayer('Ground Detail Layer');
        state.map.layers.eventObject = state.map.tilemap.createLayer('Object Layer');
        state.map.layers.overhead = state.map.tilemap.createLayer('Overhead Layer');
        state.map.layers.collision = state.map.tilemap.createLayer('Collision Layer');

        state.map.layers.groundDetail.resizeWorld();
        state.map.layers.ground.resizeWorld();
        state.map.layers.eventObject.resizeWorld();
        state.map.layers.overhead.resizeWorld();
        state.map.layers.collision.resizeWorld();

        //state.map.tilemap.setCollision(257, true, state.map.layers.collision);

        state.map.layers.collision.debug = true;

        state.player = new MainPlayer(Game, teleporter.destX, teleporter.destY);
        Game.add.existing(state.player);

        Game.physics.arcade.enable(state.player, Phaser.Physics.ARCADE);

        Game.camera.follow(state.player);
    };

    return Teleporter;
});
