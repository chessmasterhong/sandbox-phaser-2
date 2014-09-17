define(function() {
    'use strict';

    function Main() {
        this.KEY = {};
        this.camera = null;
        this.player = null;
        this.speed = 128;
    }

    Main.prototype = {
        preload: function() {
            Game.load.tilemap('demo_map', 'lib/game/maps/demo2.json', null, Phaser.Tilemap.TILED_JSON);

            Game.load.image('mountain_landscape_23', 'media/tilesets/mountain_landscape_23.png');

            Game.load.image('MainPlayer', 'media/sprites/players/player.png');
        },

        create: function() {
            this.KEY.UP = Game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.KEY.DOWN = Game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            this.KEY.LEFT = Game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.KEY.RIGHT = Game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

            var map = Game.add.tilemap('demo_map');

            map.addTilesetImage('mountain_landscape_23', 'mountain_landscape_23');

            var layer = map.createLayer('ground');
            this.collision = map.createLayer('collision');

            this.collision.debug = true;

            layer.resizeWorld();
            this.collision.resizeWorld();

            map.setCollision(257, true, this.collision);

            this.player = Game.add.sprite(64, 64, 'MainPlayer');

            Game.physics.arcade.enable(this.player, Phaser.Physics.ARCADE);

            Game.camera.follow(this.player);
        },

        update: function() {
            Game.physics.arcade.collide(this.player, this.collision);

            if(Game.input.mousePointer.isDown) {
                Game.physics.arcade.moveToPointer(this.player, this.speed);
                if(Phaser.Rectangle.contains(this.player.body, Game.input.x, Game.input.y)) {
                    this.player.body.velocity.setTo(0, 0);
                }
            } else if(this.KEY.UP.isDown) {
                if(this.KEY.LEFT.isDown) { // Up + Left
                    this.player.body.velocity.setTo(-this.speed / Math.sqrt(2), -this.speed / Math.sqrt(2));
                } else if(this.KEY.RIGHT.isDown) { // Up + Right
                    this.player.body.velocity.setTo(this.speed / Math.sqrt(2), -this.speed / Math.sqrt(2));
                } else { // Up
                    this.player.body.velocity.setTo(0, -this.speed);
                }
            } else if(this.KEY.DOWN.isDown) {
                if(this.KEY.LEFT.isDown) { // Down + Left
                    this.player.body.velocity.setTo(-this.speed / Math.sqrt(2), this.speed / Math.sqrt(2));
                } else if(this.KEY.RIGHT.isDown) { // Down + Right
                    this.player.body.velocity.setTo(this.speed / Math.sqrt(2), this.speed / Math.sqrt(2));
                } else { // Down
                    this.player.body.velocity.setTo(0, this.speed);
                }
            } else if(this.KEY.LEFT.isDown) { // Left
                this.player.body.velocity.setTo(-this.speed, 0);
            } else if(this.KEY.RIGHT.isDown) { // Right
                this.player.body.velocity.setTo(this.speed, 0);
            } else {
                this.player.body.velocity.setTo(0, 0);
            }
        }
    };

    return Main;
});
