define([
    'Phaser'
], function() {
    'use strict';

    Phaser.Plugin.ScreenFader = function(game, parent) {
        Phaser.Plugin.call(this, game, parent);
        //console.log('ScreenFader plugin loaded');
    };

    Phaser.Plugin.ScreenFader.prototype = Object.create(Phaser.Plugin.prototype);
    Phaser.Plugin.ScreenFader.prototype.constructor = Phaser.Plugin.ScreenFader;

    Phaser.Plugin.ScreenFader.prototype.fadeIn = function(sourceGame) {
        var fader = sourceGame.add.graphics(0, 0);
        fader.beginFill('rgb(0, 0, 0)', 1);
        fader.drawRect(0, 0, sourceGame.width, sourceGame.height);
        fader.alpha = 1;
        fader.endFill();

        var tween = sourceGame.add.tween(fader);
        tween.to({ alpha: 0 });
        tween.start();
    };

    Phaser.Plugin.ScreenFader.prototype.fadeOut = function(targetGame, targetNextState, sourceGame, sourceNextState) {
        var fader = sourceGame.add.graphics(0, 0);
        fader.beginFill('rgb(0, 0, 0)', 1);
        fader.drawRect(0, 0, sourceGame.width, sourceGame.height);
        fader.alpha = 0;
        fader.endFill();

        var tween = sourceGame.add.tween(fader);
        tween.to({ alpha: 1 });
        if(targetNextState) {
            tween.onComplete.add(function() {
                sourceGame.state.start(sourceNextState);
                targetGame.state.start(targetNextState);
            }, this);
        }
        tween.start();
    };
});
