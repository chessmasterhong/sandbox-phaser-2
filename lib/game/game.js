/* global requirejs */

(function() {
    'use strict';

    requirejs.config({
        baseUrl: '../lib/',
        paths: {
            Phaser: './phaser/build/phaser',

            Boot: './game/states/boot',
            Main: './game/states/main',
            Preloader: './game/states/preloader',
            Title: './game/states/title',

            Sample: './game/plugins/SamplePlugin',
            ScreenFader: './game/plugins/ScreenFader'
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
        'Preloader',
        'Title',
        'ScreenFader'
    ], function() {
        var Phaser = require('Phaser'),
            Boot = require('Boot'),
            Main = require('Main'),
            Preloader = require('Preloader'),
            Title = require('Title');

        var Game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas');

        Game.state.add('Boot', Boot);
        Game.state.add('Main', Main);
        Game.state.add('Preloader', Preloader);
        Game.state.add('Title', Title);

        Game.state.start('Boot');

        window.Game = Game || {};

        return Game;
    });
})();
