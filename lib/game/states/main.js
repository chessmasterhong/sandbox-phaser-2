define(function() {
    'use strict';

    function Main() {}

    Main.prototype = {
        create: function() {
            console.log('Main');
        },

        update: function() {}
    };

    return Main;
});
