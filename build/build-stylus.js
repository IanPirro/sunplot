module.exports = function(grunt) {

  grunt.config.set('stylus', {
    options: {
      import: ['nib'],
      paths: ['public/css/', 'public/css/modules'],
    },
    dev: {
      options: {
        compress: false,
      },
      src: [
        'public/css/build.styl'
      ],
      dest: 'public/css/app.css',
    },
    prod: {
      src: '<%= stylus.dev.src %>',
      dest: '<%= stylus.dev.dest %>',
    }
  });
};