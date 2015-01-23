module.exports = function(gruntConfig) {
	// Add Default subgrunt task
	gruntConfig.subgrunt['front'] = {
		options: {},
		projects: {}
	};
	gruntConfig.subgrunt['front'].projects[__dirname] = 'default';

	// Add Bower subgrunt task
	gruntConfig.watch['front-bower'] = {
		files: [__dirname + '/bower.json'],
		tasks: ['subgrunt:front-bower']
	};
	gruntConfig.subgrunt['front-bower'] = {
		options: {},
		projects: {}
	};
	gruntConfig.subgrunt['front-bower'].projects[__dirname] = 'front-bower';

	// Add statics files subgrunt task 
	gruntConfig.watch['front-static-files'] = {
		files: [__dirname + '/public/**/*', '!' + __dirname + '/public/**/*.coffee', '!' + __dirname + '/public/**/*.less'],
		tasks: ['subgrunt:front-static-files']
	};
	gruntConfig.subgrunt['front-static-files'] = {
		options: {},
		projects: {}
	};
	gruntConfig.subgrunt['front-static-files'].projects[__dirname] = 'front-static-files';

	// Add Less/CSS subgrunt task
	gruntConfig.watch['front-static-style'] = {
		files: [__dirname + '/public/style/**/*.less'],
		tasks: ['subgrunt:front-static-style']
	};
	gruntConfig.subgrunt['front-static-style'] = {
		options: {},
		projects: {}
	};
	gruntConfig.subgrunt['front-static-style'].projects[__dirname] = 'front-static-style';

	// Add Coffee subgrunt task
	gruntConfig.watch['front-static-coffee'] = {
		files: [__dirname + '/public/**/!(bin|node_modules)/**/*.coffee'],
		tasks: ['subgrunt:front-static-coffee']
	};
	gruntConfig.subgrunt['front-static-coffee'] = {
		options: {},
		projects: {}
	};
	gruntConfig.subgrunt['front-static-coffee'].projects[__dirname] = 'front-static-coffee';
}
