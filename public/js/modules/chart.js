define( function ( require ) {

  'use strict';

  var $       = require('jquery');
  var d3      = require( 'd3' );
  var moment  = require( 'moment' );
  require( 'tipsy' );

  return function SunChart( json, options ) {

      var data        = JSON.parse( json );
      var parseDate   = d3.time.format("%Y-%d-%mT%H:%M:%S").parse;

      // Parse date strings in data
      data.sunrises.forEach(function (d, i) {
        d.date = parseDate(d.date);
        d.time = parseDate(d.time);
      });

      data.sunsets.forEach(function (d, i) {
        d.date = parseDate(d.date);
        d.time = parseDate(d.time);
      });

      var 
        // Define the min and max date 
        mindate   = new Date(2013, options.month == 0 ? 0 : options.month || 0, 1),
        maxdate   = new Date(2013, options.month == 0 ? 0 : options.month || 11, options.limit || 31),
        // Define the range of hours for the yaxis. Uses military time. 
        ymindate  = new Date(2013, 0, 1, 1), 
        ymaxdate  = new Date(2013, 0, 1, 23),
        // Width and height | padding
        w         = options.width || 1200,
        h         = options.height || 800,
        padding   = 60,
        // Define svg and wrapper group element
        svg       = d3.select( "#chart" )
                        .append( "svg" )
                        .attr( "width", w )
                        .attr( "height", h )
                        .append("svg:g"),
        // Define X and Y Scale
        x         = d3.time.scale()
                        .domain( [mindate, maxdate] )
                        .range( [padding, w - padding] ),
        y         = d3.time.scale()
                        .domain( [ymindate, ymaxdate] )
                        .range( [h - padding, padding] ),
        // Define X and Y axis
        xAxis     = d3.svg.axis().scale( x ).orient( "bottom" ).ticks( 12 ),
        yAxis     = d3.svg.axis().scale( y ).orient( "left" ).ticks( 24 ),
        // Function to draw line
        line      = d3.svg.line()
                    .x( function( d, i ) { return x( d.date ); } )
                    .y( function( d ) { return y( d.time ); } );

      // Draw X and Y axis
      svg.append( "g" )
          .attr( "class", "x axis" )
          .attr( "transform", "translate( 0," + ( h - padding ) + " )" )
          .call( xAxis );

      svg.append( "g" )
        .attr( "class", "y axis" )
        .attr( "transform", "translate( " + padding + ", 0 )" )
        .call( yAxis );

      // Draw lines and handles    
      draw( data.sunrises, 'Sunrise' );                
      draw( data.sunsets, 'Sunset' );                

      // Add tooltips
      $( 'circle' ).tipsy( {gravity: 's'} );

        var clip = svg.append("svg:clipPath")
                          .attr("id", "clip")
                          .append("svg:rect")
                          .attr("x", 0)
                          .attr("y", 0)
                          .attr( "transform", "translate( " + padding + ", 0 )" )
                          .attr("width", w - padding * 2)
                          .attr("height", h);

      // Function to draw lines and handles
      function draw ( dataset, className ) {

      var g = svg.append("g").attr("clip-path", "url(#clip)");

      g.append( "path" )
                .attr( "d", line( dataset ) )
                .attr( "stroke", "#ccc" )
                .attr( "stroke-width", 2 )
                .attr( "class", "line" )
                .attr( "fill", "none" );

      g.selectAll( "circle" )
           .data( dataset )
           .enter()
           .append( "circle" )
           .attr( "class", "handle " + className )
           .attr( "title", function ( d ) { 
              return className + ': ' + moment(d.date).format('MMMM Do YYYY') + moment(d.time).format(', h:mm a');
            })
           .attr( "cx", function( d, i ) {
                return x(d.date); 
           } )
           .attr( "cy", function( d, i ) {
                return y(d.time);
           } )
          .attr( "r", options.limit ? 5 : 2 );
      }
  }
});