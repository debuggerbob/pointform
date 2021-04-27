module.exports = {
	env: {
		PLEASE: "https://quiz-under-dev.herokuapp.com",
	},
	webpack: (config, { isServer }) => {
		// Fixes npm packages that depend on `fs` module
		if (!isServer) {
			config.node = {
				fs: "empty",
				child_process: 'empty',
				crypto: 'empty',
				net: 'empty',
				tls: 'empty'
			};
		}
		return config;
	},
};