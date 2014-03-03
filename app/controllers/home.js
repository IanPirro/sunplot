var sunservice = require('../../modules/sunservice');

exports.index = function(req, res){
    res.render('home/index', {
      title     : 'Graph'
    });
};

exports.getData = function(req, res){

    var options = {
        year    : req.body.year || null,
        state   : req.body.state || null,
        city    : req.body.city || null
    };

    sunservice( options, function ( err, data ) {

        if ( err ) { throw new Error(err); }

        res.json( data );
    });
};