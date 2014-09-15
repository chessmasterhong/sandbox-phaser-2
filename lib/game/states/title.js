define(function() {
    'use strict';

    function Title() {}

    Title.prototype = {
        create: function() {
            var titleBackground = this.game.add.bitmapData(800, 600);
            var gradient = titleBackground.context.createLinearGradient(0, 0, 0, 600);
            gradient.addColorStop(0, 'rgb(9, 20, 158)');
            gradient.addColorStop(1, 'rgb(106, 179, 234)');
            titleBackground.context.fillStyle = gradient;
            titleBackground.context.fillRect(0, 0, 800, 600);

            this.game.add.sprite(0, 0, titleBackground);
            this.game.add.sprite(0, 0, 'titleForeground');
        },

        update: function() {},
    };

    return Title;
});
