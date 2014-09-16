define(function() {
    'use strict';

    function Title() {
        this.riset = 0;

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

    Title.prototype = {
        create: function() {
            var titleBackground = Game.add.bitmapData(800, 600);
            var gradient = titleBackground.context.createLinearGradient(0, 0, 0, 600);
            gradient.addColorStop(0, 'rgb(9, 20, 158)');
            gradient.addColorStop(0.6, 'rgb(106, 179, 234)');
            titleBackground.context.fillStyle = gradient;
            titleBackground.context.fillRect(0, 0, 800, 600);

            this.background.sprite = Game.add.sprite(0, 0, titleBackground);
            this.midground.sprite = Game.add.sprite(0, 0, 'titleMidground');
            this.foreground.sprite = Game.add.sprite(0, 0, 'titleForeground');

            this.midground.sprite.alpha = 0;

            //var text = Game.add.bitmapText(0, 100, '04b03', 'Mishmash of RPGs', 48);
            //text.position.x = Game.world.width / 2 - text.width / 2;
        },

        update: function() {
            this.background.sprite.tint = '0x' + Math.floor(this.background.r).toString(16) + Math.floor(this.background.g).toString(16) + Math.floor(this.background.b).toString(16);
            this.foreground.sprite.tint = '0x' + Math.floor(this.foreground.r).toString(16) + Math.floor(this.foreground.g).toString(16) + Math.floor(this.foreground.b).toString(16);

            if(this.riset === 0) {
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
                    this.riset = 1;
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
            } else if(this.riset === 1) {
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
                    this.riset = 0;
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

    return Title;
});
