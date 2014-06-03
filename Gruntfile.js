module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			dist: {
				src: ['_scripts/socialmedia.min.js', '_scripts/*.js'],
				dest: 'js/global-dev.js'
			}
		},

		uglify: {
			build: {
				src: 'js/global-dev.js',
				dest: 'js/global.min.js'
			},
			options: {
				preserveComments: 'some'
			}
		},

		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: '_img/',
					src: ['**/*.{png,jpg,jpeg,gif,ico}'],
					dest: 'img/'
				}]
			}
		},

		sass: {
			dev: {
				options: {
					style: 'expanded'
				},
				files: {
					'css/main.css':'_sass/main.scss',
				}
			},
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/main.min.css':'_sass/main.scss',
				}
			}
		},

		watch: {
			options: {
				livereload: true
			},
			scripts: {
				files: ['_scripts/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false
				}
			},
			css: {
				files: ['_sass/*.scss'],
				tasks: ['sass'],
				options: {
					spawn: false
				}
			},
			img: {
				files: ['_img/*.*'],
				tasks: ['imagemin'],
				options: {
					spawn: false
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['concat', 'uglify', 'sass', 'watch']);
}