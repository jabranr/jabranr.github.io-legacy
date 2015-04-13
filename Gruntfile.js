module.exports = function(grunt)	{

	'user strict';

	var config = {
		app: '.',
		tmp: '.tmp',
		dist: '_site',
		libs: 'jQuery, Socialmedia',
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
				files: {
					'<%= config.app %>/css/main.css':'<%= config.app %>/_scss/main.scss'
				},
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
					src: '{,*/}*.html',
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
					cwd: '<%= config.tmp %>/concat/css',
					src: '{,*/}*.css',
					dest: '<%= config.tmp %>/concat/css'
				}]
			},
			options: {
				browsers: config.browsers,
				map: {
					prev: '<%= config.tmp %>/concat/css/'
				}
			}
		},

		useminPrepare: {
			options: {
				dest: '<%= config.dist %>',
			},
			html: ['<%= config.app %>/{,*/}*.html']
		},

		usemin: {
			options: {
				assetsDirs: [
					'<%= config.dist %>',
					'<%= config.dist %>/img',
					'<%= config.dist %>/css',
				]
			},
			html: ['<%= config.dist %>/{,*/}*.html'],
			css: ['<%= config.dist %>/css/{,*/}*.css']
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
			script: {
				files: [
					'<%= config.app %>/js/{,/*}*.js',
					'<%= config.app %>/Gruntfile.js',
				],
				options: {
					spawn: false,
					livereload: true
				}
			},

			sass: {
				files: ['<%= config.app %>/_scss/{,/*}*.scss'],
				tasks: ['sass:dist', 'autoprefixer:dist'],
				options: {
					spawn: false,
					livereload: true
				}
			},

			files: {
				files: ['<%= config.app %>/{,/*}*.{yml,html,md,mkd,markdown}'],
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
			'clean',
			'sass',
			'useminPrepare',
			'shell:jekyllBuild',
			'autoprefixer',
			// 'concat',
			'uglify',
			'cssmin',
			'imagemin',
			'htmlmin',
			'usemin'
		]
	);
};

