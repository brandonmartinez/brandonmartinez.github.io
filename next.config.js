const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const nextConfig = {
	webpack: function(config, { isServer }) {
		// Fix for using fs
		if (!isServer) {
			config.node = {
				fs: 'empty'
			};
		}

		config.module.rules.push({
			test: /\.md$/,
			use: 'raw-loader'
		});
		return config;
	},
	exportTrailingSlash: true,
	exportPathMap: async (defaultPathMap, { dev }) => {
		if (!dev) {
			// We're going to generate these after the next.js export, remove them
			delete defaultPathMap['/sitemap.xml'];
			delete defaultPathMap['/rss.xml'];
		}

		return defaultPathMap;
	}
};

module.exports = withPlugins(
	[
		[
			optimizedImages,
			{
				optimizeImagesInDev: true
			}
		]
	],
	nextConfig
);
