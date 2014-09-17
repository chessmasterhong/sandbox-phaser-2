define([
    'Phaser'
], function() {
    'use strict';

    Phaser.Plugin.ScreenFader = function(game, parent) {
        Phaser.Plugin.call(this, game, parent);
        console.log('ScreenFader plugin loaded');
    };

    Phaser.Plugin.ScreenFader.prototype = Object.create(Phaser.Plugin.prototype);
    Phaser.Plugin.ScreenFader.prototype.constructor = Phaser.Plugin.ScreenFader;

    Phaser.Plugin.ScreenFader.prototype.fadeIn = function() {
        var fader = Game.add.graphics(0, 0);
        fader.beginFill('rgb(0, 0, 0)', 1);
        fader.drawRect(0, 0, Game.width, Game.height);
        fader.alpha = 1;
        fader.endFill();

        var tween = Game.add.tween(fader);
        tween.to({ alpha: 0 });
        tween.start();
    };

    Phaser.Plugin.ScreenFader.prototype.fadeOut = function() {
        var fader = Game.add.graphics(0, 0);
        fader.beginFill('rgb(0, 0, 0)', 1);
        fader.drawRect(0, 0, Game.width, Game.height);
        fader.alpha = 0;
        fader.endFill();

        var tween = Game.add.tween(fader);
        tween.to({ alpha: 1 });
        tween.onComplete.add(function() {
            Game.state.start('Main');
        }, this);
        tween.start();
    };
});
