define(function() {
    'use strict';

    function Title() {
        this.background = {
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

            this.s = Game.add.sprite(0, 0, titleBackground);
            Game.add.sprite(0, 0, 'titleForeground');
        },

        update: function() {
            this.s.tint = '0x' + ((1 << 24) + (Math.floor(this.background.r) << 16) + (Math.floor(this.background.g) << 8) + Math.floor(this.background.b)).toString(16).slice(1);
            if(this.background.g > 60) {
                this.background.g = (this.background.g - 0.1) % 255;
                this.background.b = (this.background.b - 0.1) % 255;
            } else {
                this.background.r = (this.background.r - 0.1) % 255;
            }
        },

        render: function() {
            //Game.debug.text(Game.time.fps || '--', 5, 15, '#00ff00');
        }
    };

    return Title;
});
