var require = {
  baseUrl: "..",
  paths: {
    jquery          : 'components/jquery/dist/jquery.min',
    tipsy           : 'components/tipsy/src/javascripts/jquery.tipsy',
    d3              : 'components/d3/d3.min',
    moment          : 'components/momentjs/min/moment.min',
    components      : 'js/modules'
  },
  shim : {
    tipsy: {
      deps          : [ 'jquery' ],
      exports       : 'jQuery.fn.tipsy'
    },
    d3: {
      exports       : 'd3'
    },
  },
  deps: ['js/main']
};