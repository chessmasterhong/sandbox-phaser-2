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
            this.game.load.image('mountain_landscape_23', 'media/tilesets/mountain_landscape_23.png');

            this.game.load.tilemap('demo_map', 'lib/game/maps/demo.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image('MainPlayer', 'media/sprites/players/player.png');
        },

        create: function() {
            this.KEY.UP = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.KEY.DOWN = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            this.KEY.LEFT = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.KEY.RIGHT = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

            var map = this.game.add.tilemap('demo_map');
            map.addTilesetImage('mountain_landscape_23', 'mountain_landscape_23');
            var layer = map.createLayer('ground');
            layer.resizeWorld();

            this.player = this.game.add.sprite(64, 64, 'MainPlayer');

            this.game.physics.arcade.enable(this.player, Phaser.Physics.ARCADE);

            this.game.camera.follow(this.player);
        },

        update: function() {
            if(this.KEY.UP.isDown) {
                if(this.KEY.LEFT.isDown) { // Up + Left
                    this.player.body.velocity.x = -this.speed / Math.sqrt(2);
                    this.player.body.velocity.y = -this.speed / Math.sqrt(2);
                } else if(this.KEY.RIGHT.isDown) { // Up + Right
                    this.player.body.velocity.x = this.speed / Math.sqrt(2);
                    this.player.body.velocity.y = -this.speed / Math.sqrt(2);
                } else { // Up
                    this.player.body.velocity.x = 0;
                    this.player.body.velocity.y = -this.speed;
                }
            } else if(this.KEY.DOWN.isDown) {
                if(this.KEY.LEFT.isDown) { // Down + Left
                    this.player.body.velocity.x = -this.speed / Math.sqrt(2);
                    this.player.body.velocity.y = this.speed / Math.sqrt(2);
                } else if(this.KEY.RIGHT.isDown) { // Down + Right
                    this.player.body.velocity.x = this.speed / Math.sqrt(2);
                    this.player.body.velocity.y = this.speed / Math.sqrt(2);
                } else { // Down
                    this.player.body.velocity.x = 0;
                    this.player.body.velocity.y = this.speed;
                }
            } else if(this.KEY.LEFT.isDown) { // Left
                this.player.body.velocity.x = -this.speed;
                this.player.body.velocity.y = 0;
            } else if(this.KEY.RIGHT.isDown) { // Right
                this.player.body.velocity.x = this.speed;
                this.player.body.velocity.y = 0;
            } else {
                this.player.body.velocity.x = 0;
                this.player.body.velocity.y = 0;
            }

            if(Game.input.mousePointer.isDown) {
                Game.physics.arcade.moveToPointer(this.player, this.speed);

                if(Phaser.Rectangle.contains(this.player.body, Game.input.x, Game.input.y)) {
                    this.player.body.velocity.setTo(0, 0);
                }
            } else {
                this.player.body.velocity.setTo(0, 0);
            }
        }
    };

    return Main;
});
