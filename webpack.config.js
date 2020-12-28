const PATH = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: PATH.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
};