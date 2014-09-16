define(function() {
    'use strict';

    function Title() {
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
        preload: function() {
            //Game.time.advancedTiming = true;
        },

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
        },

        update: function() {
            this.background.sprite.tint = '0x' + ((1 << 24) + (Math.floor(this.background.r) << 16) + (Math.floor(this.background.g) << 8) + Math.floor(this.background.b)).toString(16).slice(1);
            if(this.background.g > 96) {
                this.background.g = (this.background.g - 0.2) % 255;
                this.background.b = (this.background.b - 0.2) % 255;
            } else if(this.background.r > 96) {
                this.background.r = (this.background.r - 0.2) % 255;
            } else if(this.background.g > 64) {
                this.background.r = (this.background.r - 0.1) % 255;
                this.background.g = (this.background.g - 0.1) % 255;
                this.background.b = (this.background.b - 0.1) % 255;
            }

            if(this.background.r < 128) {
                this.midground.sprite.alpha = 64 / this.background.r;
            }

            this.foreground.sprite.tint = '0x' + ((1 << 24) + (Math.floor(this.foreground.r) << 16) + (Math.floor(this.foreground.g) << 8) + Math.floor(this.foreground.b)).toString(16).slice(1);
            if(this.foreground.g > 180) {
                this.foreground.g = (this.foreground.g - 0.1) % 255;
                this.foreground.b = (this.foreground.b - 0.1) % 255;
            } else if(this.foreground.r > 180) {
                this.foreground.r = (this.foreground.r - 0.1) % 255;
            } else if(this.foreground.g > 128) {
                this.foreground.r = (this.foreground.r - 0.1) % 255;
                this.foreground.g = (this.foreground.g - 0.1) % 255;
                this.foreground.b = (this.foreground.b - 0.1) % 255;
            }
        },

        render: function() {
            //Game.debug.text(Game.time.fps || '--', 5, 15, '#00ff00');
        }
    };

    return Title;
});
