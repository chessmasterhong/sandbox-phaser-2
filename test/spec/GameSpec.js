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

            it('should have width of 640 pixels', function() {
                expect(Game.width).to.equal(640);
            });

            it('should have height of 480 pixels', function() {
                expect(Game.height).to.equal(480);
            });
        });
    });
}());
