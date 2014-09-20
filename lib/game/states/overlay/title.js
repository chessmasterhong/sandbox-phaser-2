define(function() {
    'use strict';

    function TitleOverlay() {
        this.ScreenFader = null;

        this.riset = {
            state: 0,
            timer: 0
        };

        this.background = {
            sprite: null,
            r: 255,
            g: 255,
            b: 255
        };

        this.midground = {
            sprite: null
        };

        this.foreground = {
            sprite: null,
            r: 255,
            g: 255,
            b: 255
        };
    }

    TitleOverlay.prototype = {
        preload: function() {
            GameOverlay.load.image('titleForeground', 'media/backgrounds/d20_by_olracadejup-d4ohdvm.png');
            GameOverlay.load.image('titleMidground', 'media/backgrounds/BackdropBlackLittleSparkTransparent.png');
        },

        create: function() {
            this.ScreenFader = GameOverlay.plugins.add(Phaser.Plugin.ScreenFader);

            var titleBackground = GameOverlay.add.bitmapData(GameOverlay.width, GameOverlay.height);
            var gradient = titleBackground.context.createLinearGradient(0, 0, 0, GameOverlay.height);
            gradient.addColorStop(0, 'rgb(9, 20, 158)');
            gradient.addColorStop(0.6, 'rgb(106, 179, 234)');
            titleBackground.context.fillStyle = gradient;
            titleBackground.context.fillRect(0, 0, GameOverlay.width, GameOverlay.height);

            this.background.sprite = GameOverlay.add.sprite(0, 0, titleBackground);
            this.midground.sprite = GameOverlay.add.sprite(0, 0, 'titleMidground');
            this.foreground.sprite = GameOverlay.add.sprite(0, 0, 'titleForeground');

            this.midground.sprite.alpha = 0;

            this.ScreenFader.fadeIn(Game);

            GameOverlay.input.onDown.add(function() {
                this.ScreenFader.fadeOut(Game, 'Main', GameOverlay, 'Standby');
            }, this);

            //GameOverlay.add.text(
            //    GameOverlay.width - 140,
            //    GameOverlay.height - 40,
            //    'Click to continue',
            //    {
            //        font: '14px Arial',
            //        fill: 'rgb(255, 255, 255)',
            //        stroke: 'rgb(180, 180, 180)',
            //        strokeThickness: 2,
            //        shadowBlur: 2,
            //        shadowColor: 'rgba(0, 0, 0, 0.4)',
            //        shadowOffsetX: 1,
            //        shadowOffsetY: 1
            //    }
            //);
        },

        update: function() {
            this.background.sprite.tint = '0x' + Math.floor(this.background.r).toString(16) + Math.floor(this.background.g).toString(16) + Math.floor(this.background.b).toString(16);
            this.foreground.sprite.tint = '0x' + Math.floor(this.foreground.r).toString(16) + Math.floor(this.foreground.g).toString(16) + Math.floor(this.foreground.b).toString(16);

            if(this.riset.state === 0) { // Day/Night
                this.riset.timer++;
                if(this.riset.timer > 2000) {
                    if(this.background.r > 128) {
                        this.riset.state = 1;
                    } else {
                        this.riset.state = 2;
                    }
                    this.riset.timer = 0;
                }
            } else if(this.riset.state === 1) { // Sunset
                if(this.background.g > 96) {
                    this.background.g = (this.background.g - 0.2) % 255;
                    this.background.b = (this.background.b - 0.2) % 255;
                } else if(this.background.r > 96) {
                    this.background.r = (this.background.r - 0.2) % 255;
                } else if(this.background.g > 64) {
                    this.background.r = (this.background.r - 0.1) % 255;
                    this.background.g = (this.background.g - 0.1) % 255;
                    this.background.b = (this.background.b - 0.1) % 255;
                } else {
                    this.riset.state = 0;
                }

                if(this.background.r < 128) {
                    this.midground.sprite.alpha = (64 / this.background.r - 0.5) * 2;
                }

                if(this.foreground.g > 176) {
                    this.foreground.g = (this.foreground.g - 0.1) % 255;
                    this.foreground.b = (this.foreground.b - 0.1) % 255;
                } else if(this.foreground.r > 176) {
                    this.foreground.r = (this.foreground.r - 0.1) % 255;
                } else if(this.foreground.g > 128) {
                    this.foreground.r = (this.foreground.r - 0.1) % 255;
                    this.foreground.g = (this.foreground.g - 0.1) % 255;
                    this.foreground.b = (this.foreground.b - 0.1) % 255;
                }
            } else if(this.riset.state === 2) { // Sunrise
                if(this.background.r < 96) {
                    this.background.r = (this.background.r + 0.1) % 255;
                    this.background.g = (this.background.g + 0.1) % 255;
                    this.background.b = (this.background.b + 0.1) % 255;
                } else if(this.background.r < 254) {
                    this.background.r = (this.background.r + 0.2) % 255;
                } else if(this.background.g < 254) {
                    this.background.g = (this.background.g + 0.2) % 255;
                    this.background.b = (this.background.b + 0.2) % 255;
                } else {
                    this.riset.state = 0;
                }

                if(this.background.r < 128) {
                    this.midground.sprite.alpha = (64 / this.background.r - 0.5) * 2;
                }

                if(this.foreground.r < 176) {
                    this.foreground.r = (this.foreground.r + 0.1) % 255;
                    this.foreground.g = (this.foreground.g + 0.1) % 255;
                    this.foreground.b = (this.foreground.b + 0.1) % 255;
                } else if(this.foreground.r < 254) {
                    this.foreground.r = (this.foreground.r + 0.1) % 255;
                } else if(this.foreground.g < 254) {
                    this.foreground.g = (this.foreground.g + 0.1) % 255;
                    this.foreground.b = (this.foreground.b + 0.1) % 255;
                }
            }
        }
    };

    return TitleOverlay;
});
