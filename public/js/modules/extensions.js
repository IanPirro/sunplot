define( function ( require ) {

    'use strict';

    //
    // This file contains type extensions
    
    Date.prototype.stdTimezoneOffset = function() {
        var jan = new Date(this.getFullYear(), 0, 1);
        var jul = new Date(this.getFullYear(), 6, 1);
        return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    }

    Date.prototype.isDst = function() {
        return this.getTimezoneOffset() < this.stdTimezoneOffset();
    }

});