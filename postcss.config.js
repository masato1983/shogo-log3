module.exports = {
    plugins: [
        require('postcss-gap-properties'),
        require('postcss-clip-path-polyfill'),
        require('postcss-viewport-height-correction'),
        require('postcss-100vh-fix'),
        require('postcss-flexbugs-fixes'),
        require('postcss-rem'),
        require('autoprefixer')({ grid: 'autoplace' }),
        require('postcss-object-fit-images'),
        require('postcss-easing-gradients')({ stops: 20 }), // https://github.com/larsenwork/postcss-easing-gradients/issues/9
    ],
};
