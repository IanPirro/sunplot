define( function ( require ) {

  'use strict';

  //
  // Declarations | load modules
  // -----------------------------------------
  var $                   = require( 'jquery' ),
      chart               = require( 'components/chart' ),
      defaultChartOptions = { city: 'Boston', state: 'MA', year: '2013' };

  //
  // Default chart
  // -----------------------------------------    
  $.post('/getastrologydata', defaultChartOptions , function ( data ) {

    var options = {
      width: 1000,
      height: 750
    };

    chart( data, options );

  });

  //
  // Events
  // -----------------------------------------
  $( '.month' ).on( 'click', function ( e ) {

    var lim = moment( $( this ).data( 'date' ) ).daysInMonth();
    var mnth = moment( $( this ).data( 'date' ) ).month();

    e.preventDefault();

    $.post('/getastrologydata', defaultChartOptions , function ( data ) {

      var options = {
        width: 1000,
        height: 750,
        month: mnth,
        limit: lim
      };

      $( '#chart' ).html('');

      chart( data, options );

    });
  });

}); // End module