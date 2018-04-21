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
        filename: 'theia-simple-plugin.js',
        libraryTarget: "var",
        library: "theia_simple_plugin",
        path: path.resolve(__dirname, 'dist')
    },
    externals: {
        "@wiptheia/plugin": "theia",
        "@theia/plugin": "theia"
    }
};
