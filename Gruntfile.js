module.exports = function(grunt)	{

	'user strict';

	var config = {
		app: '.',
		tmp: '.jekyll',
		dist: '_site',
		libs: 'jQuery, Socialmedia'
	};

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		config: config,
		pkg: grunt.file.readJSON('package.json'),

		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'<%= config.tmp %>/*',
						'<%= config.dist %>/*'
					]
				}]
			}
		},

		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/_scss',
					src: ['{,*/}*.{scss,sass}'],
					dest: '<%= config.app %>/css',
					ext: '.css'
				}],
				options:{
					style: 'expanded'
				}
			}
		},

		csslint: {
			test: {
				src: ['<%= config.app %>/css/main.css'],
				options: {
					import: 2
				}
			}
		},

		// concat: {
		// 	dist: {
		// 		src: [
		// 			'<%= config.app %>/bower_components/jquery/dist/jquery.min.js',
		// 			'<%= config.app %>/bower_components/socialmedia/dist/socialmedia.min.js'
		// 		],
		// 		dest: '<%= config.app %>/js/libs.min.js'
		// 	}
		// },

		// uglify: {
		// 	dist: {
		// 		src: '<%= config.app %>/js/main.js',
		// 		dest: '<%= config.app %>/js/main.min.js'
		// 	},
		// 	options: {
		// 		banner: '/*! <%= pkg.homepage %> | v<%= pkg.version %> | <%= pkg.author %> | <%= pkg.license %> | <%= config.libs %> */ \n',
		// 		preserveComments: 'some',
		// 		sourceMap: true
		// 	}
		// },

		// cssmin: {
		// 	dist: {
		// 		src: '<%= config.app %>/css/main.css',
		// 		dest: '<%= config.app %>/css/main.min.css'
		// 	},
		// 	options: {
		// 		banner: '/*! <%= pkg.homepage %> | v<%= pkg.version %> | <%= pkg.author %> | <%= pkg.license %> */ \n'
		// 	}
		// },

		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: [{
					expand: true,
					cwd: '<%= config.dist %>',
					src: '{,*/,*/}*.html',
					dest: '<%= config.dist %>'
				}]
			}
		},

		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/img',
					src: '{,*/}*.{jpg,gif,png,jpeg,ico,svg}',
					dest: '<%= config.dist %>/img',
				}]
			}
		},

		autoprefixer: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/concat/css',
					src: ['{,*/}*.css', '!{,*/}*.min.css'],
					dest: '<%= config.app %>/concat/css'
				}]
			},
			options: {
				browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
			}
		},

		useminPrepare: {
			options: {
				dest: '<%= config.dist %>',
			},
			html: ['<%= config.app %>/{,*/,*/}*.html']
		},

		usemin: {
			options: {
				assetsDirs: [
					'<%= config.dist %>',
					'<%= config.dist %>/img',
					'<%= config.dist %>/css',
				]
			},
			html: ['<%= config.dist %>/{,*/,*/}*.html'],
			css: ['<%= config.dist %>/css/{,*/}*.css']
		},

		shell: {
			options: {
				src: '<%= config.app %>',
				config: '<%= config.app %>/_config.yml',
				livereload: true
			},
			server: {
				command: 'jekyll serve --dest <%= config.tmp %>'
			},
			watch: {
				command: 'jekyll build --dest <%= config.tmp %>'
			},
			dist: {
				command: 'jekyll build --dest <%= config.dist %>'
			}
		},

		// jekyll: {
		// 	options: {
		// 		src: '<%= config.app %>',
		// 		config: '<%= config.app %>/_config.yml'
		// 	},
		// 	dist: {
		// 		options: {
		// 			dest: '<%= config.dist %>'
		// 		}
		// 	},
		// 	server: {
		// 		options: {
		// 			dest: '<%= config.tmp %>'
		// 		}
		// 	},
		// 	check: {
		// 		options: {
		// 			doctor: true
		// 		}
		// 	}
		// },

		concurrent: {
			test: ['csslint'],
			sass: ['sass:dist'],
			server: ['shell:server'],
			watch: ['watch'],
			dist: [
				'sass:dist',
				'imagemin'
			],
			options: {
				logConcurrentOutput: true
			}
		},

		watch: {
			script: {
				files: [
					'<%= config.app %>/js/{,/*}*.js',
					'<%= config.app %>/Gruntfile.js',
					'<%= config.app %>/package.json'
				],
				options: {
					spawn: false,
					livereload: true
				}
			},

			sass: {
				files: ['<%= config.app %>/_scss/{,/*}*.scss'],
				tasks: ['concurrent:server'],
				options: {
					spawn: false,
					livereload: true
				}
			},

			jekyll: {
				files: ['<%= config.app %>/{,/*,/*}*.{yml,html,md,mkd,markdown}'],
				tasks: ['concurrent:server'],
				options: {
					spawn: false,
					livereload: true
				}
			}
		}
	});

	/**
	 * Register test tasks
	 */
	grunt.registerTask('test', ['concurrent:test']);

	/**
	 * Register default tasks
	 */
	// grunt.registerTask('default', ['concurrent:jekyll', 'watch']);
	grunt.registerTask('default', ['concurrent:watch', 'concurrent:server']);

	/**
	 * Register build tasks
	 */
	grunt.registerTask( 'build', [
			'clean',
			'concurrent:dist',
			'useminPrepare',
			'autoprefixer:dist',
			'jekyll:dist',
			// 'concat',
			'uglify',
			'cssmin',
			'htmlmin',
			'usemin'
		]
	);
};

