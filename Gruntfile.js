var path = require('path');

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		//lint my jS
		jshint: {
			all: 'landing/*.js'
		},
		//compile Sass
		sass: { // Task                              
			dist: { // Target  
				options: { // Target options
					style: 'expanded'
				},
				files: {   // Dictionary of files
					'landing/style.css': 'landing/style.scss'   
					// 'destination': 'source'
				}
			}
		},
		//autoprefix CSS
		autoprefixer: {
			options: {
				cascade: true
			},
			single_file: {
				src: 'landing/style.css'
			}
		},
		//minifies the file and saves in dep/style folder
		cssmin: {
		  minify: {
		    expand: true,
		    cwd: 'landing/',
		    src: ['*.css', '!*-min.css'],
		    dest: 'landing/',
		    ext: '-min.css'
		  }
		},
		//uglyfies the file and saves in dep/js folder
	    uglify: {
	        my_target: {
	          files: [{
	              expand: true,
	   			  cwd: 'landing/',
	              src: '*.js',
	              dest: 'landing/',
	              ext: '-min.js'
	          }]
	        }
	    },
		//watch file changes and recompile if necessary
		watch: {
			css: {//task
			    files: 'landing/*.scss', //where to watch
			    tasks: ['sass','autoprefixer', 'cssmin'], 
			    options: {
			      livereload: true
			    }
			},
			javascript: {
				files: 'landing/*.js',
				tasks: ['jshint', 'uglify'],
				options: {
					livereload: true
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	//default task grunt will run...
	grunt.registerTask('default', ['jshint', 'sass', 'autoprefixer', 'watch']);

};