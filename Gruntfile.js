module.exports = function(grunt)	{

	'user strict';

	var config = {
		app: '.',
		libs: 'jquery, socialmedia',
		browsers: [
			'> 1%',
			'last 2 versions',
			'Firefox ESR',
			'Opera 12.1'
		]
	};

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		config: config,
		pkg: grunt.file.readJSON('package.json'),

		csslint: {
			test: {
				src: ['<%= config.app %>/css/main.css'],
				options: {
					import: 2
				}
			}
		},

		concat: {
			dist: {
				src: [
					'<%= config.app %>/bower_components/jquery/dist/jquery.min.js',
					'<%= config.app %>/bower_components/socialmedia/dist/socialmedia.min.js'
				],
				dest: '<%= config.app %>/js/libs.min.js'
			}
		},

		uglify: {
			dist: {
				src: '<%= config.app %>/js/main.js',
				dest: '<%= config.app %>/js/main.min.js'
			},
			options: {
				banner: '/*! <%= pkg.homepage %> | v<%= pkg.version %> | <%= pkg.author %> | <%= pkg.license %> | <%= config.libs %> */ \n',
				preserveComments: 'some',
				sourceMap: true
			}
		},

		cssmin: {
			dist: {
				src: '<%= config.app %>/css/main.css',
				dest: '<%= config.app %>/css/main.min.css'
			},
			options: {
				banner: '/*! <%= pkg.homepage %> | v<%= pkg.version %> | <%= pkg.author %> | <%= pkg.license %> */ \n'
			}
		},

		autoprefixer: {
			dist: {
				src: [
					'<%= config.app %>/css/main.css',
					'!<%= config.app %>/css/main.min.css'
				],
				dest: '<%= config.app %>/css/main.css'
			},
			options: {
				browsers: config.browsers,
				map: {
					prev: '<%= config.app %>/css/main.css'
				}
			}
		},

		shell: {
			jekyllServe: {
				command: 'jekyll serve --watch'
			},
			jekyllBuild: {
				command: 'jekyll build'
			}
		},

		watch: {
			scripts: {
				files: [
					'<%= config.app %>/js/{,/*}*.js'
					// '!<%= config.app %>/js/{,/*}*.min.js'
				],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false
					// livereload: true
				}
			},

			styles: {
				files: [
					'<%= config.app %>/css/{,/*}*.css'
					// '!<%= config.app %>/css/{,/*}*.min.css'
				],
				tasks: ['autoprefixer', 'cssmin'],
				options: {
					spawn: false
					// livereload: true
				}
			},

			files: {
				files: ['<%= config.app %>/{,/*}*.{css,js,yml,html,md,mkd,markdown}'],
				tasks: ['shell:jekyllServe'],
				options: {
					spawn: false,
					interrupt: true,
					atBegin: true,
					livereload: true
				}
			}
		}
	});

	/**
	 * Register test tasks
	 */
	grunt.registerTask( 'test', [
			'csslint'
		]
	);

	/**
	 * Register default tasks
	 */
	grunt.registerTask( 'default', [
			// 'shell:jekyllServe',
			'watch'
		]
	);

	/**
	 * Register build tasks
	 */
	grunt.registerTask( 'build', [
			'concat',
			'uglify',
			'autoprefixer',
			'cssmin',
			'shell:jekyllBuild'
		]
	);
};


// 	grunt.initConfig({

// 		// read the package.json
// 		pkg: grunt.file.readJSON('package.json'),

// 		// workflow
// 		// concat JS files
// 		concat: {
// 			dist: {
// 				src: [
// 					'bower_components/socialmedia/src/socialmedia.js',
// 					'_dev/js/global.js'
// 				],
// 				dest: '_dev/js/global-dev.js'
// 			},
// 			options: {
// 				banner: '/*! <%= pkg.name %> | v<%= pkg.version %> | <%= pkg.author %> | <%= pkg.license %> | <%= pkg.repo %> */ \n'
// 			}
// 		},

// 		// uglify/minify JS files
// 		uglify: {
// 			dist: {
// 				src: '_dev/js/global-dev.js',
// 				dest: 'js/global.min.js'
// 			},
// 			options: {
// 				preserveComments: 'some'
// 			}
// 		},

// 		// process sass files
// 		sass: {
// 			dist: {
// 				options: {
// 					style: 'expanded'
// 				},
// 				files: {
// 					'_dev/css/main.css':'_dev/css/main.scss'
// 				}
// 			}
// 		},

// 		// minify css
// 		cssmin: {
// 			dist: {
// 				files: {
// 					'css/main.min.css': ['_dev/css/main.css']
// 				},
// 				options: {
// 					banner: '/*! <%= pkg.name %> | v<%= pkg.version %> | <%= pkg.author %> | <%= pkg.license %> | <%= pkg.repo %> */ \n'
// 				}
// 			}
// 		},

// 		// minify images
// 		imagemin: {
// 			dynamic: {
// 				files: [{
// 					expand: true,
// 					cwd: '_dev/img/',
// 					src: ['**/*.{png,jpg,jpeg,gif,ico}'],
// 					dest: 'img/'
// 				}]
// 			}
// 		},

// 		// jekyll build
// 		jekyll: {
// 			build: {
// 				serve: false
// 			},
// 			dist: {
// 				options: {
// 					config: '_config.yml'
// 				}
// 			}
// 		},

// 		// watch
// 		watch: {

// 			scripts: {
// 				files: ['_dev/js/global.js'],
// 				tasks: ['concat', 'uglify'],
// 				options: {
// 					spawn: false
// 				}
// 			},

// 			styles: {
// 				files: ['_dev/css/main.scss'],
// 				tasks: ['sass', 'cssmin'],
// 				options: {
// 					spawn: false
// 				}
// 			},

// 			images: {
// 				files: ['_dev/img/*.*'],
// 				tasks: ['imagemin'],
// 				options: {
// 					spawn: false
// 				}
// 			},

// 			deploy: {
// 				files: [
// 					'./_layouts/*.html',
// 					'./_includes/*.html',
// 					'./_posts/*.markdown',
// 					'./index.html'
// 				],
// 				tasks: ['jekyll:dist'],
// 				options: {
// 					spawn: false
// 				}
// 			}
// 		}

// 	});

// 	grunt.loadNpmTasks('grunt-contrib-concat');
// 	grunt.loadNpmTasks('grunt-contrib-uglify');
// 	grunt.loadNpmTasks('grunt-contrib-sass');
// 	grunt.loadNpmTasks('grunt-contrib-cssmin');
// 	grunt.loadNpmTasks('grunt-contrib-imagemin');
// 	grunt.loadNpmTasks('grunt-jekyll');
// 	grunt.loadNpmTasks('grunt-contrib-watch');

// 	grunt.registerTask('default', ['concat', 'uglify', 'sass', 'cssmin', 'jekyll:dist', 'watch']);

// }