define( function ( require ) {

  'use strict';

  //
  // Declarations | load modules
  // -----------------------------------------
  require('components/extensions');

  var $                   = require( 'jquery' ),
      chart               = require( 'components/chart' ),
      defaultChartOptions = { city: 'Boston', state: 'MA', year: '2013' };

  //
  // Default chart
  // -----------------------------------------    
  $.post('/getastrologydata', defaultChartOptions , function ( data ) {

    var options = {
      width: 1000,
      height: 750,
      year: parseInt( defaultChartOptions.year, 10 )
    };

    chart( data, options );

    $( '#chart' ).prepend( $('<h3 id="chart-title"></h3>').html('Sunrises and sunsets for ' + defaultChartOptions.city + ', ' + defaultChartOptions.state + ' in ' + defaultChartOptions.year ));
  });

  //
  // Events
  // -----------------------------------------

  // Month filters
  $( '.month' ).on( 'click', function ( e ) {

    var lim     = moment( $( this ).data( 'date' ) ).daysInMonth(),
        mnth    = moment( $( this ).data( 'date' ) ).month(),
        city    = $( '#city' ).val(),
        state   = $( '#state' ).val(),
        year    = $( '#year' ).val(),
        chartOptions = {};

    e.preventDefault();

    if ( city && state && year ) {
      chartOptions.city = city;
      chartOptions.state = state;
      chartOptions.year = year;
    } else {
      chartOptions = defaultChartOptions;
    }

    $.post('/getastrologydata', chartOptions , function ( data ) {

      var options = {
        width: 1000,
        height: 750,
        month: mnth,
        limit: lim,
        year: parseInt( chartOptions.year, 10 )
      };

      $( '#chart' ).html('');

      chart( data, options );

      $( '#chart' ).prepend( $('<h3 id="chart-title"></h3>').html('Sunrises and sunsets for ' + chartOptions.city + ', ' + chartOptions.state + ' in ' + chartOptions.year ));

    });
  });

  // Form submit
  $( '#submit' ).on(' click ', function ( e ) {

    var city         = $( '#city' ).val(),
        state        = $( '#state' ).val(),
        year         = $( '#year' ).val(),
        chartOptions = {};

    e.preventDefault();

    if ( city && state && year ) {
      chartOptions.city = city;
      chartOptions.state = state;
      chartOptions.year = year;
    } else {
      chartOptions = defaultChartOptions;
    }

    $.post('/getastrologydata', chartOptions , function ( data ) {

      var options = {
        width: 1000,
        height: 750,
        year: parseInt( chartOptions.year, 10 )
      };

      $( '#chart' ).html('');

      chart( data, options );

      $( '#chart' ).prepend( $('<h3 id="chart-title"></h3>').html('Sunrises and sunsets for ' + chartOptions.city + ', ' + chartOptions.state + ' in ' + chartOptions.year ));
                   

    });

  });

}); // End module