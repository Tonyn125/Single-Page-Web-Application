var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'js/app.js'),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['/app/plugins/babelRelayPlugin']
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.(png|ico|jpg|xml)$/,
                loader: 'url-loader'
            }
        ]
    }
};
