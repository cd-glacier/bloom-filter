const path = require('path');
module.exports = {
    entry: {
        bundle: './src/bloom-filter.ts'
    },
    output: {
        path: path.join(__dirname,'dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions:['.ts','.js']
    },
    devServer: {
        contentBase: path.join(__dirname,'src')
    },
    module: {
        rules: [
            {
                test:/\.ts$/,loader:'ts-loader'
            }
        ]
    }
}
