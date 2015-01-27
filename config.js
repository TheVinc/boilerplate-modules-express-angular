var config = {
	port: 4000,
	modules: [
		'front'
	],
	keys: {
		cert: __dirname + '/keys/cert.pem',
		key: __dirname + '/keys/key.pem'
	},
	mode: 'dev'
};

try {
	var local_config = require('config.local.js');
	for (var k in local_config) {
		config[k] = local_config[k];
	}
} catch (e) {

}

module.exports = config;
