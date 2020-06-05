const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
	productionSourceMap: false,
	filenameHashing: false,
	configureWebpack: config => {
		if (process.env.NODE_ENV === "production") {
			config.optimization = {
				minimize: true,
				minimizer: [new TerserPlugin({
					extractComments: false
				})]
			};
		}
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