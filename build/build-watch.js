module.exports = function(grunt) {

  var reloadPort = 35729;
  
  grunt.config.set('watch', {
    options: {
      nospawn: true,
      livereload: reloadPort
    },
    js: {
      files: [
      'app.js',
      'app/**/*.js',
      'config/*.js'
      ],
      tasks: ['jshint', 'develop', 'delayed-livereload']
    },
    jade: {
      files: ['app/views/**/*.jade'],
      options: { livereload: reloadPort }
    },
    styles: {
      files: 'public/css/**/*.styl',
      tasks: ['stylus:dev'],
    },
  });



};