var req = require( 'request' );

module.exports = function ( options, callback ) {
    
    //
    // Form data
    // ------------------------------------------------------------
    var postData = {
        url: 'http://aa.usno.navy.mil/cgi-bin/aa_rstablew.pl',
        form : {
            FFX: 1,
            xxy: options.year || '2013',
            type: 0,
            st: options.state || 'MA',
            place: options.city || 'Boston',
            ZZZ: 'END'
        }
    };

    //
    // POST to site and get the data to parse
    // ------------------------------------------------------------
    req.post( postData, function ( err, response, body ) {
        
        if ( err ) { return callback( err ); }

        // Declarations
        // ---------------------------------------------------------
        var lines       = body.split( '\n' ).slice(17, 48)
          , sunrises    = []
          , sunsets     = []
          , data        = {}
          , months      = (lines[0].match(/\S+/g).length - 1);

        // For each month ( doubled because sunset and sunrise column for each )
        // ---------------------------------------------------------
        for ( var x = 1; x <= months; x += 2 ) {

            // For each line in table parse and pull out sunrise and sunset data
            // ---------------------------------------------------------
            lines.forEach( function ( line, day ) {

                var lineData    = line.match(/\S+/g)
                  , j           = x + 1;

                day = day + 1;

                // Fix feb | null values for 29th and 30th day
                // ---------------------------------------------------------
                if ( lineData.length === 23 ) {
                    lineData = lineData.insertAt( 3 , '' ).insertAt( 4, '' );
                }

                // Fix months < 31 days
                // ---------------------------------------------------------
                if ( lineData.length === 15 ) {
                    lineData = lineData
                                    .insertAt( 3, '' )
                                    .insertAt( 4, '' )
                                    .insertAt( 7, '' )
                                    .insertAt( 8, '' )
                                    .insertAt( 11, '' )
                                    .insertAt( 12, '' )
                                    .insertAt( 17, '' )
                                    .insertAt( 18, '' )
                                    .insertAt( 21, '' )
                                    .insertAt( 22, '' );
                }

                // If value is not null push to respective collection | format to %Y-%d-%mT%H:%M:%S
                // ---------------------------------------------------------
                if ( lineData[ x ] && lineData[ j ] ) {
                    sunrises.push( { 
                        date: postData.form.xxy + '-' + ((day + '').length === 1 ? '0' + day : day) + '-' + ( (((x - 1) / 2) + 1 + '').length === 1 ? '0' + (((x - 1) / 2) + 1) : (((x - 1) / 2) + 1) ) + 'T00:00:00', 
                        time: postData.form.xxy + '-01-01T' + lineData[ x ].slice(0,2) + ':' + lineData[ x ].slice(2) + ':00'
                    });
                    sunsets.push( { 
                        date: postData.form.xxy + '-' + ((day + '').length === 1 ? '0' + day : day) + '-' + (( ((x - 1) / 2) + 1 + '').length === 1 ? '0' + (((x - 1) / 2) + 1) : (((x - 1) / 2) + 1)) + 'T00:00:00', 
                        time: postData.form.xxy + '-01-01T' + lineData[ j ].slice(0,2) + ':' + lineData[ j ].slice(2) + ':00'
                    });
                }
            });
        } 

        // Add sunrise and sunset collections to data object for return
        // ---------------------------------------------------------
        data['sunrises'] = sunrises;
        data['sunsets']  = sunsets;

        // Return the data as a json string
        // ---------------------------------------------------------
        callback( null, JSON.stringify( data ));

    });
};

// Utility method to insert value into array at an index | chainable
// ---------------------------------------------------------
Array.prototype.insertAt = function ( index, value ) {

    var before      = this.slice( 0, index )
      , after       = this.slice( index)
      , tmp         = [];

    before.forEach(function ( val ) { tmp.push(val); });
    tmp.push( value );
    after.forEach(function ( val ) { tmp.push(val); });

    return tmp;
};