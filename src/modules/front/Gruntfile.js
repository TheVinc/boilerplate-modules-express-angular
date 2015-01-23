module.exports = function(grunt) {
	var bin_path = "../../../bin";
	var gruntConfig = {
		coffee: {
			front: {
				expand: true,
				cwd: __dirname + '/public',
				src: ['**/*.coffee'],
				dest: bin_path + '/modules/front/public',
				ext: '.js',
				options: {
					bare: true
				}
			}
		},
		bower: {
			install: {
				options: {
					copy: true,
					cleanTargetDir: true,
					targetDir: __dirname + '/public/bower_components'
				}
			}
		},
		browserify: {
			front: {
				src: bin_path + '/modules/front/public/app/app.js',
				dest: bin_path + '/modules/front/public/app-browserify.js'
			}
		},
		less: {
			style: {
				options: {
					paths: ["public/style"],
					cleancss: true
				},
				files: {
					"../../../bin/modules/front/public/style/main.css": "public/style/main.less"
				}
			}
		},
		copy: {
			front: {
				expand: true,
				cwd: 'public',
				src: ['**/*', '!**/*.coffee', '!**/*.less'],
				dest: bin_path + '/modules/front/public'
			}
		},
		// Automatically inject Bower components into the app
		wiredep: {
			task: {
				src: [
					'public/**/*.html',
				],
				options: {
					cwd: ''
				}
			}
		}
	};

	grunt.initConfig(gruntConfig);

	// Load Grunt plugins packages
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-bower-task');

	// Specify Grunt tasks
	grunt.registerTask('default', ['coffee', 'bower', 'wiredep', 'browserify', 'less', 'copy']);
	grunt.registerTask('front-bower', ['bower', 'wiredep', 'copy']);
	grunt.registerTask('front-static-files', ['copy']);
	grunt.registerTask('front-static-style', ['less', 'copy']);
	grunt.registerTask('front-static-coffee', ['coffee', 'browserify', 'copy']);

};