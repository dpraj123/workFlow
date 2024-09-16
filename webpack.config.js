module.exports = {
    // other configurations...
    module: {
        rules: [
            // other rules...
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader', // Ensures that postcss is used for processing CSS
                ],
            },
            {
                test: /\.sass$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader', // Adds PostCSS for Sass files as well
                    'sass-loader',    // Compiles Sass to CSS
                ],
            },
        ],
    },
};
