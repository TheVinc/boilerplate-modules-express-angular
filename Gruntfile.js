var config = require('./config');
var fs = require('fs');

module.exports = function(grunt) {
	gruntConfig = {
		coffee: {
			core: {
				expand: true,
				cwd: 'src/core',
				src: ['**/*.coffee'],
				dest: 'bin/core',
				ext: '.js',
				options: {
					bare: true
				}
			}
		},
		watch: {
			options: {
				spawn: false
			},
			core: {
				files: ['src/core/**/*.coffee'],
				tasks: ['coffee:core']
			}
		},
		nodemon: {
			dev: {
				script: './index.js'
			}
		},
		concurrent: {
			target: {
				tasks: ['watch', 'nodemon'],
				options: {
					logConcurrentOutput: true
				}
			}
		},
		copy: {},
		subgrunt: {},
		mochaTest: {
			test: {
				options: {
					reporter: 'spec',
					require: 'coffee-script/register'
				},
				src: ['tests/**/*.coffee']
			}
		}
	}

	for (var k in config.modules) {
		var module = config.modules[k];
		// Add Grunt Coffee for module
		gruntConfig.coffee[module] = {
			expand: true,
			cwd: 'src/modules/' + module,
			src: ['*.coffee'],
			dest: 'bin/modules/' + module + '/',
			ext: '.js',
			options: {
				bare: true
			}
		};
		// Add Grunt Copy for module
		gruntConfig.copy[module] = {
			expand: true,
			cwd: 'src/modules/' + module,
			src: ['**/!(bin|node_modules)/**/*', '!**/*.coffee', '!**/*.less'],
			dest: '/bin/modules' + module + '/'
		};

		// Add Grunt Watch for module's coffee files
		gruntConfig.watch[module] = {
			files: ['src/modules/' + module + '/**/!(bin|node_modules)/**/*.coffee'],
			tasks: ['coffee:' + module]
		};

		// Add Grunt Watch for module's non-coffee files
		// Exception rule for public folder (reserved for front module statics files)
		gruntConfig.watch[module] = {
			files: ['!src/modules/' + module + '/**/!(bin|node_modules|public)/**/*.coffee'],
			tasks: ['copy:' + module]
		};

		// Check for specifics rules in the module (like subgrunts)
		if (fs.existsSync(__dirname + '/src/modules/' + module + '/gruntConfig.js')) {
			var task = require('./src/modules/' + module + '/gruntConfig').call(this, gruntConfig);
		}
	}

	grunt.initConfig(gruntConfig);

	// Load Grunt plugins packages
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-subgrunt');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-mocha-test');

	// Specify Grunt tasks
	grunt.registerTask('default', ['coffee', 'subgrunt']);
	grunt.registerTask('test', ['mochaTest']);
	grunt.registerTask('server', ['default', 'concurrent']);
}
