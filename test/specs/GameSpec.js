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

            it('should be in the Title game state', function(done) {
                waitFor(function() {
                    return Game.state.current !== 'Preloader';
                }, function() {
                    expect(Game.state.current).to.equal('Title');
                    done();
                });
            });
        });

        describe('Input controls', function() {
            it('should have directional keybindings assigned', function() {
                expect(Game.KEY).to.have.property('UP');
                expect(Game.KEY.UP.keyCode).to.equal(38); // Up arrow

                expect(Game.KEY).to.have.property('DOWN');
                expect(Game.KEY.DOWN.keyCode).to.equal(40); // Down arrow

                expect(Game.KEY).to.have.property('LEFT');
                expect(Game.KEY.LEFT.keyCode).to.equal(37); // Left arrow

                expect(Game.KEY).to.have.property('RIGHT');
                expect(Game.KEY.RIGHT.keyCode).to.equal(39); // Right arrow
            });
        });
    });
}());
