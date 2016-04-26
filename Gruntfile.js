module.exports = function(grunt) {

  'use strict';

  /**
   * Time running tasks
   */
  require('time-grunt')(grunt);

  /**
   * Load tasks as required
   */
  require('load-grunt-tasks')(grunt);

  /**
   * Configuration
   */
  var config = {
    app: '.',
    dist: './_site'
  };

  /**
   * Grunt tasks
   */
  grunt.initConfig({

    /**
     * Read package.json
     */
    pkg: grunt.file.readJSON('package.json'),

    /**
     * Clone configuration
     */
    config: config,

    /**
     * Jekyll shell commands
     */
    shell: {
      options: {
        src: '<%= config.app %>',
        config: '<%= config.app %>/_config.yml'
      },
      server: {
        command: 'jekyll serve --watch'
      },
      build: {
        command: 'jekyll build'
      }
    },

    /**
     * Compress and minify scripts
     */
    uglify: {
      dist: {
        options: {
          banner: '/*! <%= pkg.name %> | v<%= pkg.version %> | <%= pkg.author %> | <%= pkg.homepage %> | <%= pkg.license %> */ \n',
          preserveComments: 'some',
          sourceMap: true
        },
        files: {
          '<%= config.dist %>/assets/script/main.min.js':'<%= config.app %>/assets/script/main.js'
        }
      }
    },

    /**
     * Compress and minify images
     */
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/assets/images',
          src: '{,*/}*.{jpg,jpeg,gif,png,ico}',
          dest: '<%= config.dist %>/assets/images'
        }]
      }
    },

    /**
     * Autoprefix compiled CSS
     */
    autoprefixer: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.dist %>/assets/css',
          dest: '<%= config.dist %>/assets/css',
          src: ['{,*/}*.css', '!{,*/}*.min.css']
        }]
      },
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      }
    },

    /**
     * Compress and minify CSS
     */
    cssmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.dist %>/assets/css',
          dest: '<%= config.dist %>/assets/css',
          src: ['{,*/}*.css', '!{,*/}*.min.css'],
          ext: '.min.css'
        }],
        options: {
          sourceMap: true,
          banner: '/*! <%= pkg.name %> | v<%= pkg.version %> | <%= pkg.author %> | <%= pkg.homepage %> | <%= pkg.license %> */ \n'
        }
      }
    },

    /**
     * Clean directories and files
     */
    clean: {
      before: '<%= config.dist %>/*',
      after: [
        '<%= config.dist %>/assets/css/*',
        '!<%= config.dist %>/assets/css/*.min.css',
        '<%= config.dist %>/assets/script/*',
        '!<%= config.dist %>/assets/script/*.min.js'
      ]
    },

    /**
     * Run heavy tasks in parallal
     */
    concurrent: {
      server: [
        'watch',
        'shell:server'
      ],
      build: [
        'cssmin:dist',
        'uglify:dist',
        'imagemin:dist'
      ],
      options: {
        logConcurrentOutput: true
      }
    },

    /**
     * Watch for changes
     */
    watch: {
      script: {
        files: ['<%= config.app %>/assets/script/{,/*}*.js']
      },
      sass: {
        files: [
          '<%= config.app %>/assets/css/{,/*}*.{scss}',
          '<%= config.app %>/_sass/{,/*}*.{scss}'
        ]
      },
      images: {
        files: ['<%= config.app %>/assets/images/{,/*}*.{jpg,jpeg,gif,png,ico}']
      },
      html: {
        files: [
          '<%= config.app %>/{,/*/*}*.{html,yml,md,mkd,markdown}',
          '!<%= config.app %>/_site/**/*'
        ]
      },
      options: {
        livereload: true,
        spawn: false
      }
    }

  });

  /**
   * Default watch task
   */
  grunt.registerTask('default', ['concurrent:server']);

  /**
   * Build task
   */
  grunt.registerTask('build', [
    'clean:before',
    'shell:build',
    'autoprefixer:dist',
    'concurrent:build',
    'clean:after'
  ]);
};

