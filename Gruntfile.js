'use strict';

var request = require('request');

module.exports = function (grunt) {

  var reloadPort = 35729, files;

  //
  // show elapsed time at the end
  // --------------------------------------------
  require('time-grunt')(grunt);

  //
  // load all grunt tasks
  // --------------------------------------------
  require('load-grunt-tasks')(grunt);
  
  //
  // Config | read package | specify start file
  // --------------------------------------------
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js'
      }
    }, 
  });

  //
  // Load Grunt plugins.
  // --------------------------------------------
  grunt.loadTasks('build');

  //
  // Live reload
  // --------------------------------------------
  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function(err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded) {
            grunt.log.ok('Delayed live reload successful.');
          } else {
            grunt.log.error('Unable to make a delayed live reload.');
          }
          done(reloaded);
        });
    }, 500);
  });
  
  //
  // Tasks.
  // --------------------------------------------
  grunt.registerTask('setup-dev',
    'Prepare development environment',
    ['jshint', 'develop', 'stylus:dev', 'watch']);

  grunt.registerTask('default', ['setup-dev']);

};
