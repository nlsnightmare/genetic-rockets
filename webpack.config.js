const path = require('path');


module.exports = {
    mode: "development",
    // mode: "production",
    entry: "./src/main.js",
    output: {
	path: path.resolve(__dirname, 'dist'),
	filename: "bundle.js"
    },
    devServer:{
	overlay:true,
	contentBase: path.join(__dirname,'dist'),
	compress: true,
	port:8001
    },
    module: {
	rules: [
	    {
		test: /\.css$/,
		use: [
		    'style-loader',
		    'css-loader'
		]
	    }
	]
    }
};
