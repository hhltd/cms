const path = require('path');

module.exports = {
  outputDir: './build',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        pathRewrite: {
          '^/api': '',
        },
        changeOrigin: true,
      },
    },
  },
  // publicPath: './',
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       views: '@/views'
  //     }
  //   }
  // }
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     views: '@/views'
  //   }
  // },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('views', '@/views');
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('base-ui', '@/base-ui');
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('hooks', '@/hooks');
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('components', '@/components');
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('assets', '@/assets');
  },
};
