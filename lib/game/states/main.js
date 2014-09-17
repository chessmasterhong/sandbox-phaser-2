define(function() {
    'use strict';

    function Main() {}

    Main.prototype = {
        preload: function() {
            this.game.load.image('mountain_landscape_23', 'media/tilesets/mountain_landscape_23.png');

            this.game.load.tilemap('demo_map', 'lib/game/maps/demo.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image('MainPlayer', 'media/sprites/players/player.png');
        },

        create: function() {
            var map = this.game.add.tilemap('demo_map');
            map.addTilesetImage('mountain_landscape_23', 'mountain_landscape_23');
            var layer = map.createLayer('ground');
            layer.resizeWorld();

            this.player = this.game.add.sprite(64, 64, 'MainPlayer');
        },

        update: function() {}
    };

    return Main;
});
