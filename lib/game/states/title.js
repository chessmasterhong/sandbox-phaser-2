define(function() {
    'use strict';

    function Title() {}

    Title.prototype = {
        create: function() {
            this.add.sprite(0, 0, 'img');
        },

        update: function() {},
    };

    return Title;
});
