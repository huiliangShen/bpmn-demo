const path = require('path')

module.exports = {
	devServer: {
		port: 9001,
		compress: true,
		proxy: {
			"/api": {
				target: "http://192.168.3.47:31080/engine-rest",
				changeOrigin: true,
				pathRewrite: {
					"^/api": ""
				}
			}
		},
		headers: {
			"Access-Control-Allow-Origin": "*"
		}
	},
	output: {
		filename: "js/[name].[chunkhash:7].js",
		path: path.resolve(__dirname, "../build/"),
		publicPath: ''
		/* library: 'xxx', // 打包名称，这个如果子应用定义好，要告知主应用，因为这个和主应用注册子应用的名称一致
		libraryTarget: "umd",
		jsonpFunction: `webpackJsonp_baas`,
		publicPath: "/child/dagApp/" */
	}
}
