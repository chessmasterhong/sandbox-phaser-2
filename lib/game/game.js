(function() {
    'use strict';

    require.config({
        baseUrl: './lib/',
        paths: {
            Phaser: 'phaser/build/phaser',

            Boot: 'game/states/main/boot',
            BootOverlay: 'game/states/overlay/boot',
            Main: 'game/states/main/main',
            //Preloader: 'game/states/preloader',
            Standby: 'game/states/standby',
            TitleOverlay: 'game/states/overlay/title',

            ScreenFader: 'game/plugins/ScreenFader'
        }
    });

    require([
        'require',
        'Phaser',
        'Boot',
        'BootOverlay',
        'Main',
        //'Preloader',
        'Standby',
        'TitleOverlay',
        'ScreenFader'
    ], function() {
        var Phaser = require('Phaser'),
            Boot = require('Boot'),
            BootOverlay = require('BootOverlay'),
            Main = require('Main'),
            //Preloader = require('Preloader'),
            Standby = require('Standby'),
            TitleOverlay = require('TitleOverlay');

        var GameOverlay = new Phaser.Game(640, 480, Phaser.AUTO, 'canvasOverlay', null, true);
        var Game = new Phaser.Game(640, 480, Phaser.CANVAS, 'canvas');

        GameOverlay.state.add('BootOverlay', BootOverlay);
        GameOverlay.state.add('Standby', Standby);
        GameOverlay.state.add('TitleOverlay', TitleOverlay);

        Game.state.add('Boot', Boot);
        Game.state.add('Main', Main);
        Game.state.add('Standby', Standby);

        GameOverlay.state.start('BootOverlay');
        Game.state.start('Boot');

        window.GameOverlay = GameOverlay || {};
        window.Game = Game || {};

        return Game;
    });
})();
