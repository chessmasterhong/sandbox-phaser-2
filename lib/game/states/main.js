define(function() {
    'use strict';

    function Main() {}

    Main.prototype = {
        create: function() {
            this.add.sprite(0, 0, 'img');
        },

        update: function() {},
    };

    return Main;
});
