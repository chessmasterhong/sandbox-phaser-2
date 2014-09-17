define([
    'Phaser'
], function() {
    'use strict';

    Phaser.Plugin.SamplePlugin = function(game, parent) {
        Phaser.Plugin.call(this, game, parent);
        console.log('SamplePlugin loaded');
    };

    Phaser.Plugin.SamplePlugin.prototype = Object.create(Phaser.Plugin.prototype);
    Phaser.Plugin.SamplePlugin.prototype.constructor = Phaser.Plugin.SamplePlugin;

    //Phaser.Plugin.SamplePlugin.prototype.update = function() {};
});
