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

module.exports = config;
