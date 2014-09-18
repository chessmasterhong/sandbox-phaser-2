/* jshint expr: true */
/* global before, describe, expect, it, waitFor */

(function() {
    'use strict';

    describe('Game', function() {
        before(function(done) {
            waitFor(function() {
                return Game;
            }, function() {
                done();
            });
        });

        describe('Initialization', function() {
            it('should load the game object', function() {
                expect(Game.isBooted).to.be.true;
            });
        });
    });
}());
