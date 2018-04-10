const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    devtool: 'source-map',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ],
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'simplePlugin.js',
        libraryTarget: "var",
        library: "simplePlugin",
        path: path.resolve(__dirname, 'dist')
    },
    externals: {
		"@theia/plugin": "theia"
	}
};
