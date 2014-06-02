module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      options: {
	spawn: false,
	livereload: true
      },

      js: {
	files: ['public/js/**/*.js']
      },

      css: {
	files: ['public/css/**/*.css']
      },

      html: {
	files: ['app/views/**/*.html']
      },

      nodejs: {
	files: ['app/**/*.js', 'server.js'],
	tasks: ['express:dev'],
	options: {
	  livereload: false
	}
      },

      gruntFile: {
	files: ['Gruntfile.js'],
	options: {
	  livereload: false,
	  reload: true
	}
      }
    },

    express: {
      options: {
	node_env: 'development'
      },
      dev: {
	options: {
	  script: 'server.js'
	}
      }
    }
    
  });

  // Automatically load grunt-contrib modules defined in package.json
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('server', ['express:dev', 'watch']);
};
