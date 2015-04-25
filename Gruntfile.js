module.exports = function(grunt)	{
	grunt.initConfig({

		// read the package.json
		pkg: grunt.file.readJSON('package.json'),

		// workflow
		// concat JS files
		concat: {
			dist: {
				src: [
					'bower_components/socialmedia/src/socialmedia.js',
					'_dev/js/global.js'
				],
				dest: '_dev/js/global-dev.js'
			},
			options: {
				banner: '/*! <%= pkg.name %> | v<%= pkg.version %> | <%= pkg.author %> | <%= pkg.license %> | <%= pkg.repo %> */ \n'
			}
		},

		// uglify/minify JS files
		uglify: {
			dist: {
				src: '_dev/js/global-dev.js',
				dest: 'js/global.min.js'
			},
			options: {
				preserveComments: 'some'
			}
		},

		// process sass files
		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'_dev/css/main.css':'_dev/css/main.scss'
				}
			}
		},

		// minify css
		cssmin: {
			dist: {
				files: {
					'css/main.min.css': ['_dev/css/main.css']
				},
				options: {
					banner: '/*! <%= pkg.name %> | v<%= pkg.version %> | <%= pkg.author %> | <%= pkg.license %> | <%= pkg.repo %> */ \n'
				}
			}
		},

		// minify images
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'img/',
					src: ['**/*.{png,jpg,jpeg,gif,ico}'],
					dest: 'img/'
				}]
			}
		},

		// jekyll build
		jekyll: {
			build: {
				serve: false
			},
			dist: {
				options: {
					config: '_config.yml'
				}
			}
		},

		// watch
		watch: {

			scripts: {
				files: ['_dev/js/global.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false
				}
			},

			styles: {
				files: ['_dev/css/main.scss'],
				tasks: ['sass', 'cssmin'],
				options: {
					spawn: false
				}
			},

			images: {
				files: ['_dev/img/*.*'],
				tasks: ['imagemin'],
				options: {
					spawn: false
				}
			},

			deploy: {
				files: [
					'./_layouts/*.html',
					'./_includes/*.html',
					'./_posts/*.markdown',
					'./index.html'
				],
				tasks: ['jekyll:dist'],
				options: {
					spawn: false
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-jekyll');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['concat', 'uglify', 'sass', 'cssmin', 'jekyll:dist', 'watch']);

}