/* global requirejs */

'use strict';

requirejs.config({
    baseUrl: '../lib/',
    paths: {
        Phaser: './phaser/build/phaser',

        Boot: './game/states/boot',
        Main: './game/states/main',
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
    'Main',
    'Preloader'
], function(require) {
    var Phaser = require('Phaser'),
        Boot = require('Boot'),
        Main = require('Main'),
        Preloader = require('Preloader');

    var Game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas');

    Game.state.add('Boot', Boot);
    Game.state.add('Main', Main);
    Game.state.add('Preloader', Preloader);

    Game.state.start('Boot');

    window.Game = Game || {};

    return Game;
});
