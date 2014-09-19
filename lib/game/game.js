(function() {
    'use strict';

    require.config({
        baseUrl: './lib/',
        paths: {
            Phaser: 'phaser/build/phaser',

            Boot: 'game/states/boot',
            BootOverlay: 'game/states/boot_overlay',
            Main: 'game/states/main',
            Preloader: 'game/states/preloader',
            TitleOverlay: 'game/states/title_overlay',
            Standby: 'game/states/standby',

            ScreenFader: 'game/plugins/ScreenFader'
        }
    });

    require([
        'require',
        'Phaser',
        'Boot',
        'BootOverlay',
        'Main',
        'Preloader',
        'TitleOverlay',
        'Standby',
        'ScreenFader'
    ], function() {
        var Phaser = require('Phaser'),
            Boot = require('Boot'),
            BootOverlay = require('BootOverlay'),
            Main = require('Main'),
            Preloader = require('Preloader'),
            TitleOverlay = require('TitleOverlay'),
            Standby = require('Standby');

        var GameOverlay = new Phaser.Game(640, 480, Phaser.WEBGL, 'canvasOverlay', null, true);
        var Game = new Phaser.Game(640, 480, Phaser.CANVAS, 'canvas');

        GameOverlay.state.add('BootOverlay', BootOverlay);
        GameOverlay.state.add('Standby', Standby);
        GameOverlay.state.add('TitleOverlay', TitleOverlay);

        Game.state.add('Boot', Boot);
        Game.state.add('Main', Main);

        GameOverlay.state.start('BootOverlay');
        Game.state.start('Boot');

        window.GameOverlay = GameOverlay || {};
        window.Game = Game || {};

        return Game;
    });
})();
