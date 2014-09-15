/* global requirejs */

'use strict';

requirejs.config({
    baseUrl: '../lib/',
    paths: {
        Phaser: './phaser/build/phaser',

        Boot: './game/states/boot',
        MainGame: './game/states/main_game',
        Preloader: './game/states/preloader'
    },

    shim: {
        'Phaser': { exports: 'Phaser' }
    }
});

require([
    'require',
    'Phaser',
    'Boot',
    'MainGame',
    'Preloader'
], function(require) {
    var Phaser = require('Phaser'),
        Boot = require('Boot'),
        MainGame = require('MainGame'),
        Preloader = require('Preloader');

    var Game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas');

    Game.state.add('Boot', Boot);
    Game.state.add('MainGame', MainGame);
    Game.state.add('Preloader', Preloader);

    Game.state.start('Boot');

    return Game;
});
