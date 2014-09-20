define([
    'game/entities/players/main_player',
    'game/entities/triggers/teleporter'
], function(MainPlayer, Teleporter) {
    'use strict';

    function Main() {
        this.map = {
            tilemap: null,
            layers: {
                collision: null,
                overhead: null,
                eventObject: null,
                groundDetail: null,
                ground: null
            }
        };

        this.camera = null;
        this.player = null;
        this.speed = 128;
    }

    Main.prototype = {
        preload: function() {
            Game.load.tilemap('demo', 'lib/game/maps/demo.json', null, Phaser.Tilemap.TILED_JSON);
            Game.load.tilemap('cave', 'lib/game/maps/cave.json', null, Phaser.Tilemap.TILED_JSON);

            Game.load.image('mountain_landscape_23', 'media/tilesets/mountain_landscape_23.png');

            Game.load.image('MainPlayer', 'media/sprites/players/player.png');
        },

        create: function() {
            this.map.tilemap = Game.add.tilemap('demo');

            this.map.tilemap.addTilesetImage('mountain_landscape_23', 'mountain_landscape_23');

            this.map.layers.ground = this.map.tilemap.createLayer('Ground Layer');
            this.map.layers.groundDetail = this.map.tilemap.createLayer('Ground Detail Layer');
            this.map.layers.eventObject = this.map.tilemap.createLayer('Object Layer');
            this.map.layers.overhead = this.map.tilemap.createLayer('Overhead Layer');
            this.map.layers.collision = this.map.tilemap.createLayer('Collision Layer');

            this.map.layers.groundDetail.resizeWorld();
            this.map.layers.ground.resizeWorld();
            this.map.layers.eventObject.resizeWorld();
            this.map.layers.overhead.resizeWorld();
            this.map.layers.collision.resizeWorld();

            this.map.tilemap.setCollision(257, true, this.map.layers.collision);

            this.map.layers.collision.debug = true;

            this.player = new MainPlayer(Game, 288, 288);
            Game.add.existing(this.player);

            this.teleporter = new Teleporter(Game, 288, 288);
            Game.add.existing(this.teleporter);

            Game.physics.arcade.enable(this.player, Phaser.Physics.ARCADE);

            Game.camera.follow(this.player);

            this.teleporters = this.createEventObjects('teleporter');
        },

        update: function() {
            Game.physics.arcade.collide(this.player, this.map.layers.collision, this.player.collide);
            Game.physics.arcade.overlap(this.player, this.teleporters, this.teleporter.moveTo, null, this);

            if(Game.input.mousePointer.isDown && Game.input.mouse.button === Phaser.Mouse.LEFT_BUTTON) { // Left mouse click
                Game.physics.arcade.moveToPointer(this.player, this.speed);
                if(Phaser.Rectangle.contains(this.player.body, Game.input.x, Game.input.y)) {
                    this.player.body.velocity.setTo(0, 0);
                }
            } else if(Game.KEY.UP.isDown) {
                if(Game.KEY.LEFT.isDown) { // Up + Left
                    this.player.body.velocity.setTo(-this.speed / Math.sqrt(2), -this.speed / Math.sqrt(2));
                } else if(Game.KEY.RIGHT.isDown) { // Up + Right
                    this.player.body.velocity.setTo(this.speed / Math.sqrt(2), -this.speed / Math.sqrt(2));
                } else { // Up
                    this.player.body.velocity.setTo(0, -this.speed);
                }
            } else if(Game.KEY.DOWN.isDown) {
                if(Game.KEY.LEFT.isDown) { // Down + Left
                    this.player.body.velocity.setTo(-this.speed / Math.sqrt(2), this.speed / Math.sqrt(2));
                } else if(Game.KEY.RIGHT.isDown) { // Down + Right
                    this.player.body.velocity.setTo(this.speed / Math.sqrt(2), this.speed / Math.sqrt(2));
                } else { // Down
                    this.player.body.velocity.setTo(0, this.speed);
                }
            } else if(Game.KEY.LEFT.isDown) { // Left
                this.player.body.velocity.setTo(-this.speed, 0);
            } else if(Game.KEY.RIGHT.isDown) { // Right
                this.player.body.velocity.setTo(this.speed, 0);
            } else {
                this.player.body.velocity.setTo(0, 0);
            }
        },

        createEventObjects: function(entityType) {
            var group = Game.add.group();
            group.enableBody = true;

            var objects = [];
            this.map.tilemap.objects['Event Object Layer'].forEach(function(element) {
                if(element.properties.type === entityType) {
                    element.y -= this.map.tilemap.tileHeight;
                    objects.push(element);
                }
            }, this);

            objects.forEach(function(element) {
                var sprite = group.create(element.x, element.y, element.properties.sprite);
                Object.keys(element.properties).forEach(function(key) {
                    sprite[key] = element.properties[key];
                });
            }, this);

            return group;
        }
    };

    return Main;
});
