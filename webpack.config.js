const path = require("path");

module.exports = {
	mode: 'development',
	entry: {app: './src/index.js'},
	output: {
		path: path.join(__dirname, "./"),
		filename: '[name].js',//[name]の部分にはentryで指定したキー(app)が入る
	},
	devServer: {
		static: {
			directory: path.join(__dirname, './'),
			watch: true,
		},
		port: 4000, // ポート番号
	}
};
