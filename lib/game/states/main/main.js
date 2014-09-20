define([
    'game/entities/players/main_player'
], function(MainPlayer) {
    'use strict';

    function Main() {
        this.tilemap = {
            collisionLayer: null,
            overheadLayer: null,
            objectLayer: null,
            groundDetailLayer: null,
            groundLayer: null
        };

        this.camera = null;
        this.player = null;
        this.speed = 128;
    }

    Main.prototype = {
        preload: function() {
            Game.load.tilemap('demo_map', 'lib/game/maps/demo.json', null, Phaser.Tilemap.TILED_JSON);

            Game.load.image('mountain_landscape_23', 'media/tilesets/mountain_landscape_23.png');

            Game.load.image('MainPlayer', 'media/sprites/players/player.png');
        },

        create: function() {
            this.map = Game.add.tilemap('demo_map');

            this.map.addTilesetImage('mountain_landscape_23', 'mountain_landscape_23');

            this.tilemap.groundLayer = this.map.createLayer('Ground Layer');
            this.tilemap.groundDetailLayer = this.map.createLayer('Ground Detail Layer');
            this.tilemap.objectLayer = this.map.createLayer('Object Layer');
            this.tilemap.overheadLayer = this.map.createLayer('Overhead Layer');
            this.tilemap.collisionLayer = this.map.createLayer('Collision Layer');

            this.tilemap.groundDetailLayer.resizeWorld();
            this.tilemap.groundLayer.resizeWorld();
            this.tilemap.objectLayer.resizeWorld();
            this.tilemap.overheadLayer.resizeWorld();
            this.tilemap.collisionLayer.resizeWorld();

            this.map.setCollision(257, true, this.tilemap.collisionLayer);

            this.tilemap.collisionLayer.debug = true;

            this.player = new MainPlayer(Game, 288, 288);
            Game.add.existing(this.player);

            Game.physics.arcade.enable(this.player, Phaser.Physics.ARCADE);

            Game.camera.follow(this.player);

            this.teleporters = this.createEntities('teleporter');
        },

        update: function() {
            Game.physics.arcade.collide(this.player, this.tilemap.collisionLayer, this.player.collide);
            Game.physics.arcade.overlap(this.player, this.teleporters, this.enterTeleporter, null, this)

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

        createEntities: function(entityType) {
            var entitiesGroup = Game.add.group();
            entitiesGroup.enableBody = true;

            var entities = [];
            this.map.objects['Events Layer'].forEach(function(element) {
                if(element.properties.type === entityType) {
                    element.y -= this.map.tileHeight;
                    entities.push(element);
                }
            }, this);

            entities.forEach(function(element) {
                var sprite = entitiesGroup.create(element.x, element.y, element.properties.sprite);
                Object.keys(element.properties).forEach(function(key) {
                    sprite[key] = element.properties.key;
                });
            }, this);
            return entitiesGroup;
        },

        enterTeleporter: function() {
            console.log('entering door');
        }
    };

    return Main;
});
