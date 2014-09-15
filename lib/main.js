'use strict';

requirejs.config({
    baseUrl: './lib/',
    paths: {
        Phaser: './phaser/build/phaser',

        MainGame: './game/states/main_game',
        Preloader: './game/states/preloader'
    },
});

require([
    'require',
    'Phaser',
    'MainGame',
    'Preloader'
], function(require) {
    var Phaser = require('Phaser'),
        MainGame = require('MainGame'),
        Preloader = require('Preloader');

    var Game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas');

    Game.state.add('MainGame', MainGame);
    Game.state.add('Preloader', Preloader);

    Game.state.start('Preloader');

    return Game;
});
