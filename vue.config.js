const TerserPlugin = require("terser-webpack-plugin");
const version = require("./package.json").version;


module.exports = {
	productionSourceMap: false,
	filenameHashing: false,
	lintOnSave: false,
	configureWebpack: config => {
		if (process.env.NODE_ENV === "production") {
			config.optimization = {
				minimize: true,
				minimizer: [new TerserPlugin({
					extractComments: false
				})]
			};
		}

		config.output.chunkFilename = `js/[id]-${version}.js`;
	},
	pwa: {
		name: "Vergi Hesaplayıcı",
		themeColor: "#53bbad",
		msTileColor: "#fff",
		manifestOptions: {
			background_color: "#fff"
		}
	}
};